import React, { Component } from "react";

// To be used when listheader requires additional functoinality
export function withFilter(WrappedComponent: any, setFilterText: any) {
    return class extends Component {
        render() {
            return <WrappedComponent setFilterText={setFilterText}  {...this.props}/>
        }
    }
}

export default withFilter;