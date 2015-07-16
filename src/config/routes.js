import Boom from 'boom';
import Joi from 'joi';

import thinky from '../helpers/thinky';
import entities from '../helpers/entities';

import HomeCtrl from '../controllers/home';
import AuthCtrl from '../controllers/auth';
import AccountCtrl from '../controllers/account';

const home = new HomeCtrl();
const auth = new AuthCtrl();
const account = new AccountCtrl();

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
    path: '/oauth/authorize',
    handler: auth.authorize,
    config: {
      auth: {
        entity: entities.FIRST_PARTY
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
        entity: entities.FIRST_PARTY
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
        entity: entities.FIRST_PARTY
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
        entity: entities.FIRST_PARTY
      },
      validate: {
        payload: {
          email: Joi.string().required().email().max(64).lowercase().trim(),
          username: Joi.string().required().alphanum().min(4).max(12).trim(),
          password: Joi.string().required().min(6).max(32).trim(),
          firstName: Joi.string().min(1).max(32).trim(),
          lastName: Joi.string().min(1).max(32).trim()
        }
      }
    }
  }
];

// Catch errors for async handlers
export default routes.map(route => {
  const handler = route.handler;
  const docNameRegex = /.*r\.table\("(.+?)"\).*/gm;

  if (handler.toString().includes('return spawn.promise();')) {
    route.handler = function(request, reply) {
      handler(request, reply)
        .catch(thinky.Errors.DocumentNotFound, error => {
          const docName = docNameRegex.exec(error.message)[1];
          reply(Boom.notFound(`${docName} not found`));
        })
        .catch(reply);
    };
  }

  return route;
});
