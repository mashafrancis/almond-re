declare namespace minimumDelay {
  interface Options {
    /**
     Delay the rejection.
     Turn this off if you want a rejected promise to fail fast.
     @default true
     */
    readonly delayRejection?: boolean;
  }
}

declare const minimumDelay: {
  <ValueType>(
    promise: PromiseLike<ValueType>,
    minimumDelay: number,
    options?: minimumDelay.Options,
  ): Promise<ValueType>;

  // TODO: Remove this for the next major release, refactor the whole definition to:
  // declare function pMinDelay<ValueType>(
  // 	promise: PromiseLike<ValueType>,
  // 	minimumDelay: number,
  // 	options?: pMinDelay.Options
  // ): Promise<ValueType>;
  // export = pMinDelay;
  default: typeof minimumDelay;
};

export default minimumDelay;
