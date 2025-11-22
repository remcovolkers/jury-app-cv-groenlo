export interface Participant {
  id: string;
  name: string;
  category: 'kindergroepen' | 'kleineLoopgroepen' | 'groteGroepen' | 'kleineWagens' | 'groteWagens';
}
