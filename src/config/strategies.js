import validations from '../helpers/validations';

export default [{
  name: 'bearer',
  scheme: 'bearer-access-token',
  mode: 'required',
  options: {
    validateFunc: validations.bearer
  }
}];
