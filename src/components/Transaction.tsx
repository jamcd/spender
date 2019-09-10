import React from 'react';

const Transaction = (props: any) => {
  return (
    <div className="transaction d-flex justify-content-between">
      <div className="transaction__name">
        <p className="transaction__title">{props.transaction.merchant.name}</p>
        {props.transaction.notes && <p className="transaction__notes">{props.transaction.notes}</p>}
      </div>
      <div className="transaction__cost">
        <span>£{(Math.abs(props.transaction.amount) / 100).toFixed(0)}.</span>
        <sub>
          {(Math.abs(props.transaction.amount) / 100) % 1 === 0
            ? '00'
            : (Number(Number((Math.abs(props.transaction.amount) / 100) % 1).toFixed(2)) * 100).toFixed(0)}
        </sub>
      </div>
    </div>
  );
};

export default Transaction;
