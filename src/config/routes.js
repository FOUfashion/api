import Boom from 'boom';
import Joi from 'joi';

import thinky from '../helpers/thinky';
import scopes from '../helpers/scopes';

import HomeCtrl from '../controllers/home';
import AuthCtrl from '../controllers/auth';
import AccountCtrl from '../controllers/account';
import ProfileCtrl from '../controllers/profile';
import CommentCtrl from '../controllers/comment';
import PostCtrl from '../controllers/post';

const home = new HomeCtrl();
const auth = new AuthCtrl();
const account = new AccountCtrl();
const profile = new ProfileCtrl();
const comment = new CommentCtrl();
const post = new PostCtrl();

const routes = [
  // Home
  {
    method: 'GET',
    path: '/',
    handler: home.index,
    config: {
      auth: {
        mode: 'try'
      }
    }
  },

  // Auth
  {
    method: 'POST',
    path: '/login',
    handler: auth.logIn,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  }, {
    method: 'POST',
    path: '/oauth/authorize',
    handler: auth.authorize,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          scope: Joi.string(),
          clientId: Joi.string().required()
        }
      }
    }
  }, {
    method: 'POST',
    path: '/oauth/exchange/code',
    handler: auth.exchangeCode,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          code: Joi.string().required(),
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required()
        }
      }
    }
  }, {
    method: 'POST',
    path: '/oauth/exchange/credentials',
    handler: auth.exchangeCredentials,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    }
  },

  // Account
  {
    method: 'GET',
    path: '/account',
    handler: account.getAuthenticated
  }, {
    method: 'GET',
    path: '/account/{id}',
    handler: account.get
  }, {
    method: 'POST',
    path: '/account',
    handler: account.create,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          email: Joi.string().required().email().max(64).lowercase().trim(),
          username: Joi.string().required().alphanum().min(4).max(12).trim(),
          password: Joi.string().required().min(6).max(32).trim(),
          firstName: Joi.string().required().min(1).max(32).trim(),
          lastName: Joi.string().required().min(1).max(32).trim()
        }
      }
    }
  }, {
    method: 'PUT',
    path: '/account/{id}',
    handler: account.update,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      },
      validate: {
        payload: {
          password: Joi.string().min(6).max(32).trim()
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/account/{id}',
    handler: account.delete,
    config: {
      auth: {
        scope: [scopes.FIRST_PARTY]
      }
    }
  },

  // Profile
  {
    method: 'GET',
    path: '/profile',
    handler: profile.getAuthenticated
  }, {
    method: 'GET',
    path: '/profile/{id}',
    handler: profile.get
  }, {
    method: 'PUT',
    path: '/profile/{id}',
    handler: profile.update,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'profile'
        }
      },
      validate: {
        payload: {
          firstName: Joi.string().min(1).max(32).trim(),
          lastName: Joi.string().min(1).max(32).trim()
        }
      }
    }
  },

  // Comment
  {
    method: 'GET',
    path: '/comment/{id}',
    handler: comment.get
  }, {
    method: 'POST',
    path: '/post/{id}/comment',
    handler: comment.create,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'post'
        }
      },
      validate: {
        payload: {
          body: Joi.string().required().trim()
        }
      }
    }
  }, {
    method: 'PUT',
    path: '/comment/{id}',
    handler: comment.update,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'comment'
        }
      },
      validate: {
        payload: {
          body: Joi.string().trim()
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/comment/{id}',
    handler: comment.delete,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'comment'
        }
      }
    }
  },

  // Post
  {
    method: 'GET',
    path: '/post/{id}',
    handler: post.get
  }, {
    method: 'POST',
    path: '/post',
    handler: post.create,
    config: {
      validate: {
        payload: {
          body: Joi.string().required().trim()
        }
      }
    }
  }, {
    method: 'PUT',
    path: '/post/{id}',
    handler: post.update,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'post'
        }
      },
      validate: {
        payload: {
          body: Joi.string().trim()
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/post/{id}',
    handler: post.delete,
    config: {
      plugins: {
        hapiAuthOwnership: {
          ownershipRule: 'post'
        }
      }
    }
  }

  // TODO: /feed
];

// Catch errors for async handlers
export default routes.map(route => {
  const handler = route.handler;
  const docNameRegex = /.*r\.table\("(.+?)"\).*/gm;

  route.handler = function(request, reply) {
    const result = handler(request, reply);

    if (result && result.catch) {
      result.catch(error => {
        // $lab:coverage:off$
        if (error instanceof thinky.Errors.DocumentNotFound || error.message.includes('Index out of bounds: 0')) {
          const matches = docNameRegex.exec(error.message);
          const docName = matches && matches[1] || 'Document';
          reply(Boom.notFound(`${docName} not found`));
        } else {
          reply(error);
        }
        // $lab:coverage:on$
      });
    }
  };

  return route;
});
