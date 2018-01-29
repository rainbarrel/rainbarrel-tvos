import React from 'react';
import Firebase from 'firebase';
import { Image, Text } from 'react-native';

class Raindrops extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: null };
  }

  componentDidMount() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;

    const db = Firebase.database();
    const raindropsRef = db.ref(`users/${user.uid}`);

    raindropsRef.on('child_added', (snapshot) => {
      const newImage = snapshot.val();
      this.setState({ imageURL: newImage.downloadURL });
    });
  }

  render() {
    if (this.state.imageURL) {
      return (
        <Image
          style={{ flex: 1 }}
          source={{ uri: this.state.imageURL }}
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
