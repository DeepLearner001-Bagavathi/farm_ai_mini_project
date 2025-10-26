import AssistantForm from "./AssistantForm";

export default function AiAssistantPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">AI Farming Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Provide details about your farm to receive personalized AI-driven advice.
        </p>
      </div>
      <AssistantForm />
    </div>
  );
}
