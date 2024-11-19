use anyhow::Result;
use clickhouse::Client;
use slog::{info, Logger};

use crate::models::error::AppError;

use super::{env::get_db_attrs, logger::log_error};

pub async fn create_clickhouse(logger: Logger) -> Client {
    let db_attrs = get_db_attrs(&logger);

    info!(
        logger,
        "Initializing Clickhouse client with attributes: url={}, user={}, db={}",
        &db_attrs.url,
        &db_attrs.user,
        &db_attrs.db
    );

    let client = Client::default()
        .with_url(db_attrs.url)
        .with_user(db_attrs.user)
        .with_password(db_attrs.password)
        .with_database(db_attrs.db);

    info!(logger, "Clickhouse db client initialized");

    let _ = run_migration(&client)
        .await
        .map_err(log_error(logger.to_owned()));
    info!(logger, "Try to initialize DB with migration");

    client
}

pub async fn run_migration(client: &Client) -> Result<(), AppError> {
    client
        .query(
            r###"
        CREATE TABLE IF NOT EXISTS onlydevs_lrs.statements (
            actor_mbox              String,
            verb_id                 String,
            verb_display            Map(String, String),
            object_id               String,
            object_name             Map(String, String),
            object_description      Map(String, String),
            object_type             Nullable(String),
            result_success          Nullable(Bool),
            result_achieved_score   Nullable(Int32),
            result_max_score        Nullable(Int32),
            timestamp               Datetime()
        ) ENGINE = MergeTree() PRIMARY KEY (actor_mbox)
    "###,
        )
        .execute()
        .await
        .map_err(|e| {
            AppError::new(
                crate::models::error::AppErrorType::DbError,
                &format!("Failed to run migration: {:?}", e),
            )
        })
}
