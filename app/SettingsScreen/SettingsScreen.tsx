import React from 'react';
import {
    updateHemisphere,
    updateInGameTime
  } from "../Redux/CollectionActions";
import { Component } from "react";
import { connect } from "react-redux";
import {Text, Platform, AsyncStorage } from "react-native";
import { Container, Switch, Button, Input, View } from 'native-base';
import { SettingsScreenProps } from '../../models/MainScreenModels/SetingsScreen/SettingsScreenProps';
import moment from 'moment';
import { InGameTimeOffSetPayload } from '../Redux/Types';

export function GetInGameDay(minutesOffset: number){
    let currentMoment = moment(new Date());
    let currentDate = currentMoment.add(minutesOffset, 'minutes').toDate();
    return currentDate;
}

export interface TimeModel {
    day: number,
    month: number,
    year: number,
    hour: number,
    minute: number,
    seconds: number
}

export interface SettingsScreenState
{
    isShowingDatePicker: boolean,
    isReady: boolean,
    currentTime: TimeModel,
    pendingTime: TimeModel,
    currentTimeAsDate: Date
}

class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
    interval: number = new Date().getSeconds();
    constructor(props: any){
        super(props);
        let dateOffSet = this.props.appState.userSettings.inGameTime.minutes;
        let currentDate = GetInGameDay(dateOffSet);
        this.state = {
            isShowingDatePicker: false,
            isReady: false,
            currentTime: {
                day: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                hour: currentDate.getHours(),
                minute: currentDate.getMinutes(),
                seconds: currentDate.getSeconds(),
            },
            pendingTime: {
                day: currentDate.getDate(),
                month: currentDate.getMonth(),
                year: currentDate.getFullYear(),
                hour: currentDate.getHours(),
                minute: currentDate.getMinutes(),
                seconds: currentDate.getSeconds(),
            },
            currentTimeAsDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes())

        }
        this.interval = 0;
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick(){
        //Set state
        let currentDate = new Date(this.state.currentTime.year, this.state.currentTime.month, this.state.currentTime.day, this.state.currentTime.hour, this.state.currentTime.minute);
        let dateAfterAdd = moment(currentDate).add(this.state.currentTime.seconds + 1, "seconds").toDate();        
        this.setState({currentTime: {      
            minute: dateAfterAdd.getMinutes(),
            hour: dateAfterAdd.getHours(),
            day: dateAfterAdd.getDate(),
            month: dateAfterAdd.getMonth(),
            year: dateAfterAdd.getFullYear(),
            seconds: dateAfterAdd.getSeconds()}});
        this.setState({currentTimeAsDate: dateAfterAdd});
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    SetDateTimeForApplication() {
        clearInterval(this.interval);
        let selectedDate = new Date(this.state.pendingTime.year, this.state.pendingTime.month, this.state.pendingTime.day, this.state.pendingTime.hour, this.state.pendingTime.minute + 1);
        this.setState({isShowingDatePicker: false});
        let todayDate = new Date();
        let todayMoment = moment(todayDate);
        let selectedMoment = moment(selectedDate);
        let dateOffset: InGameTimeOffSetPayload = {
            minutes: selectedMoment.diff(todayMoment, 'minutes') 
        }        
        this.props.updateInGameTime(dateOffset);
        //Update Current Time here
        let myObj =  {
            minute: this.state.pendingTime.minute,
            hour: this.state.pendingTime.hour,
            day: this.state.pendingTime.day,
            month: this.state.pendingTime.month,
            year: this.state.pendingTime.year,
            seconds: todayDate.getSeconds()
        };
        this.setState({currentTime: myObj});
        this.interval = setInterval(() => this.tick(), 1000);
    }

    setPendingTime(type: string, time: number){
        let newState = this.state.pendingTime;
        switch(type){
            case 'day':
                newState.day = time;
                break;
            case 'month':
                newState.month = time - 1;
                break;
            case 'year':
                newState.year = time;
                break;
            case 'minute':
                newState.minute = time;
                break;
            case 'hour':
                newState.hour = time;
                break;
        }
        this.setState({pendingTime: {...newState}});
    }

    SetIsNorthernHemisphere(isNorthernHemisphere: boolean){
        this.props.updateHemisphere(isNorthernHemisphere);
    }

    render(){
            return (
                <View style={{justifyContent: "center", alignItems: 'center'}}>                    
                    <View>
                        <Text>{`Current In Game Time: ${moment(this.state.currentTimeAsDate).format('MMMM Do YYYY, h:mm:ss a')}`}</Text>
                    </View>
                    {/* TODO: Add validation to these inputs or change to picker/dropdown OR get a date time picker to work on web and ios*/}
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Text>{"Month:"}</Text><Input style={{width: 50}} placeholder="Month" onChangeText={(text) => {this.setPendingTime('month', +text)}} ></Input>
                        <Text>{"Day:"}</Text><Input style={{width: 50}} placeholder="Day" onChangeText={(text) => {this.setPendingTime('day', +text)}} ></Input>
                        <Text>{"Year:"}</Text><Input style={{width: 50}} placeholder="Year" onChangeText={(text) => {this.setPendingTime('year', +text)}}></Input>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <Text>{"Hour:"}</Text><Input placeholder="Hour" style={{width: 50}} onChangeText={(text) => {this.setPendingTime('hour', +text)}}></Input>
                        <Text>{"Minute:"}</Text><Input style={{width: 50}} placeholder="Minute"onChangeText={(text) => {this.setPendingTime('minute', +text)}}></Input>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <Button onPress={() => this.SetDateTimeForApplication()}><Text>{"Change Time"}</Text></Button>
                    </View>
                    <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                        <Button style={this.props.appState.userSettings.isNorthernHemisphere ? {backgroundColor: 'green', margin: 10, padding: 10} : {backgroundColor: 'grey', margin: 10, padding: 10}} onPress={() => this.SetIsNorthernHemisphere(true)}><Text>{"Northern Hemisphere"}</Text></Button>
                        <Button style={this.props.appState.userSettings.isNorthernHemisphere ? {backgroundColor: 'grey', margin: 10, padding: 10} : {backgroundColor: 'green', margin: 10, padding: 10}} onPress={() => this.SetIsNorthernHemisphere(false)}><Text>{"Southern Hemisphere"}</Text></Button>
                    </View>
                    <View>
                        <Button onPress={() => {AsyncStorage.clear()}}><Text>CLEAR STORAGE</Text></Button>    
                    </View>                    
                </View>
            );        
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState };
  };
  
export default connect(mapStateToProps, {
    updateInGameTime,
    updateHemisphere
  })(SettingsScreen);
  