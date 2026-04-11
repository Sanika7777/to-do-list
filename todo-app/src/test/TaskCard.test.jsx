import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskCard from '../components/TaskCard'

const baseTask = {
  id: 1,
  text: 'Sample task',
  status: 'pending',
  created_at: '2024-01-01T00:00:00Z',
}

describe('TaskCard component', () => {
  it('calls onComplete and onDelete when buttons are clicked', async () => {
    const user = userEvent.setup()
    const handleComplete = vi.fn()
    const handleDelete = vi.fn()
    const handleEdit = vi.fn()

    render(
      <TaskCard
        task={baseTask}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    )

    const completeButton = screen.getByRole('button', { name: '' }) // round circle
    const deleteButton = screen.getByRole('button', { name: /delete/i })

    await user.click(completeButton)
    await user.click(deleteButton)

    expect(handleComplete).toHaveBeenCalledWith(1)
    expect(handleDelete).toHaveBeenCalledWith(1)
  })

  it('allows editing text and calls onEdit with new value', async () => {
    const user = userEvent.setup()
    const handleComplete = vi.fn()
    const handleDelete = vi.fn()
    const handleEdit = vi.fn()

    render(
      <TaskCard
        task={baseTask}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    )

    const editButton = screen.getByRole('button', { name: /edit/i })
    await user.click(editButton)

    const input = screen.getByDisplayValue(/sample task/i)

    await user.clear(input)
    await user.type(input, 'Updated task')
    await user.tab() // trigger blur -> submit

    expect(handleEdit).toHaveBeenCalledWith(1, 'Updated task')
  })
})