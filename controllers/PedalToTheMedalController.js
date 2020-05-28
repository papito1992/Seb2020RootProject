const getTeamPickAction = (teamFighters) => ({ "action": "PICK_TEAM", teamFighters});
const getFighterPickAction = (fighterName) => ({ "action": "PICK_FIGHTER", "activeFighter": fighterName });
const getSwitchAction = (fighterName) => ({ "action": "SWITCH_FIGHTER", "activeFighter": fighterName });
const getSkipAction = () => ({ "action": "SKIP" });
const getAttackAction = (attackName = "ATTACK") => ({ "action": "BATTLE", "skillName": attackName });


const getCurrentFighter = (fighters) => {
  return fighters.find((fighter) => fighter.status === "ACTIVE");
}

const isSkillUsable = (skills, skillName) => {
  const foundSkill = skills.find((selectedSkill) => selectedSkill.skillName === skillName);
  return foundSkill.usableIn == 0;
}

const isOurHealthLow = (fighter) => {
  return (fighter.currentHealth / fighter.maxHealth) < 0.25
}

const isFighterActive = (fighters, fighterName) => {
  return fighters.find((fighter) => fighter.status === "ACTIVE" && fighter.fighterClass === fighterName);
}

const getAliveFighterByName = (fighters, fighterName) => {
  return fighters.find((fighter) => fighter.status !== "DEAD" && fighter.fighterClass === fighterName);
}

const shouldNotAttack = (opposingBot) => {
  return opposingBot.fighters.buffs.filter(buff => buff === "IMMUNE" || buff === "REFLECT_TEAM_60").length > 0;
}

const canSwitch = (player) => {
  return player.switchUsableIn == 0 && !isLastFighter(player.fighters);
}

const isLastFighter = (fighters) => {
  return fighters.filter(f => f.status === "DEAD").length == 2;
}

const getNextFighterToSwitch = (fighters) => {
  let i = fighters.indexOf(getCurrentFighter(fighters));
  i++;
  return i > 2 ? fighters[0] : fighters[i];
}

const shouldTonkUseHeal = (tonk) => {
  return tonk.maxHealth - tonk.currentHealth > 300;
}

const Pedal = (req, res) => {

  // Team pick stage
  if (req.body.gameState === 'TEAM_PICK') {
      res.json(getTeamPickAction([ "VOIDWALKER", "TONK", "SUNFLOWER"])); // order is important
  }

  // Fighter pick stage
  if (req.body.gameState === 'FIGHTER_PICK') {
      res.json(getFighterPickAction("VOIDWALKER"));
  }

  // Battle stage
  if (req.body.gameState === 'IN_PROGRESS') {
      const currentPlayer = req.body.currentPlayer;
      const opposingPlayer = req.body.opposingPlayer;
      const activeFighter = getCurrentFighter(ourFighters);
      const ourFighters = req.body.currentPlayer.fighters;
      const sunflower = getAliveFighterByName(ourFighters, "SUNFLOWER");

      // Switch every time we can
      if (canSwitch(currentPlayer)) {
        const nextFighter = getNextFighterToSwitch(fighters);
        return res.json(getSwitchAction(nextFighterName.fighterClass));
      }

      // Don't attack if enemy used immunity or reflect
      if (shouldNotAttack(opposingPlayer)) {
        return res.json(getSkipAction());
      }

      // Select attack based on active cooldowns
      let skillToUse = "ATTACK"

      if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "ATTACK_150")) {
          skillToUse = "ATTACK_150"
      } else if (activeFighter.fighterClass === 'VOIDWALKER' && isSkillUsable(activeFighter.skills, "SHIELD_80_WEAKEN_SELF_50")) {
          skillToUse = "SHIELD_80_WEAKEN_SELF_50"
      } else if (activeFighter.fighterClass === 'TONK' && isSkillUsable(activeFighter.skills, "ATTACK_WEAKEST_100")) {
          skillToUse = "ATTACK_WEAKEST_100"
      } else if (activeFighter.fighterClass === 'TONK' && shouldTonkUseHeal(activeFighter) && isSkillUsable(activeFighter.skills, "HEAL_200")) {
          skillToUse = "HEAL_200"
      } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "ROOT")) {
          skillToUse = "ROOT"
      } else if (activeFighter.fighterClass === 'SUNFLOWER' && isSkillUsable(activeFighter.skills, "HEAL_TEAM_150")) {
          skillToUse = "HEAL_TEAM_150"
      }
      
      res.json(getAttackAction(skillToUse));
  }
};

exports.Pedal = Pedal;