class Piece {
    constructor({ id, order, flex, backgroundSize, backgroundPosition, backgroundImage, height, width, className }) {
        this.div = document.createElement("div")
        this.div.id = id
        this.div.style.order = order
        this.div.flex = flex
        this.div.style.backgroundSize = backgroundSize
        this.div.style.backgroundPosition = backgroundPosition
        this.div.style.backgroundImage = backgroundImage
        this.div.style.height = height
        this.div.style.width = width
        this.div.className = className
        this.div.backgroundRepeat = "no-repeat"
    }
}

class Puzzle {
    constructor({ height, width}) {
        this.div = document.createElement("div")
        this.div.className = "box"
        this.div.style.height = height + "px"
        this.div.style.width = width + "px"
        this.height = height
        this.width = width
        this.scale = 50
        this.blocks = height / this.scale * width / this.scale
        this.array = new Array(this.blocks)
        this.div.style.display = "flex"
        this.div.style.flexWrap = "wrap"
    }

    setup(div) {
        div.appendChild(this.div)
    }

    swap(id1, id2) {
        
        let firstElement = document.getElementById(id1)
        let secondElement = document.getElementById(id2)
    
        // using the order property, we will change the order of the number blocks
        let tempOrder = firstElement.style.order
        firstElement.style.order = secondElement.style.order
        secondElement.style.order = tempOrder
    
        // you also need to change the ids of the blocks, because the numbers have also changed their ids
        let tempId = firstElement.id
        firstElement.id = secondElement.id
        secondElement.id = tempId

        let temp = this.array[id1]
        this.array[id1] = this.array[id2]
        this.array[id2] = temp
    }

    shufflePieces() {
        for (let i = this.blocks - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swap(i, j)
        }
    }

    async fill() {
        let imgUrl
        let imgUrlResponse
        let xBlocks
        let yBlocks
        while (true) {
            imgUrl = randomString()
            imgUrlResponse = await checkImgValid(imgUrl)
            if (imgUrlResponse.url.search("removed") === -1) {
                let img = new Image()
                img.src = imgUrl
                while (true) {
                    xBlocks = this.width / this.scale
                    yBlocks = this.height / this.scale
                    if (xBlocks !== undefined && yBlocks !== undefined) break
                    await delay(300)
                }
                let blocks = new Array(Math.round(xBlocks * yBlocks))
                let newRow = 0
                for (let i = 0; i < blocks.length; i++) {
                    if (i % yBlocks === 0 & i !== 0) newRow += 1 / (yBlocks - 1) * 100
                    this.array[i] = i
                    let piece = new Piece({
                        className: "puzzle piece" + i,
                        backgroundImage: "url(" + imgUrl + ")",
                        order: i,
                        id: i,
                        width: 1 / xBlocks * 100 + "%",
                        height: 1 / yBlocks * 100 + "%",
                        flex: "1 0 " + 1 / xBlocks * 100 + "%",
                        backgroundPosition: i % xBlocks / (xBlocks - 1) * 100 + "% " + newRow + "%",
                        backgroundSize: this.width + "px " + this.height + "px" 
                    })
                    this.div.appendChild(piece.div)
                }
                break
            }
        }
    }

}