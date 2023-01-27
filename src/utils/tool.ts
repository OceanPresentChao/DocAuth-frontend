const encodeMap: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
}

const decodeMap: Record<string, string> = {
  '&lt;': '<',
  '&gt;': '>',
  '&amp;': '&',
  '&quot;': '"',
}

export function encodeHTML(html: string) {
  return html.replaceAll(/[\>\<\"\&]/g, (match) => {
    if (Object.keys.call(null, encodeMap).includes(match))
      return encodeMap[match]
    return match
  })
}

export function decodeHTML(rawstr: string) {
  return rawstr.replaceAll(/(&lt;|&gt;|&amp;|&quot;)/g, (match) => {
    if (Object.keys.call(null, decodeMap).includes(match))
      return decodeMap[match]
    return match
  })
}
