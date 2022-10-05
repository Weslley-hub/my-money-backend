export const UserInputSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Nome do usuário",
      example: "José Sales",
    },
    email: {
      type: "string", // data type
      description: "E-mail do usuário", // desc
      example: "jose@email.com", // example of an error internal code
    },
    password: {
      type: "string",
      description: "Senha do usuário",
      example: "jose123",
    },
    avatar: {
      type: "string",
      description: "Avatar do usuário",
      example: "avatar.png",
    },
  },
};
