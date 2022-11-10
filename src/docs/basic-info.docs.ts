import { paths } from "./paths";
import { schemas } from "./schemas";
import { servers } from "./server.docs";
import { tags } from "./tags.docs";

export const swaggerBasicInfo = {
  openapi: "3.0.3",
  info: {
    title: "Sistema de Controle de Gastos",
    description: "API desenvolvida para um sistema de controle de gastos.",
    version: "1.0.0",
    contact: {
      name: "My Money Enterprise",
      email: "support@mymoney.com",
      url: "mymoney.com.br",
    },
  },
  servers,
  tags,
  components: {
    schemas,
  },
  paths: paths,
};
