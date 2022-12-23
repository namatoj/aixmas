function engPrompt(mood, to) {
  mood = mood !== '' ? mood : 'joyful'
  if (to !== '') {
    to = 'to ' + to
  }

  return `Write a ${mood} holiday greeting ${to}`
}

function spaPrompt(mood, to) {
  mood = mood !== '' ? mood : 'feliz'

  if (to !== '') {
    to = 'a ' + to
  }

  return `Escribir un ${mood} saludo de navidad ${to}`
}

function swePrompt(mood, to) {
  mood = mood !== '' ? mood : 'glad'

  if (to !== '') {
    to = 'till ' + to
  }

  return `Skriv en ${mood} julhälsning ${to}`
}

const prompts = {
  eng: engPrompt,
  spa: spaPrompt,
  swe: swePrompt,

}

export default async function handler(req, res) {
  let { mood = '', to = '', lang = 'swe' } = req.query;

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });


  const prompt = prompts[lang](mood, to)
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
