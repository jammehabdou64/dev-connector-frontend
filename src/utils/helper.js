class Ui {
  static getPermission() {
    return new Promise((res, rej) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          res(stream);
        })
        .catch((err) => {
          throw new Error("Access denied");
        });
    });
  }

  static select(element) {
    return document.querySelector(element);
  }

  static showVideoModal() {
    Ui.select(".video-modal").style.display = "block";
  }

  static ringingTone() {
    let audio = Ui.select("audio");
    audio.src = "./Ringing-tone/tone.mp3";
    audio.play();
  }

  static stopRingingTone() {
    let audio = Ui.select("audio");
    audio.src = "./Ringing-tone/tone.mp3";
    audio.pause();
  }

  static displayVideo(stream) {
    const video = Ui.select(".my-video");
    video.srcObject = stream;
    video.play();
  }

  static initPeer(stream, initiator) {
    let peer = new SimplePeer({
      initiator,
      stream: stream,
      trickle: false,
    });

    peer.on("stream", (stream) => {
      let userVideo = Ui.select(".user-video");
      userVideo.srcObject = stream;
      userVideo.play();
    });

    peer.on("close", () => {
      peer.destroy();
    });
    return peer;
  }

  static caller(peer, user, auth) {
    peer.on("signal", (data) => {
      const sendData = {
        auth: auth,
        user: user,
        data: JSON.stringify(data),
      };
      socket.emit("outgoing", sendData);
    });

    socket.on("gotAnswer", (data) => {
      peer.signal(JSON.parse(data));
    });
  }

  static answerCall(peer, res) {
    peer.on("signal", (data) => {
      let dataId = JSON.stringify(data);

      socket.emit("answer", dataId);
    });

    peer.signal(JSON.parse(res));
  }
}

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    setStream(stream);
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (data) => {
        socket.emit("video-call", {
          userToCall: userId,
          room,
          signalData: data,
          from: { name: auth?.name, email: auth?.email },
        });
      });

      peer.on("stream", (stream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });

      socket.on("callAccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
    }
  });
