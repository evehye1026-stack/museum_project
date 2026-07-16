// 퀴즈 결과 유형의 field 값은 utils/recommend.js의 THEME_OPTIONS와 반드시 같은 문자열을 써야
// 기존 recommendCourses(courses, { themes }) 매칭 로직을 그대로 재사용할 수 있다.
const TYPES = ['역사', '고고', '조각·불교미술', '회화·서화', '세계문화']

export const RESULT = {
  역사: {
    name: '시간을 걷는 사람',
    field: '역사',
    desc: '유물 하나하나가 품고 있는 시대와 사건에 마음이 끌려요. 연표를 따라가듯 순서대로 둘러보는 걸 좋아하는 당신에게는 역사의 흐름이 잘 드러나는 코스를 추천해요.',
  },
  고고: {
    name: '발굴꾼',
    field: '고고',
    desc: '흙 속에서 막 꺼낸 듯한 유물, 그 발견의 순간이 궁금한 당신. 선사·고대의 흔적을 직접 파헤치듯 만나는 코스가 잘 맞아요.',
  },
  '조각·불교미술': {
    name: '고요한 명상가',
    field: '조각·불교미술',
    desc: '조용히 앉아있는 불상 앞에서 마음이 차분해지는 타입이군요. 사유와 신앙이 담긴 조각·불교미술 중심 코스를 추천해요.',
  },
  '회화·서화': {
    name: '붓끝을 좇는 예술가',
    field: '회화·서화',
    desc: '그림의 색감, 글씨의 획 하나에도 눈이 가는 당신에게는 회화와 서예가 돋보이는 코스가 어울려요.',
  },
  세계문화: {
    name: '낯선 곳의 여행자',
    field: '세계문화',
    desc: '익숙하지 않은 나라의 유물일수록 더 흥미로운 당신. 세계 각지의 문화를 만나는 코스를 추천해요.',
  },
}

export const QUESTIONS = [
  {
    id: 1,
    text: '박물관에 들어서면 가장 먼저 눈길이 가는 건?',
    options: [
      { label: '시간 순서대로 정리된 연표와 설명판', type: '역사' },
      { label: '땅속에서 막 파낸 듯한 토기와 유물', type: '고고' },
      { label: '조용히 앉아있는 불상과 사리구', type: '조각·불교미술' },
      { label: '화려한 색감의 그림과 붓글씨', type: '회화·서화' },
      { label: '낯선 나라에서 온 이국적인 유물', type: '세계문화' },
    ],
  },
  {
    id: 2,
    text: '친구가 "이 유물 뭐야?"라고 물으면 당신의 대답은?',
    options: [
      { label: '"이게 만들어진 시대 배경이 진짜 흥미로워"', type: '역사' },
      { label: '"이거 어디서 발굴됐는지 알아?"', type: '고고' },
      { label: '"보고 있으면 마음이 차분해지지 않아?"', type: '조각·불교미술' },
      { label: '"이 붓터치 좀 봐, 예술이다"', type: '회화·서화' },
      { label: '"다른 나라에도 이런 게 있다니 신기해"', type: '세계문화' },
    ],
  },
  {
    id: 3,
    text: '여행을 간다면 끌리는 쪽은?',
    options: [
      { label: '역사 유적지 답사', type: '역사' },
      { label: '고대 유적 발굴 현장 체험', type: '고고' },
      { label: '조용한 산사에서의 템플스테이', type: '조각·불교미술' },
      { label: '미술관 순례', type: '회화·서화' },
      { label: '여러 나라를 도는 배낭여행', type: '세계문화' },
    ],
  },
  {
    id: 4,
    text: '끌리는 색과 질감은?',
    options: [
      { label: '세월이 느껴지는 짙은 청동색', type: '역사' },
      { label: '투박하고 흙빛이 도는 질감', type: '고고' },
      { label: '은은한 금빛과 고요함', type: '조각·불교미술' },
      { label: '화사한 채색과 먹빛의 대비', type: '회화·서화' },
      { label: '다채로운 원색과 이국적인 무늬', type: '세계문화' },
    ],
  },
  {
    id: 5,
    text: '지금 당신에게 필요한 건?',
    options: [
      { label: '차분히 지식을 쌓는 시간', type: '역사' },
      { label: '뭔가 발견하는 짜릿함', type: '고고' },
      { label: '마음을 비우는 시간', type: '조각·불교미술' },
      { label: '감성을 채우는 시간', type: '회화·서화' },
      { label: '새로운 경험', type: '세계문화' },
    ],
  },
]

// answers: 질문 5개에 대한 응답으로 얻은 type 문자열 배열 (예: ['역사', '고고', '역사', ...])
export function scoreResult(answers) {
  const counts = {}
  for (const type of answers) {
    counts[type] = (counts[type] || 0) + 1
  }

  let bestType = TYPES[0]
  let bestCount = -1
  for (const type of TYPES) {
    const count = counts[type] || 0
    if (count > bestCount) {
      bestCount = count
      bestType = type
    }
  }

  return RESULT[bestType]
}
