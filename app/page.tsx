import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Finishes } from '@/components/Finishes';
import { Leistungen } from '@/components/Leistungen';
import { CoverPin } from '@/components/motion/CoverPin';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Einheitliche Zoom-Through-Übergänge: jede Section wird gepinnt,
          die nächste schiebt sich cinematisch darüber. */}
      <CoverPin z={0}>
        <Hero />
      </CoverPin>
      <CoverPin z={10}>
        <Studio />
      </CoverPin>
      <CoverPin z={20}>
        <Finishes />
      </CoverPin>
      <div className="relative z-30">
        <Leistungen />
      </div>
      {/*
        Gebaut: ✓ Hero · ✓ Studio · ✓ Finishes · ✓ Leistungen
        Übergänge: Zoom-Through-Stack zwischen allen Sections
        Nächste Sections: Portfolio · Ablauf · Rezension · Kontakt · Footer
      */}
    </>
  );
}
