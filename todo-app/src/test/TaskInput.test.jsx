import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskInput from '../components/TaskInput'

describe('TaskInput component', () => {
  it('calls onAdd with entered text and clears the input', async () => {
    const user = userEvent.setup()
    const handleAdd = vi.fn()

    render(<TaskInput onAdd={handleAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'My first task')
    await user.click(button)

    expect(handleAdd).toHaveBeenCalledTimes(1)
    expect(handleAdd).toHaveBeenCalledWith('My first task')
    expect(input).toHaveValue('')
  })

  it('does not call onAdd when input is empty or whitespace', async () => {
    const user = userEvent.setup()
    const handleAdd = vi.fn()

    render(<TaskInput onAdd={handleAdd} />)

    const input = screen.getByPlaceholderText(/add a new task/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.click(button)
    await user.type(input, '   ')
    await user.click(button)

    expect(handleAdd).not.toHaveBeenCalled()
  })
})