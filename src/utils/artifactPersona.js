export function greeting(artifact) {
  return `안녕! 나는 ${artifact.hall} ${artifact.room}에 있는 '${artifact.name}'야. 궁금한 걸 편하게 물어봐줘.`
}

export const SUGGESTED_QUESTIONS = ['너는 어디에 있어?', '언제 만들어졌어?', '어떤 코스에서 만날 수 있어?']

export function generateReply(artifact, question) {
  if (!artifact) {
    return '먼저 유물 도감에서 대화하고 싶은 유물을 선택해줘!'
  }

  const q = question.toLowerCase()

  if (q.includes('어디') || q.includes('위치') || q.includes('전시')) {
    return `나는 ${artifact.museum} ${artifact.hall}, ${artifact.room}의 진열장 ${artifact.caseNo}에 있어. 그 앞에 서면 나를 만날 수 있어!`
  }

  if (q.includes('언제') || q.includes('시대') || q.includes('만들') || q.includes('재질')) {
    return '아쉽게도 정확한 제작 시기나 재질은 지금 나에게 전달된 자료에는 없어. 전시실 설명판을 함께 확인해보면 더 정확할 거야!'
  }

  if (q.includes('코스')) {
    return artifact.courses.length
      ? `나는 '${artifact.courses.join("', '")}' 코스에서 만날 수 있어.`
      : '아직 나를 포함한 추천 코스는 없어. 유물 도감에서 직접 찾아와줘서 반가워!'
  }

  if (q.includes('누구') || q.includes('너는') || q.includes('넌 ') || q === '넌') {
    return `나는 '${artifact.name}'이야. ${artifact.museum} ${artifact.hall}에서 너를 기다리고 있었어.`
  }

  return '그건 내가 정확히는 알지 못하는 부분이야. 대신 내가 어디에 있는지, 어떤 코스에서 만날 수 있는지는 알려줄 수 있어!'
}
