import React, { useState } from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography } from "@mui/material";

const Pay = ({ eventData }) => {
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [isBNPL, setIsBNPL] = useState('full');
  const ticketPrice = 0.01; // Assuming a single price for all tickets

  const handleQuantityChange = (change) => {
    setTicketQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  const totalPrice = (ticketQuantity * ticketPrice).toFixed(2);

  return (
    <div className="bg-white p-6 shadow-lg rounded mx-auto my-12" style={{ maxWidth: '950px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={eventData.img} alt={eventData.title} style={{ height: '270px', marginRight: '20px' }} />
        <div>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>{eventData.title}</Typography>
          <Typography variant="body1">Date</Typography>
          <Typography variant="body1">Venue</Typography>
        </div>
      </div>
      <p className="text-center my-2">{ticketPrice.toFixed(2)} ETH per Ticket</p>
      <div className="flex items-center justify-center mt-4">
        <Button variant="outlined" onClick={() => handleQuantityChange(-1)}>-</Button>
        <TextField value={ticketQuantity} type="text" inputProps={{ readOnly: true }} style={{ margin: '0 10px', maxWidth: '50px', textAlign: 'center' }} />
        <Button variant="outlined" onClick={() => handleQuantityChange(1)}>+</Button>
      </div>
      
      <p className="text-center my-2">Total: {totalPrice} ETH</p>
      <FormControl component="fieldset" className="mt-4">
        <RadioGroup
          row
          aria-label="payment option"
          name="payment-option"
          value={isBNPL}
          onChange={(e) => setIsBNPL(e.target.value)}
        >
          <FormControlLabel value="full" control={<Radio />} label="Full Payment" />
          <FormControlLabel value="bnpl" control={<Radio />} label="Buy Now, Pay Later" />
        </RadioGroup>
      </FormControl>
      <div className="flex justify-between mt-4">
        <Button variant="contained" color="primary" >Connect Wallet</Button>
        <Button variant="contained" color="secondary" >Buy Now</Button>
      </div>
    </div>
  );
};

export default Pay;
