import Footer from "@/components/footer";
import CenterContent from "@/components/home/centerContent";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <main className="flex justify-between flex-col h-screen">
      <Navigation />
      <CenterContent />
      <Footer />
    </main>
  );
}
