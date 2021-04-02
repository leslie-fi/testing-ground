import pg from "pg";
import { Request, Response } from "express";

export type Context = {
  req: Request;
  res: Response;
  db: pg.Pool;
};
