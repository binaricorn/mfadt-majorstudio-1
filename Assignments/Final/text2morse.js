var morsejs = require('morsejs')

var txt = process.argv.slice(2).join(" ")

var symbols = morsejs.translate(txt)

//Change delimiters if needed
var converted = symbols.join(",")

console.log(converted)