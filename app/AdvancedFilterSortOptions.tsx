import React, { Component } from 'react'
import { FishScreenProps } from "../models/FishScreen/FishScreenProps";
import { connect } from "react-redux";
import { Container, Button, Card, CardItem, Grid, Row, Col, View } from "native-base";
import { Text } from 'react-native'
import styles from './AdvancedFilterSortOptionsStyles'
export interface AdvancedFilterSelectionsFish {
    caught: boolean,
    donated: boolean,
    availableNow: boolean,
    availableThisMonth: boolean,
    shadowSize: number,
    location: number,
    rarity: number,
    value: number,
    jan: boolean,
    feb: boolean,
    mar: boolean,
    apr: boolean,
    may: boolean,
    june: boolean,
    july: boolean,
    august: boolean,
    sept: boolean,
    oct: boolean,
    nov: boolean,
    dec: boolean
}

class AdvancedFilterSortOptions extends Component<FishScreenProps>{

    constructor(props: FishScreenProps) {
        super(props);
    }



    render() {
        console.log(this.props);
        return (
            <Container style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                <Card style={{ flex: 1 }}>
                    <CardItem style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ width: '100%' }}>
                            <Grid>
                                <Row>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Jan</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Feb</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Mar</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Apr</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>May</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>June</Text></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Jul</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Aug</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Sep</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Oct</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Nov</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Dec</Text></Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                        <View style={{width: '100%'}}>                            
                            <Grid>
                                <Row>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Tiny</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Small</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Medium</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Large</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Huge</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Gigantic</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Narrow</Text></Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                        <View style={{width: '100%'}}>                            
                            <Grid>
                                <Row>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Common</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Uncommon</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Rare</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Ultra Rare</Text></Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                        <View style={{width: '100%'}}>                            
                            <Grid>
                                <Row>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>River</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>River (Mouth)</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>River (Cliff)</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Pond</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Pier</Text></Button>
                                    </Col>
                                    <Col>
                                        <Button style={styles.monthButtonUnSelectedStyle}><Text>Sea</Text></Button>
                                    </Col>                                    
                                </Row>
                            </Grid>
                        </View>
                        <View style={{ width: '100%', flexDirection:'row', justifyContent: 'space-evenly' }}>
                            <Button style={styles.monthButtonUnSelectedStyle}><Text>Caught</Text></Button>
                            <Button style={styles.monthButtonUnSelectedStyle}><Text>Donated</Text></Button>
                        </View>

                    </CardItem>
                </Card>
            </Container>
        );
    }

}

const mapStateToProps = (state: any) => {
    const { collections } = state;
    return { collections }
};

export default connect(mapStateToProps)(AdvancedFilterSortOptions);
