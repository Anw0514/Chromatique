class ColorBox {
    // only for rendering colorboxes; not storing them
    constructor(color, position, level) {
        this.color = color
        this.position = position
        this.level = level
    }

    render() {
        let colordiv = document.createElement('div')
        colordiv.className = 'colorBox'
        colordiv.dataset.position = this.position
        colordiv.style.backgroundColor = this.color
        return colordiv
    }
}