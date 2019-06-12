class Solution {

    constructor() {
        this.showAnswer = false
    }

    render(level) {
        const sol = document.createElement('div')
        sol.className = "ui four wide column"
        sol.id = "answer"

        const btn = document.createElement('button')
        btn.className = 'ui inverted secondary button'
        btn.innerHTML = 'Peek at Solution'

        sol.appendChild(btn)
        this.activate(btn, level, sol)

        const container = document.getElementById("main-grid")
        container.appendChild(sol)
    }

    activate(elem, level, container) {
        elem.addEventListener('click', () => {
            if (this.showAnswer) {
                this.removeLevel()
                this.showAnswer = false
            } else {
                this.showLevel(level, container)
                this.showAnswer = true
            }
        })
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

    removeLevel(){

    }

}