import { MadeWithDyad } from "@/components/made-with-dyad";
import PromptEnhancer from "@/components/PromptEnhancer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <PromptEnhancer />
      </div>
      <MadeWithDyad />
    </div>
  );
}