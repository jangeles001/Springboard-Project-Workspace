function selectionSort(arr) {
    
    if(arr.length === 1) return arr; // returns the array if the length is one.

    for(let index = 0; index < arr.length; index++){
        let minimumIndex = index;
        for(let j = index; j < arr.length; j++){
            if(arr[j] < arr[minimumIndex]){
                minimumIndex = j;
            }
        }
        if(minimumIndex !== index){
            let temp = 0;
            temp = arr[index];
            arr[index] = arr[minimumIndex];
            arr[minimumIndex] = temp;
        }
    }

    return arr;

}

module.exports = selectionSort;