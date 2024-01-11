// Attack a random enemy
export function attack(gamestate, damage) {
    let target = gamestate.random_enemy();
    let calc_damage = target.calculate_damage(damage)
    target.take_damage(calc_damage);

    battle_log(`<p>${target.name} took <span style='color: red'>${calc_damage} damage</span></p>`)
    console.log(`${target.name} has ${target.hp} HP`);
}

export function attack_player(gamestate, damage) {
    let target = gamestate.random_player();
    let calc_damage = target.calculate_damage(damage)
    target.take_damage(calc_damage);

    battle_log(`<p>${target.name} took <span style='color: red'>${calc_damage} damage</span></p>`)
    console.log(`${target.name} has ${target.hp} HP`);
}