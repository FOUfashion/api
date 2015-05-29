import Good from 'good';
import Lout from 'lout';

import Thinky from '../plugins/thinky';

export default [{
  register: Good,
  options: {
    reporters: [{
      reporter: 'good-console',
      events: {
        log: '*',
        response: '*',
        error: '*'
      }
    }]
  }
}, {
  register: Lout
}, {
  register: Thinky
}];
