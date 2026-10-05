const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { SET_FILTER_BY } from "../store/store.js"


export function TodoFilter({ loadTodos}) {

    const filterBy= useSelector(storeState => storeState.currFilterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        // Notify parent
         
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        dispatch({ type: SET_FILTER_BY, filterBy: { ...filterBy, [field]: value } })
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        loadTodos(filterBy)
    }

    const { txt, importance } = filterBy
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}