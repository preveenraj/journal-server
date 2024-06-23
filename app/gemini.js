import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

import { firebaseApp } from "./firebase.js";

// Initialize the Vertex AI service
const vertexAI = getVertexAI(firebaseApp);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

// Wrap in an async function so you can use await
async function runPrompt(sourceTexts) {
  const prompt = `Write a journal entry based on the following information: 
  [
  ${sourceTexts.join("\n")}
  ]
  
  
  Rules to follow:
* Do not introduce offbeat terms into the language.
* Do not add title.
* Do not add any extreme new information.`;
  console.log("🚀 ~ runPrompt ~ prompt:", prompt)

  const singleResponse = true;

  if (singleResponse) {
    // To generate text output, call generateContent with the text input
    const result = await model.generateContent(prompt);

    const response = result.response;
    const generatedStory = response.text();
    console.log("generatedStory", generatedStory);
    return generatedStory;
  } else {
    // To generate text output, call generateContentStream with the text input

    const result = await model.generateContentStream([prompt]);
    // print text as it comes in
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
    }
  }
}

export {
    runPrompt,
}
