import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const { MessagingResponse } = twilio.twiml;

const sendMessage = async (message, userId = process.env.TWILIO_NUMBER_TO) => {
  console.log("Sending message");
  await client.messages
    .create({
      from: "whatsapp:" + process.env.TWILIO_NUMBER_FROM,
      body: message,
      to: "whatsapp:" + userId,
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

const receiveMessage = async (body) => {
  const userId = body.WaId;
  const text = body.Body;

  return { text, userId };
};

// const receiveAndReturnMessage = async (body) => {
//   const message = new MessagingResponse().message(
//     "You just send us: " + body.Body
//   );

//   return message;
// };

export {
  sendMessage,
  receiveMessage,
  // receiveAndReturnMessage
}
