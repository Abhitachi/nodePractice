function createImage(name) {
  if (name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name);
  } else if (name.match(/\.gif$/)) {
    return new ImageGif(name);
  } else if (name.match(/\.png$/)) {
    return new ImagePng(name);
  } else {
    throw new Error("Unsupported format");
  }
}

// const image = createImage("photo.jpg");

function createPerson(name) {
  const privateProperties = {};
  const person = {
    setName(name) {
      if (!name) {
        throw new Error("A person must have a name");
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    },
  };
  person.setName(name);
  return person;
}
const person = createPerson("John");
console.log(person.getName());
person.setName("Jane");
console.log(person.getName());
