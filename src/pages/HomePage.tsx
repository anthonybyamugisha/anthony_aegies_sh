import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects limit={2} />
      <Skills />
      <Certifications />
      <Contact index="05" />
    </>
  );
};

export default HomePage;
