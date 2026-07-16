import { resolveSearchName } from './artifactNameAliases'

const LIST_URL = '/emuseum-api/relic/list'
const DETAIL_URL = '/emuseum-api/relic/detail'

async function requestJson(url, params) {
  const query = new URLSearchParams(params)
  const response = await fetch(`${url}?${query}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`요청 실패 (상태 코드 ${response.status})`)
  }

  const data = await response.json()

  if (data.resultCode && data.resultCode !== '0000') {
    throw new Error(data.resultMsg || `API 에러 (resultCode ${data.resultCode})`)
  }

  return data
}

// courses.csv의 유물명으로 e뮤지엄에서 가장 유사한 항목 하나를 찾는다.
// 이름이 그대로 안 맞는 경우를 위해 검증된 별칭(artifactNameAliases)이 있으면 그걸로 검색한다.
export async function findRelicByName(name) {
  const data = await requestJson(LIST_URL, {
    name: resolveSearchName(name),
    numOfRows: 1,
    pageNo: 1,
  })

  return data.list?.[0] ?? null
}

export async function fetchRelicDetail(id) {
  const data = await requestJson(DETAIL_URL, { id })
  return data.list?.[0] ?? null
}
