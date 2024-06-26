const isEmail = email => email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const isURL = url =>
  url.match(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  );

export const ValidationHelper = {
  isEmail,
  isURL,
};
