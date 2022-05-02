import React, {Component} from 'react'
import {View,BackHandler,Platform,StyleSheet} from 'react-native';
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
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  progress:{
    top:35
  }
});
