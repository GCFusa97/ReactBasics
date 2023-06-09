import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpenseChart from "./ExpensesChart";

import './Expenses.css';

function Expenses(props) {

    const [dropDSelection, setSelection] = useState('2020');

    const dropDownChangeHandler = (selection) => {

        setSelection(selection);

    }

    const filteredExpenses = props.expense.filter((expense) => {
        return expense.date.toLocaleString('en-US', { year: 'numeric' }).toString() === dropDSelection;
    });

    return (

        <Card className="expenses">
            <ExpensesFilter selected={dropDSelection} 
                            onDropDownChange={dropDownChangeHandler} />
            <ExpenseChart expenses = {filteredExpenses}/>
            <ExpensesList items = {filteredExpenses}/>
        </Card>

    );
}

export default Expenses;