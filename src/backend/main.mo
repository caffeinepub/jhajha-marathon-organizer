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

    prizes.add("under18FirstPlace", {
      placement = "firstPlace";
      description = "1st Place (Under 18) ₹1500";
      category = "under18";
      amount = 1500;
    });

    prizes.add("under18SecondPlace", {
      placement = "secondPlace";
      description = "2nd Place (Under 18) ₹1000";
      category = "under18";
      amount = 1000;
    });

    prizes.add("under18ThirdPlace", {
      placement = "thirdPlace";
      description = "3rd Place (Under 18) ₹500";
      category = "under18";
      amount = 500;
    });

    prizes.add("between18And35FirstPlace", {
      placement = "firstPlace";
      description = "1st Place (18-35) ₹1500";
      category = "between18And35";
      amount = 1500;
    });

    prizes.add("between18And35SecondPlace", {
      placement = "secondPlace";
      description = "2nd Place (18-35) ₹1000";
      category = "between18And35";
      amount = 1000;
    });

    prizes.add("between18And35ThirdPlace", {
      placement = "thirdPlace";
      description = "3rd Place (18-35) ₹500";
      category = "between18And35";
      amount = 500;
    });

    prizes.add("between36And50FirstPlace", {
      placement = "firstPlace";
      description = "1st Place (36-50) ₹1500";
      category = "between36And50";
      amount = 1500;
    });

    prizes.add("between36And50SecondPlace", {
      placement = "secondPlace";
      description = "2nd Place (36-50) ₹1000";
      category = "between36And50";
      amount = 1000;
    });

    prizes.add("between36And50ThirdPlace", {
      placement = "thirdPlace";
      description = "3rd Place (36-50) ₹500";
      category = "between36And50";
      amount = 500;
    });

    prizes.add("over50FirstPlace", {
      placement = "firstPlace";
      description = "1st Place (Over 50) ₹1500";
      category = "over50";
      amount = 1500;
    });

    prizes.add("over50SecondPlace", {
      placement = "secondPlace";
      description = "2nd Place (Over 50) ₹1000";
      category = "over50";
      amount = 1000;
    });

    prizes.add("over50ThirdPlace", {
      placement = "thirdPlace";
      description = "3rd Place (Over 50) ₹500";
      category = "over50";
      amount = 500;
    });

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
