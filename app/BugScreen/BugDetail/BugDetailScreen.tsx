import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import BugImages from '../../Images/BugImages';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './BugDetailScreenStyles';
import { BugModel } from '../../../models/CollectionModels/BugModel';
import { ApplicationStateV2 } from '../../../models/ApplicationState/ApplicationStateV2';
import { CreatureModel } from '../../../models/CollectionModelsV2/creatures';
import { updateCreatureCaught, updateCreatureDonated } from "../../../app/ReduxV2/CollectionActions";

interface BugDetailsProps {
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

interface BugDetailsState {
    model: CreatureModel
}

class BugDetails extends Component<BugDetailsProps, BugDetailsState> {

    SetItemCaught = (caught: boolean, internalId: number) => {
        this.props.updateCreatureCaught({caught, type: "Bug", id: internalId});
        this.setState({model: {...this.state.model, caught: caught}});
    }


    SetItemDonated = (donated: boolean, internalId: number) => {
        this.props.updateCreatureDonated({ donated, type: "Bug", id: internalId });
        this.setState({model: {...this.state.model, donated: donated, caught: donated === true ? true : this.state.model.caught}})
    }

    constructor(props: BugDetailsProps) {
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
                        <Image source={BugImages[this.state.model.name]}></Image>
                        <View style={styles.bugNameViewStyling}>
                            <Text style={styles.bugNameTextStyling}>{this.state.model.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox style={styles.checkBoxTemp} checked={this.state.model.caught} onPress={() => {this.SetItemCaught(!this.state.model.caught, this.state.model.internalId)}}></CheckBox>
                        <CheckBox style={styles.checkBoxTemp} checked={this.state.model.donated} onPress={() => {this.SetItemDonated(!this.state.model.donated, this.state.model.internalId)}}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../../Images/Other/BellBag.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                            <Text style={styles.valueText}>{this.state.model.value}</Text>
                        </View>
                    </View>
                    <View style={styles.monthContainer}>
                        
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
                            <Text style={{ fontFamily: 'Confortaa' }}>{this.state.model.activeMonths.northern[0].activeHours[0]}</Text>
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
                        <Text style={styles.blathersSaysText}>{"Blathers Says: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ligula quis imperdiet pharetra. Nunc tincidunt lorem eget nibh vulputate gravida. Aenean a posuere neque. In finibus nunc non turpis fermentum, malesuada sodales odio porta. Praesent et tellus felis. Aenean eget urna ante. Morbi interdum dui dictum, iaculis ante pretium, laoreet diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin eleifend nibh sed molestie. Sed malesuada porttitor ultrices. Vivamus lobortis, eros non interdum maximus, lorem mauris feugiat ligula, blandit interdum neque erat vitae leo. Nullam erat leo, feugiat quis metus nec, lacinia laoreet lacus. Fusce eros lorem, egestas sit amet tincidunt id, lacinia eget nulla. Praesent commodo pharetra dui sed ornare."}</Text>
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
export default connect(mapStateToProps, {
    updateCreatureCaught,
    updateCreatureDonated,
  })(BugDetails);
  