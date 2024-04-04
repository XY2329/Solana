//all web3 logic stored here
import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useConnect, useContractWrite, metamaskWallet } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();
const metamaskConfig = metamaskWallet();

//enables u to wrap entire app with the context provider but still render all the children inside of it
export const StateContextProvider = ({ children }) => {
    //connect with ur smart contract
    const { contract } = useContract('0x3ae62BFB392B7bee8040af1f61E2Fb46599Eba29');

    //2 methods to call the write function
    const { mutateAsync: createCampaign } = 
    useContractWrite(contract, 'createCampaign');   //()里面写的是: pass the contract, then specify the name of the write func, which is createCamp

    //things needed to interact with smart contract
    const address = useAddress();
    const connect = useConnect();

    //funcs
    const publishCampaign = async (form) => {   //(form): an async func that accepts a form
        try {
          const data = await createCampaign({   //send the form filled from create campaign
                    args: [     //the order of what in this array refer back to contract file, createCamp func
                        address, // owner of camps
                        form.title, // title of camps
                        form.description, // description
                        form.target,
                        new Date(form.deadline).getTime(), // deadline,
                        form.image,
                    ],
                });
    
          console.log("contract call success", data)
        } catch (error) {
          console.log("contract call failure", error)
        }
      }

      const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');  //pass the name of func inside the smart contract u wan to call
    
        //console.log(campaigns)

        //to only fetch info we nid and format them into human readable format
        const parsedCampaings = campaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          image: campaign.image,
          pId: i  //project ID
        }));

        //console.log(parsedCampaings)
    
        return parsedCampaings;
      }

      const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
    
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    
        return filteredCampaigns;
      }

      const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});
        return data;
      }

      const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;
    
        const parsedDonations = [];
    
        for(let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
          })
        }
    
        return parsedDonations;
      }

      //how to pass the context in publishCampaign func in the createCamp page
      //the export StateConProvider need to return smthg, which is the code below
      return (
        <StateContext.Provider
        //value: everything u wan to share across all components
          value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,  //share the create func, but nid refer to pubCamp func, so just rename pubCamp to createCamp
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations
          }}
        >
          {children}
        </StateContext.Provider>
      )
    }
    
    //the way to letciu use the context
    export const useStateContext = () => useContext(StateContext);

