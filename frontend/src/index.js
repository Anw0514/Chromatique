document.addEventListener("DOMContentLoaded", init)

function init() {
    level(1)
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

function renderNav() {

}

function levels() {

}

function level(id) {
    const levelContainer = document.createElement('div')
    levelContainer.classList.add('colorgrid')
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