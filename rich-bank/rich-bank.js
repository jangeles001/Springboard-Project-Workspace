const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	for (const account of accounts)
	{
		if (account.id === id)
		{
			return account;
		}
	}
}

function createAccount (newAccountId, newAccountOwner)
{
	const account = getAccountById();

	if(account){
		throw new Error("Account already Exists.");
	}

	if(newAccountId <= 0 || !Number.isFinite(newAccountId)){
		throw new Error("Account Id must be a positive finite number.");
	}

	if(typeof newAccountOwner !== "string" || newAccountOwner.trim() === ""){
		throw new Error("Account name must be a string.");
	}

	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	if(amount <= 0 || !Number.isFinite(amount)){
		throw new Error("Deposit amount must be a positive finite number.");
	}

	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0)
	{
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}

	if (amount > account.balance){
		throw new Error("Insufficinet funds in your account to withdrawl.")
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}

	if (!toAccount){
		throw new Error("Destination account not found.")
	}

	if (!Number.isFinite(amount) || amount <= 0)
	{
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}

	if(amount > fromAccount.balance){
		throw new Error("Insufficient funds in your account to transfer.")
	}

	fromAccount.balance -= amount;
	toAccount.balance += amount;
}
