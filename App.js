import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import Exchange from './screens/Exchange';
import {Image} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import customSidebarMenu from './components/customSidebarMenu';
import SettingScreen from './screens/SettingScreen';
import {createStackNavigator} from 'react-navigation-stack';
import ReceiverDetail from './screens/ReceiverDetail';
import My_barters from './screens/My_barters';
import NotificationScreen from './screens/NotificationsScreen';







 const AppStackNavigator = createStackNavigator({
  BookDonateList : {
    screen : HomeScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  RecieverDetails : {
    screen : ReceiverDetail,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'BookDonateList'
  }
);

export default function App() {
  return (
    <AppContainer/>
  );
}



const TabNavigator = createBottomTabNavigator({
  HomeScreen: {screen: AppStackNavigator},
  Exchange: {screen: Exchange},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName === "HomeScreen"){
        return(
          <Image
          source={require("./assets/home.png")}
          style={{width:20, height:20}}
        />
        )

      }
      else if(routeName === "Exchange"){
        return(
          <Image
          source={require("./assets/exchange.png")}
          style={{width:20, height:20,}}
        />)

      }
    }
  })
}
);

const AppDrawerNavigator = createDrawerNavigator({
  Home:{
      screen : TabNavigator,
      navigationOptions:{
        drawerIcon : <Icon name="home" type ="fontawesome5" />
      }
      
      },
      Settings:{
          screen : SettingScreen,
          navigationOptions:{
            drawerIcon : <Icon name="settings" type ="fontawesome5" />
          }
          },
          My_barters:{screen:My_barters}, 
          
          Notifications:{screen:NotificationScreen}

      
      
  },
      {
          contentComponent: customSidebarMenu
      },
      {
        initialRouteName : 'Home'
      }
    );

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer : {screen: AppDrawerNavigator},
  BottomTab:{screen: TabNavigator},
 
})

const AppContainer =  createAppContainer(switchNavigator);