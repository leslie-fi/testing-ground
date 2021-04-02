import * as DB from "../../db";
import {
  MutationResolvers,
  QueryResolvers,
} from "../../generated/resolver-types";

const users: QueryResolvers["users"] = async (_root, _, { db }) => {
  return await DB.Users.all(db);
};

const subscribedUsers: QueryResolvers["subscribedUsers"] = async (
  _root,
  _,
  { db }
) => {
  return (await DB.Users.getAllSubscribers(db)) ?? undefined;
};

const createUser: MutationResolvers["createUser"] = async (
  _root,
  { input },
  { db }
) => {
  return await DB.Users.create(db, input)
};

const userById: QueryResolvers["userById"] = async (_root, { id }, { db }) => {
  return (await DB.Users.getOneById(db, id)) ?? null
};

const userByEmail: QueryResolvers["userByEmail"] = async (_root, { email }, { db }) => {
  return (await DB.Users.getOneByEmail(db, email)) ?? null;
}
const deleteUser: MutationResolvers["deleteUser"] = async (_root, { id }, { db }) => {
  return await DB.Users.deleteById(db, id);
}
const updateUser: MutationResolvers["updateUser"] = async (_root, { id, input }, {db}) => {
  return (await DB.Users.update(db, id, input)) ?? null;
}


export const Query = {
  users,
  userById,
  userByEmail,
  subscribedUsers,
};

export const Mutation = {
  createUser,
  updateUser,
  deleteUser
};
