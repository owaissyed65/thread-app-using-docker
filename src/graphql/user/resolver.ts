import UserService, {
  CreateUserPayload,
  getUserTokenPayload,
} from "../../service/userService";

const queries = {
  getUserToken: async (_: any, payload: getUserTokenPayload) => {
    const { email, password } = payload;
    const token = await UserService.getUserToken(payload);
    return token
  },
};
const mutation = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};
export const resolvers = { queries, mutation };
