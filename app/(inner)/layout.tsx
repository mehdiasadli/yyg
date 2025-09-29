import { Footer } from '@/components/blocks/footer-section';
import Navbar from '@/components/navbar';
import ReactLenis from 'lenis/react';

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <Navbar />

      {children}

      <Footer />
    </ReactLenis>
  );
}
