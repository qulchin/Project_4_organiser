const SEARCH_MOVIE = 'SEARCH_MOVIE'
const SAVE_LIST = 'SAVE_LIST'
const ADD_TO_LIST = 'ADD_TO_LIST'
const REMOVE_FAV_ITEM = 'REMOVE_FAV_ITEM'
const LOAD_LIST_REQUEST = 'LOAD_LIST_REQUEST'
const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS'
const LOAD_LIST_FAILURE = 'LOAD_LIST_FAILURE'

const initialState = {
    favorites: [],
    movies: [],
    link: '',
    loading: null,
    movieList: [],
    error: '',
    title: '',
    inner: false
}
export default function reducer (state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOAD_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                movieList: action.list,
                title: action.title,
                error: ''
            }
        case LOAD_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                movieList: '',
                error: action.payload
            }
    }
    if (action.type === SEARCH_MOVIE) {
        const movies = action.movies
        return {...state, movies}
    }
    if (action.type === ADD_TO_LIST) {
        let check = false
        state.favorites.forEach(item => {
            if (action.payload.imdbID === item.imdbID)
                check = true
        })
        if (!check) {
            const favItem = state.movies.find(item => 
                item.imdbID === action.payload.imdbID);
            const item = {
                imdbID: favItem.imdbID,
                Title: favItem.Title,
                Year: favItem.Year
            }
            const favorites = [...state.favorites, item];
            return {...state, favorites, inner: true}
        }
    }
    if (action.type === REMOVE_FAV_ITEM) {
        const filtered = state.favorites.filter(item => action.payload.id !== item.imdbID)
        const favorites = filtered
        const check = filtered.length === 0 ? false : true
        return {...state, favorites, inner: check}
    }
    if (action.type === SAVE_LIST) {
        window.localStorage.setItem('link', action.link)
        const link = action.link
        return {...state, link}
    }
    return state
}
