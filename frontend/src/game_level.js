class GameLevel extends Level {
    render(container) {
        super.render(container)
        setTimeout(() => this.renderRandom(container), 2000)
    }

    buildColors() {
        super.buildColors()
        this.randColors = this.chuffle(this.correctColors)
    }
    
    compareColors() {
        for (let i = 0; i < this.correctColors.length; i++) {
            const color1 = this.correctColors[i].replace(/\s/g, '')
            const color2 = this.randColors[i].replace(/\s/g, '')
            if (color1 !== color2) return false
        }
        return true
    }
    renderRandom(container) {
        const grid = container.querySelector('.colorgrid')
        grid.innerHTML = ''

        this.randColors.forEach((color, index) => {
            let colorBox = new ColorBox(color, index, this)
            let cBElem = colorBox.render()
            if (this.getCornerIndexes().includes(index)) {
                cBElem.classList.add('corner', 'hvr-buzz-out')
            }

            cBElem.addEventListener('click', e => {
                this.handleClick(e)
            })

            grid.appendChild(cBElem)
        })
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

    handleClick(e) {
        if (e.target.classList.contains('corner')) {
            return
        } else if (!this.selectedBox) {
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

    static getLevel(id, callback) {
        return Level.getLevelJSON(id).then(json => {
            const level = new GameLevel(json)
            callback.call(this, level)
        })
    }
}