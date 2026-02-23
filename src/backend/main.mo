import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Migration "migration";

(with migration = Migration.run)
actor {
  type AgeCategory = {
    #under18;
    #between18And35;
    #between36And50;
    #over50;
  };

  type Participant = {
    id : Nat;
    name : Text;
    address : Text;
    email : Text;
    phone : Text;
    ageCategory : AgeCategory;
    registrationTimestamp : Time.Time;
  };

  module Participant {
    public func compareByName(a : Participant, b : Participant) : Order.Order {
      Text.compare(a.name, b.name);
    };

    public func compareById(a : Participant, b : Participant) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  var nextParticipantId = 1; // Start from 1

  let participants = Map.empty<Nat, Participant>();

  type Prize = {
    placement : Text;
    description : Text;
    category : Text; // Overall, age group, etc.
  };

  module Prize {
    public func compareByCategory(a : Prize, b : Prize) : Order.Order {
      Text.compare(a.category, b.category);
    };
  };

  let prizes = Map.empty<Text, Prize>();

  public shared ({ caller }) func registerParticipant(
    name : Text,
    address : Text,
    email : Text,
    phone : Text,
    ageCategory : AgeCategory,
  ) : async Nat {
    let participantId = nextParticipantId;
    nextParticipantId += 1;

    let participant : Participant = {
      id = participantId;
      name;
      address;
      email;
      phone;
      ageCategory;
      registrationTimestamp = Time.now();
    };

    participants.add(participantId, participant);
    participantId;
  };

  public shared ({ caller }) func addPrize(
    placement : Text,
    description : Text,
    category : Text,
  ) : async () {
    let prize : Prize = {
      placement;
      description;
      category;
    };

    prizes.add(placement, prize);
  };

  public query ({ caller }) func getAllParticipants() : async [Participant] {
    participants.values().toArray().sort(Participant.compareByName);
  };

  public query ({ caller }) func getPrizesByCategory() : async [Prize] {
    prizes.values().toArray().sort(Prize.compareByCategory);
  };

  public query ({ caller }) func getParticipantById(id : Nat) : async Participant {
    switch (participants.get(id)) {
      case (null) { Runtime.trap("Participant not found") };
      case (?participant) { participant };
    };
  };
};
