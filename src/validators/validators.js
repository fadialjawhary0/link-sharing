const isEmail = email => email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

export const ValidationHelper = {
  isEmail,
};
