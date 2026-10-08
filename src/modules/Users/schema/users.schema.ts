import { roleEnum } from "../../../infra/db/schema/users.schema.js";


export type UserRole = (typeof roleEnum.enumValues)[number];

