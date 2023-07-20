import Web3 from "web3";

const connectBtn = document.getElementById("connectBtn");
const signBtn = document.getElementById("signBtn");
const confirmationDiv = document.getElementById("confirmation");

// Check if MetaMask is installed
if (typeof window.ethereum === "undefined") {
  connectBtn.innerText = "Install MetaMask";
  connectBtn.disabled = true;
}

// Connect to the wallet
let web3;
async function connectWallet() {
  try {
    // Prompt user to connect to MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // Get the provider object
    web3 = new Web3(window.ethereum);
    // Update button text
    connectBtn.innerText = "Logout";
    // Enable sign button
    signBtn.disabled = false;
  } catch (error) {
    console.error(error);
  }
}
connectBtn.addEventListener("click", connectWallet);

// Sign a message
async function signMessage() {
  try {
    // Get the current account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // Create a message to sign
    const message = "Hello, world!";
    // Sign the message
    const signature = await web3.eth.personal.sign(message, account);
    // Display the signature in the confirmation div
    confirmationDiv.innerText = `Signed message: ${signature}`;
  } catch (error) {
    console.error(error);
  }
}
signBtn.addEventListener("click", signMessage);
