import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import StarsCanvas from "@/components/StarsCanvas";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <StarsCanvas />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
