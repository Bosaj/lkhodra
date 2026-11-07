import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { App } from './App'

afterEach(() => {
  cleanup()
})

describe('LKHODRA App Integration', () => {
  it('renders the Moroccan Fruits & Vegetables Atlas in Arabic by default', () => {
    render(<App />)
    expect(
      screen.getByText(/فوائد الفواكه والخضر المغربية ومواسمها الفلاحية بالدارجة/i)
    ).toBeInTheDocument()
    expect(screen.getAllByText(/الكليمونتين د بركان/i).length).toBeGreaterThan(0)
  })

  it('switches language to French and English cleanly', () => {
    render(<App />)
    const frBtn = screen.getAllByRole('button', { name: /Français/i })[0]!
    fireEvent.click(frBtn)
    expect(
      screen.getByText(/Bienfaits & Saisons des Fruits et Légumes du Terroir Marocain/i)
    ).toBeInTheDocument()

    const enBtn = screen.getAllByRole('button', { name: /English/i })[0]!
    fireEvent.click(enBtn)
    expect(
      screen.getByText(/Moroccan Fruits & Vegetables: Seasonal Harvest & Clinical Benefits/i)
    ).toBeInTheDocument()
  })

  it('navigates to the 12-Month Seasonal Harvest Calendar and Health Benefits Lab', () => {
    render(<App />)
    const seasonsTab = screen.getByRole('button', { name: /02.*رزنامة المواسم/i })
    fireEvent.click(seasonsTab)
    expect(screen.getByText(/التقويم الفلاحي المغربي · 12 شهراً/i)).toBeInTheDocument()

    const benefitsTab = screen.getByRole('button', { name: /03.*مختبر الفوائد والأعضاء/i })
    fireEvent.click(benefitsTab)
    expect(
      screen.getByText(/اختر العضو أو الهدف الصحي لاكتشاف أغذية التيروار المغربي المناسبة/i)
    ).toBeInTheDocument()
  })
})
