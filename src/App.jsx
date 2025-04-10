import React from 'react';
import Navbar from './Sections/navbar';
import Hero from './Sections/Hero';
import 'leva/plugin'


const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative z-0">
  <Navbar />
  <Hero />
</main>

  );
}
export default App;