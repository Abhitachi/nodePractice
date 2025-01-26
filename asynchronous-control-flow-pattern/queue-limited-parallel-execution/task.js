import { TaskQueue } from "./TaskQueue.js";

function makeSampleTask(name) {
  return (cb) => {
    console.log(`${name} started`);
    setTimeout(() => {
      console.log(`${name} finished`);
      cb();
    }, Math.random() * 1000);
  };
}

const queue = new TaskQueue(2); // concurrency = 2
queue.on("error", console.error);
queue.on("empty", () => console.log("queue empty"));

function task1(cb) {
  console.log("task1 started");
  queue
    .pushTask(makeSampleTask("task1 -> subtask1"))
    .pushTask(makeSampleTask("task1 -> subtask2"));
  setTimeout(() => {
    console.log("task1 finished");
    cb();
  }, Math.random() * 1000);
}

function task2(cb) {
  console.log("task2 started");
  queue
    .pushTask(makeSampleTask("task2 -> subtask1"))
    .pushTask(makeSampleTask("task2 -> subtask2"));
  setTimeout(() => {
    console.log("task2 finished");
    cb();
  }, Math.random() * 1000);
}

queue.pushTask(task1).pushTask(task2);
