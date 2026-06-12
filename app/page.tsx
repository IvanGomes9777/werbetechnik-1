import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Showcase } from '@/components/Showcase';
import { Leistungen } from '@/components/Leistungen';
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
      <div className="relative z-30">
        <Showcase />
      </div>
      {/*
        Gebaut: ✓ Hero · ✓ Studio · ✓ Leistungen · ✓ Ergebnisse (Vorher/Nachher)
        Übergänge: Zoom-Through-Stack zwischen allen Sections
        Nächste Sections: Portfolio · Ablauf · Rezension · Kontakt · Footer
      */}
    </>
  );
}
