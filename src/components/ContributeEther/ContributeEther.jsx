import React, {useState} from 'react'
import { useRef } from 'react';
import './ContributeEther.css'

// constant
import { MIN_CONTRIBUTION } from '../../helpers/constants';

const ContributeEther = ({closePopup, contributeEther}) => {

    const submitRef = useRef();

    const [etherAmount, setEtherAmount] = useState("");
  
    function validateForm(e) {
      e.preventDefault();

      if (etherAmount < MIN_CONTRIBUTION) {
        alert(`Minimum contribution is ${MIN_CONTRIBUTION} ether`);
        return
      }
      submitRef.current.disabled = true
      contributeEther(etherAmount);
    }
  
    return (
      <div className='contribute-container'>
        <form className='contribute-form' onSubmit={validateForm}>
          <h1>Enter Amount(ETH)</h1>
          <label htmlFor="etherAmount"></label>
          <input
            type="number"
            id="etherAmount"
            name="etherAmount"
            step="0.0000001"
            placeholder="Enter amount to contribute"
            required
            className="no-spinner"
            value={etherAmount}
            onChange={(e) => setEtherAmount(e.target.value)}
          />
          <div style={{ textAlign: "right" }}>
            <input type="button" value="Cancel" onClick={closePopup} />
            <input type="submit" ref={submitRef} value="Contribute" />
          </div>
        </form>
      </div>
    );
}

export default ContributeEther
