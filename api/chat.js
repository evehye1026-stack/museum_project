// Vercel 서버리스 함수 — Gemini 호출 프록시.
// GEMINI_API_KEY는 서버 환경변수에서만 읽고, 프론트/번들에는 절대 노출하지 않는다.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { systemPrompt, history = [], message } = req.body
    const apiKey = process.env.GEMINI_API_KEY

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
        // gemini-flash-latest는 기본적으로 내부 사고(thinking) 토큰을 쓰는데,
        // 이게 maxOutputTokens 예산을 먼저 소모해 답변이 잘리므로 꺼둔다.
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

    return res.status(200).json({ text })
  } catch (e) {
    return res.status(500).json({ error: 'chat failed', detail: String(e) })
  }
}
