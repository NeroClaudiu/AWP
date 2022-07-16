import Web3 from "web3";
import TraderJSON from "./abis/Trader.json";
import {AbiItem} from "web3-utils";
import {SunflowerLandTrader} from "./types";
import {Purchased} from "./types/SunflowerLandTrader";
import {useEffect, useState} from "react";
import {EventData} from "web3-eth-contract";

const trader_contract = "0x1056A4ea959e3d84D6DC56Ac06B8Ff5B84648400"

export default function Trades() {
    const [events, setEvents] = useState([] as EventData[]);

    useEffect( () => {

        async function getPastTrades() {
            const web3 = new Web3("alchemy api url here");
            const contract = new web3.eth.Contract(
                TraderJSON as AbiItem[],
                trader_contract as string
            ) as unknown as SunflowerLandTrader;
            const fromBlock = "30690000" //await web3.eth.getBlockNumber();
            const farmId = "71710"
            // @ts-ignore
            const new_events = await contract.getPastEvents(
                "Purchased",
                {
                    fromBlock,
                    toBlock: "latest",
                }
            );
            setEvents(new_events);
        }

        getPastTrades()
            .catch(console.error)
    }, []);

    console.log(events);
    return (
        <>
            <div>
                {"Trades"}
            </div>
            <div>
                {`The Trading Contract's address: ${trader_contract}`}
            </div>
            <div>
                {events.map(event => {
                    return (
                        <div>
                            {`${event.returnValues.buyerFarmId} ${event.returnValues.sellerFarmId} ${event.returnValues.resourceId} ${event.returnValues.resourceId} ${event.returnValues.resourceAmount}`}
                        </div>
                    )
                })}
            </div>
        </>
    )
}