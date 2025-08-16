import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: [env.SINGLESTORE_DB + "_*"],
  dbCredentials: {
    host: env.SINGLESTORE_Host,
    port: parseInt(env.SINGLESTORE_Port),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB,
    ssl: {},
  },
} satisfies Config;
