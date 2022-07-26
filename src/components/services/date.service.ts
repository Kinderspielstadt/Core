export class DateService {
  public static toString(date: Date | number): string {
    if(typeof date === 'number') {
      date = new Date(date * 1000);
    }
    if(!date) {
      return 'n/a';
    }
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  public static toShortString(date: Date | number): string {
    if(typeof date === 'number') {
      date = new Date(date * 1000);
    }
    if(!date) {
      return 'n/a';
    }
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}