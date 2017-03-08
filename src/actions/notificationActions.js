/**
 * Created by bao on 3/7/17.
 */

export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export function newNotification(message, level) {
  return {
    type: NEW_NOTIFICATION,
    message,
    level,
  };
}
