import { useAnecdotesActions } from "../store"

const Filter = () => {
    const { setFilter } = useAnecdotesActions()

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    
    return (
        <div style={{ marginBlockEnd: 10 }}>
            filter
            <input data-testid="filter" type="text" name="filter" onChange={handleFilterChange} />
        </div>
    )
}

export default Filter