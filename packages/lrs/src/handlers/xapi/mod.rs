use actix_web::web::ServiceConfig;

mod statements;

pub fn statements_config(cfg: &mut ServiceConfig) {
    cfg.service(statements::create);
}
