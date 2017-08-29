import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import firebase from 'firebase';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Login from './Login';
import Navigation from "./Navigation";
import Loader from "./Loader";
import reducers from '../reducers/PeopleReducer'


const store = createStore(reducers);


export default class App extends Component {

    state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCfYWzyF675n454viaAt5XPNea9-ifDO4E",
            authDomain: "crmtest-3ca7a.firebaseapp.com",
            databaseURL: "https://crmtest-3ca7a.firebaseio.com",
            projectId: "crmtest-3ca7a",
            storageBucket: "crmtest-3ca7a.appspot.com",
            messagingSenderId: "49226780768"
        })

        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                this.setState({loggedIn: true})
            } else {
                this.setState({loggedIn: false})
            }

        })
    }

    renderInitialView() {
        switch (this.state.loggedIn) {
            case true:
                return <Navigation/>
            case false:
                return <Login/>
            default:
                return <Loader size="large"/>
        }
    }


    render() {

        if (this.state.loggedIn) {
            return (

                <Provider store={store}>

                    {this.renderInitialView()}

                </Provider>
            );

        } else {
            return (

                <Provider store={store}>


                    <View style={styles.container}>

                        {this.renderInitialView()}

                    </View>

                </Provider>


            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

});

