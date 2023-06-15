import { Prisma } from "@prisma/client"

import { Session } from "./context"

type Members = Prisma.ConversationMemberGetPayload<{
  select: { user: { select: { id: true } } }
}>[]

export const isMember = (members: Members, user: Session["user"]) =>
  members.some((member) => member.user.id === user.id)
