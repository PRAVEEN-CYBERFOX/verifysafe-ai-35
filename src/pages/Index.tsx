import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { DatasetSection } from "@/components/DatasetSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <UploadSection />
        <DatasetSection />
      </main>
    </div>
  );
};

export default Index;