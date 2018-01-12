import React from 'react';
import { connect } from 'react-redux';
import { TabBarIOS } from 'react-native';
import LovedOnes from '../loved_ones/LovedOnes';
import Raindrops from '../raindrops/Raindrops';
import Account from '../account/Account';
import { addUser } from '../../actions';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { appSelection: 'raindrops' };
    this.changeAppSelection = this.changeAppSelection.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    if (user) {
      this.props.addUser(user);
    }
  }

  changeAppSelection(appSelection) {
    if (this.state.appSelection !== appSelection) {
      const newState = { appSelection };
      this.setState(newState);
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="red"
        barTintColor="#00a1e0"
      >
        <TabBarIOS.Item
          title="Loved Ones"
          selected={this.state.appSelection === 'loved ones'}
          onPress={() => this.changeAppSelection('loved ones')}
        >
          <LovedOnes />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Raindrops"
          selected={this.state.appSelection === 'raindrops'}
          onPress={() => this.changeAppSelection('raindrops')}
        >
          <Raindrops />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Account"
          selected={this.state.appSelection === 'account'}
          onPress={() => this.changeAppSelection('account')}
        >
          <Account />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user))
});

export default connect(null, mapDispatchToProps)(App);
