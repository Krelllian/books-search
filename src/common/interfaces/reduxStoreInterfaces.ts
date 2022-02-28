
export interface IStore {
    books: IBooks,
}

export interface IBooks {
    data: IData[],
    currentBookCardData: {},
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

}