import React from "react";
import ScoreList from "./ScoreList";
import base from "../base";
import Login from "./Login";
class OnlineScores extends React.Component {
  state = {
    scores: null,
    onlineScores: {
      bestScore: null,
      secondBestScore: null,
      thirdBestScore: null,
    },
  };

  updateScores = (scores) => {
    let scoreOrdered = scores.slice();
    scoreOrdered.sort((a, b) => {
      return b.score - a.score;
    });
    let bestScore = scoreOrdered[0];
    let secondBestScore = scoreOrdered[1];
    let thirdBestScore = scoreOrdered[2];

    const onlineScores = {bestScore, secondBestScore, thirdBestScore};
    return this.setState({onlineScores});
  };

  componentDidMount() {
    base.fetch("scores", {
      context: this,
      then(data) {
        this.updateScores(data);
      },
    });
    // this.ref = base.syncState("scores", {
    //   context: this,
    //   state: "scores",
    // });
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }

  render() {
    const {onlineScores} = this.state;
    return (
      <React.Fragment>
        <ScoreList online {...onlineScores} />
        <Login />
      </React.Fragment>
    );
  }
}

export default OnlineScores;
