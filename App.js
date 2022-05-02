import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';
import WebViewComp from './components/WebViewComp'


export default class App extends Component {


    constructor()
    {
        super();
        this.state={
            conn_status:"",
        }

        this.Check_Internet();
    }




    Check_Internet=async()=>{

        await NetInfo.fetch().then(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);

            if(state.isConnected==true)
            {
                this.setState({
                    conn_status:"online"
                })
            }
            else
            {
                this.setState({
                    conn_status:"offline"
                })   
            }
          });
    }


    render() {
       

        if(this.state.conn_status=="online")
        {
            return (
                <WebViewComp/>
            )
        }
        else
        {
            return (
                <View style={styles.container}>
                  <LottieView source={require('./assets/99311-no-internet.json')} autoPlay loop />
                  <Button  style={{marginTop:250,backgroundColor:"#000",padding:5}}  icon="wifi" mode="contained" onPress={this.Check_Internet}>
                    retry
                </Button>

                </View>
            )
        }
    }
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        flexDirection:"column",
        alignItems:"center",
    }
})