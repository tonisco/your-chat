import Auth from "@/components/Auth"
import Chat from "@/components/Chat"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.username) return <Auth session={session} />

  return <Chat />
}
