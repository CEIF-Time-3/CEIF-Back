import { UserRole } from '../schema/users.schema.js';

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
}
