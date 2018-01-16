import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import App from '../app/App';

import { Input, Button, Spinner } from '../common';
import {
  changeEmail,
  changePassword,
  changePasswordConfirmation,
  signupUserAttempt,
  signupUserFailure
} from '../../actions';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleButtonPress() {
    const { email, password, passwordConfirmation } = this.props;

    if (password === passwordConfirmation) {
      this.props.signupUserAttempt(email, password);
    } else {
      this.props.signupUserFailure('Passwords do not match');
    }
  }

  renderError() {
    const { errorStyle } = styles;
    const { error } = this.props;

    if (error.length > 0) {
      return (
        <Text style={errorStyle}>
          {error}
        </Text>
      );
    }

    return null;
  }

  renderButton() {
    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.handleButtonPress}>
        Signup
      </Button>
    );
  }

  render() {
    const { user } = this.props;
    const { containerStyle, titleStyle, buttonWrapperStyle } = styles;

    if (user) {
      return <App />;
    }

    return (
      <View style={containerStyle}>
        <Text style={titleStyle}>
          Rainbarrel
        </Text>

        <Input
          label="Email"
          placeholder="email@email.com"
          value={this.props.email}
          onChangeText={text => this.props.changeEmail(text)}
          autofocus
        />

        <Input
          label="Password"
          placeholder="Password"
          value={this.props.password}
          onChangeText={text => this.props.changePassword(text)}
          secureTextEntry
        />

        <Input
          label="Password Confirmation"
          placeholder="Password Confirmation"
          value={this.props.passwordConfirmation}
          onChangeText={text => this.props.changePasswordConfirmation(text)}
          secureTextEntry
        />

        {this.renderError()}

        <View style={buttonWrapperStyle}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    backgroundColor: '#fdf034',
    flex: 1
  },
  titleStyle: {
    marginTop: 20,
    fontSize: 70
  },
  errorStyle: {
    fontSize: 140,
    alignSelf: 'center',
    color: 'red'
  },
  buttonWrapperStyle: {
    marginTop: 200
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, passwordConfirmation, loading, error, user } = auth;
  return { email, password, passwordConfirmation, loading, error, user };
};

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  changePasswordConfirmation: (passwordConfirmation) => {
    dispatch(changePasswordConfirmation(passwordConfirmation));
  },
  signupUserAttempt: (email, password) => {
    dispatch(signupUserAttempt({ email, password }));
  },
  signupUserFailure: (errorMsg) => {
    signupUserFailure(dispatch, errorMsg);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
