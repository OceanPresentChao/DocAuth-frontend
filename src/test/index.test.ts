import { describe, expect, test } from 'vitest'
import { decodeHTML, encodeHTML } from '@/utils/tool'
describe('test', () => {
  test('html handler', () => {
    const html = '<div>hello</div>'
    const encode = encodeHTML(html)
    const decode = decodeHTML(encode)
    expect(encode).toMatchInlineSnapshot('"&lt;div&gt;hello&lt;/div&gt;"')
    expect(decode).toMatchInlineSnapshot('"<div>hello</div>"')
  })
})

