import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
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
