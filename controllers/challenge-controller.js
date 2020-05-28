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
    // pasirenkam kas ismusu kov eis pirmas

};

exports.getRandomNumber = getRandomNumber;

// push test