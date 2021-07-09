import { Component } from "react";
import styles from '../../styles/components/Form.module.css'

class PWStrength extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// password: "",
			score: 0,
			color: "",
			strength: "",
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
		let newStrength;

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
				newColor = "weak";
				newStrength = "weak";
				break;
			case 2:
			case 3:
				newColor = "medium";
				newStrength = "medium";
				break;
			default:
				newColor = "strong";
				newStrength = "strong";
				break;
		}

		this.setState({
			score: newScore,
			color: newColor,
			strength: newStrength
		});
	}

	render() {
		return (
			<div>
				<div className={styles.inputContainer}>
					{/* <article> */}
					<label htmlFor="password">
						<h3 className={styles.label}>Password</h3>
					</label>
					<input className={styles.input} type="password" id="pass" 
					name="password" minLength="6" maxLength="32" onChange={this.handlePW} />
					{/* </article> */}
					
				</div>
				<div className="flex row">
					<h2 className="my-auto secondaryText">Password Strength:</h2>
					<article className="w-40 shadow border secondaryBorder rounded h-8 mt-1 ms-2 borderBox">
						<div className={`bg-${this.state.color} w-${this.state.score > 0 ? `${this.state.score}/5` : '0'} h-100 rounded-right`}></div>
					</article>
					<h2 className="my-auto secondaryText ms-1">{this.state.strength}</h2>
				</div>
			</div>
		);
	}
}

export default PWStrength;