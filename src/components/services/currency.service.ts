export class CurrencyService {
  public static toString(value: number): string {
    return `${value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Öro`;
  }
  public static toSignedString(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toLocaleString('de', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} Öro`;
  }
}