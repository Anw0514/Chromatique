class LevelListing {
    constructor(levels) {
        this.levels = levels
    }
    
    render(container) {
        this.levels.forEach(level => {
            level.render(container)
        })
    }
}