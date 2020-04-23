import React, { Component } from 'react';
import iconInterface from '../../models/iconInterface';
import styles from './Icon.styles';
import { Button, Text, View } from 'native-base';

const Icon = (props: iconInterface) => <View key={props.name} style={[styles.section, { backgroundColor: props.color }]}>
        <Button
            onPress={() => props.navigation.navigate(props.name)}
            style={{backgroundColor: props.color}}>
        <Text style={{color: props.textColor}}>{props.name}</Text>
        </Button>
        </View>
;

export default Icon;