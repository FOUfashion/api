import selectn from 'selectn';

import Boom from 'boom';
import Hoek from 'hoek';

function register(plugin, options, next) {
  plugin.auth.scheme('ownership-access', function(server, options) {
    Hoek.assert(options, 'Missing options for ownership-access strategy');
    Hoek.assert(options.rules, 'Missing options.rules for ownership-access stategy');

    const settings = Hoek.clone(options);
    const invalidMessage = settings.invalidMessage || 'You do not have access to this resource';

    const scheme = {
      authenticate: function(request, reply) {
        const ruleName = selectn('plugins.hapi-auth-ownership.ownershipRule', request.route.settings);
        const credentials = request.auth.credentials || {};

        if (!ruleName) {
          return next();
        }

        const rule = settings.rules[rule];
        Hoek.assert(rule, `Rule '${ruleName}' not found for ownership-access strategy; check the options.rules object`);

        rule(request, credentials, function(error, isValid, newCredentials) {
          if (error) {
            return reply(error);
          }

          const result = {
            credentials: newCredentials || credentials
          };

          if (!isValid) {
            return reply(Boom.unauthorized(invalidMessage), null, result);
          }

          // Authorized
          reply.continue(result);
        });
      }
    };

    return scheme;
  });

  next();
}

register.attributes = {
  name: 'hapi-auth-ownership'
};

export default register;
