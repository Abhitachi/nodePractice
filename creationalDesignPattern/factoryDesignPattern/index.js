import { createProfiler } from "./profiler.js";

const generateFactors = (number) => {
  const profiler = createProfiler(`Generating factors for ${number}`);
  profiler.start();
  const factors = [];
  for (let i = 2; i <= number; i++) {
    while (number % i === 0) {
      factors.push(i);
      number = number / i;
    }
  }
  profiler.end();
  return factors;
};

const number = process.argv[2];
const factors = generateFactors(number);
console.log(`Factors for ${number} are: ${factors.join(", ")}`);
console.log(process.argv[0], process.argv[1]);
