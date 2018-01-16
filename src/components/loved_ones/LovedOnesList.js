import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import LovedOnesListItem from './LovedOnesListItem';
import { changeLovedOnes } from '../../actions';


class LovedOnesList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.fetchLovedOnes = this.fetchLovedOnes.bind(this);
  }

  componentDidMount() { // LATER: setup a listener to new loved one requests
    this.fetchLovedOnes();
  }

  fetchLovedOnes() {
    const user = Firebase.auth().currentUser; // LATER: change to props

    const db = Firebase.firestore();
    const lovedOnesRef = db.collection(`users/${user.uid}/lovedOnes`);

    lovedOnesRef
      .get()
      .then((querySnapshot) => {
        const lovedOnes = querySnapshot.docs;
        this.props.changeLovedOnes(lovedOnes);
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <LovedOnesListItem label={item.data().email} />
  )

  render() {
    const { lovedOnes } = this.props;

    return (
      <FlatList
        removeClippedSubviews={false}
        data={lovedOnes}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const mapStateToProps = ({ lovedOne }) => {
  const { lovedOnes } = lovedOne;
  return { lovedOnes };
};

const mapDispatchToProps = dispatch => ({
  changeLovedOnes: lovedOnes => dispatch(changeLovedOnes(lovedOnes))
});

export default connect(mapStateToProps, mapDispatchToProps)(LovedOnesList);
