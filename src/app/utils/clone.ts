export default function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}
