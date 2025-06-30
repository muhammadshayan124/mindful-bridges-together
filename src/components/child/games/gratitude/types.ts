
export interface Flower {
  id: number;
  gratitude: string;
  type: string;
  color: string;
  planted: Date;
}

export const flowerTypes = [
  { type: '🌸', name: 'Cherry Blossom', color: 'from-pink-200 to-pink-400' },
  { type: '🌺', name: 'Hibiscus', color: 'from-red-200 to-red-400' },
  { type: '🌻', name: 'Sunflower', color: 'from-yellow-200 to-yellow-400' },
  { type: '🌷', name: 'Tulip', color: 'from-purple-200 to-purple-400' },
  { type: '🌹', name: 'Rose', color: 'from-red-200 to-rose-400' },
  { type: '🌼', name: 'Daisy', color: 'from-white to-yellow-200' },
];
