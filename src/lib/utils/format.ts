// Formatiranje težine pripreme za prikaz
export function formatDifficulty(difficulty: string): string {
  const labels: Record<string, string> = {
    easy: 'Jednostavno',
    medium: 'Srednje zahtjevno',
    hard: 'Složeno',
  };
  return labels[difficulty] || difficulty;
}

// Formatiranje vremena pripreme
export function formatPrepTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} h`;
  }
  return `${hours} h ${mins} min`;
}
