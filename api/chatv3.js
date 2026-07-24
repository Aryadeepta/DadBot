// api/chat.js - Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  console.log('Request body:', req.body);
  console.log('API Key present:', !!API_KEY);

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key not configured' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data));
    
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!botResponse) {
        return res.status(500).json({ error: 'Unexpected response from Gemini', details: data });
    }
    
    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch from Gemini', message: error.message });
  }
}
