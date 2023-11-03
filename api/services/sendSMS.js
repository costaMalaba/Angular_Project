import AfricasTalking from "africastalking";
import dotenv from "dotenv";

dotenv.config();

const africastalking = AfricasTalking({
  apiKey: process.env.AFRICAS_API_KEY,
  username: process.env.AFRICAS_USERNAME,
});

const sms = africastalking.SMS

const sendSMS = async (options) => {
  try {
    await sms.send(options).then(res => {
        console.log(res);
        res.json({ Message: "SMS Sent Successfully" });
    });
  } catch (err) {
    console.error(err);
  }
};

export default sendSMS;
