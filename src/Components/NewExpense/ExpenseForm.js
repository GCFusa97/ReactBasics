import React, { useState } from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {

    // const [enteredTitle, setEnteredTitle] = useState('');  
    // const [enteredAmount, setEnteredAmount] = useState('');
    // const [enteredDate, setEnteredDate] = useState('');

    const [userInput, setUserInput] = useState({

        title: '',
        amount: '',
        date: '',

    })

    const [form, setForm] = useState(true);


    const titleChangeHandler = (event) => {

        // setUserInput({

        //     ...userInput,
        //     enteredTitle: event.target.value

        // })

        setUserInput((prevState) => {

            return { ...prevState, title: event.target.value }

        })

    }

    const amountChangeHandler = (event) => {

        // setUserInput({
        //     ...userInput,
        //     enteredAmount: event.target.value
        // })


        setUserInput((prevState) => {

            return { ...prevState, amount: event.target.value }

        })

    }

    const dateChangeHandler = (event) => {

        // setUserInput({
        //     ...userInput,
        //     enteredDate: event.target.value
        // })


        setUserInput((prevState) => {

            return { ...prevState, date: event.target.value }

        })

    }

    const addExpense = (event) => {

        event.preventDefault();

        props.onSaveExpenseData(userInput);

        setUserInput({
            title: '',
            amount: '',
            date: ''
        })

        setForm(false);

    }

    const hideForm = () => {

        setForm(false);

    }

    const showForm = () => {

        setForm(true);
    }

    return <form onSubmit={addExpense}>
        {form ?
            <div>
                <div className="new-expense__controls">
                    <div className="new-expense__control">
                        <label>Title</label>
                        <input type="text"
                            value={userInput.title}
                            onChange={titleChangeHandler} />
                    </div>
                    <div className="new-expense__control">
                        <label>Amount</label>
                        <input type="number"
                            min="0.01"
                            step="0.01"
                            value={userInput.amount}
                            onChange={amountChangeHandler} />
                    </div>
                    <div className="new-expense__control">
                        <label>Date</label>
                        <input type="date"
                            min="2019-01-01"
                            max="2024-12-31"
                            value={userInput.date}
                            onChange={dateChangeHandler} />
                    </div>
                </div>
                <div className="new-expense__actions">
                    <button type="button" onClick={hideForm}>Cancel</button>
                    <button type="submit">Add expense</button>
                </div>
            </div> :
            <div className="new-expense__actions">
                <button type="button" onClick={showForm}>Add new expense</button>
            </div>
        }
    </form>


}

export default ExpenseForm