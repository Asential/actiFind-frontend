// Function that accepts a posts and an action, performs a logic based on the action.
const reducerFunction = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) //Map iterates over an array to change something and returns the updated array.
        case 'DELETE':
            return posts.filter((post) => post.id !== action.payload)    
        case 'LIKE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts;
    }
}

export default reducerFunction;

