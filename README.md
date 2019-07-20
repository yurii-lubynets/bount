# Bount

Simple to-do lists are great for keeping track of tasks you need to accomplish. But if you’re working with a team where tasks have sub-tasks that have sub-sub-tasks and more, that’s where you especially need a project management software. Project management apps, even simple ones like Trello, can break your project down into achievable steps and give your team a more manageable workflow.

### Installing

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Code
Bount has a standard architectural layering of: server side APIs with a JavaScript client on the front-end. The backend mainly serves up data through RESTful, link-based APIs. The front-end, in addition to `React`, uses `Redux` to manage application state and `Redux-thunk` to deal with asynchronous actions, primarily data fetching.
<br><br>
All app code is located in `src` folder.<br>
The `action` folder contains all Redux Actions.<br>
The `components` folder keeps all reusable components and app pages.<br>
The Reducers in the folder `reducers` specify how the application's state changes in response to actions sent to the store.<br>