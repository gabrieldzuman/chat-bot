document.getElementById('send-btn').addEventListener('click', async () => {
    handleSendMessage();
});

document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleSendMessage();
    }
});

function sendWelcomeMessage() {
    const welcomeMessage = 'Olá! Como posso ajudar você com suas dúvidas sobre Fonoaudiologia?';
    appendMessage('bot', welcomeMessage); 
}

window.onload = () => {
    sendWelcomeMessage(); 
};

async function handleSendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message) {
        appendMessage('user', message);
        userInput.value = '';
        toggleLoading(true);

        const loadingTimeout = setTimeout(async () => {
            const response = await getChatbotResponse(message);
            appendMessage('bot', response); 
            toggleLoading(false);
        }, 2500);

        setTimeout(() => {
            clearTimeout(loadingTimeout); 
            toggleLoading(false); 
        }, 4500);
    }
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

    if (sender === 'bot') {
        typeMessage(messageDiv, message); 
    } else {
        messageDiv.textContent = message;
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeMessage(element, message) {
    element.textContent = ''; 
    const delay = 33; 
    let index = 0;

    const interval = setInterval(() => {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
        } else {
            clearInterval(interval); 
        }
    }, delay);
}

function toggleLoading(isLoading) {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = isLoading ? 'flex' : 'none';
}

async function getChatbotResponse(message) {
const knowledgeBase = {
    "o que é fonoaudiologia": `
      A fonoaudiologia é a ciência que estuda e trata a comunicação humana, englobando a fala, a voz, a audição e a deglutição. 
      Essa área do conhecimento é essencial para a promoção da saúde da comunicação e da qualidade de vida. 
      Fonoaudiólogos atuam na prevenção, avaliação e tratamento de distúrbios relacionados à comunicação e alimentação, 
      contribuindo para a qualidade de vida dos pacientes. A fonoaudiologia é fundamental em diversas fases da vida, desde 
      a infância até a terceira idade.
    `,
    "disturbios de fala": `
      Distúrbios de fala incluem condições como gagueira, disartria e apraxia, que afetam a fluência, articulação e clareza da fala. 
      Esses distúrbios podem ter causas neurológicas, emocionais ou estruturais, tornando essencial uma avaliação detalhada. 
      O tratamento é individualizado e pode envolver terapia fonoaudiológica, exercícios de respiração e práticas de fala, 
      além de técnicas de relaxamento para reduzir a ansiedade do paciente.
    `,
    "disturbios de voz": `
      Distúrbios de voz são alterações que afetam a qualidade vocal, como rouquidão, cansaço ao falar e alterações de tom. 
      Essas condições podem ser causadas por abuso vocal, refluxo ou alergias. O tratamento pode incluir 
      técnicas de modulação vocal, exercícios respiratórios e orientação sobre cuidados vocais, visando melhorar a saúde vocal 
      e prevenir futuras complicações.
    `,
    "linguagem e desenvolvimento": `
      O desenvolvimento da linguagem varia entre as crianças; atrasos significativos podem indicar a necessidade de avaliação 
      fonoaudiológica para identificar intervenções adequadas. A comunicação é uma habilidade que se desenvolve ao longo do tempo, 
      e cada criança tem seu ritmo. A intervenção precoce pode acelerar esse processo e minimizar dificuldades futuras.
    `,
    "como escolher um fonoaudiologo": `
      Para escolher um fonoaudiólogo, considere sua formação, experiência na área desejada e busque recomendações de outros 
      pacientes. É importante que o profissional esteja atualizado nas melhores práticas e tenha experiência específica na 
      condição que você deseja tratar, garantindo um atendimento de qualidade e eficaz. 
    `,
    "exercícios para a fala": `
      Exercícios úteis para melhorar a fala incluem leitura em voz alta, jogos de palavras, práticas de pronúncia e exercícios de 
      articulação. Consultar um fonoaudiólogo pode ajudar a personalizar os exercícios conforme a necessidade de cada indivíduo, 
      maximizando os resultados e promovendo um desenvolvimento mais eficaz das habilidades comunicativas.
    `,
  };

  const searchKnowledgeBase = (message) => {
    const lowerMessage = removeAccents(message.toLowerCase());
    console.lsdog(`Buscando na base de conhecimento: ${lowerMessage}`); 
  
    for (let key in knowledgeBase) {
      if (lowerMessage.includes(removeAccents(key))) {
        return knowledgeBase[key];
      }
    }
  
    return null;
  };

    const normalizedMessage = message.toLowerCase();

    if (knowledgeBase[normalizedMessage]) {
        return knowledgeBase[normalizedMessage];
    } else {
        return "Desculpe, não entendi a sua pergunta :("; 
    }
}

const clearButton = document.getElementById('clear-btn');

clearButton.addEventListener('click', clearChat); 

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; 
}

const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
