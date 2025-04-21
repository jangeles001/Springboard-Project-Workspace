function merge(arr1, arr2) {
    
    const sortedArray = [];
    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            sortedArray.push(arr1[i]);
            i++;
        } else {
            sortedArray.push(arr2[j]);
            j++;
        }
    }
        while(i < arr1.length){            // Adds the remaining number in either array.
            sortedArray.push(arr1[i]);
            i++;
        }

        while(j < arr2.length){
            sortedArray.push(arr2[j]);
            j++;
        }

        return sortedArray;
}

function mergeSort(arr) {
    
    if (arr.length <= 1){ return arr; }  // base case that returns from the recursive function call

    const mid = Math.floor(arr.length/2); 
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid)); 

    return merge(left, right);
}

module.exports = { merge, mergeSort};