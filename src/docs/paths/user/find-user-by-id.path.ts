import { ApiTags } from "../../tags.docs";

export const findUserByIdPath = {
  description: "Busca usuário por ID",
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
      description: "Usuário encontrado", // response desc.
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserSchema", // Todo model
          },
        },
      },
    },
    404: {
      description: "Usuário não encontrado", // response desc.
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CommonErrorSchema", // Todo model
          },
        },
      },
    },
  },
};
