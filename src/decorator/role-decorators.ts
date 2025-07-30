import { SetMetadata } from "@nestjs/common"
import { UsersRole } from "@prisma/client"

export const KEY = "KEY"
export const RoleD = (...roles: UsersRole[])=> SetMetadata(KEY, roles)