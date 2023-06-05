import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState, createContext, useContext } from "react"

export type User = {
  id: string
  email: string | null
  username: string | null
  name: string | null
  image: string | null
  token: string
}

type UserContext = {
  user: User | null
  saveUser: (user: User) => Promise<void>
  getUser: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserContext = createContext<UserContext>({
  getUser: async () => {},
  saveUser: async () => {},
  user: null,
})

type Props = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  const saveUser = async (values: User) => {
    await AsyncStorage.setItem("user", JSON.stringify(values))
    setUser(values)
  }

  const getUser = async () => {
    const state = await AsyncStorage.getItem("user")
    if (state) setUser(JSON.parse(state))
  }

  return (
    <UserContext.Provider value={{ getUser, saveUser, user }}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(UserContext)

  return context
}
