import React from 'react';
import Firebase from 'firebase';
import 'firebase/firestore';
import { Image, Text } from 'react-native';

class Raindrops extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURLs: [] };
  }

  componentDidMount() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;

    const db = Firebase.firestore();
    const raindropsRef = db.collection(`users/${user.uid}/raindrops`);

    raindropsRef.onSnapshot((querySnapshot) => {
      const imageURLs = [];

      querySnapshot.forEach((doc) => {
        imageURLs.push(doc.data().downloadURL);
      });

      this.setState({ imageURLs });
    });
  }

  render() {
    if (this.state.imageURLs.length > 0) {
      return (
        <Image
          style={{ flex: 1 }}
          source={{ uri: this.state.imageURLs[0] }}
        />
      );
    }

    return (
      <Text>
        Raindrops
      </Text>
    );
  }
}

export default Raindrops;
