# Code Review

# Components Folder

# Header.js

Maybe it would be a good idea to have the search input in a separate component.

# Movie.jsx
As in app.js we can use const { starred, watchLater } = useSelector(state => state) and remove const state = useSelector((state) => state)

We can improve the myClickHandler function that is using a var which is no longer recommended.

We should also take a look at refactoring the watchLater and starred buttons that we have because we are using a lot of code and we can manage it in a more efficient and readable way.

This part could be worked so that in a responsive way we don't have to have the same thing twice.
<h6 className="title mobile-card">{movie.title}</h6>
<h6 className="title">{movie.title}</h6>

# Starred.jsx

As in previous cases const state = useSelector((state) => state) and const { starred } = state -> const { starred } = useSelector((state) => state)


# WatchLater.jsx
As in previous cases const state = useSelector((state) => state) andconst { watchLater } = state -> const { watchLater } = useSelector((state) => state)

Be careful with the names you used here const { remveAllWatchLater } = watchLaterSlice.actions is also named here <button className="btn btn-primary" onClick={() => dispatch(remveAllWatchLater())}>Empty list</button>
We should replace it by removeAllWatchLater in this case

# Data Folder

# movieSlice.js

We could handle errors in case the fetch-movies fails.

# src Folder

# App.js

I see that when you change these endopoint to view the movie listing there is a small white gap at the end of the background

It shows a message that no trailer available. Try another movie but I haven't really clicked on any trailer or movie, we should control this message.

We can use instead of const state = useSelector((state) => state) -> const { movies } = useSelector((state) => state) and keep everything in one line.

I see that both closeModal and closeCard have no use, besides closeModal is changing a boolean that is not used.

If we use template literal it should be global for all the components or files where we work with them and not to make templates literals in some components and then in others not as it is the case named above of the constants.

We do not have exceptions in the calls for the API and we should have the logic in another file. 

When we use the browser to write any movie when we press the 'X' button it returns to the beginning but it does not delete the interior of the input.

# Constanst.js

There is an error with the symbol / when it is after ?api_key
export const ENDPOINT_DISCOVER = ENDPOINT+'/discover/movie/?api_key='+API_KEY+'&sort_by=vote_count.desc'
export const ENDPOINT_SEARCH = ENDPOINT+'/search/movie/?api_key='+API_KEY

If you can try to replicate how you have it here
export const ENDPOINT_MOVIE = ENDPOINT+'/movie/507086?api_key='+API_KEY+'&append_to_response=videos'


We should use string literals instead of the way we have it right now, so we can avoid future typos and improve the readability of the code.

In order not to expose sensitive information we should work with .env.

# Testing

I have tried the npm test and I have seen that it passes 14 out of 17 tests and tests suites 3 out of 6, we should check that as well.