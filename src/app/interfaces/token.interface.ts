import { Role } from "./role.enum";

export interface IToken {
    role?:Role[],
    exp?: number,
    name?: string
}