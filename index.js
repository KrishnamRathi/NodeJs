const rect = require('./rectangle')

function solve(a, b){
    console.log('solving l='+a+' and b='+b+'.');
    if(a<0 || b<0) console.log('Dimentions must be positive');
    else {
        console.log('Area = '+rect.area(a,b));
        console.log('Perimeter = '+rect.perimeter(a,b))
    }
}

solve(-2, 1);
solve(3, 2);
