import { ApiTags } from "../../tags.docs";

export const createUserPath = {
  description: "Cadastra um usuário",
  tags: [ApiTags.Users],
  parameters: [],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserInputSchema",
        },
      },
    },
  },
  responses: {
    201: {
      description: "Usuário criado com sucesso",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Usuário cadastrado com sucesso",
              },
              statusCode: {
                type: "number",
                example: 201,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Erro de validação",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ValidationErrorSchema",
          },
        },
      },
    },
  },
};
