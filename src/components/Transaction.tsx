import React from 'react';

const Transaction = (props: any) => {
  return (
    <div className="transaction d-flex justify-content-between">
      <span className="align-self-start">{props.transaction.merchant.name}</span>
      <span className="transaction__cost align-self-end">
        <span>£{(Math.abs(props.transaction.amount) / 100).toFixed(0)}.</span>
        <sub>
          {(Math.abs(props.transaction.amount) / 100) % 1 === 0
            ? '00'
            : (Number(Number((Math.abs(props.transaction.amount) / 100) % 1).toFixed(2)) * 100).toFixed(0)}
        </sub>
      </span>
    </div>
  );
};

export default Transaction;
