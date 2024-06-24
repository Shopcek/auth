export default function isID(n: any): boolean {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
