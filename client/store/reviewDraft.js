const DRAFT = 'DRAFT'
const RESET = 'RESET'

export const updateDraft = draft => ({
  type: DRAFT,
  draft
})

export const resetDraft = () => ({
  type: RESET
})

export default function draftReducer(state = {}, action) {
  switch (action.type) {
    case DRAFT: {
      return {...state, ...action.draft}
    }
    case RESET: {
      return {}
    }
    default:
      return state
  }
}
