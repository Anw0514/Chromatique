class Solution {

    constructor() {
        this.showAnswer = false
    }

    render(level) {
        const sol = document.createElement('div')
        sol.className = "ui four wide column"
        sol.id = "answer"

        this.showLevel(level, sol)

        const container = document.getElementById("main-grid")
        container.appendChild(sol)
    }

    activate() {
        
    }

    showLevel(level, container) {
        const levelContainer = document.createElement('div')
        levelContainer.className = 'colorgrid'
        level.renderGrid(levelContainer)
        container.appendChild(levelContainer)
        level.renderDelete()
        level.activateColorgrid()
        showMain()
    }
}