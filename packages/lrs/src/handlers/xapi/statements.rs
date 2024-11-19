use actix_web::web::{Data, Json};
use actix_web::{post, HttpResponse, Responder};
use slog::o;

use crate::models::common::{ApiSuccessResp, AppState};
use crate::models::error::AppError;
use crate::models::statement::{CreateStatementReq, Statement};
use crate::repositories::statements::StatementRepo;
use crate::utils::logger::log_error;

#[post("/statements")]
pub async fn create(
    state: Data<AppState>,
    payload: Json<CreateStatementReq>,
) -> Result<impl Responder, AppError> {
    let logger = state.logger.new(
        o!("entity" => "statement", "action" => "create", "payload" => format!("{:?}", payload)),
    );

    let statement = Statement::from(payload.into_inner());
    state
        .statement_repo
        .create_statement(&statement)
        .await
        .map_err(log_error(logger))?;

    return Ok(HttpResponse::Ok().json(ApiSuccessResp::new("Statement created")));
}
