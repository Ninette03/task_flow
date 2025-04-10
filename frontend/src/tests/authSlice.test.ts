import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginWithGoogle, logoutUser } from '../features/auth/authSlice';
import { UserRole } from '../utils/roles';
import { RootState } from '../app/store';

describe('authSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it('should handle loginWithGoogle.fulfilled', async () => {
    const mockUser = { id: 1, email: 'admin@example.com', role: UserRole.ADMIN };
    const mockToken = 'mockToken';

    // Simulate the login action
    await store.dispatch(loginWithGoogle.fulfilled({ token: mockToken, user: mockUser }, 'auth/login'));

    const state = store.getState() as RootState;
    expect(state.auth.token).toBe(mockToken);
    expect(state.auth.user).toEqual(mockUser);
  });

  it('should handle logoutUser.fulfilled', async () => {
    // Simulate logging in first
    const mockUser = { id: 1, email: 'admin@example.com', role: UserRole.ADMIN };
    const mockToken = 'mockToken';
    await store.dispatch(loginWithGoogle.fulfilled({ token: mockToken, user: mockUser }, 'auth/login'));

    // Now log out
    await store.dispatch(logoutUser.fulfilled(undefined, 'auth/logout'));

    const state = store.getState() as RootState;
    expect(state.auth.token).toBeNull();
    expect(state.auth.user).toBeNull();
  });
});
