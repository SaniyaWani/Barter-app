import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView,
    Alert,
    TextInput, 
    Modal,
    FlatList,
} from 'react-native';
import db from "../config";
import firebase from "firebase";
import { ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import ReceiverDetail from './ReceiverDetail';

export default class My_barters extends React.Component {
    constructor(){
        super()
        this.state = {
          userId : firebase.auth().currentUser.email,
          allBarters : []
        }
        this.requestRef= null
      }
   
   
      getAllBarters =()=>{
        this.requestRef = db.collection("all_Barters").where("donor_id" ,'==', this.state.userId)
        .onSnapshot((snapshot)=>{
          var allBarters = snapshot.docs.map(document => document.data());
          this.setState({
            allBarters : allBarters,
          });
        })
      }
   
      keyExtractor = (item, index) => index.toString()
   
      renderItem =({item,i}) =>{
        return(
          <View style ={{flex:1,paddingTop:30}}>
      
          <ListItem bottomDivider>
            <ListItem.Content>
          <ListItem.Title style ={{color : 'black' , fontWeight:'bold'}}>{item.item_name}
          </ListItem.Title>
          <ListItem.Subtitle >{"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}</ListItem.Subtitle>       
          </ListItem.Content>
          
          <TouchableOpacity
          style ={styles.button}
          onPress={()=>{this.sendItem(item)}}>
            <Text>Exchange</Text>
          </TouchableOpacity>
          </ListItem>
          </View>
        )
      }
   
      sendItem=(itemDetails)=>{
        if(itemDetails.request_status === "Item Sent"){
          var requestStatus = "Donor Interested"
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            "request_status" : "Donor Interested"
          })
          this.sendNotification(itemDetails,requestStatus)
        }
        else{
          var requestStatus = "Item Sent"
          db.collection("all_donations").doc(itemDetails.doc_id).update({
            "request_status" : "Item Sent"
          })
          this.sendNotification(itemDetails,requestStatus)
        }
      }

      sendNotification=(itemDetails,requestStatus)=>{
        var requestId = itemDetails.request-id
        var donorId = itemDetails.donor_id
        db.collection("all_notifications")
        .where("request-id","==", requestId)
        .where("donor_id","==",donorId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var message = ""
            if(requestStatus === "Book Sent"){
              message = this.state.donorName + " sent you book"
            }else{
               message =  this.state.donorName  + " has shown interest in donating the book"
            }
            db.collection("all_notifications").doc(doc.id).update({
              "message": message,
              "notification_status" : "unread",
              "date"                : firebase.firestore.FieldValue.serverTimestamp()
            })
          });
        })
      }
   
   
      componentDidMount(){
        this.getAllBarters()
      }
   
      componentWillUnmount(){
        this.requestRef();
      }
   
      render(){
        return(
          <View style={{flex:1}}>
            {/* <MyHeader navigation={this.props.navigation} title="My_barters"/> */}
            <View style={{flex:1}}>
              {
                this.state.allBarters.length === 0
                ?(
                  <View style={styles.subtitle}>
                    <Text style={{ fontSize: 20}}>List of all Barters</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allBarters}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
      }
   
   
   const styles = StyleSheet.create({
     button:{
       width:100,
       height:30,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:"#ff5722",
       shadowColor: "#000",
       shadowOffset: {
          width: 0,
          height: 8
        },
       elevation : 16
     },
     subtitle :{
       flex:1,
       fontSize: 20,
       justifyContent:'center',
       alignItems:'center'
     }
   })