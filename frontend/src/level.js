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
        console.log(this.users)
    }

    render() {
        // this.correctColors.forEach((color, index) => {
        //     let colorBox = new ColorBox(color, index, this)
        //     document.querySelector('#level').appendChild(colorBox.render())
        // })
        this.randColors.forEach((color, index) => {
            let colorBox = new ColorBox(color, index, this)
            let cBElem = colorBox.render()
            if (this.getCornerIndexes().includes(index)) {
                cBElem.classList.add('corner')
            }

            cBElem.addEventListener('click', e => {
                this.handleClick(e)
            })
            document.querySelector('#level').appendChild(cBElem)
        })
    }

    handleClick(e) {
        if (!this.selectedBox) {
            this.selectedBox = e.target
            this.selectedBox.classList.add('active')
        } else {
            const swapColor = e.target.style.backgroundColor.replace(/\s/g, '')
            e.target.style.backgroundColor = this.selectedBox.style.backgroundColor
            this.selectedBox.style.backgroundColor = swapColor
            
            const pos1 = parseInt(this.selectedBox.dataset.position)
            const pos2 = parseInt(e.target.dataset.position)

            this.randColors[pos2] = this.randColors[pos1]
            this.randColors[pos1] = swapColor
            
            this.selectedBox.classList.remove('active')
            this.selectedBox = null
        }

        this.checkCompletion()
    }
    
    checkCompletion() {
        if (this.compareColors()) {
            console.log('you are good')
        }
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
        this.randColors = this.chuffle(this.correctColors)
    }

    getCornerIndexes() {
        let corners = [0]
        corners.push(this.grid_size - 1)
        corners.push(this.correctColors.length - this.grid_size)
        corners.push(this.correctColors.length - 1)
        return corners
    }

    chuffle(arr) {
        let res = arr.slice()
        for (let i = res.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (!this.getCornerIndexes().includes(i) && !this.getCornerIndexes().includes(j)) {
                [res[i], res[j]] = [res[j], res[i]];
            }
        }
        return res;
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

    static getLevels() {

    }

    static getLevel(id) {
        fetch(Level.api + `/${id}`)
        .then(resp => resp.json())
        .then(jsonLevulo => {
            let level = new Level(jsonLevulo)
            level.render()
        })
    }
}
Level.api = 'http://localhost:3000/levels'
Level.all = []