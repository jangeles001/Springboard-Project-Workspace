import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'

const POSTS_URL= 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};


// const initialState = [
//     {id: '1', userId: "1", title: "My Words", content: "Love thy neighbor", date: sub(new Date(), {minutes: 10 }).toISOString(), reactions: {
//                             thumbsup: 0,
//                             wow: 0,
//                             heart: 0,
//                             rocket: 0,
//                             coffee: 0
//                         }},
//     {id: '2', userId: "1", title: "My other Words", content: "Yuh", date: sub(new Date(), {minutes: 5 }).toISOString(), reactions: {
//                             thumbsup: 0,
//                             wow: 0,
//                             heart: 0,
//                             rocket: 0,
//                             coffee: 0
//                         }}
// ]

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(POSTS_URL);
        return [...response.data]
    }catch (error) {
        return error.message;
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try{
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    }catch (error){
        return error.message;
    }
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
            postAdded: {
                reducer(state, action) {
                    state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(), 
                        userId,
                        reactions: {
                            thumbsup: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), {minutes: min++}).toISOString()
                post.reactions = {
                    thumbsup: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                return post;
            });
            
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsup: 0,
                hooray: 0,
                rocket: 0,
                eyes: 0
            }
            console.log(action.payload)
            state.posts.push(action.payload) // push only valid inside the create slice. EmerJS
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;