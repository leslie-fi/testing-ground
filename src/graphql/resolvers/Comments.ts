import * as DB from "../../db";
import { MutationResolvers, QueryResolvers } from "../../generated/resolver-types";

const comments: QueryResolvers["comments"] = async (_root, _, { db }) => {
  return await DB.Comments.all(db);
}

const postComments: QueryResolvers["postComments"] = async (_root, {post_id}, { db }) => {
  return await DB.Comments.getAllByPostId(db, post_id) ?? [];
}

const createComment: MutationResolvers["createComment"] = async (_root, { input }, { db }) => {
  return await DB.Comments.create(db, input)
}

export const Query = {
  comments,
  postComments
}

export const Mutation = {
  createComment
}
