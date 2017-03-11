import { notificationReducer } from '../../../src/reducers/notificationReducer';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../../src/actions/notificationActions';

describe('participant reducer', () => {
  const initialState = {};

  it('should has success message and level success for success notification', () => {
    const payload = 'success message';
    const newState = notificationReducer(initialState, {
      type: SUCCESS_NOTIFICATION,
      message: payload,
    });

    expect(newState.message).toBe(payload);
    expect(newState.level).toBe('success');
  });

  it('should has error message and level error for error notification', () => {
    const payload = 'error message';
    const newState = notificationReducer(initialState, {
      type: ERROR_NOTIFICATION,
      message: payload,
    });

    expect(newState.message).toBe(payload);
    expect(newState.level).toBe('error');
  });
});
