use crate::models::common::ApiSuccessResp;
use crate::models::error::AppError;
use actix_web::{get, HttpResponse, Responder};

#[get("")]
pub async fn check() -> Result<impl Responder, AppError> {
    return Ok(HttpResponse::Ok().json(ApiSuccessResp::new("OK")));
}
