class SceneManager {
    constructor(game) {
        this.game = game;


        game.addEntity(new EggNest(game,10,10))
    }

    
}