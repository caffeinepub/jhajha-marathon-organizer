import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  // Old AgeCategory type remains unchanged.
  type OldAgeCategory = {
    #under18;
    #between18And35;
    #between36And50;
    #over50;
  };

  type OldEmergencyContact = {
    name : Text;
    phone : Text;
    relationship : Text;
  };

  type OldParticipant = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    ageCategory : OldAgeCategory;
    emergencyContact : OldEmergencyContact;
    registrationTimestamp : Time.Time;
  };

  // Old actor type
  type OldActor = {
    nextParticipantId : Nat;
    participants : Map.Map<Nat, OldParticipant>;
    prizes : Map.Map<Text, { placement : Text; description : Text; category : Text }>;
  };

  type NewParticipant = {
    id : Nat;
    name : Text;
    address : Text;
    email : Text;
    phone : Text;
    ageCategory : OldAgeCategory;
    registrationTimestamp : Time.Time;
  };

  // New actor type
  type NewActor = {
    nextParticipantId : Nat;
    participants : Map.Map<Nat, NewParticipant>;
    prizes : Map.Map<Text, { placement : Text; description : Text; category : Text }>;
  };

  // Migration function called by the main actor via the with-clause
  public func run(old : OldActor) : NewActor {
    let newParticipants = old.participants.map<Nat, OldParticipant, NewParticipant>(
      func(_id, oldParticipant) {
        {
          id = oldParticipant.id;
          name = oldParticipant.name;
          address = ""; // Default old data with empty address.
          email = oldParticipant.email;
          phone = oldParticipant.phone;
          ageCategory = oldParticipant.ageCategory;
          registrationTimestamp = oldParticipant.registrationTimestamp;
        };
      }
    );
    {
      old with
      participants = newParticipants
    };
  };
};
