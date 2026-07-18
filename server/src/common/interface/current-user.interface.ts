import type { Role } from "../../generated/prisma/enums.js";

export interface CurrentUserInterface {
  id: string;
  email: string;
  roles: Role[]
}
