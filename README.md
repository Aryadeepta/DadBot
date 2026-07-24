# Birthday Chatbot for Suvranu De

## Deployment Instructions (Vercel)

1.  **Repository:** Push this code to a GitHub repository.
2.  **Vercel Account:** Create a free account at [Vercel.com](https://vercel.com/).
3.  **Import Project:** In Vercel, click "Add New" -> "Project" and import your GitHub repository.
4.  **Configure:** 
    - In the project settings, go to **Environment Variables**.
    - Add a new variable: 
        - **Name:** `GEMINI_API_KEY`
        - **Value:** Your actual Gemini API key from [Google AI Studio](https://aistudio.google.com/).
    - Click **Deploy**.
5.  **Assets:** Ensure you have added `src/assets/neutral.jpg` and `src/assets/happy.jpg` to your repository before deploying.
6.  **Done!** Vercel will provide you with a live URL. Your father can use this URL to chat, without ever needing to touch an API key.

**Personality Customization:** Open `src/app.js` and edit the `CUSTOMIZE THIS SECTION` block to better mimic your father's personality.
