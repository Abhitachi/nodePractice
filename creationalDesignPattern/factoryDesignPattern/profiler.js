class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }
  start() {
    this.lastTime = process.hrtime(); // returns time in [seconds, nanoseconds]
  }
  end() {
    const diff = process.hrtime(this.lastTime); //takes the start time and returns the difference
    console.log(
      ` ${this.label} took ${diff[0]} seconds and ${diff[1]} nanoseconds`
    );
  }
}

const noopProfiiler = {
  start() {},
  end() {},
};

export function createProfiler(label) {
  //abstracting the creation of the profiler in a factory function
  if (process.env.NODE_ENV === "production") {
    return noopProfiiler;
  } else {
    return new Profiler(label);
  }
}
