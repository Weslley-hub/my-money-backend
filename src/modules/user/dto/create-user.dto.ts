export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type CreateUserLogin = {
  email: string;
  password: string;
};
