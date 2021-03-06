import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import Divider from "@material-ui/core/Divider";

import OnlineScores from "./OnlineScores";
import LocalScores from "./LocalScores";

const style = {
  scoreboard: {
    marginTop: "auto",
  },
};

const stateFromLS = JSON.parse(localStorage.getItem("memoji_scores"));

class Scoreboard extends React.PureComponent {
  state = {
    value: 0,
    localScores: stateFromLS || {
      bestScore: null,
      secondBestScore: null,
      thirdBestScore: null,
    },
  };

  handleChange = (event, value) => {
    this.setState({value});
  };
  handleLocalScores = (localScores) => {
    const saveToLS = (state) => localStorage.setItem("memoji_scores", JSON.stringify(state));
    this.setState({localScores}, () => saveToLS(this.state.localScores));
  };

  render() {
    const {localScores} = this.state;
    const {classes, lastGameScore, handleIsSignedIn} = this.props;
    return (
      <React.Fragment>
        <Typography className={classes.scoreboard} variant="overline" align="center">
          Scoreboard
        </Typography>
        <Divider light />
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Local" />
          <Tab label="Online" />
        </Tabs>
        <SwipeableViews axis={"x"} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <LocalScores
            lastGameScore={lastGameScore}
            localScores={localScores}
            handleLocalScores={this.handleLocalScores}
          />
          <OnlineScores
            handleIsSignedIn={handleIsSignedIn}
            handleLocalScores={this.handleLocalScores}
            localScores={localScores}
          />
        </SwipeableViews>
      </React.Fragment>
    );
  }
}

Scoreboard.propTypes = {
  lastGameScore: PropTypes.number.isRequired,
  handleIsSignedIn: PropTypes.func.isRequired,
};

export default injectSheet(style)(Scoreboard);
