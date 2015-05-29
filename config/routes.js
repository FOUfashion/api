import HomeCtrl from '../controllers/home';
import UserCtrl from '../controllers/user';

let home = new HomeCtrl();
let user = new UserCtrl();

export default [{
  method: 'GET',
  path: '/',
  handler: home.index
}, {
  method: 'GET',
  path: '/ping',
  handler: home.ping
}, {
  method: 'GET',
  path: '/user/{name}',
  handler: user.index
}];
