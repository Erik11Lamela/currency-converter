import React, {useEffect, useState} from 'react';
import './App.css';
import InputSum from './InputSum';
const baseURL = "https://api.exchangeratesapi.io/latest"
function App() {
  const [cOptions,setCOptions] = useState([])
  const [greens , setGreens]= useState(1)
  const [whichone, setWhichone] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()
  const [currencyIn, setCurrencyIn] = useState()
  const [currencyOut, setCurrencyOut] = useState()
  let greens1, greens2
  if (whichone){
    greens1 = greens
    greens2 = greens * exchangeRate
  } else{
    greens2 = greens
    greens1 = greens / exchangeRate
  }  
  useEffect(()=>{
    fetch(baseURL)
      .then(res=> res.json())
      .then(data=> {   
        const pos1 = Object.keys(data.rates)[0]     
        setCOptions([data.base, ...Object.keys(data.rates)])
        setExchangeRate(data.rates[pos1])
        setCurrencyIn (data.base)
        setCurrencyOut(pos1)
      })
    },[])
    function handleFirstNumberChange(e){
      setGreens(e.target.value)
      setWhichone(true)
    }
    function handleSecondNumberChange(e){
      setGreens(e.target.value)
      setWhichone(false)
      
    }
    function handleSecondCurrencyChange(e){
      setCurrencyOut (e.target.value)
      setWhichone(false)
    }
    function handleFirstCurrencyChange(e){
      setCurrencyIn (e.target.value)
      setWhichone(true)
    }
    useEffect(() =>{
      if (currencyOut != null && currencyIn != null){
      fetch(`${baseURL}?base=${currencyIn}&symbols=${currencyOut}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[currencyOut]))
      }
    },[greens2,greens1,currencyIn,currencyOut])
  return (
    <div className = "app">  
      <h1> Free Online Currency Converter </h1>
      <InputSum
        cOptions = {cOptions} 
        greens = {greens1}
        selectedCurrency = {currencyIn}
        onChangeNumber = {handleFirstNumberChange}
        onChangeCurrency = {handleFirstCurrencyChange}
        />
      <div>=</div>
      <InputSum 
         cOptions = {cOptions} 
         greens = {greens2}
         selectedCurrency = {currencyOut}
         onChangeNumber = {handleSecondNumberChange}
         onChangeCurrency = {handleSecondCurrencyChange} 

         />
    </div>
  );
}

export default App;
