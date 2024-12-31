import { nanoid, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    activePosts : []
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((val) => val.$id !== action.payload)
        },
        updatePost: (state, action) => {
            console.log("post is updating!!");
            
            const {id , postData} = action.payload
            state.posts = state.posts.map((post) => {
                return post.$id === id ? postData : post
            })
        },
        removeAllPosts : (state , action) => {
            state.posts.length = 0;
            state.activePosts.length = 0;
        },
        filterPost : (state , action) => {
            state.activePosts = state.posts.filter((post) => post.status !== 'inactive')
        }

    }
})

export const { addPost, removePost , removeAllPosts , filterPost , updatePost } = postSlice.actions

export default postSlice.reducer