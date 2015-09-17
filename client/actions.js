const drTvRegex = /https?:\/\/(www\.)?dr.dk\/tv\//

export function setUrl (url) {
  return { type: 'SET_URL', url }
}

export function getProgramCard () {
  return (dispatch, getState) => {
    const {url, slug} = getState()

    if (!url) {
      window.alert('No URL specified')
      return
    }
    if (!url.match(drTvRegex)) {
      window.alert('URL doesn\'t seem to be from DR TV?')
      return
    }

    fetchCard(slug).then(card => {
      dispatch(setProgramCard(card))
    })
  }
}

export function setProgramCard (programCard) {
  return { type: 'SET_PROGRAM_CARD', programCard }
}

function fetchCard (slug) {
  const url = proxy(`http://www.dr.dk/mu/programcard/expanded?id=${slug}`)
  return window.fetch(url).then(resp => resp.json())
}

function proxy (url) {
  return `https://proxy.brnbw.com/?u=${encodeURIComponent(url)}`
}
