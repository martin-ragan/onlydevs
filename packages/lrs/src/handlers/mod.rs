use actix_web::web::{self, ServiceConfig};

mod healthcheck;
mod xapi;

pub fn xapi_config(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/xapi").configure(xapi::statements_config));
}

pub fn healthcheck_config(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/healthcheck").configure(healthcheck::health_config));
}
