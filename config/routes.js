import Joi from 'joi';

import HomeCtrl from '../controllers/home';
import AuthCtrl from '../controllers/auth';
import AccountCtrl from '../controllers/account';

const home = new HomeCtrl();
const auth = new AuthCtrl();
const account = new AccountCtrl();

export default [
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
        entity: 'app'
      },
      validate: {
        payload: {
          state: Joi.string(),
          scope: Joi.string(),
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required()
        }
      }
    }
  }, {
    method: 'POST',
    path: '/oauth/exchange',
    handler: auth.exchange,
    config: {
      auth: {
        entity: 'app'
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
    path: '/oauth/basic',
    handler: auth.basic,
    config: {
      auth: {
        entity: 'app'
      },
      validate: {
        payload: Joi.object().keys({
          email: Joi.string(),
          username: Joi.string(),
          password: Joi.string().required(),
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required()
        }).xor('email', 'username')
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
        entity: 'app'
      },
      validate: {
        payload: {
          email: Joi.string().required().email().max(64).lowercase().trim(),
          username: Joi.string().required().alphanum().min(4).max(12).trim(),
          password: Joi.string().required().min(6).max(32).trim()
        }
      }
    }
  }
];
