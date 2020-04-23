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
import { FishCardModel } from '../../models/FishScreen/FishCardModel';

let items: Array<FishCardModel> = fish.map(x => { return { fish:x, caught: false, donated: false} } );

export default class FishScreen extends Component<FishScreenProps, FishScreenState> {

    

    constructor(props: FishScreenProps){
        super(props);
        this.state = {
            isReady: false,
            fishList: items
        }
        //this.SetItemCaught = this.SetItemCaught.bind(this);
    }

    async componentDidMount() {
        this.setState({ isReady: true });
    }

    SetItemCaught = (caught: boolean, index: number) => {
        console.log('caught');
        var list = this.state.fishList ? this.state.fishList : [];
        list[index].caught = caught;
        this.setState({fishList: list});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        console.log('donated');
        var list = this.state.fishList ? this.state.fishList : [];
        list[index].donated = donated;
        if(donated){
            list[index].caught = donated;
        }
        this.setState({fishList: list});
    }

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
                <Container style={{backgroundColor: "#c2b280"}}>
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
                            data={this.state.fishList}
                            renderItem={({ item, index }: {item: FishCardModel, index: number}) => <FishGridItem model={item} index={index} nav={this.props.navigation} 
                                            updateFishCaught={this.SetItemCaught} updateFishDonated={this.SetItemDonated} />}                            
                            numColumns={Platform.OS !== 'web' ? 3 : 5}
                            keyExtractor={(item, index) => index.toString()}                
                            >
                        </FlatList>
                </Container>
            )
        };        
}


