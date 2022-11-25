import { UserOutputDto } from "../../user/dto/user-output.dto";

export type LoginOutputDto = {
  token: string;
  data: UserOutputDto;
};
