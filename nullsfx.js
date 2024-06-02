function nullsfx(sfx_list) {
  // console.log('nullsfx');

  this.sfx_list = sfx_list;

  this.audioEles = {};
  this.addSFXs(this.sfx_list);

  window.addEventListener('DOMContentLoaded', () => {
    this.init();
  });
}

nullsfx.prototype.init = function() {
  // console.log('init');
  
  this.targets = document.querySelectorAll('[nsfx]');
  this.targets.forEach((ele) => {
    let attrVal = ele.getAttribute('nsfx').trim();
    
    // One element can have multiple event drive sfx
    attrVal.split(';').forEach((soundFx) => {
      let [eve, src] = soundFx.trim().split('?', 2), key, vol;
      [eve, key]=eve.trim().split('!', 2); 
      [src, vol]=src.trim().split('%', 2);
      ele.addEventListener(eve, (e) => {
        e.stopPropagation();
        if (eve.substring(0,3) === 'key' && key && e.key !== key) return;
        this.play(src, vol ?? ele.getAttribute('nsfx-vol'), e);
      });
    });
  });
}

nullsfx.prototype.addSFXs = function(sfx_list={}) {
  for (let [key, val] of Object.entries(sfx_list)) {
    let sfx = document.createElement('audio');
    sfx.src = val;
    sfx.setAttribute("preload", "auto");
    sfx.setAttribute("controls", "none");
    sfx.volume = 0;
    sfx.load();
    // sfx.play();
    this.audioEles[key] = sfx;
    
    // console.log('base sfx added ;', key);

    // TODO: fix remove sfx eventlistener not working
    sfx.addEventListener('ended', handleEnded);
    function handleEnded() {
      // Remove all event listeners after sound is fully played
      sfx.removeEventListener('ended', handleEnded);
      // Pause and remove the sfx audio element from memory
      sfx.pause();
      sfx.remove();
    }
  }
}

nullsfx.prototype.play = function(src, vol=null) {
  let sfx = this.audioEles[src].cloneNode();
  // console.log('sfx added');
  sfx.currentTime = 0;
  sfx.volume = parseFloat(vol) ?? 1;
  // console.log(vol, sfx.volume);
  sfx.play();
  
  sfx.addEventListener('ended', handleEnded);
  function handleEnded() {
    // Remove all event listeners
    sfx.removeEventListener('ended', handleEnded);
    // Pause and remove the sfx audio element from memory
    sfx.pause();
    sfx.remove();
  }
}

nullsfx.prototype.playTheList = function(plist=[]) {
  if (!plist) return;

  let player = document.createElement('audio');
  player.playlist = plist;
  player.src = plist[0];
  player.currentTrack = 0;
  player.replay = false;
  player.loop = false;
  player.playing = false;
  player.setAttribute("preload", "auto");
  player.setAttribute("controls", "none");
  player.volume = 0.8;
  player.load();
  
  player.previous = () => {
    let idx = (i = player.currentTrack-1) < 0 ? player.playlist.length-1:i;
    player.jumpTo(idx);
  }
  player.next = () => {
    let idx = (i = player.currentTrack+1) >= player.playlist.length ? 0:i;
    player.jumpTo(idx);
  }
  player.jumpTo = (idx) => {
    player.currentTrack = idx
    player.src = plist[idx];
    player.currentTime = 0;
    if (player.playing) player.play();

    // events >>>
    player.onTrackChange();
  }

  player.playIt = () => {
    player.playing = true;
    player.play();
  }
  player.pauseIt = () => {
    player.playing = false;
    player.pause();
  }

  player.addEventListener('ended', function () {
    if (player.loop) return;

    let idx = player.currentTrack + 1;
    if (idx >= player.playlist.length && !player.replay) return;

    player.next();
  });

  player.onTrackChange = () => undefined;

  return player;
}

// nullsfx.prototype.parseOptions = function(query="onclick?wasted&vol=0.6") {
//   // let eve, options, eo;
//   // eve = ((options = (eo = q.split('?', 1))[1].split('&')) && eo)[0];
// }

// document.querySelector('button').addEventListener('pointermove')
