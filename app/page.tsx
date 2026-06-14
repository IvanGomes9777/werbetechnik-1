import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Showcase } from '@/components/Showcase';
import { Leistungen } from '@/components/Leistungen';
import { Portfolio } from '@/components/Portfolio';
import { Standort } from '@/components/Standort';
import { Rezension } from '@/components/Rezension';
import { Kontakt } from '@/components/Kontakt';
import { Footer } from '@/components/Footer';
import { MobileContactBar } from '@/components/MobileContactBar';
import { CoverPin } from '@/components/motion/CoverPin';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero → Studio: Wipe (Studio gleitet mit Tiefe über den gepinnten Hero,
          Hero skaliert zurück + dunkelt ab — wie ursprünglich).
          Ab Studio: Zoom-Through-Übergänge wie gehabt. */}
      <CoverPin z={0} variant="wipe">
        <Hero />
      </CoverPin>
      <CoverPin
        z={10}
        className="shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.9)]"
      >
        <Studio />
      </CoverPin>
      <CoverPin z={20}>
        <Leistungen />
      </CoverPin>
      <CoverPin z={30}>
        <Showcase />
      </CoverPin>
      <CoverPin z={40}>
        <Portfolio />
      </CoverPin>
      <CoverPin z={50}>
        <Standort />
      </CoverPin>
      {/* Bewertung: bildschirmfüllend, gepinnt — Kontakt gleitet per Zoom-Through
          darüber. */}
      <CoverPin z={60}>
        <Rezension />
      </CoverPin>
      <div className="relative z-[64]">
        <Kontakt />
        <Footer />
      </div>
      <MobileContactBar />
      {/*
        Gebaut: ✓ Hero · ✓ Studio · ✓ Leistungen · ✓ Ergebnisse · ✓ Portfolio · ✓ Standort · ✓ Bewertung · ✓ Kontakt · ✓ Footer
        Übergänge: Zoom-Through-Stack zwischen allen Sections.
        (Ablauf bewusst weggelassen.)
      */}
    </>
  );
}
