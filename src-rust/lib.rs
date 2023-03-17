pub mod prisma;

use prisma::PrismaClient;
use rspc::Config;
use serde::Deserialize;
use std::{path::PathBuf, sync::Arc};

pub struct Ctx {
    pub db: Arc<PrismaClient>,
}

type Router = rspc::Router<Ctx>;

pub fn router() -> Router {
    rspc::Router::<Ctx>::new()
        .config(
            Config::new().export_ts_bindings(
                PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("src/bindings.ts"),
            ),
        )
        .query("users", |t| {
            t(|ctx, _: ()| async move { Ok(ctx.db.user().find_many(vec![]).exec().await?) })
        })
        .mutation("createUser", |t| {
            #[derive(Deserialize, rspc::Type)]
            struct Input {
                email: String,
            }
            t(|ctx, input: Input| async move {
                Ok(ctx.db.user().create(input.email, vec![]).exec().await?)
            })
        })
        .build()
}
