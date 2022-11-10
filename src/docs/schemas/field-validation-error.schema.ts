export const FieldValidationErrorSchema = {
  type: "object",
  properties: {
    field: {
      type: "string",
      description: "Nome do campo",
      example: "email",
    },
    receivedValue: {
      type: "string", // data type
      description: "Valor recebido", // desc
      example: "email.com", // example of an error internal code
    },
    errors: {
      type: "array",
      description: "Conjunto de erros de validação encontrados",
      items: {
        type: "string",
        example: "E-mail com formato inválido",
      },
    },
  },
};
