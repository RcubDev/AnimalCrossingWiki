import React, { Component } from 'react';
import { Text, View, Button, Image, Platform } from 'react-native';
import fish from '../../data/fish.json'
// import { Grid } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FishModel } from '../../models/models';
import { FishGridItem } from './FishGridItem'


const FishScreen = ({ navigation }: any) => {    
return (
    <Container>
        <View style={{backgroundColor:"red", height:'40%'}}>
        </View>
            <FlatList
                data={fish}
                renderItem={({ item, index }: {item: FishModel, index: number}) => <FishGridItem fish={item} index={index} />}                            
                numColumns={Platform.OS !== 'web' ? 3 : 5}                
                >
            </FlatList>    
    </Container>
  )
};

export default FishScreen;