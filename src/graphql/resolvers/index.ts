import { Resolvers } from '../../generated/resolver-types';
// export { HelloWorldResolver } from "./HelloWorldResolver";
import * as Comments from './Comments'
import * as Users from './Users'

export const resolvers: Required<Pick<Resolvers, "Mutation" | "Query">> = {
  Query: {
    ...Comments.Query,
    ...Users.Query
  },
  Mutation: {
    ...Comments.Mutation,
    ...Users.Mutation
  }
}
