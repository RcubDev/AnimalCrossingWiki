import React, { Component } from 'react';
import iconInterface from '../../models/iconInterface';
import styles from './Icon.styles';
import { Button, Text, View } from 'native-base';

const Icon = (props: iconInterface) => <View key={props.name}>
    <Button
        onPress={() => props.navigation.navigate(props.name)}
    >
        <Text>{props.name}</Text>
    </Button>
</View>
    ;

export default Icon;