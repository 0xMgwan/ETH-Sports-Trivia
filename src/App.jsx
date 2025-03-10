import { useState, useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { ethers } from 'ethers';
import './App.css'

function App() {
  const [score, setScore] = useState(10)
  const [category, setCategory] = useState('basketball')
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [currentPage, setCurrentPage] = useState('home');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Initialize ethers provider
  useEffect(() => {
    if (window.ethereum) {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);
    }
  }, []);

  // Update the connectWallet function with better error handling
  // Improved SIWE implementation for ICP
  // Update the connectWallet function to handle signing properly
  // Initialize ethers provider only when needed, not automatically
  useEffect(() => {
    // Don't automatically set the provider
    // This will prevent auto-connection
  }, []);
  
  // Update the connectWallet function to properly prompt for connection
  // Update the connectWallet function to use proper SIWE format
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Ethereum wallet extension');
      return;
    }
    
    setIsConnecting(true);
    
    try {
      // Create provider only when connecting
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // This will trigger the MetaMask popup
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        
        try {
          // Create a Web3Provider from window.ethereum
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          
          // Create a simple message for signing
          const message = `Sign this message to connect to ETH Sports Trivia\nAddress: ${address}\nNonce: ${Date.now()}`;
          
          // Log for debugging
          console.log("Message to sign:", message);
          
          // Request signature from wallet - this will trigger another MetaMask popup
          const signature = await signer.signMessage(message);
          console.log("Signature:", signature);
          
          // For the hackathon, we'll simulate the backend verification
          
          setWalletAddress(address);
          setIsConnected(true);
          console.log("Successfully connected with wallet signature");
        } catch (signingError) {
          console.error("Detailed signing error:", signingError);
          throw new Error(`Signing failed: ${signingError.message || 'Unknown error'}`);
        }
      } else {
        throw new Error('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  // Questions and answers for different categories
  const categoryQuestions = {
    basketball: {
      question: "Which team won the 2023 NBA Championship? 🏀",
      options: [
        { text: "Denver Nuggets", correct: true },
        { text: "Miami Heat", correct: false },
        { text: "Boston Celtics", correct: false },
        { text: "Los Angeles Lakers", correct: false }
      ]
    },
    football: {
      question: "Who won the Super Bowl in 2023? 🏈",
      options: [
        { text: "Kansas City Chiefs", correct: true },
        { text: "Philadelphia Eagles", correct: false },
        { text: "Cincinnati Bengals", correct: false },
        { text: "San Francisco 49ers", correct: false }
      ]
    },
    soccer: {
      question: "Which country won the 2022 FIFA World Cup? ⚽",
      options: [
        { text: "Argentina", correct: true },
        { text: "France", correct: false },
        { text: "Brazil", correct: false },
        { text: "Germany", correct: false }
      ]
    },
    tennis: {
      question: "Who won the Men's Wimbledon 2023? 🎾",
      options: [
        { text: "Carlos Alcaraz", correct: true },
        { text: "Novak Djokovic", correct: false },
        { text: "Roger Federer", correct: false },
        { text: "Rafael Nadal", correct: false }
      ]
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10);
      alert('Correct! +10 points 🎉');
    } else {
      alert('Incorrect! Try again 😢');
    }
  };

  // Navigation handling
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <div className="hero-section">
              <h1 className="hero-title">Test Your Sports Knowledge & Win ETH! 💰</h1>
              <p className="hero-subtitle">Answer correctly, climb the leaderboard, and earn cryptocurrency rewards! 🚀</p>
            </div>

            <div className="score-display">
              <h2>Your Score: {score} 🔥</h2>
            </div>
            
            <div className="categories">
              <button 
                className={category === 'basketball' ? 'active' : ''} 
                onClick={() => setCategory('basketball')}
              >
                Basketball 🏀
              </button>
              <button 
                className={category === 'football' ? 'active' : ''} 
                onClick={() => setCategory('football')}
              >
                Football 🏈
              </button>
              <button 
                className={category === 'soccer' ? 'active' : ''} 
                onClick={() => setCategory('soccer')}
              >
                Soccer ⚽
              </button>
              <button 
                className={category === 'tennis' ? 'active' : ''} 
                onClick={() => setCategory('tennis')}
              >
                Tennis 🎾
              </button>
            </div>

            <div className={`question-container ${showAnimation ? 'animate' : ''}`}>
              <h3>{categoryQuestions[category].question}</h3>
              
              <div className="options">
                {categoryQuestions[category].options.map((option, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleAnswer(option.correct)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      
      case 'profile':
        return (
          <div className="profile-container">
            <h2>My Profile 👤</h2>
            
            {isConnected ? (
              <div className="profile-content">
                <div className="profile-header">
                  <div className="profile-avatar">👤</div>
                  <div className="profile-info">
                    <h3>Wallet: {walletAddress}</h3>
                    <p>Member since: June 2023</p>
                  </div>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-card">
                    <h4>Total Score</h4>
                    <p className="stat-value">{score} 🔥</p>
                  </div>
                  <div className="stat-card">
                    <h4>Questions Answered</h4>
                    <p className="stat-value">12 ❓</p>
                  </div>
                  <div className="stat-card">
                    <h4>ETH Earned</h4>
                    <p className="stat-value">0.015 💎</p>
                  </div>
                </div>
                
                <div className="profile-achievements">
                  <h3>Achievements 🏆</h3>
                  <div className="achievements-grid">
                    <div className="achievement">🏀 Basketball Rookie</div>
                    <div className="achievement">⚽ Soccer Enthusiast</div>
                    <div className="achievement">🎯 First Perfect Score</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="connect-prompt">
                <p>Please connect your wallet to view your profile</p>
                <button className="connect-wallet" onClick={connectWallet}>
                  Connect Wallet 👛
                </button>
              </div>
            )}
          </div>
        );
      
      case 'leaderboard':
        return (
          <div className="leaderboard-page">
            <h2>🏆 Global Leaderboard 🏆</h2>
            
            <div className="leaderboard-filters">
              <button className="filter-btn active">All Time</button>
              <button className="filter-btn">This Month</button>
              <button className="filter-btn">This Week</button>
            </div>
            
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Points</th>
                  <th>Earnings (ETH)</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                <tr className="top-player">
                  <td>1</td>
                  <td>Alex</td>
                  <td>120 🔥</td>
                  <td>0.05 ETH 💎</td>
                  <td>Basketball 🏀</td>
                </tr>
                <tr className="top-player">
                  <td>2</td>
                  <td>Jordan</td>
                  <td>95 🔥</td>
                  <td>0.04 ETH 💎</td>
                  <td>Football 🏈</td>
                </tr>
                <tr className="top-player">
                  <td>3</td>
                  <td>Taylor</td>
                  <td>85 🔥</td>
                  <td>0.035 ETH 💎</td>
                  <td>Soccer ⚽</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Morgan</td>
                  <td>70 🔥</td>
                  <td>0.03 ETH 💎</td>
                  <td>Tennis 🎾</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Casey</td>
                  <td>65 🔥</td>
                  <td>0.025 ETH 💎</td>
                  <td>Basketball 🏀</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Riley</td>
                  <td>60 🔥</td>
                  <td>0.02 ETH 💎</td>
                  <td>Soccer ⚽</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Jamie</td>
                  <td>55 🔥</td>
                  <td>0.015 ETH 💎</td>
                  <td>Football 🏈</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Update the return statement to use the navigation
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentPage('home')}>🏆 ETH Sports Trivia</div>
        <div className="nav-links">
          <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>
            Categories 📋
          </button>
          <button className={`nav-link ${currentPage === 'leaderboard' ? 'active' : ''}`} onClick={() => setCurrentPage('leaderboard')}>
            Leaderboard 🏅
          </button>
          <button className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => setCurrentPage('profile')}>
            My Profile 👤
          </button>
        </div>
        <button className="connect-wallet" onClick={connectWallet}>
          {isConnected ? `${walletAddress} ✅` : 'Connect Wallet 👛'}
        </button>
      </nav>

      <main>
        {renderPage()}
      </main>

      <footer>
        <div className="social-links">
          <a href="#" className="social-link">𝕏 Twitter</a>
          <a href="#" className="social-link">💬 Discord</a>
          <a href="#" className="social-link">💻 GitHub</a>
        </div>
        <p>© 2023 ETH Sports Trivia. All rights reserved. Powered by ICP 🚀</p>
      </footer>
    </div>
  );
}

export default App
