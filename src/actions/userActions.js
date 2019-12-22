export const USER_AUTH = 'USER_AUTH';

export const userAuth = name => ({
  type: USER_AUTH,
  payload: name
});
