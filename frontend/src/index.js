// import { create } from "domain";

document.addEventListener("DOMContentLoaded", init)

const app = {
    user: {id: 1},
    difficulty: 0.3
}

function init() {
    User.login()
    document.querySelectorAll('#nav-menu a')
        .forEach(item => item.addEventListener('click', handleNav))
}

function mainContainer(selector) {
    const main = document.querySelector('[role="main"]')
    return selector ? main.querySelector(selector) : main
}

function resetPage() {
    mainContainer().innerHTML = ''
}

function userLogin() {

}

function handleNav(e) {
    const page = e.target.dataset.page
    loadPage(page)
}

function loadPage(page) {
    document.querySelectorAll('#nav-menu a.active')
        .forEach(item => item.classList.remove('active'))
    const navItem = document.querySelector(`#nav-menu [data-page="${page}"]`)
    navItem.classList.add('active')

    switch (page) {
        case 'levels':
            levels()
            break
        case 'create':
            createLevel()
            break
        case 'leaderboard':
            break
        case 'profile':
            profile()
            break
    }
}

function levels() {
    const levelsContainer = document.createElement('div')
    resetPage()
    mainContainer().appendChild(levelsContainer)

    GameLevel.getLevels(levels => {
        const listing = new LevelListing(levels)
        listing.render(levelsContainer)
    })
}

function level(id) {
    const levelContainer = document.createElement('div')
    levelContainer.classList.add('colorgrid-container')
    levelContainer.id = 'level'

    resetPage()
    mainContainer().appendChild(levelContainer)

    GameLevel.getLevel(id, level => {
        level.render(levelContainer)
        level.renderUsers()
    })
}

function createLevel() {
    LevelListing.form()
    const rb = document.getElementById('return-button')
    rb.addEventListener('click', (e) =>{
        document.querySelector('form').remove()
        const container = document.querySelector('.ui.container')
        container.style.display = 'initial'
        e.target.remove()
        window.loadPage('levels')
    })
}

function profile() {
    
}