// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TriviaGame is Ownable, ReentrancyGuard {
    uint256 public answerFee = 0.001 ether;
    uint256 public rewardAmount = 0.002 ether;
    
    struct Player {
        uint256 score;
        uint256 correctAnswers;
        uint256 totalAnswers;
        uint256 earnings;
    }
    
    mapping(address => Player) public players;
    
    event AnswerSubmitted(address player, bool correct);
    event RewardPaid(address player, uint256 amount);
    
    function submitAnswer(bool isCorrect) external payable nonReentrant {
        require(msg.value == answerFee, "Incorrect payment amount");
        
        Player storage player = players[msg.sender];
        player.totalAnswers++;
        
        if (isCorrect) {
            player.correctAnswers++;
            player.score += 10;
            player.earnings += rewardAmount;
            payable(msg.sender).transfer(rewardAmount);
            emit RewardPaid(msg.sender, rewardAmount);
        }
        
        emit AnswerSubmitted(msg.sender, isCorrect);
    }
    
    function setAnswerFee(uint256 _fee) external onlyOwner {
        answerFee = _fee;
    }
    
    function setRewardAmount(uint256 _amount) external onlyOwner {
        rewardAmount = _amount;
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function getPlayerStats(address _player) external view returns (Player memory) {
        return players[_player];
    }
}
