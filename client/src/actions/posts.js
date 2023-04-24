import * as api from '../api';

// Action creators are functions that return an action.
// Action is just an object that has a type and payload
// Asynchronous logic, hence needs async dispatch.
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });

    } catch (error) {
        console.log(error.message)
    }
}