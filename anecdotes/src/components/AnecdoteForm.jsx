import { useAnecdotesActions } from '../store'

const AnecdoteForm = () => {

    const { add } = useAnecdotesActions()

    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        add(anecdote)
        event.target.reset()
    }

    return (
        <div>

            <h2>create new</h2>

            <form onSubmit={addAnecdote} >
                <div>
                    <input name="anecdote" data-testid="new" />
                </div>
                <button type="submit" >create</button>
            </form>

        </div>

    )
}

export default AnecdoteForm