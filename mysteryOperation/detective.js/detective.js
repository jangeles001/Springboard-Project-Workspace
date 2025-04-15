function mysteryOperation ()
{
	const outcome = Math.random(); // Generates a random number between 0 and 1.
	
	if (outcome < 0.5)
	{
		console.log("The operation is completed successfully!");
	}
	else
	{
		throw new Error("The operation is failed mysteriously!");
		
	} 
}

/* Parameters
 13 days of vacation for each successful operation
 3 days given of vacation for each unsuccessful operation
 1 day of vacation for attempting a mission
 20 missions this year
*/
const totalOperationCount = 20;
let totalVacationDays = 0;

for(let operationCount = 0; operationCount < totalOperationCount; operationCount++){
	try{
		mysteryOperation();
		totalVacationDays += 13;
	} catch (err) {
		console.log(err.message);
		totalVacationDays += 3;
	} finally {
		totalVacationDays += 1;
	}
}
console.log(`Total Vacation Days Earned: ${totalVacationDays}`);