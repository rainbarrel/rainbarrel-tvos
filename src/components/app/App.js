import React from 'react';
import { connect } from 'react-redux';
// import { TabBarIOS } from 'react-native';
import Logout from '../auth/Logout';
import { addUser } from '../../actions';

class App extends React.Component {
  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.props.addUser(user);
    }
  }

  render() {
    return (
      <Logout />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user))
});

export default connect(null, mapDispatchToProps)(App);
