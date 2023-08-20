import React from "react";
import "./app.css";
import AddForm from './components/AddForm';
import BookContainer from './components/Book/BookContainer';
import ContainerApp from "./components/Container";
import Header from './components/Header';

function App() {
  return (
    <div className="container-app">
      <Header />
      <ContainerApp>
        <AddForm />
        <BookContainer />
      </ContainerApp>
    </div>
  );
}

export default App;