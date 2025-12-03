import { MadeWithDyad } from "@/components/made-with-dyad";
import PromptEnhancer from "@/components/PromptEnhancer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <PromptEnhancer />
      </div>
      <MadeWithDyad />
    </div>
  );
}