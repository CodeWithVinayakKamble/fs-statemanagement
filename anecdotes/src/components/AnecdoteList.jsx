import { useAnecdotes, useAnecdotesActions } from "../store"


const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { voteAnecdote } = useAnecdotesActions()

    const vote = (id) => {
        console.log("vote", id)
        voteAnecdote(id)
    }

    const anecdoteToShowByMostLike = anecdotes.toSorted((a, b) => b.votes - a.votes)

    return (
        <div>
            {anecdoteToShowByMostLike.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList