export default function formattedDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
}


