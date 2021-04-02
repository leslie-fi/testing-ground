import { name, internet, datatype } from "faker";
import pg from "pg";
import * as db from "zapatos/db";

import * as s from "zapatos/schema";
import type {
  User,
  Subscription,
  CreateUserProps,
  UpdateUserProps,
} from "../../types";

export const createSub = async (
  pool: pg.Pool,
  subscription: Subscription
): Promise<Subscription> => {
  return await db.insert("subscriptions", subscription).run(pool);
};

export const seedUsers = async (pool: pg.Pool): Promise<User[]> => {
  let users: CreateUserProps[] = [];
  for (let i = 0; i < 5; i++) {
    console.log(users);
    users.push({
      name: name.firstName(),
      password: internet.password(),
      email: internet.email(),
      subscriber: datatype.boolean(),
    });
  }
  return await db.insert("users", users).run(pool);
};

export const create = async (
  pool: pg.Pool,
  user: CreateUserProps
): Promise<User> => {
  const safeUser = { ...user, password: user.password ?? "okcomput3r" };
  return await db.insert("users", safeUser).run(pool);
};

export const all = async (pool: pg.Pool): Promise<User[]> => {
  return await db.select("users", db.all).run(pool);
};

export const update = async (
  pool: pg.Pool,
  id: number,
  fields: UpdateUserProps
): Promise<User | null> => {
  const [user] = await db.update("users", { ...fields }, { id }).run(pool);
  return user ? getOneById(pool, id) : null;
};

export const deleteById = async (
  pool: pg.Pool,
  id: number
): Promise<boolean> => {
  const deletedUser = await db.deletes("users", { id }).run(pool);

  return !!deletedUser.length;
};

export const getOneById = async (
  pool: pg.Pool,
  id: number
): Promise<User | null> => {
  return (await db.selectOne("users", { id }).run(pool)) ?? null;
};

export const getOneByEmail = async (
  pool: pg.Pool,
  email: string
): Promise<User | null> => {
  return (await db.selectOne("users", { email }).run(pool)) ?? null;
};

export const getAllSubscribers = async (pool: pg.Pool): Promise<User[]> => {
  const users = await db.sql<s.users.SQL, s.users.Selectable[]>`
    SELECT *
    FROM ${"users"}
    WHERE ${{ subscriber: true }};
  `.run(pool);

  return users;
};
