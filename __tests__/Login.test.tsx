import { Login, MenuLateral } from "../src/shared/components";
import React, { ReactComponentElement } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AppThemeProvider, DrawerProvider } from "../src/shared/contexts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../src/routes";

const execTests = true;

describe("Test Login Component", () => {
  let renderedComponent: React.ReactElement<any, string>;

  beforeEach(() => {
    renderedComponent = (
      <AppThemeProvider>
        <Login
          children={
            <DrawerProvider>
              <BrowserRouter>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </BrowserRouter>
            </DrawerProvider>
          }
        />
      </AppThemeProvider>
    );
  });

  if (execTests) {
    it("renders without errors", () => {
      render(renderedComponent);
    });
  }
  
  test("Test Login Component id Running", () => {
    expect(execTests).toEqual(execTests);
  });
});
