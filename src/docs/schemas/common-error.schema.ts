export const CommonErrorSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Mensagem informando o erro",
      example:
        "Não existe usuário com o ID : 670f7590-88c9-4ce3-918d-3279353b48ad",
    },
    statusCode: {
      type: "number", // data type
      description: "Código HTTP que identifica o erro", // desc
      example: "404", // example of an error internal code
    },
  },
};
