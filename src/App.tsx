/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ScreenState, AppState } from './types';
import { LandingPage } from './components/LandingPage';
import { MatchmakingScreen } from './components/MatchmakingScreen';
import { LiveChallengeScreen } from './components/LiveChallengeScreen';
import { ResultScreen } from './components/ResultScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  const [currentScreen, setScreen] = useState<ScreenState>('landing');
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);

  const state: AppState = {
    currentScreen,
    setScreen,
    gameResult,
    setGameResult
  };

  return (
    <>
      {currentScreen === 'landing' && <LandingPage setScreen={setScreen} />}
      {currentScreen === 'matchmaking' && <MatchmakingScreen setScreen={setScreen} />}
      {currentScreen === 'live' && <LiveChallengeScreen setScreen={setScreen} setGameResult={setGameResult} />}
      {currentScreen === 'result' && <ResultScreen setScreen={setScreen} gameResult={gameResult} />}
      {currentScreen === 'profile' && <ProfileScreen setScreen={setScreen} />}
    </>
  );
}
