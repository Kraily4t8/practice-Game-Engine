const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//ex 
//ASSET_MANAGER.queueDownload("/sprites/img.png");
//charakter spritesheet loaded
ASSET_MANAGER.queueDownload("./assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png");
ASSET_MANAGER.queueDownload("./miku spritesheet.png");
ASSET_MANAGER.queueDownload("./specter knight.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	// ctx.imageSmoothingEnabled = false;

	//scenemanager
	// gameEngine.addEntity(new CatPlayer(gameEngine, 0, 0, ASSET_MANAGER.getAsset("./assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png")));
	
	gameEngine.addEntity(new SpecterKnight(gameEngine, 150, 280, ASSET_MANAGER.getAsset("./specter knight.png")));
	gameEngine.addEntity(new Ground(gameEngine, 50, 300, 120, ASSET_MANAGER.getAsset("./specter knight.png")));
	gameEngine.addEntity(new Miku(gameEngine, 50, 50, ASSET_MANAGER.getAsset("./miku spritesheet.png")));
	gameEngine.start();
});
