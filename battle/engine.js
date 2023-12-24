import * as actions from './actions.js';

// TEST DATA
class Entity {
    // ? Destructure entity_data directly into class properties?
    constructor(entity_data) {
        this.data = entity_data;
        this.alive = true;
    }

    /*
    Entity loses HP. This is strictly for HP loss. Modifications to damage type should be done in the Action.
    */
    take_damage(damage) {
        this.data.hp -= damage;
    }
}
let player_characters = [
    new Entity({
        "name": "Laperax",
        "hp": 100,
        "action": "attack",
        "power": 5,
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
        return this.enemies[Math.floor(Math.random() * this.enemies.length)];
    }

    random_player() {
        return this.player_characters[Math.floor(Math.random() * this.player_characters.length)];
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
    for (const entity of gamestate.turn_queue) {
        entity.data.cooldown -= entity.data.speed;
        // if cooldown over, use action then reset cooldown
        if (entity.data.cooldown <= 0) {
            console.log(`${entity.data.name} is using ${entity.data.action}!`)
            actions[entity.data.action](gamestate, entity.data.power); // will probably want to bring this into the class as its own method
            entity.data.cooldown = 100;
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