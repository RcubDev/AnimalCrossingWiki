import React from 'react';
import { Text, View } from 'react-native';
import styles from './HomeScreen.styles';
import icons from '../../data/icons.json';
import Icon from '../Icon/Icon';
import { Button, Container } from 'native-base';

const HomeScreen = ({ navigation }: any) =>
    (
        <Container style={styles.container}>
            <Button onPress={() => navigation.navigate("Fish")} style={styles.fishButtonStyle}>
                <Text style={styles.fishButtonTextStyle}>{"Fish"}</Text>
            </Button>
            <Button style={styles.bugButtonStyle}>
                <Text style={styles.fishButtonTextStyle}>{"Bugs"}</Text>
            </Button>
        </Container>
    );
export default HomeScreen;