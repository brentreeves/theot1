// var loglevel = 0

function log(l,x) {
    if (l < LOGLEVEL)
	console.log(x)
}

function ppBook(book) {
    
}

function ppdate(d) {
    log(3, `ppdate: ${d} type: ${typeof d}`)
    try {
	let dd = d.toISOString().split('T')[0]
	log(3, `  returning: ${dd}`)
	return dd
    } 
    catch (e) {
	return d
    }
}


module.exports = {
    log,
    ppdate
}
