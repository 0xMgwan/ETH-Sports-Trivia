import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";

actor TriviaGame {
    private let players = HashMap.HashMap<Principal, PlayerData>(0, Principal.equal, Principal.hash);

    type PlayerData = {
        score: Nat;
        correctAnswers: Nat;
        totalAnswers: Nat;
    };

    public shared(msg) func submitAnswer(isCorrect: Bool) : async Bool {
        let caller = msg.caller;
        
        switch (players.get(caller)) {
            case (null) {
                players.put(caller, {
                    score = if (isCorrect) 10 else 0;
                    correctAnswers = if (isCorrect) 1 else 0;
                    totalAnswers = 1;
                });
            };
            case (?playerData) {
                players.put(caller, {
                    score = playerData.score + (if (isCorrect) 10 else 0);
                    correctAnswers = playerData.correctAnswers + (if (isCorrect) 1 else 0);
                    totalAnswers = playerData.totalAnswers + 1;
                });
            };
        };
        
        return isCorrect;
    };

    public query func getPlayerStats(player: Principal) : async ?PlayerData {
        players.get(player)
    };
}