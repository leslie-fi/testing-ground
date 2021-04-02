import pg from "pg";
import * as db from "zapatos/db";

import * as s from "zapatos/schema";
import type { Comment, CreateCommentProps } from "../../types";



export const create = async (
  pool: pg.Pool,
  comment: CreateCommentProps
): Promise<Comment> => {
  return await db.insert("comments", comment).run(pool);
};

export const all = async (pool: pg.Pool): Promise<Comment[]> => {
  return await db.select("comments", db.all).run(pool);
};

export const getAllByPostId = async (
  pool: pg.Pool,
  postId: number
): Promise<Comment[] | null> => {
  const comments = await db.sql<s.comments.SQL, s.comments.Selectable[]>`
    SELECT *
    FROM ${"comments"}
    WHERE ${{ post_id: postId }}
  `.run(pool);
  return comments ? comments : null;
};
