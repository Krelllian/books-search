import React from 'react'
import './Sorts.scss'
import { setBooksCategory, getBooks, setBooksOrderBy } from '../reduxToolkit/BooksSearchSlice'
import { useDispatch } from 'react-redux'

const Sorts = () => {
    const dispatch = useDispatch()

    const categoriesSet = new Set(['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'])
    const categories = Array.from(categoriesSet)

    const categorySelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const category = e.currentTarget.value
        dispatch(setBooksCategory(category))
        dispatch(getBooks())
    }

    const sortBySelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const sortBy = e.currentTarget.value
        dispatch(setBooksOrderBy(sortBy))
        dispatch(getBooks())
    }

    return (
        <>
            <label className='header__select-label header__select-label--categories'>Categories
                <select className='header__select' onChange={categorySelectHandler}>
                    {categories.map((category) => (
                        <option key={category} value={category === 'all' ? '' : category}>{category}</option>
                    )
                    )}
                </select>
            </label>
            <label className='header__select-label header__select-label--sorting-by'>Sorting by
                <select className='header__select' onChange={sortBySelectHandler}>
                    <option value='relevance'>relevance</option>
                    <option value='newest'>newest</option>
                </select>
            </label>
        </>
    )
}

export default Sorts