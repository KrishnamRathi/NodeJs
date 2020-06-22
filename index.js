const rect = require('./rectangle');
const rectangle = require('./rectangle');

function solve(a, b){
    console.log('solving l='+a+' and b='+b+'.');
    rect(a, b, (err, rectangle) => {
        if(err) console.log("ERROR: ", err.message)
        else{
            console.log("area: ", rectangle.area())
            console.log("perimeter: ", rectangle.perimeter())
        }
    })
    console.log("called after callback")
}

solve(-2, 1);
solve(3, 2);
