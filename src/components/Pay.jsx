import React, { useState } from 'react';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box, Tabs, Tab } from "@mui/material";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
} from "@metaplex-foundation/js";
import * as fs from "fs";

const Pay = ({ eventData }) => {
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [isBNPL, setIsBNPL] = useState('full');
  const ticketPrice = 0.01; // Assuming a single price for all tickets

  const handleQuantityChange = (change) => {
    setTicketQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  const totalPrice = (ticketQuantity * ticketPrice).toFixed(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { connected } = useWallet();
  const [value, setValue] = React.useState(0);

  

  const handleClick = () => {

    // Add your logic here
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded mx-auto my-12" style={{ maxWidth: '950px', width: '100%', minHeight: '650px' }}>
      <Tabs value={value} onChange={handleChange} aria-label="event-details-payment-tab" centered>
        <Tab label="Ticket" />
        <Tab label="Marketplace " />
        <Tab label="Collectibles" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Event Details & Payment */}
        <div>
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
            <WalletMultiButton />
            <Button variant="contained" color="secondary" onClick={handleClick} disabled={!connected}>Buy Now</Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Empty Tab 1 */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Empty Tab 2 */}
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-details-payment-tabpanel-${index}`}
      aria-labelledby={`event-details-payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default Pay;