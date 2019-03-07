document.addEventListener("DOMContentLoaded", init)

function init() {
    level(1)
    // loadPage('levels')
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
            break
        case 'leaderboard':
            break
        case 'profile':
            break
    }
}

function levels() {
    const levelContainer = document.createElement('div')

    resetPage()
    mainContainer().appendChild(levelContainer)

    GameLevel.getLevels(levels => {
        const listing = new LevelListing(levels)
        listing.render(levelContainer)
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
    })
}

function createLevel() {

}

function profile() {
    
}