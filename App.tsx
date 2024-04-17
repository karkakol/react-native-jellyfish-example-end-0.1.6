import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JellyfishContextProvider} from '@jellyfish-dev/react-native-client-sdk';
import ConnectScreen from './screens/Connect';
import RoomScreen from './screens/Room';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <JellyfishContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Connect" component={ConnectScreen} />
          <Stack.Screen name="Room" component={RoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </JellyfishContextProvider>
  );
}

export default App;
