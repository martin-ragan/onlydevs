use serde::{Deserialize, Serialize};
use slog::Logger;

use crate::repositories::statements::ClickhouseStatementRepo;

use super::error::AppError;

pub struct AppState {
    pub logger: Logger,
    pub statement_repo: ClickhouseStatementRepo,
}

/// LngMap
///
/// Stores i18n display values such as:
/// 'en-US': 'experienced',
/// 'en-GB': 'experienced',
///
/// needeb by xAPI standard
pub type LngMap = Vec<(String, String)>;

#[derive(Serialize, Deserialize)]
pub struct ApiSuccessResp {
    message: String,
}

impl ApiSuccessResp {
    pub fn new(msg: &str) -> Self {
        Self {
            message: msg.to_string(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct ApiErrorResp {
    message: String,
}

impl ApiErrorResp {
    pub fn from(err: &AppError) -> Self {
        Self {
            message: err
                .to_owned()
                .message
                .unwrap_or("Unknown error".to_string()),
        }
    }
}
