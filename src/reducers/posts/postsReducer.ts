import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PostState {
    title: string,
    text: string,
    liked: boolean
}

export interface PostsState {
    value: PostState[]
}

const initialState: PostsState = {
    value: []
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        initData: (state, action: PayloadAction<PostState[]>) => {
            state.value = action.payload
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const liked = state.value[action.payload].liked
            state.value[action.payload].liked = !liked
        },
        removePost: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1)
        }
    }
})

export const { toggleLike, initData, removePost } = postsSlice.actions

export default postsSlice.reducer