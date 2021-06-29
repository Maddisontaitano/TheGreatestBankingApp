import { Component } from "react";

class PWStrength extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			score: 0,
			color: "red-600",
			containsLowerCase: false,
			containsUpperCase: false,
			containsNumeral: false,
			containsSpecialCharacter: false
		}
		this.timer = null;
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.password !== this.state.password) {
			
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.calculateScore();
			}, 500);
		}
	}

	handlePW = (e) => {
		const newState = {
			password: e.target.value
		};

		newState.containsLowerCase = /[a-z]/.test(e.target.value) ? true : false;
		newState.containsUpperCase = /[A-Z]/.test(e.target.value) ? true : false;
		newState.containsNumeral = /[0-9]/.test(e.target.value) ? true : false;
		newState.containsSpecialCharacter = /[!@#$%^&*)(+=._-`~[\]{};:'",<>/?]/.test(e.target.value) ? true : false;
		
		this.setState(newState);
	}

	calculateScore = () => {
		let newScore = 0;
		let newColor;

		if (this.state.containsLowerCase) {
			newScore += 1;
		}
		if (this.state.containsUpperCase) {
			newScore += 1;
		}
		if (this.state.containsNumeral) {
			newScore += 2;
		}
		if (this.state.containsSpecialCharacter) {
			newScore += 2;
		}

		console.log(newScore);

		switch (newScore) {
			case 0:
			case 1:
			case 2:
			case 3:
				newColor = "red-600";
				break;
			case 4:
			case 5:
			case 6:
			case 7:
				newColor = "yellow-400";
				break;
			default:
				newColor = "green-600";
				break;
		}

		this.setState({
			score: newScore,
			color: newColor
		});
	}

	render() {
		return (
			<div className="flex flex-row">
				<form>
					<label htmlFor="password">Password: </label>
					<input className="bg-gray-300 rounded-sm" type="password" id="password" name="password" minLength="6" maxLength="32" onChange={this.handlePW} />
				</form>
				<article className="ml-2 w-40 rounded-sm border-solid border-black border-2">
					<div className={`bg-${this.state.color} w-${this.state.score * 4} h-full`}></div>
				</article>
			</div>
		);
	}
}

export default PWStrength;