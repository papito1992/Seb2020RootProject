const doPrototypeStuff = (req, res, next) => {

    // if first pick
    console.log(req.body);
    if (req.body.gameState === 'TEAM_PICK') {
        res.json({
            "action": "PICK_TEAM",
            "teamFighters": ["TONK", "SUNFLOWER", "VOIDWALKER"]
        })
    }

    if (req.body.gameState === 'FIGHTER_PICK') {

        res.json({
            "action": "PICK_FIGHTER",
            "activeFighter": "VOIDWALKER"
        })
    }
    console.log(req.body);

    if (req.body.gameState === 'IN_PROGRESS') {

        //agresyviai varom visad
        const activeFighter = getCurrentActiveFighter(req.body.currentPlayer.fighers);
        const sunflower = getAliveFighterByName(req.body.currentPlayer.fighers, "SUNFLOWER");

        if (isOurHealthLow(activeFighter)){
            if (sunflower != null && isSkillUsable(sunflower.skills, "HEAL_TEAM_150")) {
                res.json({
                    "action": "SWITCH_FIGHTER",
                    "activeFighter": "SUNFLOWER"
                })
            }
        }

        const skillToUse = "ATTACK"
        if (isSkillUsable(activeFighter.skills, "ATTACK_150")){
            skillToUse = "ATTACK_150"
        }

        res.json({
            "action": "BATTLE",
            "skillName": skillToUse
        })
    }
};

const getCurrentActiveFighter = (fighters) => {
    fighters.find((fighter) => fighter.status === "ACTIVE");
}

const isSkillUsable = (skills, skillName) => {
    const foundSkill = skills.find((selectedSkill) => selectedSkill.skillName == skillName);
    return foundSkill.usableIn == 0;
}

const isOurHealthLow = (fighter) => {
    retrun (fighter.currentHealth / fighter.maxHealth) < 0.25
}

const getAliveFighterByName = (fighters, fighterName) => {
    fighters.find((fighter) => fighter.status !== "DEAD" && fighter.fighterName == fighterName);
}


exports.doPrototypeStuff = doPrototypeStuff;