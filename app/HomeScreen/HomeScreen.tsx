import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from './HomeScreen.styles';
import icons from '../../data/icons.json';
import Icon from '../Icon/Icon';

const HomeScreen = ({ navigation }) => 
    (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {icons.map((icon) => <Icon {...icon} navigation={navigation} />)}
                </View>
            </View>
    </View>);



export default HomeScreen;