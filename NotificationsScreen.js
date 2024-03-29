import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text,TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableFlatList from '../components/SwipealeFlatlist'
import db from '../config';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    this.requestRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem =({item,i}) =>{
    return(
  
      <View style ={{flex:1,paddingTop:30}}>
  
      <ListItem bottomDivider>
        <ListItem.Content>
    
      <ListItem.Title style ={{color : 'black' , fontWeight:'bold'}}>{item.item_name}
      </ListItem.Title>
      <ListItem.Subtitle >{item.message}</ListItem.Subtitle>       
      </ListItem.Content>
      
  
     
  
      </ListItem>
      </View>
    )
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          {/* <MyHeader title={"Notifications"} navigation={this.props.navigation}/> */}
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatList allNotifications={this.state.allNotifications}  />
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})