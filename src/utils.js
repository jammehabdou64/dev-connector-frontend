import Peer from "simple-peer";

class User {
  constructor(profileExist, profile, user, auth) {
    this.profileExist = profileExist;
    this.profile = profile;
    this.user = user;
    this.auth = auth;
  }
  name() {
    return this.profileExist ? this.profile?.user?.name : this.user?.name;
  }

  avatar() {
    return this.profileExist ? this.profile?.user?.avatar : this.user?.avatar;
  }

  id() {
    return this.profileExist ? this.profile?.user?._id : this.user?._id;
  }

  nameReplace() {
    return this.profileExist
      ? this.profile?.user?.name.replace(/\s/g, "-")
      : this.user?.name?.replace(/\s/g, "-");
  }

  checkIfMyProfile() {
    return (
      this.auth.email === this.user.email ||
      this.auth.email === this.profile?.user?.email
    );
  }

  static getMedia() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          resolve(stream);
        })
        .catch((err) => {
          reject("Access denied");
        });
    });
  }

  static async initiatePeer(stream, initiator, partnerVideo) {
    // console.log(stream);
    let peer = new Peer({
      initiator,
      stream,
      trickle: false,
    });

    peer.on("error", (err) => console.log("error", err));

    peer.on("stream", (stream) => {
      if (partnerVideo && stream) {
        partnerVideo.srcObject = stream;
      }
    });

    peer.on("close", () => {
      peer.destroy();
    });
    return peer;
  }

  static async Videocall(peer, user, auth, socket) {
    peer.on("signal", (data) => {
      const payload = {
        caller: auth,
        recipient: user,
        signal: data,
      };

      socket.emit("outgoing-call", payload);
    });

    socket.on("gotAnswer", (signal) => {
      console.log(signal);
      peer.signal(signal);
    });
  }

  static async answerCall(peer, caller, socket) {
    // console.log(caller);
    peer.on("signal", (data) => {
      const payload = {
        caller: caller?.from,
        signal: data,
      };
      socket.emit("answer", payload);
    });
    console.log(caller?.signal);
    peer.signal(caller?.signal);
  }
}

export default User;
