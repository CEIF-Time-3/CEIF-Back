import { type DrizzleDB } from "../drizzle.provider.js";

export type DbTransaction = Parameters<Parameters<DrizzleDB['transaction']>[0]>[0];
export type DbExecutor = DrizzleDB | DbTransaction;