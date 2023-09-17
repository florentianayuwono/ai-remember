import { BrowserRouter } from 'react-router-dom';

import { Features, Contact, Experience, Hero, Navbar, Tech, Work } from './components';

const App = () => {

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-secondary-brown">
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Features />
        <Experience />
        <Tech />
        <Work />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
