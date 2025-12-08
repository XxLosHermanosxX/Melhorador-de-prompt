import { MadeWithDyad } from "@/components/made-with-dyad";
import PromptEnhancer from "@/components/PromptEnhancer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4 md:py-6"> {/* Reduzindo py-8 para py-4/py-6 */}
        <PromptEnhancer />
      </div>
      <MadeWithDyad />
    </div>
  );
}