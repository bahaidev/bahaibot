/* eslint-disable jsdoc/reject-any-type -- Needed */
/**
 * @typedef {any} AnyValue
 */
/* eslint-enable jsdoc/reject-any-type -- Needed */

/**
 * @typedef {Record<
 *   string,
 *   {
 *     simpleSpy?: import('sinon').SinonSpy,
 *     argSpies?: (import('sinon').SinonSpy<unknown[], AnyValue> | null)[][],
 *     childSpies?: import('sinon').SinonSpy[],
 *     childAccessorSpies?: AnyValue[]
 *   }
 * >} Spies
 */

/**
 * Note: Only destructure the results after running your code.
 * @param {AnyValue} ancestor
 * @param {string} descendants Dot-separated
 * @param {Record<
 *   string,
 *   {
 *     childSpies?: (string|number|symbol)[]
 *   } & {
 *     childAccessorSpies?: [
 *       childAccessorName: string,
 *       accessors: ("get"|"set")[]
 *     ][]
 *   } & {
 *     argSpies?: import('sinon').SinonSpy[]
 *   } & {
 *     simpleSpy: boolean
 *   }
 * >} config Keyed by method name.
 *
 * `argSpies` is an array of booleans indicating whether
 * to pass in a spy for any given argument value of the method (or just to
 * pass in the argument value). This result will be returned, but first, any
 * `childSpies` method strings (an array of strings) will indicate methods on
 * the result on which to spy.
 *
 * Similarly, any `childAccessorSpies` property strings (an array of arrays
 * with the first item a property name string and the second item an array of
 * "get" and/or "set") will indicate properties on the result on which to spy.
 *
 * If `simpleSpy` is `true`, will create a basic
 * spy for watching non-spy arguments of this method, though while allowing
 * for `childSpies` (and `childAccessorSpies`).
 * @this {import('sinon').SinonSandbox}
 * @returns {Spies} `simpleSpy` is a single function.
 *
 * The return `argSpies` will be an array of arrays of spies. Each call of the
 * method will correlate with a separate child array, while the individual
 * argument spy functions may get called multiple times as callbacks.
 */
function spyOnGetterResults (ancestor, descendants, config) {
  const [child, grandchild] = descendants.split('.');

  // Grab a copy of the method as it is now, then ovewrite it so
  //  that existing getters don't create new copies and remove our
  //  spies. Thankfully, these methods aren't frozen/non-configurable.
  /*
  const grandchildOriginal = Object.getOwnPropertyDescriptor(
    ancestor[child], grandchild
  ).value;
  */
  const grandchildOriginal = ancestor[child][grandchild];

  /**
   * @type {Spies}
   */
  const spies = {};

  /**
   * @type {Record<
   *   string,
   *   Record<
   *     string,
   *     (...args: AnyValue[]) => AnyValue
   *   >
   * >}
   */
  const grandchildren = {
    [grandchild]: {}
  };

  Object.entries(config).forEach(([method, {
    childSpies = [], childAccessorSpies = [], argSpies = [], simpleSpy
  }]) => {
    spies[method] = {};

    if (simpleSpy) {
      spies[method].simpleSpy = this.spy(
        ancestor[child][grandchild], method
      );
    }

    // Todo: This should offer an option to increment per call and then
    //   add a different spy for at least the children so different
    //   results may allow different expectations
    /**
     * @param {...AnyValue} args
     * @returns {AnyValue}
     */
    grandchildren[grandchild][method] = (...args) => {
      let result;
      if (argSpies.length) {
        /** @type {AnyValue[]} */
        const newArgs = [];
        if (!spies[method].argSpies) {
          spies[method].argSpies = [];
        }

        const mapped = argSpies.map((_argSpy, idx) => {
          if (!_argSpy) {
            newArgs.push(args[idx]);
            return null;
          }
          const argSpy = this.spy(args[idx]);
          newArgs.push(argSpy);
          return argSpy;
        });
        spies[method].argSpies.push(mapped);

        result = grandchildOriginal[method](
          ...newArgs
        );
      } else {
        result = grandchildOriginal[method](
          ...args
        );
      }

      // Todo: `childAccessorSpies` and `childSpies` should perhaps act like
      //   `argSpies` in having an array of arrays in case the parent was built
      //   multiple times

      // Todo: These should allow for a key in case multiple getters were
      //  needed per object, e.g., with code like this in a loop:
      // user = client.users.cache.find((val) => val.username === item);
      // user.prop;

      if (spies[method].childAccessorSpies) {
        const cas = childAccessorSpies.map(([
          childAccessorName,
          accessors
        ]) => {
          let ret;
          try {
            ret = this.spy(result, childAccessorName, accessors);
          } catch (e) {
            ret = result;
          }
          return ret;
        });
        spies[method].childAccessorSpies.push(
          ...cas
        );
      } else {
        spies[method].childAccessorSpies = childAccessorSpies.map(([
          childAccessorName,
          // ['get' and/or 'set']
          accessors
        ]) => {
          return this.spy(result, childAccessorName, accessors);
        });
      }

      if (spies[method].childSpies) {
        spies[method].childSpies.push(
          ...childSpies.map((childSpy) => {
            let ret;
            try {
              ret = this.spy(result, childSpy);
            } catch (err) {
              ret = result;
            }
            return ret;
          })
        );
      } else {
        spies[method].childSpies = childSpies.map((childSpy) => {
          return this.spy(result, childSpy);
        });
      }

      return result;
    };
  });

  this.stub(ancestor, child).value(grandchildren);

  return spies;
}

export default spyOnGetterResults;
