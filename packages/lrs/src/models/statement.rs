use super::{actor::Actor, common::LngMap, object::Object, result::Result, verb::Verb};
use clickhouse::Row;

use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(Deserialize, Debug)]
pub struct CreateStatementReq {
    pub actor: Actor,
    pub verb: Verb,
    pub object: Object,
    pub result: Option<Result>,
}

#[derive(Row, Serialize, Deserialize)]
pub struct Statement {
    pub actor_mbox: String,
    pub verb_id: String,
    pub verb_display: LngMap,
    pub object_id: String,
    pub object_name: LngMap,
    pub object_description: LngMap,
    pub object_type: Option<String>,
    pub result_success: Option<bool>,
    pub result_achieved_score: Option<i32>,
    pub result_max_score: Option<i32>,
    #[serde(with = "clickhouse::serde::time::datetime")]
    pub timestamp: OffsetDateTime,
}

impl From<CreateStatementReq> for Statement {
    fn from(value: CreateStatementReq) -> Self {
        let result = value.result.unwrap_or_default();

        Self {
            actor_mbox: value.actor.mbox,
            verb_id: value.verb.id,
            verb_display: value.verb.display.unwrap_or_default(),
            object_id: value.object.id,
            object_name: value.object.definition.name.unwrap_or_default(),
            object_description: value.object.definition.description.unwrap_or_default(),
            object_type: value.object.definition.object_type,
            result_success: result.success,
            result_achieved_score: result.achieved_score,
            result_max_score: result.max_score,
            timestamp: OffsetDateTime::now_utc(),
        }
    }
}
