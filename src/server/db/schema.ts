import { int, text, singlestoreTable } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("user-table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
