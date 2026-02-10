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

      // Handle the brainstorm action - e.g., start a new conversation turn
      // You can add custom logic here
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
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  );
}
