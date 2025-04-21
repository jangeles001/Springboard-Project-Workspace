function insertionSort(arr) {
    
    let i = 0;
    let j = 1;

    while(i < arr.length){
        if(arr[i] > arr[j]){  // only swaps when a smaller element is found in the array.
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;  
        }
        if(j === arr.length){
            j = i+1;
            i++;
        }
        j++;
    }
    return arr;
}

module.exports = insertionSort;