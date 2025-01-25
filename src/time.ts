

export function timeToRaceFormat(duration: number ) {
  const totalSeconds = Math.abs(duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  if (minutes === 0 && seconds === 0 && milliseconds === 0) {return '';}
  
  const formattedInterval = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  return formattedInterval;
}

export function formatDuration(seconds: number ) {
  // Extract minutes
  const minutes = Math.floor(seconds / 60);
  
  // Extract remaining seconds
  const remainingSeconds = Math.floor(seconds % 60);
  
  // Extract milliseconds (convert to 3 digits)
  const milliseconds = Math.floor((seconds % 1) * 1000);
  
  // Helper function to pad numbers with leading zeros
  const pad = (num: number, size: number) => {
      let str = num.toString();
      while (str.length < size) str = "0" + str;
      return str;
  };
  
  // Format each component
  const formattedMinutes = pad(minutes, 2);
  const formattedSeconds = pad(remainingSeconds, 2);
  const formattedMilliseconds = pad(milliseconds, 3);
  
  // Combine all parts with proper formatting
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}