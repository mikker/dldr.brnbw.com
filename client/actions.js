const fetch = window.fetch

export function setUrl (url) {
  return { type: 'SET_URL', url }
}

export function getProgramCard () {
  return (dispatch, getState) => {
    fetch(proxy(getState().url))
    .then(resp => resp.json())
    .then(card => {
      dispatch(setProgramCard(card))
    })
  }
}

export function setProgramCard (program_card) {
  return { type: 'SET_PROGRAM_CARD', program_card }
}

function proxy (url) {
  return `https://proxy.brnbw.com/?u=${encodeURIComponent(url)}`
}
