import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import './ResponsiveProgressBar.css';



const ResponsiveProgressBar = ({ reqAmount, collected }) => {

  const percentageCollected = ((collected/reqAmount)*100).toFixed(0);

  return (
    <div className="progress-bar-container">
      <ProgressBar
          completed={percentageCollected}
          label={`${percentageCollected}% funded`}
          bgColor='var(--secondary)' 
          baseBgColor='var(--white)' 
          height='20px' 
          width='100% !important'
          margin='5px' 
          labelStyle={{ color: 'var(--black) !important' }}
          labelClassName='progressBar-label'
          className='progress-bar'
        />
      <div className="eth-text">{reqAmount} ETH</div>
      <div className="eth-collected">{collected} ETH collected</div>
    </div>
  );
};

export default ResponsiveProgressBar;