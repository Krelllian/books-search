import React from 'react'
import './Books.scss'
import { useSelector, useDispatch } from 'react-redux'
import { loadMoreBooks, setBooksDisplay, setBookCardDisplay, getBookCardById } from '../reduxToolkit/BooksSearchSlice'
import { IStore, IBooks, IData } from '../common/interfaces/reduxStoreInterfaces'
import Preloader from './Preloader'

const Books = () => {
    const dispatch = useDispatch()
    const booksData = useSelector((state: IStore) => state.books.data)
    const { booksCount, booksDisplay, startIndex, bookCardDisplay, currentBookCardData, loading } = useSelector((state: IStore) => state.books)

    const cardHandler = (bookId: number) => {
        dispatch(setBooksDisplay(false))
        dispatch(getBookCardById(bookId))
        dispatch(setBookCardDisplay(true))
    }

    return (
        <section className='books'>
            <div className='books__container container'>
                <div className='books__content'>
                    {loading && <Preloader />}
                    {booksDisplay && (
                        <>
                            <p className='books__count'>Found {booksCount} results</p>
                            {booksCount === 0 ? '' : (<div className='books__grid'>
                                {booksData?.map((book, i) => (
                                    <div onClick={() => cardHandler(book.id)} key={book.etag + book.id} className='books__books-card books-card'>
                                        <img src={book.volumeInfo.imageLinks?.thumbnail}></img>
                                        <p className='books-card__categories'>{book.volumeInfo?.categories?.join(', ')}</p>
                                        <p className='books-card__title'>{book.volumeInfo?.title}</p>
                                        <p className='books-card__autor'>{book.volumeInfo?.authors?.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                            )}
                            {booksCount <= startIndex ? ''
                                : <button onClick={() => dispatch(loadMoreBooks())} className="books__load-more">Load more books</button>}
                        </>
                    )}
                    {bookCardDisplay && (
                        <div className='books__card-detailed card-detailed'>
                            <div className='card-detailed__img-wrapper'><img src={currentBookCardData.volumeInfo?.imageLinks?.thumbnail}></img></div>
                            <div className='card-detailed__content'>
                                <p className='card-detailed__categories'>{currentBookCardData.volumeInfo?.categories ? currentBookCardData.volumeInfo?.categories[0] : ''}</p>
                                <p className='card-detailed__title'>{currentBookCardData.volumeInfo?.title}</p>
                                <p className='card-detailed__autors'>{currentBookCardData.volumeInfo?.authors?.join(', ')}</p>
                                <div className='card-detailed__description' dangerouslySetInnerHTML={{ __html: `${currentBookCardData.volumeInfo?.description ? currentBookCardData.volumeInfo?.description : 'No description'}` }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Books