type Server = {
  url: string;
  description: string;
};

const servers: Server[] = [
  {
    url: "http://127.0.0.1:3333/api/v1",
    description: "Development Server",
  },
];

export { servers };
