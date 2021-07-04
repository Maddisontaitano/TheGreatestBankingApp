import { Component } from "react";

class PWStrength extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// password: "",
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
		if (prevProps.pass !== this.props.pass) {
			
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.calculateScore();
			}, 500);
		}
	}

	handlePW = (e) => {
		const newState = {
		// 	password: e.target.value
		};

		newState.containsLowerCase = /[a-z]/.test(e.target.value) ? true : false;
		newState.containsUpperCase = /[A-Z]/.test(e.target.value) ? true : false;
		newState.containsNumeral = /[0-9]/.test(e.target.value) ? true : false;
		newState.containsSpecialCharacter = /[!@#$%^&*)(+=._-`~[\]{};:'",<>/?]/.test(e.target.value) ? true : false;
		newState.longerThanSixteen = e.target.value.length >= 16 ? true : false;
		
        this.props.setPass(e.target.value);
		this.setState(newState);
	}

	calculateScore = () => {
		let newScore = 0;
		let newColor;

		if (this.state.containsLowerCase) {
			newScore++;
		}
		if (this.state.containsUpperCase) {
			newScore++;
		}
		if (this.state.containsNumeral) {
			newScore++;
		}
		if (this.state.containsSpecialCharacter) {
			newScore++;
		}
		if (this.props.pass.length >= 16) {
			newScore++;
		}
		switch (newScore) {
			case 0:
			case 1:
				newColor = "red-600";
				break;
			case 2:
			case 3:
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
			<div className="my-4">
				{/* <article> */}
				<label htmlFor="password">
                    <h3 className="font-bold">Password</h3>
                </label>
				<input className="shadow border rounded w-full" type="password" id="pass" name="password" minLength="6" maxLength="32" onChange={this.handlePW} />
				{/* </article> */}
				<article className="w-40 shadow border rounded h-8 mt-4">
					<div className={`bg-${this.state.color} w-${this.state.score > 0 ? `${this.state.score}/5` : '0'} h-8 rounded`}></div>
				</article>
			</div>
		);
	}
}

export default PWStrength;