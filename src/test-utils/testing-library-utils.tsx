import { Provider } from "react-redux";
import { RenderOptions, RenderResult, render } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
import store from "../store";

import { ReactNode, ReactElement } from "react";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const renderWithReduxStore = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithReduxStore as render };
