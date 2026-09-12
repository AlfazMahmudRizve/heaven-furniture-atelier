import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BespokeStudio from '../src/components/BespokeStudio'

describe('BespokeStudio Component', () => {
  it('renders section title and heading', () => {
    render(<BespokeStudio />)
    expect(screen.getByText(/BESPOKE STUDIO/i)).toBeInTheDocument()
    expect(screen.getByText(/Design Your Own Piece/i)).toBeInTheDocument()
  })

  it('renders all 4 room type buttons', () => {
    render(<BespokeStudio />)
    expect(screen.getAllByText('Living Room').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Master Bedroom')).toBeInTheDocument()
    expect(screen.getByText('Royal Dining')).toBeInTheDocument()
    expect(screen.getByText('Executive Study')).toBeInTheDocument()
  })

  it('renders all timber options', () => {
    render(<BespokeStudio />)
    expect(screen.getAllByText(/Burma Teak/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Solid Mahogany/i)).toBeInTheDocument()
    expect(screen.getByText(/Chittagong Gamari/i)).toBeInTheDocument()
    expect(screen.getByText(/White Oak/i)).toBeInTheDocument()
  })

  it('updates live specification when timber is clicked', () => {
    render(<BespokeStudio />)
    const mahoganyRadio = screen.getByText(/Solid Mahogany/i)
    fireEvent.click(mahoganyRadio)
    expect(screen.getAllByText(/Solid Mahogany/i).length).toBeGreaterThanOrEqual(2)
  })

  it('renders WhatsApp action button with valid link', () => {
    render(<BespokeStudio />)
    const waLink = screen.getByRole('link', { name: /Send This Spec to WhatsApp/i })
    expect(waLink).toBeInTheDocument()
    expect(waLink.getAttribute('href')).toContain('https://wa.me/8801991210347')
  })
})
