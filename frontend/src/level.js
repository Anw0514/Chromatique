class Level {
    constructor({top_left, top_right, bottom_left, bottom_right, grid_size, name, creator, id, users}) {
        this.top_left = top_left
        this.top_right = top_right
        this.bottom_left = bottom_left
        this.bottom_right = bottom_right
        this.grid_size = grid_size
        this.name = name
        this.creator = new User(creator)
        this.id = id
        this.makeUsers(users)
        Level.all.push(this)
        this.buildColors()

        this.selectedBox = undefined
    }

    makeUsers(users) {
        this.users = users.map(user => {
            return new User(user)
        })
    }

    render(container) {
        container.classList.add('colorgrid-container')

        const title = document.createElement('h3')
        title.classList.add('level-title')
        title.innerText = this.name
        container.appendChild(title)
        const grid = document.createElement('div')
        grid.classList.add('colorgrid')
        // grid.style.gridAutoColumns = this.generateColPercent()
        grid.style.gridTemplateColumns = `repeat(${this.grid_size}, 1fr)`
        
        this.correctColors.forEach((color, index) => {
            let colorBox = new ColorBox(color, index, this)
            grid.appendChild(colorBox.render())
        })

        container.appendChild(grid)
    }

    generateColPercent() {
        const percentage = this.grid_size / this.correctColors
        return `${percentage}%;`
    }
    
    compareColors() {
        for (let i = 0; i < this.correctColors.length; i++) {
            const color1 = this.correctColors[i].replace(/\s/g, '')
            const color2 = this.randColors[i].replace(/\s/g, '')
            if (color1 !== color2) return false
        }
        return true
    }

    buildColors() {
        // return full grdient array and set equal to this.ColorArr
        const leftColumn = this.interpolateColors(this.top_left, this.bottom_left, this.grid_size)
        const rightColumn = this.interpolateColors(this.top_right, this.bottom_right, this.grid_size)
        const correctColors = []
        for (let i = 0; i < this.grid_size; i++ ) {
            correctColors.push(this.interpolateColors(leftColumn[i], rightColumn[i], this.grid_size))
        }
        this.correctColors = correctColors.flat()
    }

    getCornerIndexes() {
        let corners = [0]
        corners.push(this.grid_size - 1)
        corners.push(this.correctColors.length - this.grid_size)
        corners.push(this.correctColors.length - 1)
        return corners
    }

    interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) {
            factor = 0.5;
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        
        return `rgb(${result})`;
    }

    interpolateColors(color1, color2, steps) {
        var stepFactor = 1 / (steps - 1),
            interpolatedColorArray = [];
        color1 = color1.match(/\d+/g).map(Number);
        color2 = color2.match(/\d+/g).map(Number);

        for (var i = 0; i < steps; i++) {
            interpolatedColorArray.push(this.interpolateColor(color1, color2, stepFactor * i));
        }
        return interpolatedColorArray;
    }

    static getLevels(callback) {
        fetch(Level.api)
            .then(resp => resp.json())
            .then(json => {
                const levels = json.map(l => new Level(l))
                callback.call(this, levels)
            })
    }

    static getLevelJSON(id) {
        return fetch(Level.api + `/${id}`)
            .then(resp => resp.json())
    }

    static getLevel(id, callback) {
        Level.getLevelJSON(id).then(json => {
            const level = new Level(json)
            level.render(document.querySelector('#level'))
        })
    }
}
Level.api = 'http://localhost:3000/levels'
Level.all = []