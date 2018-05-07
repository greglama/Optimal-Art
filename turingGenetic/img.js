const fs = require("fs");
const Plan = require("./plan.js");
const {newRandomIndividual, Individual} = require("./individual.js");
const genode = require("genode");

const POPULATION_SIZE = 100;
const DNA_SIZE = 3000;
const MUTATION_RATE = 0.01;
const NBR_CYCLES = 100;

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

const refPlan = readFile();

const population = new Array();
for(let i = 0; i< POPULATION_SIZE; i++) population.push(newRandomIndividual(DNA_SIZE));

const geneticAlgo = genode(population, refPlan, MUTATION_RATE);

for(let i = 0; i < NBR_CYCLES; i++)
{
    const t0 = (new Date()).getTime();
    geneticAlgo.cycle();
    const t1 = (new Date()).getTime();
    console.log(`generation: ${geneticAlgo.getGeneration()}\tin: ${t0-t1} ms\tbest fit: ${geneticAlgo.getBestFit().fitness(refPlan)}`);
}