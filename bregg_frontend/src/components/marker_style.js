//styles for each of the markers
//group members / friends
const FriendMarkerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '30px',
  height: '20px',
  border: '2px solid red',
  borderRadius: '100%',
  backgroundColor: 'white',
  textAlign: 'center',
  color: 'black',
  fontSize: 13,
  padding: 5
};
//for the current user
const UserMarkerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '30px',
  height: '20px',
  border: '2px solid blue',
  borderRadius: '100%',
  backgroundColor: 'white',
  textAlign: 'center',
  color: 'black',
  fontSize: 13,
  padding: 5
};
//for venues in groups
const VenueMarkerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50px',
  height: '35px',
  border: '2px solid green',
  borderRadius: '100%',
  backgroundColor: 'white',
  textAlign: 'center',
  color: 'black',
  fontSize: 10,
  padding: 6
}

export {FriendMarkerStyle, UserMarkerStyle, VenueMarkerStyle};
