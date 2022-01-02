import React, { useEffect } from 'react'
import { View, Button, Alert } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

function App() {

  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("remoteMessage",JSON.stringify(remoteMessage))
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);


  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  }

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  async function localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    notifee.displayNotification({
      title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body:
        'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: { id: 'dance' },
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: { id: 'cry' },
          },
        ],
      },
    });
    
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Button title="Display Notification" onPress={() => localDisplayNotification()} />
    </View>
  );
}

export default App
