import React, { Component } from 'react';
import { Text, View, Button, Image, Platform } from 'react-native';
import fish from '../../data/fish.json'
// import { Grid } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FishModel } from '../../models/models';
import { FishGridItem } from './FishGridItem'

export default class FishScreen extends Component<any, {selectedFish: FishModel | null}> {

    constructor(props: any){
        super(props);
        this.state = {
            selectedFish: null
        }
    }

    SetSelectedFish(fish: FishModel) {
        this.setState({selectedFish: fish});
    };

    render(){
        return (
                <Container>
                    <View style={{backgroundColor:"red", height:'40%'}}>
                        <Text>
                            {this.state.selectedFish !== null ? this.state.selectedFish?.fishName : "Not Availible"}
                        </Text>
                    </View>
                        <FlatList
                            data={fish}
                            renderItem={({ item, index }: {item: FishModel, index: number}) => <FishGridItem fish={item} index={index} func={() => this.SetSelectedFish(item)} />}                            
                            numColumns={Platform.OS !== 'web' ? 3 : 5}                
                            >
                        </FlatList>    
                </Container>
            )
        };    
    
    
}


