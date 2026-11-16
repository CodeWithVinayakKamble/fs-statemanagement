import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, creteAnecdote, updateVote } from './request'
import { useNotify } from './NotificationContext'

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const notify = useNotify()

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
            notify(`created anecdote '${newAnecdote.content}'`)
        },
        onError: (error) => {
            notify(error.message)
        }
    })

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateVote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
            notify(`anecdote '${updatedAnecdote.content}' voted`)
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