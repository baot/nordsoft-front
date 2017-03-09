/**
 * Created by bao on 3/7/17.
 */

export const SUCCESS_NOTIFICATION = 'SUCCESS_NOTIFICATION';
export const ERROR_NOTIFICATION = 'ERROR_NOTIFICATION';

export function successNotification(message) {
  return {
    type: SUCCESS_NOTIFICATION,
    message,
  };
}

export function errorNotification(message) {
  return {
    type: ERROR_NOTIFICATION,
    message,
  };
}
