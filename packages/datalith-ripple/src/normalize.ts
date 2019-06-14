export default function normalize(n: number, min: number, max: number) {
  return (n - min) / (max - min)
}
