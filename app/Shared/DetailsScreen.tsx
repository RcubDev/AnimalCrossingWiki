import React, { Component } from 'react';
import { Text, View, CheckBox } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { updateCreatureCaught, updateCreatureDonated, updateFishCollectionFromStorage } from '../ReduxV2/CollectionActions';
import { CreatureModel } from '../../models/CollectionModelsV2/creatures';
import { ApplicationStateV2 } from '../../models/ApplicationState/ApplicationStateV2';
import { MonthsAvailable } from '../CreatureComponents/MonthsAvailable';
import { TimesAvailable } from '../CreatureComponents/TimesAvailable';

class DetailsScreen extends Component<DetailsScreenProps, DetailsScreenState> {

    constructor(props: DetailsScreenProps) {
        super(props);
        this.state = {
            model: this.props.route.params.model
        }
    }

    SetItemCaught = (caught: boolean, internalId: number) => {
        this.props.updateCreatureCaught({ caught, type: this.props.route.params.type, id: internalId });
        this.setState({ model: { ...this.state.model, caught: caught } });
    }


    SetItemDonated = (donated: boolean, internalId: number) => {
        this.props.updateCreatureDonated({ donated, type: this.props.route.params.type, id: internalId });
        this.setState({ model: { ...this.state.model, donated: donated, caught: donated === true ? true : this.state.model.caught } })
    }

    render() {
        const { appState, route } = this.props;
        const { userSettings } = appState;
        const { isNorthernHemisphere } = userSettings
        const { styles, imageSrc } = route.params;
        const { model } = this.state;
        const { name, caught, donated, internalId, activeMonths, whereHow, shadow } = model;
        const { northern, southern } = activeMonths;
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <Image source={{ uri: imageSrc }}></Image>
                        <View style={styles.nameViewStyling}>
                            <Text style={styles.nameTextStyling}>{name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox style={styles.checkBoxTemp} checked={caught} onPress={() => { this.SetItemCaught(!caught, internalId) }}></CheckBox>
                        <CheckBox style={styles.checkBoxTemp} checked={donated} onPress={() => { this.SetItemDonated(!donated, internalId) }}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../Images/Other/bellcoin.png')} style={{ width: 40, height: 40 }}></Image>
                            <Text style={styles.valueText}>{this.state.model.sell}</Text>
                        </View>
                    </View>
                    <MonthsAvailable monthsAvailable={isNorthernHemisphere ? northern : southern}></MonthsAvailable>
                    <View style={styles.locationAndTimeContainer}>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{'Location Image'}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{whereHow}</Text>
                        </View>
                        <TimesAvailable timesAvailable={isNorthernHemisphere ? northern : southern}></TimesAvailable>
                    </View>
                    {('shadow' in model) && <View style={styles.shadowSizeContainer}>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{'Shadow Image'}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{shadow}</Text>
                        </View>
                    </View>}
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{'Blathers Says: Not available'}</Text>
                    </View>
                </View>
            </ScrollView >
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
})(DetailsScreen);

interface DetailsScreenProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateCreatureCaught: typeof updateCreatureCaught,
    updateCreatureDonated: typeof updateCreatureDonated,
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: CreatureModel,
            imageSrc: string,
            styles: any,
            type: string
        }
    }
}

interface DetailsScreenState {
    model: CreatureModel
}

