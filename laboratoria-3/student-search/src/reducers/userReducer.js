import { v4 as uuidv4 } from 'uuid';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return [ ... state, {
        email: action.user.email, 
        password: action.user.password, 
        login: action.user.login,
        id: uuidv4()}
      ]
    case 'LOAD_USER':
      return action.users;
    default:
      return state;
  }
}