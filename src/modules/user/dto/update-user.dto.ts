export type UpdateUserDto = {
  id: string;
  data: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  };
};
