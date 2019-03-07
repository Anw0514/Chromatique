class GameLevel extends Level {
    render(container) {
        super.render(container)
        setTimeout(() => this.renderRandom(container), 1000)
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
        
        // app.difficulty is a value between 0.0 and 1.0
        // primarily exists to simplify/shorten demo
        let max = Math.floor((res.length - 1) * app.difficulty);

        for (let i = max; i > 0; i--) {
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

            this.checkCompletion()
        }

    }

    checkCompletion() {
        if (this.compareColors()) {
            this.markCompleted()
            this.congratulate()
            window.loadPage('levels')
        }
    }

    markCompleted() {
        return fetch(`${Level.api}/${this.id}/users/${app.user.id}`, {method: 'POST'})
    }

    congratulate() {
        const title = "You did it!"
        const message = "We never thought you'd be able to do it, but you sure proved us wrong."
        const action = "You Did Good"

        const modal = document.createElement('div')
        modal.classList.add('ui', 'basic', 'modal')
        
        const icon = `<i class="eye dropper icon"></i>`
        modal.innerHTML += `<div class="ui icon header">${icon}${title}</div>`
        modal.innerHTML += `<div class="content">${message}</div>`

        const button = document.createElement('button')
        button.classList.add('ui', 'green', 'ok', 'inverted', 'button')
        button.innerHTML = `<i class="checkmark icon"></i>${action}`

        const actions = document.createElement('div')
        actions.classList.add('actions')
        actions.appendChild(button)
        modal.appendChild(actions)

        document.body.appendChild(modal)
        $(modal).modal('show')
    }

    static getLevel(id, callback) {
        return Level.getLevelJSON(id).then(json => {
            const level = new GameLevel(json)
            callback.call(this, level)
        })
    }
}