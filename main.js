const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//ex 
//ASSET_MANAGER.queueDownload("/sprites/img.png");
//charakter spritesheet loaded
ASSET_MANAGER.queueDownload("./assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png");
ASSET_MANAGER.queueDownload("./miku spritesheet.png");
ASSET_MANAGER.queueDownload("./specter knight.png");

ASSET_MANAGER.downloadAll(() => {

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	// ctx.imageSmoothingEnabled = false;
	
	gameEngine.addEntity(new SceneManager(gameEngine));
	//scenemanager
	// gameEngine.addEntity(new CatPlayer(gameEngine, 0, 0, ASSET_MANAGER.getAsset("./assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png")));

	gameEngine.start();
});
