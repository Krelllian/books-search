
export interface IStore {
    books: IBooks
}

export interface IBooks {
    data: IData[],
    currentBookCardData: IData | any,
    search: string,
    maxResults: number,
    startIndex: number,
    category: string,
    booksCount: number,
    orderBy: string,

    booksDisplay: boolean,
    bookCardDisplay: boolean,

    loading: boolean,
    apiError: boolean,
}

export interface IData {
    id: number
    etag: string
    volumeInfo: {
        imageLinks?: {
            thumbnail: string
        }
        description: string
        title: string
        authors: string[]
        categories: string[]
    }
}