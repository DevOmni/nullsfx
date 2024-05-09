let yo = {
  "bomb": "/nullsfx/sfx/Bomb.wav",
  "epic": "/nullsfx/sfx/Epic.wav",
  "wasted": "/nullsfx/sfx/Wasted.wav",
  "iphone": "/nullsfx/sfx/iPhone (+Reverb).wav",
  "nani": "/nullsfx/sfx/Metal Gear Alert_ Sound Effect(MP3_160K)_1.mp3",
  "splat": "/nullsfx/sfx/Splat - Gaming Sound Effect (HD)(MP3_128K)_1.mp3",
  "teleport": "/nullsfx/sfx/Teleport Sound Effect(MP3_320K).mp3",
  "click": "/nullsfx/sfx/Mouse Click - Sound Effect (HD)(MP3_160K)_1.mp3",
  "magic": "/nullsfx/sfx/Magic.wav",
  "kwak": "/nullsfx/sfx/Duck Quack - Sound Effect (HD)(MP3_160K)_1.mp3",
  "dbz": "/nullsfx/sfx/Dragon Ball.wav",
  "censor": "/nullsfx/sfx/Censorship.wav",
  "bed": "/nullsfx/sfx/Bed Squeak.mp3",
  "angel": "/nullsfx/sfx/Angelic Voice.wav",
  "amongus": "/nullsfx/sfx/Among Us.mp3",
  "audience": "/nullsfx/sfx/Audience.wav",
  "tititik": "/nullsfx/sfx/Tik Tik Sound Effect By Techno.mp3"
}

let mysfxer = new nullsfx(yo);

document.getElementById('custom').addEventListener('click', (e) => {
  mysfxer.play('audience', 0.6)
});
