import { FooterAttribution } from "@/components/FooterAttribution";
import PromptEnhancer from "@/components/PromptEnhancer";
import AbstractBackground from "@/components/AbstractBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AbstractBackground />
      <div className="container mx-auto py-4 md:py-6 relative z-10">
        <PromptEnhancer />
      </div>
      <FooterAttribution />
    </div>
  );
}