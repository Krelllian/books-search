import React from 'react'
import './BooksAppHeader.scss'
import Sorts from './Sorts'
import { useDispatch } from 'react-redux'
import { getBooks, } from '../reduxToolkit/BooksSearchSlice'
import { setBooksSearch } from '../reduxToolkit/BooksSearchSlice'

const BooksAppHeader = () => {
    const dispatch = useDispatch()

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch(setBooksSearch(e.currentTarget.value))
    }

    const handelEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            dispatch(getBooks())
        }
    }

    return (
        <header className='header'>
            <div className='header__container container'>
                <div className='header__content'>
                    <h1 className='header__title'>Search for books</h1>
                    <div className='header__input-wrapper'>
                        <input onChange={handleInput} onKeyPress={handelEnterPress} className='header__input' placeholder='Book name'></input>
                        <button onClick={() => dispatch(getBooks())} className='header__input-btn' ></button>
                    </div>
                    <div className='header__sorts sorts'>
                        <Sorts />
                    </div>
                </div>
            </div>
        </header >
    )

}

export default BooksAppHeader