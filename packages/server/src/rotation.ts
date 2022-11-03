const ONE_HOUR = 1000 * 60 * 60;

/**
 * Wrapper class for a value which needs to be rotated after a specified amount
 * of time.
 *
 * TODO: test this.
 */
export class Rotating<T> {
  private create: () => T;
  private value: T;
  private timestamp: number;
  private lifetime: number;

  /**
   * Constructor for a generic rotating value which should be replaced after a
   * specified amount of time.
   *
   * @param create Function to regenerate the rotating value upon invalidation.
   * This should generate a pseudo-random replacement value whenever called.
   * @param lifetime the lifetime of the value in ms before it is rotated.
   */
  constructor(create: () => T, lifetime: number = ONE_HOUR) {
    this.create = create;
    this.value = this.create();
    this.timestamp = Date.now();
    this.lifetime = lifetime;
  }

  /**
   * Retrieve the value, updating it if it needs to be rotated.
   */
  get(): T {
    if (Date.now() > this.timestamp + this.lifetime) {
      this.timestamp = Date.now();
      this.value = this.create();
      console.log('Rotating!');
    }

    return this.value;
  }
}
