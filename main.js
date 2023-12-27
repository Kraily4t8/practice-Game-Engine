const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//ex 
//ASSET_MANAGER.queueDownload("/sprites/img.png");
//charakter spritesheet loaded
ASSET_MANAGER.queueDownload("/assets/Sprout Lands - Sprites - Basic pack/Characters/Basic Charakter Spritesheet.png");
ASSET_MANAGER.queueDownload("/assets/Sprout Lands - Sprites - Basic pack/Characters/Egg_And_Nest.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	//scenemanager
	gameEngine.addEntity(new CatPlayer);
	

	gameEngine.start();
});
