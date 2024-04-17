import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {
  usePeers,
  useJellyfishClient,
} from '@jellyfish-dev/react-native-client-sdk';
import InCallButton from '../components/InCallButton.tsx';
import VideosGrid from '../components/VideosGrid.tsx';

interface RoomScreenProps {
  navigation: NavigationProp<any>;
}

function RoomScreen({navigation}: RoomScreenProps): React.JSX.Element {
  const peers = usePeers();
  const tracks = useMemo(
    () =>
      peers.flatMap(peer =>
        peer.tracks.filter(
          t => t.metadata.type !== 'audio' && (t.metadata.active ?? true),
        ),
      ),
    [peers],
  );

  const {cleanUp} = useJellyfishClient();

  const onDisconnectPress = () => {
    cleanUp();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VideosGrid tracks={tracks} />
      <InCallButton
        type="disconnect"
        iconName="phone-hangup"
        onPress={onDisconnectPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1FAFE',
    padding: 24,
  },
  videoContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  video: {width: 200, height: 200},
});

export default RoomScreen;
