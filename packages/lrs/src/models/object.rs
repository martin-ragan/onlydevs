use serde::Deserialize;
use serde_with::serde_as;
use std::collections::BTreeMap;

use super::common::LngMap;

#[derive(Deserialize, Debug)]
pub struct Object {
    pub id: String,
    #[serde(default)]
    pub definition: ObjectDefinition,
}

#[serde_as]
#[derive(Deserialize, Debug)]
pub struct ObjectDefinition {
    #[serde_as(as = "Option<BTreeMap<_, _>>")]
    pub name: Option<LngMap>,
    #[serde_as(as = "Option<BTreeMap<_, _>>")]
    pub description: Option<LngMap>,
    #[serde(alias = "type")]
    pub object_type: Option<String>,
}

impl Default for ObjectDefinition {
    fn default() -> Self {
        Self {
            name: None,
            description: None,
            object_type: None,
        }
    }
}
