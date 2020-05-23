import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { updateItemCatalogged } from "../../../app/ReduxV2/CollectionActions";
import { ItemModel, ItemVariantModel } from "../../../models/CollectionModelsV2/items";
import { ApplicationStateV2 } from "../../../models/ApplicationState/ApplicationStateV2";
import { NavigationScreenProp } from "react-navigation";
import { Image, TouchableHighlightBase } from 'react-native'
import { View, Text, CheckBox, Icon } from "native-base";
import styles from './FurnitureDetailScreenStyles'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { titleCase } from "../../SharedLogic/Helper";
export interface FurnitureDetailScreenProps {
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

export interface furnitureDetailScreenState {
    cataloged: boolean,
    currentVariant: ItemVariantModel,
    currentModel: ItemModel
}

class FurnitureDetailScreen extends Component<FurnitureDetailScreenProps, furnitureDetailScreenState> {
    constructor(props: FurnitureDetailScreenProps) {
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

    getItemsInSeries(): ReactNode[] {
        let items: ReactNode[] = [];
        let setItems = this.props.appState.furnitureItems.furnitureCollection.filter(x => x.series === this.props.route.params.model.series && x.name !== this.props.route.params.model.name);
        setItems.forEach(element => {
            items.push(
                <View key={`${element.name}View`}>
                    <TouchableOpacity key={`${element.name}Touchable`} onPress={() => { this.props.navigation.navigate("FurnitureDetails", { model: element }) }}>
                        <Image key={`${element.name}Image2`} source={{ uri: element.variants[0].image }} style={{ width: 100, height: 100 }}></Image>
                    </TouchableOpacity>
                </View>
            )
        });
        return items;
    }

    getItemVariants(): ReactNode[] {
        let itemVariantsDisplay: ReactNode[] = [];
        this.props.route.params.model.variants.forEach(element => {
            itemVariantsDisplay.push(
                <TouchableOpacity key={`${element.filename}View`} style={{margin: 5, alignSelf: 'center'}} onPress={() => { this.setState({ currentVariant: element }) }}>
                    <Image key={`${element.filename}Image`} source={{ uri: element.image }} style={{ width: 50, height: 50 }}></Image>
                </TouchableOpacity>
            );
        });
        return itemVariantsDisplay;
    }

    render() {
        let furnitureItem = this.props.route.params.model;
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Confortaa', margin: 20 }}>{furnitureItem.name}</Text>
                <Image source={{ uri: this.state.currentVariant.image as string }} style={{ width: 150, height: 150 }}></Image>
                {/* Add furniture variants here to swap picture */}
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
                            <Text>{`Size`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${furnitureItem.size}`}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Catalog`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${furnitureItem.catalog}`}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text>{`Source`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${this.state.currentVariant.source} ${furnitureItem.sourceNotes?.includes("upgraded only") ? "(upgraded)" : ""}`}</Text>
                        </View>
                    </View>
                    {furnitureItem.customizationKitCost && (<View style={styles.textContainerNew}>
                        <View style={styles.textDesc}>
                            <Text style={{ textAlign: 'center' }}>{`Customization Cost`}</Text>
                        </View>
                        <View style={styles.textValue}>
                            <Text>{`${furnitureItem.customizationKitCost !== null ? furnitureItem.customizationKitCost : "N/A"}`}</Text>
                        </View>
                    </View>)}
                </View>
                {furnitureItem.variants.length > 1 && (<View style={{ flexDirection: 'column', alignContent: 'center', minWidth: '100%' }}>
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
                {furnitureItem.series && (<View style={{ flexDirection: 'column', alignContent: 'center', minWidth: '90%' }}>
                    <ScrollView horizontal={true} style={{ maxHeight: 140, borderWidth: 2, borderColor: 'grey', borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 20, fontFamily: 'Confortaa', marginTop: 10, marginLeft: 10 }}>{`${titleCase(furnitureItem.series)} Series`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {this.getItemsInSeries()}
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
})(FurnitureDetailScreen);
