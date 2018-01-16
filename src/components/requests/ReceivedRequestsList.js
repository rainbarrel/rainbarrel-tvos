import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { changeReceivedRequests, removeReceivedRequest } from '../../actions';
import ReceivedRequestListItem from './ReceivedRequestsListItem';


class ReceivedRequestsList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.fetchPendingRequests = this.fetchPendingRequests.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.addMyLovedOne = this.addMyLovedOne.bind(this);
    this.addTheirLovedOne = this.addTheirLovedOne.bind(this);
  }

  componentDidMount() { // LATER: setup a listener to new loved one requests
    this.fetchPendingRequests();
  }

  onAccept(request) {
    const date = new Date();

    request.ref.set({
      status: 'accepted',
      updatedAt: date
    }, { merge: true });
    this.props.removeReceivedRequest(request);

    this.addMyLovedOne(request);
    this.addTheirLovedOne(request);
  }

  onDecline(request) {
    const date = new Date();

    request.ref.set({
      status: 'declined',
      updatedAt: date
    }, { merge: true });
    this.props.removeReceivedRequest(request);
  }

  addMyLovedOne(request) { // Not static yet. may use 'this' in promises
    const { nothing } = this.props; // Just to get rid of red; remove later
    const id = request.data().requesterId;
    const email = request.data().requesterEmail;
    const date = new Date();

    const lovedOneDoc = {
      id,
      email,
      createdAt: date
    };

    const db = Firebase.firestore();
    const user = Firebase.auth().currentUser; // LATER: change to props
    const myLovedOnesRef = db.collection(`users/${user.uid}/lovedOnes`);

    myLovedOnesRef.add(lovedOneDoc)
      .then(() => {
        // success. doing nothing OK for now.
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  addTheirLovedOne(request) { // Not static yet. may use 'this' in promises
    const { nothing } = this.props;
    const user = Firebase.auth().currentUser; // LATER: change to props

    const id = user.uid;
    const email = user.email;
    const date = new Date();

    const lovedOneDoc = {
      id,
      email,
      createdAt: date
    };

    const db = Firebase.firestore();
    const requesterId = request.data().requesterId;
    const theirLovedOnesRef = db.collection(`users/${requesterId}/lovedOnes`);

    theirLovedOnesRef.add(lovedOneDoc)
      .then(() => {
        // success. doing nothing OK for now.
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  fetchPendingRequests() {
    const user = Firebase.auth().currentUser; // LATER: change to props

    const db = Firebase.firestore();
    const requestsRef = db.collection('requests');
    const requestsQuery = requestsRef.where(
      'requesteeId', '==', user.uid
    ).where(
      'status', '==', 'pending'
    );

    requestsQuery
      .get()
      .then((querySnapshot) => {
        const requests = querySnapshot.docs;
        this.props.changeReceivedRequests(requests);
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <ReceivedRequestListItem
      label={item.data().requesterEmail}
      onAccept={() => this.onAccept(item)}
      onDecline={() => this.onDecline(item)}
    />
  )

  render() {
    const { receivedRequests } = this.props;

    return (
      <FlatList
        removeClippedSubviews={false}
        data={receivedRequests}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { receivedRequests } = request;
  return { receivedRequests };
};

const mapDispatchToProps = dispatch => ({
  changeReceivedRequests: requests => dispatch(changeReceivedRequests(requests)),
  removeReceivedRequest: request => dispatch(removeReceivedRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedRequestsList);
