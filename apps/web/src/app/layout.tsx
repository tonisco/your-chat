import ApolloWrapper from "@/lib/ApolloProvider"
import ChakraProvider from "../Providers"
import "./globals.css"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ChakraProvider>{children}</ChakraProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
