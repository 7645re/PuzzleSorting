var puzzle
main()


async function main() {
    puzzle = new Puzzle({height: 500, width: 500})
    let box = document.body
    puzzle.setup(box)
    puzzle.changeScale(50)
    while (true) {
        await puzzle.fill()
        puzzle.shufflePieces()
        await puzzle.solve(25)
        await delay(2000)
        puzzle.clear()
    }
}