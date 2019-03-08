class User {
    constructor({id, email, username}) {
        this.username = username
        this.id = id
        this.email = email
        this.completedLevels = []
    }

    renderProfile(container) {
        const userContainer = document.createElement('div')
        userContainer.classList.add('user-profile')
        container.appendChild(userContainer)

        userContainer.innerHTML += `<h2 class="user-name">@${this.username}</h2>`
        userContainer.innerHTML += `<h4 class="user-email">${this.email}</h4>`

        showMain()

        // const levelContainer = document.createElement('div')
        // container.appendChild(levelContainer)
        // renderCompletedLevels(levelContainer)
    }

    renderCompletedLevels(container) {
        this.getCompletedLevels(levels => {
            this.completedLevels = levels
            const listing = new LevelListing(levels)
            listing.render(levelsContainer)
        })
    }

    getCompletedLevels(callback) {
        fetch(`${User.api}/${this.id}`)
            .then(res => res.json())
            .then(levels => {
                callback.call(this, levels)
            })
    }

    static getUserJSON(id) {
        return fetch(`${User.api}/${id}`)
            .then(resp => resp.json())
    }

    static getUser(id, callback) {
        User.getUserJSON(id).then(json => {
            const user = new User(json)
            callback.call(this, user)
        })
    }

    render() {
        let userDiv = document.createElement('div')
        userDiv.innerHTML = this.username
        userDiv.classList.add('user')
        return userDiv
    }

    static login() {

        const container = document.querySelector('.ui.container')
        container.style.display = 'none'

        const midAlign = document.createElement('div')
        midAlign.className = 'ui ' 
        midAlign.className += 'middle '
        midAlign.className += 'aligned '
        midAlign.className += 'center '
        midAlign.className += 'aligned '
        midAlign.className += 'grid'
        midAlign.id = 'login'
        document.body.appendChild(midAlign)

        const col = document.createElement('div')
        col.className = 'center aligned column'
        midAlign.appendChild(col)
        

        const form = document.createElement('form')
        form.classList.add('ui', 'large', 'form')

        const mainDiv = document.createElement('div')
        mainDiv.classList.add('ui', 'raised', 'segment')
        form.appendChild(mainDiv)
        
        const fieldDiv = document.createElement('div')
        fieldDiv.className = 'field'
        const usernameDiv = document.createElement('div')
        usernameDiv.classList.add('ui', 'left', 'icon', 'input')
        usernameDiv.innerHTML += '<i class="user icon"></i>'
        // usernameDiv.classList.add('ui', 'left', 'icon', 'input')

        // const usernameIcon = document.createElement('i')
        // usernameIcon.classList.add('user', 'icon')
        // usernameIcon.innerHTML = '::before'
        // usernameDiv.appendChild(usernameIcon)

        const usernameInput = document.createElement('input')
        usernameInput.setAttribute('type', 'text')
        usernameInput.setAttribute('name', 'username')
        usernameInput.setAttribute('placeholder', 'Username')
        usernameDiv.appendChild(usernameInput)

        fieldDiv.appendChild(usernameDiv)

        mainDiv.appendChild(fieldDiv)

        const fieldDiv1 = document.createElement('div')
        fieldDiv1.className = 'field'
        const passwordDiv = document.createElement('div')
        passwordDiv.classList.add('ui', 'left', 'input', 'icon')
        passwordDiv.innerHTML += '<i class="lock icon"></i>'

        const passwordInput = document.createElement('input')
        passwordInput.setAttribute('type', 'text')
        passwordInput.setAttribute('name', 'password')
        passwordInput.setAttribute('placeholder', 'password')
        passwordDiv.appendChild(passwordInput)

        fieldDiv1.appendChild(passwordDiv)

        mainDiv.appendChild(fieldDiv1)

        const submit = document.createElement('div')
        submit.classList.add('ui', 'fluid', 'large', 'blue', 'submit', 'button')
        submit.innerHTML = 'Submit'
        mainDiv.appendChild(submit)

        submit.addEventListener('click', User.handleLogin)

        col.appendChild(form)
    }

    static handleLogin() {
        document.querySelector('form').remove()
        const container = document.querySelector('.ui.container')
        container.style.display = 'initial'
        window.loadPage('levels')
    }
}
User.api = 'http://localhost:3000/users'