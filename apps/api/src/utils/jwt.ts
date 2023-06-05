import jwt from "jsonwebtoken"

import { env } from "../env"

export const createToken = (id: string) => jwt.sign({ id }, env.JWT_SECRET)

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET)
