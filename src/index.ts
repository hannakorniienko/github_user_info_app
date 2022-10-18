interface User {
    html_url: string
    avatar_url: string
    login: string
    site_admin: boolean
    repos_url: string
}
interface UserInfo {
    html_url: string
    avatar_url: string
    login: string
    name: string
    email: string
    public_repos: number
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
        data => data.json() 
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
        const avatar = document.createElement("li")
        const username = document.createElement("li")
        avatar.innerHTML = `<a href=${user.html_url}><img src=${user.avatar_url}></a>`
        username.innerText = user.login
        temp_ul.appendChild(avatar)
        temp_ul.appendChild(username)
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
                (data: UserInfo | ErrorMsg) => {
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
        alert("Enter the username!")
    }
}

const showUser = (user: UserInfo) => {
    const avatar = document.createElement("a")
    avatar.href = user.avatar_url
    avatar.innerHTML = `<a href=${user.html_url}><img src=${user.avatar_url}></a>`
    const username = document.createElement("p")
    username.innerHTML = `<p>Username: ${user.login}</p>`
    const fullname = document.createElement("p")
    let check_fullname = !!user.name ? user.name : 'not specified'
    fullname.innerHTML = `<p>Name: ${check_fullname}</p>`
    const email = document.createElement("p")
    let check_email = !!user.email ? user.email : 'not specified'
    email.innerHTML = `<p>Email: ${check_email}</p>`
    const repos = document.createElement("p")
    repos.innerHTML = `<p>Number of public repos: ${user.public_repos}</p>`
    user_section.innerHTML = ""
    user_section.appendChild(avatar)
    user_section.appendChild(username)
    user_section.appendChild(fullname)
    user_section.appendChild(email)
    user_section.appendChild(repos)

}
