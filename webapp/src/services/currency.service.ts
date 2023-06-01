export class CurrencyService {
  public static toString(value: number): string {
    return `${(value / 100).toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Öro`;
  }
  public static toSignedString(value: number): string {
    return `${(value / 100) > 0 ? '+' : ''}${(value / 100).toLocaleString('de', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Öro`;
  }
}