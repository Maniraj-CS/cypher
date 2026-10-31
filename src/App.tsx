import { ReactLenis, useLenis } from 'lenis/react'
import Loader from "./components/Loader"
import Navebar from './components/home/Navebar';

function App() {
  const lenis = useLenis();

  return (
    <ReactLenis root>
      <div className="w-full bg-[#111010] text-white select-none">
          <Loader/>
          <Navebar></Navebar>
      </div>
    </ReactLenis>
  )
}

export default App
