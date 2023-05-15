import { UPDATE, DELETE, FETCH_ALL, CREATE, LIKE, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING, FETCH_POST, COMMENT} from '../constants/actionTypes';


// Function that accepts a posts and an action, performs a logic based on the action.
const reducerFunction = (state = {isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case STOP_LOADING:
            return {...state, isLoading: false};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data, 
                currPage: action.payload.currPage,
                numOfPages: action.payload.numOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload,};
        case FETCH_POST:
            return { ...state, post: action.payload,};
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload]};
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}; //Map iterates over an array to change something and returns the updated array.
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post.id !== action.payload)};
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case COMMENT: 
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        default:
            return state;
    }
}

export default reducerFunction;

