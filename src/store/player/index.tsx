import { create } from 'zustand';

type PlayerProps = {
  text: string;
  isProgressing: boolean;
  currentWordIndex: number;
  wordPerMinute: number;
};

type ActionsProps = {
  updateText: (newText: string) => void;
  toggleIsProgressing: () => void;
  saveCurrentWordIndex: (newIndex: number) => void;
  updateWordPerMinute: (newWpm: number) => void;
};

type StoreProps = {
  state: PlayerProps;
  actions: ActionsProps;
};

const initialState: PlayerProps = {
  text: 'Bem-vindo ao Leitura Dinâmica, sua plataforma de leitura otimizada! Estamos empolgados por tê-lo conosco. Para iniciar sua jornada de leitura, oferecemos duas opções simples: você pode facilmente colar o conteúdo que deseja explorar na caixa de texto abaixo, ou se preferir, basta clicar no botão "Iniciar" para mergulhar instantaneamente em uma experiência única de leitura dinâmica. Estamos aqui para aprimorar a sua experiência de leitura, tornando-a mais eficiente e envolvente. Explore o poder da leitura dinâmica conosco!',
  currentWordIndex: 0,
  isProgressing: false,
  wordPerMinute: 250
};

export const usePlayerStore = create<StoreProps>((set) => ({
  state: { ...initialState },
  actions: {
    updateText: (text: string) =>
      set((state) => ({ state: { ...state.state, text } })),

    toggleIsProgressing: () =>
      set((state) => ({
        state: {
          ...state.state,
          isProgressing: !state.state.isProgressing
        }
      })),

    saveCurrentWordIndex: (index: number) =>
      set((state) => ({ state: { ...state.state, currentWordIndex: index } })),

    updateWordPerMinute: (newState: number) =>
      set((state) => ({ state: { ...state.state, wordPerMinute: newState } }))
  }
}));
