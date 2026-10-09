
import { Result } from "../types/result.js";
export const ok = <T>(data: T): Result<T, never> => ({ success: true, data });
export const fail = <E>(message: E): Result<never, E> => ({ success: false, message });