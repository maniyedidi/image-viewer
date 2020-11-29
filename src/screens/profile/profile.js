import React, { useState, useEffect } from "react";
import PROFILE_ICON from "../../assets/profile_icon.png";
import "./profile.css";
import {
  Avatar,
  Modal,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { getCaptions, getAllMyMedia } from "../../common/api";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

function getModalStyle() {
  const top = 50 + 10;
  const left = 50 + 10;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  editFormContainer: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 800,
    height: 650
  }
}));

const Profile = () => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [images, setImages] = useState([]);

  const [userDetails, setUserDetails] = useState({
    fullName: "Upgrad Education",
    totalPost: 0,
    follows: Math.floor(Math.random() * 10),
    followedBy: Math.floor(Math.random() * 10),
    username: ""
  });

  useEffect(() => {
    getAllMyMedia().then(response => {
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setUserDetails({
          ...userDetails,
          totalPost: response.data.length,
          username: response.data[0].username
        });
        setImages(response.data)
      }
    });
  }, []);

  const handleOpen = () => {
    setFullName(userDetails.fullName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFullName("");
  };

  const updateFullName = () => {
    if (!fullName) {
      setError(true);
      return;
    }
    setOpen(false);
    setUserDetails({
      ...userDetails,
      fullName: fullName
    });
    setFullName("");
  };

  return (
    <div className="profile-container">
      <div className="user-info-container">
        <Avatar src={PROFILE_ICON} className="profile-icon" />
        <div className="name-counts-container">
          <div>
            <strong>{userDetails.username}</strong>
          </div>
          <div className="counts">
            <span className="count">Post: {userDetails.totalPost}</span>
            <span className="count">Follows: {userDetails.follows}</span>
            <span className="count">Followed By: {userDetails.followedBy}</span>
          </div>
          <div className="full-name">
            <span>
              <strong>{userDetails.fullName}</strong>
            </span>
            <EditIcon
              className="edit-icon"
              varinat="circular"
              onClick={handleOpen}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.editFormContainer}>
                <h2 id="modal-title">Edit</h2>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="my-input">Full Name *</InputLabel>
                  <Input
                    type="text"
                    id="user-full-name"
                    aria-describedby="my-helper-text"
                    value={fullName}
                    onChange={event => {
                      setError(false);
                      setFullName(event.target.value);
                    }}
                  />
                  {error && <span className="error-message">required</span>}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  onClick={updateFullName}
                >
                  UPDATE
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3}>
          {images.map(tile => (
            <GridListTile key={tile.id} cols={1}>
              <img src={tile.media_url} alt={tile.caption} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default Profile;
