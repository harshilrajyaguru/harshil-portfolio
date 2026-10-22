# Harshil Rajyaguru — Portfolio & "Talk with Harshil" AI Chatbot

A neo-brutalist software engineering portfolio featuring **Talk with Harshil**, a conversational AI chatbot powered by the **Groq API** (`groq-sdk`) and grounded in verified engineering achievements, system architecture details, and automated testing benchmarks.

---

## Talk with Harshil — AI Chatbot Architecture

### 1. How to Obtain a Groq API Key
1. Visit the **Groq Console** at [https://console.groq.com/keys](https://console.groq.com/keys).
2. Sign in or create a free Groq account.
3. Click **"Create API Key"**.
4. Copy your generated API key.
   > **Note on Free-Tier Usage:** Groq provides fast, free-tier access with generous rate limits. The chatbot defaults to `openai/gpt-oss-20b` (or any configured model on your Groq plan). No paid billing or credit card is required.

---

### 2. Local Development Configuration
The AI chatbot uses a server-side endpoint (`/api/chat`) to protect your API credentials.

1. Create a `.env` or `.env.local` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Add your Groq API key and model:
   ```env
   GROQ_API_KEY=gsk_your_groq_api_key_here
   GROQ_MODEL=openai/gpt-oss-20b
   ```
3. Run the development environment:
   ```bash
   npm run dev
   ```
   > **How Local Serverless Execution Works:**  
   > Standard Vite static dev servers do not natively execute Vercel serverless functions. To provide a seamless developer experience, our `vite.config.ts` includes a built-in serverless development middleware (`local-api-chat-dev-middleware`) that loads `.env` variables and mounts `api/chat.ts` at `/api/chat`.  
   > Alternatively, if you have the Vercel CLI installed globally (`npm i -g vercel`), you can also run:
   > ```bash
   > vercel dev
   > ```

---

### 3. How the Frontend Communicates with the Server Endpoint
- **Client Component:** [`src/components/chat/AskHarshilChat.tsx`](file:///c:/Users/harsh/Desktop/Portfolio1/src/components/chat/AskHarshilChat.tsx) sends HTTP POST requests to `/api/chat` with:
  ```json
  {
    "message": "Explain Vetanam's concurrency control.",
    "history": [ ...last 8 messages... ]
  }
  ```
- **Serverless Endpoint:** [`api/chat.ts`](file:///c:/Users/harsh/Desktop/Portfolio1/api/chat.ts) runs purely on the server side:
  - Enforces in-memory IP rate limiting (20 requests per minute).
  - Validates query length (≤ 1,000 characters) and bounds conversation history.
  - Performs lightweight keyword and topic retrieval across [`src/data/knowledgeBase.ts`](file:///c:/Users/harsh/Desktop/Portfolio1/src/data/knowledgeBase.ts).
  - Supplies the retrieved verified facts, system persona instructions, and conversation history to Groq chat completions using `groq-sdk`.
  - Returns the generated answer to the client.
- **Security:** The frontend code never imports or exposes `GROQ_API_KEY`. No `VITE_` prefix is used for secrets, preventing accidental client-side JavaScript bundling. `.env` and `.env.local` are explicitly ignored in `.gitignore`.

---

### 4. Configuring Server-Side Environment Variables in Vercel
When deploying to Vercel:
1. Go to your project on the [Vercel Dashboard](https://vercel.com/).
2. Navigate to **Settings** → **Environment Variables**.
3. Add the following variables:
   - **`GROQ_API_KEY`**: Paste your Groq API key (Select *Production*, *Preview*, and *Development*).
   - **`GROQ_MODEL`**: `openai/gpt-oss-20b` (or your preferred Groq model).
4. Save the variables and trigger a redeployment.

---

### 5. Deploying the Portfolio with the Chatbot
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Vercel automatically detects the Vite framework and builds the frontend while deploying files inside `/api` as native Node.js Serverless Functions.
4. Ensure your `GROQ_API_KEY` is added in Vercel Settings before testing the production chatbot.
