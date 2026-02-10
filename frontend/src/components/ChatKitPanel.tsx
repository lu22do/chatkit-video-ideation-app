import { useMemo, useRef, useCallback } from "react";
import { ChatKit, useChatKit, ChatKitOptions } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const chatKitRef = useRef<any>(null);
  
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId),
    []
  );

  const handleWidgetAction = useCallback(async (event: any) => {
    if (event.type === "idea.brainstorm") {
      const { id, topic } = event.payload;
      console.log("Brainstorm action received:", { id, topic });

      console.log("checking chatKitRef: ", chatKitRef);

      // Start a new conversation turn with the brainstorm topic
      const brainstormPrompt = `Let's brainstorm about: ${topic}`;
      if (chatKitRef.current?.sendMessage) {
        console.log("calling sendMessage with prompt: ", brainstormPrompt);
        await chatKitRef.current.sendUserMessage({content: brainstormPrompt});
      }
    }
  }, []);

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
  chatKitRef.current = chatkit;

  return (
    <div className="flex h-[90vh] w-full rounded-2xl bg-white shadow-sm transition-colors dark:bg-slate-900">
      <ChatKit control={chatkit.control} className="h-full w-full" />
    </div>
  );
}
