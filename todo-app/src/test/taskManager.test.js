import {
  resetTaskState,
  getTasks,
  getPendingTasks,
  getCompletedTasks,
} from '../utils/taskManager'
import { describe, it, expect, beforeEach } from 'vitest'

describe('taskManager pure helpers', () => {
  let sampleTasks

  beforeEach(() => {
    resetTaskState()
    sampleTasks = [
      {
        id: 1,
        text: 'Task 1',
        status: 'pending',
        created_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        text: 'Task 2',
        status: 'completed',
        created_at: '2024-01-02T00:00:00Z',
      },
      {
        id: 3,
        text: 'Task 3',
        status: 'pending',
        created_at: '2024-01-03T00:00:00Z',
      },
    ]
  })

  it('getTasks returns all tasks', () => {
    const result = getTasks(sampleTasks)
    expect(result).toHaveLength(3)
    expect(result[0].text).toBe('Task 1')
  })

  it('getPendingTasks returns only pending tasks', () => {
    const result = getPendingTasks(sampleTasks)
    expect(result).toHaveLength(2)
    expect(result.every(t => t.status === 'pending')).toBe(true)
  })

  it('getCompletedTasks returns only completed tasks', () => {
    const result = getCompletedTasks(sampleTasks)
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('completed')
  })
})