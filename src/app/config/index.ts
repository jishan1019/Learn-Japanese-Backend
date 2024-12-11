import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expire_time: process.env.JWT_ACCESS_EXPIRE_TIME,
  jwt_refresh_expire_time: process.env.JWT_REFRESH_EXPIRE_TIME,
};
