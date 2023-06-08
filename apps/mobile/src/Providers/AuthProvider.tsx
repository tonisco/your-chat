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
  updateUsername: (username: string) => Promise<void>
  logoutUser: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserContext = createContext<UserContext>({
  getUser: async () => {},
  saveUser: async () => {},
  updateUsername: async () => {},
  user: null,
  logoutUser: async () => {},
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

  const updateUsername = async (username: string) => {
    if (user) {
      await AsyncStorage.setItem("user", JSON.stringify({ ...user, username }))
      setUser({ ...user, username })
    }
  }

  const logoutUser = async () => {
    if (user) {
      await AsyncStorage.removeItem("user")
      setUser(null)
    }
  }

  return (
    <UserContext.Provider
      value={{ getUser, saveUser, updateUsername, user, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(UserContext)

  return context
}
