let loadingCount = 0;

const loadingTexts = {
  swe: [
    'Påbörjar kommunikation med AI',
    'Anropar AI assistenten',
    'Skickar Daniels kreditkortsuppgifter',
    'Extrapolerar julstämning',
    'Finjusterar julkortets fomulering',
    'Ökar AI assistentens självförtroende',
    'Korrekturläser',
    'Sänker AI assistentens självförtroende',
    'Knäpper fingrarna för att återfå AI:ns fokus',
    'Hallå eller!?',
    'Väntar på svar',
  ],
  eng: [
    'Initializing AI communication',
    'Calling the AI assistant',
    'Send Daniel\'s credit card information',
    'Extrapolate festive spirit',
    'Adjust greeting card tone',
    'Increase the AI confidence',
    'Proof read card',
    'Decrease the AI confidense',
    'Hello??',
    'We might have lost them',
    'They should have answered by now',
    'You could try to reload the page',
  ],
  spa: [
    "Inicializando la comunicación de IA",
    "Llamando al asistente de IA",
    "Enviar información de la tarjeta de crédito de Daniel",
    "Extraer el espíritu festivo",
    "Ajustar el tono de la tarjeta de saludo",
    "Aumentar la confianza de la IA",
    "Corregir la tarjeta",
    "Disminuir la confianza de la IA",
    "¿Hola?",
    "Es posible que los hayamos perdido",
    "Deberían haber respondido ya",
    "Podrías intentar recargar la página",
  ]
}

const supported_languages = ['swe', 'eng', 'spa']

window.onload = function () {

  const index = Math.floor(Math.random() * imgs.length);

  // Get the element at the random index
  const img_name = imgs[index];
  document.body.style.backgroundImage = `url(./img/${img_name})`;


  const url = new URL(window.location.href);

  // Get the query parameters
  const params = new URLSearchParams(url.search);
  let lang = params.has('lang') ? params.get('lang') : 'swe'
  lang = supported_languages.includes(lang) ? lang : 'swe'


  texts = loadingTexts[lang]
  document.getElementById('text').innerHTML = texts[0]
  const intervalId = setInterval(function () {
    texts = loadingTexts[lang]
    currentText = texts[loadingCount % texts.length]
    document.getElementById('text').innerHTML = currentText

    loadingCount++

  }, 1500);
  getGreeting(intervalId);


};

async function getGreeting(intervalId) {


  const url = new URL(window.location.href);

  // Get the query parameters
  const params = new URLSearchParams(url.search);

  try {
    console.log(params)
    const response = await fetch('api/greeting?' + params.toString(), {
      method: 'GET',
      search: params
    });
    const data = await response.json();
    clearInterval(intervalId);
    // const data = { greeting: "\n\nHej Anna!\n\nJag hoppas att du får en härlig jul och nyår. Hoppas att du har en magisk stund med din familj. Ha en underbar jul med ljus, musik och god mat. Älskar dig! <3\n\nGlad Jul!" }
    console.log(data)
    let greeting = data.greeting.replace(/^\n\n/g, '');
    console.log(JSON.stringify(greeting))
    greeting = greeting.replace(/\n/g, '<br>');
    document.getElementById('text').classList.remove('loading')
    document.getElementById('text').innerHTML = greeting
    document.getElementById('emojis').innerHTML = data.emojis
  } catch (error) {
    console.log(error)
  }
  // Stop the interval after 10 seconds
}

const imgs = [
  "andy-holmes-lj8e0MEpmbM-unsplash.jpg",
  "annie-spratt-8ydrw1__vrs-unsplash.jpg",
  "annie-spratt-VDXtVYJVj7A-unsplash.jpg",
  "anton-scherbakov-4EmKK2xERaA-unsplash.jpg",
  "arseny-togulev-yxn2gF_v1rw-unsplash.jpg",
  "danilo-alvesd-L1n_wdhvRk0-unsplash.jpg",
  "davies-designs-studio-PvGt65_l0FU-unsplash.jpg",
  "filip-baotic-pGBzQwKc-PA-unsplash.jpg",
  "freestocks--Qf9JKLysUg-unsplash.jpg",
  "fumiaki-hayashi-0ElBya4krz4-unsplash.jpg",
  "jason-m-A9UYzD0OLeU-unsplash.jpg",
  "kieran-white-SBdmQcW8qag-unsplash.jpg",
  "kyle-desantis-8Xi49VR27Ac-unsplash.jpg",
  "kyle-desantis-DIKyGCFs51s-unsplash.jpg",
  "kyrylo-kholopkin-mjvGy4vVVLo-unsplash.jpg",
  "laura-adai-msoibj03B54-unsplash.jpg",
  "mel-poole-ChRIiQZ9h1M-unsplash.jpg",
  "mel-poole-LUPXhXj2ip0-unsplash.jpg",
  "morgane-le-breton-Ym4my-Xj8EY-unsplash.jpg",
  "nick-fewings-Uz9w7XZnEkA-unsplash.jpg",
  "niklas-ohlrogge-cLpBQqSMEWI-unsplash.jpg",
  "roberto-nickson-5PQn41LFsQk-unsplash.jpg",
  "simon-z-ohw_LGogWOw-unsplash.jpg",
  "svetozar-cenisev-R7af9oF5iJ0-unsplash.jpg",
  "szabo-viktor-HRcpw5H01Lc-unsplash.jpg",
  "thanhy-nguyen-JQ1HGXE6zjI-unsplash.jpg",
  "theo-crazzolara-HYBL_FAunt0-unsplash.jpg",
  "thor-alvis-sgrCLKYdw5g-unsplash.jpg",
  "tijana-drndarski-1L4q_S1atmc-unsplash.jpg",
  "toni-cuenca-CvFARq2qu8Y-unsplash.jpg",
  "trac-vu-adDt3pMBdLA-unsplash.jpg",
  "waldemar-brandt-bSeEaS91_ak-unsplash.jpg",
  "weronika-karczewska-cF_n3RVkKEs-unsplash.jpg",
]