// Attack a random enemy
export function attack(gamestate, damage) {
    let target = gamestate.random_enemy();
    let calc_damage = damage - target.data.armor;
    target.take_damage(calc_damage);

    battle_log(`<p>${target.data.name} took <span style='color: red'>${calc_damage} damage</span></p>`)
    console.log(`${target.data.name} has ${target.data.hp} HP`);
}

export function attack_player(gamestate, damage) {
    let target = gamestate.random_player();
    let calc_damage = damage - target.data.armor;
    target.take_damage(calc_damage);

    battle_log(`<p>${target.data.name} took <span style='color: red'>${calc_damage} damage</span></p>`)
    console.log(`${target.data.name} has ${target.data.hp} HP`);
}