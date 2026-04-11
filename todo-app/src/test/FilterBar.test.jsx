import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '../components/FilterBar'

describe('FilterBar component', () => {
  it('renders All, Pending, Completed buttons with counts', () => {
    const handleChange = vi.fn()

    render(
      <FilterBar
        active="all"
        onChange={handleChange}
        counts={{ total: 3, pending: 2, completed: 1 }}
      />
    )

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument()

    expect(screen.getByText(/3 total/i)).toBeInTheDocument()
    expect(screen.getByText(/2 pending/i)).toBeInTheDocument()
    expect(screen.getByText(/1 done/i)).toBeInTheDocument()
  })

  it('calls onChange with correct filter id when buttons are clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <FilterBar
        active="all"
        onChange={handleChange}
        counts={{ total: 3, pending: 2, completed: 1 }}
      />
    )

    await user.click(screen.getByRole('button', { name: /pending/i }))
    await user.click(screen.getByRole('button', { name: /completed/i }))

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenNthCalledWith(1, 'pending')
    expect(handleChange).toHaveBeenNthCalledWith(2, 'completed')
  })
})