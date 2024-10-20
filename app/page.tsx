import Footer from "@/components/ui/Landing/Footer";
import Hero from "@/components/ui/Landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-white">
      <Hero />
      <Footer />
    </div>
  );
}
