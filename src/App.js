//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import heroes from "./heroes.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    heroes,
    clickedHeroes: [],
    score: 0
  };

//when you click on a card ... the heroes is taken out of the array
  imageClick = event => {
    const currentHeroes = event.target.alt;
    const HeroesAlreadyClicked =
      this.state.clickedHeroes.indexOf(currentHeroes) > -1;

//if you click on a heroes that has already been selected, the game is reset and cards reordered
    if (HeroesAlreadyClicked) {
      this.setState({
        heroes: this.state.heroes.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedHeroes: [],
        score: 0
      });
        alert("You guessed incorrectly!");

//if you click on an available heroes, your score is increased and cards reordered
    } else {
      this.setState(
        {
          heroes: this.state.heroes.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedHeroes: this.state.clickedHeroes.concat(
            currentHeroes
          ),
          score: this.state.score + 1
        },
//Getting all 12 Heroes Correctly will give you a congrats message.       
        () => {
          if (this.state.score === 12) {
            alert("Congrats on Winning");
            this.setState({
              heroes: this.state.heroes.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedHeroes: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.heroes.map(heroes => (
            <FriendCard
              imageClick={this.imageClick}
              id={heroes.id}
              key={heroes.id}
              image={heroes.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;