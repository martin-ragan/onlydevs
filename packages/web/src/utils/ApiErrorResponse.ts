import type { DbError } from "@/db/models/dbError";
import type { ZodError } from "zod";

export default class ApiErrorResponse {
  static fromZodError(e: ZodError) {
    const resp = {
      message: "Invalid payload data",
      error: e.format(),
    };
    return new Response(JSON.stringify(resp), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  static fromUnknownError() {
    const resp = {
      message: "Unknown server error",
    };
    return new Response(JSON.stringify(resp), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  static fromDbError(e: DbError) {
    const resp = {
      message: "Database error",
      code: e.code,
      error: e.message,
    };
    return new Response(JSON.stringify(resp), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
