var loglevel = 4

function log(l,x) {
    if (l < loglevel)
	console.log(x)
}

module.exports = {
    loglevel,
    log
}
