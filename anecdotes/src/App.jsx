// ==== React dependencies ==== //
import { useEffect } from "react"

// ==== Components ==== //
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

// ==== state store ==== //
import { useAnecdotesActions } from "./store"

const App = () => {
  const { initalize } = useAnecdotesActions()
  useEffect(() => {
    initalize()
  }, [initalize])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
