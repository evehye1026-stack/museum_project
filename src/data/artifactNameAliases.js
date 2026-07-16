// courses.csv의 유물명이 e뮤지엄 API의 공식 명칭과 달라 검색이 안 되는 경우를 위한 별칭 매핑.
// 하나하나 실제 API로 검증해서 확실한 것만 등록함 (전수 자동매핑은 오탐 위험이 커서 제외).
const artifactNameAliases = {
  '[촉각전시물] 백제금동대향로': '백제금동대향로',
  '농경문청동기(복제품)': '농경문청동기',
  '분청사기 박지 철채 모란무늬 자라병': '모란무늬 자라병',
  '모란 버들 갈대무늬 매병': '갈대무늬 매병',
  '복희와 여와 그림': '복희와 여와',
  '미투나, 사랑을 나누는 남녀': '미투나',
  '청녕사년명 동종': '청녕',
  '경천사십층석탑': '경천사',
  '천흥사 종': '천흥사',
  "'전주성'명 수막새": '전주성',
  '감산사미륵보살과 아미타불': '감산사',
}

export function resolveSearchName(name) {
  return artifactNameAliases[name] ?? name
}

export default artifactNameAliases
