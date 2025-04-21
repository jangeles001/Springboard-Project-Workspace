function bubbleSort(arr) {
    for(let i = arr.length; i > 0; i--){
        for(let j = 0; j <= i ; j++){
            if(arr[j] > arr[i]){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

module.exports = bubbleSort;