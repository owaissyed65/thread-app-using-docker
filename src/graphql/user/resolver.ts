import UserService, {
  CreateUserPayload,
  getUserTokenPayload,
} from "../../service/userService";

const queries = {
  getUserToken: async (_: any, payload: getUserTokenPayload) => {
    const { email, password } = payload;
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getUserFromToken: async (_: any, payload: any, context: any) => {
    if (context && context.user){
      return await UserService.getUserById(context.user.id)
    }
    throw new Error("Un Authorized")
  },
};
const mutation = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};
export const resolvers = { queries, mutation };
