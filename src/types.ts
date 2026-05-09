import { ReactNode } from 'react';

export type ScreenState = 'landing' | 'matchmaking' | 'live' | 'result' | 'profile';

export interface AppState {
  currentScreen: ScreenState;
  setScreen: (screen: ScreenState) => void;
  gameResult: 'win' | 'lose' | null;
  setGameResult: (result: 'win' | 'lose' | null) => void;
}
