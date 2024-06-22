import twilio from "twilio";
import { appendSource } from "./persistence.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const { MessagingResponse } = twilio.twiml;

const sendMessage = async () => {
  console.log("Sending message");
  await client.messages
    .create({
      from: "whatsapp:" + process.env.TWILIO_NUMBER_FROM,
      body: "How are you doing there?",
      to: "whatsapp:" + process.env.TWILIO_NUMBER_TO,
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

const receiveMessage = async (body) => {
  console.log("🚀 ~ receiveMessage ~ body:", body);
  const userId = body.waId;
  const message = body.Body;
  await appendSource(userId, { timestamp: new Date(), text: message });
};

const receiveAndReturnMessage = async (body) => {
  console.log("🚀 ~ receiveMessage ~ body:", body);
  const message = new MessagingResponse().message(
    "You just send us: " + body.Body
  );

  return message;
};

export {
  sendMessage,
  receiveMessage,
  receiveAndReturnMessage
}
