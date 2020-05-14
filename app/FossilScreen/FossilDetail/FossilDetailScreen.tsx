import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import FossilImages from '../../Images/FossilImages';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './FossilDetailScreenStyles';
import { ItemModel } from '../../../models/CollectionModelsV2/items';
import { ApplicationStateV2 } from '../../../models/ApplicationState/ApplicationStateV2';
import { updateItemDonated } from "../../../app/ReduxV2/CollectionActions";

interface FossilDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateItemDonated: typeof updateItemDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: ItemModel
        }
    }
}

interface FossilDetailsState {
    model: ItemModel
}

class FossilDetails extends Component<FossilDetailsProps, FossilDetailsState> {

    SetItemDonated = (donated: boolean, name: string) => {
        this.props.updateItemDonated({donated, name, type: "Fossil"});
        this.setState({model: {...this.state.model, donated}})
    }

    constructor(props: FossilDetailsProps) {
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
                        <Image source={FossilImages[this.state.model.name]}></Image>
                        <View style={styles.fossilNameViewStyling}>
                            <Text style={styles.fossilNameTextStyling}>{this.state.model.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox onPress={() => { this.SetItemDonated(!this.state.model.donated, this.state.model.name) }} style={styles.checkBoxTemp} checked={this.state.model.donated}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../../Images/Other/BellBag.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                            <Text style={styles.valueText}>{this.state.model.variants[0].sell}</Text>
                        </View>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{`Description: ${this.state.model.museumDescription}`}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState }
};
export default connect(mapStateToProps, { updateItemDonated })(FossilDetails);