const getRandomNumber = (req, res, next) => {

    // if first pick
    console.log(req.body);
    if (req.body.gameState === 'TEAM_PICK') {
        res.json({
            "action": "PICK_TEAM",
            "teamFighters": ["LOZMAS", "SUNFLOWER", "POE"]
        })
    }

    if (req.body.gameState === 'FIGHTER_PICK') {

        res.json({
            "action": "PICK_FIGHTER",
            "activeFighter": "LOZMAS"
        })
    }
    console.log(req.body);

    if (req.body.gameState === 'IN_PROGRESS') {
        res.json({
            "action": "BATTLE",
            "skillName": "ATTACK"
        })
    }

};

const FIGHTERS = {
    "Lozmas" : {
        skills : ["ATTACK", "REFLECT_TEAM_60", "IMMUNE"]

    }
}



const LOZMAS  = {
      "fighterClass": "LOZMAS",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "REFLECT_TEAM_60", "IMMUNE"],
                 "buffs": [List of Buff objects (see below)],
                  "debuffs": [List of Debuff objects (see below)]
                 }

const TONK  = {
      "fighterClass": "TONK",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "ATTACK_WEAKEST_100", "HEAL_200"],
                 "buffs": [List of Buff objects (see below)],
                  "debuffs": [List of Debuff objects (see below)]
                 }

const GO_LEM  = {
      "fighterClass": "GO_LEM",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "ATTACK_TEAM_180", "SHIELD_50"],
                 "buffs": [List of Buff objects (see below)],
                  "debuffs": [List of Debuff objects (see below)]
                 }
                 
const POE  = {
      "fighterClass": "POE",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "WEAKEN_50", "DESTRUCT_SELF"],
                 "buffs": [List of Buff objects (see below)],
                  "debuffs": [List of Debuff objects (see below)]
                 }
                 
const POE  = {
      "fighterClass": "POE",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "WEAKEN_50", "DESTRUCT_SELF"],
                 "buffs": [List of Buff objects (see below)],
                  "debuffs": [List of Debuff objects (see below)]
                 }

const SUNFLOWER  = {
      "fighterClass": "SUNFLOWER",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "ROOT", "HEAL_TEAM_150"],
                "buffs": [],
                "debuffs": []
                 }

const VOIDWALKER  = {
      "fighterClass": "VOIDWALKER",
        "status": "INACTIVE",
          "strength": 160, 
           "maxHealth": 1800,
            "currentHealth": 1195,
              "speed": 50,
                "skills": ["ATTACK", "SHIELD_80_WEAKEN_SELF_50", "ATTACK_150"],
                 "buffs": [],
                  "debuffs": []
                 }

    let fighters = [{
      "fighterClass": "SUNFLOWER",
      "status": "INACTIVE",
      "strength": 150,
      "maxHealth": 1400,
      "currentHealth": 1400,
      "skills": [{
        "skillName": "ATTACK",
        "usableIn": 0,
        "cooldown": 0
      }, {
        "skillName": "ROOT",
        "usableIn": 0,
        "cooldown": 5
      }, {
        "skillName": "HEAL_TEAM_150",
        "usableIn": 0,
        "cooldown": 6
      }],
      "buffs": [],
      "debuffs": [],
      "speed": 80
    }, {
      "fighterClass": "GO_LEM",
      "status": "ACTIVE",
      "strength": 190,
      "maxHealth": 1700,
      "currentHealth": 1700,
      "skills": [{
        "skillName": "ATTACK",
        "usableIn": 0,
        "cooldown": 0
      }, {
        "skillName": "ATTACK_TEAM_180",
        "usableIn": 0,
        "cooldown": 4
      }, {
        "skillName": "SHIELD_50",
        "usableIn": 0,
        "cooldown": 4
      }],
      "buffs": [],
      "debuffs": [],
      "speed": 60
    }, {
      "fighterClass": "TONK",
      "status": "INACTIVE",
      "strength": 160,
      "maxHealth": 1800,
      "currentHealth": 1800,
      "skills": [{
        "skillName": "ATTACK",
        "usableIn": 0,
        "cooldown": 0
      }, {
        "skillName": "ATTACK_WEAKEST_100",
        "usableIn": 0,
        "cooldown": 4
      }, {
        "skillName": "HEAL_200",
        "usableIn": 0,
        "cooldown": 5
      }],
      "buffs": [],
      "debuffs": [],
      "speed": 50
    }]
            
exports.getRandomNumber = getRandomNumber;