import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { updateItemCatalogged } from "../../../app/ReduxV2/CollectionActions";
import { ItemModel, ItemVariantModel } from "../../../models/CollectionModelsV2/items";
import { ApplicationStateV2 } from "../../../models/ApplicationState/ApplicationStateV2";
import { NavigationScreenProp } from "react-navigation";
import { Image, TouchableHighlightBase } from 'react-native'
import { View, Text, CheckBox, Icon } from "native-base";
import styles from './ClothingDetailsScreenStyles'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { titleCase } from "../../SharedLogic/Helper";
export interface ClothingDetailScreenProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationStateV2
    updateItemCatalogged: typeof updateItemCatalogged,

    route: {
        key: string,
        name: string,
        params: {
            model: ItemModel
        }
    }
}

export interface clothingDetailScreenState {
    cataloged: boolean,
    currentVariant: ItemVariantModel,
    currentModel: ItemModel
}

class ClothingDetailScreen extends Component<ClothingDetailScreenProps, clothingDetailScreenState> {
    constructor(props: ClothingDetailScreenProps) {
        super(props);
        this.state = {
            cataloged: this.props.route.params.model.catalogged as boolean,
            currentVariant: this.props.route.params.model.variants[0],
            currentModel: this.props.route.params.model
        }
    }

    componentDidUpdate(){
        if(this.state.currentModel.name !== this.props.route.params.model.name){
            this.setState({currentVariant: this.props.route.params.model.variants[0],
                 currentModel: this.props.route.params.model,
                 cataloged: this.props.route.params.model.catalogged as boolean})
        }
    }

    setItemCataloged = () => {
        this.setState({ cataloged: !this.state.cataloged });
        this.props.updateItemCatalogged({
            name: this.props.route.params.model.name,
            catalogged: !this.state.cataloged,
            subcategory: this.props.route.params.model.sourceSheet
        });
    }

    getItemVariants(): ReactNode[] {
        let itemVariantsDisplay: ReactNode[] = [];
        this.props.route.params.model.variants.forEach(element => {
            itemVariantsDisplay.push(
                <TouchableOpacity key={`${element.filename}View`} style={{margin: 5, alignSelf: 'center'}} onPress={() => { this.setState({ currentVariant: element }) }}>
                    <Image key={`${element.filename}Image`} source={{ uri: element.closetImage }} style={{ width: 50, height: 50 }}></Image>
                </TouchableOpacity>
            );
        });
        return itemVariantsDisplay;
    }

    render() {
        let clothingItem = this.props.route.params.model;
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Confortaa', margin: 20 }}>{clothingItem.name}</Text>
                <Image source={{ uri: this.state.currentVariant.closetImage as string }} style={{ width: 150, height: 150 }}></Image>
                {/* Add clothing variants here to swap picture */}
                <CheckBox onPress={this.setItemCataloged} checked={this.state.cataloged}></CheckBox>
                <View style={{ flexDirection: 'column', alignContent: 'center', minWidth: '90%' }}>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Sell`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${this.state.currentVariant.sell}`}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Buy`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${this.state.currentVariant.buy === -1 ? "N/A" : this.state.currentVariant.buy}`}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Catalog`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${clothingItem.catalog}`}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Source`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${this.state.currentVariant.source} ${clothingItem.sourceNotes?.includes("upgraded only") ? "(upgraded)" : ""}`}</Text>
                        </View>
                    </View>
                    {clothingItem.customizationKitCost && (<View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text style={{ textAlign: 'center' }}>{`Customization Cost`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${clothingItem.customizationKitCost !== null ? clothingItem.customizationKitCost : "N/A"}`}</Text>
                        </View>
                    </View>)}
                </View>
                {clothingItem.variants.length > 1 && (<View style={{ flexDirection: 'column', alignContent: 'center', minWidth: '100%' }}>
                    <ScrollView horizontal={true} style={{ maxHeight: 90, borderWidth: 2, borderColor: 'grey', borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 20, alignContent: 'center' }} contentContainerStyle={{ alignItems: 'center' }}>
                        <View style={{ alignContent: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 20, fontFamily: 'Confortaa', marginTop: 10, marginLeft: 10 }}>{`Variants`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                {this.getItemVariants()}
                            </View>
                        </View>
                    </ScrollView>
                </View>)}                             
            </View>
        );
    }

}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
};

export default connect(mapStateToProps, {
    updateItemCatalogged,
})(ClothingDetailScreen);
