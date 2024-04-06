import React from 'react'
import {Fmarket, Banner, NFT, Title } from '../components';

const Marketplace = () => {
    const collectionArray = [
        { name: 'coldplay', image: '../card_image/coldplay.png', title: 'Coldplay Concert', description: '0.5 SOL' },
        { name: 'ariana', image: '../card_image/ari_con.jpg', title: 'Ariana Concert', description: '0.2 SOL' },
        { name: 'taylor', image: '../card_image/tay_con.jpg', title: 'Taylor Concert', description: '0.6 SOL' },
        { name: 'twice', image: '../card_image/twice.png', title: 'Twice Concert', description: '0.45 SOL' },
    ];

    const featuresArray = [
        { name: 'twice1', image: '../card_image/Twice 1.jpg', title: 'Na yeon', description: '0.5 SOL' },
        { name: 'twice2', image: '../card_image/Twice 2.jpg', title: 'Jeong Yeon', description: '0.2 SOL' },
        { name: 'twice3', image: '../card_image/Twice 3.jpg', title: 'MOMO', description: '0.6 SOL' },
        { name: 'twice4', image: '../card_image/Twice 4.jpg', title: 'Ji Hyo', description: '0.45 SOL' },
    ];
  return (
    <div className="bg-gray-100">
      <Banner/>
      <Title heading="NFT Marketplace" />
      <Fmarket/>
      <NFT NFTData={collectionArray}/>
      <Title heading="Featured NFTs" />
      <NFT NFTData={featuresArray}/>
      
    </div>
  )
}

export default Marketplace