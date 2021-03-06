import React from "react";
import injectSheet from "react-jss";
import cx from "classnames";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";

import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

const style = {
	card: {
		backgroundColor: props => {
			return props.revealed ? "#4CAF50" : "#6b62c6";
		},
		opacity: props => (props.revealed ? ".5" : "1"),
		transition: "all .5s",
		height: "100%",
		color: "white",
		textAlign: "center",
		"& span": {
			fontSize: props => `${props.difficulty === 2 ? "2.5" : "4"}em`,
		},
	},
	cardActive: {
		backgroundColor: "#ffc500 !important",
		"& span": {
			filter: "drop-shadow(0px 0px 10px white)",
		},
	},
	wrongChoice: {
		backgroundColor: "#f44336 !important",
		"& span": {
			filter: "drop-shadow(0px 0px 10px white)",
		},
	},
	cardActionArea: {
		height: "100%",
	},
	cardContent: {
		padding: "0",
		display: "inline-block",
	},
};

class GameCard extends React.PureComponent {
	handleClick = () => {
		const { isActive, revealed } = this.props;
		if (isActive || revealed) return;
		this.props.handleCardClicks(this.props.cardContent, this.props.index);
	};
	render() {
		const { classes, cardContent, isActive, previouslyActive, revealed } = this.props;
		const cardClasses = cx(classes.card, isActive && classes.cardActive, previouslyActive && classes.wrongChoice);

		return (
			<Card raised={!revealed} onClick={this.handleClick} className={cardClasses}>
				<CardActionArea disabled={isActive || revealed} className={classes.cardActionArea}>
					<CardContent className={classes.cardContent}>
						<span aria-label="emoji" role="img">
							{revealed || isActive || previouslyActive ? cardContent : "?"}
						</span>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
}

GameCard.propTypes = {
	cardContent: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	previouslyActive: PropTypes.bool.isRequired,
	revealed: PropTypes.bool.isRequired,
};

export default injectSheet(style)(GameCard);
