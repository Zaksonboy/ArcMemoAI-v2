
const ARC_CHAIN_ID = "0x4cef52";
const ARC_RPC = "https://rpc.testnet.arc.network";
const ARC_NAME = "Arc Testnet";

const connectBtn = document.getElementById("connectBtn");
const walletBox = document.getElementById("walletBox");
const status = document.getElementById("status");

let provider = null;
let signer = null;

function showStatus(message) {
  status.textContent = message;
}

async function switchToArc() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_ID }]
    });
  } catch (err) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: ARC_CHAIN_ID,
          chainName: ARC_NAME,
          rpcUrls: [ARC_RPC]
        }]
      });
    } else {
      throw err;
    }
  }
}

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    showStatus("Please install MetaMask.");
    return;
  }

  try {
    await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    await switchToArc();

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const address = await signer.getAddress();

    walletBox.textContent =
      address.slice(0, 6) + "..." + address.slice(-4);

    connectBtn.textContent = "Wallet Connected";

    showStatus("Connected to Arc Testnet!");

  } catch (error) {
    console.error(error);
    showStatus("Connection failed.");
  }
});
const generateBtn = document.getElementById("generateBtn");
const memoBox = document.getElementById("memoBox");

generateBtn.addEventListener("click", async () => {

  const recipient = document.getElementById("recipient").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const purpose = document.getElementById("purpose").value.trim();

  if (!recipient || !amount || !purpose) {
    showStatus("Please fill in all fields.");
    return;
  }

  showStatus("Generating AI memo...");

  // We will connect the AI API in the next step.
});
