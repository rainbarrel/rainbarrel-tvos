import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { App } from '../../initialization/app';
import { Input, Button, Spinner } from '../global';
import { changeEmail, changePassword, loginUserAttempt } from '../../actions';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleButtonPress() {
    const { email, password } = this.props;
    this.props.loginUserAttempt(email, password);
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
        Login
      </Button>
    );
  }

  render() {
    const { user } = this.props;
    const { containerStyle, titleStyle, loginStyle } = styles;

    if (user) {
      return <App />;
    }

    return (
      <View style={containerStyle}>
        <Text style={titleStyle}>
          Rainbarrel
        </Text>

        <Text style={loginStyle}>
          Login
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

        {this.renderError()}
        {this.renderButton()}
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
    marginTop: 70,
    fontSize: 40
  },
  loginStyle: {
    fontSize: 80
  },
  errorStyle: {
    fontSize: 100,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error, user } = auth;
  return { email, password, loading, error, user };
};

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  loginUserAttempt: (email, password) => {
    dispatch(loginUserAttempt({ email, password }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
