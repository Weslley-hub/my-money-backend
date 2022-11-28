import { UserOutputDto } from "../../user/dto/UserOutput";

export type LoginOutputDto = {
  token: string;
  data: UserOutputDto;
};
