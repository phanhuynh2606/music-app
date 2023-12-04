// APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);

  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    //  fixed: true,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        theme: "#ebd0c2",
      },
      {
        name: "id 072019 ",
        artist: "W/n",
        url: "https://backend.daca.vn/assets/audios/cat-doi-noi-sau.mp3",
        cover: "https://avatar-ex-swe.nixcdn.com/song/2023/07/31/7/9/9/a/1690808322047_500.jpg",
        theme: "#ebd0c2",
      },
      {
        name: "前前前世",
        artist: "RADWIMPS",
        url: "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3",
        cover: "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg",
        theme: "#505d6b",
      },
    ],
    autoplay: true,
    volume: 0.8,
  });
  const elementAvatar = document.querySelector(".song-detail .inner-avatar");
  ap.on('play', function() {
	elementAvatar.style.animationPlayState = "running";
  });
  ap.on('pause', function() {
	elementAvatar.style.animationPlayState = "paused";
  });
}

// End APlayer
