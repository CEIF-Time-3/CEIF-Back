import { UserAddressResult } from "../Adapter/addressPort.js";
import { UserRole } from "../schema/users.schema.js";

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  addresses: UserAddressResult[];
}
export interface PublicUserResopnseDTO{
    name: string;
  email: string;
  phone: string | null;
}