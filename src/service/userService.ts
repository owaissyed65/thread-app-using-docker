import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db";
import jwt from "jsonwebtoken";
const SECRET_KEY: string =
  process.env.SECRET_KEY || "GRAPHQLTHREAD@142@WEBDEVELOPER@FULLSTACk";
export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface getUserTokenPayload {
  email: string;
  password: string;
}
class UserService {
  // generate hash
  private static generateHash(salt: string, password: string) {
    const hashPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashPassword;
  }

  // createPasword
  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = randomBytes(32).toString("hex");
    const hashPassword = this.generateHash(salt, password);
    return prismaClient.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        salt,
      },
    });
  }

  // for get all necessary information of users
  private static getUserByEmail(email: string) {
    return prismaClient.users.findUnique({ where: { email } });
  }
  // for creating tokens
  private static async createToken(id: string, email: string) {
    const token = jwt.sign({ id, email }, SECRET_KEY);
    return token;
  }
  // for get tokens
  public static async getUserToken(payload: getUserTokenPayload) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("Invalid credentials or doesn't exit");
    const userSalt = user.salt;
    const hashPassword = this.generateHash(userSalt, password);
    if (hashPassword !== user.password) throw new Error("Invalid Credentials");
    const token = this.createToken(user.id, user.email);
    return token;
  }
}
export default UserService;
