import { BrowserRouter } from 'react-router-dom';

import { Features, Pricing, OthersWords, Hero, Navbar, WhyUs } from './components';

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
        <WhyUs />
        <div className="relative z-0">
          <Pricing />
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
