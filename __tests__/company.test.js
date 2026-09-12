import { describe, it, expect } from 'vitest'
import { COMPANY, TRUST_POINTS, MILESTONES, CRAFTSMANSHIP_STEPS } from '../src/data/company'
import { COLLECTIONS, ROOM_TYPES, TIMBER_OPTIONS, FABRIC_OPTIONS } from '../src/data/collections'

describe('Company Data', () => {
  it('has correct brand name', () => {
    expect(COMPANY.name).toBe('Haven Atelier')
  })

  it('has correct WhatsApp number without plus or spaces', () => {
    expect(COMPANY.whatsappNumber).toBe('8801991210347')
  })

  it('has correct phone number', () => {
    expect(COMPANY.phone).toBe('+880 1991-210347')
  })

  it('has founder info', () => {
    expect(COMPANY.founder).toBe('Haven Design Guild')
    expect(COMPANY.founderTitle).toBe('Principal Architects & Master Joiners')
    expect(COMPANY.founderQuote).toBeTruthy()
  })

  it('has all social links', () => {
    expect(COMPANY.socials.facebook).toContain('facebook.com')
    expect(COMPANY.socials.instagram).toContain('instagram.com')
    expect(COMPANY.socials.youtube).toContain('youtube.com')
  })
})

describe('Trust Points', () => {
  it('has 7 trust points', () => {
    expect(TRUST_POINTS).toHaveLength(7)
  })

  it('each has icon, title, and desc', () => {
    TRUST_POINTS.forEach((tp) => {
      expect(tp.icon).toBeTruthy()
      expect(tp.title).toBeTruthy()
      expect(tp.desc).toBeTruthy()
    })
  })
})

describe('Milestones', () => {
  it('has 5 milestones', () => {
    expect(MILESTONES).toHaveLength(5)
  })

  it('starts at 2020 founding', () => {
    expect(MILESTONES[0].year).toBe(2020)
    expect(MILESTONES[0].title).toContain('Founded')
  })
})

describe('Collections', () => {
  it('has 4 collection categories', () => {
    expect(COLLECTIONS).toHaveLength(4)
  })

  it('each collection has 4 products', () => {
    COLLECTIONS.forEach((col) => {
      expect(col.products).toHaveLength(4)
    })
  })

  it('has correct category IDs', () => {
    const ids = COLLECTIONS.map((c) => c.id)
    expect(ids).toEqual(['living', 'bedroom', 'dining', 'executive'])
  })
})

describe('Configurator Options', () => {
  it('has 4 room types', () => {
    expect(ROOM_TYPES).toHaveLength(4)
  })

  it('has 4 timber options', () => {
    expect(TIMBER_OPTIONS).toHaveLength(4)
  })

  it('has 4 fabric options', () => {
    expect(FABRIC_OPTIONS).toHaveLength(4)
  })

  it('Burma Teak is premium grade', () => {
    const teak = TIMBER_OPTIONS.find((t) => t.id === 'burma-teak')
    expect(teak.grade).toBe('Premium')
  })
})
