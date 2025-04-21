function getDigit(number, column){

    return Math.floor((number/(Math.pow(10, column)))%10);
}

function digitCount(number){
    if (number === 0) return 1;

    return Math.floor(Math.log10(Math.abs(number))) + 1
}

function mostDigits(arr){
    let mostDigit = 0;
    
    for(num in arr){
        let numToCompare = digitCount(arr[num]);
        if(numToCompare > mostDigit){
            mostDigit = numToCompare;
        }
    }

    return mostDigit;
}

function radixSort(arr) {
    const buckets = new Map();
    const lengthOfArray = arr.length;
    const maxPosition = mostDigits(arr);
    let currPosition = 0;                        // Keeps track of current column postion

    for(let column = 0; column <= 9; column++){  // creates buckets to sort the numbers
        buckets.set(column, []);
    }

    while(currPosition <= maxPosition){  // checks if all items have been sorted
                  
        
        if(arr.length === 0){
            for(let column = 0; column <= 9; column++){  // empties buckets
                while(buckets.get(column).length > 0){
                    arr.push(buckets.get(column).shift());
                }
            }
        }
        
        while(arr.length > 0){ 
            let element =  arr.shift()
            for(let bucketValue = 0 ; bucketValue <= 9; bucketValue++){        //iterates through all the buckets 
                if(bucketValue === getDigit(element, currPosition)){
                    buckets.get(bucketValue).push(element);
                    break;
                }
            }
            
        }
        currPosition++;
    }

    for (let nums of buckets.get(0))
        arr.push(nums)

    return arr;
}



module.exports = {getDigit, digitCount, mostDigits, radixSort};