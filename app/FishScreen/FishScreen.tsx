import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const FishScreen = ({ navigation }) => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Fish Screen</Text>
    <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
    />
</View>);

export default FishScreen;