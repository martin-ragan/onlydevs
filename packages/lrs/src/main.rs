use actix_cors::Cors;
use actix_web::{middleware, web, App, HttpServer};
use actix_web_prom::PrometheusMetricsBuilder;
use models::common::AppState;
use repositories::statements::ClickhouseStatementRepo;
use slog::info;
use utils::{env::get_server_addr, logger::configure_logger};

use crate::utils::db::create_clickhouse;

mod handlers;
mod models;
mod repositories;
mod utils;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let _ = dotenvy::dotenv();

    let logger = configure_logger();
    let client = create_clickhouse(logger.to_owned()).await;
    let server_addr = get_server_addr(&logger);

    info!(logger, "Starting server: {}", server_addr);

    HttpServer::new(move || {
        let cors = Cors::permissive();
        let prometheus = PrometheusMetricsBuilder::new("lrs")
            .endpoint("/metrics")
            .build()
            .expect("Prometheus metrics should be created");

        App::new()
            .wrap(cors)
            .wrap(prometheus)
            .wrap(middleware::NormalizePath::trim())
            .app_data(web::Data::new(AppState {
                logger: logger.clone(),
                statement_repo: ClickhouseStatementRepo::new(client.clone()),
            }))
            .configure(handlers::xapi_config)
            .configure(handlers::healthcheck_config)
    })
    .bind(server_addr)?
    .run()
    .await
}
