'use client';

import { useEffect, useMemo, useState } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { LedgerWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  base58PublicKey,
  generateSigner,
  publicKey,
  some,
  transactionBuilder,
  unwrapSome
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { mplTokenMetadata, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import {
  mplCandyMachine,
  fetchCandyMachine,
  mintV2,
  safeFetchCandyGuard,
  DefaultGuardSetMintArgs,
  DefaultGuardSet,
  SolPayment,
  CandyMachine,
  CandyGuard
} from "@metaplex-foundation/mpl-candy-machine";

const Mint = () => {

  // set up umi
  let umi = createUmi("https://api.devnet.solana.com")
    .use(mplTokenMetadata())
    .use(mplCandyMachine());

  // state
  const [loading, setLoading] = useState(false);
  const [mintCreated, setMintCreated] = useState(null);
  const [mintMsg, setMintMsg] = useState();
  const [costInSol, setCostInSol] = useState(0);
  const [cmv3v2, setCandyMachine] = useState();
  const [defaultCandyGuardSet, setDefaultCandyGuardSet] = useState();
  const [countTotal, setCountTotal] = useState();
  const [countRemaining, setCountRemaining] = useState();
  const [countMinted, setCountMinted] = useState();
  const [mintDisabled, setMintDisabled] = useState(true);

  // retrieve item counts to determine availability and
  // from the solPayment, display cost on the Mint button
  const retrieveAvailability = async () => {
    const cmId = process.env.CANDY_MACHINE_ID;
    if (!cmId) {
      setMintMsg("No candy machine ID found. Add environment variable.");
      return;
    }
    const candyMachine = await fetchCandyMachine(umi, publicKey(cmId));
    setCandyMachine(candyMachine);

    // Get counts
    setCountTotal(candyMachine.itemsLoaded);
    setCountMinted(Number(candyMachine.itemsRedeemed));
    const remaining = candyMachine.itemsLoaded - Number(candyMachine.itemsRedeemed)
    setCountRemaining(remaining);

    // Get cost
    const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
    if (candyGuard) {
      setDefaultCandyGuardSet(candyGuard);
    }
    const defaultGuards = candyGuard?.guards;
    const solPaymentGuard = defaultGuards?.solPayment;

    if (solPaymentGuard) {
      const solPayment = unwrapSome(solPaymentGuard);
      if (solPayment) {
        const lamports = solPayment.lamports;
        const solCost = Number(lamports.basisPoints) / 1000000000;
        setCostInSol(solCost);
      }
    }

    if (remaining > 0) {
      setMintDisabled(false);
    }
  };

  useEffect(() => {
    retrieveAvailability();
  }, [mintCreated]);

  // Inner Mint component to handle showing the Mint button,
  // and mint messages
  const Mint = () => {
    const wallet = useWallet();
    umi = umi.use(walletAdapterIdentity(wallet));

    // check wallet balance
    const checkWalletBalance = async () => {
      const balance = await umi.rpc.getBalance(umi.identity.publicKey);
      if (Number(balance.basisPoints) / 1000000000 < costInSol) {
        setMintMsg("Add more SOL to your wallet.");
        setMintDisabled(true);
      } else {
        if (countRemaining !== undefined && countRemaining > 0) {
          setMintDisabled(false);
        }
      }
    };

    if (!wallet.connected) {
      return <p>Please connect your wallet.</p>;
    }

    checkWalletBalance();

    const mintBtnHandler = async () => {

      if (!cmv3v2 || !defaultCandyGuardSet) {
        setMintMsg("There was an error fetching the candy machine. Try refreshing your browser window.");
        return;
      }
      setLoading(true);
      setMintMsg(undefined);

      try {
        const candyMachine = cmv3v2;
        const candyGuard = defaultCandyGuardSet;

        const nftSigner = generateSigner(umi);

        const mintArgs = {};

        // solPayment has mintArgs
        const defaultGuards = candyGuard?.guards;
        const solPaymentGuard = defaultGuards?.solPayment;
        if (solPaymentGuard) {
          const solPayment = unwrapSome(solPaymentGuard);
          if (solPayment) {
            const treasury = solPayment.destination;

            mintArgs.solPayment = some({
              destination: treasury
            });
          }
        }

        const tx = transactionBuilder()
          .add(setComputeUnitLimit(umi, { units: 600_000 }))
          .add(mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            nftMint: nftSigner,
            candyGuard: candyGuard?.publicKey,
            mintArgs: mintArgs,
            tokenStandard: TokenStandard.ProgrammableNonFungible
          }))


        const { signature } = await tx.sendAndConfirm(umi, {
          confirm: { commitment: "finalized" }, send: {
            skipPreflight: true,
          },
        });

        setMintCreated(nftSigner.publicKey);
        setMintMsg("Mint was successful!");

      } catch (err) {
        console.error(err);
        setMintMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <button onClick={mintBtnHandler}>
        Click me wdadafegwegfwefwf
      </button>
    );
  };
}
 export default Mint;

