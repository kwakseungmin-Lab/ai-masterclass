import {
  type GameState,
  createGame,
  updateGame,
  handleInput,
  handleResize,
  render,
  startGame,
} from "./game.ts";
import { showMenu } from "./ui.ts";

let gameState: GameState = createGame();
showMenu();

function gameLoop(time: number): void {
  requestAnimationFrame(gameLoop);

  const dt = gameState.lastTime === 0 ? 0 : (time - gameState.lastTime) / 1000;
  const clampedDt = Math.min(dt, 0.05);

  gameState = { ...gameState, lastTime: time };
  gameState = updateGame(gameState, clampedDt);
  render(gameState);
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
  ) {
    e.preventDefault();
  }
  gameState = handleInput(gameState, e.key);
});

const startBtn = document.getElementById("start-btn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    gameState = startGame(gameState);
  });
}

const retryBtn = document.getElementById("retry-btn");
if (retryBtn) {
  retryBtn.addEventListener("click", () => {
    gameState = startGame(gameState);
  });
}

window.addEventListener("resize", () => {
  handleResize(gameState);
});

requestAnimationFrame(gameLoop);
