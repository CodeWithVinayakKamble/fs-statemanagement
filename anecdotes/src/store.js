import { create } from 'zustand'
import anecdotesServices from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: null,
  actions: {

    setFilter: text => set(() => ({ filter: text })),

    initalize: async () => {
      const anecdotes = await anecdotesServices.getAll()
      set(() => ({ anecdotes }))
    },

    add: async (content) => {
      const newAnecdote = await anecdotesServices.createNew(content)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },

    vote: async (id) => {
      try {
        const anecdote = get().anecdotes.find(n => n.id === id)
        const updatedAnecdote = await anecdotesServices.update(id, { ...anecdote, votes: anecdote.votes + 1 })
        set(state => ({ anecdotes: state.anecdotes.map(n => n.id === id ? updatedAnecdote : n) }))
        set(() => ({ notification: `you voted '${anecdote.content}'` }))
        setTimeout(() => { set(() => ({ notification: null })) }, 5000)
      } catch (error) {
        set(() => ({ notification: `${error}` }))
        setTimeout(() => { set(() => ({ notification: null })) }, 5000)

      }
    },

    remove: async (id) => {
      await anecdotesServices.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(n => n.id !== id) }))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useNotification = () => useAnecdoteStore((state) => state.notification)
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)

export const useFilteredAnecdotes = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()

  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}
