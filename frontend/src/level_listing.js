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
            level.renderDelete()
            level.activateColorgrid()
            showMain()
        })
    }

    static form() {

        const main = document.querySelector('#main')
        main.innerHTML = ''
        
        const form = document.createElement('form')
        form.classList.add('ui', 'large', 'form')

        const fieldDiv = document.createElement('div')
        fieldDiv.className = 'field'

        const titleDiv = document.createElement('div')
        titleDiv.classList.add('ui', 'input')

        const titleInput = document.createElement('input')
        titleInput.setAttribute('type', 'text')
        titleInput.setAttribute('name', 'title')
        titleInput.setAttribute('placeholder', 'Level Name')
        titleDiv.appendChild(titleInput)

        fieldDiv.appendChild(titleDiv)

        form.appendChild(fieldDiv)

        const gridSizeField = document.createElement('div')
        gridSizeField.className = 'field'

        const gridSizeDiv = document.createElement('div')
        gridSizeDiv.classList.add('ui', 'input')

        const gridSizeInput = document.createElement('input')
        gridSizeInput.setAttribute('type', 'number')
        gridSizeInput.setAttribute('name', 'gridSize')
        gridSizeInput.setAttribute('placeholder', 'Grid Size')
        gridSizeDiv.appendChild(gridSizeInput)

        gridSizeField.appendChild(gridSizeDiv)

        form.appendChild(gridSizeField)

        const fieldDivs = document.createElement('div')
        fieldDivs.className = 'four fields'

        const fieldDiv1 = document.createElement('div')
        fieldDiv1.className = 'field'

        const color1Div = document.createElement('div')
        color1Div.classList.add('ui', 'input')

        const color1Input = document.createElement('input')
        color1Input.setAttribute('type', 'color')
        color1Input.setAttribute('name', 'color1')
        color1Input.setAttribute('placeholder', 'color1')
        color1Input.value = '#0516FA'
        color1Div.appendChild(color1Input)
        fieldDiv1.appendChild(color1Div)

        fieldDivs.appendChild(fieldDiv1)

        const fieldDiv2 = document.createElement('div')
        fieldDiv2.className = 'field'

        const color2Div = document.createElement('div')
        color2Div.classList.add('ui', 'input')

        const color2Input = document.createElement('input')
        color2Input.setAttribute('type', 'color')
        color2Input.setAttribute('name', 'color2')
        color2Input.setAttribute('placeholder', 'color2')
        color2Input.value = '#9B00FF'
        color2Div.appendChild(color2Input)
        fieldDiv2.appendChild(color2Div)

        fieldDivs.appendChild(fieldDiv2)

        const fieldDiv3 = document.createElement('div')
        fieldDiv3.className = 'field'

        const color3Div = document.createElement('div')
        color3Div.classList.add('ui', 'input')

        const color3Input = document.createElement('input')
        color3Input.setAttribute('type', 'color')
        color3Input.setAttribute('name', 'color3')
        color3Input.setAttribute('placeholder', 'color3')
        color3Input.value = '#00FB00'
        color3Div.appendChild(color3Input)
        fieldDiv3.appendChild(color3Div)

        fieldDivs.appendChild(fieldDiv3)

        const fieldDiv4 = document.createElement('div')
        fieldDiv4.className = 'field'

        const color4Div = document.createElement('div')
        color4Div.classList.add('ui', 'input')

        const color4Input = document.createElement('input')
        color4Input.setAttribute('type', 'color')
        color4Input.setAttribute('name', 'color4')
        color4Input.setAttribute('placeholder', 'color4')
        color4Input.value = '#ff0000'
        color4Div.appendChild(color4Input)
        fieldDiv4.appendChild(color4Div)

        fieldDivs.appendChild(fieldDiv4)


        form.appendChild(fieldDivs)

        const submit = document.createElement('submit')
        submit.classList.add('ui', 'fluid', 'large', 'blue', 'submit', 'button')
        submit.innerHTML = 'Submit'
        form.appendChild(submit)
        
        submit.addEventListener('click', (e) => {
            LevelListing.handleSubmit()
            returnToLevels.remove()
        })

        main.appendChild(form)
    }

    static hexToRgb(arr) {
        return arr.map(color => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
        })
    }

    static handleSubmit() {
        const title = document.querySelector('input[name="title"]').value
        let color1 = document.querySelector('input[name="color1"]').value
        let color2 = document.querySelector('input[name="color2"]').value
        let color3 = document.querySelector('input[name="color3"]').value
        let color4 = document.querySelector('input[name="color4"]').value

        const rgbarr = LevelListing.hexToRgb([color1, color2, color3, color4])
        color1 = rgbarr[0]
        color2 = rgbarr[1]
        color3 = rgbarr[2]
        color4 = rgbarr[3]

        const gridSize = parseInt(document.querySelector('input[name="gridSize"]').value)
        fetch(Level.api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                top_right: color1,
                bottom_right: color2,
                bottom_left: color3,
                top_left: color4,
                grid_size: gridSize,
                published: true,
                user_id: 2
            })
        }).then(() => {
            document.querySelector('form').remove()
            const container = document.querySelector('.ui.container')
            container.style.display = 'initial'
            window.loadPage('levels')
        })
    }
}