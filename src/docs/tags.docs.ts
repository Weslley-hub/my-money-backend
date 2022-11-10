export enum ApiTags {
  Users = "Operações de Usuários",
}

type Tag = {
  name: string;
};

export const tags: Tag[] = [{ name: ApiTags.Users }];
