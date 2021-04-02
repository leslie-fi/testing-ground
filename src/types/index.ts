import { PgDomain_email } from "zapatos/custom";

export type User = {
  id: number;
  name: string;
  email: PgDomain_email;
  subscriber: boolean;
  password: string;
};

export type Comment = {
  id: number;
  post_id: number;
  body: string;
  author?: string | null;
};

export type Subscription = {
  id: number;
  user_id?: number | null;
};

export type CreateCommentProps = Pick<Comment, "post_id" | "body" | "author">;

export type CreateUserProps = Pick<User, "name" | "email" | "password" | "subscriber">


export type UpdateUserProps = Partial<Pick<User, "name" | "email" | "subscriber">>;
