export const ValidationErrorSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Mensagem informando error de validação",
      example: "Campos Inválidos",
    },
    statusCode: {
      type: "number", // data type
      description: "Status 400 indicando BAD Request(Requisição mal formada)", // desc
      example: "400", // example of an error internal code
    },
    data: {
      type: "array",
      description: "Array com todos os erros de validação",
      items: {
        type: "object",
        $ref: "#/components/schemas/FieldValidationErrorSchema",
      },
    },
  },
};
