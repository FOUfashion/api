import keymirror from 'keymirror';

let scopes = keymirror({
  FIRST_PARTY: null,
  THIRD_PARTY: null
})

scopes.ALL = Object.keys(scopes);
scopes = Object.freeze(scopes);

export default scopes;
