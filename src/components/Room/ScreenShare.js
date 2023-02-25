import { useEffect, useRef } from "react";
import { useClient, getScreenVideoTrack } from "./settings";

export default function ScreenShare(props) {
  let screenTracks;
  const client = useClient();
  const { tracks: videoTrack, users } = props;

  const { isScreenSharing, ifScreenShared } = props;

  const getScreenSharingVideoTrack = (tracks) => {
    if (Array.isArray(tracks)) {
      return tracks[0];
    } else {
      return tracks;
    }
  };

  //this line asks for permission
  if (isScreenSharing) {
    const { ready, tracks } = getScreenVideoTrack();
    screenTracks = tracks;
  }

  const tracksRef = useRef(screenTracks);

  useEffect(() => {
    tracksRef.current = screenTracks;
  }, [screenTracks]);

  const screenTrack = getScreenSharingVideoTrack(screenTracks);

  if (screenTracks) {
    //works but also doesn't refreshes and it only updates for other, we still see our camera instead of screen
    client.unpublish([videoTrack[1]]);
    client.publish(screenTrack);

    console.log(
      `%c${screenTrack}`,
      "color: red; font-weight: bold; font-size:40px"
    );

    console.log(
      `%c${[videoTrack[1]]}`,
      "color: red; font-weight: bold; font-size:40px"
    );

    //1-video, 0-audio
    //videoTrack[1] = screenTrack; //now we can see our screen as well
  }

  if (ifScreenShared) {
    if (!isScreenSharing) {
      console.log(
        `%c${screenTrack}`,
        "color: blue; font-weight: bold; font-size:40px"
      );

      console.log(
        `%c${[videoTrack[1]]}`,
        "color: blue; font-weight: bold; font-size:40px"
      );

      //screen sharing partially works
      //you can start and stop it multiple times
      //it just ask you once which screen you want to use
      //also we can't see the screen we're sharing

      client.unpublish(screenTrack);
      client.publish([videoTrack[1]]);
    }
  }

  return <div className="ScreenShare" style={{ display: "none" }}></div>;
}
