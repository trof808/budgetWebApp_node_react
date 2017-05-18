export const action_types = {
  ADD_COUNT: 'ADD_COUNT',
  CHANGE_MODAL: 'CHANGE_MODAL'
}

export const actionAddCount = (count) => {
  return {type: action_types.ADD_COUNT, count: count};
}

export const actionChangeModal = (content) => {
  return { type: action_types.CHANGE_MODAL, title: content.title, typeCount: content.typeCount };
}
