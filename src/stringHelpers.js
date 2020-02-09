'use strict';
const err = require('./constants.js').battelRequestErrors;

const getHashTags = function(text) {
    return text.split(/\s/).filter(word => word.startsWith('#'));
};

const getBattleRequest = function(text) {
    let hashTags = getHashTags(text);
    if (!hashTags.includes('#killteam')) {
        return err.noKillteamTag;
    }
    if (!hashTags.includes('#атака') && !hashTags.includes('#защита')) {
        return err.noRequestTag;
    }

    let hex = hashTags.find(element => element.startsWith('#гекс'));
    if (!hex) {
        return err.noHexTag;
    }
    hex = hex.replace(/\D+/, '');

    return {
        isAttack: hashTags.includes('#атака'),
        hexNumber: hex
    }
};

const sayBattleRequest = function(battle) {
    if (!!battle) {
        let result =
            `Гекс ${battle.hexNumber}
В атаке: ${battle.attackSide ? battle.attackSide : "никого"}
В защите: ${battle.defSide ? battle.defSide : "никого"}`;
        return result;
    }
};

module.exports ={
    getBattleRequest,
    sayBattleRequest
};