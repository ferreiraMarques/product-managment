const mockLogin = jest.fn().mockReturnValue({
  token: "abc123",
  username: 'test@gmail.com',
});

export const AuthService = jest.fn().mockReturnValue({
  login: mockLogin,
});
