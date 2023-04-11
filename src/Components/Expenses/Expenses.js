
import React, { useState } from "react";

import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";

import './Expenses.css';

function Expenses(props) {

    const [dropDSelection, setSelection] = useState('');

    const dropDownChangeHandler = (selection) => {

        
        setSelection(prevSelection => selection);

        console.log(dropDSelection);

    }



    return (

        <Card className="expenses">
            <ExpensesFilter onDropDownChange={dropDownChangeHandler}/>
            <ExpenseItem
                title={props.expense[0].title}
                amount={props.expense[0].amount}
                date={props.expense[0].date}></ExpenseItem>
            <ExpenseItem
                title={props.expense[1].title}
                amount={props.expense[1].amount}
                date={props.expense[1].date}></ExpenseItem>
            <ExpenseItem
                title={props.expense[2].title}
                amount={props.expense[2].amount}
                date={props.expense[2].date}></ExpenseItem>
            <ExpenseItem
                title={props.expense[3].title}
                amount={props.expense[3].amount}
                date={props.expense[3].date}></ExpenseItem>
        </Card>

    );
}

export default Expenses;