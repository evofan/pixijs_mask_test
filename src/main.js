const WIDTH = 480;
const HEIGHT = 320;
const APP_FPS = 30;

// init
let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = true;
app.ticker.remove(app.render, app);
const fpsDelta = 60 / APP_FPS;

let elapsedTime = 0;
let bg;
let obj, obj2;

let container = new PIXI.Container();
container.width = 480;
container.height = 320;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = false;
container.interactiveChildren = false;
app.stage.addChild(container);

// asset property
const ASSET_BG = "images/pic_bg.jpg";
const ASSET_OBJ = "images/32333591.jpg";
const ASSET_OBJ2 = "images/pic_gauss_circle.png";

PIXI.loader.add("bg_data", ASSET_BG);
PIXI.loader.add("obj_data", ASSET_OBJ);
PIXI.loader.add("obj2_data", ASSET_OBJ2);
PIXI.loader.load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
  // BG
  bg = new PIXI.Sprite(res.bg_data.texture);
  container.addChild(bg);
  bg.x = 0;
  bg.y = 0;

  // obj1
  obj1 = new PIXI.Sprite(res.obj_data.texture);
  container.addChild(obj1);
  obj1.anchor.set(0.5);
  obj1.x = WIDTH / 2;
  obj1.y = HEIGHT / 2;
  obj1.scale.set(1.0);

  // obj2
  obj2 = new PIXI.Sprite(res.obj2_data.texture);
  container.addChild(obj2);
  obj2.anchor.set(0.5);
  obj2.x = WIDTH / 2;
  obj2.y = HEIGHT / 2;
  obj2.scale.set(2.0);

  // apply mask
  obj1.mask = obj2;

  // Text
  let text = new PIXI.Text("Mask(blur) Test\n(PixiJS 4.8.9)", {
    fontFamily: "Arial",
    fontSize: 30,
    fill: 0xf0fff0,
    align: "center",
    fontWeight: "bold",
    stroke: "#000000",
    strokeThickness: 4,
    dropShadow: false,
    dropShadowColor: "#666666",
    lineJoin: "round"
  });
  container.addChild(text);
  text.x = WIDTH / 2 - text.width / 2;
  text.y = 20;

  // Ticker
  let ticker = PIXI.ticker.shared;
  ticker.autoStart = false;
  ticker.stop();
  PIXI.settings.TARGET_FPMS = 0.06;
  app.ticker.add(tick);
}

/**
 * adjust fps
 * @param { number } delta time
 */
const tick = delta => {
  // console.log(delta);
  elapsedTime += delta;

  if (elapsedTime >= fpsDelta) {
    // enough time passed, update app
    update(elapsedTime);
    // reset
    elapsedTime = 0;
  }
};

/**
 * app rendering
 * @param { number } delta time
 */
const update = delta => app.render();
