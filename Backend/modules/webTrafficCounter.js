var c = 0;
var counter = function(req, res, next){
    c++;
    console.log("-----------------------------------")
    console.log("Requiests: " + c)
    console.log("-----------------------------------")

    next();
}
module.exports = counter
