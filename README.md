# Getting Started with TypeScript & Promise

THis assignmnet uses GitHub API [https://api.github.com/users](link)

## Requirements

- All the funtions should have returned type pre-declared. Variables should have class/interface/type connected to them.
- In the index.html file, create a form, including input field and a search button.
Users can search for any GitHub username, and result will be shown by clicking on
the search button.
- Search function in `index.ts` should search for username and fetch the according GitHub repo. Then, result should be displayed in the `<section>`
- `<section>` should display the result / or error message if search returns null. Some information from user should be displayed:
1: name, avatar, email, number of repos
2: list of repos. Languages used in each repo
3: list of followers
(when you search for user, you can easily see there are quite many links leading you to another api, such as repos, followers)
- Be creative with your own style.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all the dependencies before start the project

### `npm run start:dev`

Runs the codes in the development mode.

### `npm run build:dev`

TS files will be compiled to JS files when you make changes.
