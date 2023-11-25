const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataFile = 'budgetData.txt';

// Function to add a record
function addRecord(type, amount, category) {
  const record = { type, amount, category, date: new Date().toISOString() };
  fs.appendFileSync(dataFile, JSON.stringify(record) + '\n');
  console.log('Record added:', record);
}

// Function to view all records
function viewRecords() {
  const data = fs.readFileSync(dataFile, 'utf-8');
  const records = data.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
  console.table(records);
}

// Main menu
function mainMenu() {
  rl.question('Choose an action: (1) Add Income, (2) Add Expense, (3) View Records, (4) Exit: ', answer => {
    switch (answer) {
      case '1':
        addRecordPrompt('Income');
        break;
      case '2':
        addRecordPrompt('Expense');
        break;
      case '3':
        viewRecords();
        mainMenu();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please enter 1, 2, 3, or 4.');
        mainMenu();
    }
  });
}

// Prompt for adding a record
function addRecordPrompt(type) {
  rl.question(`Enter the amount for ${type}: `, amount => {
    rl.question(`Enter the category for ${type}: `, category => {
      addRecord(type, parseFloat(amount), category);
      mainMenu();
    });
  });
}

// Start the application
mainMenu();

//I AM A CHANGE