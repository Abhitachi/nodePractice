const MODIFIER_NAMES = ["swap", "write", "fill"];

class ImmutableBuffer {
  constructor(size, executor) {
    const buffer = Buffer.alloc(size);
    const modifier = {};
    for (const prop in buffer) {
      console.log(prop, "prop");
      if (typeof buffer[prop] !== "function") {
        continue;
      }
      if (MODIFIER_NAMES.some((m) => prop.startsWith(m))) {
        modifier[prop] = buffer[prop].bind(buffer);
      } else {
        this[prop] = buffer[prop].bind(buffer);
      }
    }
    executor(modifier);
  }
}

const hello = "Hello, World!";
const buffer = new ImmutableBuffer(hello.length, ({ write }) => {
  write(hello);
});

console.log(buffer.toString());
// console.log(buffer.swap16().toString());
console.log(String.fromCharCode(buffer.readInt8(0)));
