class User {
    constructor({id, email, username}) {
        this.username = username
        this.id = id
        this.email = email
    }
}
User.api = 'http://localhost:3000/users'