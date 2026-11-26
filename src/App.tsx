import { ReactLenis } from 'lenis/react'
import Navebar from './components/home/Navebar';
import TopProgress from "./components/home/TopProgress"
import RightNave from './components/home/RightNave';
import ClickCursor from './components/ClickCursor';
import Home from './components/home/Home';
import Loader from './components/Loader';
import Page2 from './components/Page2';
import Footer from './components/footer/Footer';
import Page3 from './components/Page3';
import Page4 from './components/Page4';

function App() {
  return (
    <ReactLenis root>
      <div className="w-full bg-[#111010] text-white select-none">
          <Loader/>
          <Navebar></Navebar>
          <TopProgress></TopProgress>
          <RightNave></RightNave>

          <div className='hidden xl:block'>
             <ClickCursor></ClickCursor>
          </div>

          <Home></Home>
          <Page2></Page2>
          <Page3></Page3>
          <Page4></Page4>
          <Footer></Footer>
      </div>
    </ReactLenis>
  )
}

export default App
