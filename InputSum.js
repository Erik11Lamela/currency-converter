import React from 'react'

export default function InputSum(props) {
    const {
      cOptions , 
      greens,
      onChangeNumber,
      selectedCurrency,
      onChangeCurrency
    } = props
    return (
        <div>
            <input type = "number"  value = {greens}  onChange = {onChangeNumber}/>
            <select value = {selectedCurrency} onChange = {onChangeCurrency}>    
                {cOptions.map(option => (
                    <option key = {option} value = {option}> {option} </option>
                )) }
                
            </select>
        </div>
    )
}
