import { describe, it, expect } from 'vitest'
import { buildWhatsAppUrl, buildBespokeWhatsAppUrl, buildProductWhatsAppUrl, getWhatsAppInquiryUrl, getPhoneUrl } from '../src/utils/whatsapp'

describe('WhatsApp URL Builder', () => {
  it('builds base WhatsApp URL with encoded message', () => {
    const url = buildWhatsAppUrl('Hello World')
    expect(url).toBe('https://wa.me/8801800000000?text=Hello%20World')
  })

  it('builds empty message URL', () => {
    const url = buildWhatsAppUrl()
    expect(url).toContain('https://wa.me/8801800000000')
  })

  it('builds general inquiry URL with greeting', () => {
    const url = getWhatsAppInquiryUrl()
    expect(url).toContain('https://wa.me/8801800000000')
    expect(url).toContain('Haven%20Atelier')
  })

  it('builds bespoke spec WhatsApp URL with all fields', () => {
    const url = buildBespokeWhatsAppUrl({
      room: 'Living Room',
      timber: 'Burma Teak',
      fabric: 'Premium Matte Velvet',
      width: 9.5,
      depth: 6.5,
    })
    expect(url).toContain('https://wa.me/8801800000000')
    expect(url).toContain('Living%20Room')
    expect(url).toContain('Burma%20Teak')
    expect(url).toContain('9.5')
    expect(url).toContain('6.5')
  })

  it('builds product-specific WhatsApp URL', () => {
    const url = buildProductWhatsAppUrl('Sovereign Corner Sectional', 'Burma Teak + Premium Velvet')
    expect(url).toContain('Sovereign%20Corner%20Sectional')
    expect(url).toContain('Burma%20Teak')
  })

  it('returns correct phone URL', () => {
    const url = getPhoneUrl()
    expect(url).toBe('tel:+8801800-000000')
  })
})
