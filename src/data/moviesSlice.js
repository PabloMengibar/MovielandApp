import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, page = 1 }) => {
    const response = await fetch(`${apiUrl}&page=${page}`)
    return await response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        page: 0,
        totalPages: 1,
        fetchStatus: '',
    },
    reducers: {
        resetMovies: (state) => {
            state.movies = []
            state.page = 0
            state.totalPages = 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (action.payload.page === 1) {
                state.movies = action.payload.results
            } else {
                state.movies = [...state.movies, ...action.payload.results]
            }
            state.page = action.payload.page
            state.totalPages = action.payload.total_pages
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export const { resetMovies } = moviesSlice.actions
export default moviesSlice.reducer