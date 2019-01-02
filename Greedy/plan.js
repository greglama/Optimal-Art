/**
 * Class to efficiently handle points (x,y)
 */
const Plan = (width, height) => {

    //set of points. Private attribut
    const points = new Set();

    //return an iterator with all the points
    const getPoints = () => Array.from(points).map(v => getPointFromValue(v));

    //convert a point to a unique value
    const pointToValue = (x, y) => y * width + x;

    //convert a value to its unique point
    const getPointFromValue = (v) => {
        const x = v % width;
        const y = (v - x) / width;
        return {x:x, y:y};
    }

    //return the number of points
    const count = () => points.size;

    //add a point in x, y
    const addPoint = (x, y) => {
        if(x < width && y < height)
        {
            points.add(pointToValue(x,y));
        }
        else
        {
            const message = `point (${x}, ${y}) is out of the plan (${width}, ${height})!`;
            throw new Error(message);
        }
    }

    const addSquare = (x, y, c) => {
        if (c === 1 ) addPoint(x,y);
        else
        {
            for(let i = x; i < x + c; i++)
            {
                for(let j = y; j < y + c/2; j++)
                {
                    addPoint(i,j);
                    addPoint(i,j + Math.ceil(c/2));
                }
            } 
        }
    }

    //erase a point in x, y. Do nothing if the point doesn't exist
    const erasePoint = (x, y) => {
        const point = pointToValue(x, y);
        points.delete(point);
    }

    //check whether or not there is a point at the location (x, y)
    const hasPoint = (x, y) => points.has(pointToValue(x,y));
    const hasNotPoint = (x,y) => !hasPoint(x, y);

    //give the similitude between the two plan as a number between 0 and 1 
    const ratioSimilitude = (plan_A, plan_B) => {

        if (plan_A.Width != plan_B.Width || plan_A.Height != plan_B.Height) throw new Error("You can't compare 2 plans with differents size");
        else {

            //iterate over the points of maxPlan and check if they are in minPlan
            const iterator_A = plan_A.getPoints();
            let valueIterator = iterator_A.next();

            let commonPoints = 0; // number of points in common between the two plan

            //console.log("debut du calcul de simitude...");
            while(!valueIterator.done)
            {
                const point = getPointFromValue(valueIterator.value);

                if(plan_B.hasPoint(point.x, point.y))
                {
                    commonPoints ++;
                }
                valueIterator = iterator_A.next();
            }

            const truePositive = commonPoints;
            const falsePositive = plan_B.count() - commonPoints;
            const falseNegative = plan_A.count() - commonPoints;
            const trueNegative = 600 * 800 - truePositive - falsePositive - falseNegative;

            return (trueNegative + truePositive)/(trueNegative + truePositive + falseNegative + falsePositive);
        }
    }

    return {
        Width:width,
        Height:height,
        count:count,
        addPoint:addPoint,
        addSquare:addSquare,
        erasePoint:erasePoint,
        hasPoint:hasPoint,
        hasNotPoint:hasNotPoint,
        getPoints:getPoints,
        ratioSimilitude:ratioSimilitude
    }
}

module.exports = Plan;