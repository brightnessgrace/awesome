import React, { Component } from 'react';
import {View, Text, Image, Animated, StyleSheet ,LogBox, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Actions, Router, Scene} from 'react-native-router-flux';
import Logo from '../../images/logo.png';
import AuthScene from './AuthScene';



const Scenesaver  = () => {
    return(
  
      <Router>
      <Scene>
  
      <Scene key="auth" component={AuthScene} />
  
      </Scene>
  
  </Router>
    );
  
  }

  
const switchtoAuth = () => {


 Actions.replace('auth');
};
       
class LoadingScene extends Component {
 
    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    };

    componentDidMount() {
      
        const {LogoAnime,LogoText} = this.state;

       LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        //parrallel animation straight down or up
        Animated.parallel([
        Animated.spring (LogoAnime, {
         toValue: 1,
         tension:10,
         friction:2,
         duration:1000,

        }).start(),
        
        Animated.timing(LogoText, {
            toValue: 1,
            duration:120,
            }),

        ]).start(() => {
            this.setState({
                loadingSpinner: true,
            });
      
            setTimeout(switchtoAuth, 120);

        });
    

    }
       
    
  render () {  
    return (
            
            <View style ={styles.container}>
                <Animated.View style = {{
                    opacity: this.state.logoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange:[0, 1],
                        outputRange: [80 ,0]
                    })
                }}>

                <Image source = {Logo} 
                
                 style = {styles.image}/>

              </Animated.View>

                <Text style = {styles.logoText}>
                  
                 

                </Text>

            </View>
        );
    
  }
}


export default LoadingScene;