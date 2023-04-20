import React, { useState } from 'react';
import './App.css';

import Expenses from './Components/Expenses/Expenses';
import NewExpense from './Components/NewExpense/NewExpense';

const DUMMY_DATA = [
  {
    id: 'e1',
    title: 'Car insurance',
    amount: 233,
    date: new Date(2022, 2, 13)
  },
  {
    id: 'e2',
    title: 'Toilet paper',
    amount: 12,
    date: new Date(2021, 2, 13)
  },
  {
    id: 'e3',
    title: 'House insurance',
    amount: 1000,
    date: new Date(2022, 6, 25)
  },
  {
    id: 'e4',
    title: 'TV cable',
    amount: 100,
    date: new Date(2020, 11, 1)
  },
  {
    id: 'e5',
    title: 'Books',
    amount: 100,
    date: new Date(2019, 0, 1)
  }
]


function App() {

  const [expenses, setExpenses]=useState(DUMMY_DATA);

  const addExpenseHandler = (expense) => {

    expense.date = new Date(expense.date);

    setExpenses((prevExpenses) => {
      return [...prevExpenses, expense];
    });

    console.log(expenses[0]);
    console.log(expense);

  };



  return (

    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses expense={expenses}></Expenses>
    </div>

  );
}

export default App;
