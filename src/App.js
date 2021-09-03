import { useState } from 'react';
import './App.css';


function App() {

  const [error, setError] = useState("");
  const numList = new Array(7);
  const [numOfNotes, setNumOfNotes] = useState([]);
  const notesList = [2000, 500, 100, 20, 10, 5, 1];
  const [cashExchange, setCashExchange] = useState({
    cashGiven: 0,
    billAmount: 0,
  });
  
  function calculateNumOfNotes(cash,bill){
    cash=Number(cash)
    bill=Number(bill)
    let returnAmount=cash-bill;
    if(cash>=bill){
      for(let i=0;i<7;i++){
        numList[i]=parseInt(returnAmount/notesList[i]);
        returnAmount=returnAmount%notesList[i];
      }
      setError('');
      return numList;     
    }else{
      setError('Do you want to wash plates?');
      return false;
    }
  }

  const handleClick=(e)=>{
    const resultList=calculateNumOfNotes(cashExchange.cashGiven,cashExchange.billAmount);
    if(resultList){
      setNumOfNotes([...resultList])
    }
  }
  

  

  const handleChange=(e)=>{
    setCashExchange({...cashExchange,
      [e.target.name]:e.target.value
    })
  }


  return (
    <div className="App">
      <h1>Cash Register Manager</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <label htmlFor="bill-amount">
        <h3>Bill amount:</h3>
      </label>
      <input
        id="bill-amount"
        value={cashExchange.billAmount}
        type="number"
        onChange={handleChange}
        name="billAmount"
      />
      <label htmlFor="cash-giver">
        <h3>Cash given:</h3>
      </label>
      <input
        id="cash-given"
        type="number"
        value={cashExchange.cashGiven}
        onChange={handleChange}
        name="cashGiven"
      /> <br />
      <button className="check-button" onClick={handleClick}>
        Check
      </button>
      <p>{error}</p>
      <h2>Return Change</h2>
      <table>
        <tr>
          <th>No. of notes</th>
          {numOfNotes.map((num, index) => {
            return <td key={index}>{num}</td>;
          })}
        </tr>
        <tr>
          <th>Notes</th>
          <td>2000</td>
          <td>500</td>
          <td>100</td>
          <td>20</td>
          <td>10</td>
          <td>5</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
