import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import iconInterface from '../../models/iconInterface';
import styles from './Icon.styles';

const Icon = (props: iconInterface) => <View style={[styles.section, { backgroundColor: props.color }]}>
    <Button
        title={props.name}
        onPress={() => props.navigation.navigate(props.name)}
        color={props.color}
    /></View >;

export default Icon;