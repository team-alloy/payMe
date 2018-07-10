import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class NegotiationPracticeVideo extends Component {
  constructor(props) {
    super(props);
    this.refs = React.createRef();
    this.state = {
      identity: null,
      token: '',
      roomName: '',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '', // Track the current active room
      remoteMedia: null,
      roomsList: [],
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
    this.getRoomsList = this.getRoomsList.bind(this);
  }

  componentDidMount() {
    axios.get('/token').then((results) => {
      const { identity, token } = results.data;
      this.setState({ identity, token });
    });

    this.getRoomsList();
  }

  getRoomsList() {
    axios.get('/rooms').then((rooms) => {
      console.log('all rooms in front end', rooms)
      this.setState({ roomsList: rooms.data });
    });
  }

  handleRoomNameChange(e) {
    const roomName = e.target.value;
    this.setState({ roomName });
  }

  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    console.log(`Joining room '${this.state.roomName}'...`);
    const connectOptions = {
      name: this.state.roomName,
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.token, connectOptions).then(this.roomJoined, (error) => {
      alert(`Could not connect to Twilio: ${error.message}`);
    });
  }

  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    const tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    const tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log(`Joined as '${this.state.identity}'`);
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    const previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      console.log(`Already in Room: '${participant.identity}'`);
      const previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      console.log(`Joining: '${participant.identity}'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(`${participant.identity} added track: ${track.kind}`);
      const previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(`${participant.identity} removed track: ${track.kind}`);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      console.log(`Participant '${participant.identity}' left the room`);
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  render() {
    /*
	     Controls showing of the local track
	    Only show video track after user has joined a room else show nothing
	  */
    const showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        {' '}
        <div
          className="flex-item"
          ref="localMedia"
          id="local-media"
          style={{ display: 'inline-block' }}
        />
        {' '}
      </div>) : '';
    /*
		 Controls showing of ‘Join Room’ or ‘Leave Room’ button.
		 Hide 'Join Room' button if user has already joined a room otherwise
		 show `Leave Room` button.
		*/
    const joinOrLeaveRoomButton = this.state.hasJoinedRoom
      ? (
        <RaisedButton
          label="Leave Room"
          id="hangup"
          onClick={() => this.leaveRoom()}
        />
      )
      : (
        <RaisedButton
          label="Join Room"
          onClick={() => { this.joinRoom(); this.getRoomsList(); }}
        />
      );

      console.log('STATE ROOMS', this.state.roomsList)

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="ui grid" id="picture-in-picture">
          <div className="four column grid">

            <div className="left floated column">
              {/*
                The following div element shows all remote media (other participant’s tracks)
              */}
              <div className="flex-container">
                <div
                  className="flex-item"
                  ref="remoteMedia"
                  id="remote-media"
                  style={{ display: 'inline-block' }}
                />
              </div>
            </div>

            <div className="right floated column">
              <div className="flex-container">
                {showLocalTrack}
                {' '}
                {/* Show local track if available */}
              </div>
            </div>

            <div className="left floated column">
              <div className="item">
                <div id="container" style={{ height: '100%', width: '70%' }}>
                  <table className="ui selectable teal table">
                    <thead>
                      <tr>
                        <th>
                      Available Rooms:
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.roomsList.map((room, idx) => {
                        return (
                          <tr key={idx}>
                            <td key={idx}> 
                              {room} 
                            </td>
                          </tr>
                        )
                      }) }
                    </tbody>
                  </table>
                </div>

                <br />
                {' '}

                <div className="item">
                  {/*
                        The following text field is used to enter a room name.
                        It calls  `handleRoomNameChange` method when the text changes which sets the
                        `roomName` variable initialized in the state.
                      */}
                  <TextField
                    hintText="Room Name"
                    onChange={this.handleRoomNameChange}
                    errorText={this.state.roomNameErr ? 'Room Name is required' : undefined}
                    style={{ width: '70%' }}
                  />

                  <br />
                  {' '}

                  {/* Show either ‘Leave Room’ or ‘Join Room’ button */}
                  {joinOrLeaveRoomButton}
                </div>
              </div>
            </div>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
