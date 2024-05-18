document.addEventListener('DOMContentLoaded', () => {
    const chatContent = document.getElementById('chat-content');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    const botResponses = [
        'Opowiedz mi coś jeszcze.',
        'Dlaczego tak uważasz?',
        'Serio?!',
        'No co ty',
        'Nie...ciekawe',
        'Kogo to obchodzi?',
        'Powiedz to komuś, kto lubi słuchać nudów',
        'To co piszesz jest tak nudne, że aż eurowizja wydaje się ciekawa',
        'Mam 2137 ciekawszych rzeczy do robienia'
    ];

    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash;
    };

    const getBotResponse = (message) => {
        const hash = Math.abs(hashCode(message));
        return botResponses[hash % botResponses.length];
    };

    const addMessage = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        chatContent.appendChild(messageElement);
        chatContent.scrollTop = chatContent.scrollHeight;
    };

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage('Ty', message);
            const botMessage = getBotResponse(message);
            addMessage('Bot', botMessage);
            userInput.value = '';
        }
    };

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    addMessage('Bot', 'Cześć, co tam?');
});