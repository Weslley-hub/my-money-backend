export const UserSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "670f7590-88c9-4ce3-918d-3279353b48ad",
    },
    name: {
      type: "string",
      example: "Francisco de Sousa",
    },
    email: {
      type: "string",
      example: "email@email.com",
    },
    password: {
      type: "string",
      example: "senha123",
    },
    avatar: {
      type: "string",
      example: "avatar.png",
    },
  },
};
