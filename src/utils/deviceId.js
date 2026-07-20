const STORAGE_KEY = 'godam-device-id'

// 로그인 없이 즐겨찾기/진도/최근본항목을 Supabase에 저장하기 위한 익명 기기 ID.
// 브라우저 localStorage에 한 번 생성해 두고 재사용한다.
export function getDeviceId() {
  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}
