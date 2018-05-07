const fs = require("fs");

const SubPlane = (x, y, size, nbrPoints) => {
    return {
        x:x,
        y:y,
        size:size,
        nbrPoints:nbrPoints,
        isEmpty: nbrPoints === 0,
        isFull: size*size === nbrPoints,
        isAlmostFull: ((size*size - nbrPoints <=5 && size*size - nbrPoints > 0) && nbrPoints/(size*size)*100 > 90),
        toString: () => x + "_" + y + "_" + size 
    };
}

const Plane = (width, height) => {
    let listOfPoint = new Set();

    const addPoint = (x,y) => {
        const valueOfPoint = y * width + x; // value if the matrix was unfold into a list
        listOfPoint.add(valueOfPoint);
    }

    const getWidth = () => width;
    const getHeight = () => Height;

    const getValueOfPoint = (x,y) => y * width + x;
    const getfPointOfValue = (v) => {
        const x = v % width;
        const y = (v - x) / width;
        return {x:x,y:y};
    }

    // return true if there is a point in (x, y)
    const isPoint = (x, y) => listOfPoint.has(getValueOfPoint(x,y));

    //return a sub plan object
    const getSubSquarePlane = (x,y, size) => {
        
        let nbrPoints = 0;

        listOfPoint.forEach(ptValue => {
            const point = getfPointOfValue(ptValue);

            if(point.x >= x && point.x < x + size && 
                point.y >= y && point.y < y + size)
            {
                nbrPoints ++;
            }
        });

        return SubPlane(x, y, size, nbrPoints);
    }

    return {
        listOfPoint:listOfPoint,
        addPoint:addPoint,
        isPoint:isPoint,
        getSubSquarePlane:getSubSquarePlane,
        getWidth:getWidth,
        getHeight:getHeight,
    };
}

const readFile = () => {
    const content = fs.readFileSync("input_0.txt", "utf-8");
    const lines = content.split("\n");
    const size = lines[0].split(",");
    const matrix = lines.slice(1,lines.length);

    const plane = Plane(1024, 1024);

    for(let y = 0; y < matrix.length; y++)
    {
        for(let x = 0; x < matrix[y].length; x++)
        {
            if(matrix[y][x] === '#')
            {
                plane.addPoint(x, y);
            }
        }
    }

    return plane;
}

const get4SubFrom = (sub, plan) => {

    const size = parseInt(sub.size/2);

    //console.log(plan);
    const sub1 = plan.getSubSquarePlane(sub.x, sub.y, size);
    const sub2 = plan.getSubSquarePlane(sub.x + size, sub.y, size);
    const sub3 = plan.getSubSquarePlane(sub.x, sub.y + size, size);
    const sub4 = plan.getSubSquarePlane(sub.x + size, sub.y + size, size);

    return {
        sub1:sub1,
        sub2:sub2,
        sub3:sub3,
        sub4:sub4
    }
}

const getUniformSub = (sub_, plan) => {

    const arraySub = [];

    const recusiveGetUni = (sub, plan) => {
        if(sub.isEmpty || sub.isFull /*|| sub.isAlmostFull*/){
            if(sub.isFull || sub.isAlmostFull){
                arraySub.push(sub);
                //console.log(sub.size);
            }
        }
        else {
            const sub_4 = get4SubFrom(sub, plan);
            
            recusiveGetUni(sub_4.sub1, plan);
            recusiveGetUni(sub_4.sub2, plan);
            recusiveGetUni(sub_4.sub3, plan);
            recusiveGetUni(sub_4.sub4, plan);
        }
    }
    recusiveGetUni(sub_, plan);
    return arraySub;
}



const mergeBlocks = (blocks) =>{
    const blocksMap = new Map();

    blocks.map(block => {
        blocksMap.set(block.toString(), block);
    });

    //check for surrounding neighbors of the SAME size, then merge the 4 neighbors if they fit 

}
const img = readFile();
const sub0 = img.getSubSquarePlane(0, 0, 1024);

console.log("calcul in progress");
const blocks = getUniformSub(sub0, img);



/*
console.log(blocks.length);
console.log(sub0.nbrPoints);

const instructions = blocks.map(sub => ["FILL", sub.x, sub.y, sub.size].join(","));
const fileExport = instructions.join("\n");
fs.writeFileSync("out.txt", fileExport);*/