// Function that accepts a posts and an action, performs a logic based on the action.
const reducerFunction = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return posts;
        default:
            return posts;
    }
}

export default reducerFunction;

