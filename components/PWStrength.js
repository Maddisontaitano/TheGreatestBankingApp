import { Component } from "react";

class PWStrength extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			score: 0,
			containsLowerCase: false,
			containsUpperCase: false,
			containsNumeral: false,
			containsSpecialCharacter: false
		}
		this.timer = null;
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.password !== this.state.password) {
			this.calculateScore();
		}
	}

	handlePW = (e) => {
		this.setState({
			password: e.target.value
		});

		console.log("hi");
	}

	calculateScore = () => {
		const newState = {
			score: this.state.score
		}

		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (!this.state.containsLowerCase && /[a-z]/.test(this.state.password)) {
				newState.containsLowerCase = true;
				newState.score = newState.score + 2;
			} else if (this.state.containsLowerCase && !/[a-z]/.test(this.state.password)) {
				newState.containsLowerCase = false;
				newState.score = newState.score - 2;
			}

			if (!this.state.containsUpperCase && /[A-Z]/.test(this.state.password)) {
				newState.containsUpperCase = true;
				newState.score = newState.score + 2;
			} else if (this.state.containsUpperCase && !/[A-Z]/.test(this.state.password)) {
				newState.containsUpperCase = false;
				newState.score = newState.score - 2;
			}

			if (!this.state.containsNumeral && /[0-9]/.test(this.state.password)) {
				newState.containsNumeral = true;
				newState.score = newState.score + 2;
			} else if (this.state.containsNumeral && !/[0-9]/.test(this.state.password)) {
				newState.containsNumeral = false;
				newState.score = newState.score - 2;
			}

			if (!this.state.containsSpecialCharacter && /[!@#$%^&*)(+=._-`~[\]{};:'",<>/?]/.test(this.state.password)) {
				newState.containsSpecialCharacter = true;              //:;'"[{}\],<>/?`~
				newState.score = newState.score + 2;
			} else if (this.state.containsSpecialCharacter && !/[!@#$%^&*)(+=._-`~[\]{};:'",<>/?]/.test(this.state.password)) {
				newState.containsSpecialCharacter = false;
				newState.score = newState.score - 2;
			}

			this.setState(newState);
		}, 600)
	}

	render() {
		return (
			<div>
				<form>
					<label htmlFor="password">Password: </label>
					<input type="password" id="password" name="password" minLength="6" maxLength="32" onChange={this.handlePW} />
				</form>
				<h1>{this.state.score}/10</h1>
			</div>
		);
	}
}

export default PWStrength;