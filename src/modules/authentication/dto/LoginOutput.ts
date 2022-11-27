import { UserOutputDto } from "../../user/dto/user-output.dto";

export type LoginOutPutDto = {
  token: string;
  data: UserOutputDto;
};
