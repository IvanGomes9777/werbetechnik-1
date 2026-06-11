import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Finishes } from '@/components/Finishes';
import { Leistungen } from '@/components/Leistungen';
import { HeroStack } from '@/components/motion/HeroStack';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Zoom-Through-Übergang: Studio taucht cinematisch über dem Hero auf */}
      <HeroStack hero={<Hero />} over={<Studio />} />
      <Finishes />
      <Leistungen />
      {/*
        Section-für-Section-Aufbau. Freigegeben & gebaut:
        ✓ Hero · ✓ Studio · ✓ Übergang Hero→Studio (Zoom-Through)
        ✓ Finishes (Layout B) · ✓ Leistungen (Design G · Expanding Panels)
        Nächste Sections: Portfolio · Ablauf · Rezension · Kontakt · Footer
      */}
    </>
  );
}
