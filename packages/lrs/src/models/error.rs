use std::fmt::{self, Display, Formatter};

use actix_web::body::BoxBody;
use actix_web::http::StatusCode;
use actix_web::{HttpResponse, ResponseError};
use serde::Serialize;

use super::common::ApiErrorResp;

#[derive(Clone, Debug, Serialize)]
pub enum AppErrorType {
    DbError,
}

#[derive(Clone, Debug, Serialize)]
pub struct AppError {
    pub err_type: AppErrorType,
    pub cause: Option<String>,
    pub message: Option<String>,
}

impl AppError {
    pub fn new(err_type: AppErrorType, msg: &str) -> Self {
        Self {
            err_type,
            cause: None,
            message: Some(msg.to_string()),
        }
    }
    pub fn from_clickhouse(err: clickhouse::error::Error) -> Self {
        Self {
            err_type: AppErrorType::DbError,
            cause: Some(err.to_string()),
            message: None,
        }
    }

    pub fn message(&self) -> String {
        match (&self.err_type, &self.message) {
            (_, Some(msg)) => msg.clone(),
            (AppErrorType::DbError, None) => "Unknown database error".to_string(),
        }
    }
}

impl Display for AppError {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        write!(f, "{}", self.message())
    }
}

impl ResponseError for AppError {
    fn status_code(&self) -> StatusCode {
        match self.err_type {
            AppErrorType::DbError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        HttpResponse::build(self.status_code()).json(ApiErrorResp::from(self))
    }
}
