import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore, RootState } from "@/store/store";

type RenderWithReduxOptions = {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
};

type RenderWithReduxReturn = RenderResult & {
  store: AppStore;
};

export function renderWithRedux(
  component: ReactElement,
  {
    preloadedState,
    store = makeStore(preloadedState),
  }: RenderWithReduxOptions = {}
): RenderWithReduxReturn {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  const renderResult = render(component, { wrapper: Wrapper });
  
  return {
    ...renderResult,
    store,
  };
}
