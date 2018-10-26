import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyBSf2q0a4Umr65w17nKsfLOl6L99Vj2DsQ";

class MapDisplay extends Component {
    state = {
        map: null,
        markers: [],
        markerProps: [],
        activeMarker: null,
        activeMarkerProps: null,
        showingInfoWindow: false
    };

    componentDidMount = () => {
    }

    mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        // Disable any active marker animation
        this.state.activeMarker && this
            .state
            .activeMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }

    onMarkerClick = (props, marker, e) => {
        // Close any info window already open
        this.closeInfoWindow();

        // Set the state to have the marker info show
        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }

    updateMarkers = (locations) => {
        // If all the locations have been filtered then we're done
        if (!locations) 
            return;
        
        // For any existing markers remove them from the map
        this
            .state
            .markers
            .forEach(marker => marker.setMap(null));

        // Iterate over the locations to create parallel references to marker properties
        // and the markers themselves that can be used for reference in interactions.
        // Add the markers to the map along the way.
        let markerProps = [];
        let markers = locations.map((location, index) => {
            let mProps = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            };
            markerProps.push(mProps);

            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos, 
                map: this.state.map, 
                animation
            });
            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null);
            });
            return marker;
        })

        this.setState({markers, markerProps});
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        let amProps = this.state.activeMarkerProps;

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url
                            ? (
                                <a href={amProps.url}>See website</a>
                            )
                            : ""}
                        
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)
