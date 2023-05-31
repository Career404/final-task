# Status:
I would lie if I said I'm totally happy with my completion of this task, both in terms of functionality and code quality. Auth feature could be cleaner, endless scroll would be nice, and publications tab is way too hacky for my taste. The app works and is stable despite all that.

* Base: Vite React app with TypeScript
* Styles: used Tailwind CSS for style isolation, with minimal hand-coded CSS
* State managers: A conscious solution was made to [not use Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) or any other state manager. The app is rather plain content-wise, data is used in the same components that fetch it, not even prop-drilling was an issue anywhere at all - so why complicate things?
* Routing:
  1. Unregistered user can't access any pages but __/*welcome*__, __/*login*__, __/*signup*__ : __*index*__ redirects to __/*welcome*__ (with __/*login*__ and __/*signup*__ as subroutes) OR __/*search*__ (if the user has not logged out since last session). Auth rerouting done with a `<ProtectedRoute>` element, via pathless parent route for user-accessed pages
  2. __*search*__ uses react-router `loader` to allow accessing url with a search parameter and show the page with search completed immediately. __*search*__ page has a loading indicator as well (seeing as some queries can take up to 10 seconds to load, this seems appropriate)
  3. __*protein/:id*__ page redirects to __*search/protein/:id*__, for a little bit of uniformity in routes and ALSO because search results and page are not lost when a protein page is opened. Protein page is an overlay made with react-routers `<Outlet>`
  4. Any 404 routes redirect to __*not-found*__
* Auth: connected Firebase e-mail auth without verification ~~(should have played with this feature more, put more thought into it, maybe added GoogleAuthProvider too)~~

## Description
Q-1 Search is a search system through proteins using UniProt API. This is a lite and redesigned website of https://www.uniprot.org/
You always can follow the link above to check how it works.

Design - [Figma](https://www.figma.com/file/PB1YUYKosRJtLkBqoI395O/Untitled?node-id=0-1&t=bOmEqh3pAUdZvcl4-0)
The design is just a mockup. it means if you choose some UI library you shouldn't spend a lot of time overriding styles, just try to do something similar to the design. Your goal is to develop a working application.

Tasks - [Trello](https://trello.com/b/p6E2IUfP/final-task)
Tasks that should be done are placed in Trello board, and each task has a priority and description. You should start with high-priority tasks and when they are done you can go to the medium prioritized and then to the low prioritized tasks. When you start working on some task you should move the task to the `In Progress` column, when the task is done you need to move it to the `Done` column. if you think that you need to create more tasks - go ahead.

You are allowed to use any libraries in react ecosystem (just to clarify). You can compare libraries on [npm trends](https://npmtrends.com/) site. If you have some doubts feel free to ask your mentor or write your question in the course chat.

That would be awesome if you deploy your app and attach this link to the pull request.
