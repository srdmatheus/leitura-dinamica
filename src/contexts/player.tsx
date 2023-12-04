'use client';

import { createContext, useReducer } from 'react';

type PlayerContextType = {
  text: string;
  updateText: (newState: string) => void;
  isProgressing: boolean;
  toggleIsProgressing: () => void;
  currentWordIndex: number;
  saveCurrentWordIndex: (index: number) => void;
  wordPerMinute: number;
  updateWordPerMinute: (newState: number) => void;
};

type PlayerAction =
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'TOGGLE_IS_PROGRESSING' }
  | { type: 'SAVE_CURRENT_WORD_INDEX'; payload: number }
  | { type: 'UPDATE_WORD_PER_MINUTE'; payload: number };

const playerReducer = (
  state: PlayerContextType,
  action: PlayerAction
): PlayerContextType => {
  switch (action.type) {
    case 'TOGGLE_IS_PROGRESSING':
      return { ...state, isProgressing: !state.isProgressing };
    case 'SAVE_CURRENT_WORD_INDEX':
      return { ...state, currentWordIndex: action.payload };
    case 'UPDATE_WORD_PER_MINUTE':
      return { ...state, wordPerMinute: action.payload };
    default:
      return state;
  }
};

const initialState: PlayerContextType = {
  text: 'Bem-vindo ao Leitura Dinâmica, sua plataforma de leitura otimizada! Estamos empolgados por tê-lo conosco. Para iniciar sua jornada de leitura, oferecemos duas opções simples: você pode facilmente colar o conteúdo que deseja explorar na caixa de texto abaixo, ou se preferir, basta clicar no botão "Iniciar" para mergulhar instantaneamente em uma experiência única de leitura dinâmica. Estamos aqui para aprimorar a sua experiência de leitura, tornando-a mais eficiente e envolvente. Explore o poder da leitura dinâmica conosco!',
  updateText: () => {},
  isProgressing: false,
  toggleIsProgressing: () => {},
  currentWordIndex: 0,
  saveCurrentWordIndex: () => {},
  wordPerMinute: 250,
  updateWordPerMinute: () => {}
};

export const PlayerContext = createContext<PlayerContextType>(initialState);

export const PlayerContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const updateText = (newState: string) =>
    dispatch({ type: 'SET_TEXT', payload: newState });

  const toggleIsProgressing = () => dispatch({ type: 'TOGGLE_IS_PROGRESSING' });

  const saveCurrentWordIndex = (index: number) =>
    dispatch({ type: 'SAVE_CURRENT_WORD_INDEX', payload: index });

  const updateWordPerMinute = (state: number) => {
    dispatch({ type: 'UPDATE_WORD_PER_MINUTE', payload: state });
  };

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        updateText,
        toggleIsProgressing,
        saveCurrentWordIndex,
        updateWordPerMinute
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
