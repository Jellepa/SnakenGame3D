function playSpecialFruitSound(sound, audioEnabled) {
  if (!audioEnabled) return;

  try {
    // Create two audio instances for the double sound effect
    const audio1 = new Audio(sound);
    const audio2 = new Audio(sound);

    audio1.volume = 0.15; // Slightly lower volume since we're playing twice
    audio2.volume = 0.15;

    // Play first sound immediately at double speed
    audio1.playbackRate = 2.0; // Double speed
    audio1.play();

    // Play second sound with a short delay (50ms) at double speed
    setTimeout(() => {
      audio2.playbackRate = 2.0; // Double speed
      audio2.play();
    }, 50); // 50ms delay between sounds
  } catch (error) {
    console.warn("Failed to play special fruit sound:", error);
  }
}

export { playSpecialFruitSound };
