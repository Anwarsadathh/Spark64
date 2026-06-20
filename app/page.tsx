import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Prizes from "@/components/Prizes";
import Venue from "@/components/Venue";
import Testimonials from "@/components/Testimonials";
import RegisterCTA from "@/components/RegisterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Experience />
      <Gallery />
      <Prizes />
      <Venue />
      <Testimonials />
      <RegisterCTA />
      <Footer />
    </main>
  );
}