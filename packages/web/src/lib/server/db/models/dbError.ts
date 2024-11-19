import type { PostgresError } from "postgres";

export class DbError extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "DatabaseError";
    this.code = code;
  }

  static fromPostgresError(err: PostgresError): DbError {
    return new DbError(err.message, err.code);
  }

  static fromUnknownError(): DbError {
    return new DbError("Unknown error (more information in logs)", "UnknownError");
  }
}
