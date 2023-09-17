import { BrowserRouter } from 'react-router-dom';

import { Features, Contact, OthersWords, Hero, Navbar, Tech, Work } from './components';

const App = () => {

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-[#57375D]">
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Features />
        <OthersWords />
        <Work />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
