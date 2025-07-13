import { integer, pgTable, varchar, boolean, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    //basic info of the file
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: varchar("type").notNull(), // eg."image/png", "application/pdf"

    // storage information
    fileUrl: text("file_url").notNull(), // URL to access the file
    thumbnailUrl: text("thumbnail_url").notNull(), // URL to access the thumbnail

    //ownership and metadata
    userId: uuid("user_id").notNull(), // ID of the user who owns the file
    parentId: uuid("parent_id"),

    //file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isMarked: boolean("is_marked").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

})


export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  children: many(files),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;