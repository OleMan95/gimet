export function clearStore () {
  return {type: 'CLEAR_STORE'}
}

export function initUser (user) {
  return {type: 'INIT_USER', payload: user}
}
