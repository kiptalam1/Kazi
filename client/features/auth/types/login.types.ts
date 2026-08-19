import { User } from "@/features/common/types/common.types";

export type LoginBody = {
  email: string;
  password: string;
};

export interface LoginResponse {
  message: string;
  data: User;
}
