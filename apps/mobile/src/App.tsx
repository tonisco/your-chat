import Providers from "./Providers"
import Auth from "./Screens/Auth"
import ToggleTheme from "./Utils/ToggleTheme"

export default function App() {
  return (
    <Providers>
      <ToggleTheme />
      <Auth />
    </Providers>
  )
}
