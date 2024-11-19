use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Result {
    pub success: Option<bool>,
    pub achieved_score: Option<i32>,
    pub max_score: Option<i32>,
}

impl Default for Result {
    fn default() -> Self {
        Self {
            success: None,
            achieved_score: None,
            max_score: None,
        }
    }
}
