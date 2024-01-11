import * as actions from './actions.js';

// TEST DATA
class Entity {
    constructor({ name, hp, action, power, speed, cooldown, armor }) {
        // Assign properties from JSON to this object
        Object.assign(this, { name, hp, action, power, speed, cooldown, armor })
        this.alive = true;
        this.starting_cooldown = this.cooldown
    }

    execute_action(gamestate) {
        actions[this.action](gamestate, this.power); // will probably want to bring this into the class as its own method
        this.cooldown = this.starting_cooldown;
    }

    calculate_damage(damage, dmg_type = "normal") {
        switch (dmg_type) {
            case "normal":
                return (damage - this.armor);
        }
    }

    /*
    Entity loses HP. This is strictly for HP loss. Modifications to damage type should be done in calculate_damage()
    */
    take_damage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.alive = false;
        }
    }
}
let player_characters = [
    new Entity({
        "name": "Fighter",
        "power": 5,
        "hp": 100,
        "action": "attack",
        "speed": 50,
        "cooldown": 100,
        "armor": 1
    })
]
let enemies = [
    new Entity({
        "name": "Goblin King",
        "hp": 50,
        "action": "attack_player",
        "power": 3,
        "speed": 25,
        "cooldown": 100,
        "armor": 0
    }),
    new Entity({
        "name": "Goblin Archer",
        "hp": 10,
        "action": "attack_player",
        "power": 1,
        "speed": 10,
        "cooldown": 100,
        "armor": 0
    })
]
// END TEST DATA

class Battle {
    constructor(player_characters, enemies) {
        this.player_characters = player_characters;
        this.enemies = enemies;
        this.turn_queue = this.calculate_turn_queue(player_characters, enemies);
    }

    // Using arrays of player_characters and enemies from the constructor, return an array of entities in the battle sorted by speed (highest to lowest)
    calculate_turn_queue(p, e) {
        let turn_queue = [...p, ...e];
        return turn_queue.sort((a, b) => b.speed - a.speed);
    }

    random_enemy() {
        let alive_enemies = this.enemies.filter((enemy) => enemy.alive);
        return alive_enemies[Math.floor(Math.random() * alive_enemies.length)];
    }

    random_player() {
        let alive_player_characters = this.player_characters.filter((character) => character.alive);
        return alive_player_characters[Math.floor(Math.random() * alive_player_characters.length)];
    }
}

// Game Loop

const battle = new Battle(player_characters, enemies);

/*
Tick every 250ms.
Every tick, subtract Speed from Cooldown (100)
When Cooldown is <= 0, use Action

Speed 100 means cast every tick (0.25 seconds), 50 means every other tick (0.5 seconds), etc.
*/
function game_loop(gamestate) {
    // check if battle is over
    let alivePlayers = gamestate.player_characters.filter(player => player.alive);
    let aliveEnemies = gamestate.enemies.filter(enemy => enemy.alive);
    if (alivePlayers.length <= 0) {
        battle_log("<h1>ENEMIES WIN</h1>")
        clearInterval(tick)
    }
    else if (aliveEnemies.length <= 0) {
        battle_log("<h1>PLAYERS WIN</h1>")
        clearInterval(tick)
    }

    for (const entity of gamestate.turn_queue) {
        if (entity.alive) {
            entity.cooldown -= entity.speed;
            // if cooldown over, use action
            if (entity.cooldown <= 0) {
                console.log(`${entity.name} is using ${entity.action}!`)
                entity.execute_action(gamestate)
            }
        }
        else {
            console.log(`${entity.name} is dead.`)
        }

    }
}

const tick = setInterval(() => game_loop(battle), 500);
// End Game Loop

/*
COOLDOWN: 100
Tick every 0.25 seconds.
Every tick, subtract Speed from Cooldown (100)
When Cooldown is <= 0, use Action

Speed 100 means cast every tick (0.25 seconds), 50 means every other tick (0.5 seconds), etc.
*/