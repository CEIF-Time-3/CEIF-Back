export type Result<TData, TError> =
  | {
      success: true;
      data: TData;
    }
  | { success: false; message: TError };
