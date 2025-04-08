export const useNotificationSound = () => {
  return () => {
    const audio = new Audio('/sounds/messageRing.mp3');
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.warn('🔇 Error playing sound:', e.message);
    });
  };
};
