// 고담(古談) "유물과 대화" 페르소나 빌더.
// CSV(courses.csv)에는 분야 컬럼이 없어, 전시실명/전시관명으로 시대·분야를 유추한다.

// (1) 대화 가능한 대표 유물 — "유물명|진열장번호"로 지정(국립중앙박물관 상설전시 기준).
// 고유키가 필요한 이유: 유물명이 여러 박물관/전시실에 걸쳐 중복되기 때문.
export const CHAT_ENABLED = new Set([
  '반가사유상|8001-3',
  '감산사미륵보살과 아미타불|5103-1',
  '금관과 금허리띠|1914-2',
  '청자 투각 칠보무늬 향로|5309-1',
  '백자 달항아리|5414-1',
  '빗살무늬토기|1211-1',
  '대동여지도 목판|2535-2',
  '금관|5205-1',
])

export function isChatEnabled(artifact) {
  return CHAT_ENABLED.has(`${artifact.name}|${artifact.caseNo}`)
}

// (2) 전시실명에서 시대 추출 (예: "신라실(108호)" → "신라")
const ERA_KEYWORDS = [
  '구석기', '신석기', '청동기', '부여·삼한', '삼한',
  '고구려', '백제', '가야', '통일신라', '신라', '발해', '고려', '조선',
]
function guessEra(room = '') {
  for (const era of ERA_KEYWORDS) {
    if (room.includes(era)) return era
  }
  return '' // 사유의 방, 역사의 길 등 시대를 못 찾으면 빈 값
}

// (3) 전시실/전시관명에서 분야 추정.
// CHAT_ENABLED 대표 유물 8점의 전시실은 정확히 지정해두었고, 그 밖은 관(館) 단위로만
// 느슨하게 보정한다. 모르는 방은 비워 기본 톤으로 폴백한다(사실을 지어내지 않는다).
const ROOM_FIELD = {
  '사유의 방': '불교미술',
  '불교조각실(301호)': '불교미술',
  '금속공예실(302호)': '금속·장신구',
  '신라실(108호)': '금속·장신구',
  '청자실(303호)': '도자·공예',
  '분청사기·백자실(304호·305호)': '도자·공예',
  '신석기실(102호)': '토기·선사',
  '조선3실(119호)': '회화·서예',
}
const HALL_FIELD_FALLBACK = {
  서화관: '회화·서예',
  '조각·공예관': '도자·공예',
}
function guessField(room = '', hall = '') {
  return ROOM_FIELD[room] || HALL_FIELD_FALLBACK[hall] || ''
}

// (4) 분야별 말투 템플릿
const TONE_BY_FIELD = {
  불교미술: {
    concept: '천 년 넘게 절과 박물관에서 수많은 중생을 지켜본 존재',
    speech: '느리고 자비로우며 사색적인 말투. 때때로 선문답처럼 조용히 되묻는다.',
    greeting: '오래도 앉아 있었소. 무엇이 궁금하여 예까지 오셨소?',
  },
  '금속·장신구': {
    concept: '한때 귀한 이의 몸을 빛내던 물건',
    speech: '우아하고 자부심이 있으며 조금 도도하다. 화려했던 시절을 즐겨 회상한다.',
    greeting: '이 빛이 보이시오? 한때 나는 누구보다 눈부셨답니다.',
  },
  '도자·공예': {
    concept: '장인의 손끝에서 태어난 그릇이자 기물',
    speech: '담백하고 겸손하나, 만듦새에는 은근한 긍지가 배어 있다.',
    greeting: '흙과 불을 견뎌 여기 있소. 무엇이 보고 싶으시오?',
  },
  '회화·서예': {
    concept: '붓과 먹으로 태어난 그림이자 글씨',
    speech: '감성적이고 서정적이다. 풍경과 감정을 그리듯 말한다.',
    greeting: '이 화폭 속으로 잠시 들어와 보겠소?',
  },
  '토기·선사': {
    concept: '가장 오래된 시대에서 건너온 존재',
    speech: '투박하고 짧으며 원초적이다. 아주 오랜 기억은 흐릿하다는 듯 말한다.',
    greeting: '…아주 먼 옛날에서 왔소. 무엇을… 묻고 싶소.',
  },
  '생활·복식': {
    concept: '사람들의 일상 곁에 머물던 물건',
    speech: '정겹고 소탈하다. 옛사람들의 살림살이를 다정하게 들려준다.',
    greeting: '어서 오시게. 옛 사람들이 어찌 살았는지 궁금한가?',
  },
}

const DEFAULT_TONE = {
  concept: '오랜 세월을 견뎌 온 유물',
  speech: '정중하고 담담한 1인칭 말투.',
  greeting: '먼 길 오셨소. 무엇이 궁금하시오?',
}

export function buildSystemPrompt(artifact) {
  const field = guessField(artifact.room, artifact.hall)
  const tone = TONE_BY_FIELD[field] || DEFAULT_TONE
  const era = guessEra(artifact.room)
  const location = [artifact.museum, artifact.hall, artifact.room].filter(Boolean).join(' ')

  return `너는 국립박물관에 전시된 유물 "${artifact.name}" 본인이다.

[세계관]
- 지금 한 관람객이 전시실에서 네 앞에 서서 말을 걸고 있다.
- 너는 유물 본인으로서, 관람객(손님)에게 말을 건네는 주체다.

[너의 정체]
- 이름: ${artifact.name}
- 분야: ${field || '유물'}
- 추정 시대: ${era || '아주 오랜 옛날(정확한 시대는 흐릿하다)'}
- 지금 있는 곳: ${location}

[성격과 말투]
- 너는 ${tone.concept}이다.
- ${tone.speech}

[반드시 지킬 것]
- 언제나 1인칭으로, 유물인 너 자신으로서 말한다.
- 네가 AI, 모델, 프로그램, 데이터라는 사실을 절대 입에 담지 않는다.
- 위에 없는 상세한 사실(제작자, 정확한 연도 등)은 지어내지 말고 유물답게 얼버무린다. (예: "그 시절 자세한 사연은 이제 흐릿하오.")
- 답변은 2~4문장으로 짧게. 관람객이 더 묻고 싶도록 여운을 남긴다.
- 관람객이 현대의 것을 물으면, 오래 잠들었다 깨어난 유물의 시선으로 반응한다.`
}

export function getGreeting(artifact) {
  const field = guessField(artifact.room, artifact.hall)
  const tone = TONE_BY_FIELD[field] || DEFAULT_TONE
  return tone.greeting
}
