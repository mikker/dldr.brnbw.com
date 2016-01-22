import { extractSlugFromUrl } from './utils'

const initialState = {
  url: undefined,
  slug: undefined,
  programCard: undefined,
  usePrettyFileName: true
}

export function stateReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_URL':
      return {
        ...state,
        url: action.url,
        slug: extractSlugFromUrl(action.url)
      }
    case 'SET_PROGRAM_CARD':
      return {
        ...state,
        programCard: action.programCard
      }
    case 'SET_PRETTY_PROGRAM_NAME':
      return {
        ...state,
        usePrettyFileName: action.usePrettyFileName
      }
    default:
      return state
  }
}

