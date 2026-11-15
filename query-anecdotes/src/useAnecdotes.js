import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, creteAnecdote, updateVote } from './request'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: creteAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateVote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        addVote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }
}