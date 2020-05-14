import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import FishImages from '../Images/FishImages';
import { connect } from 'react-redux';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { ApplicationState } from '../../models/ApplicationState/ApplicationState';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './FishDetailScreenStyles';
import { updateCreatureCaught, updateCreatureDonated, updateFishCollectionFromStorage } from "../../app/ReduxV2/CollectionActions";
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ApplicationStateV2 } from '../../models/ApplicationState/ApplicationStateV2';


interface FishDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateCreatureCaught: typeof updateCreatureCaught,
    updateCreatureDonated: typeof updateCreatureDonated,
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: CreatureModel
        }
    }
}

interface FishDetailsState {
    model: CreatureModel
}



class FishDetails extends Component<FishDetailsProps, FishDetailsState> {
    
    SetItemCaught = (caught: boolean, internalId: number) => {
        this.props.updateCreatureCaught({caught, type: "Fish", id: internalId});
        this.setState({model: {...this.state.model, caught: caught}});
    }


    SetItemDonated = (donated: boolean, internalId: number) => {
        this.props.updateCreatureDonated({ donated, type: "Fish", id: internalId });
        this.setState({model: {...this.state.model, donated: donated, caught: donated === true ? true : this.state.model.caught}})
    }

    constructor(props: FishDetailsProps) {
        super(props);
        this.state = {
            model: this.props.route.params.model
        }
    }

    render() {
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <Image source={FishImages[this.state.model.name]}></Image>
                        <View style={styles.fishNameViewStyling}>
                            <Text style={styles.fishNameTextStyling}>{this.state.model.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox style={styles.checkBoxTemp} checked={this.state.model.caught} onPress={() => {this.SetItemCaught(!this.state.model.caught, this.state.model.internalId)}}></CheckBox>
                        <CheckBox style={styles.checkBoxTemp} checked={this.state.model.donated} onPress={() => {this.SetItemDonated(!this.state.model.donated, this.state.model.internalId)}}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../Images/Other/BellBag.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                            <Text style={styles.valueText}>{this.state.model.sell}</Text>
                        </View>
                    </View>
                    <View style={styles.monthContainer}>
                        {/* TODO: Setup Month View */}
                    </View>
                    <View style={styles.locationAndTimeContainer}>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Location Image"}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{this.state.model.whereHow}</Text>
                        </View>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Clock Image"}</Text>
                            {/* Setup Time Parser */}
                            <Text style={{ fontFamily: 'Confortaa' }}>{`${this.state.model.activeMonths.northern[0].activeHours[0]}` }</Text>
                        </View>
                    </View>
                    <View style={styles.shadowSizeContainer}>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Shadow Image"}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{this.state.model.shadow}</Text>
                        </View>
                    </View>
                    <View style={styles.rarityContainer}>
                        <View style={styles.stylesRarityTextContainer}>
                            {/* TODO: Replace * with images of stars. */}
                            <Text>{"Rarity"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                        </View>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{"Not available"}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
  };
  
  export default connect(mapStateToProps, {
    updateCreatureCaught,
    updateCreatureDonated,
    updateFishCollectionFromStorage
  })(FishDetails);
  