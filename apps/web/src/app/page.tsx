import Auth from "@/components/Auth"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return <Auth session={session} />
}
