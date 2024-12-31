

export function timeToRaceFormat(duration: number ) {
  const totalSeconds = Math.abs(duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  if (minutes === 0 && seconds === 0 && milliseconds === 0) {return '';}
  
  const formattedInterval = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  return formattedInterval;
}