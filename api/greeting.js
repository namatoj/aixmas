
export default async function handler(req, res) {
  let { mood = 'Glad', to = '' } = req.query;

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (to !== '') {
    to = 'till ' + to
  }

  const prompt = `Skriv en ${mood} julhälsning ${to}`
  console.log('prompt:', prompt)

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  const greeting = response.data.choices[0].text

  const response_emoji = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Sammanfatta med emojis: ${greeting}`,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  const emojis = response_emoji.data.choices[0].text

  return res.send({ greeting: greeting, emojis: emojis });
}
