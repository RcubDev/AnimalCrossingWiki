import React, { Component } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import fish from '../../data/fish.json'
// import { Grid } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Card, CardItem, Body, H1, Header, Item, Icon, Input, Button } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FishModel } from '../../models/models';
import { FishGridItem } from './FishGridItem'
import { AppLoading } from 'expo';
import styles from './FishScreen.styles';
import { FishScreenProps } from '../../models/FishScreen/FishScreenProps';
import { FishScreenState } from '../../models/FishScreen/FishScreenState';

export default class FishScreen extends Component<FishScreenProps, FishScreenState> {

    constructor(props: FishScreenProps){
        super(props);
        this.state = {
            isReady: false,
            selectedFish: null
        }
    }

    async componentDidMount() {
        this.setState({ isReady: true });
    }


    SetSelectedFish(fish: FishModel) {
        this.setState({selectedFish: fish});
    };

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
                <Container>
                    <Header searchBar rounded>
                        <Item>
                           <Icon name="ios-search"></Icon> 
                           <Input placeholder="Search"></Input>                           
                        </Item>
                        <Button transparent>
                            <Text>Advanced</Text>
                        </Button>
                    </Header>
                        <FlatList
                            data={fish}
                            renderItem={({ item, index }: {item: FishModel, index: number}) => <FishGridItem fish={item} index={index} nav={this.props.navigation} />}                            
                            numColumns={Platform.OS !== 'web' ? 3 : 5}
                            keyExtractor={(item, index) => index.toString()}                
                            >
                        </FlatList>
                </Container>
            )
        };        
}


