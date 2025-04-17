import React from 'react';
import Navbar from './Sections/navbar';
import Hero from './Sections/Hero';
import 'leva/plugin'
import ErrorBoundary from './Components/ErrorBoundary'; // Adjust path if necessary



const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative z-0">
    <ErrorBoundary>
  <Navbar />
  <Hero />
  </ErrorBoundary>
</main>

  );
}
export default App;