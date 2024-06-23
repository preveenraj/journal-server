import { sendMessage, receiveMessage } from "./twilio.js";
import { appendSource, saveStory } from "./persistence.js";
import { runPrompt } from "./gemini.js";

const receiveText = async (body) => {
  console.log("🚀 ~ receiveText ~ body:", body);
  const { text, userId } = await receiveMessage(body);
  const updatedSource = await appendSource(userId, {
    timestamp: new Date(),
    text,
  });

  const generatedStory = await runPrompt(updatedSource.map((s) => s.text));
  await sendMessage(generatedStory, userId);
  await saveStory(userId, generatedStory);

  return;
};

export { receiveText };
