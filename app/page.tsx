import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Studio } from '@/components/Studio';
import { Showcase } from '@/components/Showcase';
import { Leistungen } from '@/components/Leistungen';
import { Portfolio } from '@/components/Portfolio';
import { Rezension } from '@/components/Rezension';
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
      {/* Ab hier normaler Fluss (über dem gepinnten Zoom-Through-Stack). */}
      <div className="relative z-40">
        <Portfolio />
        <Rezension />
      </div>
      {/*
        Gebaut: ✓ Hero · ✓ Studio · ✓ Leistungen · ✓ Ergebnisse · ✓ Portfolio · ✓ Bewertung
        Übergänge: Zoom-Through-Stack bis Ergebnisse; danach normaler Fluss.
        Nächste Sections: Kontakt · Footer  (Ablauf bewusst weggelassen)
      */}
    </>
  );
}
