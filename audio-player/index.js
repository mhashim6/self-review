/*
 Copyright (c) Muhammad Hasim (mhashim6). All rights reserved.
 Licensed under the MIT license. See LICENSE file in the project root for details.
*/


let queue = [],
  player = new Audio(),
  onPlayNext = (url) => ({});

const next = () => playlist(queue, false, false, onPlayNext);
const nextLoop = () => playlist(queue, false, true, onPlayNext);

export const playlist = (
  urls,
  clear = false,
  loop = false,
  onNext = onPlayNext
) => {
  onPlayNext = onNext;
  if (clear) {
    queue = [];
    queue.push(...urls);
  }
  if (queue.length !== 0) {
    const upcoming = queue.shift();
    if (loop) {
      queue.push(upcoming);
    }
    player.src = upcoming;
    player.removeEventListener("ended", loop ? nextLoop : next);
    player.addEventListener("ended", loop ? nextLoop : next);
    player.play();
    queue.length && onNext(upcoming);
  } else {
    player.removeEventListener("ended", loop ? nextLoop : next);
  }
};

export const clear = () => {
  queue = [];
  player.removeEventListener("ended", next);
};

export const play = (url) => {
  stop();
  player.src = url;
  player.play();
};

export const resume = () => {
  player.play();
};

export const pause = () => {
  player.pause();
};

export const stop = () => {
  player.pause();
  player.currentTime = 0;
  clear();
};


export const onPlay = (action) => {
  const cb = () => {
    action(player.src);
  };
  player.addEventListener("play", cb);
  return () => player.removeEventListener("play", cb);
};
export const onPause = (action) => {
  const cb = () => {
    action(player.src);
  };
  player.addEventListener("pause", cb);
  return () => player.removeEventListener("pause", cb);
};
export const onStop = (action) => {
  const cb = () => {
    action(player.src);
  };
  player.addEventListener("ended", cb);
  return () => player.removeEventListener("ended", cb);
};
