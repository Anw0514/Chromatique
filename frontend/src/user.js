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
}
User.api = 'http://localhost:3000/users'