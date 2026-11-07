import { useFilteredAnecdotes, useAnecdotesActions } from "../store"


const AnecdoteList = () => {
    const anecdotes = useFilteredAnecdotes()
    const { vote, remove } = useAnecdotesActions()

    const anecdotesToShow = anecdotes.toSorted((a, b) => b.votes - a.votes)

    return (
        <div>
            {anecdotesToShow.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                        {anecdote.votes === 0 ? <button type="button" onClick={() => remove(anecdote.id)} >delete</button> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList