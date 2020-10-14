// const getHighestOccurance = (sequence) => {
//   let highestOccurance = 0;
//   Object.entries(sequence).forEach(([key, value]) => {
//     if (value > highestOccurance) {
//       highestOccurance = value
//     }
//   })
//   return highestOccurance;
// }

// const cyclicNumSeq = (stringNumber, base) => {
//   let lastNumber = stringNumber;
//   const sequence = {};
//   sequence[stringNumber] = 1;
//   let doCycle = true;
//   let maxOccurance;

//   let i = 0;
//   do {
//     const z = generateNextSequence(lastNumber, base);
//     lastNumber = z;
//     if (!sequence[z]) {
//       sequence[z] = 1
//     } else {
//       sequence[z] += 1
//     }
//     i++;
//     maxOccurance = getHighestOccurance(sequence);
//     if (maxOccurance === 100) doCycle = false;
//   }
//   while (doCycle);

//   let periodicLength = 0;

//   Object.entries(sequence).forEach(([key, value]) => {
//     if (value === maxOccurance || value === maxOccurance - 1) {
//       periodicLength += 1;
//     }
//   })

//   return periodicLength;
// }

// const getResult = (sequence) => {
//   const MIN_OCCURANCE_LIMIT = 2;
//   // count the occurancies of each different element of the sequence
//   const occurancies = {};
//   sequence.forEach((elem) => {
//     if (occurancies[elem]) {
//       occurancies[elem] += 1;
//     } else {
//       occurancies[elem] = 1;
//     }
//   });

//   // find the highest occurance element of the sequence
//   let highestOccurance = 0;
//   Object.entries(occurancies).forEach(([key, value]) => {
//     if (value > highestOccurance) {
//       highestOccurance = value;
//     }
//   });

//   if (highestOccurance < MIN_OCCURANCE_LIMIT + 1) {
//     return {
//       value: false,
//     };
//   }

//   // collect all the periodic elements of sequence, which has occurance equal to highestOccurance or highestOccurance - 1 and highestOccurance must be at least 4
//   const periodicElements = [];
//   Object.entries(occurancies).forEach(([key, value]) => {
//     if (
//       (value === highestOccurance || value === highestOccurance - 1) &&
//       value >= MIN_OCCURANCE_LIMIT
//     ) {
//       periodicElements.push(key);
//     }
//   });

//   // set basic values of the return object
//   const isSeqPeriodic = {
//     value: true,
//     numberOfPeriodicElements: 0,
//   };

//   // collect the last 3 * periodicElements.length elements in an object and count the occurancies
//   const obj = {};
//   for (
//     let i = sequence.length - 1;
//     i > sequence.length - 1 - MIN_OCCURANCE_LIMIT * periodicElements.length;
//     i--
//   ) {
//     if (periodicElements.includes(sequence[i])) {
//       if (obj[sequence[i]]) {
//         obj[sequence[i]] += 1;
//       } else {
//         obj[sequence[i]] = 1;
//       }
//     }
//   }

//   // check if the last 3 * periodicElements.length contains only the periodic elements and nothing else
//   const check = Object.values(obj).every(
//     (elem) => elem === Object.values(obj)[0] && elem >= MIN_OCCURANCE_LIMIT
//   );

//   if (!check) isSeqPeriodic.value = false;

//   // if all the tests passed then the result will be the length of periodicElements.length
//   if ((isSeqPeriodic.value = true)) {
//     isSeqPeriodic.numberOfPeriodicElements = periodicElements.length;
//   }

//   return isSeqPeriodic;
// };

const substract = (num1, num2, base) => {
  const rest = [];
  rest[num1.length - 1] = 0;
  const result = [];
  for (let i = num1.length - 1; i >= 0; i--) {
    if (parseInt(num1[i]) - (parseInt(num2[i]) + rest[i]) >= 0) {
      result[i] = parseInt(num1[i]) - (parseInt(num2[i]) + rest[i]);
      rest[i - 1] = 0;
    } else {
      result[i] = parseInt(num1[i]) - (parseInt(num2[i]) + rest[i]) + base;
      rest[i - 1] = 1;
    }
  }
  return result.join('');
};

const generateNextSequenceElement = (stringNumber, base) => {
  const x = stringNumber
    .split('')
    .map((stringNum) => parseInt(stringNum))
    .sort((a, b) => b - a)
    .join('');

  const y = stringNumber
    .split('')
    .map((stringNum) => parseInt(stringNum))
    .sort((a, b) => a - b)
    .join('');
  return substract(x, y, base);
};

const getResult = (sequence) => {
  const MIN_OCCURANCE_LIMIT = 3;
  // count the occurancies of each different element of the sequence
  const occurancies = {};
  let highestOccurance = 0;

  // start from the end of the elements
  for (let i = sequence.length - 1; i >= 0; i--) {
    highestOccurance = 0;
    if (occurancies[sequence[i]]) {
      occurancies[sequence[i]] += 1;
    } else {
      occurancies[sequence[i]] = 1;
    }

    // eslint-disable-next-line no-loop-func
    Object.entries(occurancies).forEach(([, value]) => {
      if (value > highestOccurance) {
        highestOccurance = value;
      }
    });

    if (highestOccurance === MIN_OCCURANCE_LIMIT) {
      const check = Object.values(occurancies).every(
        (elem) =>
          elem === MIN_OCCURANCE_LIMIT || elem === MIN_OCCURANCE_LIMIT - 1
      );
      if (check) {
        return {
          value: true,
          numberOfPeriodicElements: Object.values(occurancies).length,
        };
      }
    }
  }
  return {
    value: false,
  };
};

const cyclicNumSeq = (stringNumber, base) => {
  let lastNumber = stringNumber; // stores the last value of the sequence
  const sequence = []; // contains the sequence elements
  sequence.push(lastNumber);
  let doLoop = true; // it will stop the do while loop
  let periodicLength; // final result

  let i = 0;
  do {
    const z = generateNextSequenceElement(lastNumber, base);
    lastNumber = z;
    sequence.push(lastNumber);
    i++;
    const result = getResult(sequence);
    if (result.value) {
      console.log(`Got result under ${i} loop cycle`);
      periodicLength = result.numberOfPeriodicElements;
      doLoop = false;
    }
  } while (doLoop);

  return periodicLength;
};

console.log(cyclicNumSeq('1211', 10));

console.log(cyclicNumSeq('210022', 3));
