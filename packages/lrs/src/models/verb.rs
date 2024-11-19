use serde::{Deserialize, Serialize};
use serde_with::serde_as;
use std::collections::BTreeMap;

use super::common::LngMap;

#[serde_as]
#[derive(Serialize, Deserialize, Debug)]
pub struct Verb {
    pub id: String,
    #[serde_as(as = "Option<BTreeMap<_, _>>")]
    pub display: Option<LngMap>,
}
