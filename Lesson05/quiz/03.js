//Given the following nested data structure, and without running the code,
//select the correct code to change the string 'Apple Juice' to 'Orange Juice'.

let todoLists = [
  {
    id: 1,
    listName: 'Groceries',
    todos: [
      { id: 1, name: 'Bread', completed: false },
      { id: 2, name: 'Milk', completed: false },
      { id: 3, name: 'Apple Juice', completed: false }
    ]
  }
];

todoLists[0]['todos'][2]['name'] = 'Change One';
console.log(todoLists[0].todos);
todoLists[0].todos[2].name = 'Change Two';
console.log(todoLists[0].todos);
todoLists[0]['todos'][2].name = 'Change Three';
console.log(todoLists[0].todos);
todoLists[0].todos[2]['name'] = 'Change Four';
console.log(todoLists[0].todos);