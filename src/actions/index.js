export function clearStore () {
  return {type: 'CLEAR_STORE'}
}

export function initUser (user) {
  return {type: 'INIT_USER', payload: user}
}

export function editExpert (expert) {
  return {type: 'EDIT_EXPERT', payload: expert}
}

export function setExpertToAccount (expert) {
  return {type: 'SET_EXPERT_TO_ACCOUNT', payload: expert}
}
