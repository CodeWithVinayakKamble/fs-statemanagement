import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { renderHook, act, render, screen, cleanup } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn()
    }
}))

import anecdoteServices from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from './store'
import AnecdoteList from './components/AnecdoteList'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [] })
    vi.clearAllMocks()
})

afterEach(() => {
    cleanup()
})

describe('anecdotes store', () => {

    it('initialized with the anecdotes returned by the backend', async () => {

        const initalizeAnecdotes = [
            { id: 1, content: 'Premature optimization is the root of all evil' },
            { id: 2, content: 'If it hurts, do it more often' },
            { id: 3, content: 'Adding manpower to a late software project makes it later!' }
        ]

        anecdoteServices.getAll.mockResolvedValue(initalizeAnecdotes)

        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(initalizeAnecdotes)

    })

    it('component displaying anecdotes receives the anecdotes from the store sorted by votes', async () => {

        useAnecdoteStore.setState({
            anecdotes: [
                { id: 1, content: 'Premature optimization is the root of all evil', votes: 2 },
                { id: 2, content: 'If it hurts, do it more often', votes: 5 },
                { id: 3, content: 'Adding manpower to a late software project makes it later!', votes: 6 }

            ]
        })

        render(<AnecdoteList />)

        const renderedVotes = screen.getAllByText(/has \d+/)
        expect(renderedVotes[0].textContent).toContain('has 6')
        expect(renderedVotes[1].textContent).toContain('has 5')
        expect(renderedVotes[2].textContent).toContain('has 2')
    })

    it('receives a properly filtered list of anecdotes', async () => {
        useAnecdoteStore.setState({
            anecdotes: [
                { id: 1, content: 'Premature optimization is the root of all evil', votes: 2 },
                { id: 2, content: 'If it hurts, do it more often', votes: 5 },
                { id: 3, content: 'Adding manpower to a late software project makes it later!', votes: 6 }

            ],
            filter: 'manpower'
        })

        render(<AnecdoteList />)

        expect(screen.getByText(/Adding manpower to a late software project makes it later!/i)).toBeDefined()
        expect(screen.queryByText(/If it hurts, do it more often/i)).toBeNull()

    })

    it('voting increases the number of votes for an anecdote', async () => {

        const anecdote = { id: 2, content: 'If it hurts, do it more often', votes: 5 }
        useAnecdoteStore.setState({ anecdotes: [anecdote] })

        anecdoteServices.update.mockResolvedValue({ ...anecdote, votes: anecdote.votes + 1 })

        const { result } = renderHook(() => useAnecdotesActions())

        await act(async () => {
            await result.current.vote(2)
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current[0].votes).toBe(6)
    })

})