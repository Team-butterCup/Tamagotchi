const initialState = {
  rating: 5,
  description: '',
  userId: null,
  tamagotchiId: null
}

const DRAFT = 'DRAFT'
const RESET = 'RESET'

export const updateDraft = draft => ({
  type: DRAFT,
  draft
})

export const resetDraft = () => ({
  type: RESET
})

export default function draftReducer(state = initialState, action) {
  switch (action.type) {
    case DRAFT: {
      return {...state, ...action.draft}
    }
    case RESET: {
      return initialState
    }
    default:
      return state
  }
}
