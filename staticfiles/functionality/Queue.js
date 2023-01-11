class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;

    this.step = 1;
    this.cursor = this.head - this.step;
  }

  // add object to queue
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  // remove object from queue
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  // see what the first object of the queue is
  peek() {
    return this.elements[this.head];
  }

  // num objects in queue
  get length() {
    return this.tail - this.head;
  }

  // see if queue is empty
  get isEmpty() {
    return this.length === 0;
  }
}
export default Queue;
