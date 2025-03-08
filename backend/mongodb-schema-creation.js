db.users.drop();
db.players.drop();
db.playerValues.drop();
db.userTeams.drop();
db.leaderboard.drop();

// users
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "password", "isAdmin"],
      properties: {
        username: {
          bsonType: "string",
          description: "Username must be a string and is required"
        },
//         email: {
//           bsonType: "string",
//           description: "Email must be a valid email address and is required"
//         },
        password: {
          bsonType: "string",
          description: "Password must be a string and is required"
        },
        isAdmin: {
          bsonType: "bool",
          description: "isAdmin must be a boolean and is required"
        },
        createdAt: {
          bsonType: "date",
          description: "Date when the user was created"
        },
//         updatedAt: {
//           bsonType: "date",
//           description: "Date when the user was last updated"
//         }
      }
    }
  }
});

// player details and stats
db.createCollection("players", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "university", "category", "stats"],
      properties: {
        name: {
          bsonType: "string",
          description: "Player name must be a string and is required"
        },
        university: {
          bsonType: "string",
          description: "University must be a string and is required"
        },
        category: {
          bsonType: "string",
          enum: ["Batsman", "Bowler", "All-Rounder"],
          description: "Role must be one of the predefined values and is required"
        },
        stats: {
          bsonType: "object",
          required: ["Total Runs", "Balls Faced", "Innings Played", "Wickets", "Overs Bowled", "Runs Conceded"],
          properties: {
            "Total Runs": {
              bsonType: "int",
              minimum: 0,
              description: "Total runs scored by the player"
            },
            "Balls Faced": {
              bsonType: "int",
              minimum: 0,
              description: "Total number of balls faced while batting"
            },
            "Innings Played": {
              bsonType: "int",
              minimum: 0,
              description: "Number of innings in which the player batted"
            },
            "Wickets": {
              bsonType: "int",
              minimum: 0,
              description: "Total wickets taken by the player"
            },
            "Overs Bowled": {
              bsonType: "int",
              minimum: 0,
              description: "Total number of overs bowled"
            },
            "Runs Conceded": {
              bsonType: "int",
              minimum: 0,
              description: "Total runs conceded while bowling"
            }
          }
        },
        createdAt: {
          bsonType: "date",
          description: "Date when the player was created"
        },
        updatedAt: {
          bsonType: "date",
          description: "Date when the player was last updated"
        }
      }
    }
  }
});

// for calculated values and point count
db.createCollection("playerValues", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["playerId", "points", "value", "category"],
      properties: {
        playerId: {
          bsonType: "objectId",
          description: "Reference to player document"
        },
        points: {
          bsonType: "double",
          minimum: 0,
          description: "Player's calculated points"
        },
        category: {
          bsonType: "string",
          enum: ["Batsman", "Bowler", "All-Rounder"],
          description: "Role must be one of the predefined values and is required"
        },
        value: {
          bsonType: "int",
          minimum: 0,
          description: "Player's monetary value for team selection"
        }
      }
    }
  }
});

// team embedded
db.createCollection("userTeams", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "players", "remainingBudget", "teamSize"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "Reference to user document"
        },
        players: {
          bsonType: "array",
          description: "Array of selected players",
          items: {
            bsonType: "object",
            required: ["playerId", "points", "value", "category"],
            properties: {
              playerId: {
                bsonType: "objectId",
                description: "Reference to player document"
              },
              name: {
                bsonType: "string",
                description: "Denormalized player name for quick access"
              },
              points: {
                bsonType: "double",
                minimum: 0,
                description: "Player's calculated points"
              },
              category: {
                bsonType: "string",
                enum: ["Batsman", "Bowler", "All-Rounder"],
                description: "Role must be one of the predefined values and is required"
              },
              value: {
                bsonType: "int",
                minimum: 0,
                description: "Value at time of selection"
              }
            }
          }
        },
        initialBudget: {
          bsonType: "int",
          description: "Starting budget (9,000,000)"
        },
        remainingBudget: {
          bsonType: "int",
          description: "Budget left after player selections"
        },
        teamSize: {
          bsonType: "int",
          minimum: 0,
          maximum: 11,
          description: "Current number of players in team"
        },
        isComplete: {
          bsonType: "bool",
          description: "Whether team has all 11 players"
        },
        totalPoints: {
          bsonType: "int",
          description: "Total points of team (only valid when complete)"
        }
      }
    }
  }
});

db.createCollection("leaderboard", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "username", "points", "lastUpdated"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "Reference to user document"
        },
        username: {
          bsonType: "string",
          description: "Denormalized username for display"
        },
        points: {
          bsonType: "int",
          minimum: 0,
          description: "Team's total points"
        },
    // what to do
//         rank: {
//           bsonType: "int",
//           minimum: 1,
//           description: "Current position on leaderboard"
//         },
        lastUpdated: {
          bsonType: "date",
          description: "When the leaderboard entry was last updated"
        }
      }
    }
  }
});

// Create indexes for better query performance

// Users indexes
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "isAdmin": 1 });

// Players indexes
db.players.createIndex({ "category": 1 });
db.players.createIndex({ "stats.Total Runs": -1 });
db.players.createIndex({ "stats.Wickets": -1 });

// PlayerValues indexes
db.playerValues.createIndex({ "playerId": 1 }, { unique: true });
db.playerValues.createIndex({ "points": -1 });
db.playerValues.createIndex({ "value": 1 });

// UserTeams indexes
db.userTeams.createIndex({ "userId": 1 }, { unique: true });
db.userTeams.createIndex({ "isComplete": 1 });

// Leaderboard indexes
db.leaderboard.createIndex({ "points": -1 });
db.leaderboard.createIndex({ "userId": 1 }, { unique: true });
// db.leaderboard.createIndex({ "rank": 1 });

// Print confirmation message
print("All collections and indexes created successfully!");
