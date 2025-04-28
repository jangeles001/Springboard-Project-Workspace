const NUMAPIURL = `http://numbersapi.com/`;

async function getNumberFact(number){

    let response = await fetch(NUMAPIURL + number + "/trivia?json")
    let json1 = await response.json();

    return {
        trivia: json1.text,
        number: json1.number
    };
}

async function getMoreFacts(...numbers) {
    let promises = numbers.map(number =>   //creates an arry of promises once  
        fetch(NUMAPIURL + number + "/trivia?json").then(results => results.json())
    );
    
    let responses = await Promise.all(promises);
    return responses;
}

/*
Function that finds number sequences in the argruments provided and makes a batch request to http://numbersapi.com/.
*/
async function getMultipleNumberFacts(){
    let numbers = [];
    const sequencePairs = new Map();   //map to store beginning and end of a sequence
    let firstSequenceNumber = 0;
    let previous = 0;
    let nonSequentialNumbers = [];   // array that stores non-sequential numbers
    let response;
    let url1 = NUMAPIURL;

    document.getElementById('facts-output').innerHTML = '';

    for(let i = 0; i <= Math.floor(Math.random() * 9)+2; i++){  //creates an random array of 2-10 numbers. Each number will also be between 2-10.
        let num = Math.floor(Math.random() * 9) + 1;
        while(numbers.findIndex(element => element === num) !== -1){
            num = Math.floor(Math.random() * 9) + 1;
        }
        numbers.push(num);  
    }

    numbers.sort((a,b) => Number(a) > Number(b) ? 1:-1);     //Sorts array of arguments. Uses a lambda to pass comparotor.
                                                            //Tertiary operator determines what is pased when true(1) or false(-1).
    firstSequenceNumber = numbers[0];
    previous = numbers[0];

    if(numbers.length > 1){
        for(const number of numbers){
            if(number === previous+1 && number !== numbers[numbers.length-1]){   // checks if a sequence exists
                previous = number;
            }else{
                if(firstSequenceNumber !== previous){  // once a sequence is broken it is stored in the sequencePairs map
                    sequencePairs.set(firstSequenceNumber, previous);
                }
                if(number !== numbers[numbers.length-1] && number !== (numbers[numbers.indexOf(number)+1]-1)){  //checks if the current number is the start of a squence
                    nonSequentialNumbers.push(number.toString());                                               //adds number to nonSequentilNumbers if not the start of a sequence
                }
                if(number === (numbers[numbers.length-1])){   //checks if the end of the array is reached and checks if last number is part of a sequence
                    if(number === previous+1){                  
                        sequencePairs.set(firstSequenceNumber, number);
                    }else{
                        nonSequentialNumbers.push(number.toString());
                    }
                }
                previous = number;
                firstSequenceNumber = number;
            }
                
        }

        nonSequentialNumbers = nonSequentialNumbers.join(",");   //joins nonSequentialNumbers into a string with commas.
    }

    if(sequencePairs){    // creates url string for API call
        for(const pairs of sequencePairs){
            url1 += pairs[0] + ".." + pairs[1] + ",";
        }
    }
    if(nonSequentialNumbers){
        url1 += nonSequentialNumbers;
    }else{
        url1 = url1.substring(0, url1.length-1);
    }
    response = await fetch(url1 +  "/trivia?json").then(results => results.json());  //saves the api response and converts to json

    const triviaText = response;
    const numOfFacts = numbers.length.toString();
    for(const number in triviaText){
        document.getElementById('facts-output').innerHTML += `<p>${triviaText[number]}</p>`;  // 
    }
    
    document.getElementById('numberOfFacts').innerHTML = `Now showing ${numOfFacts} number facts`;  // Updates the number of facts being displayed on the page
}

document.addEventListener('DOMContentLoaded', async function() {
    await getMultipleNumberFacts(); // Initializes the first set of facts (2-10 facts)

    document.getElementById('facts-button').addEventListener('click', getMultipleNumberFacts); // fetches a new set of facts (2-10)
});