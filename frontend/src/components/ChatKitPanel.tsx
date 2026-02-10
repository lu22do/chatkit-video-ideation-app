import { useMemo } from "react";
import { ChatKit, useChatKit, ChatKitOptions } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {  
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const handleWidgetAction = async (event: any) => {
    if (event.type === "idea.brainstorm") {
      const { id, topic } = event.payload;
      console.log("Brainstorm action received:", { id, topic });

      // Start a new conversation turn with the brainstorm topic
      await chatkit.sendUserMessage({ text: `Let's develop the idea: ${topic}` });
    }
    
    if (event.type === "talkingPoint.delete") {
      const { id } = event.payload;
      console.log("Deleted talking point:", id);
    }
  };

  const options: ChatKitOptions = {
    api: { getClientSecret },
    theme: "light",
    locale: "en",
    initialThread: null,
    widgets: {
      onAction: handleWidgetAction, // Handle client-side actions
    },
    startScreen: {
      greeting: "Let's ideate together! Where should we start?",
      prompts: [
        {
          icon: "circle-question",
          label: "Explore some themes",
          prompt: "Explore some themes",
        },
        {
          icon: "bolt",
          label: "What's trending?",
          prompt: "What's trending?",
        },
        {
          icon: "sparkle",
          label: "Generate ideas",
          prompt: "Generate 3 ideas",
        },
        {
          icon: "sparkle",
          label: "Goal setting",
          prompt: "Goal setting",
        },
      ],
    },
  };

  const chatkit = useChatKit(options);

  return (
    <div className="flex flex-col h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  );
}
