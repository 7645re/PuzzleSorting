var puzzle
main()

async function partition(array, left, right) {
    // We take the middle element as the pivot of the array in the interval (left, right)
    let pivot = array[Math.floor((left + right) / 2)]
    let i = left
    let j = right
    while (i <= j) {
        while (array[i] < pivot) i++
        while (array[j] > pivot) j--
        if (i <= j) {
            await puzzle.swap(i, j)
            await delay(10)
            i++
            j--
        }
    }
    return i
}

async function quickSort(array, left, right) {
    let pivot // index of pivot element
    pivot = await partition(array, left, right);
    if (left < pivot - 1) {
        await quickSort(array, left, pivot - 1);
    }
    if (pivot < right) { 
        await quickSort(array, pivot, right);
    }
}

async function main() {
    puzzle = new Puzzle({height: 500, width: 500})
    let body = document.body
    puzzle.setup(body)
    await puzzle.fill()
    puzzle.shufflePieces()
    await quickSort(puzzle.array, 0, puzzle.array.length-1)
}