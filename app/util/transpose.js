//
// transpose a matrix from rows x cols to cols x rows
//
function transpose(ones) {
    let cols = ones.length
    let rows = ones[0].length
    console.log(`rows: ${rows} cols: ${cols}`)
    let matrix = new Array(rows)
    for (var i = 0; i < rows; i++)
	matrix[i] = new Array(cols)

    // console.log('matrix: ', matrix)
    
    for (var i = 0; i < cols; i++) {
	for (var j = 0; j < rows; j++) {
	    //   console.log(`  [${i}][${j}]: ${ones[i][j]} => matrix [${j}][${i}]`)
	    matrix[j][i] = ones[i][j]
	}
    }
    return matrix
}

// var m = [[2,1,2], [2,1,2], [2,2,2], [2,2,1]]
// console.log(m)
// var m2 = transpose( m )
// console.log(  m2 )
