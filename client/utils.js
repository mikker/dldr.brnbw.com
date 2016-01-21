export function findMedia (programCard) {
  if (!programCard) return

  try {
    const assets = programCard['Data'][0]['Assets']
    const video = assets.filter(asset => {
      return asset.Kind === 'VideoResource'
    })[0]
    const hls = video.Links.filter(link => {
      return link.Target === 'HLS'
    })[0]

    return hls.Uri
  } catch(e) {
    console.log(e)
  }
}

export function findSlug (programCard) {
  if (!programCard) return

  try {
    return programCard['Data'][0]['Slug']
  } catch(e) {
    console.log(e)
  }
}

export function extractSlugFromUrl (url) {
  // Handle URLs ending with a slash by removing the slash if it exists
  if (url.substring(url.length - 1) == '/') {
    url = url.substring(0, url.length - 1)
  }
  const parts = url.split('/')
  const last = parts[parts.length - 1]
  return last.replace(/#.*$/, '')
}
