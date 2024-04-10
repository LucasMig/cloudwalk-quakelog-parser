export function processKillEvent(currentMatchData, killData) {
  const { killer, victim, means } = killData;
  const dto = { ...currentMatchData };

  if (killer === "<world>") {
    const victimHasKills = dto.kills[victim];
    victimHasKills ? (dto.kills[victim] -= 1) : (dto.kills[victim] = -1);
    dto.world_kills += 1;
  }

  if (killer !== "<world>" && killer !== victim) {
    const killerHasKills = dto.kills[killer];

    killerHasKills ? (dto.kills[killer] += 1) : (dto.kills[killer] = 1);
  }

  dto.total_kills += 1;
  return dto;
}
