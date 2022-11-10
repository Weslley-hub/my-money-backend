import { ApiTags } from "../../tags.docs";

export const updateUserPath = {
  description: "Atualiza dados do usuário passando o ID",
  tags: [ApiTags.Users],
  parameters: [
    {
      name: "userId",
      description: "ID do usuário",
      in: "path",
      required: true,
      example: "670f7590-88c9-4ce3-918d-3279353b48ad",
    },
  ],
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
    200: {
      description: "Usuário atualizado com sucesso",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Usuário atualizado com sucesso",
              },
              statusCode: {
                type: "number",
                example: 200,
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
    404: {
      description: "Usuário não encontrado",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CommonErrorSchema",
          },
        },
      },
    },
  },
};
