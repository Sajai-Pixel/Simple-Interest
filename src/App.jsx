import { useState } from 'react';
import './App.css'
import { TextField, Stack, Button } from '@mui/material';

function App() {

  const [principle, setPrinciple] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)
  const [interest, setInterest] = useState(0)

  const [isPrincipleInvalid, setIsPrincipleInvalid] = useState(false)
  const [isRateInvalid, setIsRateInvalid] = useState(false)
  const [isYearInvalid, setIsYearInvalid] = useState(false)

  const validateInput = (inputTag) => {
    const { name, value } = inputTag
    console.log(name, value);
    console.log(!!value.match(/^\d*\.?\d+$/));
    if (name == 'principle') {
      setPrinciple(value)
      !!value.match(/^\d*\.?\d+$/) ? setIsPrincipleInvalid(false) : setIsPrincipleInvalid(true)
    }
    else if (name == 'rate') {
      setRate(value)
      !!value.match(/^\d*\.?\d+%?$/) ? setIsRateInvalid(false) : setIsRateInvalid(true)
    }
    else if (name == 'year') {
      setYear(value)
      !!value.match(/^\d*\.?\d+$/) ? setIsYearInvalid(false) : setIsYearInvalid(true)
    }
  }

  const calculate = (e) => {
    e.preventDefault()
    console.log("Inside Calculate Function");
    if (principle && rate && year) {
      setInterest(principle * rate * year / 100)
    }
    else {
      alert("Please fill the form completely")
    }
  }

  const reset = () => {
    setPrinciple(0)
    setRate(0)
    setYear(0)
    setInterest(0)
    setIsPrincipleInvalid(false)
    setIsRateInvalid(false)
    setIsYearInvalid(false)
  }
  return (
    <div style={{ minHeight: "100vh", width: "100%" }} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{ width: "600px" }} className='bg-light rounded p-5'>
        <h1>Simple Interest Calculator</h1>
        <p>Calculate your simple interest easily</p>
        <div className='d-flex justify-content-center align-items-center bg-success rounded shadow p-3 flex-column text-light'>
          <h1 className='fw-bolder'>₹ {interest}</h1>
          <p className='fw-bolder'>Total Simple Interest</p>
        </div>
        <form className='mt-5'>
          <div className='mb-3'>
            <TextField value={principle || ""} onChange={e => validateInput(e.target)} name='principle' id="outlined-basic" label="₹ Principal Amount" className='w-100' variant="outlined" />
          </div>
          {
            isPrincipleInvalid &&
            <div className="mb-3 text-danger fw-bolder">Invalid Principle Amount</div>
          }
          <div className='mb-3'>
            <TextField value={rate || ""} onChange={e => validateInput(e.target)} name='rate' id="outlined-basic1" label="Rate of Interest (p.a) %" className='w-100' variant="outlined" />
          </div>
          {
            isRateInvalid &&
            <div className="mb-3 text-danger fw-bolder">Invalid Principle Amount</div>
          }
          <div className='mb-3'>
            <TextField value={year || ""} onChange={e => validateInput(e.target)} name='year' id="outlined-basic2" label="Time Period (Yr)" className='w-100' variant="outlined" />
          </div>
          {
            isYearInvalid &&
            <div className="mb-3 text-danger fw-bolder">Invalid Principle Amount</div>
          }
          <Stack direction="row" spacing={2}>
            <Button disabled={isPrincipleInvalid || isRateInvalid || isYearInvalid} type='submit' onClick={calculate} variant="contained" style={{ width: "50%", height: "70px" }} className='bg-dark'>Calculate</Button>
            <Button variant="outlined" onClick={reset} style={{ width: "50%", height: "70px" }}>Reset</Button>
          </Stack>
        </form>
      </div>
    </div>
  )
}

export default App
