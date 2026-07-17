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
      { label: '고요히 자리한 불상과 사리구', type: '조각·불교미술' },
      { label: '화려한 색감의 그림과 붓글씨', type: '회화·서화' },
      { label: '낯선 나라에서 건너온 이국적인 유물', type: '세계문화' },
    ],
  },
  {
    id: 2,
    text: '유물 설명판을 읽을 때, 가장 먼저 눈이 가는 정보는?',
    options: [
      { label: '이 유물이 만들어진 시대와 그 배경의 사건', type: '역사' },
      { label: '어디서, 어떻게 발굴되었는지', type: '고고' },
      { label: '어떤 믿음과 의미를 담고 있는지', type: '조각·불교미술' },
      { label: '누가, 어떤 기법으로 표현했는지', type: '회화·서화' },
      { label: '어느 나라, 어떤 문화권에서 왔는지', type: '세계문화' },
    ],
  },
  {
    id: 3,
    text: '유물 앞에 서면 나도 모르게 드는 생각은?',
    options: [
      { label: '"이 시대 사람들은 어떻게 살았을까"', type: '역사' },
      { label: '"이게 발견됐을 때 다들 놀랐겠다"', type: '고고' },
      { label: '"가만히 보고 있으니 마음이 차분해진다"', type: '조각·불교미술' },
      { label: '"이 붓터치와 색감, 정말 아름답다"', type: '회화·서화' },
      { label: '"다른 나라에도 이런 문화가 있었다니 신기하다"', type: '세계문화' },
    ],
  },
  {
    id: 4,
    text: '나의 관람 스타일에 가장 가까운 건?',
    options: [
      { label: '연표를 따라가듯, 순서대로 꼼꼼히', type: '역사' },
      { label: '발굴 현장을 탐험하듯 구석구석 파헤치며', type: '고고' },
      { label: '한 자리에 오래 머물며 조용히 사색하며', type: '조각·불교미술' },
      { label: '세부 묘사와 색감을 가까이서 감상하며', type: '회화·서화' },
      { label: '여러 전시실을 넘나들며 다양하게 비교하며', type: '세계문화' },
    ],
  },
  {
    id: 5,
    text: '지금 당신에게 필요한 시간은?',
    options: [
      { label: '차분히 지식을 쌓는 시간', type: '역사' },
      { label: '뭔가 발견하는 짜릿함', type: '고고' },
      { label: '마음을 비우는 고요한 시간', type: '조각·불교미술' },
      { label: '감성을 채우는 시간', type: '회화·서화' },
      { label: '낯선 자극, 새로운 경험', type: '세계문화' },
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
