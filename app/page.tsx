import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { HeroStack } from '@/components/motion/HeroStack';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Sticky-Stack-Übergang: Studio gleitet cinematisch über den Hero */}
      <HeroStack hero={<Hero />} over={<Studio />} />
      {/*
        Section-für-Section-Aufbau. Freigegeben & gebaut:
        ✓ Hero (Layout A · Lower-Third, Oliv, echtes Hero-Video)
        ✓ Studio (Design H · Center-Statement, Urus-Bild, Parallax)
        ✓ Übergang Hero → Studio (Sticky-Stack)
        Nächste Sections nach Freigabe:
        Finishes · Leistungen · Portfolio · Ablauf · Rezension · Kontakt · Footer
      */}
    </>
  );
}
