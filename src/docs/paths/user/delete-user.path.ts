import { ApiTags } from "../../tags.docs";

export const deleteUserPath = {
  description: "Remove um usuário passando o ID",
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
  responses: {
    200: {
      description: "Usuário removido com sucesso",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Usuário removido com sucesso",
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
