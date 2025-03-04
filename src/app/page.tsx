import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TracksSection from '@/components/sections/TracksSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PrizesSection from '@/components/sections/PrizesSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import OrganisersSection from '@/components/sections/OrganisersSection';
import FAQsSection from '@/components/sections/FAQsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TracksSection />
      <TimelineSection />
      <PrizesSection />
      <SponsorsSection />
      <OrganisersSection />
      <FAQsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
