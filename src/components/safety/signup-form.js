import React from 'react';
import classnames from "classnames";
import reactGA from 'react-ga';

var ErrorMessage = React.createClass({
  render: function() {
    if (this.props.children) {
      return (
        <p className="error-message">{this.props.children}</p>
      );
    }
    return null;
  }
});

var SignupForm = React.createClass({
  getInitialState: function() {
    return {
      emailInput: "",
      emailInputError: "",
      privacyCheckboxChecked: false,
      privacyCheckboxError: "",
      submissionError: "",
      submitting: false
    };
  },
  onEmailChange: function(e) {
    this.setState({
      emailInput: e.target.value,
      emailInputError: ""
    });
  },
  onPrivacyChange: function(e) {
    this.setState({
      privacyCheckboxChecked: e.target.checked,
      privacyCheckboxError: ""
    });
  },
  onSubmit: function() {
    var valid = true;

    if (this.state.submitting) {
      return;
    }

    var privacyCheckboxError = "";
    var emailError = "";

    if (!this.state.privacyCheckboxChecked) {
      valid = false;
      privacyCheckboxError = 'This field is required.';
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Privacy Policy Error"
      });
    }
    if (!this.state.emailInput.trim()) {
      valid = false;

      emailError = 'This field is required.';
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Empty Email Error"
      });
    } else if (!this.emailInput.validity.valid) {
      valid = false;

      emailError = 'Please enter a valid email address.';
      reactGA.event({
        category: "Signup",
        action: "Form Error",
        label: "Invalid Email Error"
      });
    }

    if (valid) {
      // submit
    } else {
      this.setState({
        privacyCheckboxError: privacyCheckboxError,
        emailInputError: emailError
      });
    }
  },
  render: function() {
    var buttonClassName = classnames(`button`, {
      "submitting": this.state.submitting
    });

    return (
      <div className="signup-form">
        <div className="form-copy">
          <div>get your security on.</div>
          <div><span className="white">subscribe</span> and never miss</div>
          <div>an update from mozilla.</div>
        </div>
        <input ref={(input) => { this.emailInput = input; }} value={this.state.emailInput} onChange={this.onEmailChange} className="email-input" placeholder="your email here" type="email"/>
        <ErrorMessage>{this.state.emailInputError}</ErrorMessage>
        <label>
          <input className="privacy-checkbox" type="checkbox" onChange={this.onPrivacyChange} value={this.state.privacyCheckboxChecked}/>
          <span>
            I'm ok with mozilla handling my info as explained in this <a href="">privacy notice</a>
          </span>
        </label>
        <ErrorMessage>{this.state.privacyCheckboxError}</ErrorMessage>
        <ErrorMessage>{this.state.submissionError}</ErrorMessage>
        <div>
          <button onClick={this.onSubmit} className={buttonClassName}>subscribe</button>
          <button className="secondary" onClick={this.props.onClose}>maybe later</button>
        </div>
      </div>
    );
  }
});

module.exports = SignupForm;