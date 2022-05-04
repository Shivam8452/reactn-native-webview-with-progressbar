import React, {Component} from 'react'
import {View,BackHandler,Platform,StyleSheet, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import * as Progress from 'react-native-progress';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true, progress:0.3 };
  }
  
  showSpinner() {
    this.setState({ visible: true, progress:0.6 });
}
setProgress(){
  this.setState({  progress:1 });
}
hideSpinner() {
    this.setState({  visible: false });
} 
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }
  componentDidMount(){  
    var that = this;  
    setTimeout(function(){  
      that.hideSpinner();  
    }, 5000);  
   }  
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }
  render() {
    let Splash_Screen = (  
      <View style={styles.SplashScreen_RootView}>  
          <View style={styles.SplashScreen_ChildView}>  
                <Image source={require('../assets/logo2.png')}  
             style={{width:'100%', height: '100%', resizeMode: 'contain',backgroundColor: '#fff'}} />  
         </View>  
      </View> )  
    return (
      <View style={this.state.visible === true ? styles.stylOld : styles.styleNew}>
        {this.state.visible ? (
          <Progress.Bar
          progress={this.state.progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color='#3471eb'
          style={styles.progress}
        />
        ) : null}
        <WebView
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
          // startInLoadingState
          automaticallyAdjustContentInsets={false}
          source={{uri:'https://bandbajabarat.herokuapp.com/' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={()=>(this.state.visible === true) ? Splash_Screen : null  }
          style={{marginTop: 35}}
          onLoadStart={() => (this.showSpinner())}
          onLoadProgress={() => (this.setProgress())}
          onLoad={() => (this.hideSpinner())}
        /> 
    </View>
    )
  }
  
}
const styles = StyleSheet.create({
  stylOld: {
    flex: 1
  },
  styleNew: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  SplashScreen_RootView:  
    {  
        justifyContent: 'center',  
        flex:1,    
        position: 'absolute',  
        width: '100%',  
        height: '100%',  
      },  
   
    SplashScreen_ChildView:  
    {  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#fff',  
        flex:1,  
    },  
  progress:{
    top:35
  }
});
