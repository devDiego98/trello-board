"use client";
import "./globals.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import styled from "styled-components";

export const metadata = {
  title: "Adecco Trello App",
  description: "Trello CopyCat Application",
};

// Styled component
const AppContainer = styled.div`
  padding: 32px 48px;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    padding: 32px 16px;
  }
`;

// Redux store

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Provider store={store}>
          <AppContainer>{children}</AppContainer>
        </Provider>
      </body>
    </html>
  );
}
