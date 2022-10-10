interface User {
    html_url: string
    avatar_url: string
    login: string
    site_admin: boolean
    repos_url: string
}

interface UserRepo {
    repos_url: string;
    repos: [];
}

interface ErrorMsg {
    documentation_url: string
    message: string
}

const user_list = document.querySelector("ul")
const user_input = document.querySelector("input")
const user_section = document.querySelector("section")

const fetchUsers = () => {
    fetch("https://api.github.com/users").then(
        data => data.json() /* same as return data.json() */
    ).then(
        (data: User[]) => createList(data)
    ).catch((e) => {
        console.log(e)
    })
}

const createList = (usersArray: User[]) => {
    usersArray.forEach(user => {
        const listElement = document.createElement("li")
        const temp_ul = document.createElement("ul")
        const username = document.createElement("li")
        const avatar = document.createElement("li")
        username.innerText = user.login
        avatar.innerHTML = `<img src=${user.avatar_url}>`
        temp_ul.appendChild(username)
        temp_ul.appendChild(avatar)
        listElement.appendChild(temp_ul)
        user_list.appendChild(listElement)
    })
}

const searchUser = () => {
    const user = user_input.value
    if (user) {
        fetch(`https://api.github.com/users/${user}`)
            .then(
                data => data.json()
            )
            .then(
                (data: User | ErrorMsg) => {
                    if ('repos_url' in data) {
                        showUser(data)
                    } else {
                        user_section.innerHTML = "<p>No user found</p>"
                    }
                }
            )
            .catch((e) => {
                console.log("Error happen, ", e)
            })
    } else {
        alert("user should not be empty")
    }
}

const showUser = (user: User) => {
    const avatar = document.createElement("img")
    avatar.src = user.avatar_url
    const username = document.createElement("p")
    username.innerText = user.login
    user_section.innerHTML = ""
    user_section.appendChild(avatar)
    user_section.appendChild(username)
}