const doPrototypeStuff = (req, res, next) => {

    // if first pick
    console.log(req.body);
    if (req.body.gameState === 'TEAM_PICK') {
        res.json({
            "action": "PICK_TEAM",
            "teamFighters": ["TONK", "POE", "VOIDWALKER"]
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
        const enemyFighters = req.body.opposingPlayer.fighters;
        console.log(ourFighters);
        const activeFighter = getCurrentActiveFighter(ourFighters);
        const poe = getAliveFighterByName(ourFighters, "POE");
        let fighterTurnOrder = [];
        // if (isOurHealthLow(activeFighter)) {
        //     console.log(sunflower.skills);
        //     if (sunflower != null && isSkillUsable(sunflower.skills, "HEAL_TEAM_150")) {
        //         res.json({
        //             "action": "SWITCH_FIGHTER",
        //             "activeFighter": "SUNFLOWER"
        //         })
        //         return;
        //     } else if (canSwitch(req.body.currentPlayer) && getAliveFighterByName(ourFighters, "TONK")) {
        //         res.json({
        //             "action": "SWITCH_FIGHTER",
        //             "activeFighter": "TONK"
        //         })
        //         return;
        //     } else {
        //         res.json({
        //             "action": "BATTLE",
        //             "skillName": "ATTACK"
        //         })
        //         return;
        //     }
        // }
        //fighterTurnOrder.push(activeFighter.fighterClass);
        // if ((isOurHealthLow(activeFighter, 0.25) && activeFighter.fighterClass !== "POE")) {
        if(activeFighterGotDebuffed(activeFighter) && (activeFighter.fighterClass === "TONK" || activeFighter.fighterClass === "VOIDWALKER" )){
            if (canSwitch(req.body.currentPlayer) && getAliveFighterByName(ourFighters, "POE")) {
                res.json({
                    "action": "SWITCH_FIGHTER",
                    "activeFighter": "POE"
                })
            }
        }
        if (activeFighter.fighterClass === "TONK" && canSwitch(activeFighter)){
            res.json({
                "action": "SWITCH_FIGHTER",
                "activeFighter": "VOIDWALKER"
            })
        }
        // else{
        //     if (activeFighter.fighterClass === "TONK") {
        //         if (canSwitch(req.body.currentPlayer) && getAliveFighterByName(ourFighters, "POE")) {
        //             res.json({
        //                 "action": "SWITCH_FIGHTER",
        //                 "activeFighter": "POE"
        //             })
        //         }        
        //     }
        // }     

            

        let skillToUse = "ATTACK"
        if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "ATTACK_150")) {
            skillToUse = "ATTACK_150"
        } else if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "SHIELD_80_WEAKEN_SELF_50")) {
            skillToUse = "SHIELD_80_WEAKEN_SELF_50"
        } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "HEAL_TEAM_150")) {
            skillToUse = "HEAL_TEAM_150"
        } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "ROOT")) {
            skillToUse = "ROOT"
        } else if (activeFighter.fighterClass === 'TONK' && isSkillUsable(activeFighter.skills, "ATTACK_WEAKEST_100") && !isEnemyAlone(enemyFighters)) {
            skillToUse = "ATTACK_WEAKEST_100"
        } else if (activeFighter.fighterClass === 'TONK' && isSkillUsable(activeFighter.skills, "HEAL_200")) {
            skillToUse = "HEAL_200"
        } else if (activeFighter.fighterClass === 'POE' && isSkillUsable(activeFighter.skills, "WEAKEN_50")) {
            skillToUse = "WEAKEN_50"
        } else if (activeFighter.fighterClass === 'POE' && isSkillUsable(activeFighter.skills, "DESTRUCT_SELF")
            && isOurHealthLow(activeFighter, 0.35) && !isEnemyAlone(enemyFighters)) {
            skillToUse = "DESTRUCT_SELF"
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

const isOurHealthLow = (fighter, proc) => {
    return (fighter.currentHealth / fighter.maxHealth) < proc
}

const getAliveFighterByName = (fighters, fighterName) => {
    return fighters.find((fighter) => fighter.status !== "DEAD" && fighter.fighterClass === fighterName);
}

const canSwitch = (player) => {
    return player.switchUsableIn == 0;
}
const isEnemyAlone = (enemyFighters) => {
    return (enemyFighters.filter(fighter => fighter.status === "DEAD" ).length === 2)
}

const activeFighterGotDebuffed = (fighter) => {
    return (fighter.debuffs.length > 0)
}

exports.doPrototypeStuff = doPrototypeStuff;