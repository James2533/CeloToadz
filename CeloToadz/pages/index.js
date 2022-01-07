import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import Navbar from "../components/Navbar";
//import { ethers } from "ethers";

export default function Home() {
  const calculateTimeLeft = () => {
    // let year = new Date().getFullYear();
    const event = new Date(Date.UTC(2021, 10, 5, 15, 30, 0));
    let now = new Date();
    const difference =
      +new Date(
        event.toLocaleString("en-US", {
          timeZone: "UTC",
        })
      ) -
      +new Date(
        now.toLocaleString("en-US", {
          timeZone: "UTC",
        })
      );

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [success, setSuccess] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    try {
      let cost = CONFIG.WEI_COST;
      let gasLimit = CONFIG.GAS_LIMIT;
      let totalCostWei = String(cost * mintAmount);
      let totalGasLimit = String(gasLimit * mintAmount);
      console.log("Cost: ", totalCostWei);
      console.log("Gas limit: ", totalGasLimit);
      setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
      setClaimingNft(true);
      blockchain.smartContract.methods
        .mint(mintAmount)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .once("error", (err) => {
          console.log(err);
          setFeedback("Sorry, something went wrong please try again later.");
          setClaimingNft(false);
        })
        .then((receipt) => {
          console.log(receipt);
          setFeedback(
            `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Celo Explorer to view it.`
          );
          setClaimingNft(false);
          setSuccess(true);
          dispatch(fetchData(blockchain.account));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 15) {
      newMintAmount = 15;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
    console.log(blockchain);
  }, [blockchain.account]);

  // const chainChangedHandler = () => {
  //   // reload the page to avoid any errors with chain change mid use of application
  //   window.location.reload();
  // };

  // useEffect(() => {
  //   window.ethereum.on("chainChanged", chainChangedHandler);
  // }, []);

  return (
    <div>
      <Head>
        <title>CeloToadz</title>
        <meta name="CeloToadz" content="6969 Unique NFTs on Celo" />
      </Head>
      <div className="w-full banner_image">
        <Navbar />
        <div className="w-full mt-5 layout">
          <div className="grid w-full gap-10 md:grid-cols-2">
            <div className="flex items-center justify-center border-black md:justify-start">
              <img
                className="lg:w-[500px] lg:h-[500px] w-[300px] h-[300px]"
                src="/images/Website GIF 500ms.gif"
                alt="gif"
              />
            </div>
            <div className="py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 border-4 border-primary-300">
                  <h2 className="text-center">
                    {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                    {timeLeft &&
                      Object.keys(timeLeft).length === 0 &&
                      Object.getPrototypeOf(timeLeft) === Object.prototype &&
                      "00"}
                  </h2>
                  <h5 className="text-center">Day</h5>
                </div>
                <div className="p-4 border-4 border-primary-300">
                  <h2 className="text-center">
                    {timeLeft.hours < 10
                      ? `0${timeLeft.hours}`
                      : timeLeft.hours}
                      {timeLeft &&
                      Object.keys(timeLeft).length === 0 &&
                      Object.getPrototypeOf(timeLeft) === Object.prototype &&
                      "00"}
                  </h2>
                  <h5 className="text-center">Hour</h5>
                </div>
                <div className="p-4 border-4 border-primary-300">
                  <h2 className="text-center">
                    {timeLeft.minutes < 10
                      ? `0${timeLeft.minutes}`
                      : timeLeft.minutes}
                      {timeLeft &&
                      Object.keys(timeLeft).length === 0 &&
                      Object.getPrototypeOf(timeLeft) === Object.prototype &&
                      "00"}
                  </h2>
                  <h5 className="text-center">Min</h5>
                </div>
                <div className="p-4 border-4 border-primary-300">
                  <h2 className="text-center">
                    {timeLeft.seconds < 10
                      ? `0${timeLeft.seconds}`
                      : timeLeft.seconds}
                      {timeLeft &&
                      Object.keys(timeLeft).length === 0 &&
                      Object.getPrototypeOf(timeLeft) === Object.prototype &&
                      "00"}
                  </h2>
                  <h5 className="text-center">Sec</h5>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="mb-5 font-bold text-center">
                  {data.totalSupply} / {CONFIG.MAX_SUPPLY} minted
                </h3>
                <div className="relative w-full h-3 border rounded-lg shadow-sm">
                  <div
                    className="absolute top-0 left-0 h-full rounded-lg bg-primary-100"
                    style={{
                      width: `${(data.totalSupply / CONFIG.MAX_SUPPLY) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="p-4 mt-5 border-primary-100">
                  <h4 className="font-bold tracking-wide text-center">
                    2.69 CELO per CeloToadz NFT
                  </h4>
                </div>
              </div>
              <div className="mt-5">
                {blockchain.account === "" ||
                blockchain.account === undefined ||
                blockchain.smartContract === null ? (
                  timeLeft &&
                    Object.keys(timeLeft).length === 0 &&
                    Object.getPrototypeOf(timeLeft) === Object.prototype &&
                    "00" ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                      className="w-full py-5 text-xl font-bold tracking-wide text-white transition-all duration-300 shadow-2xl bg-primary-100 px-7 hover:bg-black hover:border-black hover:rounded-2xl"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        // e.preventDefault();
                        // dispatch(connect());
                        // getData();
                      }}
                      className="w-full py-5 text-xl font-bold tracking-wide text-white transition-all duration-300 shadow-2xl cursor-default bg-primary-100 px-7"
                    >
                      Coming soon!
                    </button>
                  )
                ) : (
                  <div className="grid grid-cols-2 gap-5">
                    <div className="grid w-full grid-cols-3 border-4 border-primary-200">
                      <div
                        onClick={decrementMintAmount}
                        className="flex items-center justify-center text-2xl font-bold cursor-pointer select-none hover:text-primary-100 hover:bg-primary-200 md:text-3xl"
                      >
                        -
                      </div>
                      <div className="flex items-center justify-center text-primary-100">
                        <h2>{mintAmount}</h2>
                      </div>
                      <div
                        onClick={incrementMintAmount}
                        className="flex items-center justify-center text-2xl font-bold cursor-pointer select-none hover:text-primary-100 hover:bg-primary-200 md:text-3xl"
                      >
                        +
                      </div>
                    </div>
                    <button
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                      className="w-full py-5 text-xl font-bold tracking-wide text-white transition-all duration-300 bg-primary-100 px-7 hover:bg-black hover:border-black"
                    >
                      {claimingNft ? "Minting..." : "Mint"}
                    </button>
                  </div>
                )}
              </div>
              {success && (
                <div className="mt-8">
                  <h4 className="font-bold tracking-wide text-center">
                    Congratulations! You have successfully minted your CeloToadz. Check your transaction history to view it!
                  </h4>
                </div>
              )}
              {blockchain.errorMsg !== "" && (
                <div className="p-3 mt-4 text-center border border-l-8 border-l-primary-100">
                  {blockchain.errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-white bg-primary-300">
        <div className="w-full layout">
          <div className="grid w-full my-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-10 text-2xl font-bold md:text-4xl">
                All about <span className="text-primary-100">CeloToadz</span>
              </h2>
              <h5 className="mb-5 text-lg font-semibold leading-7 text-justify">
                Inspired by CrypToadz,{" "}
                <strong className="font-extrabold">CeloToadz</strong> is the
                first collection of 6969 randomly generated Toadz made
                up of more than 110 different traits on Celo Blockchain. All
                Toadz have distinctive and unique characteristics and no two
                have the same DNA!
              </h5>
              <h5 className="mb-5 text-lg font-semibold leading-7 text-justify">
                Our Toadz’s goal aligns with Celo's tenet of <span className="italic">"Designing for All" </span>
                and subsequent slogan <span className="italic">"Prosperity For All"</span>, besides ensuring our
                NFTs are affordable, we are preparing to contribute back to the
                community for believing in Celo!
              </h5>
              <h5 className="text-lg font-semibold leading-7 text-justify mb-7 lg:mb-0">
                We hope to be one of the lights that push the Celo Blockchain
                further, backed up by our community voting to decide on
                CeloToadz's future. This includes fund allocations, future
                developments, future Toadz species and more than you could hope
                for!
              </h5>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:ml-16">
              <div className="flex justify-end">
                <img
                  src="/images/11.png"
                  alt="1"
                  className="object-cover w-full lg:h-[240px] lg:w-[240px] rounded-2xl"
                />
              </div>
              <div>
                <img
                  src="/images/423.png"
                  alt="2"
                  className="object-cover w-full lg:h-[240px] lg:w-[240px] rounded-2xl"
                />
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/902.png"
                  alt="3"
                  className="object-cover w-full lg:h-[240px] lg:w-[240px] rounded-2xl"
                />
              </div>

              <div>
                <img
                  src="/images/978.png"
                  alt="4"
                  className="object-cover w-full lg:h-[240px] lg:w-[240px] rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full layout">
        <div className="w-full pt-16 mb-16" id="toadmap">
          <h6 className="mb-16 text-2xl font-bold text-center md:text-4xl">
            Toadmap
          </h6>
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="border shadow-lg p-7">
              <h2 className="mb-5 font-bold text-center text-primary-100">
                0%
              </h2>
              <p className="font-semibold text-justify">
                Our minting phase begins! For every 690 CeloToadz minted, we will randomly choose 3 CeloToadz hodlers from the range and gift each of them a CeloToadz!
              </p>
            </div>
            <div className="border shadow-lg p-7">
              <h2 className="mb-5 font-bold text-center text-primary-100">
                25%
              </h2>
              <p className="font-semibold leading-7 text-justify">
                To contribute back to our early supporters, a $300 cUSD prize
                pool will be shared among 2 lucky holders for having faith in
                this project!
              </p>
            </div>
            <div className="border shadow-lg p-7">
              <h2 className="mb-5 font-bold text-center text-primary-100">
                50%
              </h2>
              <p className="font-semibold leading-7 text-justify">
                Once we’ve hit our 50% milestone, we have to thank our community
                for such a wonderful time! A snapshot of all CeloToadz owners at that
                time will be taken and 69 lucky owners will be chosen for an
                airdrop of a unique CeloToadz (STOADZ), specially designed by
                our artist at the end of minting phase.
              </p>
            </div>
            <div className="border shadow-lg p-7">
              <h2 className="mb-5 font-bold text-center text-primary-100">
                69%
              </h2>
              <p className="font-semibold leading-7 text-justify">
                Adhering to our community culture of fun and light-heartedness,
                another $500 cUSD pool will be shared among 5 lucky holders!
              </p>
            </div>
            <div className="border shadow-lg sm:col-span-2 p-7">
              <h2 className="mb-5 font-bold text-center text-primary-100">
                100%
              </h2>
              <p className="font-semibold leading-7 text-justify">
                Once we are fully minted, it's our time to give back to our
                loving community! 10% of the total sales revenues will be donated
                to one or multiple charity organizations of the community's
                choice. All CeloToadz holders will collectively decide on which
                charity to donate!
              </p>
              <p className="mt-4 font-semibold leading-7 text-justify">
                Our journey for innovation knows no bounds, even after our
                minting phase! More development to be unfolded from the swamp
                for all of our fellow CeloToadz holders to utilise their croaks
                to their fullest potential. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-primary-300">
        <div className="w-full layout">
          <div className="w-full pt-10 mb-16" id="faq">
            <h6 className="mb-16 text-2xl font-bold text-center text-white md:text-4xl">
              FAQ
            </h6>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-12">
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    How much is the mint?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    The minting fee is 2.69 CELO per CeloToadz for everyone.
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    When is the mint?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    The minting will take place on 5 November 2021, 3.30pm
                    (UTC).
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    Will there be a pre-sale or whitelist?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    Due to the low gas fee on the Celo Blockchain & to align our
                    mission with Celo's "Prosperity for All", we will launch our
                    project with public minting only to give everyone an equal
                    chance to participate and mint! There will be no
                    whitelisting or presale for our project.
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    How many CeloToadz can I mint?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    You can mint up to 15 CeloToadz per transaction.
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    Which wallet should I use to mint?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    Currently we support Metamask wallet only. Have a look in
                    the #tutorial channel of our discord group to learn how to
                    set up your Metamask wallet!
                  </p>
                </div>
              </div>
              <div className="space-y-12 md:pt-16">
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    Will there be gas war during the mint?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    We understand the pain of gas fees so not to worry too much,
                    Celo’s gas fee is relatively low compared to other
                    blockchain!
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    Why did we not choose to have our project on OpenSea?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    We are supporters of the Celo and would love to participate in the development of its ecosystem!
                    Furthermore, Celo has a very low gas fee, unlike Ethereum.
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    Is there any marketplace to sell my CeloToadz?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    The CeloToadz will be listed on the AriSwap post mint.
                  </p>
                </div>
                <div className="p-6 transition-all duration-500 border-4 border-primary-400 hover:rounded-2xl">
                  <h3 className="mb-5 font-bold text-primary-400">
                    How can I check my CeloToadz’s rarity?
                  </h3>
                  <p className="font-semibold text-justify text-white">
                    Rarity details and ranking will be released post mint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full layout">
        <div className="w-full pt-16 mb-16" id="team">
          <h6 className="mb-16 text-2xl font-bold text-center md:text-4xl">
            Team
          </h6>
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/1.png"
                alt="james"
              />
              <h3 className="mt-5 font-bold text-center">Founder</h3>
              <h4 className="mt-3 text-center">James</h4>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/Publicity.png"
                alt="nej"
              />
              <h3 className="mt-5 font-bold text-center">Community Manager</h3>
              <h4 className="mt-3 text-center">Jake</h4>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/Artist.png"
                alt="chadaddy"
              />
              <h3 className="mt-5 font-bold text-center">Artist</h3>
              <h4 className="mt-3 text-center">Chadaddy</h4>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/196.png"
                alt="ziq"
              />
              <h3 className="mt-5 font-bold text-center">Web Developer</h3>
              <h4 className="mt-3 text-center">Ziq</h4>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/447.png"
                alt="copy"
              />
              <h3 className="mt-5 font-bold text-center">
                Community Moderator
              </h3>
              <h4 className="mt-3 text-center">Copy</h4>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="sm:w-[288px] sm:h-[288px] border-2 rounded-2xl select-none"
                src="/images/262.png"
                alt="andrei"
              />
              <h3 className="mt-5 font-bold text-center">Marketing Intern</h3>
              <h4 className="mt-3 text-center">Andrei</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary-300">
        <div className="w-full layout">
          <div className="flex items-center justify-between w-full text-white">
            <div>
              <h4 className="font-bold">CeloToadz</h4>
            </div>
            <div className="flex">
              <a
                href="https://discord.gg/TZWQPGkVkS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 font-bold transition-all duration-300 rounded-lg hover:text-primary-100">
                  Discord
                </div>
              </a>
              <a
                href="https://twitter.com/c_ToadzOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 font-bold transition-all duration-300 rounded-lg hover:text-primary-100">
                  Twitter
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
