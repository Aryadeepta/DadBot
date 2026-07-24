const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const avatar = document.getElementById('avatar');

// --- CUSTOMIZE THIS SECTION ---
const FATHER_NAME = "Suvranu De";
const PERSONALITY_TRAITS = "warm, wise, humorous, typical Bengali father, caring, slightly dramatic, smart (dean of engineering), somewhat serious";
const CATCHPHRASES = "e.g., 'Do you know how hard I work?', 'Eat your food', 'In my time...', 'I went to MIT', 'Did you know...'";
// ------------------------------

const personalityPrompt = `You are ${FATHER_NAME}. Your personality is ${PERSONALITY_TRAITS}. Use these catchphrases when appropriate: ${CATCHPHRASES}. Respond in a way that feels authentic to him. Keep responses conversational and concise.`;

async function getChatResponse(message) {
    // Call the serverless backend function instead of the direct API
    const response = await fetch('/api/chatv3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            message: `${personalityPrompt} User says: ${message}` 
        })
    });
    
    const data = await response.json();
    return data.response;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function updateAvatar(text) {
    if (!text) {
        avatar.src = '/assets/neutral.jpg';
        return;
    }
    // Simple sentiment-based heuristic
    if (text.includes('happy') || text.includes('good') || text.includes('!') ) {
        avatar.src = '/assets/happy.jpg';
    } else {
        avatar.src = '/assets/neutral.jpg';
    }
}


sendBtn.addEventListener('click', async () => {
    const message = userInput.value;
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    userInput.value = '';

    const response = await getChatResponse(message);
    chatBox.innerHTML += `<p><strong>Babai:</strong> ${response}</p>`;
    speak(response);
    updateAvatar(response);
});

