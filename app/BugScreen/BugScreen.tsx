import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const BugScreen = ({ navigation }) => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Bug Screen</Text>
    <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
    />
</View>);

export default BugScreen;