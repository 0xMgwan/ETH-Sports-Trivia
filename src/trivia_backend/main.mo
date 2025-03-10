import Debug "mo:base/Debug";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor {
  // Store user data
  private stable var userEntries : [(Principal, Text)] = [];
  private var users = HashMap.HashMap<Principal, Text>(0, Principal.equal, Principal.hash);

  // Verify SIWE signature and register user
  public shared(msg) func verifySiweAndRegister(
    address : Text,
    _message : Text,  // Renamed to avoid unused warning
    _signature : Text  // Renamed to avoid unused warning
  ) : async Bool {
    // In a real implementation, you would verify the SIWE signature here
    // For the hackathon, we'll simulate successful verification
    
    let caller = msg.caller;
    users.put(caller, address);
    
    Debug.print("User registered with ETH address: " # address);
    return true;
  };

  // Get user's ETH address
  public shared(msg) func getEthAddress() : async ?Text {
    let caller = msg.caller;
    return users.get(caller);
  };

  // For system upgrades
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := HashMap.fromIter<Principal, Text>(userEntries.vals(), 0, Principal.equal, Principal.hash);
    userEntries := [];
  };
}