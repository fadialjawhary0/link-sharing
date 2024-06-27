const isEmail = email => email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
const isURL = url => url.match(/^(https?:\/\/)(([A-Za-z0-9.-]+|www\.[A-Za-z0-9.-]+)(\/[\+~%\/.\w-_]*)?\??([-+=&;%@.\w_]*)#?([\w]*))?$/);

export const ValidationHelper = {
  isEmail,
  isURL,
};
