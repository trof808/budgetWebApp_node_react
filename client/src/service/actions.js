export const action_types = {
  ADD_COUNT: 'ADD_COUNT',
  DELETE_COUNT: 'DELETE_COUNT',
  CHANGE_MODAL: 'CHANGE_MODAL',
  PARSE_CARDS: 'PARSE_CARDS',
  PARSE_BANKS: 'PARSE_BANKS'
}

export const actionAddCount = (count) => {
  return {type: action_types.ADD_COUNT, count: count};
}

export const actionDeleteItem = (id) => {
  return { type: action_types.DELETE_COUNT, id: id };
}

export const actionChangeModal = (content) => {
  return { type: action_types.CHANGE_MODAL, title: content.title, typeCount: content.typeCount };
}

export const parseCardsFromDb = (cards) => {
  return { type: action_types.PARSE_CARDS, cards: cards }
}

export const parseBanksFromDb = (bank) => {
  return { type: action_types.PARSE_BANKS, banks: bank }
}
