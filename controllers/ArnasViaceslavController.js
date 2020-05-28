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
        //kolkas visad voidwalker
        const ourFighters = req.body.currentPlayer.fighters;
        console.log(ourFighters);
        const activeFighter = getCurrentActiveFighter(ourFighters);
        const sunflower = getAliveFighterByName(ourFighters, "SUNFLOWER");

        if (isOurHealthLow(activeFighter)) {
            console.log(sunflower.skills);
            if (sunflower != null && isSkillUsable(sunflower.skills, "HEAL_TEAM_150")) {
                res.json({
                    "action": "SWITCH_FIGHTER",
                    "activeFighter": "SUNFLOWER"
                })
                return;
            } else if (canSwitch(req.body.currentPlayer) && getAliveFighterByName(ourFighters, "TONK")) {
                res.json({
                    "action": "SWITCH_FIGHTER",
                    "activeFighter": "TONK"
                })
                return;
            } else {
                res.json({
                    "action": "BATTLE",
                    "skillName": "ATTACK"
                })
                return;
            }
        }

        let skillToUse = "ATTACK"
        if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "ATTACK_150")) {
            skillToUse = "ATTACK_150"
        } else if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "SHIELD_80_WEAKEN_SELF_50")) {
            skillToUse = "SHIELD_80_WEAKEN_SELF_50"
        } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "HEAL_TEAM_150")) {
            skillToUse = "HEAL_TEAM_150"
        } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "ROOT")) {
            skillToUse = "ROOT"
        }


        res.json({
            "action": "BATTLE",
            "skillName": skillToUse
        })
    }
};

const getCurrentActiveFighter = (fighters) => {
    console.log(fighters);
    // fighters.for
    return fighters.find((fighter) => fighter.status === "ACTIVE");
}

const isSkillUsable = (skills, skillName) => {
    const foundSkill = skills.find((selectedSkill) => selectedSkill.skillName === skillName);
    return foundSkill.usableIn == 0;
}

const isOurHealthLow = (fighter) => {
    return (fighter.currentHealth / fighter.maxHealth) < 0.25
}

const getAliveFighterByName = (fighters, fighterName) => {
    return fighters.find((fighter) => fighter.status !== "DEAD" && fighter.fighterClass === fighterName);
}

const canSwitch = (player) => {
    return player.switchUsableIn == 0;
}


exports.doPrototypeStuff = doPrototypeStuff;