const fs = require("fs");
const Plan = require("./plan.js");

//square
function Square(x, y, c){
    this.x = x;
    this.y = y;
    this.c = c;
}

// get the original picture from the input file and transform it in a plan
const readFile = () => {
    const content = fs.readFileSync("input_0.txt", "utf-8");
    const lines = content.split("\n");
    const size = lines[0].split(",");
    const matrix = lines.slice(1,lines.length);

    const plan = Plan(800, 600);

    for(let y = 0; y < matrix.length; y++)
    {
        for(let x = 0; x < matrix[y].length; x++)
        {
            if(matrix[y][x] === '#')
            {
                plan.addPoint(x, y);
            }
        }
    }

    return plan;
} 

function findBiggestSquareIn(plan){
    const squareMax = new Square(0, 0, 0);
    const listPoint = plan.getPoints();

    listPoint.map(point => {
        let size = 1;
        const x = point.x;
        const y = point.y; 

        let isEmpty = false;

        while(!isEmpty)
        {
            for(let i = 0; i < size; i++)
            {
                if(!plan.hasPoint(x + size, y + i))
                {
                    isEmpty = true;
                    break;
                }
            }

            if(isEmpty) break;

            for(let j = 0; j < size; j++)
            {
                if(!plan.hasPoint(x + j, y + size))
                {
                    isEmpty = true;
                    break;
                }  
            }
            if(isEmpty) break;

            if(!plan.hasPoint(x + size, y + size)) break;

            size ++;
        }
        
        if(size > squareMax.c)
        {
            squareMax.x = x;
            squareMax.y = y;
            squareMax.c = size;
        }
    });

    return squareMax;
}

const image = readFile();

const squareList = new Array();

while(image.count() > 0)
{
    const biggest = findBiggestSquareIn(image);

    for(let x = biggest.x; x < biggest.x + biggest.c; x ++)
    {
        for(let y = biggest.y; y < biggest.y + biggest.c; y ++)
        {
            image.erasePoint(x,y);
        }
    }
    squareList.push(biggest);
    console.log(`size:${biggest.c} remaining points:${image.count()}`);
}

console.log(squareList.length);

const text = squareList.map(sq => `FILL,${sq.x},${sq.y},${sq.c}\n`).join("");

fs.writeFileSync("out_glouton.txt", text);