/*
pivot accepts an array, starting index, and ending index <-- I was lied to! Only accepts array :^)
You can assume the pivot is always the first element 
*/
function pivot(arr){
    
    let startIndex = 0;
    let endIndex = 1;

    let pivotValue = arr[startIndex];
    let partitionIndex = 1;

    for(let i = endIndex; i < arr.length; i++){
        if(arr[i] < pivotValue){
            let temp = arr[i];
            arr[i] = arr[partitionIndex];
            arr[partitionIndex] = temp;
            partitionIndex++;
        }
            
    }
    partitionIndex--;
    let temp = arr[startIndex];
    arr[startIndex] = arr[partitionIndex];
    arr[partitionIndex] = temp;
   
    return partitionIndex;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr) {
    if(arr.length <= 1) return arr; // base case
    
    let pivotIndex = pivot(arr);
    let left = arr.slice(0,pivotIndex);
    let right = arr.slice(pivotIndex+1);

    return [...quickSort(left), arr[pivotIndex] ,...quickSort(right)];

}

module.exports = {quickSort, pivot};