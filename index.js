// for Node.js use require()
// for frontend javascript use import

import { ethers } from "./ethers-5.1.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        console.log("Connected!")
        connectButton.innerHTML = "Connected!"
    } else {
        connectButton.innerHTML = "Please install Metamask!"
    }
}

// fund function

async function fund() {
    const ethAmount = "0.1"
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
        // provider/connection to blockchain
        // signer/wallet/someone with gas
        // contract we are interacting with
        // ^ABI and address
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        const transactionResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount),
        })
    }
}
