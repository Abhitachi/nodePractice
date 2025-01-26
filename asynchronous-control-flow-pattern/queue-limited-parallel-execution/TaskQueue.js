import { EventEmitter } from "events";
export class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task) {
    this.queue.push(task);
    console.log("Task is pushed to the queue");
    setTimeout(() => console.log("here"), 0);
    process.nextTick(this.next.bind(this));
    return this;
  }
  next() {
    if (this.queue.length === 0 && this.running === 0) {
      return this.emit("empty");
    }
    while (this.running < this.concurrency && this.queue.length) {
      //remove the first task from the queue
      console.log("queue: ", this.queue);
      const task = this.queue.shift();
      console.log("Task is popped from the queue", task);
      task((err) => {
        if (err) this.emit("error", err);
        this.running--;
        console.log("running: ", this.running);
        this.next();
      });
      this.running++;
    }
  }
}
