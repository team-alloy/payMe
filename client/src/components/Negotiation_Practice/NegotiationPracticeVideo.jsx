import React from 'react';
import Video from 'twilio-video';
import axios from 'axios';

export default class NegotiationPracticeVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '', // Track the current active room
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
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

    console.log(`Joining room '${  this.state.roomName  }'...`);
    const connectOptions = {
      name: this.state.roomName,
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.token, connectOptions).then(this.roomJoined, (error) => {
      alert(`Could not connect to Twilio: ${  error.message}`);
    });
  }

  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    let tracks = Array.from(participant.tracks.values());
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
    let tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log(`Joined as '${  this.state.identity  }'`);
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    let previewContainer = this.refs.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      console.log(`Already in Room: '${  participant.identity  }'`);
      let previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      console.log(`Joining: '${  participant.identity  }'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(`${participant.identity  } added track: ${  track.kind}`);
      let previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(`${participant.identity  } removed track: ${  track.kind}`);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      console.log(`Participant '${  participant.identity  }' left the room`);
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

  componentDidMount() {
    axios.get('/token').then((results) => {
      const { identity, token } = results.data;
      this.setState({ identity, token });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }

  render() {
    // Only show video track after user has joined a room
		let showLocalTrack = this.state.localMediaAvailable ? (
			<div className="flex-item">
				<div ref="localMedia" />
			</div>
		) : (
			''
		);
		// Hide 'Join Room' button if user has already joined a room.
		let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
			<button className="ui button" secondary={true} onClick={this.leaveRoom}>
        Leave Room
      </button>
		) : (
			<button className="ui button" primary={true} onClick={this.joinRoom}>
        Join Room
      </button>
		);
		return (
			<div className="ui card">
				<div className="content">
					<div className="flex-container">
						{showLocalTrack}
						<div className="flex-item">
							<div className="ui input"
								onChange={this.handleRoomNameChange}
								errorText={this.state.roomNameErr ? 'Room Name is required' : undefined}
							>
                <input type="text" placeholder="Room Name" />
              </div>
							<br />
							{joinOrLeaveRoomButton}
						</div>
						<div className="flex-item" ref="remoteMedia" id="remote-media" />
					</div>
				</div>
			</div>
    );
  }
}
