# Trivia.eth

A decentralized trivia P2E game built on the Internet Computer Protocol (ICP) with Ethereum wallet integration.

## 🏆 Overview

ETH Sports Trivia is a web3 application that allows users to test their sports knowledge across different categories (basketball, football, soccer, and tennis) while earning points. The application features Ethereum wallet integration using Sign-in with Ethereum (SIWE), allowing users to connect their MetaMask or other Ethereum wallets to interact with the ICP backend.

## 🚀 Live Demo

The application is deployed on the Internet Computer mainnet and can be accessed at:
- Frontend: [https://3iwxl-diaaa-aaaad-qg62q-cai.ic0.app](https://3iwxl-diaaa-aaaad-qg62q-cai.ic0.app)
- Backend: [https://3pxr7-oqaaa-aaaad-qg62a-cai.ic0.app](https://3pxr7-oqaaa-aaaad-qg62a-cai.ic0.app)

## ✨ Features

- **Multiple Sports Categories**: Test your knowledge in basketball, football, soccer, and tennis
- **Ethereum Wallet Integration**: Connect with MetaMask or other Ethereum wallets
- **Leaderboard**: Compete with other players and see who has the highest score
- **User Profiles**: View your achievements and stats
- **Responsive Design**: Play on desktop or mobile devices

## 🛠️ Technology Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Motoko (Internet Computer)
- **Blockchain Integration**: 
  - Internet Computer Protocol (ICP) for backend logic
  - Ethereum for wallet authentication (SIWE)
- **Development Tools**: DFX, Node.js, npm

## 📋 Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Internet Computer SDK (dfx)
- MetaMask or another Ethereum wallet

## 🔧 Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eth-sports-trivia.git
cd eth-sports-trivia
```
2. 2. Install dependencies:
3. Start the local Internet Computer replica:
4. Deploy the canisters locally:
5. Open the application in your browser:
## 🌐 Deployment to ICP Mainnet
The application is already deployed to the ICP mainnet. If you want to deploy your own version:

1. Ensure you have ICP tokens and a cycles wallet set up:
```bash
$ bash
dfx identity get-wallet --network=ic
dfx wallet --network=ic balance
 ```

2. Top up your wallet with cycles:
```bash
$ bash
dfx ledger --network=ic top-up $(dfx identity get-wallet) --amount 1.0
 ```

3. Deploy to mainnet:
```bash
$ bash
dfx deploy --network=ic
 ```
## 🔐 Ethereum Wallet Integration
ETH Sports Trivia uses Sign-in with Ethereum (SIWE) to authenticate users:

1. Users connect their Ethereum wallet (e.g., MetaMask)
2. The app creates a SIWE message with the user's address and a nonce
3. Users sign the message with their wallet
4. The signature is verified on the ICP backend
5. Upon successful verification, users can interact with the app
This integration provides a seamless experience for Ethereum users to interact with the Internet Computer Protocol.

## 🧪 Testing
Run the test suite:

```bash
$ bash
npm test
 ```

## 🛡️ Security Considerations
- All wallet signatures are verified on the backend
- User data is stored securely on the Internet Computer
- No private keys or sensitive information is stored on the frontend
- Rate limiting is implemented to prevent abuse
  
## 🚧 Roadmap
- Add more sports categories
- Implement multiplayer mode
- Add NFT rewards for top players
- Create mobile app version
- Integrate with other wallet providers
## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
