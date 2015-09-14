export function findMedia (program_card) {
  if (!program_card) return

  try {
    const assets = program_card['Data'][0]['Assets']
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

export function findSlug (program_card) {
  if (!program_card) return

  try {
    return program_card['Data'][0]['Slug']
  } catch(e) {
    console.log(e)
  }
}

