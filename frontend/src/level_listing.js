class LevelListing {
    constructor(levels) {
        this.levels = levels
    }
    
    render(container) {
        container.classList.add('level-list')
        this.levels.forEach(level => {
            const levelContainer = document.createElement('div')
            level.render(levelContainer)
            container.appendChild(levelContainer)
        })
    }
}