class Solution {
    // level.render(levelContainer)
    // container.appendChild(levelContainer)
    // level.renderDelete()
    // level.activateColorgrid()
    // showMain()

    render(level) {
        const sol = document.createElement('div')
        sol.className = "ui four wide column"
        sol.id = "answer"

        const container = document.getElementById("main-grid")
        container.appendChild(sol)
        console.log(level)
    }
}