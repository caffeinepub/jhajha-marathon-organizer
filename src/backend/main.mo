import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";



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

  var nextParticipantId = 1;

  // Persistent participants storage
  let participants = Map.empty<Nat, Participant>();

  type Prize = {
    placement : Text;
    description : Text;
    category : Text;
    amount : Nat;
  };

  module Prize {
    public func compareByCategory(a : Prize, b : Prize) : Order.Order {
      Text.compare(a.category, b.category);
    };
  };

  func defaultPrizes() : Map.Map<Text, Prize> {
    let prizes = Map.empty<Text, Prize>();

    prizes.add("firstPlace", {
      placement = "firstPlace";
      description = "1st Place (Overall) ₹5000";
      category = "overall";
      amount = 5000;
    });

    prizes.add("secondPlace", {
      placement = "secondPlace";
      description = "2nd Place (Overall) ₹3000";
      category = "overall";
      amount = 3000;
    });

    prizes.add("thirdPlace", {
      placement = "thirdPlace";
      description = "3rd Place (Overall) ₹1000";
      category = "overall";
      amount = 1000;
    });

    let ageCategoryPrizes = [
      {
        placement = "under18Male";
        description = "Under 18 Male Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "under18Female";
        description = "Under 18 Female Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "18to35Male";
        description = "18-35 Male Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "18to35Female";
        description = "18-35 Female Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "36to50Male";
        description = "36-50 Male Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "36to50Female";
        description = "36-50 Female Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "over50Male";
        description = "Over 50 Male Winner";
        category = "ageGroup";
        amount = 1000;
      },
      {
        placement = "over50Female";
        description = "Over 50 Female Winner";
        category = "ageGroup";
        amount = 1000;
      },
    ];

    for (p in ageCategoryPrizes.values()) {
      prizes.add(p.placement, p);
    };

    prizes;
  };

  // Persistent prizes storage, now initialized with default prizes
  let prizes = defaultPrizes();

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

  public query ({ caller = _ }) func getAllParticipants() : async [Participant] {
    participants.values().toArray().sort(Participant.compareByName);
  };

  public query ({ caller = _ }) func getPrizesByCategory() : async [Prize] {
    prizes.values().toArray().sort(Prize.compareByCategory);
  };

  public query ({ caller = _ }) func getParticipantById(id : Nat) : async Participant {
    switch (participants.get(id)) {
      case (null) { Runtime.trap("Participant not found") };
      case (?participant) { participant };
    };
  };

  public query ({ caller = _ }) func getAllPrizes() : async [Prize] {
    prizes.values().toArray();
  };
};
