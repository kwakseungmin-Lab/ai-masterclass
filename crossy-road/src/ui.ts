export type GameScreen = "menu" | "playing" | "gameover";

export interface UIState {
  readonly screen: GameScreen;
  readonly score: number;
  readonly highScore: number;
}

function getElement(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element #${id} not found`);
  return el;
}

export function createUI(): UIState {
  const stored = localStorage.getItem("crossy-highscore");
  const highScore = stored ? parseInt(stored, 10) : 0;

  return {
    screen: "menu",
    score: 0,
    highScore,
  };
}

export function showMenu(): void {
  getElement("menu-screen").style.display = "flex";
  getElement("gameover-screen").style.display = "none";
  getElement("score-display").style.display = "none";
  getElement("high-score-display").style.display = "none";
}

export function showPlaying(state: UIState): void {
  getElement("menu-screen").style.display = "none";
  getElement("gameover-screen").style.display = "none";
  getElement("score-display").style.display = "block";
  getElement("high-score-display").style.display = "block";
  getElement("score-display").textContent = String(state.score);
  getElement("high-score-display").textContent = `HIGH SCORE: ${state.highScore}`;
}

export function showGameOver(state: UIState): void {
  getElement("menu-screen").style.display = "none";
  getElement("gameover-screen").style.display = "flex";
  getElement("score-display").style.display = "none";
  getElement("high-score-display").style.display = "none";
  getElement("gameover-score").textContent = `Score: ${state.score}`;
  getElement("gameover-highscore").textContent = `High Score: ${state.highScore}`;
}

export function updateScore(state: UIState, score: number): UIState {
  const newHighScore = Math.max(state.highScore, score);
  if (newHighScore > state.highScore) {
    localStorage.setItem("crossy-highscore", String(newHighScore));
  }

  getElement("score-display").textContent = String(score);
  getElement("high-score-display").textContent = `HIGH SCORE: ${newHighScore}`;

  return {
    ...state,
    score,
    highScore: newHighScore,
  };
}

export function setScreen(state: UIState, screen: GameScreen): UIState {
  const newState = { ...state, screen };
  switch (screen) {
    case "menu":
      showMenu();
      break;
    case "playing":
      showPlaying(newState);
      break;
    case "gameover":
      showGameOver(newState);
      break;
  }
  return newState;
}
