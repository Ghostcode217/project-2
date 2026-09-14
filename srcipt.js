const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const output = document.getElementById('output');

// Replace with your actual Gemini API Key (obtainable from Google AI Studio)
const API_KEY = "Gemini API Key"; 

generateBtn.addEventListener('click', async () => {
    const userPrompt = promptInput.value.trim();

    if (!userPrompt) {
        output.innerText = "Please enter a prompt first!";
        return;
    }

    output.innerText = "Generating AI content... Please wait...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userPrompt }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            output.innerText = data.candidates[0].content.parts[0].text;
        } else {
            output.innerText = "Error generating content. Please check your API key.";
        }
    } catch (error) {
        console.error("API Error:", error);
        output.innerText = "Failed to connect to the AI server.";
    }
});
