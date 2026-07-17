import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// 로컬 개발(`npm run dev`)에서 `vercel dev` 없이도 /api/chat이 동작하도록,
// api/chat.js와 동일한 Gemini 프록시 로직을 Vite 개발 서버 미들웨어로 재현한다.
// 배포 시에는 이 플러그인이 아니라 api/chat.js가 Vercel 서버리스 함수로 쓰인다.
function geminiChatDevMiddleware(env) {
  return {
    name: 'gemini-chat-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next()

        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })
        req.on('end', async () => {
          try {
            const { systemPrompt, history = [], message } = JSON.parse(raw || '{}')
            const apiKey = env.GEMINI_API_KEY

            const contents = [
              ...history.map((m) => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
              })),
              { role: 'user', parts: [{ text: message }] },
            ]

            const body = {
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents,
              generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 400,
                thinkingConfig: { thinkingBudget: 0 },
              },
            }

            const r = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              },
            )
            const data = await r.json()
            const text =
              data?.candidates?.[0]?.content?.parts?.[0]?.text ??
              '…(유물이 말을 아끼고 있습니다)'

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ text }))
          } catch (e) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'chat failed', detail: String(e) }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), geminiChatDevMiddleware(env)],
    server: {
      proxy: {
        '/emuseum-api': {
          target: 'http://www.emuseum.go.kr/openapi',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/emuseum-api/, ''),
          configure: (proxy) => {
            // serviceKey는 여기서 서버 쪽에서 주입한다.
            // 브라우저가 보내는 요청/번들 어디에도 실제 키 값이 노출되지 않는다.
            proxy.on('proxyReq', (proxyReq) => {
              const url = new URL(proxyReq.path, 'http://internal')
              url.searchParams.set('serviceKey', env.EMUSEUM_KEY_DEC)
              proxyReq.path = url.pathname + url.search
            })
          },
        },
      },
    },
  }
})
