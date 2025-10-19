import { createRequire } from 'module';
import require$$0$5, { EventEmitter, once } from 'events';
import require$$0$3, { Buffer as Buffer$1 } from 'buffer';
import crypto, { getCiphers } from 'crypto';
import { createSocket } from 'dgram';
import require$$3$1, { isIPv4 } from 'net';
import require$$1$1 from 'https';
import require$$2$1 from 'http';
import require$$4$1 from 'tls';
import require$$0$4, { Readable, pipeline } from 'stream';
import require$$7 from 'url';
import require$$0$2 from 'zlib';
import process$1, { nextTick } from 'process';
import require$$0$6 from 'child_process';
import require$$2$2 from 'ffmpeg-static';
import { resolve, dirname } from 'path';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = true,
      _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };
  var _super = RegExp.prototype,
    _groups = new WeakMap();
  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);
    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype);
  }
  function buildGroups(result, re) {
    var g = _groups.get(re);
    return Object.keys(g).reduce(function (groups, name) {
      var i = g[name];
      if ("number" == typeof i) groups[name] = result[i];else {
        for (var k = 0; void 0 === result[i[k]] && k + 1 < i.length;) k++;
        groups[name] = result[i[k]];
      }
      return groups;
    }, Object.create(null));
  }
  return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);
    if (result) {
      result.groups = buildGroups(result, this);
      var indices = result.indices;
      indices && (indices.groups = buildGroups(indices, this));
    }
    return result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);
      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        var group = groups[name];
        return "$" + (Array.isArray(group) ? group.join("$") : group);
      }));
    }
    if ("function" == typeof substitution) {
      var _this = this;
      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }
    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint);
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// We want it to work in the browser, so commenting out
// import jsonExtra from 'json5';
// import jsonExtra from 'json-6';

/**
 * @typedef {any} JSON6
 */

// @ts-expect-error Need typing for JSON6
var _jsonExtra = globalThis.jsonExtra;

/**
 * @param {string} str
 * @returns {string}
 */
var unescapeBackslashes = function unescapeBackslashes(str) {
  return str.replace(/\\+/g, function (esc) {
    return esc.slice(0, esc.length / 2);
  });
};

/**
 * @typedef {any} AnyValue
 */

/**
 * @param {string} args
 * @returns {AnyValue}
 */
var parseJSONExtra = function parseJSONExtra(args) {
  return _jsonExtra.parse(
  // Doesn't actually currently allow explicit brackets,
  //  but in case we change our regex to allow inner brackets
  '{' + (args || '').replace(/^\{/, '').replace(/\}$/, '') + '}');
};

// Todo: Extract to own library (RegExtras?)

/**
 * @callback BetweenMatches
 * @param {string} str
 * @returns {void}
 */

/**
 * @callback AfterMatch
 * @param {string} str
 * @returns {void}
 */

/**
 * @callback EscapeAtOne
 * @param {string} str
 * @returns {void}
 */

/**
 * @param {RegExp} regex
 * @param {string} str
 * @param {{
 *   onMatch: (...arg0: string[]) => void,
 *   extra?: BetweenMatches|AfterMatch|EscapeAtOne
 *   betweenMatches?: BetweenMatches,
 *   afterMatch?: AfterMatch,
 *   escapeAtOne?: EscapeAtOne
 * }} cfg
 */
var processRegex = function processRegex(regex, str, _ref) {
  var onMatch = _ref.onMatch,
    extra = _ref.extra,
    betweenMatches = _ref.betweenMatches,
    afterMatch = _ref.afterMatch,
    escapeAtOne = _ref.escapeAtOne;
  var match;
  var previousIndex = 0;
  if (extra) {
    betweenMatches = extra;
    afterMatch = extra;
    escapeAtOne = extra;
  }
  if (!betweenMatches || !afterMatch) {
    throw new Error('You must have `extra` or `betweenMatches` and `afterMatch` arguments.');
  }
  while ((match = regex.exec(str)) !== null) {
    var _match = match,
      _match2 = _slicedToArray(_match, 2),
      _ = _match2[0],
      esc = _match2[1];
    var lastIndex = regex.lastIndex;
    var startMatchPos = lastIndex - _.length;
    if (startMatchPos > previousIndex) {
      betweenMatches(str.slice(previousIndex, startMatchPos));
    }
    if (escapeAtOne && esc.length % 2) {
      previousIndex = lastIndex;
      escapeAtOne(_);
      continue;
    }
    onMatch.apply(void 0, _toConsumableArray(match));
    previousIndex = lastIndex;
  }
  if (previousIndex !== str.length) {
    // Get text at end
    afterMatch(str.slice(previousIndex));
  }
};

/* globals fetch, document */

/**
 * @typedef {(
 *   input: RequestInfo|URL, init?: RequestInit
 * ) => Promise<Response>} Fetch
 */
/**
 * @type {null|Fetch}
 */
var _fetch = typeof fetch !== 'undefined' ? fetch
/* c8 ignore next */ : null;

/**
 * @returns {Fetch|null}
 */
var getFetch = function getFetch() {
  return _fetch;
};

/** @type {Document|null} */
var _doc = typeof document !== 'undefined'
/* c8 ignore next */ ? document : null;

/**
 * @returns {Document|null}
 */
var getDocument = function getDocument() {
  return _doc;
};

/**
 *
 * @returns {string}
 */
function generateUUID() {
  //  Adapted from original: public domain/MIT: http://stackoverflow.com/a/8809472/271577
  var d = Date.now();
  /* c8 ignore next 5 */
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    /* eslint-disable no-bitwise */
    var r = Math.trunc((d + Math.random() * 16) % 16);
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    /* eslint-enable no-bitwise */
  });
}

/**
 *
 * @param {string} locale
 * @param {string[]} arrayOfItems
 * @param {Intl.CollatorOptions|undefined} options
 * @returns {string[]}
 */
var sort = function sort(locale, arrayOfItems, options) {
  return arrayOfItems.sort(new Intl.Collator(locale, options).compare);
};

/**
 *
 * @param {string} locale
 * @param {string[]} arrayOfItems
 * @param {Intl.ListFormatOptions|undefined} [options]
 * @returns {string}
 */
var list = function list(locale, arrayOfItems, options) {
  return new Intl.ListFormat(locale, options).format(arrayOfItems);
};

/**
 *
 * @param {string} locale
 * @param {string[]} arrayOfItems
 * @param {Intl.ListFormatOptions|undefined} [listOptions]
 * @param {Intl.CollatorOptions|undefined} [collationOptions]
 * @returns {string}
 */
var sortListSimple = function sortListSimple(locale, arrayOfItems, listOptions, collationOptions) {
  sort(locale, arrayOfItems, collationOptions);
  return list(locale, arrayOfItems, listOptions);
};

/**
 * @typedef {number} Integer
 */

/**
 *
 * @param {string} locale
 * @param {string[]} arrayOfItems
 * @param {((str: string, idx: Integer) => any)|
 *   Intl.ListFormatOptions|undefined} map
 * @param {Intl.ListFormatOptions|undefined} [listOptions]
 * @param {Intl.CollatorOptions|undefined} [collationOptions]
 * @returns {DocumentFragment|string}
 */
var sortList = function sortList(locale, arrayOfItems, map, listOptions, collationOptions) {
  if (typeof map !== 'function') {
    return sortListSimple(locale, /** @type {string[]} */arrayOfItems, map, listOptions);
  }
  sort(locale, arrayOfItems, collationOptions);
  var randomId = generateUUID();
  var placeholderArray = _toConsumableArray(arrayOfItems).map(function (_, i) {
    return "<<".concat(randomId).concat(i, ">>");
  });

  /** @type {(string|Node)[]} */
  var nodes = [];

  /**
   * @param {string} arg
   * @returns {void}
   */
  var push = function push(arg) {
    nodes.push(arg);
  };
  processRegex(
  // // eslint-disable-next-line prefer-named-capture-group
  new RegExp("<<".concat(randomId, "(\\d)>>"), 'gu'), list(locale, placeholderArray, listOptions), {
    betweenMatches: push,
    afterMatch: push,
    onMatch: function onMatch(_, idx) {
      push(map(arrayOfItems[Number(idx)], Number(idx)));
    }
  });
  var _doc = /** @type {Document} */getDocument();
  var container = _doc.createDocumentFragment();
  container.append.apply(container, nodes);
  return container;
};

/**
 * @typedef {number} Integer
 */

/**
 * @param {{
 *   object: import('./defaultLocaleResolver.js').DateRangeValueArray|
 *     import('./defaultLocaleResolver.js').ListValueArray|
 *     import('./defaultLocaleResolver.js').RelativeValueArray|
 *     import('./defaultLocaleResolver.js').ValueArray
 * }} cfg
 * @returns {{
 *   value: number|string|string[]|Date,
 *   options?: Intl.NumberFormatOptions|Intl.PluralRulesOptions|
 *     string|Date|number,
 *   extraOpts?: object,
 *   callback?: (item: string, i: Integer) => Element
 * }}
 */
var getFormatterInfo = function getFormatterInfo(_ref) {
  var object = _ref.object;
  if (Array.isArray(object)) {
    if (typeof object[1] === 'function') {
      var _object = _slicedToArray(
        /**
         * @type {[
         *   string[], (item: string, i: Integer) => Element, object, object
         * ]}
         */
        object, 4),
        _value = _object[0],
        callback = _object[1],
        _options = _object[2],
        _extraOpts = _object[3];
      return {
        value: _value,
        callback: callback,
        options: _options,
        extraOpts: _extraOpts
      };
    }
    var _object2 = _slicedToArray(object, 3),
      value = _object2[0],
      options = _object2[1],
      extraOpts = _object2[2];
    return {
      value: value,
      options: options,
      extraOpts: extraOpts
    };
  }
  return {
    value: object
  };
};

/**
 * Callback to give replacement text based on a substitution value.
 *
 * `value` - contains the value returned by the individual substitution.
 * `arg` - See `cfg.arg` of {@link SubstitutionCallback}.
 * `key` - The substitution key Not currently in use
 * `locale` - The locale.
 * @typedef {(info: {
 *   value: import('./defaultLocaleResolver.js').SubstitutionObjectValue
 *   arg?: string,
 *   key?: string,
 *   locale?: string
 * }) => string|Node} AllSubstitutionCallback
*/

/**
 * @type {AllSubstitutionCallback}
 */
var defaultAllSubstitutions = function defaultAllSubstitutions(_ref2) {
  var value = _ref2.value,
    arg = _ref2.arg;
    _ref2.key;
    var locale = _ref2.locale;
  // Strings or DOM Nodes
  if (typeof value === 'string' || value && _typeof(value) === 'object' && 'nodeType' in value) {
    return value;
  }

  /** @type {object|string|Date|number|undefined} */
  var opts;

  /**
   * @param {{
   *   type: string,
   *   options?: object,
   *   checkArgOptions?: boolean;
   * }} cfg
   * @returns {object|undefined}
   */
  var applyArgs = function applyArgs(_ref3) {
    var type = _ref3.type,
      _ref3$options = _ref3.options,
      options = _ref3$options === void 0 ? /** @type {object|undefined} */
      opts : _ref3$options,
      _ref3$checkArgOptions = _ref3.checkArgOptions,
      checkArgOptions = _ref3$checkArgOptions === void 0 ? false : _ref3$checkArgOptions;
    if (typeof arg === 'string') {
      var _arg$split = arg.split('|'),
        _arg$split2 = _slicedToArray(_arg$split, 3),
        userType = _arg$split2[0],
        extraArgs = _arg$split2[1],
        argOptions = _arg$split2[2];
      // Alias
      if (userType === 'DATE') {
        userType = 'DATETIME';
      }
      if (userType === type) {
        if (!extraArgs) {
          options = {};
        } else if (!checkArgOptions || argOptions) {
          // Todo: Allow escaping and restoring of pipe symbol
          options = _objectSpread2(_objectSpread2({}, options), parseJSONExtra(checkArgOptions && argOptions ? argOptions : extraArgs));
        }
      }
    }
    return options;
  };
  var expectsDatetime = false;
  if (value && _typeof(value) === 'object' && !Array.isArray(value)) {
    var singleKey = Object.keys(value)[0];
    if (['number', 'date', 'datetime', 'dateRange', 'datetimeRange', 'relative', 'region', 'language', 'script', 'currency', 'list', 'plural'].includes(singleKey)) {
      var extraOpts, callback;
      /**
       * @typedef {any} AnyValue
       */

      var obj = /** @type {unknown} */
      /** @type {AnyValue} */
      value[
      /**
        * @type {"number"|"date"|"datetime"|"dateRange"|
        *   "datetimeRange"|"relative"|"region"|"language"|
        *   "script"|"currency"|"list"|"plural"}
        */
      singleKey];
      var _getFormatterInfo = getFormatterInfo({
        object:
        /**
         * @type {import('./defaultLocaleResolver.js').DateRangeValueArray|
         *   import('./defaultLocaleResolver.js').ListValueArray|
         *   import('./defaultLocaleResolver.js').RelativeValueArray|
         *   import('./defaultLocaleResolver.js').ValueArray
         * }
         */
        obj
      });
      value = _getFormatterInfo.value;
      opts = _getFormatterInfo.options;
      extraOpts = _getFormatterInfo.extraOpts;
      callback = _getFormatterInfo.callback;
      switch (singleKey) {
        case 'date':
        case 'datetime':
          expectsDatetime = true;
          break;
        case 'dateRange':
        case 'datetimeRange':
          {
            var dtf = new Intl.DateTimeFormat(locale, applyArgs({
              type: 'DATERANGE',
              options: extraOpts
            }));
            return dtf.formatRange.apply(dtf, _toConsumableArray( /** @type {[Date, Date]} */
            [/** @type {number|Date} */
            value, /** @type {Date} */
            opts].map(function (val) {
              return typeof val === 'number' ? new Date(val) : val;
            })));
          }
        case 'region':
        case 'language':
        case 'script':
        case 'currency':
          return (/** @type {string} */new Intl.DisplayNames(locale, _objectSpread2(_objectSpread2({}, applyArgs({
              type: singleKey.toUpperCase()
            })), {}, {
              type: singleKey
            })).of( /** @type {string} */value)
          );
        case 'relative':
          // The second argument actually contains the primary options, so swap
          // eslint-disable-next-line max-len -- Long
          var _ref4 = /** @type {[Intl.RelativeTimeFormatUnit, object?]} */
          [opts, extraOpts];
          extraOpts = _ref4[0];
          opts = _ref4[1];
          return new Intl.RelativeTimeFormat(locale, applyArgs({
            type: 'RELATIVE'
          })).format( /** @type {number} */value, extraOpts);

        // ListFormat (with Collator)
        case 'list':
          if (callback) {
            return sortList( /** @type {string} */locale, /** @type {string[]} */
            value, callback, applyArgs({
              type: 'LIST'
            }), applyArgs({
              type: 'LIST',
              options: extraOpts,
              checkArgOptions: true
            }));
          }
          return sortList( /** @type {string} */locale, /** @type {string[]} */
          value, applyArgs({
            type: 'LIST'
          }), applyArgs({
            type: 'LIST',
            options: extraOpts,
            checkArgOptions: true
          }));
      }
    }
  }

  // Dates
  if (value) {
    if (typeof value === 'number' && (expectsDatetime || /^DATE(?:TIME)(?:\||$)/.test( /** @type {string} */arg))) {
      value = new Date(value);
    }
    if (_typeof(value) === 'object' && 'getTime' in value && typeof value.getTime === 'function') {
      return new Intl.DateTimeFormat(locale, applyArgs({
        type: 'DATETIME'
      })).format(value);
    }
  }

  // Date range
  if (Array.isArray(value)) {
    var _Intl$DateTimeFormat;
    var _extraOpts2 = /** @type {Intl.DateTimeFormatOptions|undefined} */
    value[2];
    return (_Intl$DateTimeFormat = new Intl.DateTimeFormat(locale, applyArgs({
      type: 'DATERANGE',
      options: _extraOpts2
    }))).formatRange.apply(_Intl$DateTimeFormat, _toConsumableArray( /** @type {[Date, Date]} */
    value.slice(0, 2).map(function (val) {
      return typeof val === 'number' ? new Date(val) : val;
    })));
  }

  // Numbers
  if (typeof value === 'number') {
    return new Intl.NumberFormat(locale, applyArgs({
      type: 'NUMBER'
    })).format(value);
  }

  // console.log('value', value);
  throw new TypeError('Unknown formatter');
};

/**
 * Base class for formatting.
 */
var Formatter = /*#__PURE__*/_createClass(function Formatter() {
  _classCallCheck(this, Formatter);
});

/**
 * @param {object} cfg
 * @param {string} cfg.key
 * @param {import('./getMessageForKeyByStyle.js').LocaleBody} cfg.body
 * @param {string} cfg.type
 * @param {"richNested"|"rich"|"plain"|
 *   "plainNested"|import('./getMessageForKeyByStyle.js').
 *   MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @returns {string}
 */
var _getSubstitution = function getSubstitution(_ref) {
  var key = _ref.key,
    body = _ref.body,
    type = _ref.type,
    _ref$messageStyle = _ref.messageStyle,
    messageStyle = _ref$messageStyle === void 0 ? 'richNested' : _ref$messageStyle;
  var messageForKey = getMessageForKeyByStyle({
    messageStyle: messageStyle
  });
  var substitution = messageForKey({
    body: body
  }, key);
  if (!substitution) {
    throw new Error("Key value not found for ".concat(type, " key: (").concat(key, ")"));
  }
  // We don't allow a substitution function here or below as comes
  //  from locale and locale content should not pose security concerns
  return substitution.value;
};

/**
 * Formatter for local variables.
 */
var LocalFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(LocalFormatter, _Formatter);
  var _super = _createSuper(LocalFormatter);
  /**
   * @param {import('./getMessageForKeyByStyle.js').LocalObject} locals
   */
  function LocalFormatter(locals) {
    var _this;
    _classCallCheck(this, LocalFormatter);
    _this = _super.call(this);
    _this.locals = locals;
    return _this;
  }
  /**
   * @param {string} key
   * @returns {string|Element}
   */
  _createClass(LocalFormatter, [{
    key: "getSubstitution",
    value: function getSubstitution(key) {
      return _getSubstitution({
        key: key.slice(1),
        body: this.locals,
        type: 'local'
      });
    }
    /**
     * @param {string} key
     * @returns {boolean}
     */
  }, {
    key: "isMatch",
    value: function isMatch(key) {
      var components = key.slice(1).split('.');
      /** @type {import('./getMessageForKeyByStyle.js').LocaleBody} */
      var parent = this.locals;
      return (/** @type {typeof LocalFormatter} */this.constructor.isMatchingKey(key) && components.every(function (cmpt) {
          var result = (cmpt in parent);
          parent =
          /**
           * @type {import('./defaultLocaleResolver.js').
           *     RichNestedLocaleStringBodyObject|
           *   import('./defaultLocaleResolver.js').
           *     PlainNestedLocaleStringBodyObject|
           *   import('./defaultLocaleResolver.js').RichLocaleStringSubObject
           * }
           */
          /**
           * @type {import('./defaultLocaleResolver.js').
           *     RichNestedLocaleStringBodyObject|
           *   import('./defaultLocaleResolver.js').
           *     PlainNestedLocaleStringBodyObject
           * }
           */
          parent[cmpt];
          return result;
        })
      );
    }
    /**
     * @param {string} key
     * @returns {boolean}
     */
  }], [{
    key: "isMatchingKey",
    value: function isMatchingKey(key) {
      return key.startsWith('-');
    }
  }]);
  return LocalFormatter;
}(Formatter);

/**
 * Formatter for regular variables.
 */
var RegularFormatter = /*#__PURE__*/function (_Formatter2) {
  _inherits(RegularFormatter, _Formatter2);
  var _super2 = _createSuper(RegularFormatter);
  /**
   * @param {import('./defaultLocaleResolver.js').SubstitutionObject
   * } substitutions
   */
  function RegularFormatter(substitutions) {
    var _this2;
    _classCallCheck(this, RegularFormatter);
    _this2 = _super2.call(this);
    _this2.substitutions = substitutions;
    return _this2;
  }
  /**
   * @param {string} key
   * @returns {boolean}
   */
  _createClass(RegularFormatter, [{
    key: "isMatch",
    value: function isMatch(key) {
      return (/** @type {typeof RegularFormatter} */this.constructor.isMatchingKey(key) && key in this.substitutions
      );
    }
    /**
     * @param {string} key
     * @returns {boolean}
     */
  }], [{
    key: "isMatchingKey",
    value: function isMatchingKey(key) {
      return /^[0-9A-Z_a-z]/.test(key);
    }
  }]);
  return RegularFormatter;
}(Formatter);

/**
 * Formatter for switch variables.
 */
var SwitchFormatter = /*#__PURE__*/function (_Formatter3) {
  _inherits(SwitchFormatter, _Formatter3);
  var _super3 = _createSuper(SwitchFormatter);
  /**
   * @param {import('./defaultLocaleResolver.js').Switches} switches
   * @param {object} cfg
   * @param {import('./defaultLocaleResolver.js').
   *   SubstitutionObject} cfg.substitutions
   */
  function SwitchFormatter(switches, _ref2) {
    var _this3;
    var substitutions = _ref2.substitutions;
    _classCallCheck(this, SwitchFormatter);
    _this3 = _super3.call(this);
    _this3.switches = switches;
    _this3.substitutions = substitutions;
    return _this3;
  }

  /**
   * @param {string} key
   * @param {object} cfg
   * @param {string} cfg.locale
   * @param {(string|undefined)[]} cfg.usedKeys
   * @param {string} cfg.arg
   * @param {import('./getDOMForLocaleString.js').
   *   MissingSuppliedFormattersCallback} cfg.missingSuppliedFormatters
   * @returns {string}
   */
  _createClass(SwitchFormatter, [{
    key: "getSubstitution",
    value: function getSubstitution(key, _ref3) {
      var locale = _ref3.locale,
        usedKeys = _ref3.usedKeys,
        arg = _ref3.arg,
        missingSuppliedFormatters = _ref3.missingSuppliedFormatters;
      var ky = /** @type {typeof SwitchFormatter} */this.constructor.getKey(key).slice(1);
      // Expression might not actually use formatter, e.g., for singular,
      //  the conditional might just write out "one"

      var _this$getMatch = this.getMatch(ky),
        _this$getMatch2 = _slicedToArray(_this$getMatch, 3),
        objKey = _this$getMatch2[0],
        body = _this$getMatch2[1],
        keySegment = _this$getMatch2[2];
      usedKeys.push(keySegment);
      var type;
      /** @type {string} */
      var opts;
      if (objKey && objKey.includes('|')) {
        var _objKey$split = objKey.split('|');
        var _objKey$split2 = _slicedToArray(_objKey$split, 3);
        type = _objKey$split2[1];
        opts = _objKey$split2[2];
      }
      if (!body) {
        missingSuppliedFormatters({
          key: key,
          formatter: this
        });
        return '\\{' + key + '}';
      }

      /*
      if (!(ky in this.substitutions)) {
        throw new Error(`Switch expecting formatter: ${ky}`);
      }
      */

      /**
       * @param {number} value
       * @param {Intl.NumberFormatOptions|undefined} [defaultOptions]
       * @returns {string}
       */
      var getNumberFormat = function getNumberFormat(value, defaultOptions) {
        var numberOpts = parseJSONExtra(opts);
        return new Intl.NumberFormat(locale, _objectSpread2(_objectSpread2({}, defaultOptions), numberOpts)).format(value);
      };

      /**
       * @param {number} value
       * @param {Intl.PluralRulesOptions|undefined} [defaultOptions]
       * @returns {Intl.LDMLPluralRule}
       */
      var getPluralFormat = function getPluralFormat(value, defaultOptions) {
        var pluralOpts = parseJSONExtra(opts);
        return new Intl.PluralRules(locale, _objectSpread2(_objectSpread2({}, defaultOptions), pluralOpts)).select(value);
      };
      var formatterValue = this.substitutions[/** @type {string} */keySegment];
      var match = formatterValue;
      if (typeof formatterValue === 'number') {
        switch (type) {
          case 'NUMBER':
            match = getNumberFormat(formatterValue);
            break;
          case 'PLURAL':
            match = getPluralFormat(formatterValue);
            break;
          default:
            match = new Intl.PluralRules(locale).select(formatterValue);
            break;
        }
      } else if (formatterValue && _typeof(formatterValue) === 'object') {
        var singleKey = Object.keys(formatterValue)[0];
        if (['number', 'plural'].includes(singleKey)) {
          var _getFormatterInfo = getFormatterInfo({
              object:
              /**
               * @type {import('./defaultLocaleResolver.js').NumberInfo|
               *   import('./defaultLocaleResolver.js').PluralInfo}
               */
              // @ts-expect-error Ok
              formatterValue[/** @type {"number"|"plural"} */singleKey]
            }),
            value = _getFormatterInfo.value,
            options = _getFormatterInfo.options;
          if (!type) {
            type = singleKey.toUpperCase();
          }
          var typeMatches = singleKey.toUpperCase() === type;
          if (!typeMatches) {
            throw new TypeError("Expecting type \"".concat(type.toLowerCase(), "\"; instead found \"").concat(singleKey, "\"."));
          }
          // eslint-disable-next-line default-case
          switch (type) {
            case 'NUMBER':
              match = getNumberFormat( /** @type {number} */value, /** @type {Intl.NumberFormatOptions} */
              options);
              break;
            case 'PLURAL':
              match = getPluralFormat( /** @type {number} */value, /** @type {Intl.PluralRulesOptions} */
              options);
              break;
          }
        }
      }

      // We do not want the default `richNested` here as that will split
      //  up the likes of `0.0`
      var messageStyle = 'richNested';

      /**
       * @param {string} s
       * @returns {string}
       */
      var preventNesting = function preventNesting(s) {
        return s.replace(/\\/g, '\\\\').replace(/\./g, '\\.');
      };
      try {
        return _getSubstitution({
          messageStyle: messageStyle,
          key: match ? preventNesting( /** @type {string} */match) : arg,
          body: body,
          type: 'switch'
        });
      } catch (err) {
        try {
          return _getSubstitution({
            messageStyle: messageStyle,
            key: '*' + preventNesting( /** @type {string} */match),
            body: body,
            type: 'switch'
          });
        } catch (error) {
          var k = Object.keys(body).find(function (switchKey) {
            return switchKey.startsWith('*');
          });
          if (!k) {
            throw new Error("No defaults found for switch ".concat(ky));
          }
          return _getSubstitution({
            messageStyle: messageStyle,
            key: preventNesting(k),
            body: body,
            type: 'switch'
          });
        }
      }
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
  }, {
    key: "isMatch",
    value: function isMatch(key) {
      return Boolean(key && /** @type {typeof SwitchFormatter} */this.constructor.isMatchingKey(key) && this.getMatch(key.slice(1)).length);
    }

    /**
    * @typedef {[
    *   objKey?: string,
    *   body?: import('./getMessageForKeyByStyle.js').LocaleBody,
    *   keySegment?: string
    * ]} SwitchMatch
    */

    /**
     * @typedef {number} Integer
     */

    /**
     * @param {string} ky
     * @returns {SwitchMatch}
     */
  }, {
    key: "getMatch",
    value: function getMatch(ky) {
      var _this4 = this;
      var ks = ky.split('.');
      var returnValue = /** @type {unknown} */ks.reduce(
      /**
       * @param {import('./defaultLocaleResolver.js').SwitchArrays|
       *   import('./defaultLocaleResolver.js').SwitchArray} obj
       * @param {string} k
       * @param {Integer} i
       * @throws {Error}
       * @returns {SwitchMatch|
       *   import('./defaultLocaleResolver.js').SwitchCaseArray|
       *   import('./defaultLocaleResolver.js').SwitchArray}
       */
      // @ts-expect-error It works
      function (obj, k, i) {
        if (i < ks.length - 1) {
          if (!(k in obj)) {
            throw new Error("Switch key \"".concat(k, "\" not found (from \"~").concat(ky, "\")"));
          }
          return obj[k];
        }
        // Todo: Should throw on encountering duplicate fundamental keys (even
        //  if there are different arguments, that should not be allowed)
        var ret = Object.entries(obj).find(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
            switchKey = _ref5[0];
          return k === /** @type {typeof SwitchFormatter} */_this4.constructor.getKey(switchKey);
        });
        return ret ? [].concat(_toConsumableArray(ret), [k]) : [];
      }, this.switches);
      return (/** @type {SwitchMatch} */returnValue
      );
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
  }], [{
    key: "isMatchingKey",
    value: function isMatchingKey(key) {
      return key.startsWith('~');
    }
    /**
     * @param {string} key
     * @returns {string}
     */
  }, {
    key: "getKey",
    value: function getKey(key) {
      var match = key.match(/^(?:[\0-\{\}-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*/);
      return (/** @type {string} */match && match[0]
      );
    }
  }]);
  return SwitchFormatter;
}(Formatter);

/**
 * @typedef {(value: any) => Promise<any>|any} PromiseChainErrback
 */

/**
 * The given array will have its items processed in series; if the supplied
 *  `errBack` (which is guaranteed to run at least once), when passed the
 *  current item, returns a `Promise` or value that resolves, that value will
 *  be used for the return result of this function and no other items in
 *  the array will continue to be processed; if it rejects, however, the
 *  next item will be processed with `errBack`.
 * Accept an array of values to pass to an errback which should return
 *  a promise (or final result value) which resolves to a result or which
 *  rejects so that the next item in the array can be checked in series.
 * @param {Array<any>} values Array of values
 * @param {PromiseChainErrback} errBack Accepts an item of the array as its
 *   single argument
 * @param {string} [errorMessage="Reached end of values array."]
 * @returns {Promise<any>} Either resolves to a value derived from an item in
 *  the array or rejects if all items reject
 * @example
promiseChainForValues(['a', 'b', 'c'], (val) => {
  return new Promise(function (resolve, reject) {
    if (val === 'a') {
      reject(new Error('missing'));
    }
    setTimeout(() => {
      resolve(val);
    }, 100);
  });
});
 */

function _await$2(value, then, direct) {
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}
function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
function _settle(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }
        value = value.v;
      } else {
        value.o = _settle.bind(null, pact, state);
        return;
      }
    }
    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }
    pact.s = state;
    pact.v = value;
    var observer = pact.o;
    if (observer) {
      observer(pact);
    }
  }
}
var _Pact = /*#__PURE__*/function () {
  function _Pact() {}
  _Pact.prototype.then = function (onFulfilled, onRejected) {
    var result = new _Pact();
    var state = this.s;
    if (state) {
      var callback = state & 1 ? onFulfilled : onRejected;
      if (callback) {
        try {
          _settle(result, 1, callback(this.v));
        } catch (e) {
          _settle(result, 2, e);
        }
        return result;
      } else {
        return this;
      }
    }
    this.o = function (_this) {
      try {
        var value = _this.v;
        if (_this.s & 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };
    return result;
  };
  return _Pact;
}();
function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.s & 1;
}
function _for(test, update, body) {
  var stage;
  for (;;) {
    var shouldContinue = test();
    if (_isSettledPact(shouldContinue)) {
      shouldContinue = shouldContinue.v;
    }
    if (!shouldContinue) {
      return result;
    }
    if (shouldContinue.then) {
      stage = 0;
      break;
    }
    var result = body();
    if (result && result.then) {
      if (_isSettledPact(result)) {
        result = result.s;
      } else {
        stage = 1;
        break;
      }
    }
    var updateValue; 
  }
  var pact = new _Pact();
  var reject = _settle.bind(null, pact, 2);
  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;
  function _resumeAfterBody(value) {
    result = value;
    do {
      shouldContinue = test();
      if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.v) {
        _settle(pact, 1, result);
        return;
      }
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        return;
      }
      result = body();
      if (_isSettledPact(result)) {
        result = result.v;
      }
    } while (!result || !result.then);
    result.then(_resumeAfterBody).then(void 0, reject);
  }
  function _resumeAfterTest(shouldContinue) {
    if (shouldContinue) {
      result = body();
      if (result && result.then) {
        result.then(_resumeAfterBody).then(void 0, reject);
      } else {
        _resumeAfterBody(result);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
  function _resumeAfterUpdate() {
    if (shouldContinue = test()) {
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
      } else {
        _resumeAfterTest(shouldContinue);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
}
function _continue(value, then) {
  return value && value.then ? value.then(then) : then(value);
}
function _async$1(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
var promiseChainForValues = function promiseChainForValues(values, errBack) {
  var errorMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Reached end of values array.';
  if (!Array.isArray(values)) {
    throw new TypeError('The `values` argument to `promiseChainForValues` must be an array.');
  }
  if (typeof errBack !== 'function') {
    throw new TypeError('The `errBack` argument to `promiseChainForValues` must be a function.');
  }
  return _async$1(function () {
    var _exit = false,
      _interrupt = false;
    var ret;
    var p = Promise.reject(new Error('Intentionally reject so as to begin checking chain'));
    var breaking;
    return _continue(_for(function () {
      return !(_interrupt || _exit);
    }, void 0, function () {
      var value = values.shift();
      return _catch$1(function () {
        // eslint-disable-next-line no-await-in-loop
        return _await$2(p, function (_p) {
          ret = _p;
          _interrupt = true;
        });
      }, function () {
        if (breaking) {
          throw new Error(errorMessage);
        }
        // We allow one more try
        if (!values.length) {
          breaking = true;
        }
        // // eslint-disable-next-line no-await-in-loop
        p = errBack(value);
      });
    }), function (_result2) {
      return ret;
    });
  })();
};

/**
* `arg` - By default, accepts the third portion of the
*   `formattingRegex` within `insertNodes`, i.e., to allow the locale to
*   supply arguments back to the calling script.
* `key` - The substitution key.
* @callback SubstitutionCallback
* @param {{
*   arg: string,
*   key: string
* }} cfg
* @returns {string|Element} The replacement text or element
*/

/**
 * May have additional properties if supplying options to an underlying
 * formatter.
 * The first value is the main value.
 * The second are the options related to the main value.
 * The third are any additional options.
 * @typedef {[string|number|Date, object?, object?]} ValueArray
 */

/**
 * @typedef {number} Integer
 */

/**
 * @typedef {[
 *   string[],
 *   (((item: string, i: Integer) => Element)|object)?,
 *   object?,
 *   object?
 * ]} ListValueArray
 */

/**
 * @typedef {[
 *   Date|number, Date|number, Intl.DateTimeFormatOptions|undefined
 * ]} DateRangeValueArray
 */

/**
 * @typedef {[number, Intl.RelativeTimeFormatUnit, object?]} RelativeValueArray
 */

/**
 * @typedef {object} RelativeTimeInfo
 * @property {RelativeValueArray} relative
 */

/**
 * @typedef {object} ListInfo
 * @property {ListValueArray} list
 */

/**
 * @typedef {object} NumberInfo
 * @property {ValueArray|number} number
 */

/**
 * @typedef {object} DateInfo
 * @property {ValueArray} date
 */

/**
 * @typedef {object} DateTimeInfo
 * @property {ValueArray} datetime
 */

/**
 * @typedef {object} DateRangeInfo
 * @property {DateRangeValueArray} dateRange
 */

/**
 * @typedef {object} DatetimeRangeInfo
 * @property {DateRangeValueArray} datetimeRange
 */

/**
 * @typedef {object} RegionInfo
 * @property {ValueArray} region
 */

/**
 * @typedef {object} LanguageInfo
 * @property {ValueArray} language
 */

/**
 * @typedef {object} ScriptInfo
 * @property {ValueArray} script
 */

/**
 * @typedef {object} CurrencyInfo
 * @property {ValueArray} currency
 */

/**
 * @typedef {object} PluralInfo
 * @property {ValueArray} plural
 */

/**
 * @typedef {{[key: string]: string}} PlainLocaleStringBodyObject
 */

/**
 * @typedef {{
 *   [key: string]: string|PlainNestedLocaleStringBodyObject
 * }} PlainNestedLocaleStringBodyObject
 */

/**
 * @typedef {object} SwitchCaseInfo
 * @property {boolean} [default=false] Whether this conditional is the default
 */

/**
 * Contains the type, the message, and optional info about the switch case.
 * @typedef {[string, string, SwitchCaseInfo?]} SwitchCaseArray
 */

/**
 * @typedef {Object<string, SwitchCaseArray>} SwitchArray
 */

/**
 * @typedef {Object<string, SwitchArray>} SwitchArrays
 */

/**
 * @typedef {object} SwitchCase
 * @property {string} message The locale message with any formatting
 *   place-holders; defaults to use of any single conditional
 * @property {string} [description] A description to add for translators
 */

/**
 * @typedef {Object<string, SwitchCase>} Switch
 */

/**
 * @typedef {Object<string, Switch>} Switches
 */

/**
 * @typedef {object} RichLocaleStringSubObject
 * @property {string} message The locale message with any formatting
 *   place-holders; defaults to use of any single conditional
 * @property {string} [description] A description to add for translators
 * @property {Switches} [switches] Conditionals
 */

/**
 * @typedef {{
 *   [key: string]: RichLocaleStringSubObject
 * }} RichLocaleStringBodyObject
 */

/**
 * @typedef {{
 *   [key: string]: RichLocaleStringSubObject|RichNestedLocaleStringBodyObject
 * }} RichNestedLocaleStringBodyObject
 */

/**
 * Takes a base path and locale and gives a URL.
 * @callback LocaleResolver
 * @param {string} localesBasePath (Trailing slash optional)
 * @param {string} locale BCP-47 language string
 * @returns {string|false} URL of the locale file to be fetched
 */

/**
 * @typedef {[
 *   Date|number, Date|number, (Intl.DateTimeFormatOptions|undefined)?
 * ]} DateRange
 */

/**
 * @typedef {string|string[]|number|Date|DateRange|
 *     Element|Node|SubstitutionCallback|
 *     NumberInfo|PluralInfo|CurrencyInfo|LanguageInfo|ScriptInfo|
 *     DatetimeRangeInfo|DateRangeInfo|RegionInfo|DateTimeInfo|DateInfo|
 *     ListInfo|RelativeTimeInfo
 * } SubstitutionObjectValue
 */

/**
 * @typedef {{
 *   [key: string]: SubstitutionObjectValue
 * }} SubstitutionObject
 */

/**
 * @type {LocaleResolver}
 */
var defaultLocaleResolver = function defaultLocaleResolver(localesBasePath, locale) {
  if (typeof localesBasePath !== 'string') {
    throw new TypeError('`defaultLocaleResolver` expects a string `localesBasePath`.');
  }
  if (typeof locale !== 'string') {
    throw new TypeError('`defaultLocaleResolver` expects a string `locale`.');
  }
  if (/[\.\/\\]/.test(locale)) {
    throw new TypeError('Locales cannot use file-reserved characters, `.`, `/` or `\\`');
  }
  return "".concat(localesBasePath.replace(/\/$/, ''), "/_locales/").concat(locale, "/messages.json");
};

/**
 * @typedef {number} Integer
 */

/**
 * @callback Replace
 * @param {{
 *   str: string,
 *   substs?: import('./defaultLocaleResolver.js').SubstitutionObject,
 *   formatter?: import('./Formatter.js').RegularFormatter|
 *     import('./Formatter.js').LocalFormatter|
 *     import('./Formatter.js').SwitchFormatter
 * }} cfg
 * @returns {string}
 */

/**
 * @callback ProcessSubstitutions
 * @param {{
 *   str: string,
 *   substs?: import('./defaultLocaleResolver.js').SubstitutionObject,
 *   formatter?: import('./Formatter.js').RegularFormatter|
 *     import('./Formatter.js').LocalFormatter|
 *     import('./Formatter.js').SwitchFormatter
 * }} cfg
 * @returns {(string|Node)[]}
 */

/**
 * Callback to return a string or array of nodes and strings based on
 *   a localized string, substitutions object, and other metadata.
 *
 * `string` - The localized string.
 * `dom` - If substitutions known to contain DOM, can be set
 *    to `true` to optimize.
 * `usedKeys` - Array for tracking which keys have been used. Defaults
 *   to empty array.
 * `substitutions` - The formatting substitutions object.
 * `allSubstitutions` - The
 *   callback or array composed thereof for applying to each substitution.
 * `locale` - The successfully resolved locale
 * `locals` - The local section.
 * `switches` - The switch section.
 * `maximumLocalNestingDepth` - Depth of local variable resolution to
 *   check before reporting a recursion error. Defaults to 3.
 * `missingSuppliedFormatters` - Callback
 *   supplied key to throw if the supplied key is present (if
 *   `throwOnMissingSuppliedFormatters` is enabled). Defaults to no-op.
 * `checkExtraSuppliedFormatters` - No
 *   argument callback to check if any formatters are not present in `string`
 *   (if `throwOnExtraSuppliedFormatters` is enabled). Defaults to no-op.
 * @typedef {(cfg: {
 *   string: string,
 *   dom?: boolean,
 *   usedKeys: string[],
 *   substitutions: import('./defaultLocaleResolver.js').SubstitutionObject,
 *   allSubstitutions?: ?(
 *     import('./defaultAllSubstitutions.js').AllSubstitutionCallback|
 *     import('./defaultAllSubstitutions.js').AllSubstitutionCallback[]
 *   )
 *   locale: string|undefined,
 *   locals?: import('./getMessageForKeyByStyle.js').LocalObject|undefined,
 *   switches: import('./defaultLocaleResolver.js').Switches|undefined,
 *   maximumLocalNestingDepth?: Integer,
 *   missingSuppliedFormatters: import('./getDOMForLocaleString.js').
 *     MissingSuppliedFormattersCallback,
 *   checkExtraSuppliedFormatters: import('./getDOMForLocaleString.js').
 *     CheckExtraSuppliedFormattersCallback
 * }) => string|(Node|string)[]} InsertNodesCallback
 */

/**
 * @type {InsertNodesCallback}
 */
var defaultInsertNodes = function defaultInsertNodes(_ref) {
  var string = _ref.string,
    dom = _ref.dom,
    usedKeys = _ref.usedKeys,
    substitutions = _ref.substitutions,
    allSubstitutions = _ref.allSubstitutions,
    locale = _ref.locale,
    locals = _ref.locals,
    switches = _ref.switches,
    _ref$maximumLocalNest = _ref.maximumLocalNestingDepth,
    maximumLocalNestingDepth = _ref$maximumLocalNest === void 0 ? 3 : _ref$maximumLocalNest,
    missingSuppliedFormatters = _ref.missingSuppliedFormatters,
    checkExtraSuppliedFormatters = _ref.checkExtraSuppliedFormatters;
  if (typeof maximumLocalNestingDepth !== 'number') {
    throw new TypeError('`maximumLocalNestingDepth` must be a number.');
  }
  var addFunctionKeys = function addFunctionKeys() {
    Object.entries(substitutions).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];
      if (typeof value === 'function') {
        usedKeys.push(key);
      }
    });
  };
  addFunctionKeys();
  var localFormatter = new LocalFormatter( /** @type {import('./getMessageForKeyByStyle.js').LocalObject} */locals);
  var regularFormatter = new RegularFormatter(substitutions);
  var switchFormatter = new SwitchFormatter( /** @type {import('./defaultLocaleResolver.js').Switches} */
  switches, {
    substitutions: substitutions
  });

  // eslint-disable-next-line max-len
  // eslint-disable-next-line prefer-named-capture-group, unicorn/no-unsafe-regex
  var formattingRegex = /(\\*)\{((?:(?:[\0-\|~-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])|\\\})*?)(?:(\|)((?:[\0-\|~-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*))?\}/g;
  if (allSubstitutions) {
    allSubstitutions = Array.isArray(allSubstitutions) ? allSubstitutions : [allSubstitutions];
  }

  /**
   * @param {{
   *   key: string,
   *   arg: string,
   *   substs: import('./defaultLocaleResolver.js').SubstitutionObject
   * }} cfg
   * @returns {string|Node}
   */
  var getSubstitution = function getSubstitution(_ref4) {
    var key = _ref4.key,
      arg = _ref4.arg,
      substs = _ref4.substs;
    /** @type {import('./defaultLocaleResolver.js').SubstitutionObjectValue} */
    var substitution;
    var isLocalKey =
    /**
     * @type {typeof import('./Formatter.js').LocalFormatter}
     */
    localFormatter.constructor.isMatchingKey(key);
    if (isLocalKey) {
      substitution = localFormatter.getSubstitution(key);
    } else if (
    /**
     * @type {typeof import('./Formatter.js').SwitchFormatter}
     */
    switchFormatter.constructor.isMatchingKey(key)) {
      substitution = switchFormatter.getSubstitution(key, {
        // eslint-disable-next-line object-shorthand -- TS casting
        locale: /** @type {string} */locale,
        usedKeys: usedKeys,
        arg: arg,
        missingSuppliedFormatters: missingSuppliedFormatters
      });
    } else {
      substitution = substs[key];
      if (typeof substitution === 'function') {
        substitution = substitution({
          arg: arg,
          key: key
        });
      }
    }
    // Todo: Could support resolving locals within arguments
    // Todo: Even for `null` `allSubstitutions`, we could have
    //  a mode to throw for non-string/non-DOM (non-numbers?),
    //  or whatever is not likely intended as a target for `toString()`.
    if (allSubstitutions) {
      substitution = /** @type {string|Node} */
      /**
       * @type {import('./defaultAllSubstitutions.js').
       *   AllSubstitutionCallback[]
       * }
       */allSubstitutions.reduce(
      /**
       * @param {import('./defaultLocaleResolver.js').
       *   SubstitutionObjectValue} subst
       * @param {import('./defaultAllSubstitutions.js').
       *   AllSubstitutionCallback} allSubst
       * @returns {string|Node}
       */
      function (subst, allSubst) {
        return allSubst({
          value: subst,
          arg: arg,
          key: key,
          locale: locale
        });
      }, substitution);
    } else if (arg && /^(?:NUMBER|DATE(?:TIME|RANGE|TIMERANGE)?|REGION|LANGUAGE|SCRIPT|CURRENCY|RELATIVE|LIST)(?:\||$)/.test(arg)) {
      substitution = defaultAllSubstitutions({
        value: substitution,
        arg: arg,
        key: key,
        locale: locale
      });
    }

    // Change this and return type if other substitutions possible
    return (/** @type {string|Node} */substitution
    );
  };
  var recursiveLocalCount = 1;
  /**
   * @param {{
   *   substitution: string|Node,
   *   ky: string,
   *   arg: string,
   *   processSubsts: Replace|ProcessSubstitutions
   * }} cfg
   * @returns {number|string|Node|(string|Node)[]}
   */
  var checkLocalVars = function checkLocalVars(_ref5) {
    var substitution = _ref5.substitution,
      ky = _ref5.ky,
      arg = _ref5.arg,
      processSubsts = _ref5.processSubsts;
    /** @type {number|string|Node|(string|Node)[]} */
    var subst = substitution;
    if (typeof substitution === 'string' && substitution.includes('{')) {
      if (recursiveLocalCount++ > maximumLocalNestingDepth) {
        throw new TypeError('Too much recursion in local variables.');
      }
      if ( /** @type {typeof import('./Formatter.js').LocalFormatter} */localFormatter.constructor.isMatchingKey(ky)) {
        var extraSubsts = substitutions;
        var localFormatters;
        if (arg) {
          localFormatters = parseJSONExtra(arg);
          extraSubsts = _objectSpread2(_objectSpread2({}, substitutions), localFormatters);
        }
        subst = processSubsts({
          str: substitution,
          substs: extraSubsts,
          formatter: localFormatter
        });
        if (localFormatters) {
          checkExtraSuppliedFormatters({
            substitutions: localFormatters
          });
        }
      } else if ( /** @type {typeof import('./Formatter.js').SwitchFormatter} */
      switchFormatter.constructor.isMatchingKey(ky)) {
        subst = processSubsts({
          str: substitution
        });
      }
    }
    return subst;
  };

  // Give chance to avoid this block when known to contain DOM
  if (!dom) {
    // Run this block to optimize non-DOM substitutions
    var returnsDOM = false;

    /** @type {Replace} */
    var replace = function replace(_ref6) {
      var str = _ref6.str,
        _ref6$substs = _ref6.substs,
        substs = _ref6$substs === void 0 ? substitutions : _ref6$substs,
        _ref6$formatter = _ref6.formatter,
        formatter = _ref6$formatter === void 0 ? regularFormatter : _ref6$formatter;
      return str.replace(formattingRegex,
      /**
       * @param {string} _
       * @param {string} esc
       * @param {string} ky
       * @param {string} pipe
       * @param {string} arg
       * @returns {string}
       */
      function (_, esc, ky, pipe, arg) {
        if (esc.length % 2) {
          return _;
        }
        if (missingSuppliedFormatters({
          key: ky,
          formatter: formatter
        })) {
          return _;
        }
        /** @type {string|number|Node|(string|Node)[]} */
        var substitution = getSubstitution({
          key: ky,
          arg: arg,
          substs: substs
        });
        substitution = checkLocalVars({
          substitution: substitution,
          ky: ky,
          arg: arg,
          processSubsts: replace
        });
        returnsDOM = returnsDOM || substitution !== null && _typeof(substitution) === 'object' && 'nodeType' in substitution;
        usedKeys.push(ky);
        return esc + substitution;
      });
    };
    var ret = replace({
      str: string
    });
    if (!returnsDOM) {
      checkExtraSuppliedFormatters({
        substitutions: substitutions
      });
      usedKeys.length = 0;
      addFunctionKeys();
      return unescapeBackslashes(ret);
    }
    usedKeys.length = 0;
    addFunctionKeys();
  }
  recursiveLocalCount = 1;

  /** @type {ProcessSubstitutions} */
  var processSubstitutions = function processSubstitutions(_ref7) {
    var str = _ref7.str,
      _ref7$substs = _ref7.substs,
      substs = _ref7$substs === void 0 ? substitutions : _ref7$substs,
      _ref7$formatter = _ref7.formatter,
      formatter = _ref7$formatter === void 0 ? regularFormatter : _ref7$formatter;
    /** @type {(string|Node)[]} */
    var nodes = [];

    // Copy to ensure we are resetting index on each instance (manually
    // resetting on `formattingRegex` is problematic with recursion that
    // uses the same regex copy)
    var regex = new RegExp(formattingRegex, 'gu');

    /**
     * @param {...(string|Node)} args
     */
    var push = function push() {
      nodes.push.apply(nodes, arguments);
    };
    processRegex(regex, str, {
      extra: push,
      onMatch: function onMatch(_, esc, ky, pipe, arg) {
        if (missingSuppliedFormatters({
          key: ky,
          formatter: formatter
        })) {
          push(_);
        } else {
          if (esc.length) {
            push(esc);
          }

          /** @type {string|number|Node|(string|Node)[]} */
          var substitution = getSubstitution({
            key: ky,
            arg: arg,
            substs: substs
          });
          substitution = checkLocalVars({
            substitution: substitution,
            ky: ky,
            arg: arg,
            processSubsts: processSubstitutions
          });
          if (Array.isArray(substitution)) {
            push.apply(void 0, _toConsumableArray(substitution));
          } else if (
          // Clone so that multiple instances may be added (and no
          // side effects to user code)
          substitution && _typeof(substitution) === 'object' && 'nodeType' in substitution) {
            push(substitution.cloneNode(true));
          } else {
            // Why no number here?
            push( /** @type {string} */substitution);
          }
        }
        usedKeys.push(ky);
      }
    });
    return nodes;
  };
  var nodes = processSubstitutions({
    str: string
  });
  checkExtraSuppliedFormatters({
    substitutions: substitutions
  });
  usedKeys.length = 0;
  return nodes.map(function (node) {
    if (typeof node === 'string') {
      return unescapeBackslashes(node);
    }
    return node;
  });
};

/**
 * @callback KeyCheckerConverterCallback
 * @param {string|string[]} key By default may be an array (if the type ends
 *   with "Nested") or a string, but a non-default validator may do otherwise.
 * @param {"plain"|"plainNested"|"rich"|
 *   "richNested"|
 *   import('./getMessageForKeyByStyle.js').MessageStyleCallback
 * } messageStyle
 * @throws {TypeError}
 * @returns {string} The converted (or unconverted) key
 */

/**
 * @type {KeyCheckerConverterCallback}
 */
function defaultKeyCheckerConverter(key, messageStyle) {
  if (Array.isArray(key) && key.every(function (k) {
    return typeof k === 'string';
  }) && typeof messageStyle === 'string' && messageStyle.endsWith('Nested')) {
    return key.map(function (k) {
      return k.replace( /*#__PURE__*/_wrapRegExp(/(\\+)/g, {
        backslashes: 1
      }), '\\$<backslashes>').replace(/\./g, '\\.');
    }).join('.');
  }
  if (typeof key !== 'string') {
    throw new TypeError('`key` is expected to be a string (or array of strings for nested style)');
  }
  return key;
}

/**
* @typedef {LocaleBody} LocalObject
*/

/**
 * May also contain language code and direction, translator name and
 * contact, etc., but no defaults currently apply besides reserving `locals`
 * @typedef {object} LocaleHead
 * @property {LocalObject} [locals]
 * @property {import('./defaultLocaleResolver.js').Switches} [switches]
*/

/**
 * @typedef {import('./defaultLocaleResolver.js').
 *   RichNestedLocaleStringBodyObject|
 *   import('./defaultLocaleResolver.js').RichLocaleStringBodyObject|
 *   import('./defaultLocaleResolver.js').PlainLocaleStringBodyObject|
 *   import('./defaultLocaleResolver.js').PlainNestedLocaleStringBodyObject|
 *   object
 * } LocaleBody
 */

/**
* @typedef {object} LocaleObject
* @property {LocaleHead} [head]
* @property {LocaleBody} body
*/

/**
* @typedef {object} MessageStyleCallbackResult
* @property {string} value Regardless of message style, will contain
*    the string result
* @property {import(
*  './defaultLocaleResolver.js'
*  ).RichLocaleStringSubObject} [info] Full info on the localized item
*   (for rich message styles only)
*/

/**
* @callback MessageStyleCallback
* @param {LocaleObject} obj The exact
*   format depends on the `cfg.defaults` of `i18n`
* @param {string} key
* @returns {false|MessageStyleCallbackResult} If `false`, will resort to default
*/

/* eslint-disable max-len */
/**
 * @param {object} [cfg]
 * @param {"richNested"|"rich"|"plain"|"plainNested"|MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @returns {MessageStyleCallback}
 */
var getMessageForKeyByStyle = function getMessageForKeyByStyle() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$messageStyle = _ref.messageStyle,
    messageStyle = _ref$messageStyle === void 0 ? 'richNested' : _ref$messageStyle;
  return typeof messageStyle === 'function' ? messageStyle : messageStyle === 'richNested' ? function (mainObj, key) {
    var obj =
    /**
     * @type {import('./defaultLocaleResolver.js').
     *   RichNestedLocaleStringBodyObject
     * }
     */
    mainObj && _typeof(mainObj) === 'object' && mainObj.body;

    /**
     * @type {string[]}
     */
    var keys = [];
    // eslint-disable-next-line prefer-named-capture-group
    var possiblyEscapedCharPattern = /(\\*)\./g;

    /**
     * @param {string} val
     * @returns {void}
     */
    var mergeWithPreviousOrStart = function mergeWithPreviousOrStart(val) {
      if (!keys.length) {
        keys[0] = '';
      }
      keys[keys.length - 1] += val;
    };
    processRegex(possiblyEscapedCharPattern, key, {
      // If odd, this is just an escaped dot, so merge content with
      //   any previous
      extra: mergeWithPreviousOrStart,
      onMatch: function onMatch(_, esc) {
        // If even, there are no backslashes, or they are just escaped
        //  backslashes and not an escaped dot, so start anew, though
        //  first merge any backslashes
        mergeWithPreviousOrStart(esc);
        keys.push('');
      }
    });
    var keysUnescaped = keys.map(function (ky) {
      return unescapeBackslashes(ky);
    });

    /**
     * @type {false|{
     *   value: string|undefined,
     *   info: import('./defaultLocaleResolver.js').
     *     RichLocaleStringSubObject
     * }}
     */
    var ret = false;
    var currObj = obj;
    keysUnescaped.some(function (ky, i, kys) {
      if (!currObj || _typeof(currObj) !== 'object') {
        return true;
      }
      if (
      // If specified key is too deep, we should fail
      i === kys.length - 1 && ky in currObj && currObj[ky] && _typeof(currObj[ky]) === 'object' && 'message' in currObj[ky] &&
      // NECESSARY FOR SECURITY ON UNTRUSTED LOCALES
      typeof currObj[ky].message === 'string') {
        ret = {
          value: /** @type {string} */currObj[ky].message,
          info:
          /**
           * @type {import('./defaultLocaleResolver.js').
           *   RichLocaleStringSubObject}
           */
          currObj[ky]
        };
      }
      currObj =
      /**
       * @type {import('./defaultLocaleResolver.js').
       *   RichNestedLocaleStringBodyObject
       * }
       */
      currObj[ky];
      return false;
    });
    return ret;
  } : messageStyle === 'rich' ? function (mainObj, key) {
    var obj =
    /**
     * @type {import('./defaultLocaleResolver.js').
     *   RichLocaleStringBodyObject
     * }
     */
    mainObj && _typeof(mainObj) === 'object' && mainObj.body;
    if (obj && _typeof(obj) === 'object' && key in obj && obj[key] && _typeof(obj[key]) === 'object' && 'message' in obj[key] &&
    // NECESSARY FOR SECURITY ON UNTRUSTED LOCALES
    typeof obj[key].message === 'string') {
      return {
        value: obj[key].message,
        info: obj[key]
      };
    }
    return false;
  } : messageStyle === 'plain' ? function (mainObj, key) {
    var obj =
    /**
     * @type {import('./defaultLocaleResolver.js').
     *   PlainLocaleStringBodyObject
     * }
     */
    mainObj && _typeof(mainObj) === 'object' && mainObj.body;
    if (obj && _typeof(obj) === 'object' && key in obj && obj[key] && typeof obj[key] === 'string') {
      return {
        value: obj[key]
      };
    }
    return false;
  } : messageStyle === 'plainNested' ? function (mainObj, key) {
    var obj =
    /**
     * @type {import('./defaultLocaleResolver.js').
     *   PlainNestedLocaleStringBodyObject
     * }
     */
    mainObj && _typeof(mainObj) === 'object' && mainObj.body;
    if (obj && _typeof(obj) === 'object') {
      // Should really be counting that it is an odd number
      //  of backslashes only
      var keys = key.split(/(?<!\\)\./);
      var value = keys.reduce(
      /**
       * @param {null|string|import('./defaultLocaleResolver.js').
       *   PlainNestedLocaleStringBodyObject} o
       * @param {string} k
       * @returns {null|string|import('./defaultLocaleResolver.js').
       *   PlainNestedLocaleStringBodyObject}
       */
      function (o, k) {
        if (o && _typeof(o) === 'object' && o[k]) {
          return o[k];
        }
        return null;
      }, obj);
      if (value && typeof value === 'string') {
        return {
          value: value
        };
      }
    }
    return false;
  } : function () {
    throw new TypeError("Unknown `messageStyle` ".concat(messageStyle));
  }();
};

/**
 * @param {object} cfg
 * @param {string|false} [cfg.message] If present, this string will be
 *   the return value.
 * @param {false|null|undefined|
 *   import('./getMessageForKeyByStyle.js').LocaleObject
 * } [cfg.defaults]
 * @param {"richNested"|"rich"|"plain"|"plainNested"|
 *   import('./getMessageForKeyByStyle.js').MessageStyleCallback
 * } [cfg.messageStyle="richNested"]
 * @param {import('./getMessageForKeyByStyle.js').
 *   MessageStyleCallback
 * } [cfg.messageForKey] Defaults to getting `MessageStyleCallback` based
 *   on `messageStyle`
 * @param {string} cfg.key Key to check against object of strings;
 *   used to find a default if no string `message` is provided.
 * @returns {string}
 */
var getStringFromMessageAndDefaults = function getStringFromMessageAndDefaults(_ref) {
  var message = _ref.message,
    defaults = _ref.defaults,
    messageStyle = _ref.messageStyle,
    _ref$messageForKey = _ref.messageForKey,
    messageForKey = _ref$messageForKey === void 0 ? getMessageForKeyByStyle({
      messageStyle: messageStyle
    }) : _ref$messageForKey,
    key = _ref.key;
  // NECESSARY CHECK FOR SECURITY ON UNTRUSTED LOCALES
  /** @type {string|false} */
  var str;
  if (typeof message === 'string') {
    str = message;
  } else if (defaults === false || defaults === undefined || defaults === null) {
    str = false;
  } else if (defaults && _typeof(defaults) === 'object') {
    var msg = messageForKey(defaults, key);
    str = msg ? msg.value : msg;
  } else {
    throw new TypeError("Default locale strings must resolve to `false`, " + "nullish, or an object!");
  }
  if (str === false) {
    throw new Error("Key value not found for key: (".concat(key, ")"));
  }
  return str;
};

/**
 * @typedef {number} Integer
 */

/**
 * @callback CheckExtraSuppliedFormattersCallback
 * @param {import('./defaultLocaleResolver.js').SubstitutionObject|{
 *   substitutions: import('./defaultLocaleResolver.js').SubstitutionObject
 * }} substs (Why is an arg. of `substitutions` being passed in?)
 * @throws {Error} Upon an extra formatting key being found
 * @returns {void}
 */

/**
 * @typedef {(
 *   cfg: {
 *     key: string,
 *     formatter: import('./Formatter.js').LocalFormatter|
 *       import('./Formatter.js').RegularFormatter|
 *       import('./Formatter.js').SwitchFormatter
 *   }
 * ) => boolean} MissingSuppliedFormattersCallback
 */

/**
 *
 * @param {object} cfg
 * @param {string} cfg.string
 * @param {string} [cfg.locale] The (possibly already resolved) locale
 *   for use by configuring formatters
 * @param {import('./getMessageForKeyByStyle.js').LocalObject} [cfg.locals]
 * @param {import('./defaultLocaleResolver.js').Switches} [cfg.switches]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {?(import('./defaultAllSubstitutions.js').AllSubstitutionCallback|
 *   import('./defaultAllSubstitutions.js').AllSubstitutionCallback[])
 * } [cfg.allSubstitutions=[defaultAllSubstitutions]]
 * @param {import('./defaultInsertNodes.js').InsertNodesCallback
 * } [cfg.insertNodes=defaultInsertNodes]
 * @param {false|import('./defaultLocaleResolver.js').SubstitutionObject
 * } [cfg.substitutions=false]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {string|Text|DocumentFragment}
 */
var getDOMForLocaleString = function getDOMForLocaleString(_ref) {
  var string = _ref.string,
    locale = _ref.locale,
    locals = _ref.locals,
    switches = _ref.switches;
    var _ref$allSubstitutions = _ref.allSubstitutions,
    allSubstitutions = _ref$allSubstitutions === void 0 ? [defaultAllSubstitutions] : _ref$allSubstitutions,
    _ref$insertNodes = _ref.insertNodes,
    insertNodes = _ref$insertNodes === void 0 ? defaultInsertNodes : _ref$insertNodes,
    _ref$substitutions = _ref.substitutions,
    substitutions = _ref$substitutions === void 0 ? false : _ref$substitutions,
    _ref$dom = _ref.dom,
    dom = _ref$dom === void 0 ? false : _ref$dom,
    _ref$forceNodeReturn = _ref.forceNodeReturn,
    forceNodeReturn = _ref$forceNodeReturn === void 0 ? false : _ref$forceNodeReturn,
    _ref$throwOnMissingSu = _ref.throwOnMissingSuppliedFormatters,
    throwOnMissingSuppliedFormatters = _ref$throwOnMissingSu === void 0 ? true : _ref$throwOnMissingSu,
    _ref$throwOnExtraSupp = _ref.throwOnExtraSuppliedFormatters,
    throwOnExtraSuppliedFormatters = _ref$throwOnExtraSupp === void 0 ? true : _ref$throwOnExtraSupp;
  if (typeof string !== 'string') {
    throw new TypeError('An options object with a `string` property set to a string must ' + 'be provided for `getDOMForLocaleString`.');
  }

  /**
   * @param {string} str
   * @returns {Text|string}
   */
  var stringOrTextNode = function stringOrTextNode(str) {
    var _doc = getDocument();
    return forceNodeReturn ? /** @type {Document} */_doc.createTextNode(str) : str;
  };

  /** @type {string[]} */
  var usedKeys = [];

  /**
   * @type {CheckExtraSuppliedFormattersCallback}
   */
  var checkExtraSuppliedFormatters = function checkExtraSuppliedFormatters(_ref2) {
    var substs = _ref2.substitutions;
    if (throwOnExtraSuppliedFormatters) {
      Object.keys(substs).forEach(function (key) {
        if (!usedKeys.includes(key)) {
          throw new Error("Extra formatting key: ".concat(key));
        }
      });
    }
  };

  /**
   * @type {MissingSuppliedFormattersCallback}
   */
  var missingSuppliedFormatters = function missingSuppliedFormatters(_ref3) {
    var key = _ref3.key,
      formatter = _ref3.formatter;
    var matching = formatter.isMatch(key);
    if (
    /**
     * @type {typeof import('./Formatter.js').LocalFormatter|
     *       typeof import('./Formatter.js').RegularFormatter|
     *       typeof import('./Formatter.js').SwitchFormatter}
     */
    formatter.constructor.isMatchingKey(key) && !matching) {
      if (throwOnMissingSuppliedFormatters) {
        throw new Error("Missing formatting key: ".concat(key));
      }
      return true;
    }
    return false;
  };
  if (!substitutions && !allSubstitutions && !throwOnMissingSuppliedFormatters) {
    return stringOrTextNode(string);
  }
  if (!substitutions) {
    substitutions = {};
  }
  var nodes = insertNodes({
    string: string,
    dom: dom,
    usedKeys: usedKeys,
    substitutions: substitutions,
    allSubstitutions: allSubstitutions,
    locale: locale,
    locals: locals,
    switches: switches,
    missingSuppliedFormatters: missingSuppliedFormatters,
    checkExtraSuppliedFormatters: checkExtraSuppliedFormatters
  });
  if (typeof nodes === 'string') {
    return stringOrTextNode(nodes);
  }
  var _doc = getDocument();
  var container = /** @type {Document} */_doc.createDocumentFragment();
  container.append.apply(container, _toConsumableArray(nodes));
  return container;
};

function _await$1(value, then, direct) {
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
} /**
   * Takes a locale and returns a new locale to check.
   * @callback LocaleMatcher
   * @param {string} locale The failed locale
   * @throws {Error} If there are no further hyphens left to check
   * @returns {string|Promise<string>} The new locale to check
  */

/**
 * @type {LocaleMatcher}
 */

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
var defaultLocaleMatcher = function defaultLocaleMatcher(locale) {
  if (!locale.includes('-')) {
    throw new Error('Locale not available');
  }
  // Try without hyphen, i.e., the "lookup" algorithm:
  // See https://tools.ietf.org/html/rfc4647#section-3.4 and
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
  return locale.replace(/\x2D(?:[\0-,\.-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*$/, '');
};

/**
 * @typedef {object} LocaleObjectInfo
 * @property {import('./getMessageForKeyByStyle.js').
 *   LocaleObject} strings The successfully retrieved locale strings
 * @property {string} locale The successfully resolved locale
 */

/**
 * @typedef {{
 *   locales?: string[],
 *   defaultLocales?: string[],
 *   localesBasePath?: string,
 *   localeResolver?: import('./defaultLocaleResolver.js').LocaleResolver,
 *   localeMatcher?: "lookup"|LocaleMatcher
 * }} LocaleStringArgs
 */

/**
 * `locales` - BCP-47 language strings. Defaults to `navigator.languages`.
 * `defaultLocales` - Defaults to ["en-US"].
 * `localesBasePath` - Defaults to `.`.
 * `localeResolver` - Defaults to `defaultLocaleResolver`.
 * @typedef {(
 *   cfg?: LocaleStringArgs
 * ) => Promise<LocaleObjectInfo>} LocaleStringFinder
 */

/**
 *
 * @type {LocaleStringFinder}
 */
var findLocaleStrings = function findLocaleStrings() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    locales = _ref2.locales,
    defaultLocales = _ref2.defaultLocales,
    localeResolver = _ref2.localeResolver,
    localesBasePath = _ref2.localesBasePath,
    localeMatcher = _ref2.localeMatcher;
  return (/** @type {Promise<LocaleObjectInfo>} */_findLocale({
      locales: locales,
      defaultLocales: defaultLocales,
      localeResolver: localeResolver,
      localesBasePath: localesBasePath,
      localeMatcher: localeMatcher
    })
  );
};

/**
 * @type {(
 *   cfg: LocaleStringArgs & {
 *     headOnly?: boolean
 *   }
 * ) => Promise<string|LocaleObjectInfo>} Also has a `headOnly` boolean
 *  property to determine whether to make a simple HEAD and resolve to
 *  the locale rather than locale and contents
 */
var _findLocale = _async(function (_ref4) {
  /**
   * @callback getLocale
   * @throws {SyntaxError|TypeError|Error}
   * @param {string} locale
   * @returns {Promise<LocaleObjectInfo|string>}
   */
  var getLocale = _async(function (locale) {
    if (typeof locale !== 'string') {
      throw new TypeError('Non-string locale type');
    }
    var url = localeResolver(localesBasePath, locale);
    if (typeof url !== 'string') {
      throw new TypeError('`localeResolver` expected to resolve to (URL) string.');
    }
    return _catch(function () {
      var _fetch = /** @type {import('./shared.js').Fetch} */getFetch();
      return _await$1(headOnly ? _fetch(url, {
        method: 'HEAD'
      }) : _fetch(url), function (resp) {
        if (resp.status === 404) {
          // Don't allow browser (tested in Firefox) to continue
          //  and give `SyntaxError` with missing file or we won't be
          //  able to try without the hyphen
          throw new Error('Trying again');
        }
        return headOnly ? locale : _await$1(resp.json(), function (strings) {
          return {
            locale: locale,
            strings: strings
          };
        });
      });
    }, function (err) {
      if ( /** @type {Error} */err.name === 'SyntaxError') {
        throw err;
      }
      return _await$1( /** @type {LocaleMatcher} */localeMatcher(locale), getLocale);
    });
  });
  var _ref4$locales = _ref4.locales,
    locales = _ref4$locales === void 0 ? typeof intlDomLocale !== 'undefined' ? [intlDomLocale] : typeof navigator === 'undefined' ? [] : navigator.languages : _ref4$locales,
    _ref4$defaultLocales = _ref4.defaultLocales,
    defaultLocales = _ref4$defaultLocales === void 0 ? ['en-US'] : _ref4$defaultLocales,
    _ref4$localeResolver = _ref4.localeResolver,
    localeResolver = _ref4$localeResolver === void 0 ? defaultLocaleResolver : _ref4$localeResolver,
    _ref4$localesBasePath = _ref4.localesBasePath,
    localesBasePath = _ref4$localesBasePath === void 0 ? '.' : _ref4$localesBasePath,
    _ref4$localeMatcher = _ref4.localeMatcher,
    localeMatcher = _ref4$localeMatcher === void 0 ? 'lookup' : _ref4$localeMatcher,
    _ref4$headOnly = _ref4.headOnly,
    headOnly = _ref4$headOnly === void 0 ? false : _ref4$headOnly;
  if (localeMatcher === 'lookup') {
    localeMatcher = defaultLocaleMatcher;
  } else if (typeof localeMatcher !== 'function') {
    throw new TypeError('`localeMatcher` must be "lookup" or a function!');
  }
  return promiseChainForValues([].concat(_toConsumableArray(locales), _toConsumableArray(defaultLocales)), getLocale, 'No matching locale found for ' + [].concat(_toConsumableArray(locales), _toConsumableArray(defaultLocales)).join(', '));
});

/**
 * @typedef {import('./index.js').Sort} Sort
 */
/**
 * @typedef {import('./index.js').SortList} SortList
 */
/**
 * @typedef {import('./index.js').List} List
 */

/**
 * @typedef {import('./index.js').I18NCallback} I18NCallback
 */

/**
 * @param {object} cfg
 * @param {import('./getMessageForKeyByStyle.js').LocaleObject} cfg.strings
 * @param {string} cfg.resolvedLocale
 * @param {"richNested"|"rich"|"plain"|"plainNested"|
 *   import('./getMessageForKeyByStyle.js').
 *     MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @param {?import('./defaultAllSubstitutions.js').AllSubstitutionCallback|
 *   import('./defaultAllSubstitutions.js').
 *     AllSubstitutionCallback[]} [cfg.allSubstitutions]
 * @param {import('./defaultInsertNodes.js').
 *   InsertNodesCallback} [cfg.insertNodes=defaultInsertNodes]
 * @param {import('./defaultKeyCheckerConverter.js').
 *   KeyCheckerConverterCallback} [cfg.keyCheckerConverter]
 * @param {false|null|undefined|
 *   import('./getMessageForKeyByStyle.js').LocaleObject} [cfg.defaults]
 * @param {false|import('./defaultLocaleResolver.js').
 *   SubstitutionObject} [cfg.substitutions={}]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {I18NCallback} Rejects if no suitable locale is found.
 */

function _await(value, then, direct) {
  if (!value || !value.then) {
    value = Promise.resolve(value);
  }
  return then ? value.then(then) : value;
}

/**
 * @typedef {number} Integer
 */

/**
 * @param {object} [cfg={}]
 * @param {string[]} [cfg.locales=navigator.languages] BCP-47 language strings
 * @param {string[]} [cfg.defaultLocales=["en-US"]]
 * @param {import('./findLocaleStrings.js').
 *   LocaleStringFinder} [cfg.localeStringFinder=findLocaleStrings]
 * @param {string} [cfg.localesBasePath="."]
 * @param {import('./defaultLocaleResolver.js').
 *   LocaleResolver} [cfg.localeResolver=defaultLocaleResolver]
 * @param {"lookup"|import('./findLocaleStrings.js').
 *   LocaleMatcher} [cfg.localeMatcher="lookup"]
 * @param {"richNested"|"rich"|"plain"|"plainNested"|
 *   import('./getMessageForKeyByStyle.js').
 *     MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @param {?(import('./defaultAllSubstitutions.js').AllSubstitutionCallback|
 *   import('./defaultAllSubstitutions.js').
 *     AllSubstitutionCallback[])} [cfg.allSubstitutions]
 * @param {import('./defaultInsertNodes.js').
 *   InsertNodesCallback} [cfg.insertNodes=defaultInsertNodes]
 * @param {import('./defaultKeyCheckerConverter.js').
 *   KeyCheckerConverterCallback} [cfg.keyCheckerConverter]
 * @param {false|null|undefined|
 *   import('./getMessageForKeyByStyle.js').LocaleObject} [cfg.defaults]
 * @param {false|
 *   import('./defaultLocaleResolver.js').
 *     SubstitutionObject} [cfg.substitutions={}]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {Promise<I18NCallback>} Rejects if no suitable locale is found.
 */

function _invoke(body, then) {
  var result = body();
  if (result && result.then) {
    return result.then(then);
  }
  return then(result);
}
var i18nServer = function i18nServer(_ref) {
  var strings = _ref.strings,
    resolvedLocale = _ref.resolvedLocale,
    _ref$messageStyle = _ref.messageStyle,
    messageStyle = _ref$messageStyle === void 0 ? 'richNested' : _ref$messageStyle,
    defaultAllSubstitutionsValue = _ref.allSubstitutions,
    insertNodes = _ref.insertNodes,
    _ref$keyCheckerConver = _ref.keyCheckerConverter,
    keyCheckerConverter = _ref$keyCheckerConver === void 0 ? defaultKeyCheckerConverter : _ref$keyCheckerConver,
    defaultDefaults = _ref.defaults,
    defaultSubstitutions = _ref.substitutions,
    _ref$dom = _ref.dom,
    domDefaults = _ref$dom === void 0 ? false : _ref$dom,
    _ref$forceNodeReturn = _ref.forceNodeReturn,
    forceNodeReturnDefault = _ref$forceNodeReturn === void 0 ? false : _ref$forceNodeReturn,
    _ref$throwOnMissingSu = _ref.throwOnMissingSuppliedFormatters,
    throwOnMissingSuppliedFormattersDefault = _ref$throwOnMissingSu === void 0 ? true : _ref$throwOnMissingSu,
    _ref$throwOnExtraSupp = _ref.throwOnExtraSuppliedFormatters,
    throwOnExtraSuppliedFormattersDefault = _ref$throwOnExtraSupp === void 0 ? true : _ref$throwOnExtraSupp;
  if (!strings || _typeof(strings) !== 'object') {
    throw new TypeError("Locale strings must be an object!");
  }
  var messageForKey = getMessageForKeyByStyle({
    messageStyle: messageStyle
  });

  /**
   * @type {I18NCallback}
   */
  var formatter = function formatter(key, substitutions) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$allSubstitution = _ref2.allSubstitutions,
      allSubstitutions = _ref2$allSubstitution === void 0 ? defaultAllSubstitutionsValue : _ref2$allSubstitution,
      _ref2$defaults = _ref2.defaults,
      defaults = _ref2$defaults === void 0 ? defaultDefaults : _ref2$defaults,
      _ref2$dom = _ref2.dom,
      dom = _ref2$dom === void 0 ? domDefaults : _ref2$dom,
      _ref2$forceNodeReturn = _ref2.forceNodeReturn,
      forceNodeReturn = _ref2$forceNodeReturn === void 0 ? forceNodeReturnDefault : _ref2$forceNodeReturn,
      _ref2$throwOnMissingS = _ref2.throwOnMissingSuppliedFormatters,
      throwOnMissingSuppliedFormatters = _ref2$throwOnMissingS === void 0 ? throwOnMissingSuppliedFormattersDefault : _ref2$throwOnMissingS,
      _ref2$throwOnExtraSup = _ref2.throwOnExtraSuppliedFormatters,
      throwOnExtraSuppliedFormatters = _ref2$throwOnExtraSup === void 0 ? throwOnExtraSuppliedFormattersDefault : _ref2$throwOnExtraSup;
    key = /** @type {string} */keyCheckerConverter(key, messageStyle);
    var message = messageForKey(strings, key);
    var string = getStringFromMessageAndDefaults({
      message: message && typeof message.value === 'string' ? message.value : false,
      defaults: defaults,
      messageForKey: messageForKey,
      key: key
    });
    return getDOMForLocaleString({
      string: string,
      locals: strings.head && strings.head.locals,
      switches: strings.head && strings.head.switches,
      locale: resolvedLocale,
      allSubstitutions: allSubstitutions,
      insertNodes: insertNodes,
      substitutions: _objectSpread2(_objectSpread2({}, defaultSubstitutions), substitutions),
      dom: dom,
      forceNodeReturn: forceNodeReturn,
      throwOnMissingSuppliedFormatters: throwOnMissingSuppliedFormatters,
      throwOnExtraSuppliedFormatters: throwOnExtraSuppliedFormatters
    });
  };
  formatter.resolvedLocale = resolvedLocale;
  formatter.strings = strings;

  /** @type {Sort} */
  formatter.sort = function (arrayOfItems, options) {
    return sort(resolvedLocale, arrayOfItems, options);
  };

  /** @type {SortList} */
  formatter.sortList = function (arrayOfItems, map, listOptions, collationOptions) {
    return sortList(resolvedLocale, arrayOfItems, map, listOptions, collationOptions);
  };

  /** @type {List} */
  formatter.list = function (arrayOfItems, options) {
    return list(resolvedLocale, arrayOfItems, options);
  };
  return formatter;
};
var i18n = function i18n() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    locales = _ref3.locales,
    defaultLocales = _ref3.defaultLocales,
    _ref3$localeStringFin = _ref3.localeStringFinder,
    localeStringFinder = _ref3$localeStringFin === void 0 ? findLocaleStrings : _ref3$localeStringFin,
    localesBasePath = _ref3.localesBasePath,
    localeResolver = _ref3.localeResolver,
    localeMatcher = _ref3.localeMatcher,
    messageStyle = _ref3.messageStyle,
    allSubstitutions = _ref3.allSubstitutions,
    insertNodes = _ref3.insertNodes,
    keyCheckerConverter = _ref3.keyCheckerConverter,
    defaults = _ref3.defaults,
    substitutions = _ref3.substitutions,
    maximumLocalNestingDepth = _ref3.maximumLocalNestingDepth,
    dom = _ref3.dom,
    forceNodeReturn = _ref3.forceNodeReturn,
    throwOnMissingSuppliedFormatters = _ref3.throwOnMissingSuppliedFormatters,
    throwOnExtraSuppliedFormatters = _ref3.throwOnExtraSuppliedFormatters;
  try {
    return _await(localeStringFinder({
      locales: locales,
      defaultLocales: defaultLocales,
      localeResolver: localeResolver,
      localesBasePath: localesBasePath,
      localeMatcher: localeMatcher
    }), function (_ref4) {
      var strings = _ref4.strings,
        resolvedLocale = _ref4.locale;
      return _invoke(function () {
        if (!defaults && defaultLocales) {
          var defaultLocale;
          return _await(localeStringFinder({
            locales: defaultLocales,
            defaultLocales: [],
            localeResolver: localeResolver,
            localesBasePath: localesBasePath,
            localeMatcher: localeMatcher
          }), function (_localeStringFinder) {
            defaults = _localeStringFinder.strings;
            defaultLocale = _localeStringFinder.locale;
            if (defaultLocale === resolvedLocale) {
              defaults = null; // No need to fall back
            }
          });
        }
      }, function () {
        return i18nServer({
          strings: strings,
          resolvedLocale: resolvedLocale,
          messageStyle: messageStyle,
          allSubstitutions: allSubstitutions,
          insertNodes: insertNodes,
          keyCheckerConverter: keyCheckerConverter,
          defaults: defaults,
          substitutions: substitutions,
          maximumLocalNestingDepth: maximumLocalNestingDepth,
          dom: dom,
          forceNodeReturn: forceNodeReturn,
          throwOnMissingSuppliedFormatters: throwOnMissingSuppliedFormatters,
          throwOnExtraSuppliedFormatters: throwOnExtraSuppliedFormatters
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var rfdc_1;
var hasRequiredRfdc;

function requireRfdc () {
	if (hasRequiredRfdc) return rfdc_1;
	hasRequiredRfdc = 1;
	rfdc_1 = rfdc;

	function copyBuffer (cur) {
	  if (cur instanceof Buffer) {
	    return Buffer.from(cur)
	  }

	  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
	}

	function rfdc (opts) {
	  opts = opts || {};
	  if (opts.circles) return rfdcCircles(opts)

	  const constructorHandlers = new Map();
	  constructorHandlers.set(Date, (o) => new Date(o));
	  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
	  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
	  if (opts.constructorHandlers) {
	    for (const handler of opts.constructorHandlers) {
	      constructorHandlers.set(handler[0], handler[1]);
	    }
	  }

	  let handler = null;

	  return opts.proto ? cloneProto : clone

	  function cloneArray (a, fn) {
	    const keys = Object.keys(a);
	    const a2 = new Array(keys.length);
	    for (let i = 0; i < keys.length; i++) {
	      const k = keys[i];
	      const cur = a[k];
	      if (typeof cur !== 'object' || cur === null) {
	        a2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        a2[k] = handler(cur, fn);
	      } else if (ArrayBuffer.isView(cur)) {
	        a2[k] = copyBuffer(cur);
	      } else {
	        a2[k] = fn(cur);
	      }
	    }
	    return a2
	  }

	  function clone (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, clone)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, clone)
	    }
	    const o2 = {};
	    for (const k in o) {
	      if (Object.hasOwnProperty.call(o, k) === false) continue
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, clone);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        o2[k] = clone(cur);
	      }
	    }
	    return o2
	  }

	  function cloneProto (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, cloneProto)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, cloneProto)
	    }
	    const o2 = {};
	    for (const k in o) {
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, cloneProto);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        o2[k] = cloneProto(cur);
	      }
	    }
	    return o2
	  }
	}

	function rfdcCircles (opts) {
	  const refs = [];
	  const refsNew = [];

	  const constructorHandlers = new Map();
	  constructorHandlers.set(Date, (o) => new Date(o));
	  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
	  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
	  if (opts.constructorHandlers) {
	    for (const handler of opts.constructorHandlers) {
	      constructorHandlers.set(handler[0], handler[1]);
	    }
	  }

	  let handler = null;
	  return opts.proto ? cloneProto : clone

	  function cloneArray (a, fn) {
	    const keys = Object.keys(a);
	    const a2 = new Array(keys.length);
	    for (let i = 0; i < keys.length; i++) {
	      const k = keys[i];
	      const cur = a[k];
	      if (typeof cur !== 'object' || cur === null) {
	        a2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        a2[k] = handler(cur, fn);
	      } else if (ArrayBuffer.isView(cur)) {
	        a2[k] = copyBuffer(cur);
	      } else {
	        const index = refs.indexOf(cur);
	        if (index !== -1) {
	          a2[k] = refsNew[index];
	        } else {
	          a2[k] = fn(cur);
	        }
	      }
	    }
	    return a2
	  }

	  function clone (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, clone)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, clone)
	    }
	    const o2 = {};
	    refs.push(o);
	    refsNew.push(o2);
	    for (const k in o) {
	      if (Object.hasOwnProperty.call(o, k) === false) continue
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, clone);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        const i = refs.indexOf(cur);
	        if (i !== -1) {
	          o2[k] = refsNew[i];
	        } else {
	          o2[k] = clone(cur);
	        }
	      }
	    }
	    refs.pop();
	    refsNew.pop();
	    return o2
	  }

	  function cloneProto (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, cloneProto)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, cloneProto)
	    }
	    const o2 = {};
	    refs.push(o);
	    refsNew.push(o2);
	    for (const k in o) {
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, cloneProto);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        const i = refs.indexOf(cur);
	        if (i !== -1) {
	          o2[k] = refsNew[i];
	        } else {
	          o2[k] = cloneProto(cur);
	        }
	      }
	    }
	    refs.pop();
	    refsNew.pop();
	    return o2
	  }
	}
	return rfdc_1;
}

var rfdcExports = requireRfdc();
var I = /*@__PURE__*/getDefaultExportFromCjs(rfdcExports);

/**
 * @name codsen-utils
 * @fileoverview Various utility functions
 * @version 1.7.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/codsen-utils/}
 */

I();function u(t){if(t==null||typeof t!="object")return  false;let e=Object.getPrototypeOf(t);return e!==null&&e!==Object.prototype&&Object.getPrototypeOf(e)!==null?false:!(Symbol.iterator in t)&&!(Symbol.toStringTag in t)}function r(t){return typeof t=="string"}function W(t){return Number.isFinite(t)}function q$1(t){return Number.isSafeInteger(t)&&t>=0}function G$1(t){return t!=null}function v(t,e){return u(t)&&r(e)&&e in t}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$4.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$3.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (-1);

  while ((++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/** Used to compose unicode character classes. */
var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$1 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = value ;

    value = (value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (chars === undefined)) {
    return baseTrim(string);
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
// This file is autogenerated by tools/process-named-references.ts
var pairDivider = "~";
var blockDivider = "~~";
function generateNamedReferences(input, prev) {
    var entities = {};
    var characters = {};
    var blocks = input.split(blockDivider);
    var isOptionalBlock = false;
    for (var i = 0; blocks.length > i; i++) {
        var entries = blocks[i].split(pairDivider);
        for (var j = 0; j < entries.length; j += 2) {
            var entity = entries[j];
            var character = entries[j + 1];
            var fullEntity = '&' + entity + ';';
            entities[fullEntity] = character;
            if (isOptionalBlock) {
                entities['&' + entity] = character;
            }
            characters[character] = fullEntity;
        }
        isOptionalBlock = true;
    }
    return prev ?
        { entities: __assign$1(__assign$1({}, entities), prev.entities), characters: __assign$1(__assign$1({}, characters), prev.characters) } :
        { entities: entities, characters: characters };
}
var bodyRegExps = {
    xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
    html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
    html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
};
var namedReferences = {};
namedReferences['xml'] = generateNamedReferences("lt~<~gt~>~quot~\"~apos~'~amp~&");
namedReferences['html4'] = generateNamedReferences("apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~\"~amp~&~lt~<~gt~>");
namedReferences['html5'] = generateNamedReferences("Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~\t~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~\"~REG~®", namedReferences['html4']);

var numericUnicodeMap = {
    0: 65533,
    128: 8364,
    130: 8218,
    131: 402,
    132: 8222,
    133: 8230,
    134: 8224,
    135: 8225,
    136: 710,
    137: 8240,
    138: 352,
    139: 8249,
    140: 338,
    142: 381,
    145: 8216,
    146: 8217,
    147: 8220,
    148: 8221,
    149: 8226,
    150: 8211,
    151: 8212,
    152: 732,
    153: 8482,
    154: 353,
    155: 8250,
    156: 339,
    158: 382,
    159: 376
};

var fromCodePoint = String.fromCodePoint ||
    function (astralCodePoint) {
        return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xd800, ((astralCodePoint - 0x10000) % 0x400) + 0xdc00);
    };

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var allNamedReferences = __assign(__assign({}, namedReferences), { all: namedReferences.html5 });
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
function getDecodedEntity(entity, references, isAttribute, isStrict) {
    var decodeResult = entity;
    var decodeEntityLastChar = entity[entity.length - 1];
    if (isAttribute && decodeEntityLastChar === '=') {
        decodeResult = entity;
    }
    else if (isStrict && decodeEntityLastChar !== ';') {
        decodeResult = entity;
    }
    else {
        var decodeResultByReference = references[entity];
        if (decodeResultByReference) {
            decodeResult = decodeResultByReference;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar = entity[2];
            var decodeCode = decodeSecondChar == 'x' || decodeSecondChar == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            decodeResult =
                decodeCode >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode > 65535
                        ? fromCodePoint(decodeCode)
                        : fromCharCode(numericUnicodeMap[decodeCode] || decodeCode);
        }
    }
    return decodeResult;
}
/** Decodes all entities in the text */
function decode(text, _a) {
    var _b = _a === void 0 ? defaultDecodeOptions : _a, _c = _b.level, level = _c === void 0 ? 'all' : _c, _d = _b.scope, scope = _d === void 0 ? level === 'xml' ? 'strict' : 'body' : _d;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    return text.replace(decodeRegExp, function (entity) { return getDecodedEntity(entity, references, isAttribute, isStrict); });
}

/**
 * @name ranges-sort
 * @fileoverview Sort string index ranges
 * @version 6.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/ranges-sort/}
 */

var c$1={strictlyTwoElementsInRangeArrays:false,progressFn:null};function g(t,u){if(!Array.isArray(t)||!t.length)return t;let n={...c$1,...u},s,o;if(n.strictlyTwoElementsInRangeArrays&&!t.every((e,r)=>!Array.isArray(e)||e.length!==2?(s=r,o=e.length,false):true))throw new TypeError(`ranges-sort: [THROW_ID_03] The first argument should be an array and must consist of arrays which are natural number indexes representing TWO string index ranges. However, ${s}th range (${JSON.stringify(t[s],null,4)}) has not two but ${o} elements!`);if(!t.every((e,r)=>!Array.isArray(e)||!Number.isInteger(e[0])||e[0]<0||!Number.isInteger(e[1])||e[1]<0?(s=r,false):true))throw new TypeError(`ranges-sort: [THROW_ID_04] The first argument should be an array and must consist of arrays which are natural number indexes representing string index ranges. However, ${s}th range (${JSON.stringify(t[s],null,4)}) does not consist of only natural numbers!`);let p=t.length**2,i=0;return Array.from(t).sort((e,r)=>(n.progressFn&&(i+=1,n.progressFn(Math.floor(i*100/p))),e[0]===r[0]?e[1]<r[1]?-1:e[1]>r[1]?1:0:e[0]<r[0]?-1:1))}

/**
 * @name ranges-merge
 * @fileoverview Merge and sort string index ranges
 * @version 9.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/ranges-merge/}
 */

var d={mergeType:1,progressFn:null,joinRangesThatTouchEdges:true};function b(i,t){function l(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}if(!Array.isArray(i)||!i.length)return null;let s;if(t)if(l(t)){if(s={...d,...t},s.progressFn&&l(s.progressFn)&&!Object.keys(s.progressFn).length)s.progressFn=null;else if(s.progressFn&&typeof s.progressFn!="function")throw new Error(`ranges-merge: [THROW_ID_01] opts.progressFn must be a function! It was given of a type: "${typeof s.progressFn}", equal to ${JSON.stringify(s.progressFn,null,4)}`);if(![1,2,"1","2"].includes(s.mergeType))throw new Error(`ranges-merge: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof s.mergeType}", equal to ${JSON.stringify(s.mergeType,null,4)}`);if(typeof s.joinRangesThatTouchEdges!="boolean")throw new Error(`ranges-merge: [THROW_ID_04] opts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof s.joinRangesThatTouchEdges}", equal to ${JSON.stringify(s.joinRangesThatTouchEdges,null,4)}`)}else throw new Error(`emlint: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(t,null,4)} (type ${typeof t})`);else s={...d};let g$1=i.filter(e=>Array.isArray(e)).map(e=>[...e]).filter(e=>e[2]!==void 0||e[0]!==e[1]),n,o,r;s.progressFn?n=g(g$1,{progressFn:e=>{r=Math.floor(e/5),r!==o&&(o=r,s.progressFn(r));}}):n=g(g$1);let a=n.length-1;for(let e=a;e>0;e--)s.progressFn&&(r=Math.floor((1-e/a)*78)+21,r!==o&&r>o&&(o=r,s.progressFn(r))),(n[e][0]<=n[e-1][0]||!s.joinRangesThatTouchEdges&&n[e][0]<n[e-1][1]||s.joinRangesThatTouchEdges&&n[e][0]<=n[e-1][1])&&(n[e-1][0]=Math.min(n[e][0],n[e-1][0]),n[e-1][1]=Math.max(n[e][1],n[e-1][1]),n[e][2]!==void 0&&(n[e-1][0]>=n[e][0]||n[e-1][1]<=n[e][1])&&n[e-1][2]!==null&&(n[e][2]===null&&n[e-1][2]!==null?n[e-1][2]=null:n[e-1][2]!=null?+s.mergeType==2&&n[e-1][0]===n[e][0]?n[e-1][2]=n[e][2]:n[e-1][2]+=n[e][2]:n[e-1][2]=n[e][2]),n.splice(e,1),e=n.length);return n.length?n:null}

var isProduction = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var value = prefix;
    throw new Error(value);
}

/**
 * @name ranges-apply
 * @fileoverview Take an array of string index ranges, delete/replace the string according to them
 * @version 7.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/ranges-apply/}
 */

function _(s,n,r){if(arguments.length===0)throw new Error("ranges-apply: [THROW_ID_01] inputs missing!");if(typeof s!="string")throw new TypeError(`ranges-apply: [THROW_ID_02] first input argument must be a string! Currently it's: ${typeof s}, equal to: ${JSON.stringify(s,null,4)}`);if(n&&!Array.isArray(n))throw new TypeError(`ranges-apply: [THROW_ID_03] second input argument must be an array (or null)! Currently it's: ${typeof n}, equal to: ${JSON.stringify(n,null,4)}`);if(!n?.filter(e=>e).length)return s;let i;Array.isArray(n)&&Number.isInteger(n[0])&&Number.isInteger(n[1])?i=[Array.from(n)]:i=Array.from(n);i.length;i.filter(e=>e).forEach((e,a)=>{if(!Array.isArray(e))throw new TypeError(`ranges-apply: [THROW_ID_05] ranges array, second input arg., has ${a}th element not an array: ${JSON.stringify(e,null,4)}, which is ${typeof e}`);if(!Number.isInteger(e[0])){if(!Number.isInteger(+e[0])||+e[0]<0)throw new TypeError(`ranges-apply: [THROW_ID_06] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(e,null,0)}. Its first element is not an integer, string index, but ${typeof e[0]}, equal to: ${JSON.stringify(e[0],null,4)}.`);i[a][0]=+i[a][0];}if(!Number.isInteger(e[1])){if(!Number.isInteger(+e[1])||+e[1]<0)throw new TypeError(`ranges-apply: [THROW_ID_07] ranges array, second input arg. has ${a}th element, array ${JSON.stringify(e,null,0)}. Its second element is not an integer, string index, but ${typeof e[1]}, equal to: ${JSON.stringify(e[1],null,4)}.`);i[a][1]=+i[a][1];}});let l=b(i,{progressFn:e=>{}});invariant(l);let u=l.length;if(u>0){let e=s.slice(l[u-1][1]);s=l.reduce((a,$,o,y)=>{let f=o===0?0:y[o-1][1],d=y[o][0];return `${a}${s.slice(f,d)}${y[o][2]||""}`},""),s+=e;}return s}

/**
 * @name string-collapse-leading-whitespace
 * @fileoverview Collapse the leading and trailing whitespace of a string
 * @version 7.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/string-collapse-leading-whitespace/}
 */

function D$1(l,u=1){let g="\xA0";function $(e){return Array.from(e).reverse().join("")}function p(e,r,o){let t=o?`
`:"\r",i=o?"\r":`
`;if(!e)return e;let c=0,s="";for(let n=0,f=e.length;n<f;n++)(e[n]===t||e[n]===i&&e[n-1]!==t)&&c++,`\r
`.includes(e[n])||e[n]===g?(e[n]===g?s+=e[n]:e[n]===t?c<=r&&(s+=e[n],e[n+1]===i&&(s+=e[n+1],n++)):e[n]===i&&e?.[n-1]!==t&&c<=r&&(s+=e[n])):(!e[n+1]&&!c&&(s+=" "));return s}if(typeof l=="string"&&l.length){let e=1;typeof+u=="number"&&Number.isInteger(+u)&&+u>=0&&(e=+u);let r="",o="";if(!l.trim())r=l;else if(!l[0].trim()){for(let t=0,i=l.length;t<i;t++)if(l[t].trim()){r=l.slice(0,t);break}}if(l.trim()&&(l.slice(-1).trim()===""||l.slice(-1)===g)){for(let t=l.length;t--;)if(l[t].trim()){o=l.slice(t+1);break}}return `${p(r,e,false)}${l.trim()}${$(p($(o),e,true))}`}return l}

/**
 * @name ranges-push
 * @fileoverview Gather string index ranges
 * @version 7.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/ranges-push/}
 */

var y={mergeType:1,progressFn:null,joinRangesThatTouchEdges:true};function f(p,t){function r(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}if(!Array.isArray(p)||!p.length)return null;let n;if(t)if(r(t)){if(n={...y,...t},n.progressFn&&r(n.progressFn)&&!Object.keys(n.progressFn).length)n.progressFn=null;else if(n.progressFn&&typeof n.progressFn!="function")throw new Error(`ranges-merge: [THROW_ID_01] resolvedOpts.progressFn must be a function! It was given of a type: "${typeof n.progressFn}", equal to ${JSON.stringify(n.progressFn,null,4)}`);if(![1,2,"1","2"].includes(n.mergeType))throw new Error(`ranges-merge: [THROW_ID_02] resolvedOpts.mergeType was customised to a wrong thing! It was given of a type: "${typeof n.mergeType}", equal to ${JSON.stringify(n.mergeType,null,4)}`);if(typeof n.joinRangesThatTouchEdges!="boolean")throw new Error(`ranges-merge: [THROW_ID_04] resolvedOpts.joinRangesThatTouchEdges was customised to a wrong thing! It was given of a type: "${typeof n.joinRangesThatTouchEdges}", equal to ${JSON.stringify(n.joinRangesThatTouchEdges,null,4)}`)}else throw new Error(`ranges-merge: [THROW_ID_03] the second input argument must be a plain object. It was given as:
${JSON.stringify(t,null,4)} (type ${typeof t})`);else n={...y};let i=p.filter(e=>Array.isArray(e)).map(e=>[...e]).filter(e=>e[2]!==void 0||e[0]!==e[1]),s,o,l;n.progressFn?s=g(i,{progressFn:e=>{l=Math.floor(e/5),l!==o&&(o=l,n.progressFn!=null&&n.progressFn(l));}}):s=g(i);let d=s.length-1;for(let e=d;e>0;e--)n.progressFn&&(l=Math.floor((1-e/d)*78)+21,l!==o&&l>o&&(o=l,n.progressFn(l))),(s[e][0]<=s[e-1][0]||!n.joinRangesThatTouchEdges&&s[e][0]<s[e-1][1]||n.joinRangesThatTouchEdges&&s[e][0]<=s[e-1][1])&&(s[e-1][0]=Math.min(s[e][0],s[e-1][0]),s[e-1][1]=Math.max(s[e][1],s[e-1][1]),s[e][2]!==void 0&&(s[e-1][0]>=s[e][0]||s[e-1][1]<=s[e][1])&&s[e-1][2]!==null&&(s[e][2]===null&&s[e-1][2]!==null?s[e-1][2]=null:s[e-1][2]!=null?+(n||{})?.mergeType==2&&s[e-1][0]===s[e][0]?s[e-1][2]=s[e][2]:s[e-1][2]+=s[e][2]:s[e-1][2]=s[e][2]),s.splice(e,1),e=s.length);return s.length?s:null}var R={limitToBeAddedWhitespace:false,limitLinebreaksCount:1,mergeType:1},$=class{constructor(t){let r$1={...R,...t};if(r$1.mergeType&&r$1.mergeType!==1&&r$1.mergeType!==2)if(r(r$1.mergeType)&&r$1.mergeType.trim()==="1")r$1.mergeType=1;else if(r(r$1.mergeType)&&r$1.mergeType.trim()==="2")r$1.mergeType=2;else throw new Error(`ranges-push: [THROW_ID_02] opts.mergeType was customised to a wrong thing! It was given of a type: "${typeof r$1.mergeType}", equal to ${JSON.stringify(r$1.mergeType,null,4)}`);this.opts=r$1,this.ranges=[];}ranges;opts;add(t,r$1,n){if(t==null&&r$1==null)return;if(G$1(t)&&!G$1(r$1)){if(Array.isArray(t)){if(t.length){if(t.some(o=>Array.isArray(o))){t.forEach(o=>{Array.isArray(o)&&this.add(...o);});return}t.length&&q$1(+t[0])&&q$1(+t[1])&&this.add(...t);}return}throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_12] the first input argument, "from" is set (${JSON.stringify(t,null,0)}) but second-one, "to" is not (${JSON.stringify(r$1,null,0)})`)}else if(!G$1(t)&&G$1(r$1))throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_13] the second input argument, "to" is set (${JSON.stringify(r$1,null,0)}) but first-one, "from" is not (${JSON.stringify(t,null,0)})`);let i=+t,s=+r$1;if(q$1(i)&&q$1(s)){if(G$1(n)&&!r(n)&&!W(n))throw new TypeError(`ranges-push/Ranges/add(): [THROW_ID_08] The third argument, the value to add, was given not as string but ${typeof n}, equal to:
${JSON.stringify(n,null,4)}`);if(G$1(this.ranges)&&Array.isArray(this.last())&&i===this.last()[1]){if(this.last()[1]=s,this.last()[2],this.last()[2]!==null&&G$1(n)){let o=this.last()[2]&&this.last()[2].length&&(!this.opts?.mergeType||this.opts.mergeType===1)?`${this.last()[2]}${n}`:n;this.opts.limitToBeAddedWhitespace&&(o=D$1(o,this.opts.limitLinebreaksCount)),r(o)&&!o.length||(this.last()[2]=o);}}else {this.ranges||(this.ranges=[]);let o=n!==void 0&&!(r(n)&&!n.length)?[i,s,n&&this.opts.limitToBeAddedWhitespace?D$1(n,this.opts.limitLinebreaksCount):n]:[i,s];this.ranges.push(o);}}else throw q$1(i)&&i>=0?new TypeError(`ranges-push/Ranges/add(): [THROW_ID_10] "to" value, the second input argument, must be a natural number or zero! Currently it's of a type "${typeof s}" equal to: ${JSON.stringify(s,null,4)}`):new TypeError(`ranges-push/Ranges/add(): [THROW_ID_09] "from" value, the first input argument, must be a natural number or zero! Currently it's of a type "${typeof i}" equal to: ${JSON.stringify(i,null,4)}`)}push(t,r,n){this.add(t,r,n);}current(){return Array.isArray(this.ranges)&&this.ranges.length?(this.ranges=f(this.ranges,{mergeType:this.opts.mergeType}),this.ranges&&this.opts.limitToBeAddedWhitespace?this.ranges.map(t=>G$1(t[2])?[t[0],t[1],D$1(t[2],this.opts.limitLinebreaksCount)]:t):this.ranges):null}wipe(){this.ranges=[];}replace(t){if(Array.isArray(t)&&t.length)if(Array.isArray(t[0])&&q$1(t[0][0]))this.ranges=Array.from(t);else throw new Error(`ranges-push/Ranges/replace(): [THROW_ID_11] Single range was given but we expected array of arrays! The first element, ${JSON.stringify(t[0],null,4)} should be an array and its first element should be an integer, a string index.`);else this.ranges=[];}last(){return Array.isArray(this.ranges)&&this.ranges.length?this.ranges[this.ranges.length-1]:null}};

/**
 * @name string-left-right
 * @fileoverview Looks up the first non-whitespace character to the left/right of a given index
 * @version 6.1.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/string-left-right/}
 */

I();var c="\xA0";function D({str:n,idx:e=0,stopAtNewlines:l=false,stopAtRawNbsp:o=false}){if(typeof n!="string"||!n.length||((!e||typeof e!="number")&&(e=0),!n[e+1]))return null;if(n[e+1]&&(n[e+1].trim()||l&&`
\r`.includes(n[e+1])||o&&n[e+1]===c))return e+1;if(n[e+2]&&(n[e+2].trim()||l&&`
\r`.includes(n[e+2])||o&&n[e+2]===c))return e+2;for(let t=e+1,m=n.length;t<m;t++)if(n[t].trim()||l&&`
\r`.includes(n[t])||o&&n[t]===c)return t;return null}function E(n,e=0){return D({str:n,idx:e,stopAtNewlines:false,stopAtRawNbsp:false})}

/**
 * @name string-strip-html
 * @fileoverview Strip HTML tags from strings. No parser, accepts mixed sources.
 * @version 13.5.0
 * @author Roy Revelt
 * @license MIT
 * {@link https://codsen.com/os/string-strip-html/}
 */

function ee(t){return /[-_A-Za-z0-9]/.test(t)}function G(t,m){if(!t)return [];if(Array.isArray(t))return t.filter(y=>typeof y=="string"&&y.trim());if(typeof t=="string")return t.trim()?[t]:[];throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_05] ${m} must be array containing zero or more strings or something falsey. Currently it's equal to: ${t}, that a type of ${typeof t}.`)}function j(t,m,y,c){for(let f=m,b=t.length;f<b;f++){if(t.startsWith(y,f))return  true;if(t.startsWith(c,f))return  false}return  false}function Y(t,m,y){!t?.quotes;!!t?.quotes?.value&&!j(m,y+1,t.quotes.value,">");t?.quotes?.next!==-1;!j(m,t?.quotes?.next-1,t?.quotes?.value,">");return !t?.quotes||!j(m,y+1,t.quotes.value,">")&&t?.quotes?.next!==-1&&j(m,t?.quotes?.next-1,t?.quotes?.value,">")}function ne(t,m){return (m.match(new RegExp(t,"g"))||[]).length}var P=new Set(["!doctype","abbr","address","area","article","aside","audio","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","doctype","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","math","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","param","picture","pre","progress","rb","rp","rt","rtc","ruby","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","ul","var","video","wbr","xml"]),x=new Set(["a","b","i","p","q","s","u"]),q=new Set([".",",",";","!","?"]),Q=new Set([".",",","?",";",")","\u2026",'"',"\xBB"]),te=new Set(["a","abbr","acronym","audio","b","bdi","bdo","big","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","input","ins","kbd","label","map","mark","meter","noscript","object","output","picture","progress","q","ruby","s","samp","select","slot","small","span","strong","sub","sup","svg","template","textarea","time","u","tt","var","video","wbr"]);var ae={ignoreTags:[],ignoreTagsWithTheirContents:[],onlyStripTags:[],stripTogetherWithTheirContents:["script","style","xml"],skipHtmlDecoding:false,trimOnlySpaces:false,stripRecognisedHTMLOnly:false,dumpLinkHrefsNearby:{enabled:false,putOnNewLine:false,wrapHeads:"",wrapTails:""},ignoreIndentations:false,cb:null,reportProgressFunc:null,reportProgressFuncFrom:0,reportProgressFuncTo:100};function fe(t,m){let y=Date.now(),c=[],f=[],b=[],$$1=[],n={};function re(){n={attributes:[]};}re();let V=null,w=null,N=null,J=false,o={},d={tagName:"",hrefValue:"",openingTagEnds:void 0},E$1="",C=false,B=null,F=true;function v$1(e,s,a){if(Array.isArray(s.stripTogetherWithTheirContents)&&(s.stripTogetherWithTheirContents.includes(n.name)||s.stripTogetherWithTheirContents.includes("*")))if(n.slashPresent&&Array.isArray(c)&&c.some(i=>i.name===n.name)){for(let i=c.length;i--;)if(c[i].name===n.name){$$1=$$1.filter(([u,p])=>(u<c[i].lastOpeningBracketAt||u>=e+1)&&(p<=c[i].lastOpeningBracketAt||p>e+1));let g=e+1;n.lastClosingBracketAt&&(g=n.lastClosingBracketAt+1),$$1.push([c[i].lastOpeningBracketAt,g]),Q.has(t[e])&&s.cb?s.cb({tag:n,deleteFrom:c[i].lastOpeningBracketAt,deleteTo:e+1,insert:null,rangesArr:a,proposedReturn:[c[i].lastOpeningBracketAt,e,null]}):s.cb&&s.cb({tag:n,deleteFrom:c[i].lastOpeningBracketAt,deleteTo:e,insert:"",rangesArr:a,proposedReturn:[c[i].lastOpeningBracketAt,e,""]}),c.splice(i,1);break}}else n.slashPresent||c.push(n);else Array.isArray(s.ignoreTagsWithTheirContents)&&M(e,s,n)&&(F=false);}function L(e,s,a,i,g,u){if(Array.isArray(r.current())&&typeof a=="number"&&r.current()[0][0]===0&&r.current()[0][1]>=a)return "";if(t.length===i&&u&&!l?.dumpLinkHrefsNearby?.enabled)return null;let p="";if(Number.isInteger(a)&&a<g&&(p+=e.slice(a,g)),Number.isInteger(i)&&i>u+1){let D=e.slice(u+1,i);i&&!E(t,i-1)&&(D=D.trimEnd()),D.includes(`
`)&&S(i,e)?p+=" ":p+=D;}let W=!Q.has(e[s]),Z=e[i-1]!==">"||!e[a].trim(),X=!['"',"("].includes(e[g-1]),ge=![";",".",":","!"].includes(e[s]);if((W||Z&&X&&ge)&&(Z||X)&&e[s]!=="!"&&(!te.has(n.name)||typeof a=="number"&&a<g||typeof i=="number"&&i>u+1)){let D=p.match(/\n/g);return Array.isArray(D)&&D.length?D.length===1?`
`:D.length===2?`

`:`


`:" "}return ""}function U(e,s){if(e.dumpLinkHrefsNearby?.enabled&&d.tagName&&d.tagName===n.name&&n.lastOpeningBracketAt&&(d.openingTagEnds&&n.lastOpeningBracketAt>d.openingTagEnds||!d.openingTagEnds)&&(C=true),C){let a=e.dumpLinkHrefsNearby?.putOnNewLine?`

`:"";E$1=`${a}${d.hrefValue}`,(typeof s!="number"||E(t,s-1))&&(E$1+=a);}}function S(e,s){return s?s[e]==="<"&&s[e+1]!=="%":t[e]==="<"&&t[e+1]!=="%"}function A(e){return t[e]===">"&&t[e-1]!=="%"}function M(e,s,a){if(s.ignoreTagsWithTheirContents.includes("*"))return  true;let i=t.indexOf(`<${a.name}`,e),g=t.indexOf(`</${a.name}`,e);return !a.slashPresent&&g===-1||a.slashPresent&&!f.some(u=>u.name===a.name)||g>-1&&i>-1&&i<g?false:s.ignoreTagsWithTheirContents.includes(a.name)}if(typeof t!="string")throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_01] Input must be string! Currently it's: ${(typeof t).toLowerCase()}, equal to:
${JSON.stringify(t,null,4)}`);if(m)if(u(m)){if(m.reportProgressFunc&&typeof m.reportProgressFunc!="function")throw new Error(`string-strip-html/stripHtml(): [THROW_ID_03] The Optional Options Object's key reportProgressFunc, callback function, should be a function but it was given as type ${typeof m.reportProgressFunc}, equal to ${JSON.stringify(m.reportProgressFunc,null,4)}`);if(typeof m.dumpLinkHrefsNearby=="boolean"&&m.dumpLinkHrefsNearby!=null)throw new Error(`string-strip-html/stripHtml(): [THROW_ID_04] The Optional Options Object's key should be a plain object but it was given as type ${typeof m.dumpLinkHrefsNearby}, equal to ${JSON.stringify(m.dumpLinkHrefsNearby,null,4)}`)}else throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_02] Optional Options Object must be a plain object! Currently it's: ${(typeof m).toLowerCase()}, equal to:
${JSON.stringify(m,null,4)}`);function _$1(){C&&(d={tagName:"",hrefValue:"",openingTagEnds:void 0},C=false);}let l={...ae,...m,dumpLinkHrefsNearby:Object.assign({},ae.dumpLinkHrefsNearby,m?.dumpLinkHrefsNearby)};if(v(l,"returnRangesOnly"))throw new TypeError("string-strip-html/stripHtml(): [THROW_ID_05] The Optional Options Object's key returnRangesOnly has been removed from the API since v.5 release.");if(l.reportProgressFunc){if(typeof l.reportProgressFuncFrom!="number")throw new Error(`string-strip-html/stripHtml(): [THROW_ID_06] The Optional Options Object's key reportProgressFuncFrom, callback function's "from" range, should be a number but it was given as type ${typeof l.reportProgressFuncFrom}, equal to ${JSON.stringify(l.reportProgressFuncFrom,null,4)}`);if(typeof l.reportProgressFuncTo!="number")throw new Error(`string-strip-html/stripHtml(): [THROW_ID_07] The Optional Options Object's key reportProgressFuncTo, callback function's "to" range, should be a number but it was given as type ${typeof l.reportProgressFuncTo}, equal to ${JSON.stringify(l.reportProgressFuncTo,null,4)}`)}l.ignoreTags=G(l.ignoreTags,"resolvedOpts.ignoreTags"),l.onlyStripTags=G(l.onlyStripTags,"resolvedOpts.onlyStripTags");let z=!!l.onlyStripTags.length;l.onlyStripTags.length&&l.ignoreTags.length&&(l.onlyStripTags=without(l.onlyStripTags,...l.ignoreTags)),l.stripTogetherWithTheirContents?typeof l.stripTogetherWithTheirContents=="string"&&l.stripTogetherWithTheirContents.length&&(l.stripTogetherWithTheirContents=[l.stripTogetherWithTheirContents]):l.stripTogetherWithTheirContents=[];let I={};if(l.stripTogetherWithTheirContents&&Array.isArray(l.stripTogetherWithTheirContents)&&l.stripTogetherWithTheirContents.length&&!l.stripTogetherWithTheirContents.every((e,s)=>typeof e!="string"?(I.el=e,I.i=s,false):true))throw new TypeError(`string-strip-html/stripHtml(): [THROW_ID_08] Optional Options Object's key stripTogetherWithTheirContents was set to contain not just string elements! For example, element at index ${I.i} has a value ${I.el} which is not string but ${(typeof I.el).toLowerCase()}.`);l.cb||(l.cb=({rangesArr:e,proposedReturn:s})=>{s&&e.push(...s);});let r=new $({limitToBeAddedWhitespace:true,limitLinebreaksCount:2});if(!l.skipHtmlDecoding)for(;t!==decode(t,{scope:"strict"});)t=decode(t,{scope:"strict"});let R=false,k=false,H=0,K=0,h=t.length,ue=Math.floor(h/2);for(let e=0;e<h;e++){if(l.reportProgressFunc&&(h>1e3&&h<2e3?e===ue&&l.reportProgressFunc(Math.floor((l.reportProgressFuncTo-l.reportProgressFuncFrom)/2)):h>=2e3&&(H=l.reportProgressFuncFrom+Math.floor(e/h*(l.reportProgressFuncTo-l.reportProgressFuncFrom)),H!==K&&(K=H,l.reportProgressFunc(H)))),Object.keys(n).length>1&&n.lastClosingBracketAt&&n.lastClosingBracketAt<e&&t[e]!==" "&&B===null&&(B=e),!R&&t[e]==="%"&&t[e-1]==="{"&&t.includes("%}",e+1)){N=null;let s=t.indexOf("%}",e)-1;if(s>e){e=s;continue}}if(!R&&A(e)&&(!n||Object.keys(n).length<2)&&e>1){for(let s=e;s--;)if(t[s-1]===void 0||A(s)){let a=t[s-1]===void 0?s:s+1,i=t.slice(a,e+1)||"";if((i.includes("/>")||i.includes("/ >")||i.includes('="')||i.includes("='"))&&t!==`<${trim(i.trim(),"/>")}>`&&[...P].some(g=>trim(i.trim().split(/\s+/).filter(u=>u.trim()).filter((u,p)=>p===0),"/>").toLowerCase()===g)&&fe(`<${i.trim()}>`,l).result===""){(!b.length||b[b.length-1][0]!==n.lastOpeningBracketAt)&&b.push([a,e+1]),(!$$1.length||$$1[$$1.length-1][0]!==n.lastOpeningBracketAt)&&$$1.push([a,e+1]);let g=L(t,e,a,e+1,a,e+1),u=e+1;if(t[u]&&!t[u].trim()){for(let p=u;p<h;p++)if(t[p].trim()){u=p;break}}l.cb({tag:n,deleteFrom:a,deleteTo:u,insert:g,rangesArr:r,proposedReturn:[a,u,g]});}break}}if(!k&&t[e]==="/"&&!n.quotes?.value&&Number.isInteger(n.lastOpeningBracketAt)&&!Number.isInteger(n.lastClosingBracketAt)&&(n.slashPresent=e),t[e]==='"'||t[e]==="'")if(!k&&n.nameStarts&&n?.quotes?.value===t[e])if(o.valueStarts===void 0)o={},delete n.quotes;else {o.valueEnds=e,o.value=t.slice(o.valueStarts,e),n.attributes.push(o),o={},delete n.quotes;let s;l.dumpLinkHrefsNearby?.enabled&&!c.length&&n.attributes.some(a=>{if(typeof a.name=="string"&&a.name.toLowerCase()==="href")return s=`${l.dumpLinkHrefsNearby?.wrapHeads||""}${a.value}${l.dumpLinkHrefsNearby?.wrapTails||""}`,true})&&(d={tagName:n.name,hrefValue:s,openingTagEnds:void 0});}else !k&&!n.quotes&&n.nameStarts&&(n.quotes={},n.quotes.value=t[e],n.quotes.start=e,n.quotes.next=t.indexOf(t[e],e+1),o.nameStarts&&o.nameEnds&&o.nameEnds<e&&o.nameStarts<e&&!o.valueStarts&&(o.name=t.slice(o.nameStarts,o.nameEnds)));if(n.nameStarts!==void 0&&n.nameEnds===void 0&&(!t[e].trim()||!ee(t[e]))){if(n.nameEnds=e,n.name=t.slice(n.nameStarts,n.nameEnds+(!A(e)&&t[e]!=="/"&&t[e+1]===void 0?1:0)),t[n.nameStarts-1]!=="!"&&!n.name.replace(/-/g,"").length||/^\d+$/.test(n.name[0])){n={};continue}if(typeof n.name=="string"&&n.name.toLowerCase()==="doctype"&&(k=true),S(e)){U(l);let s=L(t,e,n.leftOuterWhitespace,e,n.lastOpeningBracketAt,e);(l.stripTogetherWithTheirContents.includes(n.name)||l.stripTogetherWithTheirContents.includes("*"))&&($$1=$$1.filter(([a,i])=>!(a===n.leftOuterWhitespace&&i===e))),l.cb({tag:n,deleteFrom:n.leftOuterWhitespace,deleteTo:e,insert:`${s}${E$1}${s}`,rangesArr:r,proposedReturn:[n.leftOuterWhitespace,e,`${s}${E$1}${s}`]}),_$1(),v$1(e,l,r);}}if(n.quotes?.start&&n.quotes.start<e&&!n.quotes.end&&o.nameEnds&&o.equalsAt&&!o.valueStarts&&(o.valueStarts=e),!n.quotes&&o.nameEnds&&t[e]==="="&&!o.valueStarts&&!o.equalsAt&&(o.equalsAt=e),!n.quotes&&o.nameStarts&&o.nameEnds&&!o.valueStarts&&t[e].trim()&&t[e]!=="="&&(n.attributes.push(o),o={}),!n.quotes&&o.nameStarts&&!o.nameEnds&&(k&&`'"`.includes(t[o.nameStarts])?o.nameStarts<e&&t[e]===t[o.nameStarts]&&(o.nameEnds=e+1,o.name=t.slice(o.nameStarts,o.nameEnds)):t[e].trim()?t[e]==="="?o.equalsAt||(o.nameEnds=e,o.equalsAt=e,o.name=t.slice(o.nameStarts,o.nameEnds)):t[e]==="/"||A(e)?(o.nameEnds=e,o.name=t.slice(o.nameStarts,o.nameEnds),n.attributes.push(o),o={}):S(e)&&(o.nameEnds=e,o.name=t.slice(o.nameStarts,o.nameEnds),n.attributes.push(o),o={}):(o.nameEnds=e,o.name=t.slice(o.nameStarts,o.nameEnds))),!n.quotes&&n.nameEnds<e&&!t[e-1].trim()&&t[e].trim()&&!"<>/!".includes(t[e])&&!o.nameStarts&&!n.lastClosingBracketAt&&(o.nameStarts=e),n.lastOpeningBracketAt!==null&&n.lastOpeningBracketAt<e&&t[e]==="/"&&n.onlyPlausible&&(n.onlyPlausible=false),n.lastOpeningBracketAt!==null&&n.lastOpeningBracketAt<e&&t[e]!=="/"&&(n.onlyPlausible===void 0&&((!t[e].trim()||S(e))&&!n.slashPresent?n.onlyPlausible=true:n.onlyPlausible=false),t[e].trim()&&n.nameStarts===void 0&&!S(e)&&t[e]!=="/"&&!A(e)&&t[e]!=="!"&&(n.nameStarts=e,n.nameContainsLetters=false)),n.nameStarts&&!n.quotes&&typeof t[e]=="string"&&t[e].toLowerCase()!==t[e].toUpperCase()&&(n.nameContainsLetters=true),A(e)&&(Y(n,t,e)||n.quotes.value&&typeof n.lastOpeningBracketAt=="number"&&ne(n.quotes.value,t.slice(n.lastOpeningBracketAt,e))%2===1&&!t.slice(n.lastOpeningBracketAt+1,e).includes("<")&&!t.slice(n.lastOpeningBracketAt+1,e).includes(">"))&&n.lastOpeningBracketAt!==void 0&&(n.lastClosingBracketAt=e,B=null,Object.keys(o).length&&(n.attributes.push(o),o={}),l.dumpLinkHrefsNearby?.enabled&&d.tagName&&!d.openingTagEnds&&(d.openingTagEnds=e)),(!k||t[e]===">")&&n.lastOpeningBracketAt!==void 0){if(n.lastClosingBracketAt===void 0){if(n.lastOpeningBracketAt<e&&!S(e)&&(t[e+1]===void 0||S(e+1)&&!n?.quotes?.value)&&n.nameContainsLetters&&typeof n.nameStarts=="number"){if(n.name=t.slice(n.nameStarts,n.nameEnds||e+1).toLowerCase(),(!b.length||b[b.length-1][0]!==n.lastOpeningBracketAt)&&b.push([n.lastOpeningBracketAt,e+1]),l.ignoreTags.includes(n.name)||M(e,l,n)||!P.has(n.name)&&(n.onlyPlausible||l.stripRecognisedHTMLOnly)){n={},o={};continue}if((P.has(n.name)||x.has(n.name))&&(n.onlyPlausible===false||n.onlyPlausible===true&&n.attributes.length)||t[e+1]===void 0){U(l);let s=L(t,e,n.leftOuterWhitespace,e+1,n.lastOpeningBracketAt,n.lastClosingBracketAt);R&&n.name==="script"&&n.slashPresent&&(R=false);let a;s===null||E$1===null?a=null:a=`${s}${E$1}${s}`,l.cb({tag:n,deleteFrom:n.leftOuterWhitespace,deleteTo:e+1,insert:a,rangesArr:r,proposedReturn:[n.leftOuterWhitespace,e+1,a]}),_$1(),v$1(e,l,r);}if(!$$1.length||$$1[$$1.length-1][0]!==n.lastOpeningBracketAt&&$$1[$$1.length-1][1]!==e+1)if(l.stripTogetherWithTheirContents.includes(n.name)||l.stripTogetherWithTheirContents.includes("*")){let s;for(let a=c.length;a--;)c[a].name===n.name&&(s=c[a]);s?($$1=$$1.filter(([a])=>a!==s.lastOpeningBracketAt),$$1.push([s.lastOpeningBracketAt,e+1])):$$1.push([n.lastOpeningBracketAt,e+1]);}else $$1.push([n.lastOpeningBracketAt,e+1]);}}else if(e>n.lastClosingBracketAt&&t[e].trim()||t[e+1]===void 0||l.ignoreIndentations&&`\r
`.includes(t[e])){let s=n.lastClosingBracketAt===e?e+1:e;l.trimOnlySpaces&&s===h-1&&B!==null&&B<e&&(s=B),(!b.length||b[b.length-1][0]!==n.lastOpeningBracketAt)&&b.push([n.lastOpeningBracketAt,n.lastClosingBracketAt+1]);let a=l.ignoreTags.includes(n.name),i=M(e,l,n);if(!F||l.stripRecognisedHTMLOnly&&typeof n.name=="string"&&!P.has(n.name.toLowerCase())&&!x.has(n.name.toLowerCase())||!z&&(a||i)||z&&!l.onlyStripTags.includes(n.name)||l.ignoreTagsWithTheirContents.includes(n.name)){if(i)if(n.slashPresent){for(let g=f.length;g--;)if(f[g].name===n.name){f.splice(g,1);break}f.length||(F=true);}else F&&(F=false),f.push(n);l.cb({tag:n,deleteFrom:null,deleteTo:null,insert:null,rangesArr:r,proposedReturn:null}),n={},o={};}else if(!n.onlyPlausible||n.attributes.length===0&&n.name&&(P.has(n.name.toLowerCase())||x.has(n.name.toLowerCase()))||n.attributes?.some(g=>g.equalsAt)){(!$$1.length||$$1[$$1.length-1][0]!==n.lastOpeningBracketAt)&&$$1.push([n.lastOpeningBracketAt,n.lastClosingBracketAt+1]);let g=L(t,e,n.leftOuterWhitespace,s,n.lastOpeningBracketAt,n.lastClosingBracketAt);E$1="",C=false,U(l,s);let u;typeof E$1=="string"&&E$1.length?(u=`${g}${E$1}${g===`

`?`
`:g}`,s===n.lastClosingBracketAt+1&&(!t[s]||!q.has(t[s]))&&(u+=" "),n.leftOuterWhitespace===n.lastOpeningBracketAt&&r.last()&&r.last()[1]<n.lastOpeningBracketAt&&(!l?.dumpLinkHrefsNearby?.putOnNewLine||!q.has(t[s]))&&(u=" "+u)):u=g,u!==null&&(n.leftOuterWhitespace===0||!E(t,s-1))&&(!l.dumpLinkHrefsNearby?.enabled||n.name!=="a")&&(u=void 0);let p=0;if(C&&q.has(t[s])){l.dumpLinkHrefsNearby?.putOnNewLine&&(u=`${t[s]}${u||""}`);let W=E(t,s);W&&u?.endsWith(`
`)?p+=W-e:(!W||W>e)&&p++;}l.cb({tag:n,deleteFrom:n.leftOuterWhitespace,deleteTo:s+p,insert:u,rangesArr:r,proposedReturn:[n.leftOuterWhitespace,s+p,u]}),_$1(),v$1(e,l,r);}else n={};A(e)||(n={});}k&&(k=false);}if((!R||t[e]==="<"&&E(t,E(t,e))&&t[E(t,e)]==="/"&&t.startsWith("script",E(t,E(t,e))))&&S(e)&&!S(e-1)&&!`'"`.includes(t[e+1])&&(!`'"`.includes(t[e+2])||/\w/.test(t[e+1]))&&!(t[e+1]==="c"&&t[e+2]===":")&&!(t[e+1]==="f"&&t[e+2]==="m"&&t[e+3]==="t"&&t[e+4]===":")&&!(t[e+1]==="s"&&t[e+2]==="q"&&t[e+3]==="l"&&t[e+4]===":")&&!(t[e+1]==="x"&&t[e+2]===":")&&!(t[e+1]==="f"&&t[e+2]==="n"&&t[e+3]===":")&&Y(n,t,e)){if(A(E(t,e)))continue;if(n.nameEnds&&n.nameEnds<e&&!n.lastClosingBracketAt&&(n.onlyPlausible===true&&n.attributes?.length||n.onlyPlausible===false)){let s=L(t,e,n.leftOuterWhitespace,e,n.lastOpeningBracketAt,e);l.cb({tag:n,deleteFrom:n.leftOuterWhitespace,deleteTo:e,insert:s,rangesArr:r,proposedReturn:[n.leftOuterWhitespace,e,s]}),v$1(e,l,r),n={},o={};}if(n.lastOpeningBracketAt!==void 0&&n.onlyPlausible&&n.name&&!n.quotes&&(n.lastOpeningBracketAt=void 0,n.name=void 0,n.onlyPlausible=false),(n.lastOpeningBracketAt===void 0||!n.onlyPlausible)&&!n.quotes&&(n.lastOpeningBracketAt=e,n.slashPresent=false,n.attributes=[],V===null?n.leftOuterWhitespace=e:l.trimOnlySpaces&&V===0?n.leftOuterWhitespace=w||e:n.leftOuterWhitespace=V,`${t[e+1]}${t[e+2]}${t[e+3]}`=="!--"||`${t[e+1]}${t[e+2]}${t[e+3]}${t[e+4]}${t[e+5]}${t[e+6]}${t[e+7]}${t[e+8]}`=="![CDATA[")){let s=true;t[e+2]==="-"&&(s=false);let a;for(let i=e;i<h;i++)if((!a&&s&&`${t[i-2]}${t[i-1]}${t[i]}`=="]]>"||!s&&`${t[i-2]}${t[i-1]}${t[i]}`=="-->")&&(a=i),a&&(a<i&&t[i].trim()||t[i+1]===void 0)){let g=i;(t[i+1]===void 0&&!t[i].trim()||t[i]===">")&&(g+=1),(!b.length||b[b.length-1][0]!==n.lastOpeningBracketAt)&&b.push([n.lastOpeningBracketAt,a+1]),(!$$1.length||$$1[$$1.length-1][0]!==n.lastOpeningBracketAt)&&$$1.push([n.lastOpeningBracketAt,a+1]);let u=L(t,i,n.leftOuterWhitespace,g,n.lastOpeningBracketAt,a);l.cb({tag:n,deleteFrom:n.leftOuterWhitespace,deleteTo:g,insert:u,rangesArr:r,proposedReturn:[n.leftOuterWhitespace,g,u]}),e=i-1,t[i]===">"&&(e=i),n={},o={};break}}}!t[e].trim()||t[e].charCodeAt(0)===847?(V===null&&(V=e,n.lastOpeningBracketAt!==void 0&&n.lastOpeningBracketAt<e&&n.nameStarts&&n.nameStarts<n.lastOpeningBracketAt&&e===n.lastOpeningBracketAt+1&&!c.some(s=>s.name===n.name)&&(n.onlyPlausible=true,n.name=void 0,n.nameStarts=void 0)),(t[e]===`
`||t[e]==="\r")&&(N=e,J&&(J=false))):(V!==null&&(!n.quotes&&o.equalsAt>V-1&&o.nameEnds&&o.equalsAt>o.nameEnds&&t[e]!=='"'&&t[e]!=="'"&&(u(o)&&n.attributes.push(o),o={},n.equalsSpottedAt=void 0),V=null),J||(J=true,F&&!R&&typeof N=="number"&&e&&N<e-1&&(t.slice(N+1,e).trim()?N=null:l.ignoreIndentations||r.push([N+1,e])))),t[e]===" "?w===null&&(w=e):w!==null&&(w=null),n.name==="script"&&(R=!n.slashPresent);}if(t&&!l.ignoreIndentations&&(l.trimOnlySpaces&&t[0]===" "||!l.trimOnlySpaces&&!t[0].trim()))for(let e=0;e<h;e++)if(l.trimOnlySpaces&&t[e]!==" "||!l.trimOnlySpaces&&t[e].trim()){r.push([0,e]);break}else t[e+1]||r.push([0,e+1]);if(t&&(l.trimOnlySpaces&&t[~-t.length]===" "||!l.trimOnlySpaces&&!t[~-t.length].trim())){for(let e=t.length;e--;)if(l.trimOnlySpaces&&t[e]!==" "||!l.trimOnlySpaces&&t[e].trim()){r.push([e+1,h]);break}}let O=r.current();if(!m?.cb&&O){if(O[0]&&!O[0][0]){O[0][1];r.ranges[0]=[r.ranges[0][0],r.ranges[0][1]];}if(O[O.length-1]&&O[O.length-1][1]===t.length){O[O.length-1][0];if(r.ranges){let s=r.ranges[r.ranges.length-1][0];t[s-1]&&(l.trimOnlySpaces&&t[s-1]===" "||!l.trimOnlySpaces&&!t[s-1].trim())&&(s-=1);let a=r.ranges[r.ranges.length-1][2];r.ranges[r.ranges.length-1]=[s,r.ranges[r.ranges.length-1][1]],a?.trim()&&r.ranges[r.ranges.length-1].push(a.trimEnd());}}}return {log:{timeTakenInMilliseconds:Date.now()-y},result:_(t,r.current()),ranges:r.current(),allTagLocations:b,filteredTagLocations:$$1}}

/**
 * @typedef {number} Float
 */

/**
 * Return a value to control whether to increase/decrease the timer, e.g.,
 *   to adjust if there is precession.
 * @callback Timer
 * @param {Float} interval Convenience if wish to conditionally add back
 * interval.
 * @returns {?Float}
 */

// const _Date = Date;

/**
 * @param {Timer} userTimeout
 * @param {Float} [interval]
 * @param {object} [cfg]
 * @param {boolean} [cfg.exitNoThrow]
 * @returns {() => void}
 */
function setSaferInterval (userTimeout, interval = 1000, {
  exitNoThrow = false
} = {}) {
  /** @type {number} */
  let timeoutID;
  let expected = Date.now() + interval;

  /**
   * @throws {Error}
   * @returns {void}
   */
  function timeout () {
    const now = Date.now();
    // console.log('new timeout check', new _Date(now));
    // console.log('Date.now()', Date.now());
    const timeDrift = now - expected;
    // Overshooting should not occur
    /* c8 ignore start */
    if (timeDrift > interval) {
      if (exitNoThrow) {
        return;
      }
      throw new Error(
        `Unexpected condition: ${timeDrift} time drift ` +
        `exceeding interval ${interval}`
      );
    }
    /* c8 ignore stop */

    const offset = userTimeout(interval) || 0;

    expected += interval + offset;

    // console.log(
    //   'offset', offset,
    //   '\ntime drift (minutes)', timeDrift / 1000 / 60,
    //   '\nexpected', new _Date(expected),
    //   '\nnew delay', Math.max(0, interval - timeDrift) + offset
    // );

    // Adjust for drift
    timeoutID = setTimeout(
      timeout, Math.max(0, interval - timeDrift) + offset
    );
  }

  timeoutID = setTimeout(timeout, interval);

  return function clear () {
    clearTimeout(timeoutID);
  };
}

var dist = {};

var rateLimiter = {};

var cjs = {};

var RateLimiter = {};

var TokenBucket = {};

var clock = {};

const universal = typeof globalThis !== "undefined" ? globalThis : global;
const performance$1 = universal.performance;

var browser = /*#__PURE__*/Object.freeze({
  __proto__: null,
  performance: performance$1
});

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(browser);

var hasRequiredClock;

function requireClock () {
	if (hasRequiredClock) return clock;
	hasRequiredClock = 1;
	Object.defineProperty(clock, "__esModule", { value: true });
	clock.wait = clock.getMilliseconds = void 0;
	const just_performance_1 = require$$0$1;
	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp) {
	    const clocktime = just_performance_1.performance.now() * 1e-3;
	    let seconds = Math.floor(clocktime);
	    let nanoseconds = Math.floor((clocktime % 1) * 1e9);
	    return [seconds, nanoseconds];
	}
	// The current timestamp in whole milliseconds
	function getMilliseconds() {
	    const [seconds, nanoseconds] = hrtime();
	    return seconds * 1e3 + Math.floor(nanoseconds / 1e6);
	}
	clock.getMilliseconds = getMilliseconds;
	// Wait for a specified number of milliseconds before fulfilling the returned promise.
	function wait(ms) {
	    return new Promise((resolve) => setTimeout(resolve, ms));
	}
	clock.wait = wait;
	
	return clock;
}

var hasRequiredTokenBucket;

function requireTokenBucket () {
	if (hasRequiredTokenBucket) return TokenBucket;
	hasRequiredTokenBucket = 1;
	Object.defineProperty(TokenBucket, "__esModule", { value: true });
	TokenBucket.TokenBucket = void 0;
	const clock_1 = requireClock();
	/**
	 * A hierarchical token bucket for rate limiting. See
	 * http://en.wikipedia.org/wiki/Token_bucket for more information.
	 *
	 * @param options
	 * @param options.bucketSize Maximum number of tokens to hold in the bucket.
	 *  Also known as the burst rate.
	 * @param options.tokensPerInterval Number of tokens to drip into the bucket
	 *  over the course of one interval.
	 * @param options.interval The interval length in milliseconds, or as
	 *  one of the following strings: 'second', 'minute', 'hour', day'.
	 * @param options.parentBucket Optional. A token bucket that will act as
	 *  the parent of this bucket.
	 */
	let TokenBucket$1 = class TokenBucket {
	    constructor({ bucketSize, tokensPerInterval, interval, parentBucket }) {
	        this.bucketSize = bucketSize;
	        this.tokensPerInterval = tokensPerInterval;
	        if (typeof interval === "string") {
	            switch (interval) {
	                case "sec":
	                case "second":
	                    this.interval = 1000;
	                    break;
	                case "min":
	                case "minute":
	                    this.interval = 1000 * 60;
	                    break;
	                case "hr":
	                case "hour":
	                    this.interval = 1000 * 60 * 60;
	                    break;
	                case "day":
	                    this.interval = 1000 * 60 * 60 * 24;
	                    break;
	                default:
	                    throw new Error("Invalid interval " + interval);
	            }
	        }
	        else {
	            this.interval = interval;
	        }
	        this.parentBucket = parentBucket;
	        this.content = 0;
	        this.lastDrip = clock_1.getMilliseconds();
	    }
	    /**
	     * Remove the requested number of tokens. If the bucket (and any parent
	     * buckets) contains enough tokens this will happen immediately. Otherwise,
	     * the removal will happen when enough tokens become available.
	     * @param count The number of tokens to remove.
	     * @returns A promise for the remainingTokens count.
	     */
	    async removeTokens(count) {
	        // Is this an infinite size bucket?
	        if (this.bucketSize === 0) {
	            return Number.POSITIVE_INFINITY;
	        }
	        // Make sure the bucket can hold the requested number of tokens
	        if (count > this.bucketSize) {
	            throw new Error(`Requested tokens ${count} exceeds bucket size ${this.bucketSize}`);
	        }
	        // Drip new tokens into this bucket
	        this.drip();
	        const comeBackLater = async () => {
	            // How long do we need to wait to make up the difference in tokens?
	            const waitMs = Math.ceil((count - this.content) * (this.interval / this.tokensPerInterval));
	            await clock_1.wait(waitMs);
	            return this.removeTokens(count);
	        };
	        // If we don't have enough tokens in this bucket, come back later
	        if (count > this.content)
	            return comeBackLater();
	        if (this.parentBucket != undefined) {
	            // Remove the requested from the parent bucket first
	            const remainingTokens = await this.parentBucket.removeTokens(count);
	            // Check that we still have enough tokens in this bucket
	            if (count > this.content)
	                return comeBackLater();
	            // Tokens were removed from the parent bucket, now remove them from
	            // this bucket. Note that we look at the current bucket and parent
	            // bucket's remaining tokens and return the smaller of the two values
	            this.content -= count;
	            return Math.min(remainingTokens, this.content);
	        }
	        else {
	            // Remove the requested tokens from this bucket
	            this.content -= count;
	            return this.content;
	        }
	    }
	    /**
	     * Attempt to remove the requested number of tokens and return immediately.
	     * If the bucket (and any parent buckets) contains enough tokens this will
	     * return true, otherwise false is returned.
	     * @param {Number} count The number of tokens to remove.
	     * @param {Boolean} True if the tokens were successfully removed, otherwise
	     *  false.
	     */
	    tryRemoveTokens(count) {
	        // Is this an infinite size bucket?
	        if (!this.bucketSize)
	            return true;
	        // Make sure the bucket can hold the requested number of tokens
	        if (count > this.bucketSize)
	            return false;
	        // Drip new tokens into this bucket
	        this.drip();
	        // If we don't have enough tokens in this bucket, return false
	        if (count > this.content)
	            return false;
	        // Try to remove the requested tokens from the parent bucket
	        if (this.parentBucket && !this.parentBucket.tryRemoveTokens(count))
	            return false;
	        // Remove the requested tokens from this bucket and return
	        this.content -= count;
	        return true;
	    }
	    /**
	     * Add any new tokens to the bucket since the last drip.
	     * @returns {Boolean} True if new tokens were added, otherwise false.
	     */
	    drip() {
	        if (this.tokensPerInterval === 0) {
	            const prevContent = this.content;
	            this.content = this.bucketSize;
	            return this.content > prevContent;
	        }
	        const now = clock_1.getMilliseconds();
	        const deltaMS = Math.max(now - this.lastDrip, 0);
	        this.lastDrip = now;
	        const dripAmount = deltaMS * (this.tokensPerInterval / this.interval);
	        const prevContent = this.content;
	        this.content = Math.min(this.content + dripAmount, this.bucketSize);
	        return Math.floor(this.content) > Math.floor(prevContent);
	    }
	};
	TokenBucket.TokenBucket = TokenBucket$1;
	
	return TokenBucket;
}

var hasRequiredRateLimiter$1;

function requireRateLimiter$1 () {
	if (hasRequiredRateLimiter$1) return RateLimiter;
	hasRequiredRateLimiter$1 = 1;
	Object.defineProperty(RateLimiter, "__esModule", { value: true });
	RateLimiter.RateLimiter = void 0;
	const TokenBucket_1 = requireTokenBucket();
	const clock_1 = requireClock();
	/**
	 * A generic rate limiter. Underneath the hood, this uses a token bucket plus
	 * an additional check to limit how many tokens we can remove each interval.
	 *
	 * @param options
	 * @param options.tokensPerInterval Maximum number of tokens that can be
	 *  removed at any given moment and over the course of one interval.
	 * @param options.interval The interval length in milliseconds, or as
	 *  one of the following strings: 'second', 'minute', 'hour', day'.
	 * @param options.fireImmediately Whether or not the promise will resolve
	 *  immediately when rate limiting is in effect (default is false).
	 */
	let RateLimiter$1 = class RateLimiter {
	    constructor({ tokensPerInterval, interval, fireImmediately }) {
	        this.tokenBucket = new TokenBucket_1.TokenBucket({
	            bucketSize: tokensPerInterval,
	            tokensPerInterval,
	            interval,
	        });
	        // Fill the token bucket to start
	        this.tokenBucket.content = tokensPerInterval;
	        this.curIntervalStart = clock_1.getMilliseconds();
	        this.tokensThisInterval = 0;
	        this.fireImmediately = fireImmediately !== null && fireImmediately !== void 0 ? fireImmediately : false;
	    }
	    /**
	     * Remove the requested number of tokens. If the rate limiter contains enough
	     * tokens and we haven't spent too many tokens in this interval already, this
	     * will happen immediately. Otherwise, the removal will happen when enough
	     * tokens become available.
	     * @param count The number of tokens to remove.
	     * @returns A promise for the remainingTokens count.
	     */
	    async removeTokens(count) {
	        // Make sure the request isn't for more than we can handle
	        if (count > this.tokenBucket.bucketSize) {
	            throw new Error(`Requested tokens ${count} exceeds maximum tokens per interval ${this.tokenBucket.bucketSize}`);
	        }
	        const now = clock_1.getMilliseconds();
	        // Advance the current interval and reset the current interval token count
	        // if needed
	        if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
	            this.curIntervalStart = now;
	            this.tokensThisInterval = 0;
	        }
	        // If we don't have enough tokens left in this interval, wait until the
	        // next interval
	        if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
	            if (this.fireImmediately) {
	                return -1;
	            }
	            else {
	                const waitMs = Math.ceil(this.curIntervalStart + this.tokenBucket.interval - now);
	                await clock_1.wait(waitMs);
	                const remainingTokens = await this.tokenBucket.removeTokens(count);
	                this.tokensThisInterval += count;
	                return remainingTokens;
	            }
	        }
	        // Remove the requested number of tokens from the token bucket
	        const remainingTokens = await this.tokenBucket.removeTokens(count);
	        this.tokensThisInterval += count;
	        return remainingTokens;
	    }
	    /**
	     * Attempt to remove the requested number of tokens and return immediately.
	     * If the bucket (and any parent buckets) contains enough tokens and we
	     * haven't spent too many tokens in this interval already, this will return
	     * true. Otherwise, false is returned.
	     * @param {Number} count The number of tokens to remove.
	     * @param {Boolean} True if the tokens were successfully removed, otherwise
	     *  false.
	     */
	    tryRemoveTokens(count) {
	        // Make sure the request isn't for more than we can handle
	        if (count > this.tokenBucket.bucketSize)
	            return false;
	        const now = clock_1.getMilliseconds();
	        // Advance the current interval and reset the current interval token count
	        // if needed
	        if (now < this.curIntervalStart || now - this.curIntervalStart >= this.tokenBucket.interval) {
	            this.curIntervalStart = now;
	            this.tokensThisInterval = 0;
	        }
	        // If we don't have enough tokens left in this interval, return false
	        if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval)
	            return false;
	        // Try to remove the requested number of tokens from the token bucket
	        const removed = this.tokenBucket.tryRemoveTokens(count);
	        if (removed) {
	            this.tokensThisInterval += count;
	        }
	        return removed;
	    }
	    /**
	     * Returns the number of tokens remaining in the TokenBucket.
	     * @returns {Number} The number of tokens remaining.
	     */
	    getTokensRemaining() {
	        this.tokenBucket.drip();
	        return this.tokenBucket.content;
	    }
	};
	RateLimiter.RateLimiter = RateLimiter$1;
	
	return RateLimiter;
}

var hasRequiredCjs;

function requireCjs () {
	if (hasRequiredCjs) return cjs;
	hasRequiredCjs = 1;
	(function (exports) {
		var __createBinding = (cjs && cjs.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (cjs && cjs.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(requireRateLimiter$1(), exports);
		__exportStar(requireTokenBucket(), exports);
		
	} (cjs));
	return cjs;
}

var hasRequiredRateLimiter;

function requireRateLimiter () {
	if (hasRequiredRateLimiter) return rateLimiter;
	hasRequiredRateLimiter = 1;
	Object.defineProperty(rateLimiter, "__esModule", { value: true });
	rateLimiter.RateLimiter = void 0;
	var limiter_1 = requireCjs();
	var RateLimiter = /** @class */ (function () {
	    /**
	     * Creates a new RateLimiter object to control rate limiting.
	     *
	     * @param amount - Amount of times an action can be done within an interval. Ex: `2` would mean 2 times.
	     * @param interval - Length of an interval in milliseconds. Ex: `5000` would mean 5 seconds.
	     *
	     * @returns RateLimiter object.
	     */
	    function RateLimiter(amount, interval) {
	        this.amount = amount;
	        this.interval = interval;
	        this.limiters = {};
	    }
	    /**
	     * Takes a token from the rate limiter.
	     *
	     * @param key Key which identifies the entity being limited (Ex: a username or ID).
	     *
	     * @returns Whether this action exceeds the rate limit.
	     */
	    RateLimiter.prototype.take = function (key) {
	        var limiter = this.limiters[key];
	        if (!limiter) {
	            limiter = new limiter_1.RateLimiter({
	                tokensPerInterval: this.amount,
	                interval: this.interval,
	            });
	            this.limiters[key] = limiter;
	        }
	        if (limiter.getTokensRemaining() < 1) {
	            return true;
	        }
	        limiter.removeTokens(1);
	        return false;
	    };
	    return RateLimiter;
	}());
	rateLimiter.RateLimiter = RateLimiter;
	
	return rateLimiter;
}

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.RateLimiter = void 0;
		var rate_limiter_1 = requireRateLimiter();
		Object.defineProperty(exports, "RateLimiter", { enumerable: true, get: function () { return rate_limiter_1.RateLimiter; } });
		
	} (dist));
	return dist;
}

var distExports = requireDist();

/**
 * @typedef {number} Integer
 */
/**
 * @typedef {(text: string) => string} StripTags
 */
/**
 * @typedef {object} PageInfo
 * @property {string} url
 * @property {string} title
 * @property {string} img
 * @property {string} [snippet]
 */
/**
 * @callback BpGetTodayTool
 * @returns {Promise<string>}
 */
/**
 * @callback WikiGetRandomTool
 * @param {Integer} num
 * @param {string} host
 * @param {boolean} wikiPrefix
 * @returns {Promise<PageInfo|"">}
 */
/**
 * @callback WikiGetURLTool
 * @param {string} kw
 * @param {Integer} num
 * @param {string} host
 * @param {boolean} [wikiPrefix=false]
 * @returns {Promise<PageInfo|false|undefined>}
 */
/**
* @typedef {object} BotWikiTools
* @property {import('./commands/getAdmin.js').PuppetTool} [puppet]
* @property {BpGetTodayTool} bpGetToday
* @property {WikiGetRandomTool} wikiGetRandom
* @property {WikiGetURLTool} wikiGetURL
*/

/**
 * @param {object} cfg
 * @param {globalThis.fetch|import('node-fetch').default} cfg.fetch
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {StripTags} cfg.striptags
 * @returns {BotWikiTools}
 */
function getWikiTools ({
  // eslint-disable-next-line no-shadow -- Familiar
  fetch,
  striptags,
  _
}) {
  // Modules
  /**
   * @type {BotWikiTools}
   */
  return {
    /**
     * @type {BpGetTodayTool}
     */
    async bpGetToday () {
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale,
        // @ts-expect-error TS issue
        options
      ).format(date);
      // console.log(md);

      const url = 'https://bahaipedia.org/api.php';
      const queryParams = {
        action: 'parse',
        page: `Bahaipedia:Today_in_History/${md.toString()}`,
        prop: 'text',
        format: 'json'
      };

      const tUrl = `${url}?${new URLSearchParams({
        ...queryParams,
        origin: '*'
      })}`;

      // console.log(tUrl);

      try {
        const tResponse = await (await fetch(tUrl)).json();
        const rawText = tResponse.parse.text['*'].split('</center>\n');
        const text = striptags(rawText.length > 1 ? rawText[1] : rawText[0]);
        // console.log(text);
        // console.log(uUrl);
        return text;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving JSON for today URL', tUrl, error);
        return '';
      }
    },

    /**
     * @type {WikiGetRandomTool}
     */
    async wikiGetRandom (num, host, wikiPrefix) {
      const url = `https://${host}/api.php`;

      const queryParams = /** @type {Record<string, string>} */ ({
        action: 'query',
        indexpageids: '1',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        // list: (host == 'bahai.media')?'':'random',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        generator: 'random',
        grnnamespace: (host === 'bahai.media') ? '6' : '0',
        grnlimit: String(num),
        format: 'json'
      });

      const rUrl = `${url}?${new URLSearchParams({
        ...queryParams,
        origin: '*'
      })}`;

      // console.log(rUrl);

      try {
        const rResponse = await (await fetch(rUrl)).json();
        const titles = rResponse.query.pages[
          rResponse.query.pageids[0]
        ].title;
        // console.log(titles);

        // console.log("foo");
        // console.log(uUrl);
        return {
          title: titles,
          url: `https://${host}/${wikiPrefix ? 'wiki/' : ''}${
            encodeURIComponent(titles)}`,
          img: (host === 'bahai.media')
            ? rResponse.query.pages[
              rResponse.query.pageids[0]
            ].imageinfo[0].url
            : ''
        };
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving random wiki URL', rUrl, error);
        return '';
      }
    },

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    bpGetRandom (kw, num) {
      const host = 'bahaipedia.org';

      return this.wikiGetURL(kw, num, host);
    },
    */

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    b9GetRandom (kw, num) {
      const host = 'bahai9.com';

      return this.wikiGetURL(kw, num, host, true);
    },
    */

    /**
     * @type {WikiGetURLTool}
     */
    async wikiGetURL (kw, num, host, wikiPrefix = false) {
      const url = `https://${host}/api.php`;
      const searchParams = /** @type {Record<string, string>} */ ({
        action: 'query',
        list: 'search',
        generator: 'search',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        srsearch: kw,
        srnamespace: (host === 'bahai.media') ? '6' : '0',
        srlimit: String(num),
        srprop: 'snippet',
        gsrsearch: kw,
        gsrnamespace: (host === 'bahai.media') ? '6' : '0',
        gsrlimit: String(num),
        format: 'json'
      });

      const sUrl = `${url}?${new URLSearchParams({
        ...searchParams,
        origin: '*'
      })}`;

      // console.log(sUrl);

      try {
        const sResponse = await (await fetch(sUrl)).json();

        if (sResponse.query.searchinfo.totalhits !== 0) {
          const titles = sResponse.query.search[0].title;
          // console.log(titles);
          /*
          const urlParams = {
            action: 'query',
            titles,
            prop: 'info',
            inprop: 'url',
            format: 'json'
          };
          */
          // console.log("foo");

          /*
          const uUrl = `${url}?${new URLSearchParams({
            ...urlParams,
            origin: '*'
          })}`;
          */

          // console.log(uUrl);
          return {
            title: titles,
            url: `https://${host}/${
              wikiPrefix ? 'wiki/' : ''
            }${encodeURIComponent(titles)}`,
            snippet: sResponse.query.search[0].snippet,
            img: (host === 'bahai.media')
              ? sResponse.query.pages[
                sResponse.query.search[0].pageid
              ].imageinfo[0].url
              : ''
          };
        }
        return false;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving wiki search URL', sUrl, error);
        return undefined;
      }
    }

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    bpGetURL (kw, num) {
      const host = 'bahaipedia.org';

      return this.wikiGetURL(kw, num, host);
    },
    */

    /**
     *
     * @param {string} kw
     * @param {Integer} num
     * @returns {Promise<PageInfo|false|undefined>}
     */
    /*
    b9GetURL (kw, num) {
      const host = 'bahai9.com';

      return this.wikiGetURL(kw, num, host, true);
    },
    */

    /**
     *
     * @param {string} url
     * @param {string} snip
     * @returns {Promise<false|undefined|PageInfo>}
     */
    /*
    async bpGetPageInfo (url, snip) {
      // console.log("bar");
      // console.log(url);
      try {
        const pResponse = await (await fetch(url)).json();
        if (pResponse) {
          const {pages} = pResponse.query;
          // console.log(pages);
          const fpk = Object.keys(pages)[0];
          const p = {
            url: pages[fpk].canonicalurl,
            title: pages[fpk].title,
            snippet: snip
          };
          // console.log(p);
          // console.log("baz");
          return p;
        }
        return false;
      } catch (error) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error retrieving Bahaipedia page info', url, error);
        return undefined;
      }
    },
    */
  };
}

/**
 * @typedef {number} Float
 */
/**
 * Given time in seconds, creates pretty output in days, hours,
 *   minutes, and seconds.
 * @todo See about replacing with
 *   {@link https://github.com/tc39/proposal-intl-duration-format|Intl.DurationFormat}
 *   once it may be standardized and/or better polyfilled.
 * This should also be i18nized but should be able to get that easier by
 *   replacing with `Intl.DurationFormat` when available.
 * @param {Float} seconds
 * @returns {string}
 */
function istr (seconds) {
  let sec = seconds;
  const cid = Math.floor(sec / 86400);
  sec %= 86400;
  const cih = Math.floor(sec / 3600);
  sec %= 3600;
  const cim = Math.floor(sec / 60);
  const cis = Math.floor(sec % 60);

  let timestr = '';
  if (Math.floor(seconds) === 0) {
    timestr = '0s';
  } else {
    const noDays = cid === 0;
    const noHours = cih === 0;
    const noMinutes = cim === 0;
    const noSeconds = cis === 0;

    timestr += noDays ? '' : `${cid}d`;
    timestr += (noDays || (noHours && noMinutes && noSeconds)) ? '' : ', ';
    timestr += noHours ? '' : `${cih}h`;
    timestr += (
      noHours || (noMinutes && noSeconds)
    )
      ? ''
      : ', ';
    timestr += noMinutes ? '' : `${cim}m`;
    timestr += (noMinutes || noSeconds) ? '' : ', ';
    timestr += noSeconds ? '' : `${cis}s`;
  }
  return timestr;
}

/**
* @param {object} cfg
* @param {string[]} cfg.ADMIN_ROLES
* @param {import('discord.js').Client} cfg.client
* @returns {import('./getCommands.js').BotCommands}
*/
const getSocialInfo = ({
  ADMIN_ROLES, client
}) => {
  return {
    users: {
      re: /!users\b/iv,
      // helpInfo: {
      //  name: '!users',
      //  value: 'Displays a count of online users.'
      // }
      /**
       * Users gives the number of online users.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const {guild} = message;
        const onlineCount = guild?.members.cache.filter(
          (m) => m.presence?.status !== 'offline'
        ).size;

        const admins = guild?.members.cache.filter((m) => {
          if (
            m.roles.cache.some((r) => {
              return ADMIN_ROLES.includes(r.name);
            })
          ) {
            return m.presence?.status !== 'offline';
          }
          return false;

          // console.log(m.roles)
        });

        message.channel.send(
          `There ${
            (onlineCount === 1) ? 'is' : 'are'
          } currently ${onlineCount} user${
            (onlineCount === 1) ? '' : 's'
          } online, including ${
            admins?.size
          } admin/mod/helper(s).`
        );

        // eslint-disable-next-line no-console -- CLI
        console.log(`Users command issued by ${message.author.username}.`);
      }
    },
    seen: {
      re: /!seen\b/iv,
      // helpInfo: {
      //  name: '!seen',
      //  value: 'Displays the last time a user was seen online.'
      // },
      /**
       * Seen returns the last time a user sent a message.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        const sname = message.content.split(' ').filter(
          (word) => !(word.includes('391405681795923968') ||
            word.includes('847456996738334730') || word === '!seen')
        ).join(' ');

        // const {guild} = message;
        // const userOnline = guild.members.cache.filter(
        //  (m) => m.presence.status === 'online').size;
        // let userStatus = '';
        const replies = [];

        const user = client.users.cache.find((val) => {
          return val.username === sname;
        });
        if (!user) {
          replies.push(`I haven't seen ${sname} lately.`);
          return;
        }
        // userStatus = user.presence.status;

        const member = await message.guild.members.fetch(user);
        const {channel} = message;
        const messages = await channel.messages.fetch({limit: 100});
        const userMessages = messages.filter(
          (msg) => msg.author.id === user.id
        );
        const lastUserMessage = userMessages.first();

        // Todo: Stop ignoring this once test in place.
        /* c8 ignore next 16 */
        if (lastUserMessage) {
          const stat = (
            member.presence?.status === 'dnd' ? 'busy' : member.presence?.status
          );
          const lastseen = new Date(lastUserMessage.createdAt);
          const now = new Date();
          const timedelta = (now > lastseen)
            ? Number(now) - Number(lastseen)
            : 0;
          replies.push(
            `${sname} is now ${stat}, and was last seen in ${
              channel
            } ${istr(timedelta / 1000)} ago.`
          );
        } else {
          const stat = (
            member.presence?.status === 'dnd' ? 'busy' : member.presence?.status
          );
          replies.push(
            `${sname} is now ${stat}; I haven't seen them lately.`
          );
        }

        message.channel.send(replies.join('\n'));

        // eslint-disable-next-line no-console -- CLI
        console.log(`Seen command issued by ${message.author.username}.`);
      }
    }
  };
};

/* READER AND LIBRARY FILE */

/**
 * @callback ShowList
 * @param {import('discord.js').Message<true>} message
 * @returns {void}
 */

/**
 * @callback ReadBook
 * @param {import('discord.js').Message<true>} message
 * @param {string|null} avatar
 * @param {import('discord.js')} Discord
 * @returns {Promise<void>}
 */
/**
 * @callback ReadRandom
 * @param {import('discord.js').Message<true>} message
 * @param {string|null} avatar
 * @param {import('discord.js')} Discord
 * @returns {Promise<void>}
 */
/**
 * @callback Reader
 * @param {import('discord.js').Message<true>} message
 * @returns {void}
 */
/**
 * @typedef {{
 *   showList: ShowList,
 *   readBook: ReadBook,
 *   readRandom: ReadRandom,
 *   reader: Reader
 * }} ReaderInfo
 */

/**
 * @typedef {object} Footnote
 * @property {string} fn
 * @property {string} note
 */

/**
 * @typedef {object} LibraryFileEntry
 * @property {string} title
 * @property {string} text
 * @property {Footnote[]} notes
 */

/**
 * @typedef {LibraryFileEntry[]} LibraryFile
 */

/**
 * @typedef {{
 *   id: number,
 *   title: string,
 *   paras: {
 *     id: number,
 *     text: string
 *   }[],
 *   notes: Footnote[]
 * }} Chapter
 */

/**
 * @typedef {{
 *   title: string,
 *   author: string,
 *   url: string,
 *   chapters: Chapter[]
 * }} LibraryFileWithChapters
 */

/**
 * @param {object} cfg
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @returns {Promise<ReaderInfo>}
 */
async function getReader ({fs, settings}) {
  // IMPORT FILES

  /**
   * @typedef {object} ListingEntry
   * @property {number} id
   * @property {string[]} aka_codes
   * @property {string} title
   * @property {string} author
   * @property {string} filename
   * @property {string} url
   * @property {string} code
   */

  /**
   * @typedef {{
   *   index: Record<string, number>,
   *   list: ListingEntry[]
   * }} LibraryListing
   */

  /**
   * Retrieve Library Data.
   * @type {LibraryListing}
   */
  const library = JSON.parse(
    await fs.readFile(
      new URL('../../library/library_listing.json', import.meta.url), 'utf8'
    )
  );

  // GLOBAL VARIABLES
  const colorBorder = settings.embedColor;
  const MAX_TEXT_LIMIT = settings.embedTextLimit ?? 2000;

  const availableRandomOptions = Object.keys(library.index);

  const fileRegex = /\bread (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv;

  // FUNCTIONS

  /**
   * Checks whether file exists.
   * @param {LibraryFileWithChapters} file Name of the file based on the
   *   library_listing
   * @param {import('../getWikiTools.js').Integer} index
   * @returns {Chapter|string}
   */
  function readFile (file, index) {
    // Collect size of file
    const max = file.chapters.length;

    // Setup index. It's subtracted by 1 due to array listing
    // 0 is the first element, 1 is the second, etc.
    index = Number.parseInt(String(index)) - 1;

    // If the index value is within the permitted range
    if (index > -1 && index < max) {
      // Return the relevant section
      return file.chapters[index];
    }
    /* c8 ignore next 4 */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    return "I know which work you're talking about, but I can't find that " +
      `section in it. Valid section numbers are from **1** to **${max}**.`;
  }

  /**
   * Split large text while maintaining full words (from stackoverflow:
   * {@link https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin}.
   * @param {string} str
   * @param {import('../getWikiTools.js').Integer} l
   * @returns {string[]}
   */
  function splitter (str, l) {
    const strs = [];

    // Disable this and test once other works are enabled besides the
    //   Hidden Words (which should not have any verses we could use
    //   exceeding our default `MAX_TEXT_LIMIT` setting)
    /* c8 ignore next 20 */
    // If content string is greater than max limit
    while (str.length > l) {
      // Find the last position of space
      let pos = str.slice(0, Math.max(0, l)).lastIndexOf(' ');

      // Identify the substring position
      pos = pos <= 0 ? l : pos;

      // Push sub string into array of strings
      strs.push(str.slice(0, Math.max(0, pos)));

      // Setup the new index for the string
      let i = str.indexOf(' ', pos) + 1;

      // Make sure it's not the last position
      if (i < pos || i > pos + l) {
        i = pos;
      }

      // Recreate the full text as str, and repeat
      str = str.slice(Math.max(0, i));
    }

    // Push the final string into strings
    strs.push(str);

    // Pass out the data
    return strs;
  }

  /**
   * Embed creator for the reader function.
   * @param {import('discord.js')} Discord
   * @param {string|null} avatar
   * @param {import('discord.js').Message<true>} message
   * @param {import('../getWikiTools.js').Integer} refNumber
   * @param {string} refName
   * @param {Chapter} content
   * @returns {void}
   */
  function embedCreator (
    Discord, avatar, message, refNumber, refName, content
  ) {
    // Define the embed features
    let embedDescription = '';

    // Initialize output
    embedDescription = (refName.toLowerCase() === 'hwa' ||
      refName.toLowerCase() === 'hwp')
      ? `**${refNumber}. ${content.title}**\n`
      // Remove this and test once other works besides hwa/hwp enabled.
      /* c8 ignore next */
      : `**Chapter ${refNumber}, Para 1. ${content.title}**\n`;

    // Split text if large
    const textDescriptionSplit = splitter(content.paras[0].text,
      MAX_TEXT_LIMIT);

    // Process the embed data based on the size of the text
    textDescriptionSplit.forEach((textDesc, i) => {
      // Re-create a new object for the next round of embed for super long text
      const embed = new Discord.EmbedBuilder();

      // Set colors and data
      embed.setColor(colorBorder ?? null);
      embed.setAuthor({
        name: `${library.list[library.index[refName]].title} by ` +
        `${library.list[library.index[refName]].author}`,
        iconURL: avatar ?? undefined
      });

      // Append new information
      embedDescription += textDesc;
      embed.setDescription(embedDescription);

      // Place the 'note' in the last embed message
      if (i === textDescriptionSplit.length - 1) {
        // Unreachable currently with the two Hidden Words options not
        //  having notes; remove this ignore and test when enabling
        //  other works that do have notes.
        /* c8 ignore next 12 */
        // If there are notes
        if (content.notes !== undefined && content.notes.length > 0) {
          let ntext = '';

          for (const n of content.notes) {
            ntext += `${n.fn}. ${n.note}\n`;
          }

          if (ntext !== '') {
            embed.addFields({
              name: 'Notes',
              value: ntext,
              inline: false
            });
          }
        }
      }

      // Publish message
      message.channel.send({embeds: [embed]});

      // Reset the text info
      embedDescription = '';
    });
  }

  /**
   * Shows the listing of library items.
   * @returns {string}
   */
  function showListing () {
    // Initiatilze output string
    let output = '';

    // Based on the global variable, pull the names and loop through the data
    for (const element of library.list) {
      output += `\n**${
        element.code.toUpperCase()
      }**: ${element.title} (${element.author})`;
    }

    // Add additional space
    output += '\n';

    // Output message
    return output;
  }

  /**
   * Opens the file.
   * @param {string} refName
   * @returns {Promise<LibraryFileWithChapters>}
   */
  async function openFile (refName) {
    // Retrieve file name
    const file = JSON.parse(
      await fs.readFile(
        new URL(
          `../../library/${library.list[library.index[refName]].filename}`,
          import.meta.url
        ),
        'utf8'
      )
    );

    return file;
  }

  // MODULES

  /** @type {ShowList} */
  function showList (message) {
    const content = showListing();

    message.channel.send({
      content: `The following texts are available in my ` +
                      `library, ${message.author.username}.`,
      embeds: [{
        color: 8359053,
        description: '\nTo read from one of these texts, mention the ' +
            "book name and the section you're interested in. For example, " +
            'to read the 12th Arabic Hidden Word, say: `!read HWA 12`.',
        fields: [
          {
            name: 'Available Texts',
            value: content
          }
        ]
      }]
    });
  }

  /** @type {ReadBook} */
  async function readBook (message, avatar, Discord) {
    // Collect user input
    const userInput = message.content;

    // Pull the relevant data from the regex
    const {groups} = userInput.match(fileRegex) ?? {};

    let {refName} = /** @type {{refName: string}} */ (groups);
    const {index} = /** @type {{index: string}} */ (groups);

    // Make sure the file exists
    if (!Object.hasOwn(library.index, refName.toLowerCase())) {
      return;
    }

    // Transform user input
    refName = refName.toLowerCase();

    // Open the file
    const file = await openFile(refName);

    // Feed into readFile function
    const content = readFile(file, Number(index));

    // If condition based on data type returned
    if (typeof content === 'object') {
      // Create the embed
      embedCreator(
        Discord, avatar, message, Number(index), refName, content
      );
    /* c8 ignore next 6 */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    } else {
      // Inform the user that they did not select the correct section
      message.channel.send(content);
    }
  }

  /** @type {ReadRandom} */
  async function readRandom (message, avatar, Discord) {
    // Select a random element
    const refName = availableRandomOptions[
      Math.floor(Math.random() * availableRandomOptions.length)
    ];

    // Receive the file
    const file = await openFile(refName);

    // Generate random reference number
    const randomNumber = Math.floor(Math.random() * file.chapters.length);

    // Generate a random number based on the file length and pull content
    //  from file
    const content = /** @type {Chapter} */ (readFile(file, randomNumber));

    // Create the embed
    embedCreator(Discord, avatar, message, randomNumber, refName, content);
  }

  /** @type {Reader} */
  function reader (message) {
    // Inform the user they need to provide the correct input.
    // This is the default false conditions
    message.channel.send(
      "I couldn't understand your request. Make sure you format your " +
      'request like this: ``read <work> <section number>``. To see the ' +
      'list of works in my library, type ``read list``.'
    );
  }

  /**
   * @type {ReaderInfo}
   */
  return {
    showList,
    readBook,
    readRandom,
    reader
  };
}

/**
 * @param {object} cfg
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord.js')} cfg.Discord
 * @returns {Promise<import('./getCommands.js').BotCommands>}
 */
const getBahaiWritings = async ({fs, settings, client, Discord}) => {
  const reader = await getReader({fs, settings});

  return {
    readBook: {
      re: /\bread (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv,
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readBook(
          message, /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(), Discord
        );
      }
    },
    showList: {
      re: /\bread list$/iv,
      /**
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.showList(message);
      }
    },
    readRandom: {
      re: /\bread random$/iv,
      /**
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readRandom(
          message,
          /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(),
          Discord
        );
      }
    },
    read: {
      re: /!read\b/iv,
      // This is reused for the other commands
      helpInfo: {
        name: '!read [list | random | *‹text›* *‹chapter›*]',
        value: 'Reads from the Bahá\'í Writings. Displays an excerpt ' +
            'from given *chapter* of *text*. Available texts are ' +
            'displayed using `!read list`; `!read random` displays ' +
            'a random passage from available texts.'
      },
      /**
       * A fallback if the user fails to provide an argument.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        return reader.reader(message);
      }
    }
  };
};

/**
 * @param {object} cfg
 * @param {import('../getWikiTools.js').BotWikiTools} cfg.wikiTools
 * @param {import('discord.js').Client} cfg.client
 * @param {import('intl-dom').I18NCallback} cfg._
 * @returns {import('./getCommands.js').BotCommands}
 */
const getBahaiWikis = function ({wikiTools, client, _}) {
  // Private methods

  /**
   * @param {import('discord.js').Message<true>} message
   * @param {string} bstarString
   * @returns {Promise<void>}
   */
  const todayInHistory = async function (message, bstarString) {
    let res;
    try {
      res = await wikiTools.bpGetToday();
    // Shouldn't need catch
    /* c8 ignore next 5 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting Bahaipedia Today', err);
      return;
    }
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log('Query completed.');
      /** @type {Intl.DateTimeFormatOptions} */
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale, options
      ).format(date);
      message.channel.send({
        content: 'Here is the result of your query.',
        embeds: [{
          color: 3447003,
          description: `${
            bstarString
          }Here's Bahaipedia's Today in History entry for ${
            md
          }, ${message.author.username}:\n\n ${res}`
        }]
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embeds: [{
        color: 3447003,
        description: `${
          bstarString
        }Bahaipedia did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }]
    });
  };

  /**
   * @param {import('discord.js').Message<true>} message
   * @param {import('../getWikiTools.js').Integer} numResults
   * @param {string} host
   * @param {string} bstarString
   * @param {string} sitename
   * @param {boolean} wikiPrefix
   * @returns {Promise<void>}
   */
  const random = async function (
    message, numResults, host, bstarString, sitename, wikiPrefix
  ) {
    let qr;
    try {
      qr = await wikiTools.wikiGetRandom(numResults, host, wikiPrefix);
    // Shouldn't need catch
    /* c8 ignore next 5 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting wiki random', err);
      return;
    }
    const res = qr && qr.title && qr;
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log('Query completed.');
      message.channel.send({
        content: 'Here is the result of your query.',
        embeds: [{
          color: 3447003,
          description: `${bstarString}${
            sitename
          } has returned the following random page, ${
            message.author.username
          }:\n\n **[${
            res.title
          }](${res.url})**`,
          image: {
            url: res.img !== ''
              /* c8 ignore next */
              ? res.img
              : ''
          }
        }]
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embeds: [{
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }]
    });
  };

  /**
   * @param {import('discord.js').Message<true>} message
   * @param {string} kw
   * @param {import('../getWikiTools.js').Integer} numResults
   * @param {string} host
   * @param {string} bstarString
   * @param {string} sitename
   * @param {boolean} wikiPrefix
   * @returns {Promise<void>}
   */
  const search = async function (
    message, kw, numResults, host, bstarString, sitename, wikiPrefix
  ) {
    let sr;
    try {
      sr = await wikiTools.wikiGetURL(kw, numResults, host, wikiPrefix);
    // Errors should be caught internally by this method.
    /* c8 ignore next 4 */
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.error('Error getting', err);
    }
    // eslint-disable-next-line no-console -- CLI
    console.log('Result:', sr);
    const res = typeof sr === 'object' && sr?.title && sr;
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log(`Search completed: ${kw} => ${res.title}`);
      const regex = /<span class="searchmatch">|<\/span>/gvi;
      const snip = res.snippet?.replaceAll(regex, '**');
      message.channel.send({
        content: 'Here is the result of your search.',
        embeds: [{
          color: 3447003,
          description: `${bstarString}${
            sitename
          } has returned the following page as the top result ` +
            `for your search, ${
              message.author.username
            }:\n\n **[${res.title}](${res.url})**\n\n${
              snip
            }`,
          image: {
            url: res.img !== ''
              /* c8 ignore next */
              ? res.img
              : ''
          }
        }]
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your search.',
      embeds: [{
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your search, ${
          message.author.username
        }. Did you spell your search terms correctly?\n\n` +
          `There may also have been a network problem. ` +
          `If you think you're getting this message in ` +
          `error, you may want to try again later.`
      }]
    });
  };

  // Bp looks up keywords on bahaipedia
  /**
   * @param {import('discord.js').Message<true>} message
   * @param {object} cfg
   * @param {boolean} [cfg.forceToday]
   * @returns {Promise<void>}
   */
  async function bahaipediaAction (message, {forceToday} = {}) {
    const bwikiMatch = /!(?:bp|pedia|b9|bahai9|bm|media|img)/gvi;
    // const flag = /-([1-5]|r|rnd|rand|t|tih|today)/gvi;

    const words = message.content.split(' ');
    // const parsed = false;

    // console.log("0: " + words);

    // find the word matching the call to this function
    const bpIdx = words.findIndex((i) => i.match(bwikiMatch));

    // remove this and all previous words
    words.splice(0, bpIdx + 1);

    // console.log("1: " + words);

    const rndRgx = /-(?:r|rnd|rand)/gvi;
    const tihRgx = /-(?:t|tih|today)/gvi;
    const nrRgx = /-(?<nr>[1-5])/vi;

    // search
    const searchRegex = /[\w\s'‘’\(\)\-,.]+/gvi;
    const keywords = words.join(' ');
    // console.log("3: " + keywords);

    let tih = false;
    let numResults = 1;
    let rand = false;

    // which site
    let host = '';
    let sitename = '';
    let wikiPrefix = false;

    if (today.re.test(message.content)) {
      tih = true;
    } else {
      if (bp.re.test(message.content)) {
        host = 'bahaipedia.org';
        sitename = 'Bahaipedia';
      } else if (b9.re.test(message.content)) {
        host = 'bahai9.com';
        sitename = 'Bahai9';
        wikiPrefix = true;
      } else if (bm.re.test(message.content)) {
        host = 'bahai.media';
        sitename = 'Bahaimedia';
      }

      // find the rand flag
      const rndIdx = words.findIndex((i) => i.match(rndRgx));
      if (rndIdx !== -1) {
        rand = true;
        // remove this word
        words.splice(rndIdx, 1);
      } else { // rand supersedes today
        // find the today flag
        const tihIdx = words.findIndex((i) => i.match(tihRgx));
        if (tihIdx !== -1) {
          tih = true;
          // remove this word
          words.splice(tihIdx, 1);
        }
      }

      const nrIdx = words.findIndex((i) => i.match(nrRgx));
      if (nrIdx !== -1) {
        numResults = Number(words[nrIdx]);
        // remove this word
        words.splice(nrIdx, 1);
      }
    }

    // console.log("2: " + rand);

    const bstar = client.emojis.cache.find((val) => val.name === 'bstar');
    const bstarString = bstar?.toString() ? `${bstar.toString()} ` : '';
    if (bstar) {
      message.react(bstar);
    }

    // random page
    if (rand) {
      try {
        await random(
          message, numResults, host, bstarString, sitename, wikiPrefix
        );
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error with random wiki', err);
        return;
      }
    // today in history
    } else if (
      tih &&
      // Could remove this condition if other wikis support, but they
      //   don't currently, and we're hard-coding the URL in the tools method.
      (forceToday || host === 'bahaipedia.org')
    ) {
      try {
        await todayInHistory(message, bstarString);
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error with today in history', err);
        return;
      }
    } else if (searchRegex.test(keywords)) {
      try {
        await search(
          message, keywords, numResults, host,
          bstarString, sitename, wikiPrefix
        );
      // Shouldn't err out.
      /* c8 ignore next 5 */
      } catch (err) {
        // eslint-disable-next-line no-console -- CLI
        console.error('Error searching wiki', err);
        return;
      }
    }

    // eslint-disable-next-line no-console -- CLI
    console.log(`BP command issued by ${message.author.username}.`);
  }

  const today = {
    re: /!today\b/iv,
    helpInfo: {
      name: '!today',
      value: "Displays a list of events from today's date " +
          'in history, via Bahaipedia.'
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message, {forceToday: true});
    }
  };

  const b9 = {
    re: /!(?:b9|bahai9)\b/iv,
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bm = {
    re: /!(?:bm|media|img)\b/iv,
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bp = {
    re: /!(?:bp|pedia)\b/iv,
    action: bahaipediaAction,
    // This will be reused across several commands
    helpInfo: {
      name: '!bp | !b9 | !bm [-rand | *‹keyword›*]',
      value: 'Return a link to the top result for *keyword* on ' +
          'Bahaipedia (`!bp`), Bahai9.com (`!b9`), or ' +
          'Bahai.media (`!bm`); `-rand` displays a random ' +
          'article (or file).'
    }
  };

  return {
    bp,
    today,
    b9,
    bm
  };
};

var v10$a = {};

var v10$9 = {};

var hasRequiredV10$5;

function requireV10$5 () {
	if (hasRequiredV10$5) return v10$9;
	hasRequiredV10$5 = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/gateway
	 */
	Object.defineProperty(v10$9, "__esModule", { value: true });
	v10$9.VoiceChannelEffectSendAnimationType = v10$9.GatewayDispatchEvents = v10$9.GatewayIntentBits = v10$9.GatewayCloseCodes = v10$9.GatewayOpcodes = v10$9.GatewayVersion = void 0;
	v10$9.GatewayVersion = '10';
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes}
	 */
	var GatewayOpcodes;
	(function (GatewayOpcodes) {
	    /**
	     * An event was dispatched
	     */
	    GatewayOpcodes[GatewayOpcodes["Dispatch"] = 0] = "Dispatch";
	    /**
	     * A bidirectional opcode to maintain an active gateway connection.
	     * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
	     */
	    GatewayOpcodes[GatewayOpcodes["Heartbeat"] = 1] = "Heartbeat";
	    /**
	     * Starts a new session during the initial handshake
	     */
	    GatewayOpcodes[GatewayOpcodes["Identify"] = 2] = "Identify";
	    /**
	     * Update the client's presence
	     */
	    GatewayOpcodes[GatewayOpcodes["PresenceUpdate"] = 3] = "PresenceUpdate";
	    /**
	     * Used to join/leave or move between voice channels
	     */
	    GatewayOpcodes[GatewayOpcodes["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
	    /**
	     * Resume a previous session that was disconnected
	     */
	    GatewayOpcodes[GatewayOpcodes["Resume"] = 6] = "Resume";
	    /**
	     * You should attempt to reconnect and resume immediately
	     */
	    GatewayOpcodes[GatewayOpcodes["Reconnect"] = 7] = "Reconnect";
	    /**
	     * Request information about offline guild members in a large guild
	     */
	    GatewayOpcodes[GatewayOpcodes["RequestGuildMembers"] = 8] = "RequestGuildMembers";
	    /**
	     * The session has been invalidated. You should reconnect and identify/resume accordingly
	     */
	    GatewayOpcodes[GatewayOpcodes["InvalidSession"] = 9] = "InvalidSession";
	    /**
	     * Sent immediately after connecting, contains the `heartbeat_interval` to use
	     */
	    GatewayOpcodes[GatewayOpcodes["Hello"] = 10] = "Hello";
	    /**
	     * Sent in response to receiving a heartbeat to acknowledge that it has been received
	     */
	    GatewayOpcodes[GatewayOpcodes["HeartbeatAck"] = 11] = "HeartbeatAck";
	    /**
	     * Request information about soundboard sounds in a set of guilds
	     */
	    GatewayOpcodes[GatewayOpcodes["RequestSoundboardSounds"] = 31] = "RequestSoundboardSounds";
	})(GatewayOpcodes || (v10$9.GatewayOpcodes = GatewayOpcodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes}
	 */
	var GatewayCloseCodes;
	(function (GatewayCloseCodes) {
	    /**
	     * We're not sure what went wrong. Try reconnecting?
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownError"] = 4000] = "UnknownError";
	    /**
	     * You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway-events#payload-structure}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
	    /**
	     * You sent an invalid payload to us. Don't do that!
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway#sending-events}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DecodeError"] = 4002] = "DecodeError";
	    /**
	     * You sent us a payload prior to identifying
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway-events#identify}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
	    /**
	     * The account token sent with your identify payload is incorrect
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway-events#identify}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
	    /**
	     * You sent more than one identify payload. Don't do that!
	     */
	    GatewayCloseCodes[GatewayCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
	    /**
	     * The sequence sent when resuming the session was invalid. Reconnect and start a new session
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway-events#resume}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidSeq"] = 4007] = "InvalidSeq";
	    /**
	     * Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this
	     */
	    GatewayCloseCodes[GatewayCloseCodes["RateLimited"] = 4008] = "RateLimited";
	    /**
	     * Your session timed out. Reconnect and start a new one
	     */
	    GatewayCloseCodes[GatewayCloseCodes["SessionTimedOut"] = 4009] = "SessionTimedOut";
	    /**
	     * You sent us an invalid shard when identifying
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway#sharding}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidShard"] = 4010] = "InvalidShard";
	    /**
	     * The session would have handled too many guilds - you are required to shard your connection in order to connect
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway#sharding}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["ShardingRequired"] = 4011] = "ShardingRequired";
	    /**
	     * You sent an invalid version for the gateway
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
	    /**
	     * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway#gateway-intents}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["InvalidIntents"] = 4013] = "InvalidIntents";
	    /**
	     * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not
	     * enabled or are not whitelisted for
	     *
	     * @see {@link https://discord.com/developers/docs/topics/gateway#gateway-intents}
	     * @see {@link https://discord.com/developers/docs/topics/gateway#privileged-intents}
	     */
	    GatewayCloseCodes[GatewayCloseCodes["DisallowedIntents"] = 4014] = "DisallowedIntents";
	})(GatewayCloseCodes || (v10$9.GatewayCloseCodes = GatewayCloseCodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway#list-of-intents}
	 */
	var GatewayIntentBits;
	(function (GatewayIntentBits) {
	    GatewayIntentBits[GatewayIntentBits["Guilds"] = 1] = "Guilds";
	    GatewayIntentBits[GatewayIntentBits["GuildMembers"] = 2] = "GuildMembers";
	    GatewayIntentBits[GatewayIntentBits["GuildModeration"] = 4] = "GuildModeration";
	    /**
	     * @deprecated This is the old name for {@link GatewayIntentBits.GuildModeration}
	     */
	    GatewayIntentBits[GatewayIntentBits["GuildBans"] = 4] = "GuildBans";
	    GatewayIntentBits[GatewayIntentBits["GuildExpressions"] = 8] = "GuildExpressions";
	    /**
	     * @deprecated This is the old name for {@link GatewayIntentBits.GuildExpressions}
	     */
	    GatewayIntentBits[GatewayIntentBits["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
	    GatewayIntentBits[GatewayIntentBits["GuildIntegrations"] = 16] = "GuildIntegrations";
	    GatewayIntentBits[GatewayIntentBits["GuildWebhooks"] = 32] = "GuildWebhooks";
	    GatewayIntentBits[GatewayIntentBits["GuildInvites"] = 64] = "GuildInvites";
	    GatewayIntentBits[GatewayIntentBits["GuildVoiceStates"] = 128] = "GuildVoiceStates";
	    GatewayIntentBits[GatewayIntentBits["GuildPresences"] = 256] = "GuildPresences";
	    GatewayIntentBits[GatewayIntentBits["GuildMessages"] = 512] = "GuildMessages";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["DirectMessages"] = 4096] = "DirectMessages";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
	    GatewayIntentBits[GatewayIntentBits["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
	    GatewayIntentBits[GatewayIntentBits["MessageContent"] = 32768] = "MessageContent";
	    GatewayIntentBits[GatewayIntentBits["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
	    GatewayIntentBits[GatewayIntentBits["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
	    GatewayIntentBits[GatewayIntentBits["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
	    GatewayIntentBits[GatewayIntentBits["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
	})(GatewayIntentBits || (v10$9.GatewayIntentBits = GatewayIntentBits = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway-events#receive-events}
	 */
	var GatewayDispatchEvents;
	(function (GatewayDispatchEvents) {
	    GatewayDispatchEvents["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
	    GatewayDispatchEvents["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
	    GatewayDispatchEvents["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
	    GatewayDispatchEvents["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
	    GatewayDispatchEvents["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
	    GatewayDispatchEvents["ChannelCreate"] = "CHANNEL_CREATE";
	    GatewayDispatchEvents["ChannelDelete"] = "CHANNEL_DELETE";
	    GatewayDispatchEvents["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
	    GatewayDispatchEvents["ChannelUpdate"] = "CHANNEL_UPDATE";
	    GatewayDispatchEvents["EntitlementCreate"] = "ENTITLEMENT_CREATE";
	    GatewayDispatchEvents["EntitlementDelete"] = "ENTITLEMENT_DELETE";
	    GatewayDispatchEvents["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
	    GatewayDispatchEvents["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
	    GatewayDispatchEvents["GuildBanAdd"] = "GUILD_BAN_ADD";
	    GatewayDispatchEvents["GuildBanRemove"] = "GUILD_BAN_REMOVE";
	    GatewayDispatchEvents["GuildCreate"] = "GUILD_CREATE";
	    GatewayDispatchEvents["GuildDelete"] = "GUILD_DELETE";
	    GatewayDispatchEvents["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
	    GatewayDispatchEvents["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
	    GatewayDispatchEvents["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
	    GatewayDispatchEvents["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
	    GatewayDispatchEvents["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
	    GatewayDispatchEvents["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
	    GatewayDispatchEvents["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
	    GatewayDispatchEvents["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
	    GatewayDispatchEvents["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
	    GatewayDispatchEvents["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
	    GatewayDispatchEvents["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
	    GatewayDispatchEvents["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
	    GatewayDispatchEvents["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
	    GatewayDispatchEvents["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
	    GatewayDispatchEvents["GuildSoundboardSoundCreate"] = "GUILD_SOUNDBOARD_SOUND_CREATE";
	    GatewayDispatchEvents["GuildSoundboardSoundDelete"] = "GUILD_SOUNDBOARD_SOUND_DELETE";
	    GatewayDispatchEvents["GuildSoundboardSoundsUpdate"] = "GUILD_SOUNDBOARD_SOUNDS_UPDATE";
	    GatewayDispatchEvents["GuildSoundboardSoundUpdate"] = "GUILD_SOUNDBOARD_SOUND_UPDATE";
	    GatewayDispatchEvents["SoundboardSounds"] = "SOUNDBOARD_SOUNDS";
	    GatewayDispatchEvents["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
	    GatewayDispatchEvents["GuildUpdate"] = "GUILD_UPDATE";
	    GatewayDispatchEvents["IntegrationCreate"] = "INTEGRATION_CREATE";
	    GatewayDispatchEvents["IntegrationDelete"] = "INTEGRATION_DELETE";
	    GatewayDispatchEvents["IntegrationUpdate"] = "INTEGRATION_UPDATE";
	    GatewayDispatchEvents["InteractionCreate"] = "INTERACTION_CREATE";
	    GatewayDispatchEvents["InviteCreate"] = "INVITE_CREATE";
	    GatewayDispatchEvents["InviteDelete"] = "INVITE_DELETE";
	    GatewayDispatchEvents["MessageCreate"] = "MESSAGE_CREATE";
	    GatewayDispatchEvents["MessageDelete"] = "MESSAGE_DELETE";
	    GatewayDispatchEvents["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
	    GatewayDispatchEvents["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
	    GatewayDispatchEvents["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
	    GatewayDispatchEvents["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
	    GatewayDispatchEvents["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
	    GatewayDispatchEvents["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
	    GatewayDispatchEvents["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
	    GatewayDispatchEvents["MessageUpdate"] = "MESSAGE_UPDATE";
	    GatewayDispatchEvents["PresenceUpdate"] = "PRESENCE_UPDATE";
	    GatewayDispatchEvents["RateLimited"] = "RATE_LIMITED";
	    GatewayDispatchEvents["Ready"] = "READY";
	    GatewayDispatchEvents["Resumed"] = "RESUMED";
	    GatewayDispatchEvents["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
	    GatewayDispatchEvents["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
	    GatewayDispatchEvents["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
	    GatewayDispatchEvents["SubscriptionCreate"] = "SUBSCRIPTION_CREATE";
	    GatewayDispatchEvents["SubscriptionDelete"] = "SUBSCRIPTION_DELETE";
	    GatewayDispatchEvents["SubscriptionUpdate"] = "SUBSCRIPTION_UPDATE";
	    GatewayDispatchEvents["ThreadCreate"] = "THREAD_CREATE";
	    GatewayDispatchEvents["ThreadDelete"] = "THREAD_DELETE";
	    GatewayDispatchEvents["ThreadListSync"] = "THREAD_LIST_SYNC";
	    GatewayDispatchEvents["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
	    GatewayDispatchEvents["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
	    GatewayDispatchEvents["ThreadUpdate"] = "THREAD_UPDATE";
	    GatewayDispatchEvents["TypingStart"] = "TYPING_START";
	    GatewayDispatchEvents["UserUpdate"] = "USER_UPDATE";
	    GatewayDispatchEvents["VoiceChannelEffectSend"] = "VOICE_CHANNEL_EFFECT_SEND";
	    GatewayDispatchEvents["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
	    GatewayDispatchEvents["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
	    GatewayDispatchEvents["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
	})(GatewayDispatchEvents || (v10$9.GatewayDispatchEvents = GatewayDispatchEvents = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway-events#voice-channel-effect-send-animation-types}
	 */
	var VoiceChannelEffectSendAnimationType;
	(function (VoiceChannelEffectSendAnimationType) {
	    /**
	     * A fun animation, sent by a Nitro subscriber
	     */
	    VoiceChannelEffectSendAnimationType[VoiceChannelEffectSendAnimationType["Premium"] = 0] = "Premium";
	    /**
	     * The standard animation
	     */
	    VoiceChannelEffectSendAnimationType[VoiceChannelEffectSendAnimationType["Basic"] = 1] = "Basic";
	})(VoiceChannelEffectSendAnimationType || (v10$9.VoiceChannelEffectSendAnimationType = VoiceChannelEffectSendAnimationType = {}));
	// #endregion Shared
	
	return v10$9;
}

var v10Exports$5 = requireV10$5();
var mod$7 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports$5);

const GatewayCloseCodes = mod$7.GatewayCloseCodes;
const GatewayDispatchEvents = mod$7.GatewayDispatchEvents;
const GatewayIntentBits = mod$7.GatewayIntentBits;
const GatewayOpcodes$1 = mod$7.GatewayOpcodes;
const GatewayVersion = mod$7.GatewayVersion;
const VoiceChannelEffectSendAnimationType = mod$7.VoiceChannelEffectSendAnimationType;

var v10$8 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GatewayCloseCodes: GatewayCloseCodes,
  GatewayDispatchEvents: GatewayDispatchEvents,
  GatewayIntentBits: GatewayIntentBits,
  GatewayOpcodes: GatewayOpcodes$1,
  GatewayVersion: GatewayVersion,
  VoiceChannelEffectSendAnimationType: VoiceChannelEffectSendAnimationType,
  default: mod$7
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(v10$8);

var globals$1 = {};

var hasRequiredGlobals;

function requireGlobals () {
	if (hasRequiredGlobals) return globals$1;
	hasRequiredGlobals = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.FormattingPatterns = void 0;
		/**
		 * @see {@link https://discord.com/developers/docs/reference#message-formatting-formats}
		 */
		exports.FormattingPatterns = {
		    /**
		     * Regular expression for matching a user mention, strictly without a nickname
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     */
		    User: /<@(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a user mention, strictly with a nickname
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     *
		     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
		     */
		    UserWithNickname: /<@!(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a user mention, with or without a nickname
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     *
		     * @deprecated Passing `!` in user mentions is no longer necessary / supported, and future message contents won't have it
		     */
		    UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a channel mention
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     */
		    Channel: /<#(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a role mention
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     */
		    Role: /<@&(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a application command mention
		     *
		     * The `fullName` (possibly including `name`, `subcommandOrGroup` and `subcommand`) and `id` group properties are present on the `exec` result of this expression
		     */
		    SlashCommand: /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
		    /**
		     * Regular expression for matching a custom emoji, either static or animated
		     *
		     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
		     */
		    Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching strictly an animated custom emoji
		     *
		     * The `animated`, `name` and `id` group properties are present on the `exec` result of this expression
		     */
		    AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching strictly a static custom emoji
		     *
		     * The `name` and `id` group properties are present on the `exec` result of this expression
		     */
		    StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		    /**
		     * Regular expression for matching a timestamp, either default or custom styled
		     *
		     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
		     */
		    // eslint-disable-next-line prefer-named-capture-group
		    Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
		    /**
		     * Regular expression for matching strictly default styled timestamps
		     *
		     * The `timestamp` group property is present on the `exec` result of this expression
		     */
		    DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
		    /**
		     * Regular expression for matching strictly custom styled timestamps
		     *
		     * The `timestamp` and `style` group properties are present on the `exec` result of this expression
		     */
		    StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
		    /**
		     * Regular expression for matching a guild navigation mention
		     *
		     * The `type` group property is present on the `exec` result of this expression
		     */
		    GuildNavigation: /<id:(?<type>customize|browse|guide|linked-roles)>/,
		    /**
		     * Regular expression for matching a linked role mention
		     *
		     * The `id` group property is present on the `exec` result of this expression
		     */
		    LinkedRole: /<id:linked-roles:(?<id>\d{17,20})>/,
		};
		/**
		 * Freezes the formatting patterns
		 *
		 * @internal
		 */
		Object.freeze(exports.FormattingPatterns);
		
	} (globals$1));
	return globals$1;
}

var globalsExports = requireGlobals();
var mod$6 = /*@__PURE__*/getDefaultExportFromCjs(globalsExports);

const FormattingPatterns = mod$6.FormattingPatterns;

var globals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FormattingPatterns: FormattingPatterns,
  default: mod$6
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(globals);

var v10$7 = {};

var common$2 = {};

var hasRequiredCommon$2;

function requireCommon$2 () {
	if (hasRequiredCommon$2) return common$2;
	hasRequiredCommon$2 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.PermissionFlagsBits = void 0;
		/**
		 * @see {@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags}
		 *
		 * These flags are exported as `BigInt`s and NOT numbers. Wrapping them in `Number()`
		 * may cause issues, try to use BigInts as much as possible or modules that can
		 * replicate them in some way
		 */
		exports.PermissionFlagsBits = {
		    /**
		     * Allows creation of instant invites
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    CreateInstantInvite: 1n << 0n,
		    /**
		     * Allows kicking members
		     */
		    KickMembers: 1n << 1n,
		    /**
		     * Allows banning members
		     */
		    BanMembers: 1n << 2n,
		    /**
		     * Allows all permissions and bypasses channel permission overwrites
		     */
		    Administrator: 1n << 3n,
		    /**
		     * Allows management and editing of channels
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ManageChannels: 1n << 4n,
		    /**
		     * Allows management and editing of the guild
		     */
		    ManageGuild: 1n << 5n,
		    /**
		     * Allows for the addition of reactions to messages
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    AddReactions: 1n << 6n,
		    /**
		     * Allows for viewing of audit logs
		     */
		    ViewAuditLog: 1n << 7n,
		    /**
		     * Allows for using priority speaker in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    PrioritySpeaker: 1n << 8n,
		    /**
		     * Allows the user to go live
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    Stream: 1n << 9n,
		    /**
		     * Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ViewChannel: 1n << 10n,
		    /**
		     * Allows for sending messages in a channel and creating threads in a forum
		     * (does not allow sending messages in threads)
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    SendMessages: 1n << 11n,
		    /**
		     * Allows for sending of `/tts` messages
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    SendTTSMessages: 1n << 12n,
		    /**
		     * Allows for deletion of other users messages
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ManageMessages: 1n << 13n,
		    /**
		     * Links sent by users with this permission will be auto-embedded
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    EmbedLinks: 1n << 14n,
		    /**
		     * Allows for uploading images and files
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    AttachFiles: 1n << 15n,
		    /**
		     * Allows for reading of message history
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ReadMessageHistory: 1n << 16n,
		    /**
		     * Allows for using the `@everyone` tag to notify all users in a channel,
		     * and the `@here` tag to notify all online users in a channel
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    MentionEveryone: 1n << 17n,
		    /**
		     * Allows the usage of custom emojis from other servers
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    UseExternalEmojis: 1n << 18n,
		    /**
		     * Allows for viewing guild insights
		     */
		    ViewGuildInsights: 1n << 19n,
		    /**
		     * Allows for joining of a voice channel
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    Connect: 1n << 20n,
		    /**
		     * Allows for speaking in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    Speak: 1n << 21n,
		    /**
		     * Allows for muting members in a voice channel
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    MuteMembers: 1n << 22n,
		    /**
		     * Allows for deafening of members in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    DeafenMembers: 1n << 23n,
		    /**
		     * Allows for moving of members between voice channels
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    MoveMembers: 1n << 24n,
		    /**
		     * Allows for using voice-activity-detection in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    UseVAD: 1n << 25n,
		    /**
		     * Allows for modification of own nickname
		     */
		    ChangeNickname: 1n << 26n,
		    /**
		     * Allows for modification of other users nicknames
		     */
		    ManageNicknames: 1n << 27n,
		    /**
		     * Allows management and editing of roles
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ManageRoles: 1n << 28n,
		    /**
		     * Allows management and editing of webhooks
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    ManageWebhooks: 1n << 29n,
		    /**
		     * Allows management and editing of emojis, stickers, and soundboard sounds
		     *
		     * @deprecated This is the old name for {@link PermissionFlagsBits.ManageGuildExpressions}
		     */
		    ManageEmojisAndStickers: 1n << 30n,
		    /**
		     * Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users
		     */
		    ManageGuildExpressions: 1n << 30n,
		    /**
		     * Allows members to use application commands, including slash commands and context menu commands
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    UseApplicationCommands: 1n << 31n,
		    /**
		     * Allows for requesting to speak in stage channels
		     *
		     * Applies to channel types: Stage
		     */
		    RequestToSpeak: 1n << 32n,
		    /**
		     * Allows for editing and deleting scheduled events created by all users
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    ManageEvents: 1n << 33n,
		    /**
		     * Allows for deleting and archiving threads, and viewing all private threads
		     *
		     * Applies to channel types: Text
		     */
		    ManageThreads: 1n << 34n,
		    /**
		     * Allows for creating public and announcement threads
		     *
		     * Applies to channel types: Text
		     */
		    CreatePublicThreads: 1n << 35n,
		    /**
		     * Allows for creating private threads
		     *
		     * Applies to channel types: Text
		     */
		    CreatePrivateThreads: 1n << 36n,
		    /**
		     * Allows the usage of custom stickers from other servers
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    UseExternalStickers: 1n << 37n,
		    /**
		     * Allows for sending messages in threads
		     *
		     * Applies to channel types: Text
		     */
		    SendMessagesInThreads: 1n << 38n,
		    /**
		     * Allows for using Activities (applications with the {@link ApplicationFlags.Embedded} flag) in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    UseEmbeddedActivities: 1n << 39n,
		    /**
		     * Allows for timing out users to prevent them from sending or reacting to messages in chat and threads,
		     * and from speaking in voice and stage channels
		     */
		    ModerateMembers: 1n << 40n,
		    /**
		     * Allows for viewing role subscription insights
		     */
		    ViewCreatorMonetizationAnalytics: 1n << 41n,
		    /**
		     * Allows for using soundboard in a voice channel
		     *
		     * Applies to channel types: Voice
		     */
		    UseSoundboard: 1n << 42n,
		    /**
		     * Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user
		     */
		    CreateGuildExpressions: 1n << 43n,
		    /**
		     * Allows for creating scheduled events, and editing and deleting those created by the current user
		     *
		     * Applies to channel types: Voice, Stage
		     */
		    CreateEvents: 1n << 44n,
		    /**
		     * Allows the usage of custom soundboard sounds from other servers
		     *
		     * Applies to channel types: Voice
		     */
		    UseExternalSounds: 1n << 45n,
		    /**
		     * Allows sending voice messages
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    SendVoiceMessages: 1n << 46n,
		    /**
		     * Allows sending polls
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    SendPolls: 1n << 49n,
		    /**
		     * Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server
		     *
		     * Applies to channel types: Text, Voice, Stage
		     */
		    UseExternalApps: 1n << 50n,
		    /**
		     * Allows pinning and unpinning messages
		     *
		     * Applies to channel types: Text
		     */
		    PinMessages: 1n << 51n,
		};
		/**
		 * Freeze the object of bits, preventing any modifications to it
		 *
		 * @internal
		 */
		Object.freeze(exports.PermissionFlagsBits);
		
	} (common$2));
	return common$2;
}

var application = {};

var hasRequiredApplication;

function requireApplication () {
	if (hasRequiredApplication) return application;
	hasRequiredApplication = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/application
	 */
	Object.defineProperty(application, "__esModule", { value: true });
	application.ApplicationWebhookEventStatus = application.ApplicationRoleConnectionMetadataType = application.ApplicationFlags = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/application#application-object-application-flags}
	 */
	var ApplicationFlags;
	(function (ApplicationFlags) {
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["EmbeddedReleased"] = 2] = "EmbeddedReleased";
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["ManagedEmoji"] = 4] = "ManagedEmoji";
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["EmbeddedIAP"] = 8] = "EmbeddedIAP";
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["GroupDMCreate"] = 16] = "GroupDMCreate";
	    /**
	     * Indicates if an app uses the Auto Moderation API
	     */
	    ApplicationFlags[ApplicationFlags["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["RPCHasConnected"] = 2048] = "RPCHasConnected";
	    /**
	     * Intent required for bots in 100 or more servers to receive `presence_update` events
	     */
	    ApplicationFlags[ApplicationFlags["GatewayPresence"] = 4096] = "GatewayPresence";
	    /**
	     * Intent required for bots in under 100 servers to receive `presence_update` events, found in Bot Settings
	     */
	    ApplicationFlags[ApplicationFlags["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
	    /**
	     * Intent required for bots in 100 or more servers to receive member-related events like `guild_member_add`.
	     *
	     * @see List of member-related events {@link https://discord.com/developers/docs/topics/gateway#list-of-intents | under `GUILD_MEMBERS`}
	     */
	    ApplicationFlags[ApplicationFlags["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
	    /**
	     * Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found in Bot Settings.
	     *
	     * @see List of member-related events {@link https://discord.com/developers/docs/topics/gateway#list-of-intents | under `GUILD_MEMBERS`}
	     */
	    ApplicationFlags[ApplicationFlags["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
	    /**
	     * Indicates unusual growth of an app that prevents verification
	     */
	    ApplicationFlags[ApplicationFlags["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
	    /**
	     * Indicates if an app is embedded within the Discord client (currently unavailable publicly)
	     */
	    ApplicationFlags[ApplicationFlags["Embedded"] = 131072] = "Embedded";
	    /**
	     * Intent required for bots in 100 or more servers to receive {@link https://support-dev.discord.com/hc/articles/6207308062871 | message content}
	     */
	    ApplicationFlags[ApplicationFlags["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
	    /**
	     * Intent required for bots in under 100 servers to receive {@link https://support-dev.discord.com/hc/articles/6207308062871 | message content},
	     * found in Bot Settings
	     */
	    ApplicationFlags[ApplicationFlags["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
	    /**
	     * @unstable This application flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ApplicationFlags[ApplicationFlags["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
	    /**
	     * Indicates if an app has registered global {@link https://discord.com/developers/docs/interactions/application-commands | application commands}
	     */
	    ApplicationFlags[ApplicationFlags["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
	})(ApplicationFlags || (application.ApplicationFlags = ApplicationFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type}
	 */
	var ApplicationRoleConnectionMetadataType;
	(function (ApplicationRoleConnectionMetadataType) {
	    /**
	     * The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
	    /**
	     * The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
	    /**
	     * The metadata value (`integer`) is equal to the guild's configured value (`integer`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerEqual"] = 3] = "IntegerEqual";
	    /**
	     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["IntegerNotEqual"] = 4] = "IntegerNotEqual";
	    /**
	     * The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; days before current date)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
	    /**
	     * The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; days before current date)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
	    /**
	     * The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanEqual"] = 7] = "BooleanEqual";
	    /**
	     * The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`)
	     */
	    ApplicationRoleConnectionMetadataType[ApplicationRoleConnectionMetadataType["BooleanNotEqual"] = 8] = "BooleanNotEqual";
	})(ApplicationRoleConnectionMetadataType || (application.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/application#application-object-application-event-webhook-status}
	 */
	var ApplicationWebhookEventStatus;
	(function (ApplicationWebhookEventStatus) {
	    /**
	     * Webhook events are disabled by developer
	     */
	    ApplicationWebhookEventStatus[ApplicationWebhookEventStatus["Disabled"] = 1] = "Disabled";
	    /**
	     * Webhook events are enabled by developer
	     */
	    ApplicationWebhookEventStatus[ApplicationWebhookEventStatus["Enabled"] = 2] = "Enabled";
	    /**
	     * Webhook events are disabled by Discord, usually due to inactivity
	     */
	    ApplicationWebhookEventStatus[ApplicationWebhookEventStatus["DisabledByDiscord"] = 3] = "DisabledByDiscord";
	})(ApplicationWebhookEventStatus || (application.ApplicationWebhookEventStatus = ApplicationWebhookEventStatus = {}));
	
	return application;
}

var auditLog = {};

var hasRequiredAuditLog;

function requireAuditLog () {
	if (hasRequiredAuditLog) return auditLog;
	hasRequiredAuditLog = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/audit-log
	 */
	Object.defineProperty(auditLog, "__esModule", { value: true });
	auditLog.AuditLogOptionsType = auditLog.AuditLogEvent = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events}
	 */
	var AuditLogEvent;
	(function (AuditLogEvent) {
	    AuditLogEvent[AuditLogEvent["GuildUpdate"] = 1] = "GuildUpdate";
	    AuditLogEvent[AuditLogEvent["ChannelCreate"] = 10] = "ChannelCreate";
	    AuditLogEvent[AuditLogEvent["ChannelUpdate"] = 11] = "ChannelUpdate";
	    AuditLogEvent[AuditLogEvent["ChannelDelete"] = 12] = "ChannelDelete";
	    AuditLogEvent[AuditLogEvent["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
	    AuditLogEvent[AuditLogEvent["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
	    AuditLogEvent[AuditLogEvent["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
	    AuditLogEvent[AuditLogEvent["MemberKick"] = 20] = "MemberKick";
	    AuditLogEvent[AuditLogEvent["MemberPrune"] = 21] = "MemberPrune";
	    AuditLogEvent[AuditLogEvent["MemberBanAdd"] = 22] = "MemberBanAdd";
	    AuditLogEvent[AuditLogEvent["MemberBanRemove"] = 23] = "MemberBanRemove";
	    AuditLogEvent[AuditLogEvent["MemberUpdate"] = 24] = "MemberUpdate";
	    AuditLogEvent[AuditLogEvent["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
	    AuditLogEvent[AuditLogEvent["MemberMove"] = 26] = "MemberMove";
	    AuditLogEvent[AuditLogEvent["MemberDisconnect"] = 27] = "MemberDisconnect";
	    AuditLogEvent[AuditLogEvent["BotAdd"] = 28] = "BotAdd";
	    AuditLogEvent[AuditLogEvent["RoleCreate"] = 30] = "RoleCreate";
	    AuditLogEvent[AuditLogEvent["RoleUpdate"] = 31] = "RoleUpdate";
	    AuditLogEvent[AuditLogEvent["RoleDelete"] = 32] = "RoleDelete";
	    AuditLogEvent[AuditLogEvent["InviteCreate"] = 40] = "InviteCreate";
	    AuditLogEvent[AuditLogEvent["InviteUpdate"] = 41] = "InviteUpdate";
	    AuditLogEvent[AuditLogEvent["InviteDelete"] = 42] = "InviteDelete";
	    AuditLogEvent[AuditLogEvent["WebhookCreate"] = 50] = "WebhookCreate";
	    AuditLogEvent[AuditLogEvent["WebhookUpdate"] = 51] = "WebhookUpdate";
	    AuditLogEvent[AuditLogEvent["WebhookDelete"] = 52] = "WebhookDelete";
	    AuditLogEvent[AuditLogEvent["EmojiCreate"] = 60] = "EmojiCreate";
	    AuditLogEvent[AuditLogEvent["EmojiUpdate"] = 61] = "EmojiUpdate";
	    AuditLogEvent[AuditLogEvent["EmojiDelete"] = 62] = "EmojiDelete";
	    AuditLogEvent[AuditLogEvent["MessageDelete"] = 72] = "MessageDelete";
	    AuditLogEvent[AuditLogEvent["MessageBulkDelete"] = 73] = "MessageBulkDelete";
	    AuditLogEvent[AuditLogEvent["MessagePin"] = 74] = "MessagePin";
	    AuditLogEvent[AuditLogEvent["MessageUnpin"] = 75] = "MessageUnpin";
	    AuditLogEvent[AuditLogEvent["IntegrationCreate"] = 80] = "IntegrationCreate";
	    AuditLogEvent[AuditLogEvent["IntegrationUpdate"] = 81] = "IntegrationUpdate";
	    AuditLogEvent[AuditLogEvent["IntegrationDelete"] = 82] = "IntegrationDelete";
	    AuditLogEvent[AuditLogEvent["StageInstanceCreate"] = 83] = "StageInstanceCreate";
	    AuditLogEvent[AuditLogEvent["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
	    AuditLogEvent[AuditLogEvent["StageInstanceDelete"] = 85] = "StageInstanceDelete";
	    AuditLogEvent[AuditLogEvent["StickerCreate"] = 90] = "StickerCreate";
	    AuditLogEvent[AuditLogEvent["StickerUpdate"] = 91] = "StickerUpdate";
	    AuditLogEvent[AuditLogEvent["StickerDelete"] = 92] = "StickerDelete";
	    AuditLogEvent[AuditLogEvent["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
	    AuditLogEvent[AuditLogEvent["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
	    AuditLogEvent[AuditLogEvent["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
	    AuditLogEvent[AuditLogEvent["ThreadCreate"] = 110] = "ThreadCreate";
	    AuditLogEvent[AuditLogEvent["ThreadUpdate"] = 111] = "ThreadUpdate";
	    AuditLogEvent[AuditLogEvent["ThreadDelete"] = 112] = "ThreadDelete";
	    AuditLogEvent[AuditLogEvent["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
	    AuditLogEvent[AuditLogEvent["SoundboardSoundCreate"] = 130] = "SoundboardSoundCreate";
	    AuditLogEvent[AuditLogEvent["SoundboardSoundUpdate"] = 131] = "SoundboardSoundUpdate";
	    AuditLogEvent[AuditLogEvent["SoundboardSoundDelete"] = 132] = "SoundboardSoundDelete";
	    AuditLogEvent[AuditLogEvent["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
	    AuditLogEvent[AuditLogEvent["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
	    AuditLogEvent[AuditLogEvent["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
	    AuditLogEvent[AuditLogEvent["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
	    AuditLogEvent[AuditLogEvent["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
	    AuditLogEvent[AuditLogEvent["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
	    AuditLogEvent[AuditLogEvent["AutoModerationQuarantineUser"] = 146] = "AutoModerationQuarantineUser";
	    AuditLogEvent[AuditLogEvent["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
	    AuditLogEvent[AuditLogEvent["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
	    AuditLogEvent[AuditLogEvent["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
	    AuditLogEvent[AuditLogEvent["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
	    AuditLogEvent[AuditLogEvent["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
	    AuditLogEvent[AuditLogEvent["OnboardingCreate"] = 166] = "OnboardingCreate";
	    AuditLogEvent[AuditLogEvent["OnboardingUpdate"] = 167] = "OnboardingUpdate";
	    AuditLogEvent[AuditLogEvent["HomeSettingsCreate"] = 190] = "HomeSettingsCreate";
	    AuditLogEvent[AuditLogEvent["HomeSettingsUpdate"] = 191] = "HomeSettingsUpdate";
	})(AuditLogEvent || (auditLog.AuditLogEvent = AuditLogEvent = {}));
	var AuditLogOptionsType;
	(function (AuditLogOptionsType) {
	    AuditLogOptionsType["Role"] = "0";
	    AuditLogOptionsType["Member"] = "1";
	})(AuditLogOptionsType || (auditLog.AuditLogOptionsType = AuditLogOptionsType = {}));
	
	return auditLog;
}

var autoModeration = {};

var hasRequiredAutoModeration;

function requireAutoModeration () {
	if (hasRequiredAutoModeration) return autoModeration;
	hasRequiredAutoModeration = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/auto-moderation
	 */
	Object.defineProperty(autoModeration, "__esModule", { value: true });
	autoModeration.AutoModerationActionType = autoModeration.AutoModerationRuleEventType = autoModeration.AutoModerationRuleKeywordPresetType = autoModeration.AutoModerationRuleTriggerType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types}
	 */
	var AutoModerationRuleTriggerType;
	(function (AutoModerationRuleTriggerType) {
	    /**
	     * Check if content contains words from a user defined list of keywords (Maximum of 6 per guild)
	     */
	    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Keyword"] = 1] = "Keyword";
	    /**
	     * Check if content represents generic spam (Maximum of 1 per guild)
	     */
	    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["Spam"] = 3] = "Spam";
	    /**
	     * Check if content contains words from internal pre-defined wordsets (Maximum of 1 per guild)
	     */
	    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["KeywordPreset"] = 4] = "KeywordPreset";
	    /**
	     * Check if content contains more mentions than allowed (Maximum of 1 per guild)
	     */
	    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MentionSpam"] = 5] = "MentionSpam";
	    /**
	     * Check if member profile contains words from a user defined list of keywords (Maximum of 1 per guild)
	     */
	    AutoModerationRuleTriggerType[AutoModerationRuleTriggerType["MemberProfile"] = 6] = "MemberProfile";
	})(AutoModerationRuleTriggerType || (autoModeration.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types}
	 */
	var AutoModerationRuleKeywordPresetType;
	(function (AutoModerationRuleKeywordPresetType) {
	    /**
	     * Words that may be considered forms of swearing or cursing
	     */
	    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Profanity"] = 1] = "Profanity";
	    /**
	     * Words that refer to sexually explicit behavior or activity
	     */
	    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["SexualContent"] = 2] = "SexualContent";
	    /**
	     * Personal insults or words that may be considered hate speech
	     */
	    AutoModerationRuleKeywordPresetType[AutoModerationRuleKeywordPresetType["Slurs"] = 3] = "Slurs";
	})(AutoModerationRuleKeywordPresetType || (autoModeration.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types}
	 */
	var AutoModerationRuleEventType;
	(function (AutoModerationRuleEventType) {
	    /**
	     * When a member sends or edits a message in the guild
	     */
	    AutoModerationRuleEventType[AutoModerationRuleEventType["MessageSend"] = 1] = "MessageSend";
	    /**
	     * When a member edits their profile
	     */
	    AutoModerationRuleEventType[AutoModerationRuleEventType["MemberUpdate"] = 2] = "MemberUpdate";
	})(AutoModerationRuleEventType || (autoModeration.AutoModerationRuleEventType = AutoModerationRuleEventType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types}
	 */
	var AutoModerationActionType;
	(function (AutoModerationActionType) {
	    /**
	     * Blocks a member's message and prevents it from being posted.
	     * A custom explanation can be specified and shown to members whenever their message is blocked
	     */
	    AutoModerationActionType[AutoModerationActionType["BlockMessage"] = 1] = "BlockMessage";
	    /**
	     * Logs user content to a specified channel
	     */
	    AutoModerationActionType[AutoModerationActionType["SendAlertMessage"] = 2] = "SendAlertMessage";
	    /**
	     * Timeout user for specified duration, this action type can be set if the bot has `MODERATE_MEMBERS` permission
	     */
	    AutoModerationActionType[AutoModerationActionType["Timeout"] = 3] = "Timeout";
	    /**
	     * Prevents a member from using text, voice, or other interactions
	     */
	    AutoModerationActionType[AutoModerationActionType["BlockMemberInteraction"] = 4] = "BlockMemberInteraction";
	})(AutoModerationActionType || (autoModeration.AutoModerationActionType = AutoModerationActionType = {}));
	
	return autoModeration;
}

var channel$1 = {};

var hasRequiredChannel$1;

function requireChannel$1 () {
	if (hasRequiredChannel$1) return channel$1;
	hasRequiredChannel$1 = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/channel
	 */
	Object.defineProperty(channel$1, "__esModule", { value: true });
	channel$1.ChannelFlags = channel$1.ThreadMemberFlags = channel$1.ThreadAutoArchiveDuration = channel$1.OverwriteType = channel$1.VideoQualityMode = channel$1.ChannelType = channel$1.ForumLayoutType = channel$1.SortOrderType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/channel/#channel-object-sort-order-types}
	 */
	var SortOrderType;
	(function (SortOrderType) {
	    /**
	     * Sort forum posts by activity
	     */
	    SortOrderType[SortOrderType["LatestActivity"] = 0] = "LatestActivity";
	    /**
	     * Sort forum posts by creation time (from most recent to oldest)
	     */
	    SortOrderType[SortOrderType["CreationDate"] = 1] = "CreationDate";
	})(SortOrderType || (channel$1.SortOrderType = SortOrderType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/channel/#channel-object-forum-layout-types}
	 */
	var ForumLayoutType;
	(function (ForumLayoutType) {
	    /**
	     * No default has been set for forum channel
	     */
	    ForumLayoutType[ForumLayoutType["NotSet"] = 0] = "NotSet";
	    /**
	     * Display posts as a list
	     */
	    ForumLayoutType[ForumLayoutType["ListView"] = 1] = "ListView";
	    /**
	     * Display posts as a collection of tiles
	     */
	    ForumLayoutType[ForumLayoutType["GalleryView"] = 2] = "GalleryView";
	})(ForumLayoutType || (channel$1.ForumLayoutType = ForumLayoutType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types}
	 */
	var ChannelType;
	(function (ChannelType) {
	    /**
	     * A text channel within a guild
	     */
	    ChannelType[ChannelType["GuildText"] = 0] = "GuildText";
	    /**
	     * A direct message between users
	     */
	    ChannelType[ChannelType["DM"] = 1] = "DM";
	    /**
	     * A voice channel within a guild
	     */
	    ChannelType[ChannelType["GuildVoice"] = 2] = "GuildVoice";
	    /**
	     * A direct message between multiple users
	     */
	    ChannelType[ChannelType["GroupDM"] = 3] = "GroupDM";
	    /**
	     * An organizational category that contains up to 50 channels
	     *
	     * @see {@link https://support.discord.com/hc/articles/115001580171}
	     */
	    ChannelType[ChannelType["GuildCategory"] = 4] = "GuildCategory";
	    /**
	     * A channel that users can follow and crosspost into their own guild
	     *
	     * @see {@link https://support.discord.com/hc/articles/360032008192}
	     */
	    ChannelType[ChannelType["GuildAnnouncement"] = 5] = "GuildAnnouncement";
	    /**
	     * A temporary sub-channel within a Guild Announcement channel
	     */
	    ChannelType[ChannelType["AnnouncementThread"] = 10] = "AnnouncementThread";
	    /**
	     * A temporary sub-channel within a Guild Text or Guild Forum channel
	     */
	    ChannelType[ChannelType["PublicThread"] = 11] = "PublicThread";
	    /**
	     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
	     */
	    ChannelType[ChannelType["PrivateThread"] = 12] = "PrivateThread";
	    /**
	     * A voice channel for hosting events with an audience
	     *
	     * @see {@link https://support.discord.com/hc/articles/1500005513722}
	     */
	    ChannelType[ChannelType["GuildStageVoice"] = 13] = "GuildStageVoice";
	    /**
	     * The channel in a Student Hub containing the listed servers
	     *
	     * @see {@link https://support.discord.com/hc/articles/4406046651927}
	     */
	    ChannelType[ChannelType["GuildDirectory"] = 14] = "GuildDirectory";
	    /**
	     * A channel that can only contain threads
	     */
	    ChannelType[ChannelType["GuildForum"] = 15] = "GuildForum";
	    /**
	     * A channel like forum channels but contains media for server subscriptions
	     *
	     * @see {@link https://creator-support.discord.com/hc/articles/14346342766743}
	     */
	    ChannelType[ChannelType["GuildMedia"] = 16] = "GuildMedia";
	    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
	    /**
	     * A channel that users can follow and crosspost into their own guild
	     *
	     * @deprecated This is the old name for {@link ChannelType.GuildAnnouncement}
	     * @see {@link https://support.discord.com/hc/articles/360032008192}
	     */
	    ChannelType[ChannelType["GuildNews"] = 5] = "GuildNews";
	    /**
	     * A temporary sub-channel within a Guild Announcement channel
	     *
	     * @deprecated This is the old name for {@link ChannelType.AnnouncementThread}
	     */
	    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
	    ChannelType[ChannelType["GuildNewsThread"] = 10] = "GuildNewsThread";
	    /**
	     * A temporary sub-channel within a Guild Text channel
	     *
	     * @deprecated This is the old name for {@link ChannelType.PublicThread}
	     */
	    ChannelType[ChannelType["GuildPublicThread"] = 11] = "GuildPublicThread";
	    /**
	     * A temporary sub-channel within a Guild Text channel that is only viewable by those invited and those with the Manage Threads permission
	     *
	     * @deprecated This is the old name for {@link ChannelType.PrivateThread}
	     */
	    ChannelType[ChannelType["GuildPrivateThread"] = 12] = "GuildPrivateThread";
	})(ChannelType || (channel$1.ChannelType = ChannelType = {}));
	var VideoQualityMode;
	(function (VideoQualityMode) {
	    /**
	     * Discord chooses the quality for optimal performance
	     */
	    VideoQualityMode[VideoQualityMode["Auto"] = 1] = "Auto";
	    /**
	     * 720p
	     */
	    VideoQualityMode[VideoQualityMode["Full"] = 2] = "Full";
	})(VideoQualityMode || (channel$1.VideoQualityMode = VideoQualityMode = {}));
	var OverwriteType;
	(function (OverwriteType) {
	    OverwriteType[OverwriteType["Role"] = 0] = "Role";
	    OverwriteType[OverwriteType["Member"] = 1] = "Member";
	})(OverwriteType || (channel$1.OverwriteType = OverwriteType = {}));
	var ThreadAutoArchiveDuration;
	(function (ThreadAutoArchiveDuration) {
	    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneHour"] = 60] = "OneHour";
	    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneDay"] = 1440] = "OneDay";
	    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["ThreeDays"] = 4320] = "ThreeDays";
	    ThreadAutoArchiveDuration[ThreadAutoArchiveDuration["OneWeek"] = 10080] = "OneWeek";
	})(ThreadAutoArchiveDuration || (channel$1.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration = {}));
	var ThreadMemberFlags;
	(function (ThreadMemberFlags) {
	    /**
	     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ThreadMemberFlags[ThreadMemberFlags["HasInteracted"] = 1] = "HasInteracted";
	    /**
	     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ThreadMemberFlags[ThreadMemberFlags["AllMessages"] = 2] = "AllMessages";
	    /**
	     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ThreadMemberFlags[ThreadMemberFlags["OnlyMentions"] = 4] = "OnlyMentions";
	    /**
	     * @unstable This thread member flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ThreadMemberFlags[ThreadMemberFlags["NoMessages"] = 8] = "NoMessages";
	})(ThreadMemberFlags || (channel$1.ThreadMemberFlags = ThreadMemberFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags}
	 */
	var ChannelFlags;
	(function (ChannelFlags) {
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
	    /**
	     * This thread is pinned to the top of its parent forum channel
	     */
	    ChannelFlags[ChannelFlags["Pinned"] = 2] = "Pinned";
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
	    /**
	     * Whether a tag is required to be specified when creating a thread in a forum channel.
	     * Tags are specified in the `applied_tags` field
	     */
	    ChannelFlags[ChannelFlags["RequireTag"] = 16] = "RequireTag";
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["IsSpam"] = 32] = "IsSpam";
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["ClydeAI"] = 256] = "ClydeAI";
	    /**
	     * @unstable This channel flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ChannelFlags[ChannelFlags["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
	    /**
	     * Whether media download options are hidden.
	     */
	    ChannelFlags[ChannelFlags["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
	})(ChannelFlags || (channel$1.ChannelFlags = ChannelFlags = {}));
	
	return channel$1;
}

var gateway = {};

var hasRequiredGateway;

function requireGateway () {
	if (hasRequiredGateway) return gateway;
	hasRequiredGateway = 1;
	/**
	 * Types extracted from
	 *  - https://discord.com/developers/docs/topics/gateway
	 *  - https://discord.com/developers/docs/topics/gateway-events
	 */
	Object.defineProperty(gateway, "__esModule", { value: true });
	gateway.ActivityFlags = gateway.StatusDisplayType = gateway.ActivityType = gateway.ActivityPlatform = gateway.PresenceUpdateStatus = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types}
	 */
	var PresenceUpdateStatus;
	(function (PresenceUpdateStatus) {
	    PresenceUpdateStatus["Online"] = "online";
	    PresenceUpdateStatus["DoNotDisturb"] = "dnd";
	    PresenceUpdateStatus["Idle"] = "idle";
	    /**
	     * Invisible and shown as offline
	     */
	    PresenceUpdateStatus["Invisible"] = "invisible";
	    PresenceUpdateStatus["Offline"] = "offline";
	})(PresenceUpdateStatus || (gateway.PresenceUpdateStatus = PresenceUpdateStatus = {}));
	/**
	 * @unstable This enum is currently not documented by Discord but has known values which we will try to keep up to date.
	 * Values might be added or removed without a major version bump.
	 */
	var ActivityPlatform;
	(function (ActivityPlatform) {
	    ActivityPlatform["Desktop"] = "desktop";
	    ActivityPlatform["Xbox"] = "xbox";
	    ActivityPlatform["Samsung"] = "samsung";
	    ActivityPlatform["IOS"] = "ios";
	    ActivityPlatform["Android"] = "android";
	    ActivityPlatform["Embedded"] = "embedded";
	    ActivityPlatform["PS4"] = "ps4";
	    ActivityPlatform["PS5"] = "ps5";
	})(ActivityPlatform || (gateway.ActivityPlatform = ActivityPlatform = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types}
	 */
	var ActivityType;
	(function (ActivityType) {
	    /**
	     * Playing \{game\}
	     */
	    ActivityType[ActivityType["Playing"] = 0] = "Playing";
	    /**
	     * Streaming \{details\}
	     */
	    ActivityType[ActivityType["Streaming"] = 1] = "Streaming";
	    /**
	     * Listening to \{name\}
	     */
	    ActivityType[ActivityType["Listening"] = 2] = "Listening";
	    /**
	     * Watching \{details\}
	     */
	    ActivityType[ActivityType["Watching"] = 3] = "Watching";
	    /**
	     * \{emoji\} \{state\}
	     */
	    ActivityType[ActivityType["Custom"] = 4] = "Custom";
	    /**
	     * Competing in \{name\}
	     */
	    ActivityType[ActivityType["Competing"] = 5] = "Competing";
	})(ActivityType || (gateway.ActivityType = ActivityType = {}));
	/**
	 * Controls which field is used in the user's status message
	 *
	 * @see {@link https://discord.com/developers/docs/events/gateway-events#activity-object-status-display-types}
	 */
	var StatusDisplayType;
	(function (StatusDisplayType) {
	    /**
	     * Playing \{name\}
	     */
	    StatusDisplayType[StatusDisplayType["Name"] = 0] = "Name";
	    /**
	     * Playing \{state\}
	     */
	    StatusDisplayType[StatusDisplayType["State"] = 1] = "State";
	    /**
	     * Playing \{details\}
	     */
	    StatusDisplayType[StatusDisplayType["Details"] = 2] = "Details";
	})(StatusDisplayType || (gateway.StatusDisplayType = StatusDisplayType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-flags}
	 */
	var ActivityFlags;
	(function (ActivityFlags) {
	    ActivityFlags[ActivityFlags["Instance"] = 1] = "Instance";
	    ActivityFlags[ActivityFlags["Join"] = 2] = "Join";
	    ActivityFlags[ActivityFlags["Spectate"] = 4] = "Spectate";
	    ActivityFlags[ActivityFlags["JoinRequest"] = 8] = "JoinRequest";
	    ActivityFlags[ActivityFlags["Sync"] = 16] = "Sync";
	    ActivityFlags[ActivityFlags["Play"] = 32] = "Play";
	    ActivityFlags[ActivityFlags["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
	    ActivityFlags[ActivityFlags["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
	    ActivityFlags[ActivityFlags["Embedded"] = 256] = "Embedded";
	})(ActivityFlags || (gateway.ActivityFlags = ActivityFlags = {}));
	
	return gateway;
}

var guild = {};

var hasRequiredGuild;

function requireGuild () {
	if (hasRequiredGuild) return guild;
	hasRequiredGuild = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/guild
	 */
	Object.defineProperty(guild, "__esModule", { value: true });
	guild.GuildOnboardingPromptType = guild.GuildOnboardingMode = guild.MembershipScreeningFieldType = guild.GuildWidgetStyle = guild.IntegrationExpireBehavior = guild.GuildMemberFlags = guild.GuildFeature = guild.GuildSystemChannelFlags = guild.GuildHubType = guild.GuildPremiumTier = guild.GuildVerificationLevel = guild.GuildNSFWLevel = guild.GuildMFALevel = guild.GuildExplicitContentFilter = guild.GuildDefaultMessageNotifications = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level}
	 */
	var GuildDefaultMessageNotifications;
	(function (GuildDefaultMessageNotifications) {
	    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["AllMessages"] = 0] = "AllMessages";
	    GuildDefaultMessageNotifications[GuildDefaultMessageNotifications["OnlyMentions"] = 1] = "OnlyMentions";
	})(GuildDefaultMessageNotifications || (guild.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level}
	 */
	var GuildExplicitContentFilter;
	(function (GuildExplicitContentFilter) {
	    GuildExplicitContentFilter[GuildExplicitContentFilter["Disabled"] = 0] = "Disabled";
	    GuildExplicitContentFilter[GuildExplicitContentFilter["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
	    GuildExplicitContentFilter[GuildExplicitContentFilter["AllMembers"] = 2] = "AllMembers";
	})(GuildExplicitContentFilter || (guild.GuildExplicitContentFilter = GuildExplicitContentFilter = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level}
	 */
	var GuildMFALevel;
	(function (GuildMFALevel) {
	    GuildMFALevel[GuildMFALevel["None"] = 0] = "None";
	    GuildMFALevel[GuildMFALevel["Elevated"] = 1] = "Elevated";
	})(GuildMFALevel || (guild.GuildMFALevel = GuildMFALevel = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level}
	 */
	var GuildNSFWLevel;
	(function (GuildNSFWLevel) {
	    GuildNSFWLevel[GuildNSFWLevel["Default"] = 0] = "Default";
	    GuildNSFWLevel[GuildNSFWLevel["Explicit"] = 1] = "Explicit";
	    GuildNSFWLevel[GuildNSFWLevel["Safe"] = 2] = "Safe";
	    GuildNSFWLevel[GuildNSFWLevel["AgeRestricted"] = 3] = "AgeRestricted";
	})(GuildNSFWLevel || (guild.GuildNSFWLevel = GuildNSFWLevel = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level}
	 */
	var GuildVerificationLevel;
	(function (GuildVerificationLevel) {
	    /**
	     * Unrestricted
	     */
	    GuildVerificationLevel[GuildVerificationLevel["None"] = 0] = "None";
	    /**
	     * Must have verified email on account
	     */
	    GuildVerificationLevel[GuildVerificationLevel["Low"] = 1] = "Low";
	    /**
	     * Must be registered on Discord for longer than 5 minutes
	     */
	    GuildVerificationLevel[GuildVerificationLevel["Medium"] = 2] = "Medium";
	    /**
	     * Must be a member of the guild for longer than 10 minutes
	     */
	    GuildVerificationLevel[GuildVerificationLevel["High"] = 3] = "High";
	    /**
	     * Must have a verified phone number
	     */
	    GuildVerificationLevel[GuildVerificationLevel["VeryHigh"] = 4] = "VeryHigh";
	})(GuildVerificationLevel || (guild.GuildVerificationLevel = GuildVerificationLevel = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier}
	 */
	var GuildPremiumTier;
	(function (GuildPremiumTier) {
	    GuildPremiumTier[GuildPremiumTier["None"] = 0] = "None";
	    GuildPremiumTier[GuildPremiumTier["Tier1"] = 1] = "Tier1";
	    GuildPremiumTier[GuildPremiumTier["Tier2"] = 2] = "Tier2";
	    GuildPremiumTier[GuildPremiumTier["Tier3"] = 3] = "Tier3";
	})(GuildPremiumTier || (guild.GuildPremiumTier = GuildPremiumTier = {}));
	var GuildHubType;
	(function (GuildHubType) {
	    GuildHubType[GuildHubType["Default"] = 0] = "Default";
	    GuildHubType[GuildHubType["HighSchool"] = 1] = "HighSchool";
	    GuildHubType[GuildHubType["College"] = 2] = "College";
	})(GuildHubType || (guild.GuildHubType = GuildHubType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags}
	 */
	var GuildSystemChannelFlags;
	(function (GuildSystemChannelFlags) {
	    /**
	     * Suppress member join notifications
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
	    /**
	     * Suppress server boost notifications
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
	    /**
	     * Suppress server setup tips
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
	    /**
	     * Hide member join sticker reply buttons
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
	    /**
	     * Suppress role subscription purchase and renewal notifications
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
	    /**
	     * Hide role subscription sticker reply buttons
	     */
	    GuildSystemChannelFlags[GuildSystemChannelFlags["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
	})(GuildSystemChannelFlags || (guild.GuildSystemChannelFlags = GuildSystemChannelFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features}
	 */
	var GuildFeature;
	(function (GuildFeature) {
	    /**
	     * Guild has access to set an animated guild banner image
	     */
	    GuildFeature["AnimatedBanner"] = "ANIMATED_BANNER";
	    /**
	     * Guild has access to set an animated guild icon
	     */
	    GuildFeature["AnimatedIcon"] = "ANIMATED_ICON";
	    /**
	     * Guild is using the old permissions configuration behavior
	     *
	     * @see {@link https://discord.com/developers/docs/change-log#upcoming-application-command-permission-changes}
	     */
	    GuildFeature["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
	    /**
	     * Guild has set up auto moderation rules
	     */
	    GuildFeature["AutoModeration"] = "AUTO_MODERATION";
	    /**
	     * Guild has access to set a guild banner image
	     */
	    GuildFeature["Banner"] = "BANNER";
	    /**
	     * Guild can enable welcome screen, Membership Screening and discovery, and receives community updates
	     */
	    GuildFeature["Community"] = "COMMUNITY";
	    /**
	     * Guild has enabled monetization
	     */
	    GuildFeature["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
	    /**
	     * Guild has enabled the role subscription promo page
	     */
	    GuildFeature["CreatorStorePage"] = "CREATOR_STORE_PAGE";
	    /**
	     * Guild has been set as a support server on the App Directory
	     */
	    GuildFeature["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
	    /**
	     * Guild is able to be discovered in the directory
	     */
	    GuildFeature["Discoverable"] = "DISCOVERABLE";
	    /**
	     * Guild is able to be featured in the directory
	     */
	    GuildFeature["Featurable"] = "FEATURABLE";
	    /**
	     * Guild is listed in a directory channel
	     */
	    GuildFeature["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
	    /**
	     * Guild is a Student Hub
	     *
	     * @see {@link https://support.discord.com/hc/articles/4406046651927}
	     * @unstable This feature is currently not documented by Discord, but has known value
	     */
	    GuildFeature["Hub"] = "HUB";
	    /**
	     * Guild has disabled invite usage, preventing users from joining
	     */
	    GuildFeature["InvitesDisabled"] = "INVITES_DISABLED";
	    /**
	     * Guild has access to set an invite splash background
	     */
	    GuildFeature["InviteSplash"] = "INVITE_SPLASH";
	    /**
	     * Guild is in a Student Hub
	     *
	     * @see {@link https://support.discord.com/hc/articles/4406046651927}
	     * @unstable This feature is currently not documented by Discord, but has known value
	     */
	    GuildFeature["LinkedToHub"] = "LINKED_TO_HUB";
	    /**
	     * Guild has enabled Membership Screening
	     */
	    GuildFeature["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
	    /**
	     * Guild has increased custom soundboard sound slots
	     */
	    GuildFeature["MoreSoundboard"] = "MORE_SOUNDBOARD";
	    /**
	     * Guild has enabled monetization
	     *
	     * @unstable This feature is no longer documented by Discord
	     */
	    GuildFeature["MonetizationEnabled"] = "MONETIZATION_ENABLED";
	    /**
	     * Guild has increased custom sticker slots
	     */
	    GuildFeature["MoreStickers"] = "MORE_STICKERS";
	    /**
	     * Guild has access to create news channels
	     */
	    GuildFeature["News"] = "NEWS";
	    /**
	     * Guild is partnered
	     */
	    GuildFeature["Partnered"] = "PARTNERED";
	    /**
	     * Guild can be previewed before joining via Membership Screening or the directory
	     */
	    GuildFeature["PreviewEnabled"] = "PREVIEW_ENABLED";
	    /**
	     * Guild has access to create private threads
	     */
	    GuildFeature["PrivateThreads"] = "PRIVATE_THREADS";
	    /**
	     * Guild has disabled alerts for join raids in the configured safety alerts channel
	     */
	    GuildFeature["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
	    GuildFeature["RelayEnabled"] = "RELAY_ENABLED";
	    /**
	     * Guild is able to set role icons
	     */
	    GuildFeature["RoleIcons"] = "ROLE_ICONS";
	    /**
	     * Guild has role subscriptions that can be purchased
	     */
	    GuildFeature["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
	    /**
	     * Guild has enabled role subscriptions
	     */
	    GuildFeature["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
	    /**
	     * Guild has created soundboard sounds
	     */
	    GuildFeature["Soundboard"] = "SOUNDBOARD";
	    /**
	     * Guild has enabled ticketed events
	     */
	    GuildFeature["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
	    /**
	     * Guild has access to set a vanity URL
	     */
	    GuildFeature["VanityURL"] = "VANITY_URL";
	    /**
	     * Guild is verified
	     */
	    GuildFeature["Verified"] = "VERIFIED";
	    /**
	     * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
	     */
	    GuildFeature["VIPRegions"] = "VIP_REGIONS";
	    /**
	     * Guild has enabled the welcome screen
	     */
	    GuildFeature["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
	    /**
	     * Guild has access to set guild tags
	     */
	    GuildFeature["GuildTags"] = "GUILD_TAGS";
	    /**
	     * Guild is able to set gradient colors to roles
	     */
	    GuildFeature["EnhancedRoleColors"] = "ENHANCED_ROLE_COLORS";
	    /**
	     * Guild has access to guest invites
	     */
	    GuildFeature["GuestsEnabled"] = "GUESTS_ENABLED";
	})(GuildFeature || (guild.GuildFeature = GuildFeature = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags}
	 */
	var GuildMemberFlags;
	(function (GuildMemberFlags) {
	    /**
	     * Member has left and rejoined the guild
	     */
	    GuildMemberFlags[GuildMemberFlags["DidRejoin"] = 1] = "DidRejoin";
	    /**
	     * Member has completed onboarding
	     */
	    GuildMemberFlags[GuildMemberFlags["CompletedOnboarding"] = 2] = "CompletedOnboarding";
	    /**
	     * Member is exempt from guild verification requirements
	     */
	    GuildMemberFlags[GuildMemberFlags["BypassesVerification"] = 4] = "BypassesVerification";
	    /**
	     * Member has started onboarding
	     */
	    GuildMemberFlags[GuildMemberFlags["StartedOnboarding"] = 8] = "StartedOnboarding";
	    /**
	     * Member is a guest and can only access the voice channel they were invited to
	     */
	    GuildMemberFlags[GuildMemberFlags["IsGuest"] = 16] = "IsGuest";
	    /**
	     * Member has started Server Guide new member actions
	     */
	    GuildMemberFlags[GuildMemberFlags["StartedHomeActions"] = 32] = "StartedHomeActions";
	    /**
	     * Member has completed Server Guide new member actions
	     */
	    GuildMemberFlags[GuildMemberFlags["CompletedHomeActions"] = 64] = "CompletedHomeActions";
	    /**
	     * Member's username, display name, or nickname is blocked by AutoMod
	     */
	    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
	    /**
	     * @deprecated
	     * {@link https://github.com/discord/discord-api-docs/pull/7113 | discord-api-docs#7113}
	     */
	    GuildMemberFlags[GuildMemberFlags["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
	    /**
	     * Member has dismissed the DM settings upsell
	     */
	    GuildMemberFlags[GuildMemberFlags["DmSettingsUpsellAcknowledged"] = 512] = "DmSettingsUpsellAcknowledged";
	    /**
	     * Member's guild tag is blocked by AutoMod
	     */
	    GuildMemberFlags[GuildMemberFlags["AutoModQuarantinedGuildTag"] = 1024] = "AutoModQuarantinedGuildTag";
	})(GuildMemberFlags || (guild.GuildMemberFlags = GuildMemberFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors}
	 */
	var IntegrationExpireBehavior;
	(function (IntegrationExpireBehavior) {
	    IntegrationExpireBehavior[IntegrationExpireBehavior["RemoveRole"] = 0] = "RemoveRole";
	    IntegrationExpireBehavior[IntegrationExpireBehavior["Kick"] = 1] = "Kick";
	})(IntegrationExpireBehavior || (guild.IntegrationExpireBehavior = IntegrationExpireBehavior = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options}
	 */
	var GuildWidgetStyle;
	(function (GuildWidgetStyle) {
	    /**
	     * Shield style widget with Discord icon and guild members online count
	     */
	    GuildWidgetStyle["Shield"] = "shield";
	    /**
	     * Large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
	     */
	    GuildWidgetStyle["Banner1"] = "banner1";
	    /**
	     * Smaller widget style with guild icon, name and online count. Split on the right with Discord logo
	     */
	    GuildWidgetStyle["Banner2"] = "banner2";
	    /**
	     * Large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
	     */
	    GuildWidgetStyle["Banner3"] = "banner3";
	    /**
	     * Large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget
	     * and a "JOIN MY SERVER" button at the bottom
	     */
	    GuildWidgetStyle["Banner4"] = "banner4";
	})(GuildWidgetStyle || (guild.GuildWidgetStyle = GuildWidgetStyle = {}));
	/**
	 * @unstable https://github.com/discord/discord-api-docs/pull/2547
	 */
	var MembershipScreeningFieldType;
	(function (MembershipScreeningFieldType) {
	    /**
	     * Server Rules
	     */
	    MembershipScreeningFieldType["Terms"] = "TERMS";
	})(MembershipScreeningFieldType || (guild.MembershipScreeningFieldType = MembershipScreeningFieldType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-mode}
	 */
	var GuildOnboardingMode;
	(function (GuildOnboardingMode) {
	    /**
	     * Counts only Default Channels towards constraints
	     */
	    GuildOnboardingMode[GuildOnboardingMode["OnboardingDefault"] = 0] = "OnboardingDefault";
	    /**
	     * Counts Default Channels and Questions towards constraints
	     */
	    GuildOnboardingMode[GuildOnboardingMode["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
	})(GuildOnboardingMode || (guild.GuildOnboardingMode = GuildOnboardingMode = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types}
	 */
	var GuildOnboardingPromptType;
	(function (GuildOnboardingPromptType) {
	    GuildOnboardingPromptType[GuildOnboardingPromptType["MultipleChoice"] = 0] = "MultipleChoice";
	    GuildOnboardingPromptType[GuildOnboardingPromptType["Dropdown"] = 1] = "Dropdown";
	})(GuildOnboardingPromptType || (guild.GuildOnboardingPromptType = GuildOnboardingPromptType = {}));
	
	return guild;
}

var guildScheduledEvent = {};

var hasRequiredGuildScheduledEvent;

function requireGuildScheduledEvent () {
	if (hasRequiredGuildScheduledEvent) return guildScheduledEvent;
	hasRequiredGuildScheduledEvent = 1;
	Object.defineProperty(guildScheduledEvent, "__esModule", { value: true });
	guildScheduledEvent.GuildScheduledEventPrivacyLevel = guildScheduledEvent.GuildScheduledEventStatus = guildScheduledEvent.GuildScheduledEventEntityType = guildScheduledEvent.GuildScheduledEventRecurrenceRuleMonth = guildScheduledEvent.GuildScheduledEventRecurrenceRuleWeekday = guildScheduledEvent.GuildScheduledEventRecurrenceRuleFrequency = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-frequency}
	 */
	var GuildScheduledEventRecurrenceRuleFrequency;
	(function (GuildScheduledEventRecurrenceRuleFrequency) {
	    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Yearly"] = 0] = "Yearly";
	    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Monthly"] = 1] = "Monthly";
	    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Weekly"] = 2] = "Weekly";
	    GuildScheduledEventRecurrenceRuleFrequency[GuildScheduledEventRecurrenceRuleFrequency["Daily"] = 3] = "Daily";
	})(GuildScheduledEventRecurrenceRuleFrequency || (guildScheduledEvent.GuildScheduledEventRecurrenceRuleFrequency = GuildScheduledEventRecurrenceRuleFrequency = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-weekday}
	 */
	var GuildScheduledEventRecurrenceRuleWeekday;
	(function (GuildScheduledEventRecurrenceRuleWeekday) {
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Monday"] = 0] = "Monday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Tuesday"] = 1] = "Tuesday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Wednesday"] = 2] = "Wednesday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Thursday"] = 3] = "Thursday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Friday"] = 4] = "Friday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Saturday"] = 5] = "Saturday";
	    GuildScheduledEventRecurrenceRuleWeekday[GuildScheduledEventRecurrenceRuleWeekday["Sunday"] = 6] = "Sunday";
	})(GuildScheduledEventRecurrenceRuleWeekday || (guildScheduledEvent.GuildScheduledEventRecurrenceRuleWeekday = GuildScheduledEventRecurrenceRuleWeekday = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-month}
	 */
	var GuildScheduledEventRecurrenceRuleMonth;
	(function (GuildScheduledEventRecurrenceRuleMonth) {
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["January"] = 1] = "January";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["February"] = 2] = "February";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["March"] = 3] = "March";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["April"] = 4] = "April";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["May"] = 5] = "May";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["June"] = 6] = "June";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["July"] = 7] = "July";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["August"] = 8] = "August";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["September"] = 9] = "September";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["October"] = 10] = "October";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["November"] = 11] = "November";
	    GuildScheduledEventRecurrenceRuleMonth[GuildScheduledEventRecurrenceRuleMonth["December"] = 12] = "December";
	})(GuildScheduledEventRecurrenceRuleMonth || (guildScheduledEvent.GuildScheduledEventRecurrenceRuleMonth = GuildScheduledEventRecurrenceRuleMonth = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types}
	 */
	var GuildScheduledEventEntityType;
	(function (GuildScheduledEventEntityType) {
	    GuildScheduledEventEntityType[GuildScheduledEventEntityType["StageInstance"] = 1] = "StageInstance";
	    GuildScheduledEventEntityType[GuildScheduledEventEntityType["Voice"] = 2] = "Voice";
	    GuildScheduledEventEntityType[GuildScheduledEventEntityType["External"] = 3] = "External";
	})(GuildScheduledEventEntityType || (guildScheduledEvent.GuildScheduledEventEntityType = GuildScheduledEventEntityType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status}
	 */
	var GuildScheduledEventStatus;
	(function (GuildScheduledEventStatus) {
	    GuildScheduledEventStatus[GuildScheduledEventStatus["Scheduled"] = 1] = "Scheduled";
	    GuildScheduledEventStatus[GuildScheduledEventStatus["Active"] = 2] = "Active";
	    GuildScheduledEventStatus[GuildScheduledEventStatus["Completed"] = 3] = "Completed";
	    GuildScheduledEventStatus[GuildScheduledEventStatus["Canceled"] = 4] = "Canceled";
	})(GuildScheduledEventStatus || (guildScheduledEvent.GuildScheduledEventStatus = GuildScheduledEventStatus = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level}
	 */
	var GuildScheduledEventPrivacyLevel;
	(function (GuildScheduledEventPrivacyLevel) {
	    /**
	     * The scheduled event is only accessible to guild members
	     */
	    GuildScheduledEventPrivacyLevel[GuildScheduledEventPrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
	})(GuildScheduledEventPrivacyLevel || (guildScheduledEvent.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel = {}));
	
	return guildScheduledEvent;
}

var interactions = {};

var applicationCommands = {};

var chatInput = {};

var shared = {};

var hasRequiredShared;

function requireShared () {
	if (hasRequiredShared) return shared;
	hasRequiredShared = 1;
	Object.defineProperty(shared, "__esModule", { value: true });
	shared.ApplicationCommandOptionType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
	 */
	var ApplicationCommandOptionType;
	(function (ApplicationCommandOptionType) {
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Subcommand"] = 1] = "Subcommand";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["SubcommandGroup"] = 2] = "SubcommandGroup";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["String"] = 3] = "String";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Integer"] = 4] = "Integer";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Boolean"] = 5] = "Boolean";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["User"] = 6] = "User";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Channel"] = 7] = "Channel";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Role"] = 8] = "Role";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Mentionable"] = 9] = "Mentionable";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Number"] = 10] = "Number";
	    ApplicationCommandOptionType[ApplicationCommandOptionType["Attachment"] = 11] = "Attachment";
	})(ApplicationCommandOptionType || (shared.ApplicationCommandOptionType = ApplicationCommandOptionType = {}));
	
	return shared;
}

var hasRequiredChatInput;

function requireChatInput () {
	if (hasRequiredChatInput) return chatInput;
	hasRequiredChatInput = 1;
	(function (exports) {
		var __createBinding = (chatInput && chatInput.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (chatInput && chatInput.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(requireShared(), exports);
		
	} (chatInput));
	return chatInput;
}

var permissions$1 = {};

var hasRequiredPermissions$1;

function requirePermissions$1 () {
	if (hasRequiredPermissions$1) return permissions$1;
	hasRequiredPermissions$1 = 1;
	Object.defineProperty(permissions$1, "__esModule", { value: true });
	permissions$1.APIApplicationCommandPermissionsConstant = permissions$1.ApplicationCommandPermissionType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type}
	 */
	var ApplicationCommandPermissionType;
	(function (ApplicationCommandPermissionType) {
	    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Role"] = 1] = "Role";
	    ApplicationCommandPermissionType[ApplicationCommandPermissionType["User"] = 2] = "User";
	    ApplicationCommandPermissionType[ApplicationCommandPermissionType["Channel"] = 3] = "Channel";
	})(ApplicationCommandPermissionType || (permissions$1.ApplicationCommandPermissionType = ApplicationCommandPermissionType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants}
	 */
	permissions$1.APIApplicationCommandPermissionsConstant = {
	    // eslint-disable-next-line unicorn/prefer-native-coercion-functions
	    Everyone: (guildId) => String(guildId),
	    AllChannels: (guildId) => String(BigInt(guildId) - 1n),
	};
	
	return permissions$1;
}

var hasRequiredApplicationCommands;

function requireApplicationCommands () {
	if (hasRequiredApplicationCommands) return applicationCommands;
	hasRequiredApplicationCommands = 1;
	(function (exports) {
		var __createBinding = (applicationCommands && applicationCommands.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (applicationCommands && applicationCommands.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.EntryPointCommandHandlerType = exports.InteractionContextType = exports.ApplicationIntegrationType = exports.ApplicationCommandType = void 0;
		__exportStar(requireChatInput(), exports);
		__exportStar(requirePermissions$1(), exports);
		/**
		 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
		 */
		var ApplicationCommandType;
		(function (ApplicationCommandType) {
		    /**
		     * Slash commands; a text-based command that shows up when a user types `/`
		     */
		    ApplicationCommandType[ApplicationCommandType["ChatInput"] = 1] = "ChatInput";
		    /**
		     * A UI-based command that shows up when you right click or tap on a user
		     */
		    ApplicationCommandType[ApplicationCommandType["User"] = 2] = "User";
		    /**
		     * A UI-based command that shows up when you right click or tap on a message
		     */
		    ApplicationCommandType[ApplicationCommandType["Message"] = 3] = "Message";
		    /**
		     * A UI-based command that represents the primary way to invoke an app's Activity
		     */
		    ApplicationCommandType[ApplicationCommandType["PrimaryEntryPoint"] = 4] = "PrimaryEntryPoint";
		})(ApplicationCommandType || (exports.ApplicationCommandType = ApplicationCommandType = {}));
		/**
		 * @see {@link https://discord.com/developers/docs/resources/application#application-object-application-integration-types}
		 */
		var ApplicationIntegrationType;
		(function (ApplicationIntegrationType) {
		    /**
		     * App is installable to servers
		     */
		    ApplicationIntegrationType[ApplicationIntegrationType["GuildInstall"] = 0] = "GuildInstall";
		    /**
		     * App is installable to users
		     */
		    ApplicationIntegrationType[ApplicationIntegrationType["UserInstall"] = 1] = "UserInstall";
		})(ApplicationIntegrationType || (exports.ApplicationIntegrationType = ApplicationIntegrationType = {}));
		/**
		 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types}
		 */
		var InteractionContextType;
		(function (InteractionContextType) {
		    /**
		     * Interaction can be used within servers
		     */
		    InteractionContextType[InteractionContextType["Guild"] = 0] = "Guild";
		    /**
		     * Interaction can be used within DMs with the app's bot user
		     */
		    InteractionContextType[InteractionContextType["BotDM"] = 1] = "BotDM";
		    /**
		     * Interaction can be used within Group DMs and DMs other than the app's bot user
		     */
		    InteractionContextType[InteractionContextType["PrivateChannel"] = 2] = "PrivateChannel";
		})(InteractionContextType || (exports.InteractionContextType = InteractionContextType = {}));
		/**
		 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-entry-point-command-handler-types}
		 */
		var EntryPointCommandHandlerType;
		(function (EntryPointCommandHandlerType) {
		    /**
		     * The app handles the interaction using an interaction token
		     */
		    EntryPointCommandHandlerType[EntryPointCommandHandlerType["AppHandler"] = 1] = "AppHandler";
		    /**
		     * Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with
		     * the app
		     */
		    EntryPointCommandHandlerType[EntryPointCommandHandlerType["DiscordLaunchActivity"] = 2] = "DiscordLaunchActivity";
		})(EntryPointCommandHandlerType || (exports.EntryPointCommandHandlerType = EntryPointCommandHandlerType = {}));
		
	} (applicationCommands));
	return applicationCommands;
}

var responses = {};

var hasRequiredResponses;

function requireResponses () {
	if (hasRequiredResponses) return responses;
	hasRequiredResponses = 1;
	Object.defineProperty(responses, "__esModule", { value: true });
	responses.InteractionResponseType = responses.InteractionType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type}
	 */
	var InteractionType;
	(function (InteractionType) {
	    InteractionType[InteractionType["Ping"] = 1] = "Ping";
	    InteractionType[InteractionType["ApplicationCommand"] = 2] = "ApplicationCommand";
	    InteractionType[InteractionType["MessageComponent"] = 3] = "MessageComponent";
	    InteractionType[InteractionType["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
	    InteractionType[InteractionType["ModalSubmit"] = 5] = "ModalSubmit";
	})(InteractionType || (responses.InteractionType = InteractionType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type}
	 */
	var InteractionResponseType;
	(function (InteractionResponseType) {
	    /**
	     * ACK a `Ping`
	     */
	    InteractionResponseType[InteractionResponseType["Pong"] = 1] = "Pong";
	    /**
	     * Respond to an interaction with a message
	     */
	    InteractionResponseType[InteractionResponseType["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
	    /**
	     * ACK an interaction and edit to a response later, the user sees a loading state
	     */
	    InteractionResponseType[InteractionResponseType["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
	    /**
	     * ACK a button interaction and update it to a loading state
	     */
	    InteractionResponseType[InteractionResponseType["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
	    /**
	     * ACK a button interaction and edit the message to which the button was attached
	     */
	    InteractionResponseType[InteractionResponseType["UpdateMessage"] = 7] = "UpdateMessage";
	    /**
	     * For autocomplete interactions
	     */
	    InteractionResponseType[InteractionResponseType["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
	    /**
	     * Respond to an interaction with an modal for a user to fill-out
	     */
	    InteractionResponseType[InteractionResponseType["Modal"] = 9] = "Modal";
	    /**
	     * Respond to an interaction with an upgrade button, only available for apps with monetization enabled
	     *
	     * @deprecated Send a button with Premium type instead.
	     * {@link https://discord.com/developers/docs/change-log#premium-apps-new-premium-button-style-deep-linking-url-schemes | Learn more here}
	     */
	    InteractionResponseType[InteractionResponseType["PremiumRequired"] = 10] = "PremiumRequired";
	    /**
	     * Launch the Activity associated with the app.
	     *
	     * @remarks
	     * Only available for apps with Activities enabled
	     */
	    InteractionResponseType[InteractionResponseType["LaunchActivity"] = 12] = "LaunchActivity";
	})(InteractionResponseType || (responses.InteractionResponseType = InteractionResponseType = {}));
	
	return responses;
}

var hasRequiredInteractions;

function requireInteractions () {
	if (hasRequiredInteractions) return interactions;
	hasRequiredInteractions = 1;
	(function (exports) {
		var __createBinding = (interactions && interactions.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (interactions && interactions.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(requireApplicationCommands(), exports);
		__exportStar(requireResponses(), exports);
		
	} (interactions));
	return interactions;
}

var invite = {};

var hasRequiredInvite;

function requireInvite () {
	if (hasRequiredInvite) return invite;
	hasRequiredInvite = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/invite
	 */
	Object.defineProperty(invite, "__esModule", { value: true });
	invite.InviteTargetType = invite.InviteType = invite.InviteFlags = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-guild-invite-flags}
	 */
	var InviteFlags;
	(function (InviteFlags) {
	    InviteFlags[InviteFlags["IsGuestInvite"] = 1] = "IsGuestInvite";
	})(InviteFlags || (invite.InviteFlags = InviteFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-types}
	 */
	var InviteType;
	(function (InviteType) {
	    InviteType[InviteType["Guild"] = 0] = "Guild";
	    InviteType[InviteType["GroupDM"] = 1] = "GroupDM";
	    InviteType[InviteType["Friend"] = 2] = "Friend";
	})(InviteType || (invite.InviteType = InviteType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types}
	 */
	var InviteTargetType;
	(function (InviteTargetType) {
	    InviteTargetType[InviteTargetType["Stream"] = 1] = "Stream";
	    InviteTargetType[InviteTargetType["EmbeddedApplication"] = 2] = "EmbeddedApplication";
	})(InviteTargetType || (invite.InviteTargetType = InviteTargetType = {}));
	
	return invite;
}

var message = {};

var hasRequiredMessage;

function requireMessage () {
	if (hasRequiredMessage) return message;
	hasRequiredMessage = 1;
	// Types extracted from https://discord.com/developers/docs/resources/message.
	Object.defineProperty(message, "__esModule", { value: true });
	message.SeparatorSpacingSize = message.UnfurledMediaItemLoadingState = message.SelectMenuDefaultValueType = message.TextInputStyle = message.ButtonStyle = message.ComponentType = message.AllowedMentionsTypes = message.AttachmentFlags = message.EmbedType = message.MessageFlags = message.MessageReferenceType = message.MessageActivityType = message.MessageType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-types}
	 */
	var MessageType;
	(function (MessageType) {
	    MessageType[MessageType["Default"] = 0] = "Default";
	    MessageType[MessageType["RecipientAdd"] = 1] = "RecipientAdd";
	    MessageType[MessageType["RecipientRemove"] = 2] = "RecipientRemove";
	    MessageType[MessageType["Call"] = 3] = "Call";
	    MessageType[MessageType["ChannelNameChange"] = 4] = "ChannelNameChange";
	    MessageType[MessageType["ChannelIconChange"] = 5] = "ChannelIconChange";
	    MessageType[MessageType["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
	    MessageType[MessageType["UserJoin"] = 7] = "UserJoin";
	    MessageType[MessageType["GuildBoost"] = 8] = "GuildBoost";
	    MessageType[MessageType["GuildBoostTier1"] = 9] = "GuildBoostTier1";
	    MessageType[MessageType["GuildBoostTier2"] = 10] = "GuildBoostTier2";
	    MessageType[MessageType["GuildBoostTier3"] = 11] = "GuildBoostTier3";
	    MessageType[MessageType["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
	    MessageType[MessageType["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
	    MessageType[MessageType["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
	    MessageType[MessageType["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
	    MessageType[MessageType["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
	    MessageType[MessageType["ThreadCreated"] = 18] = "ThreadCreated";
	    MessageType[MessageType["Reply"] = 19] = "Reply";
	    MessageType[MessageType["ChatInputCommand"] = 20] = "ChatInputCommand";
	    MessageType[MessageType["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
	    MessageType[MessageType["GuildInviteReminder"] = 22] = "GuildInviteReminder";
	    MessageType[MessageType["ContextMenuCommand"] = 23] = "ContextMenuCommand";
	    MessageType[MessageType["AutoModerationAction"] = 24] = "AutoModerationAction";
	    MessageType[MessageType["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
	    MessageType[MessageType["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
	    MessageType[MessageType["StageStart"] = 27] = "StageStart";
	    MessageType[MessageType["StageEnd"] = 28] = "StageEnd";
	    MessageType[MessageType["StageSpeaker"] = 29] = "StageSpeaker";
	    /**
	     * @unstable https://github.com/discord/discord-api-docs/pull/5927#discussion_r1107678548
	     */
	    MessageType[MessageType["StageRaiseHand"] = 30] = "StageRaiseHand";
	    MessageType[MessageType["StageTopic"] = 31] = "StageTopic";
	    MessageType[MessageType["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
	    MessageType[MessageType["GuildIncidentAlertModeEnabled"] = 36] = "GuildIncidentAlertModeEnabled";
	    MessageType[MessageType["GuildIncidentAlertModeDisabled"] = 37] = "GuildIncidentAlertModeDisabled";
	    MessageType[MessageType["GuildIncidentReportRaid"] = 38] = "GuildIncidentReportRaid";
	    MessageType[MessageType["GuildIncidentReportFalseAlarm"] = 39] = "GuildIncidentReportFalseAlarm";
	    MessageType[MessageType["PurchaseNotification"] = 44] = "PurchaseNotification";
	    MessageType[MessageType["PollResult"] = 46] = "PollResult";
	})(MessageType || (message.MessageType = MessageType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-activity-types}
	 */
	var MessageActivityType;
	(function (MessageActivityType) {
	    MessageActivityType[MessageActivityType["Join"] = 1] = "Join";
	    MessageActivityType[MessageActivityType["Spectate"] = 2] = "Spectate";
	    MessageActivityType[MessageActivityType["Listen"] = 3] = "Listen";
	    MessageActivityType[MessageActivityType["JoinRequest"] = 5] = "JoinRequest";
	})(MessageActivityType || (message.MessageActivityType = MessageActivityType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#message-reference-types}
	 */
	var MessageReferenceType;
	(function (MessageReferenceType) {
	    /**
	     * A standard reference used by replies
	     */
	    MessageReferenceType[MessageReferenceType["Default"] = 0] = "Default";
	    /**
	     * Reference used to point to a message at a point in time
	     */
	    MessageReferenceType[MessageReferenceType["Forward"] = 1] = "Forward";
	})(MessageReferenceType || (message.MessageReferenceType = MessageReferenceType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#message-object-message-flags}
	 */
	var MessageFlags;
	(function (MessageFlags) {
	    /**
	     * This message has been published to subscribed channels (via Channel Following)
	     */
	    MessageFlags[MessageFlags["Crossposted"] = 1] = "Crossposted";
	    /**
	     * This message originated from a message in another channel (via Channel Following)
	     */
	    MessageFlags[MessageFlags["IsCrosspost"] = 2] = "IsCrosspost";
	    /**
	     * Do not include any embeds when serializing this message
	     */
	    MessageFlags[MessageFlags["SuppressEmbeds"] = 4] = "SuppressEmbeds";
	    /**
	     * The source message for this crosspost has been deleted (via Channel Following)
	     */
	    MessageFlags[MessageFlags["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
	    /**
	     * This message came from the urgent message system
	     */
	    MessageFlags[MessageFlags["Urgent"] = 16] = "Urgent";
	    /**
	     * This message has an associated thread, which shares its id
	     */
	    MessageFlags[MessageFlags["HasThread"] = 32] = "HasThread";
	    /**
	     * This message is only visible to the user who invoked the Interaction
	     */
	    MessageFlags[MessageFlags["Ephemeral"] = 64] = "Ephemeral";
	    /**
	     * This message is an Interaction Response and the bot is "thinking"
	     */
	    MessageFlags[MessageFlags["Loading"] = 128] = "Loading";
	    /**
	     * This message failed to mention some roles and add their members to the thread
	     */
	    MessageFlags[MessageFlags["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
	    /**
	     * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    MessageFlags[MessageFlags["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
	    /**
	     * This message will not trigger push and desktop notifications
	     */
	    MessageFlags[MessageFlags["SuppressNotifications"] = 4096] = "SuppressNotifications";
	    /**
	     * This message is a voice message
	     */
	    MessageFlags[MessageFlags["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
	    /**
	     * This message has a snapshot (via Message Forwarding)
	     */
	    MessageFlags[MessageFlags["HasSnapshot"] = 16384] = "HasSnapshot";
	    /**
	     * Allows you to create fully component-driven messages
	     *
	     * @see {@link https://discord.com/developers/docs/components/overview}
	     */
	    MessageFlags[MessageFlags["IsComponentsV2"] = 32768] = "IsComponentsV2";
	})(MessageFlags || (message.MessageFlags = MessageFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#embed-object-embed-types}
	 */
	var EmbedType;
	(function (EmbedType) {
	    /**
	     * Generic embed rendered from embed attributes
	     */
	    EmbedType["Rich"] = "rich";
	    /**
	     * Image embed
	     */
	    EmbedType["Image"] = "image";
	    /**
	     * Video embed
	     */
	    EmbedType["Video"] = "video";
	    /**
	     * Animated gif image embed rendered as a video embed
	     */
	    EmbedType["GIFV"] = "gifv";
	    /**
	     * Article embed
	     */
	    EmbedType["Article"] = "article";
	    /**
	     * Link embed
	     */
	    EmbedType["Link"] = "link";
	    /**
	     * Auto moderation alert embed
	     *
	     * @unstable This embed type is currently not documented by Discord, but it is returned in the auto moderation system messages.
	     */
	    EmbedType["AutoModerationMessage"] = "auto_moderation_message";
	    /**
	     * Poll result embed
	     */
	    EmbedType["PollResult"] = "poll_result";
	})(EmbedType || (message.EmbedType = EmbedType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure-attachment-flags}
	 */
	var AttachmentFlags;
	(function (AttachmentFlags) {
	    /**
	     * This attachment has been edited using the remix feature on mobile
	     */
	    AttachmentFlags[AttachmentFlags["IsRemix"] = 4] = "IsRemix";
	})(AttachmentFlags || (message.AttachmentFlags = AttachmentFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types}
	 */
	var AllowedMentionsTypes;
	(function (AllowedMentionsTypes) {
	    /**
	     * Controls `@everyone` and `@here` mentions
	     */
	    AllowedMentionsTypes["Everyone"] = "everyone";
	    /**
	     * Controls role mentions
	     */
	    AllowedMentionsTypes["Role"] = "roles";
	    /**
	     * Controls user mentions
	     */
	    AllowedMentionsTypes["User"] = "users";
	})(AllowedMentionsTypes || (message.AllowedMentionsTypes = AllowedMentionsTypes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/components/reference#component-object-component-types}
	 */
	var ComponentType;
	(function (ComponentType) {
	    /**
	     * Container to display a row of interactive components
	     */
	    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
	    /**
	     * Button component
	     */
	    ComponentType[ComponentType["Button"] = 2] = "Button";
	    /**
	     * Select menu for picking from defined text options
	     */
	    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
	    /**
	     * Text Input component
	     */
	    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
	    /**
	     * Select menu for users
	     */
	    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
	    /**
	     * Select menu for roles
	     */
	    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
	    /**
	     * Select menu for users and roles
	     */
	    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
	    /**
	     * Select menu for channels
	     */
	    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
	    /**
	     * Container to display text alongside an accessory component
	     */
	    ComponentType[ComponentType["Section"] = 9] = "Section";
	    /**
	     * Markdown text
	     */
	    ComponentType[ComponentType["TextDisplay"] = 10] = "TextDisplay";
	    /**
	     * Small image that can be used as an accessory
	     */
	    ComponentType[ComponentType["Thumbnail"] = 11] = "Thumbnail";
	    /**
	     * Display images and other media
	     */
	    ComponentType[ComponentType["MediaGallery"] = 12] = "MediaGallery";
	    /**
	     * Displays an attached file
	     */
	    ComponentType[ComponentType["File"] = 13] = "File";
	    /**
	     * Component to add vertical padding between other components
	     */
	    ComponentType[ComponentType["Separator"] = 14] = "Separator";
	    /**
	     * @unstable This component type is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    ComponentType[ComponentType["ContentInventoryEntry"] = 16] = "ContentInventoryEntry";
	    /**
	     * Container that visually groups a set of components
	     */
	    ComponentType[ComponentType["Container"] = 17] = "Container";
	    /**
	     * Container associating a label and description with a component
	     */
	    ComponentType[ComponentType["Label"] = 18] = "Label";
	    /**
	     * Component for uploading files
	     */
	    ComponentType[ComponentType["FileUpload"] = 19] = "FileUpload";
	    // EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //
	    /**
	     * Select menu for picking from defined text options
	     *
	     * @deprecated This is the old name for {@link ComponentType.StringSelect}
	     */
	    ComponentType[ComponentType["SelectMenu"] = 3] = "SelectMenu";
	})(ComponentType || (message.ComponentType = ComponentType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/components/reference#button-button-styles}
	 */
	var ButtonStyle;
	(function (ButtonStyle) {
	    /**
	     * The most important or recommended action in a group of options
	     */
	    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
	    /**
	     * Alternative or supporting actions
	     */
	    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
	    /**
	     * Positive confirmation or completion actions
	     */
	    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
	    /**
	     * An action with irreversible consequences
	     */
	    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
	    /**
	     * Navigates to a URL
	     */
	    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
	    /**
	     * Purchase
	     */
	    ButtonStyle[ButtonStyle["Premium"] = 6] = "Premium";
	})(ButtonStyle || (message.ButtonStyle = ButtonStyle = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/components/reference#text-input-text-input-styles}
	 */
	var TextInputStyle;
	(function (TextInputStyle) {
	    /**
	     * Single-line input
	     */
	    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
	    /**
	     * Multi-line input
	     */
	    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
	})(TextInputStyle || (message.TextInputStyle = TextInputStyle = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure}
	 */
	var SelectMenuDefaultValueType;
	(function (SelectMenuDefaultValueType) {
	    SelectMenuDefaultValueType["Channel"] = "channel";
	    SelectMenuDefaultValueType["Role"] = "role";
	    SelectMenuDefaultValueType["User"] = "user";
	})(SelectMenuDefaultValueType || (message.SelectMenuDefaultValueType = SelectMenuDefaultValueType = {}));
	var UnfurledMediaItemLoadingState;
	(function (UnfurledMediaItemLoadingState) {
	    UnfurledMediaItemLoadingState[UnfurledMediaItemLoadingState["Unknown"] = 0] = "Unknown";
	    UnfurledMediaItemLoadingState[UnfurledMediaItemLoadingState["Loading"] = 1] = "Loading";
	    UnfurledMediaItemLoadingState[UnfurledMediaItemLoadingState["LoadedSuccess"] = 2] = "LoadedSuccess";
	    UnfurledMediaItemLoadingState[UnfurledMediaItemLoadingState["LoadedNotFound"] = 3] = "LoadedNotFound";
	})(UnfurledMediaItemLoadingState || (message.UnfurledMediaItemLoadingState = UnfurledMediaItemLoadingState = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/components/reference#separator}
	 */
	var SeparatorSpacingSize;
	(function (SeparatorSpacingSize) {
	    SeparatorSpacingSize[SeparatorSpacingSize["Small"] = 1] = "Small";
	    SeparatorSpacingSize[SeparatorSpacingSize["Large"] = 2] = "Large";
	})(SeparatorSpacingSize || (message.SeparatorSpacingSize = SeparatorSpacingSize = {}));
	
	return message;
}

var monetization$1 = {};

var hasRequiredMonetization$1;

function requireMonetization$1 () {
	if (hasRequiredMonetization$1) return monetization$1;
	hasRequiredMonetization$1 = 1;
	Object.defineProperty(monetization$1, "__esModule", { value: true });
	monetization$1.SubscriptionStatus = monetization$1.SKUType = monetization$1.SKUFlags = monetization$1.EntitlementType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/monetization/entitlements#entitlement-object-entitlement-types}
	 */
	var EntitlementType;
	(function (EntitlementType) {
	    /**
	     * Entitlement was purchased by user
	     */
	    EntitlementType[EntitlementType["Purchase"] = 1] = "Purchase";
	    /**
	     * Entitlement for Discord Nitro subscription
	     */
	    EntitlementType[EntitlementType["PremiumSubscription"] = 2] = "PremiumSubscription";
	    /**
	     * Entitlement was gifted by developer
	     */
	    EntitlementType[EntitlementType["DeveloperGift"] = 3] = "DeveloperGift";
	    /**
	     * Entitlement was purchased by a dev in application test mode
	     */
	    EntitlementType[EntitlementType["TestModePurchase"] = 4] = "TestModePurchase";
	    /**
	     * Entitlement was granted when the SKU was free
	     */
	    EntitlementType[EntitlementType["FreePurchase"] = 5] = "FreePurchase";
	    /**
	     * Entitlement was gifted by another user
	     */
	    EntitlementType[EntitlementType["UserGift"] = 6] = "UserGift";
	    /**
	     * Entitlement was claimed by user for free as a Nitro Subscriber
	     */
	    EntitlementType[EntitlementType["PremiumPurchase"] = 7] = "PremiumPurchase";
	    /**
	     * Entitlement was purchased as an app subscription
	     */
	    EntitlementType[EntitlementType["ApplicationSubscription"] = 8] = "ApplicationSubscription";
	})(EntitlementType || (monetization$1.EntitlementType = EntitlementType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/monetization/skus#sku-object-sku-flags}
	 */
	var SKUFlags;
	(function (SKUFlags) {
	    /**
	     * SKU is available for purchase
	     */
	    SKUFlags[SKUFlags["Available"] = 4] = "Available";
	    /**
	     * Recurring SKU that can be purchased by a user and applied to a single server.
	     * Grants access to every user in that server.
	     */
	    SKUFlags[SKUFlags["GuildSubscription"] = 128] = "GuildSubscription";
	    /**
	     * Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server.
	     */
	    SKUFlags[SKUFlags["UserSubscription"] = 256] = "UserSubscription";
	})(SKUFlags || (monetization$1.SKUFlags = SKUFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/sku#sku-object-sku-types}
	 */
	var SKUType;
	(function (SKUType) {
	    /**
	     * Durable one-time purchase
	     */
	    SKUType[SKUType["Durable"] = 2] = "Durable";
	    /**
	     * Consumable one-time purchase
	     */
	    SKUType[SKUType["Consumable"] = 3] = "Consumable";
	    /**
	     * Represents a recurring subscription
	     */
	    SKUType[SKUType["Subscription"] = 5] = "Subscription";
	    /**
	     * System-generated group for each Subscription SKU created
	     */
	    SKUType[SKUType["SubscriptionGroup"] = 6] = "SubscriptionGroup";
	})(SKUType || (monetization$1.SKUType = SKUType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/subscription#subscription-statuses}
	 */
	var SubscriptionStatus;
	(function (SubscriptionStatus) {
	    /**
	     * Subscription is active and scheduled to renew.
	     */
	    SubscriptionStatus[SubscriptionStatus["Active"] = 0] = "Active";
	    /**
	     * Subscription is active but will not renew.
	     */
	    SubscriptionStatus[SubscriptionStatus["Ending"] = 1] = "Ending";
	    /**
	     * Subscription is inactive and not being charged.
	     */
	    SubscriptionStatus[SubscriptionStatus["Inactive"] = 2] = "Inactive";
	})(SubscriptionStatus || (monetization$1.SubscriptionStatus = SubscriptionStatus = {}));
	
	return monetization$1;
}

var oauth2 = {};

var hasRequiredOauth2;

function requireOauth2 () {
	if (hasRequiredOauth2) return oauth2;
	hasRequiredOauth2 = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/oauth2
	 */
	Object.defineProperty(oauth2, "__esModule", { value: true });
	oauth2.OAuth2Scopes = void 0;
	var OAuth2Scopes;
	(function (OAuth2Scopes) {
	    /**
	     * For oauth2 bots, this puts the bot in the user's selected guild by default
	     */
	    OAuth2Scopes["Bot"] = "bot";
	    /**
	     * Allows {@link https://discord.com/developers/docs/resources/user#get-user-connections | `/users/@me/connections`}
	     * to return linked third-party accounts
	     *
	     * @see {@link https://discord.com/developers/docs/resources/user#get-user-connections}
	     */
	    OAuth2Scopes["Connections"] = "connections";
	    /**
	     * Allows your app to see information about the user's DMs and group DMs - requires Discord approval
	     */
	    OAuth2Scopes["DMChannelsRead"] = "dm_channels.read";
	    /**
	     * Enables {@link https://discord.com/developers/docs/resources/user#get-current-user | `/users/@me`} to return an `email`
	     *
	     * @see {@link https://discord.com/developers/docs/resources/user#get-current-user}
	     */
	    OAuth2Scopes["Email"] = "email";
	    /**
	     * Allows {@link https://discord.com/developers/docs/resources/user#get-current-user | `/users/@me`} without `email`
	     *
	     * @see {@link https://discord.com/developers/docs/resources/user#get-current-user}
	     */
	    OAuth2Scopes["Identify"] = "identify";
	    /**
	     * Allows {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds | `/users/@me/guilds`}
	     * to return basic information about all of a user's guilds
	     *
	     * @see {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds}
	     */
	    OAuth2Scopes["Guilds"] = "guilds";
	    /**
	     * Allows {@link https://discord.com/developers/docs/resources/guild#add-guild-member | `/guilds/[guild.id]/members/[user.id]`}
	     * to be used for joining users to a guild
	     *
	     * @see {@link https://discord.com/developers/docs/resources/guild#add-guild-member}
	     */
	    OAuth2Scopes["GuildsJoin"] = "guilds.join";
	    /**
	     * Allows /users/\@me/guilds/\{guild.id\}/member to return a user's member information in a guild
	     *
	     * @see {@link https://discord.com/developers/docs/resources/user#get-current-user-guild-member}
	     */
	    OAuth2Scopes["GuildsMembersRead"] = "guilds.members.read";
	    /**
	     * Allows your app to join users to a group dm
	     *
	     * @see {@link https://discord.com/developers/docs/resources/channel#group-dm-add-recipient}
	     */
	    OAuth2Scopes["GroupDMJoins"] = "gdm.join";
	    /**
	     * For local rpc server api access, this allows you to read messages from all client channels
	     * (otherwise restricted to channels/guilds your app creates)
	     */
	    OAuth2Scopes["MessagesRead"] = "messages.read";
	    /**
	     * Allows your app to update a user's connection and metadata for the app
	     */
	    OAuth2Scopes["RoleConnectionsWrite"] = "role_connections.write";
	    /**
	     * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
	     */
	    OAuth2Scopes["RPC"] = "rpc";
	    /**
	     * For local rpc server access, this allows you to update a user's activity - requires Discord approval
	     */
	    OAuth2Scopes["RPCActivitiesWrite"] = "rpc.activities.write";
	    /**
	     * For local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval
	     */
	    OAuth2Scopes["RPCVoiceRead"] = "rpc.voice.read";
	    /**
	     * For local rpc server access, this allows you to update a user's voice settings - requires Discord approval
	     */
	    OAuth2Scopes["RPCVoiceWrite"] = "rpc.voice.write";
	    /**
	     * For local rpc server api access, this allows you to receive notifications pushed out to the user - requires Discord approval
	     */
	    OAuth2Scopes["RPCNotificationsRead"] = "rpc.notifications.read";
	    /**
	     * This generates a webhook that is returned in the oauth token response for authorization code grants
	     */
	    OAuth2Scopes["WebhookIncoming"] = "webhook.incoming";
	    /**
	     * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
	     */
	    OAuth2Scopes["Voice"] = "voice";
	    /**
	     * Allows your app to upload/update builds for a user's applications - requires Discord approval
	     */
	    OAuth2Scopes["ApplicationsBuildsUpload"] = "applications.builds.upload";
	    /**
	     * Allows your app to read build data for a user's applications
	     */
	    OAuth2Scopes["ApplicationsBuildsRead"] = "applications.builds.read";
	    /**
	     * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
	     */
	    OAuth2Scopes["ApplicationsStoreUpdate"] = "applications.store.update";
	    /**
	     * Allows your app to read entitlements for a user's applications
	     */
	    OAuth2Scopes["ApplicationsEntitlements"] = "applications.entitlements";
	    /**
	     * Allows your app to know a user's friends and implicit relationships - requires Discord approval
	     */
	    OAuth2Scopes["RelationshipsRead"] = "relationships.read";
	    /**
	     * Allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval
	     */
	    OAuth2Scopes["ActivitiesRead"] = "activities.read";
	    /**
	     * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)
	     *
	     * @see {@link https://discord.com/developers/docs/game-sdk/activities}
	     */
	    OAuth2Scopes["ActivitiesWrite"] = "activities.write";
	    /**
	     * Allows your app to use Application Commands in a guild
	     *
	     * @see {@link https://discord.com/developers/docs/interactions/application-commands}
	     */
	    OAuth2Scopes["ApplicationsCommands"] = "applications.commands";
	    /**
	     * Allows your app to update its Application Commands via this bearer token - client credentials grant only
	     *
	     * @see {@link https://discord.com/developers/docs/interactions/application-commands}
	     */
	    OAuth2Scopes["ApplicationsCommandsUpdate"] = "applications.commands.update";
	    /**
	     * Allows your app to update permissions for its commands using a Bearer token - client credentials grant only
	     *
	     * @see {@link https://discord.com/developers/docs/interactions/application-commands}
	     */
	    OAuth2Scopes["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
	})(OAuth2Scopes || (oauth2.OAuth2Scopes = OAuth2Scopes = {}));
	
	return oauth2;
}

var permissions = {};

var hasRequiredPermissions;

function requirePermissions () {
	if (hasRequiredPermissions) return permissions;
	hasRequiredPermissions = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/permissions
	 */
	Object.defineProperty(permissions, "__esModule", { value: true });
	permissions.RoleFlags = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/topics/permissions#role-object-role-flags}
	 */
	var RoleFlags;
	(function (RoleFlags) {
	    /**
	     * Role can be selected by members in an onboarding prompt
	     */
	    RoleFlags[RoleFlags["InPrompt"] = 1] = "InPrompt";
	})(RoleFlags || (permissions.RoleFlags = RoleFlags = {}));
	
	return permissions;
}

var poll = {};

var hasRequiredPoll;

function requirePoll () {
	if (hasRequiredPoll) return poll;
	hasRequiredPoll = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/poll
	 */
	Object.defineProperty(poll, "__esModule", { value: true });
	poll.PollLayoutType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/poll#layout-type}
	 */
	var PollLayoutType;
	(function (PollLayoutType) {
	    /**
	     * The, uhm, default layout type
	     */
	    PollLayoutType[PollLayoutType["Default"] = 1] = "Default";
	})(PollLayoutType || (poll.PollLayoutType = PollLayoutType = {}));
	
	return poll;
}

var stageInstance = {};

var hasRequiredStageInstance;

function requireStageInstance () {
	if (hasRequiredStageInstance) return stageInstance;
	hasRequiredStageInstance = 1;
	Object.defineProperty(stageInstance, "__esModule", { value: true });
	stageInstance.StageInstancePrivacyLevel = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level}
	 */
	var StageInstancePrivacyLevel;
	(function (StageInstancePrivacyLevel) {
	    /**
	     * The stage instance is visible publicly, such as on stage discovery
	     *
	     * @deprecated
	     * {@link https://github.com/discord/discord-api-docs/pull/4296 | discord-api-docs#4296}
	     */
	    StageInstancePrivacyLevel[StageInstancePrivacyLevel["Public"] = 1] = "Public";
	    /**
	     * The stage instance is visible to only guild members
	     */
	    StageInstancePrivacyLevel[StageInstancePrivacyLevel["GuildOnly"] = 2] = "GuildOnly";
	})(StageInstancePrivacyLevel || (stageInstance.StageInstancePrivacyLevel = StageInstancePrivacyLevel = {}));
	
	return stageInstance;
}

var sticker = {};

var hasRequiredSticker;

function requireSticker () {
	if (hasRequiredSticker) return sticker;
	hasRequiredSticker = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/sticker
	 */
	Object.defineProperty(sticker, "__esModule", { value: true });
	sticker.StickerFormatType = sticker.StickerType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types}
	 */
	var StickerType;
	(function (StickerType) {
	    /**
	     * An official sticker in a pack
	     */
	    StickerType[StickerType["Standard"] = 1] = "Standard";
	    /**
	     * A sticker uploaded to a guild for the guild's members
	     */
	    StickerType[StickerType["Guild"] = 2] = "Guild";
	})(StickerType || (sticker.StickerType = StickerType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types}
	 */
	var StickerFormatType;
	(function (StickerFormatType) {
	    StickerFormatType[StickerFormatType["PNG"] = 1] = "PNG";
	    StickerFormatType[StickerFormatType["APNG"] = 2] = "APNG";
	    StickerFormatType[StickerFormatType["Lottie"] = 3] = "Lottie";
	    StickerFormatType[StickerFormatType["GIF"] = 4] = "GIF";
	})(StickerFormatType || (sticker.StickerFormatType = StickerFormatType = {}));
	
	return sticker;
}

var teams = {};

var hasRequiredTeams;

function requireTeams () {
	if (hasRequiredTeams) return teams;
	hasRequiredTeams = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/topics/teams
	 */
	Object.defineProperty(teams, "__esModule", { value: true });
	teams.TeamMemberRole = teams.TeamMemberMembershipState = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum}
	 */
	var TeamMemberMembershipState;
	(function (TeamMemberMembershipState) {
	    TeamMemberMembershipState[TeamMemberMembershipState["Invited"] = 1] = "Invited";
	    TeamMemberMembershipState[TeamMemberMembershipState["Accepted"] = 2] = "Accepted";
	})(TeamMemberMembershipState || (teams.TeamMemberMembershipState = TeamMemberMembershipState = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/teams#team-member-roles-team-member-role-types}
	 */
	var TeamMemberRole;
	(function (TeamMemberRole) {
	    TeamMemberRole["Admin"] = "admin";
	    TeamMemberRole["Developer"] = "developer";
	    TeamMemberRole["ReadOnly"] = "read_only";
	})(TeamMemberRole || (teams.TeamMemberRole = TeamMemberRole = {}));
	
	return teams;
}

var user = {};

var hasRequiredUser;

function requireUser () {
	if (hasRequiredUser) return user;
	hasRequiredUser = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/user
	 */
	Object.defineProperty(user, "__esModule", { value: true });
	user.NameplatePalette = user.ConnectionVisibility = user.ConnectionService = user.UserPremiumType = user.UserFlags = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/user#user-object-user-flags}
	 */
	var UserFlags;
	(function (UserFlags) {
	    /**
	     * Discord Employee
	     */
	    UserFlags[UserFlags["Staff"] = 1] = "Staff";
	    /**
	     * Partnered Server Owner
	     */
	    UserFlags[UserFlags["Partner"] = 2] = "Partner";
	    /**
	     * HypeSquad Events Member
	     */
	    UserFlags[UserFlags["Hypesquad"] = 4] = "Hypesquad";
	    /**
	     * Bug Hunter Level 1
	     */
	    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    UserFlags[UserFlags["MFASMS"] = 16] = "MFASMS";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    UserFlags[UserFlags["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
	    /**
	     * House Bravery Member
	     */
	    UserFlags[UserFlags["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
	    /**
	     * House Brilliance Member
	     */
	    UserFlags[UserFlags["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
	    /**
	     * House Balance Member
	     */
	    UserFlags[UserFlags["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
	    /**
	     * Early Nitro Supporter
	     */
	    UserFlags[UserFlags["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
	    /**
	     * User is a {@link https://discord.com/developers/docs/topics/teams | team}
	     */
	    UserFlags[UserFlags["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    UserFlags[UserFlags["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
	    /**
	     * Bug Hunter Level 2
	     */
	    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
	    /**
	     * Verified Bot
	     */
	    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
	    /**
	     * Early Verified Bot Developer
	     */
	    UserFlags[UserFlags["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
	    /**
	     * Moderator Programs Alumni
	     */
	    UserFlags[UserFlags["CertifiedModerator"] = 262144] = "CertifiedModerator";
	    /**
	     * Bot uses only {@link https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction | HTTP interactions} and is shown in the online member list
	     */
	    UserFlags[UserFlags["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
	    /**
	     * User has been identified as spammer
	     *
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    UserFlags[UserFlags["Spammer"] = 1048576] = "Spammer";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     */
	    UserFlags[UserFlags["DisablePremium"] = 2097152] = "DisablePremium";
	    /**
	     * User is an {@link https://support-dev.discord.com/hc/articles/10113997751447 | Active Developer}
	     */
	    UserFlags[UserFlags["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
	    /**
	     * User's account has been {@link https://support.discord.com/hc/articles/6461420677527 | quarantined} based on recent activity
	     *
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     * @privateRemarks
	     *
	     * This value would be `1 << 44`, but bit shifting above `1 << 30` requires bigints
	     */
	    UserFlags[UserFlags["Quarantined"] = 17592186044416] = "Quarantined";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     * @privateRemarks
	     *
	     * This value would be `1 << 50`, but bit shifting above `1 << 30` requires bigints
	     */
	    UserFlags[UserFlags["Collaborator"] = 1125899906842624] = "Collaborator";
	    /**
	     * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	     * @privateRemarks
	     *
	     * This value would be `1 << 51`, but bit shifting above `1 << 30` requires bigints
	     */
	    UserFlags[UserFlags["RestrictedCollaborator"] = 2251799813685248] = "RestrictedCollaborator";
	})(UserFlags || (user.UserFlags = UserFlags = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/user#user-object-premium-types}
	 */
	var UserPremiumType;
	(function (UserPremiumType) {
	    UserPremiumType[UserPremiumType["None"] = 0] = "None";
	    UserPremiumType[UserPremiumType["NitroClassic"] = 1] = "NitroClassic";
	    UserPremiumType[UserPremiumType["Nitro"] = 2] = "Nitro";
	    UserPremiumType[UserPremiumType["NitroBasic"] = 3] = "NitroBasic";
	})(UserPremiumType || (user.UserPremiumType = UserPremiumType = {}));
	var ConnectionService;
	(function (ConnectionService) {
	    ConnectionService["AmazonMusic"] = "amazon-music";
	    ConnectionService["BattleNet"] = "battlenet";
	    ConnectionService["Bluesky"] = "bluesky";
	    ConnectionService["BungieNet"] = "bungie";
	    ConnectionService["Crunchyroll"] = "crunchyroll";
	    ConnectionService["Domain"] = "domain";
	    ConnectionService["eBay"] = "ebay";
	    ConnectionService["EpicGames"] = "epicgames";
	    ConnectionService["Facebook"] = "facebook";
	    ConnectionService["GitHub"] = "github";
	    ConnectionService["Instagram"] = "instagram";
	    ConnectionService["LeagueOfLegends"] = "leagueoflegends";
	    ConnectionService["Mastodon"] = "mastodon";
	    ConnectionService["PayPal"] = "paypal";
	    ConnectionService["PlayStationNetwork"] = "playstation";
	    ConnectionService["Reddit"] = "reddit";
	    ConnectionService["RiotGames"] = "riotgames";
	    ConnectionService["Roblox"] = "roblox";
	    ConnectionService["Spotify"] = "spotify";
	    ConnectionService["Skype"] = "skype";
	    ConnectionService["Steam"] = "steam";
	    ConnectionService["TikTok"] = "tiktok";
	    ConnectionService["Twitch"] = "twitch";
	    ConnectionService["X"] = "twitter";
	    /**
	     * @deprecated This is the old name for {@link ConnectionService.X}
	     */
	    ConnectionService["Twitter"] = "twitter";
	    ConnectionService["Xbox"] = "xbox";
	    ConnectionService["YouTube"] = "youtube";
	})(ConnectionService || (user.ConnectionService = ConnectionService = {}));
	var ConnectionVisibility;
	(function (ConnectionVisibility) {
	    /**
	     * Invisible to everyone except the user themselves
	     */
	    ConnectionVisibility[ConnectionVisibility["None"] = 0] = "None";
	    /**
	     * Visible to everyone
	     */
	    ConnectionVisibility[ConnectionVisibility["Everyone"] = 1] = "Everyone";
	})(ConnectionVisibility || (user.ConnectionVisibility = ConnectionVisibility = {}));
	/**
	 * Background color of a nameplate.
	 */
	var NameplatePalette;
	(function (NameplatePalette) {
	    NameplatePalette["Berry"] = "berry";
	    NameplatePalette["BubbleGum"] = "bubble_gum";
	    NameplatePalette["Clover"] = "clover";
	    NameplatePalette["Cobalt"] = "cobalt";
	    NameplatePalette["Crimson"] = "crimson";
	    NameplatePalette["Forest"] = "forest";
	    NameplatePalette["Lemon"] = "lemon";
	    NameplatePalette["Sky"] = "sky";
	    NameplatePalette["Teal"] = "teal";
	    NameplatePalette["Violet"] = "violet";
	    NameplatePalette["White"] = "white";
	})(NameplatePalette || (user.NameplatePalette = NameplatePalette = {}));
	
	return user;
}

var webhook = {};

var hasRequiredWebhook;

function requireWebhook () {
	if (hasRequiredWebhook) return webhook;
	hasRequiredWebhook = 1;
	/**
	 * Types extracted from https://discord.com/developers/docs/resources/webhook
	 */
	Object.defineProperty(webhook, "__esModule", { value: true });
	webhook.WebhookType = webhook.ApplicationWebhookEventType = webhook.ApplicationWebhookType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/events/webhook-events#webhook-types}
	 */
	var ApplicationWebhookType;
	(function (ApplicationWebhookType) {
	    /**
	     * PING event sent to verify your Webhook Event URL is active
	     */
	    ApplicationWebhookType[ApplicationWebhookType["Ping"] = 0] = "Ping";
	    /**
	     * Webhook event (details for event in event body object)
	     */
	    ApplicationWebhookType[ApplicationWebhookType["Event"] = 1] = "Event";
	})(ApplicationWebhookType || (webhook.ApplicationWebhookType = ApplicationWebhookType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/events/webhook-events#event-types}
	 */
	var ApplicationWebhookEventType;
	(function (ApplicationWebhookEventType) {
	    /**
	     * Sent when an app was authorized by a user to a server or their account
	     */
	    ApplicationWebhookEventType["ApplicationAuthorized"] = "APPLICATION_AUTHORIZED";
	    /**
	     * Sent when an app was deauthorized by a user
	     */
	    ApplicationWebhookEventType["ApplicationDeauthorized"] = "APPLICATION_DEAUTHORIZED";
	    /**
	     * Entitlement was created
	     */
	    ApplicationWebhookEventType["EntitlementCreate"] = "ENTITLEMENT_CREATE";
	    /**
	     * User was added to a Quest (currently unavailable)
	     */
	    ApplicationWebhookEventType["QuestUserEnrollment"] = "QUEST_USER_ENROLLMENT";
	})(ApplicationWebhookEventType || (webhook.ApplicationWebhookEventType = ApplicationWebhookEventType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types}
	 */
	var WebhookType;
	(function (WebhookType) {
	    /**
	     * Incoming Webhooks can post messages to channels with a generated token
	     */
	    WebhookType[WebhookType["Incoming"] = 1] = "Incoming";
	    /**
	     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
	     */
	    WebhookType[WebhookType["ChannelFollower"] = 2] = "ChannelFollower";
	    /**
	     * Application webhooks are webhooks used with Interactions
	     */
	    WebhookType[WebhookType["Application"] = 3] = "Application";
	})(WebhookType || (webhook.WebhookType = WebhookType = {}));
	
	return webhook;
}

var hasRequiredV10$4;

function requireV10$4 () {
	if (hasRequiredV10$4) return v10$7;
	hasRequiredV10$4 = 1;
	(function (exports) {
		var __createBinding = (v10$7 && v10$7.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (v10$7 && v10$7.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		__exportStar(requireCommon$2(), exports);
		__exportStar(requireApplication(), exports);
		__exportStar(requireAuditLog(), exports);
		__exportStar(requireAutoModeration(), exports);
		__exportStar(requireChannel$1(), exports);
		__exportStar(requireGateway(), exports);
		__exportStar(requireGuild(), exports);
		__exportStar(requireGuildScheduledEvent(), exports);
		__exportStar(requireInteractions(), exports);
		__exportStar(requireInvite(), exports);
		__exportStar(requireMessage(), exports);
		__exportStar(requireMonetization$1(), exports);
		__exportStar(requireOauth2(), exports);
		__exportStar(requirePermissions(), exports);
		__exportStar(requirePoll(), exports);
		__exportStar(requireStageInstance(), exports);
		__exportStar(requireSticker(), exports);
		__exportStar(requireTeams(), exports);
		__exportStar(requireUser(), exports);
		__exportStar(requireWebhook(), exports);
		
	} (v10$7));
	return v10$7;
}

var v10Exports$4 = requireV10$4();
var mod$5 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports$4);

const APIApplicationCommandPermissionsConstant = mod$5.APIApplicationCommandPermissionsConstant;
const ActivityFlags = mod$5.ActivityFlags;
const ActivityPlatform = mod$5.ActivityPlatform;
const ActivityType = mod$5.ActivityType;
const AllowedMentionsTypes = mod$5.AllowedMentionsTypes;
const ApplicationCommandOptionType = mod$5.ApplicationCommandOptionType;
const ApplicationCommandPermissionType = mod$5.ApplicationCommandPermissionType;
const ApplicationCommandType = mod$5.ApplicationCommandType;
const ApplicationFlags = mod$5.ApplicationFlags;
const ApplicationIntegrationType = mod$5.ApplicationIntegrationType;
const ApplicationRoleConnectionMetadataType = mod$5.ApplicationRoleConnectionMetadataType;
const ApplicationWebhookEventStatus = mod$5.ApplicationWebhookEventStatus;
const ApplicationWebhookEventType = mod$5.ApplicationWebhookEventType;
const ApplicationWebhookType = mod$5.ApplicationWebhookType;
const AttachmentFlags = mod$5.AttachmentFlags;
const AuditLogEvent = mod$5.AuditLogEvent;
const AuditLogOptionsType = mod$5.AuditLogOptionsType;
const AutoModerationActionType = mod$5.AutoModerationActionType;
const AutoModerationRuleEventType = mod$5.AutoModerationRuleEventType;
const AutoModerationRuleKeywordPresetType = mod$5.AutoModerationRuleKeywordPresetType;
const AutoModerationRuleTriggerType = mod$5.AutoModerationRuleTriggerType;
const ButtonStyle = mod$5.ButtonStyle;
const ChannelFlags = mod$5.ChannelFlags;
const ChannelType = mod$5.ChannelType;
const ComponentType = mod$5.ComponentType;
const ConnectionService = mod$5.ConnectionService;
const ConnectionVisibility = mod$5.ConnectionVisibility;
const EmbedType = mod$5.EmbedType;
const EntitlementType = mod$5.EntitlementType;
const EntryPointCommandHandlerType = mod$5.EntryPointCommandHandlerType;
const ForumLayoutType = mod$5.ForumLayoutType;
const GuildDefaultMessageNotifications = mod$5.GuildDefaultMessageNotifications;
const GuildExplicitContentFilter = mod$5.GuildExplicitContentFilter;
const GuildFeature = mod$5.GuildFeature;
const GuildHubType = mod$5.GuildHubType;
const GuildMFALevel = mod$5.GuildMFALevel;
const GuildMemberFlags = mod$5.GuildMemberFlags;
const GuildNSFWLevel = mod$5.GuildNSFWLevel;
const GuildOnboardingMode = mod$5.GuildOnboardingMode;
const GuildOnboardingPromptType = mod$5.GuildOnboardingPromptType;
const GuildPremiumTier = mod$5.GuildPremiumTier;
const GuildScheduledEventEntityType = mod$5.GuildScheduledEventEntityType;
const GuildScheduledEventPrivacyLevel = mod$5.GuildScheduledEventPrivacyLevel;
const GuildScheduledEventRecurrenceRuleFrequency = mod$5.GuildScheduledEventRecurrenceRuleFrequency;
const GuildScheduledEventRecurrenceRuleMonth = mod$5.GuildScheduledEventRecurrenceRuleMonth;
const GuildScheduledEventRecurrenceRuleWeekday = mod$5.GuildScheduledEventRecurrenceRuleWeekday;
const GuildScheduledEventStatus = mod$5.GuildScheduledEventStatus;
const GuildSystemChannelFlags = mod$5.GuildSystemChannelFlags;
const GuildVerificationLevel = mod$5.GuildVerificationLevel;
const GuildWidgetStyle = mod$5.GuildWidgetStyle;
const IntegrationExpireBehavior = mod$5.IntegrationExpireBehavior;
const InteractionContextType = mod$5.InteractionContextType;
const InteractionResponseType = mod$5.InteractionResponseType;
const InteractionType = mod$5.InteractionType;
const InviteFlags = mod$5.InviteFlags;
const InviteTargetType = mod$5.InviteTargetType;
const InviteType = mod$5.InviteType;
const MembershipScreeningFieldType = mod$5.MembershipScreeningFieldType;
const MessageActivityType = mod$5.MessageActivityType;
const MessageFlags = mod$5.MessageFlags;
const MessageReferenceType = mod$5.MessageReferenceType;
const MessageType = mod$5.MessageType;
const NameplatePalette = mod$5.NameplatePalette;
const OAuth2Scopes = mod$5.OAuth2Scopes;
const OverwriteType = mod$5.OverwriteType;
const PermissionFlagsBits = mod$5.PermissionFlagsBits;
const PollLayoutType = mod$5.PollLayoutType;
const PresenceUpdateStatus = mod$5.PresenceUpdateStatus;
const RoleFlags = mod$5.RoleFlags;
const SKUFlags = mod$5.SKUFlags;
const SKUType = mod$5.SKUType;
const SelectMenuDefaultValueType = mod$5.SelectMenuDefaultValueType;
const SeparatorSpacingSize = mod$5.SeparatorSpacingSize;
const SortOrderType = mod$5.SortOrderType;
const StageInstancePrivacyLevel = mod$5.StageInstancePrivacyLevel;
const StatusDisplayType = mod$5.StatusDisplayType;
const StickerFormatType = mod$5.StickerFormatType;
const StickerType = mod$5.StickerType;
const SubscriptionStatus = mod$5.SubscriptionStatus;
const TeamMemberMembershipState = mod$5.TeamMemberMembershipState;
const TeamMemberRole = mod$5.TeamMemberRole;
const TextInputStyle = mod$5.TextInputStyle;
const ThreadAutoArchiveDuration = mod$5.ThreadAutoArchiveDuration;
const ThreadMemberFlags = mod$5.ThreadMemberFlags;
const UnfurledMediaItemLoadingState = mod$5.UnfurledMediaItemLoadingState;
const UserFlags = mod$5.UserFlags;
const UserPremiumType = mod$5.UserPremiumType;
const VideoQualityMode = mod$5.VideoQualityMode;
const WebhookType = mod$5.WebhookType;

var v10$6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APIApplicationCommandPermissionsConstant: APIApplicationCommandPermissionsConstant,
  ActivityFlags: ActivityFlags,
  ActivityPlatform: ActivityPlatform,
  ActivityType: ActivityType,
  AllowedMentionsTypes: AllowedMentionsTypes,
  ApplicationCommandOptionType: ApplicationCommandOptionType,
  ApplicationCommandPermissionType: ApplicationCommandPermissionType,
  ApplicationCommandType: ApplicationCommandType,
  ApplicationFlags: ApplicationFlags,
  ApplicationIntegrationType: ApplicationIntegrationType,
  ApplicationRoleConnectionMetadataType: ApplicationRoleConnectionMetadataType,
  ApplicationWebhookEventStatus: ApplicationWebhookEventStatus,
  ApplicationWebhookEventType: ApplicationWebhookEventType,
  ApplicationWebhookType: ApplicationWebhookType,
  AttachmentFlags: AttachmentFlags,
  AuditLogEvent: AuditLogEvent,
  AuditLogOptionsType: AuditLogOptionsType,
  AutoModerationActionType: AutoModerationActionType,
  AutoModerationRuleEventType: AutoModerationRuleEventType,
  AutoModerationRuleKeywordPresetType: AutoModerationRuleKeywordPresetType,
  AutoModerationRuleTriggerType: AutoModerationRuleTriggerType,
  ButtonStyle: ButtonStyle,
  ChannelFlags: ChannelFlags,
  ChannelType: ChannelType,
  ComponentType: ComponentType,
  ConnectionService: ConnectionService,
  ConnectionVisibility: ConnectionVisibility,
  EmbedType: EmbedType,
  EntitlementType: EntitlementType,
  EntryPointCommandHandlerType: EntryPointCommandHandlerType,
  ForumLayoutType: ForumLayoutType,
  GuildDefaultMessageNotifications: GuildDefaultMessageNotifications,
  GuildExplicitContentFilter: GuildExplicitContentFilter,
  GuildFeature: GuildFeature,
  GuildHubType: GuildHubType,
  GuildMFALevel: GuildMFALevel,
  GuildMemberFlags: GuildMemberFlags,
  GuildNSFWLevel: GuildNSFWLevel,
  GuildOnboardingMode: GuildOnboardingMode,
  GuildOnboardingPromptType: GuildOnboardingPromptType,
  GuildPremiumTier: GuildPremiumTier,
  GuildScheduledEventEntityType: GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel: GuildScheduledEventPrivacyLevel,
  GuildScheduledEventRecurrenceRuleFrequency: GuildScheduledEventRecurrenceRuleFrequency,
  GuildScheduledEventRecurrenceRuleMonth: GuildScheduledEventRecurrenceRuleMonth,
  GuildScheduledEventRecurrenceRuleWeekday: GuildScheduledEventRecurrenceRuleWeekday,
  GuildScheduledEventStatus: GuildScheduledEventStatus,
  GuildSystemChannelFlags: GuildSystemChannelFlags,
  GuildVerificationLevel: GuildVerificationLevel,
  GuildWidgetStyle: GuildWidgetStyle,
  IntegrationExpireBehavior: IntegrationExpireBehavior,
  InteractionContextType: InteractionContextType,
  InteractionResponseType: InteractionResponseType,
  InteractionType: InteractionType,
  InviteFlags: InviteFlags,
  InviteTargetType: InviteTargetType,
  InviteType: InviteType,
  MembershipScreeningFieldType: MembershipScreeningFieldType,
  MessageActivityType: MessageActivityType,
  MessageFlags: MessageFlags,
  MessageReferenceType: MessageReferenceType,
  MessageType: MessageType,
  NameplatePalette: NameplatePalette,
  OAuth2Scopes: OAuth2Scopes,
  OverwriteType: OverwriteType,
  PermissionFlagsBits: PermissionFlagsBits,
  PollLayoutType: PollLayoutType,
  PresenceUpdateStatus: PresenceUpdateStatus,
  RoleFlags: RoleFlags,
  SKUFlags: SKUFlags,
  SKUType: SKUType,
  SelectMenuDefaultValueType: SelectMenuDefaultValueType,
  SeparatorSpacingSize: SeparatorSpacingSize,
  SortOrderType: SortOrderType,
  StageInstancePrivacyLevel: StageInstancePrivacyLevel,
  StatusDisplayType: StatusDisplayType,
  StickerFormatType: StickerFormatType,
  StickerType: StickerType,
  SubscriptionStatus: SubscriptionStatus,
  TeamMemberMembershipState: TeamMemberMembershipState,
  TeamMemberRole: TeamMemberRole,
  TextInputStyle: TextInputStyle,
  ThreadAutoArchiveDuration: ThreadAutoArchiveDuration,
  ThreadMemberFlags: ThreadMemberFlags,
  UnfurledMediaItemLoadingState: UnfurledMediaItemLoadingState,
  UserFlags: UserFlags,
  UserPremiumType: UserPremiumType,
  VideoQualityMode: VideoQualityMode,
  WebhookType: WebhookType,
  default: mod$5
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(v10$6);

var v10$5 = {};

var internals = {};

var hasRequiredInternals;

function requireInternals () {
	if (hasRequiredInternals) return internals;
	hasRequiredInternals = 1;
	Object.defineProperty(internals, "__esModule", { value: true });
	internals.urlSafeCharacters = void 0;
	// eslint-disable-next-line unicorn/better-regex
	const pattern = /^[\d%A-Za-z-_]+$/g;
	internals.urlSafeCharacters = {
	    test(input) {
	        const result = pattern.test(input);
	        pattern.lastIndex = 0;
	        return result;
	    },
	};
	
	return internals;
}

var common$1 = {};

var hasRequiredCommon$1;

function requireCommon$1 () {
	if (hasRequiredCommon$1) return common$1;
	hasRequiredCommon$1 = 1;
	Object.defineProperty(common$1, "__esModule", { value: true });
	common$1.Locale = common$1.RESTJSONErrorCodes = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes}
	 */
	var RESTJSONErrorCodes;
	(function (RESTJSONErrorCodes) {
	    RESTJSONErrorCodes[RESTJSONErrorCodes["GeneralError"] = 0] = "GeneralError";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAccount"] = 10001] = "UnknownAccount";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplication"] = 10002] = "UnknownApplication";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownChannel"] = 10003] = "UnknownChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuild"] = 10004] = "UnknownGuild";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownIntegration"] = 10005] = "UnknownIntegration";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInvite"] = 10006] = "UnknownInvite";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMember"] = 10007] = "UnknownMember";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownMessage"] = 10008] = "UnknownMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownProvider"] = 10010] = "UnknownProvider";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRole"] = 10011] = "UnknownRole";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownToken"] = 10012] = "UnknownToken";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownUser"] = 10013] = "UnknownUser";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEmoji"] = 10014] = "UnknownEmoji";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhook"] = 10015] = "UnknownWebhook";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSession"] = 10020] = "UnknownSession";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownAsset"] = 10021] = "UnknownAsset";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBan"] = 10026] = "UnknownBan";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSKU"] = 10027] = "UnknownSKU";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBuild"] = 10030] = "UnknownBuild";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownLobby"] = 10031] = "UnknownLobby";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownBranch"] = 10032] = "UnknownBranch";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStream"] = 10049] = "UnknownStream";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSticker"] = 10060] = "UnknownSticker";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStickerPack"] = 10061] = "UnknownStickerPack";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownInteraction"] = 10062] = "UnknownInteraction";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownTag"] = 10087] = "UnknownTag";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnknownSound"] = 10097] = "UnknownSound";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfSoundboardSoundsReached"] = 30045] = "MaximumNumberOfSoundboardSoundsReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["Unauthorized"] = 40001] = "Unauthorized";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OnlyConsumableSKUsCanBeConsumed"] = 40018] = "OnlyConsumableSKUsCanBeConsumed";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCanOnlyDeleteSandboxEntitlements"] = 40019] = "YouCanOnlyDeleteSandboxEntitlements";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages"] = 40094] = "ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CloudflareIsBlockingYourRequest"] = 40333] = "CloudflareIsBlockingYourRequest";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingAccess"] = 50001] = "MissingAccess";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAccountType"] = 50002] = "InvalidAccountType";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingPermissions"] = 50013] = "MissingPermissions";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidToken"] = 50014] = "InvalidToken";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRole"] = 50028] = "InvalidRole";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRecipients"] = 50033] = "InvalidRecipients";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidGuild"] = 50055] = "InvalidGuild";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidSKU"] = 50057] = "InvalidSKU";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidMessageType"] = 50068] = "InvalidMessageType";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileIsInvalid"] = 50110] = "ProvidedFileIsInvalid";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileTypeIsInvalid"] = 50123] = "ProvidedFileTypeIsInvalid";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileDurationExceedsMaximumLength"] = 50124] = "ProvidedFileDurationExceedsMaximumLength";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["SpecifiedEmojiIsInvalid"] = 50151] = "SpecifiedEmojiIsInvalid";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ProvidedFileDoesNotHaveAValidDuration"] = 50192] = "ProvidedFileDoesNotHaveAValidDuration";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["APIResourceOverloaded"] = 130000] = "APIResourceOverloaded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["ThreadLocked"] = 160005] = "ThreadLocked";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateAFinishedEvent"] = 180000] = "CannotUpdateAFinishedEvent";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageWasBlockedByAutomaticModeration"] = 200000] = "MessageWasBlockedByAutomaticModeration";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["MessageBlockedByHarmfulLinksFilter"] = 240000] = "MessageBlockedByHarmfulLinksFilter";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEnableOnboardingRequirementsAreNotMet"] = 350000] = "CannotEnableOnboardingRequirementsAreNotMet";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["AccessToFileUploadsHasBeenLimitedForThisGuild"] = 400001] = "AccessToFileUploadsHasBeenLimitedForThisGuild";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["FailedToBanUsers"] = 500000] = "FailedToBanUsers";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["PollVotingBlocked"] = 520000] = "PollVotingBlocked";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["PollExpired"] = 520001] = "PollExpired";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
	    RESTJSONErrorCodes[RESTJSONErrorCodes["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
	})(RESTJSONErrorCodes || (common$1.RESTJSONErrorCodes = RESTJSONErrorCodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/reference#locales}
	 */
	var Locale;
	(function (Locale) {
	    Locale["Indonesian"] = "id";
	    Locale["EnglishUS"] = "en-US";
	    Locale["EnglishGB"] = "en-GB";
	    Locale["Bulgarian"] = "bg";
	    Locale["ChineseCN"] = "zh-CN";
	    Locale["ChineseTW"] = "zh-TW";
	    Locale["Croatian"] = "hr";
	    Locale["Czech"] = "cs";
	    Locale["Danish"] = "da";
	    Locale["Dutch"] = "nl";
	    Locale["Finnish"] = "fi";
	    Locale["French"] = "fr";
	    Locale["German"] = "de";
	    Locale["Greek"] = "el";
	    Locale["Hindi"] = "hi";
	    Locale["Hungarian"] = "hu";
	    Locale["Italian"] = "it";
	    Locale["Japanese"] = "ja";
	    Locale["Korean"] = "ko";
	    Locale["Lithuanian"] = "lt";
	    Locale["Norwegian"] = "no";
	    Locale["Polish"] = "pl";
	    Locale["PortugueseBR"] = "pt-BR";
	    Locale["Romanian"] = "ro";
	    Locale["Russian"] = "ru";
	    Locale["SpanishES"] = "es-ES";
	    Locale["SpanishLATAM"] = "es-419";
	    Locale["Swedish"] = "sv-SE";
	    Locale["Thai"] = "th";
	    Locale["Turkish"] = "tr";
	    Locale["Ukrainian"] = "uk";
	    Locale["Vietnamese"] = "vi";
	})(Locale || (common$1.Locale = Locale = {}));
	
	return common$1;
}

var channel = {};

var hasRequiredChannel;

function requireChannel () {
	if (hasRequiredChannel) return channel;
	hasRequiredChannel = 1;
	Object.defineProperty(channel, "__esModule", { value: true });
	channel.ReactionType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/channel#get-reactions-reaction-types}
	 */
	var ReactionType;
	(function (ReactionType) {
	    ReactionType[ReactionType["Normal"] = 0] = "Normal";
	    ReactionType[ReactionType["Super"] = 1] = "Super";
	})(ReactionType || (channel.ReactionType = ReactionType = {}));
	
	return channel;
}

var monetization = {};

var hasRequiredMonetization;

function requireMonetization () {
	if (hasRequiredMonetization) return monetization;
	hasRequiredMonetization = 1;
	Object.defineProperty(monetization, "__esModule", { value: true });
	monetization.EntitlementOwnerType = void 0;
	/**
	 * @see {@link https://discord.com/developers/docs/resources/entitlement#create-test-entitlement}
	 */
	var EntitlementOwnerType;
	(function (EntitlementOwnerType) {
	    EntitlementOwnerType[EntitlementOwnerType["Guild"] = 1] = "Guild";
	    EntitlementOwnerType[EntitlementOwnerType["User"] = 2] = "User";
	})(EntitlementOwnerType || (monetization.EntitlementOwnerType = EntitlementOwnerType = {}));
	
	return monetization;
}

var hasRequiredV10$3;

function requireV10$3 () {
	if (hasRequiredV10$3) return v10$5;
	hasRequiredV10$3 = 1;
	(function (exports) {
		var __createBinding = (v10$5 && v10$5.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (v10$5 && v10$5.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.OAuth2Routes = exports.RouteBases = exports.CDNRoutes = exports.ImageFormat = exports.StickerPackApplicationId = exports.Routes = exports.APIVersion = void 0;
		const internals_1 = requireInternals();
		__exportStar(requireCommon$1(), exports);
		__exportStar(requireChannel(), exports);
		__exportStar(requireMonetization(), exports);
		exports.APIVersion = '10';
		exports.Routes = {
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/role-connections/metadata`
		     * - PUT `/applications/{application.id}/role-connections/metadata`
		     */
		    applicationRoleConnectionMetadata(applicationId) {
		        return `/applications/${applicationId}/role-connections/metadata`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/auto-moderation/rules`
		     * - POST `/guilds/{guild.id}/auto-moderation/rules`
		     */
		    guildAutoModerationRules(guildId) {
		        return `/guilds/${guildId}/auto-moderation/rules`;
		    },
		    /**
		     * Routes for:
		     * - GET    `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
		     * - PATCH  `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
		     * - DELETE `/guilds/{guild.id}/auto-moderation/rules/{rule.id}`
		     */
		    guildAutoModerationRule(guildId, ruleId) {
		        return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/audit-logs`
		     */
		    guildAuditLog(guildId) {
		        return `/guilds/${guildId}/audit-logs`;
		    },
		    /**
		     * Route for:
		     * - GET    `/channels/{channel.id}`
		     * - PATCH  `/channels/{channel.id}`
		     * - DELETE `/channels/{channel.id}`
		     */
		    channel(channelId) {
		        return `/channels/${channelId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/channels/{channel.id}/messages`
		     * - POST `/channels/{channel.id}/messages`
		     */
		    channelMessages(channelId) {
		        return `/channels/${channelId}/messages`;
		    },
		    /**
		     * Route for:
		     * - GET    `/channels/{channel.id}/messages/{message.id}`
		     * - PATCH  `/channels/{channel.id}/messages/{message.id}`
		     * - DELETE `/channels/{channel.id}/messages/{message.id}`
		     */
		    channelMessage(channelId, messageId) {
		        return `/channels/${channelId}/messages/${messageId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/messages/{message.id}/crosspost`
		     */
		    channelMessageCrosspost(channelId, messageId) {
		        return `/channels/${channelId}/messages/${messageId}/crosspost`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
		     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
		     *
		     * **Note**: You need to URL encode the emoji yourself
		     */
		    channelMessageOwnReaction(channelId, messageId, emoji) {
		        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
		    },
		    /**
		     * Route for:
		     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
		     *
		     * **Note**: You need to URL encode the emoji yourself
		     */
		    channelMessageUserReaction(channelId, messageId, emoji, userId) {
		        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET    `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
		     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
		     *
		     * **Note**: You need to URL encode the emoji yourself
		     */
		    channelMessageReaction(channelId, messageId, emoji) {
		        return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
		    },
		    /**
		     * Route for:
		     * - DELETE `/channels/{channel.id}/messages/{message.id}/reactions`
		     */
		    channelMessageAllReactions(channelId, messageId) {
		        return `/channels/${channelId}/messages/${messageId}/reactions`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/messages/bulk-delete`
		     */
		    channelBulkDelete(channelId) {
		        return `/channels/${channelId}/messages/bulk-delete`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/channels/{channel.id}/permissions/{overwrite.id}`
		     * - DELETE `/channels/{channel.id}/permissions/{overwrite.id}`
		     */
		    channelPermission(channelId, overwriteId) {
		        return `/channels/${channelId}/permissions/${overwriteId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/channels/{channel.id}/invites`
		     * - POST `/channels/{channel.id}/invites`
		     */
		    channelInvites(channelId) {
		        return `/channels/${channelId}/invites`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/followers`
		     */
		    channelFollowers(channelId) {
		        return `/channels/${channelId}/followers`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/typing`
		     */
		    channelTyping(channelId) {
		        return `/channels/${channelId}/typing`;
		    },
		    /**
		     * Route for:
		     * - GET `/channels/{channel.id}/messages/pins`
		     */
		    channelMessagesPins(channelId) {
		        return `/channels/${channelId}/messages/pins`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/channels/{channel.id}/messages/pins/{message.id}`
		     * - DELETE `/channels/{channel.id}/messages/pins/{message.id}`
		     */
		    channelMessagesPin(channelId, messageId) {
		        return `/channels/${channelId}/messages/pins/${messageId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/channels/{channel.id}/pins`
		     *
		     * @deprecated Use {@link Routes.channelMessagesPins} instead.
		     */
		    channelPins(channelId) {
		        return `/channels/${channelId}/pins`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/channels/{channel.id}/pins/{message.id}`
		     * - DELETE `/channels/{channel.id}/pins/{message.id}`
		     *
		     * @deprecated Use {@link Routes.channelMessagesPin} instead.
		     */
		    channelPin(channelId, messageId) {
		        return `/channels/${channelId}/pins/${messageId}`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/channels/{channel.id}/recipients/{user.id}`
		     * - DELETE `/channels/{channel.id}/recipients/{user.id}`
		     */
		    channelRecipient(channelId, userId) {
		        return `/channels/${channelId}/recipients/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/emojis`
		     * - POST `/guilds/{guild.id}/emojis`
		     */
		    guildEmojis(guildId) {
		        return `/guilds/${guildId}/emojis`;
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}/emojis/{emoji.id}`
		     * - PATCH  `/guilds/{guild.id}/emojis/{emoji.id}`
		     * - DELETE `/guilds/{guild.id}/emojis/{emoji.id}`
		     */
		    guildEmoji(guildId, emojiId) {
		        return `/guilds/${guildId}/emojis/${emojiId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/guilds`
		     *
		     * @deprecated {@link https://discord.com/developers/docs/change-log#guild-create-deprecation}
		     */
		    guilds() {
		        return '/guilds';
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}`
		     * - PATCH  `/guilds/{guild.id}`
		     * - DELETE `/guilds/{guild.id}` (**deprecated**)
		     */
		    guild(guildId) {
		        return `/guilds/${guildId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/preview`
		     */
		    guildPreview(guildId) {
		        return `/guilds/${guildId}/preview`;
		    },
		    /**
		     * Route for:
		     * - GET   `/guilds/{guild.id}/channels`
		     * - POST  `/guilds/{guild.id}/channels`
		     * - PATCH `/guilds/{guild.id}/channels`
		     */
		    guildChannels(guildId) {
		        return `/guilds/${guildId}/channels`;
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}/members/{user.id}`
		     * - PUT    `/guilds/{guild.id}/members/{user.id}`
		     * - PATCH  `/guilds/{guild.id}/members/@me`
		     * - PATCH  `/guilds/{guild.id}/members/{user.id}`
		     * - DELETE `/guilds/{guild.id}/members/{user.id}`
		     */
		    guildMember(guildId, userId = '@me') {
		        return `/guilds/${guildId}/members/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/members`
		     */
		    guildMembers(guildId) {
		        return `/guilds/${guildId}/members`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/members/search`
		     */
		    guildMembersSearch(guildId) {
		        return `/guilds/${guildId}/members/search`;
		    },
		    /**
		     * Route for:
		     * - PATCH `/guilds/{guild.id}/members/@me/nick`
		     *
		     * @deprecated Use {@link Routes.guildMember} instead.
		     */
		    guildCurrentMemberNickname(guildId) {
		        return `/guilds/${guildId}/members/@me/nick`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
		     * - DELETE `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
		     */
		    guildMemberRole(guildId, memberId, roleId) {
		        return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/guilds/{guild.id}/mfa`
		     *
		     * @deprecated
		     */
		    guildMFA(guildId) {
		        return `/guilds/${guildId}/mfa`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/bans`
		     */
		    guildBans(guildId) {
		        return `/guilds/${guildId}/bans`;
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}/bans/{user.id}`
		     * - PUT    `/guilds/{guild.id}/bans/{user.id}`
		     * - DELETE `/guilds/{guild.id}/bans/{user.id}`
		     */
		    guildBan(guildId, userId) {
		        return `/guilds/${guildId}/bans/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET   `/guilds/{guild.id}/roles`
		     * - POST  `/guilds/{guild.id}/roles`
		     * - PATCH `/guilds/{guild.id}/roles`
		     */
		    guildRoles(guildId) {
		        return `/guilds/${guildId}/roles`;
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}/roles/{role.id}`
		     * - PATCH  `/guilds/{guild.id}/roles/{role.id}`
		     * - DELETE `/guilds/{guild.id}/roles/{role.id}`
		     */
		    guildRole(guildId, roleId) {
		        return `/guilds/${guildId}/roles/${roleId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/prune`
		     * - POST `/guilds/{guild.id}/prune`
		     */
		    guildPrune(guildId) {
		        return `/guilds/${guildId}/prune`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/regions`
		     */
		    guildVoiceRegions(guildId) {
		        return `/guilds/${guildId}/regions`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/invites`
		     */
		    guildInvites(guildId) {
		        return `/guilds/${guildId}/invites`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/integrations`
		     */
		    guildIntegrations(guildId) {
		        return `/guilds/${guildId}/integrations`;
		    },
		    /**
		     * Route for:
		     * - DELETE `/guilds/{guild.id}/integrations/{integration.id}`
		     */
		    guildIntegration(guildId, integrationId) {
		        return `/guilds/${guildId}/integrations/${integrationId}`;
		    },
		    /**
		     * Route for:
		     * - GET   `/guilds/{guild.id}/widget`
		     * - PATCH `/guilds/{guild.id}/widget`
		     */
		    guildWidgetSettings(guildId) {
		        return `/guilds/${guildId}/widget`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/widget.json`
		     */
		    guildWidgetJSON(guildId) {
		        return `/guilds/${guildId}/widget.json`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/vanity-url`
		     */
		    guildVanityUrl(guildId) {
		        return `/guilds/${guildId}/vanity-url`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/widget.png`
		     */
		    guildWidgetImage(guildId) {
		        return `/guilds/${guildId}/widget.png`;
		    },
		    /**
		     * Route for:
		     * - GET    `/invites/{invite.code}`
		     * - DELETE `/invites/{invite.code}`
		     */
		    invite(code) {
		        return `/invites/${code}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/templates/{template.code}`
		     * - POST `/guilds/templates/{template.code}` (**deprecated**)
		     */
		    template(code) {
		        return `/guilds/templates/${code}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/templates`
		     * - POST `/guilds/{guild.id}/templates`
		     */
		    guildTemplates(guildId) {
		        return `/guilds/${guildId}/templates`;
		    },
		    /**
		     * Route for:
		     * - PUT    `/guilds/{guild.id}/templates/{template.code}`
		     * - PATCH  `/guilds/{guild.id}/templates/{template.code}`
		     * - DELETE `/guilds/{guild.id}/templates/{template.code}`
		     */
		    guildTemplate(guildId, code) {
		        return `/guilds/${guildId}/templates/${code}`;
		    },
		    /**
		     * Route for:
		     * - GET `/channels/{channel.id}/polls/{message.id}/answers/{answer_id}`
		     */
		    pollAnswerVoters(channelId, messageId, answerId) {
		        return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/polls/{message.id}/expire`
		     */
		    expirePoll(channelId, messageId) {
		        return `/channels/${channelId}/polls/${messageId}/expire`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/threads`
		     * - POST `/channels/{channel.id}/messages/{message.id}/threads`
		     */
		    threads(parentId, messageId) {
		        const parts = ['', 'channels', parentId];
		        if (messageId)
		            parts.push('messages', messageId);
		        parts.push('threads');
		        return parts.join('/');
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/threads/active`
		     */
		    guildActiveThreads(guildId) {
		        return `/guilds/${guildId}/threads/active`;
		    },
		    /**
		     * Route for:
		     * - GET `/channels/{channel.id}/threads/archived/public`
		     * - GET `/channels/{channel.id}/threads/archived/private`
		     */
		    channelThreads(channelId, archivedStatus) {
		        return `/channels/${channelId}/threads/archived/${archivedStatus}`;
		    },
		    /**
		     * Route for:
		     * - GET `/channels/{channel.id}/users/@me/threads/archived/private`
		     */
		    channelJoinedArchivedThreads(channelId) {
		        return `/channels/${channelId}/users/@me/threads/archived/private`;
		    },
		    /**
		     * Route for:
		     * - GET    `/channels/{thread.id}/thread-members`
		     * - GET    `/channels/{thread.id}/thread-members/{user.id}`
		     * - PUT    `/channels/{thread.id}/thread-members/@me`
		     * - PUT    `/channels/{thread.id}/thread-members/{user.id}`
		     * - DELETE `/channels/{thread.id}/thread-members/@me`
		     * - DELETE `/channels/{thread.id}/thread-members/{user.id}`
		     */
		    threadMembers(threadId, userId) {
		        const parts = ['', 'channels', threadId, 'thread-members'];
		        if (userId)
		            parts.push(userId);
		        return parts.join('/');
		    },
		    /**
		     * Route for:
		     * - GET   `/users/@me`
		     * - GET   `/users/{user.id}`
		     * - PATCH `/users/@me`
		     *
		     * @param userId - The user ID, defaulted to `@me`
		     */
		    user(userId = '@me') {
		        return `/users/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/users/@me/applications/{application.id}/role-connection`
		     * - PUT `/users/@me/applications/{application.id}/role-connection`
		     */
		    userApplicationRoleConnection(applicationId) {
		        return `/users/@me/applications/${applicationId}/role-connection`;
		    },
		    /**
		     * Route for:
		     * - GET `/users/@me/guilds`
		     */
		    userGuilds() {
		        return `/users/@me/guilds`;
		    },
		    /**
		     * Route for:
		     * - GET `/users/@me/guilds/{guild.id}/member`
		     */
		    userGuildMember(guildId) {
		        return `/users/@me/guilds/${guildId}/member`;
		    },
		    /**
		     * Route for:
		     * - DELETE `/users/@me/guilds/{guild.id}`
		     */
		    userGuild(guildId) {
		        return `/users/@me/guilds/${guildId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/users/@me/channels`
		     */
		    userChannels() {
		        return `/users/@me/channels`;
		    },
		    /**
		     * Route for:
		     * - GET `/users/@me/connections`
		     */
		    userConnections() {
		        return `/users/@me/connections`;
		    },
		    /**
		     * Route for:
		     * - GET `/voice/regions`
		     */
		    voiceRegions() {
		        return `/voice/regions`;
		    },
		    /**
		     * Route for:
		     * - GET  `/channels/{channel.id}/webhooks`
		     * - POST `/channels/{channel.id}/webhooks`
		     */
		    channelWebhooks(channelId) {
		        return `/channels/${channelId}/webhooks`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/webhooks`
		     */
		    guildWebhooks(guildId) {
		        return `/guilds/${guildId}/webhooks`;
		    },
		    /**
		     * Route for:
		     * - GET    `/webhooks/{webhook.id}`
		     * - GET    `/webhooks/{webhook.id}/{webhook.token}`
		     * - PATCH  `/webhooks/{webhook.id}`
		     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}`
		     * - DELETE `/webhooks/{webhook.id}`
		     * - DELETE `/webhooks/{webhook.id}/{webhook.token}`
		     * - POST   `/webhooks/{webhook.id}/{webhook.token}`
		     *
		     * - POST   `/webhooks/{application.id}/{interaction.token}`
		     */
		    webhook(webhookId, webhookToken) {
		        const parts = ['', 'webhooks', webhookId];
		        if (webhookToken)
		            parts.push(webhookToken);
		        return parts.join('/');
		    },
		    /**
		     * Route for:
		     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
		     * - GET    `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
		     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
		     * - PATCH  `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
		     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/@original`
		     * - DELETE `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
		     *
		     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/@original`
		     * - PATCH  `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
		     * - DELETE `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
		     */
		    webhookMessage(webhookId, webhookToken, messageId = '@original') {
		        return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/webhooks/{webhook.id}/{webhook.token}/github`
		     * - POST `/webhooks/{webhook.id}/{webhook.token}/slack`
		     */
		    webhookPlatform(webhookId, webhookToken, platform) {
		        return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
		    },
		    /**
		     * Route for:
		     * - GET `/gateway`
		     */
		    gateway() {
		        return `/gateway`;
		    },
		    /**
		     * Route for:
		     * - GET `/gateway/bot`
		     */
		    gatewayBot() {
		        return `/gateway/bot`;
		    },
		    /**
		     * Route for:
		     * - GET `/oauth2/applications/@me`
		     */
		    oauth2CurrentApplication() {
		        return `/oauth2/applications/@me`;
		    },
		    /**
		     * Route for:
		     * - GET `/oauth2/@me`
		     */
		    oauth2CurrentAuthorization() {
		        return `/oauth2/@me`;
		    },
		    /**
		     * Route for:
		     * - GET `/oauth2/authorize`
		     */
		    oauth2Authorization() {
		        return `/oauth2/authorize`;
		    },
		    /**
		     * Route for:
		     * - POST `/oauth2/token`
		     */
		    oauth2TokenExchange() {
		        return `/oauth2/token`;
		    },
		    /**
		     * Route for:
		     * - POST `/oauth2/token/revoke`
		     */
		    oauth2TokenRevocation() {
		        return `/oauth2/token/revoke`;
		    },
		    /**
		     * Route for:
		     * - GET  `/applications/{application.id}/commands`
		     * - PUT  `/applications/{application.id}/commands`
		     * - POST `/applications/{application.id}/commands`
		     */
		    applicationCommands(applicationId) {
		        return `/applications/${applicationId}/commands`;
		    },
		    /**
		     * Route for:
		     * - GET    `/applications/{application.id}/commands/{command.id}`
		     * - PATCH  `/applications/{application.id}/commands/{command.id}`
		     * - DELETE `/applications/{application.id}/commands/{command.id}`
		     */
		    applicationCommand(applicationId, commandId) {
		        return `/applications/${applicationId}/commands/${commandId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/applications/{application.id}/guilds/{guild.id}/commands`
		     * - PUT  `/applications/{application.id}/guilds/{guild.id}/commands`
		     * - POST `/applications/{application.id}/guilds/{guild.id}/commands`
		     */
		    applicationGuildCommands(applicationId, guildId) {
		        return `/applications/${applicationId}/guilds/${guildId}/commands`;
		    },
		    /**
		     * Route for:
		     * - GET    `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
		     * - PATCH  `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
		     * - DELETE `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
		     */
		    applicationGuildCommand(applicationId, guildId, commandId) {
		        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/interactions/{interaction.id}/{interaction.token}/callback`
		     */
		    interactionCallback(interactionId, interactionToken) {
		        return `/interactions/${interactionId}/${interactionToken}/callback`;
		    },
		    /**
		     * Route for:
		     * - GET   `/guilds/{guild.id}/member-verification`
		     * - PATCH `/guilds/{guild.id}/member-verification`
		     *
		     * @unstable https://github.com/discord/discord-api-docs/pull/2547
		     */
		    guildMemberVerification(guildId) {
		        return `/guilds/${guildId}/member-verification`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/voice-states/@me`
		     * - GET `/guilds/{guild.id}/voice-states/{user.id}`
		     * - PATCH `/guilds/{guild.id}/voice-states/@me`
		     * - PATCH `/guilds/{guild.id}/voice-states/{user.id}`
		     */
		    guildVoiceState(guildId, userId = '@me') {
		        return `/guilds/${guildId}/voice-states/${userId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
		     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
		     */
		    guildApplicationCommandsPermissions(applicationId, guildId) {
		        return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
		     * - PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
		     */
		    applicationCommandPermissions(applicationId, guildId, commandId) {
		        return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
		    },
		    /**
		     * Route for:
		     * - GET   `/guilds/{guild.id}/welcome-screen`
		     * - PATCH `/guilds/{guild.id}/welcome-screen`
		     */
		    guildWelcomeScreen(guildId) {
		        return `/guilds/${guildId}/welcome-screen`;
		    },
		    /**
		     * Route for:
		     * - POST `/stage-instances`
		     */
		    stageInstances() {
		        return `/stage-instances`;
		    },
		    /**
		     * Route for:
		     * - GET `/stage-instances/{channel.id}`
		     * - PATCH `/stage-instances/{channel.id}`
		     * - DELETE `/stage-instances/{channel.id}`
		     */
		    stageInstance(channelId) {
		        return `/stage-instances/${channelId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/stickers/{sticker.id}`
		     */
		    sticker(stickerId) {
		        return `/stickers/${stickerId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/sticker-packs`
		     */
		    stickerPacks() {
		        return '/sticker-packs';
		    },
		    /**
		     * Route for:
		     * - GET `/sticker-packs/{pack.id}`
		     */
		    stickerPack(packId) {
		        return `/sticker-packs/${packId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/sticker-packs`
		     *
		     * @deprecated Use {@link Routes.stickerPacks} instead.
		     */
		    nitroStickerPacks() {
		        return '/sticker-packs';
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/stickers`
		     * - POST `/guilds/{guild.id}/stickers`
		     */
		    guildStickers(guildId) {
		        return `/guilds/${guildId}/stickers`;
		    },
		    /**
		     * Route for:
		     * - GET    `/guilds/{guild.id}/stickers/{sticker.id}`
		     * - PATCH  `/guilds/{guild.id}/stickers/{sticker.id}`
		     * - DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
		     */
		    guildSticker(guildId, stickerId) {
		        return `/guilds/${guildId}/stickers/${stickerId}`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/scheduled-events`
		     * - POST `/guilds/{guild.id}/scheduled-events`
		     */
		    guildScheduledEvents(guildId) {
		        return `/guilds/${guildId}/scheduled-events`;
		    },
		    /**
		     * Route for:
		     * - GET  `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
		     * - PATCH `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
		     * - DELETE `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}`
		     */
		    guildScheduledEvent(guildId, guildScheduledEventId) {
		        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/scheduled-events/{guildScheduledEvent.id}/users`
		     */
		    guildScheduledEventUsers(guildId, guildScheduledEventId) {
		        return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/onboarding`
		     * - PUT `/guilds/{guild.id}/onboarding`
		     */
		    guildOnboarding(guildId) {
		        return `/guilds/${guildId}/onboarding`;
		    },
		    /**
		     * Route for:
		     * - PUT `/guilds/${guild.id}/incident-actions`
		     */
		    guildIncidentActions(guildId) {
		        return `/guilds/${guildId}/incident-actions`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/@me`
		     * - PATCH `/applications/@me`
		     */
		    currentApplication() {
		        return '/applications/@me';
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/entitlements`
		     * - POST `/applications/{application.id}/entitlements`
		     */
		    entitlements(applicationId) {
		        return `/applications/${applicationId}/entitlements`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/entitlements/{entitlement.id}`
		     * - DELETE `/applications/{application.id}/entitlements/{entitlement.id}`
		     */
		    entitlement(applicationId, entitlementId) {
		        return `/applications/${applicationId}/entitlements/${entitlementId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/skus`
		     */
		    skus(applicationId) {
		        return `/applications/${applicationId}/skus`;
		    },
		    /**
		     * Route for:
		     * - POST `/guilds/{guild.id}/bulk-ban`
		     */
		    guildBulkBan(guildId) {
		        return `/guilds/${guildId}/bulk-ban`;
		    },
		    /**
		     * Route for:
		     * - POST `/applications/{application.id}/entitlements/{entitlement.id}/consume`
		     */
		    consumeEntitlement(applicationId, entitlementId) {
		        return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/emojis`
		     * - POST `/applications/{application.id}/emojis`
		     */
		    applicationEmojis(applicationId) {
		        return `/applications/${applicationId}/emojis`;
		    },
		    /**
		     * Route for:
		     * - GET `/applications/{application.id}/emojis/{emoji.id}`
		     * - PATCH `/applications/{application.id}/emojis/{emoji.id}`
		     * - DELETE `/applications/{application.id}/emojis/{emoji.id}`
		     */
		    applicationEmoji(applicationId, emojiId) {
		        return `/applications/${applicationId}/emojis/${emojiId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/skus/{sku.id}/subscriptions`
		     */
		    skuSubscriptions(skuId) {
		        return `/skus/${skuId}/subscriptions`;
		    },
		    /**
		     * Route for:
		     * - GET `/skus/{sku.id}/subscriptions/{subscription.id}`
		     */
		    skuSubscription(skuId, subscriptionId) {
		        return `/skus/${skuId}/subscriptions/${subscriptionId}`;
		    },
		    /**
		     * Route for:
		     * - POST `/channels/{channel.id}/send-soundboard-sound`
		     */
		    sendSoundboardSound(channelId) {
		        return `/channels/${channelId}/send-soundboard-sound`;
		    },
		    /**
		     * Route for:
		     * - GET `/soundboard-default-sounds`
		     */
		    soundboardDefaultSounds() {
		        return '/soundboard-default-sounds';
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/soundboard-sounds`
		     * - POST `/guilds/{guild.id}/soundboard-sounds`
		     */
		    guildSoundboardSounds(guildId) {
		        return `/guilds/${guildId}/soundboard-sounds`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
		     * - PATCH `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
		     * - DELETE `/guilds/{guild.id}/soundboard-sounds/{sound.id}`
		     */
		    guildSoundboardSound(guildId, soundId) {
		        return `/guilds/${guildId}/soundboard-sounds/${soundId}`;
		    },
		};
		for (const [key, fn] of Object.entries(exports.Routes)) {
		    exports.Routes[key] = (...args) => {
		        const escaped = args.map((arg) => {
		            if (arg) {
		                // Skip already "safe" urls
		                if (internals_1.urlSafeCharacters.test(String(arg))) {
		                    return arg;
		                }
		                return encodeURIComponent(arg);
		            }
		            return arg;
		        });
		        // eslint-disable-next-line no-useless-call
		        return fn.call(null, ...escaped);
		    };
		}
		// Freeze the object so it can't be changed
		Object.freeze(exports.Routes);
		exports.StickerPackApplicationId = '710982414301790216';
		var ImageFormat;
		(function (ImageFormat) {
		    ImageFormat["JPEG"] = "jpeg";
		    ImageFormat["PNG"] = "png";
		    ImageFormat["WebP"] = "webp";
		    ImageFormat["GIF"] = "gif";
		    ImageFormat["Lottie"] = "json";
		})(ImageFormat || (exports.ImageFormat = ImageFormat = {}));
		exports.CDNRoutes = {
		    /**
		     * Route for:
		     * - GET `/emojis/{emoji.id}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    emoji(emojiId, format) {
		        return `/emojis/${emojiId}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/icons/{guild.id}/{guild.icon}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    guildIcon(guildId, guildIcon, format) {
		        return `/icons/${guildId}/${guildIcon}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/splashes/{guild.id}/{guild.splash}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    guildSplash(guildId, guildSplash, format) {
		        return `/splashes/${guildId}/${guildSplash}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/discovery-splashes/{guild.id}/{guild.discovery_splash}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
		        return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/banners/{guild.id}/{guild.banner}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    guildBanner(guildId, guildBanner, format) {
		        return `/banners/${guildId}/${guildBanner}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/banners/{user.id}/{user.banner}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    userBanner(userId, userBanner, format) {
		        return `/banners/${userId}/${userBanner}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/embed/avatars/{index}.png`
		     *
		     * The value for `index` parameter depends on whether the user is {@link https://discord.com/developers/docs/change-log#unique-usernames-on-discord | migrated to the new username system}.
		     * For users on the new username system, `index` will be `(user.id >> 22) % 6`.
		     * For users on the legacy username system, `index` will be `user.discriminator % 5`.
		     *
		     * This route supports the extension: PNG
		     */
		    defaultUserAvatar(index) {
		        return `/embed/avatars/${index}.png`;
		    },
		    /**
		     * Route for:
		     * - GET `/avatars/{user.id}/{user.avatar}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    userAvatar(userId, userAvatar, format) {
		        return `/avatars/${userId}/${userAvatar}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/{guild.id}/users/{user.id}/avatars/{guild_member.avatar}.{png|jpeg|webp|gif}`
		     *
		     * As this route supports GIFs, the hash will begin with `a_` if it is available in GIF format
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    guildMemberAvatar(guildId, userId, memberAvatar, format) {
		        return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/avatar-decorations/{user.id}/{user.avatar_decoration}.png`
		     *
		     * This route supports the extension: PNG
		     *
		     * @deprecated Use {@link CDNRoutes.avatarDecoration} instead.
		     */
		    userAvatarDecoration(userId, userAvatarDecoration) {
		        return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
		    },
		    /**
		     * Route for:
		     * - GET `/avatar-decoration-presets/{avatar_decoration_data_asset}.png`
		     *
		     * This route supports the extension: PNG
		     */
		    avatarDecoration(avatarDecorationDataAsset) {
		        return `/avatar-decoration-presets/${avatarDecorationDataAsset}.png`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-icons/{application.id}/{application.icon}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    applicationIcon(applicationId, applicationIcon, format) {
		        return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-icons/{application.id}/{application.cover_image}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    applicationCover(applicationId, applicationCoverImage, format) {
		        return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-assets/{application.id}/{application.asset_id}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    applicationAsset(applicationId, applicationAssetId, format) {
		        return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-assets/{application.id}/achievements/{achievement.id}/icons/{achievement.icon}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    achievementIcon(applicationId, achievementId, achievementIconHash, format) {
		        return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-assets/710982414301790216/store/{sticker_pack.banner.asset_id}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    stickerPackBanner(stickerPackBannerAssetId, format) {
		        return `/app-assets/${exports.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/app-assets/${application.id}/store/${asset.id}.{png|jpeg|webp}}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    storePageAsset(applicationId, assetId, format = ImageFormat.PNG) {
		        return `/app-assets/${applicationId}/store/${assetId}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/team-icons/{team.id}/{team.icon}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    teamIcon(teamId, teamIcon, format) {
		        return `/team-icons/${teamId}/${teamIcon}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/stickers/{sticker.id}.{png|json}`
		     *
		     * This route supports the extensions: PNG, Lottie, GIF
		     */
		    sticker(stickerId, format) {
		        return `/stickers/${stickerId}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/role-icons/{role.id}/{role.icon}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    roleIcon(roleId, roleIcon, format) {
		        return `/role-icons/${roleId}/${roleIcon}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guild-events/{guild_scheduled_event.id}/{guild_scheduled_event.image}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
		        return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guilds/${guild.id}/users/${user.id}/banners/${guild_member.banner}.{png|jpeg|webp|gif}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP, GIF
		     */
		    guildMemberBanner(guildId, userId, guildMemberBanner, format) {
		        return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
		    },
		    /**
		     * Route for:
		     * - GET `/soundboard-sounds/${sound.id}`
		     */
		    soundboardSound(soundId) {
		        return `/soundboard-sounds/${soundId}`;
		    },
		    /**
		     * Route for:
		     * - GET `/guild-tag-badges/{guild.id}/{badge}.{png|jpeg|webp}`
		     *
		     * This route supports the extensions: PNG, JPEG, WebP
		     */
		    guildTagBadge(guildId, guildTagBadge, format) {
		        return `/guild-tag-badges/${guildId}/${guildTagBadge}.${format}`;
		    },
		};
		for (const [key, fn] of Object.entries(exports.CDNRoutes)) {
		    exports.CDNRoutes[key] = (...args) => {
		        const escaped = args.map((arg) => {
		            if (arg) {
		                // Skip already "safe" urls
		                if (internals_1.urlSafeCharacters.test(String(arg))) {
		                    return arg;
		                }
		                return encodeURIComponent(arg);
		            }
		            return arg;
		        });
		        // eslint-disable-next-line no-useless-call
		        return fn.call(null, ...escaped);
		    };
		}
		// Freeze the object so it can't be changed
		Object.freeze(exports.CDNRoutes);
		exports.RouteBases = {
		    api: `https://discord.com/api/v${exports.APIVersion}`,
		    cdn: 'https://cdn.discordapp.com',
		    media: 'https://media.discordapp.net',
		    invite: 'https://discord.gg',
		    template: 'https://discord.new',
		    gift: 'https://discord.gift',
		    scheduledEvent: 'https://discord.com/events',
		};
		// Freeze bases object
		Object.freeze(exports.RouteBases);
		exports.OAuth2Routes = {
		    authorizationURL: `${exports.RouteBases.api}${exports.Routes.oauth2Authorization()}`,
		    tokenURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenExchange()}`,
		    /**
		     * @see {@link https://tools.ietf.org/html/rfc7009}
		     */
		    tokenRevocationURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenRevocation()}`,
		};
		// Freeze OAuth2 route object
		Object.freeze(exports.OAuth2Routes);
		
	} (v10$5));
	return v10$5;
}

var v10Exports$3 = requireV10$3();
var mod$4 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports$3);

const APIVersion = mod$4.APIVersion;
const CDNRoutes = mod$4.CDNRoutes;
const EntitlementOwnerType = mod$4.EntitlementOwnerType;
const ImageFormat = mod$4.ImageFormat;
const Locale = mod$4.Locale;
const OAuth2Routes = mod$4.OAuth2Routes;
const RESTJSONErrorCodes = mod$4.RESTJSONErrorCodes;
const ReactionType = mod$4.ReactionType;
const RouteBases = mod$4.RouteBases;
const Routes = mod$4.Routes;
const StickerPackApplicationId = mod$4.StickerPackApplicationId;

var v10$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APIVersion: APIVersion,
  CDNRoutes: CDNRoutes,
  EntitlementOwnerType: EntitlementOwnerType,
  ImageFormat: ImageFormat,
  Locale: Locale,
  OAuth2Routes: OAuth2Routes,
  RESTJSONErrorCodes: RESTJSONErrorCodes,
  ReactionType: ReactionType,
  RouteBases: RouteBases,
  Routes: Routes,
  StickerPackApplicationId: StickerPackApplicationId,
  default: mod$4
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(v10$4);

var v10$3 = {};

var common = {};

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	Object.defineProperty(common, "__esModule", { value: true });
	common.RPCCloseEventCodes = common.RPCErrorCodes = common.RelationshipType = common.VoiceConnectionStates = common.RPCVoiceShortcutKeyComboKeyType = common.RPCVoiceSettingsModeType = common.RPCDeviceType = void 0;
	var RPCDeviceType;
	(function (RPCDeviceType) {
	    RPCDeviceType["AudioInput"] = "audioinput";
	    RPCDeviceType["AudioOutput"] = "audiooutput";
	    RPCDeviceType["VideoInput"] = "videoinput";
	})(RPCDeviceType || (common.RPCDeviceType = RPCDeviceType = {}));
	var RPCVoiceSettingsModeType;
	(function (RPCVoiceSettingsModeType) {
	    RPCVoiceSettingsModeType["PushToTalk"] = "PUSH_TO_TALK";
	    RPCVoiceSettingsModeType["VoiceActivity"] = "VOICE_ACTIVITY";
	})(RPCVoiceSettingsModeType || (common.RPCVoiceSettingsModeType = RPCVoiceSettingsModeType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-key-types}
	 */
	var RPCVoiceShortcutKeyComboKeyType;
	(function (RPCVoiceShortcutKeyComboKeyType) {
	    RPCVoiceShortcutKeyComboKeyType[RPCVoiceShortcutKeyComboKeyType["KeyboardKey"] = 0] = "KeyboardKey";
	    RPCVoiceShortcutKeyComboKeyType[RPCVoiceShortcutKeyComboKeyType["MouseButton"] = 1] = "MouseButton";
	    RPCVoiceShortcutKeyComboKeyType[RPCVoiceShortcutKeyComboKeyType["KeyboardModifierKey"] = 2] = "KeyboardModifierKey";
	    RPCVoiceShortcutKeyComboKeyType[RPCVoiceShortcutKeyComboKeyType["GamepadButton"] = 3] = "GamepadButton";
	})(RPCVoiceShortcutKeyComboKeyType || (common.RPCVoiceShortcutKeyComboKeyType = RPCVoiceShortcutKeyComboKeyType = {}));
	var VoiceConnectionStates;
	(function (VoiceConnectionStates) {
	    /**
	     * TCP disconnected
	     */
	    VoiceConnectionStates["Disconnected"] = "DISCONNECTED";
	    /**
	     * Waiting for voice endpoint
	     */
	    VoiceConnectionStates["AwaitingEndpoint"] = "AWAITING_ENDPOINT";
	    /**
	     * TCP authenticating
	     */
	    VoiceConnectionStates["Authenticating"] = "AUTHENTICATING";
	    /**
	     * TCP connecting
	     */
	    VoiceConnectionStates["Connecting"] = "CONNECTING";
	    /**
	     * TCP connected
	     */
	    VoiceConnectionStates["Connected"] = "CONNECTED";
	    /**
	     * TCP connected, Voice disconnected
	     */
	    VoiceConnectionStates["VoiceDisconnected"] = "VOICE_DISCONNECTED";
	    /**
	     * TCP connected, Voice connecting
	     */
	    VoiceConnectionStates["VoiceConnecting"] = "VOICE_CONNECTING";
	    /**
	     * TCP connected, Voice connected
	     */
	    VoiceConnectionStates["VoiceConnected"] = "VOICE_CONNECTED";
	    /**
	     * No route to host
	     */
	    VoiceConnectionStates["NoRoute"] = "NO_ROUTE";
	    /**
	     * WebRTC ice checking
	     */
	    VoiceConnectionStates["IceChecking"] = "ICE_CHECKING";
	})(VoiceConnectionStates || (common.VoiceConnectionStates = VoiceConnectionStates = {}));
	/**
	 * @unstable
	 */
	var RelationshipType;
	(function (RelationshipType) {
	    RelationshipType[RelationshipType["None"] = 0] = "None";
	    RelationshipType[RelationshipType["Friend"] = 1] = "Friend";
	    RelationshipType[RelationshipType["Blocked"] = 2] = "Blocked";
	    RelationshipType[RelationshipType["PendingIncoming"] = 3] = "PendingIncoming";
	    RelationshipType[RelationshipType["PendingOutgoing"] = 4] = "PendingOutgoing";
	    RelationshipType[RelationshipType["Implicit"] = 5] = "Implicit";
	})(RelationshipType || (common.RelationshipType = RelationshipType = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes}
	 */
	var RPCErrorCodes;
	(function (RPCErrorCodes) {
	    /**
	     * An unknown error occurred.
	     */
	    RPCErrorCodes[RPCErrorCodes["UnknownError"] = 1000] = "UnknownError";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["ServiceUnavailable"] = 1001] = "ServiceUnavailable";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["TransactionAborted"] = 1002] = "TransactionAborted";
	    /**
	     * You sent an invalid payload.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidPayload"] = 4000] = "InvalidPayload";
	    /**
	     * Invalid command name specified.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidCommand"] = 4002] = "InvalidCommand";
	    /**
	     * Invalid guild ID specified.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidGuild"] = 4003] = "InvalidGuild";
	    /**
	     * Invalid event name specified.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidEvent"] = 4004] = "InvalidEvent";
	    /**
	     * Invalid channel ID specified.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidChannel"] = 4005] = "InvalidChannel";
	    /**
	     * You lack permissions to access the given resource.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidPermissions"] = 4006] = "InvalidPermissions";
	    /**
	     * An invalid OAuth2 application ID was used to authorize or authenticate with.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidClientId"] = 4007] = "InvalidClientId";
	    /**
	     * An invalid OAuth2 application origin was used to authorize or authenticate with.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidOrigin"] = 4008] = "InvalidOrigin";
	    /**
	     * An invalid OAuth2 token was used to authorize or authenticate with.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidToken"] = 4009] = "InvalidToken";
	    /**
	     * The specified user ID was invalid.
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidUser"] = 4010] = "InvalidUser";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidInvite"] = 4011] = "InvalidInvite";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidActivityJoinRequest"] = 4012] = "InvalidActivityJoinRequest";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidEntitlement"] = 4013] = "InvalidEntitlement";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidGiftCode"] = 4014] = "InvalidGiftCode";
	    /**
	     * A standard OAuth2 error occurred; check the data object for the OAuth2 error details.
	     */
	    RPCErrorCodes[RPCErrorCodes["OAuth2Error"] = 5000] = "OAuth2Error";
	    /**
	     * An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out.
	     */
	    RPCErrorCodes[RPCErrorCodes["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
	    /**
	     * An asynchronous `GET_GUILD` command timed out.
	     */
	    RPCErrorCodes[RPCErrorCodes["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
	    /**
	     * You tried to join a user to a voice channel but the user was already in one.
	     */
	    RPCErrorCodes[RPCErrorCodes["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
	    /**
	     * You tried to capture more than one shortcut key at once.
	     */
	    RPCErrorCodes[RPCErrorCodes["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["InvalidActivitySecret"] = 5005] = "InvalidActivitySecret";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["NoEligibleActivity"] = 5006] = "NoEligibleActivity";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["PurchaseCanceled"] = 5007] = "PurchaseCanceled";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["PurchaseError"] = 5008] = "PurchaseError";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["UnauthorizedForAchievement"] = 5009] = "UnauthorizedForAchievement";
	    /**
	     * @unstable
	     */
	    RPCErrorCodes[RPCErrorCodes["RateLimited"] = 5010] = "RateLimited";
	})(RPCErrorCodes || (common.RPCErrorCodes = RPCErrorCodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes}
	 */
	var RPCCloseEventCodes;
	(function (RPCCloseEventCodes) {
	    /**
	     * @unstable
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["CloseNormal"] = 1000] = "CloseNormal";
	    /**
	     * @unstable
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["CloseUnsupported"] = 1003] = "CloseUnsupported";
	    /**
	     * @unstable
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["CloseAbnormal"] = 1006] = "CloseAbnormal";
	    /**
	     * You connected to the RPC server with an invalid client ID.
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["InvalidClientId"] = 4000] = "InvalidClientId";
	    /**
	     * You connected to the RPC server with an invalid origin.
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["InvalidOrigin"] = 4001] = "InvalidOrigin";
	    /**
	     * You are being rate limited.
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["RateLimited"] = 4002] = "RateLimited";
	    /**
	     * The OAuth2 token associated with a connection was revoked, get a new one!
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["TokenRevoked"] = 4003] = "TokenRevoked";
	    /**
	     * The RPC Server version specified in the connection string was not valid.
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["InvalidVersion"] = 4004] = "InvalidVersion";
	    /**
	     * The encoding specified in the connection string was not valid.
	     */
	    RPCCloseEventCodes[RPCCloseEventCodes["InvalidEncoding"] = 4005] = "InvalidEncoding";
	})(RPCCloseEventCodes || (common.RPCCloseEventCodes = RPCCloseEventCodes = {}));
	
	return common;
}

var hasRequiredV10$2;

function requireV10$2 () {
	if (hasRequiredV10$2) return v10$3;
	hasRequiredV10$2 = 1;
	(function (exports) {
		var __createBinding = (v10$3 && v10$3.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (v10$3 && v10$3.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.RPCEvents = exports.RPCCommands = exports.RPCVersion = void 0;
		__exportStar(requireCommon(), exports);
		exports.RPCVersion = '1';
		/**
		 * @see {@link https://discord.com/developers/docs/topics/rpc#commands-and-events-rpc-commands}
		 */
		var RPCCommands;
		(function (RPCCommands) {
		    /**
		     * @unstable
		     */
		    RPCCommands["AcceptActivityInvite"] = "ACCEPT_ACTIVITY_INVITE";
		    /**
		     * @unstable
		     */
		    RPCCommands["ActivityInviteUser"] = "ACTIVITY_INVITE_USER";
		    /**
		     * Used to authenticate an existing client with your app
		     */
		    RPCCommands["Authenticate"] = "AUTHENTICATE";
		    /**
		     * Used to authorize a new client with your app
		     */
		    RPCCommands["Authorize"] = "AUTHORIZE";
		    /**
		     * @unstable
		     */
		    RPCCommands["BraintreePopupBridgeCallback"] = "BRAINTREE_POPUP_BRIDGE_CALLBACK";
		    /**
		     * @unstable
		     */
		    RPCCommands["BrowserHandoff"] = "BROWSER_HANDOFF";
		    /**
		     * 	used to reject a Rich Presence Ask to Join request
		     *
		     * @unstable the documented similarly named command `CLOSE_ACTIVITY_REQUEST` does not exist, but `CLOSE_ACTIVITY_JOIN_REQUEST` does
		     */
		    RPCCommands["CloseActivityJoinRequest"] = "CLOSE_ACTIVITY_JOIN_REQUEST";
		    /**
		     * @unstable
		     */
		    RPCCommands["ConnectionsCallback"] = "CONNECTIONS_CALLBACK";
		    RPCCommands["CreateChannelInvite"] = "CREATE_CHANNEL_INVITE";
		    /**
		     * @unstable
		     */
		    RPCCommands["DeepLink"] = "DEEP_LINK";
		    /**
		     * Event dispatch
		     */
		    RPCCommands["Dispatch"] = "DISPATCH";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetApplicationTicket"] = "GET_APPLICATION_TICKET";
		    /**
		     * Used to retrieve channel information from the client
		     */
		    RPCCommands["GetChannel"] = "GET_CHANNEL";
		    /**
		     * Used to retrieve a list of channels for a guild from the client
		     */
		    RPCCommands["GetChannels"] = "GET_CHANNELS";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetEntitlementTicket"] = "GET_ENTITLEMENT_TICKET";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetEntitlements"] = "GET_ENTITLEMENTS";
		    /**
		     * Used to retrieve guild information from the client
		     */
		    RPCCommands["GetGuild"] = "GET_GUILD";
		    /**
		     * Used to retrieve a list of guilds from the client
		     */
		    RPCCommands["GetGuilds"] = "GET_GUILDS";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetImage"] = "GET_IMAGE";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetNetworkingConfig"] = "GET_NETWORKING_CONFIG";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetRelationships"] = "GET_RELATIONSHIPS";
		    /**
		     * Used to get the current voice channel the client is in
		     */
		    RPCCommands["GetSelectedVoiceChannel"] = "GET_SELECTED_VOICE_CHANNEL";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetSkus"] = "GET_SKUS";
		    /**
		     * @unstable
		     */
		    RPCCommands["GetUser"] = "GET_USER";
		    /**
		     * Used to retrieve the client's voice settings
		     */
		    RPCCommands["GetVoiceSettings"] = "GET_VOICE_SETTINGS";
		    /**
		     * @unstable
		     */
		    RPCCommands["GiftCodeBrowser"] = "GIFT_CODE_BROWSER";
		    /**
		     * @unstable
		     */
		    RPCCommands["GuildTemplateBrowser"] = "GUILD_TEMPLATE_BROWSER";
		    /**
		     * @unstable
		     */
		    RPCCommands["InviteBrowser"] = "INVITE_BROWSER";
		    /**
		     * @unstable
		     */
		    RPCCommands["NetworkingCreateToken"] = "NETWORKING_CREATE_TOKEN";
		    /**
		     * @unstable
		     */
		    RPCCommands["NetworkingPeerMetrics"] = "NETWORKING_PEER_METRICS";
		    /**
		     * @unstable
		     */
		    RPCCommands["NetworkingSystemMetrics"] = "NETWORKING_SYSTEM_METRICS";
		    /**
		     * @unstable
		     */
		    RPCCommands["OpenOverlayActivityInvite"] = "OPEN_OVERLAY_ACTIVITY_INVITE";
		    /**
		     * @unstable
		     */
		    RPCCommands["OpenOverlayGuildInvite"] = "OPEN_OVERLAY_GUILD_INVITE";
		    /**
		     * @unstable
		     */
		    RPCCommands["OpenOverlayVoiceSettings"] = "OPEN_OVERLAY_VOICE_SETTINGS";
		    /**
		     * @unstable
		     */
		    RPCCommands["Overlay"] = "OVERLAY";
		    /**
		     * Used to join or leave a text channel, group dm, or dm
		     */
		    RPCCommands["SelectTextChannel"] = "SELECT_TEXT_CHANNEL";
		    /**
		     * Used to join or leave a voice channel, group dm, or dm
		     */
		    RPCCommands["SelectVoiceChannel"] = "SELECT_VOICE_CHANNEL";
		    /**
		     * Used to consent to a Rich Presence Ask to Join request
		     */
		    RPCCommands["SendActivityJoinInvite"] = "SEND_ACTIVITY_JOIN_INVITE";
		    /**
		     * Used to update a user's Rich Presence
		     */
		    RPCCommands["SetActivity"] = "SET_ACTIVITY";
		    /**
		     * Used to send info about certified hardware devices
		     */
		    RPCCommands["SetCertifiedDevices"] = "SET_CERTIFIED_DEVICES";
		    /**
		     * @unstable
		     */
		    RPCCommands["SetOverlayLocked"] = "SET_OVERLAY_LOCKED";
		    /**
		     * Used to change voice settings of users in voice channels
		     */
		    RPCCommands["SetUserVoiceSettings"] = "SET_USER_VOICE_SETTINGS";
		    RPCCommands["SetUserVoiceSettings2"] = "SET_USER_VOICE_SETTINGS_2";
		    /**
		     * Used to set the client's voice settings
		     */
		    RPCCommands["SetVoiceSettings"] = "SET_VOICE_SETTINGS";
		    RPCCommands["SetVoiceSettings2"] = "SET_VOICE_SETTINGS_2";
		    /**
		     * @unstable
		     */
		    RPCCommands["StartPurchase"] = "START_PURCHASE";
		    /**
		     * Used to subscribe to an RPC event
		     */
		    RPCCommands["Subscribe"] = "SUBSCRIBE";
		    /**
		     * Used to unsubscribe from an RPC event
		     */
		    RPCCommands["Unsubscribe"] = "UNSUBSCRIBE";
		    /**
		     * @unstable
		     */
		    RPCCommands["ValidateApplication"] = "VALIDATE_APPLICATION";
		})(RPCCommands || (exports.RPCCommands = RPCCommands = {}));
		/**
		 * @see {@link https://discord.com/developers/docs/topics/rpc#commands-and-events-rpc-events}
		 */
		var RPCEvents;
		(function (RPCEvents) {
		    /**
		     * @unstable
		     */
		    RPCEvents["ActivityInvite"] = "ACTIVITY_INVITE";
		    RPCEvents["ActivityJoin"] = "ACTIVITY_JOIN";
		    RPCEvents["ActivityJoinRequest"] = "ACTIVITY_JOIN_REQUEST";
		    RPCEvents["ActivitySpectate"] = "ACTIVITY_SPECTATE";
		    RPCEvents["ChannelCreate"] = "CHANNEL_CREATE";
		    RPCEvents["CurrentUserUpdate"] = "CURRENT_USER_UPDATE";
		    /**
		     * @unstable
		     */
		    RPCEvents["EntitlementCreate"] = "ENTITLEMENT_CREATE";
		    /**
		     * @unstable
		     */
		    RPCEvents["EntitlementDelete"] = "ENTITLEMENT_DELETE";
		    RPCEvents["Error"] = "ERROR";
		    /**
		     * @unstable
		     */
		    RPCEvents["GameJoin"] = "GAME_JOIN";
		    /**
		     * @unstable
		     */
		    RPCEvents["GameSpectate"] = "GAME_SPECTATE";
		    RPCEvents["GuildCreate"] = "GUILD_CREATE";
		    RPCEvents["GuildStatus"] = "GUILD_STATUS";
		    /**
		     * Dispatches message objects, with the exception of deletions, which only contains the id in the message object.
		     */
		    RPCEvents["MessageCreate"] = "MESSAGE_CREATE";
		    /**
		     * Dispatches message objects, with the exception of deletions, which only contains the id in the message object.
		     */
		    RPCEvents["MessageDelete"] = "MESSAGE_DELETE";
		    /**
		     * Dispatches message objects, with the exception of deletions, which only contains the id in the message object.
		     */
		    RPCEvents["MessageUpdate"] = "MESSAGE_UPDATE";
		    /**
		     * This event requires the `rpc.notifications.read` {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes | OAuth2 scope}.
		     */
		    RPCEvents["NotificationCreate"] = "NOTIFICATION_CREATE";
		    /**
		     * @unstable
		     */
		    RPCEvents["Overlay"] = "OVERLAY";
		    /**
		     * @unstable
		     */
		    RPCEvents["OverlayUpdate"] = "OVERLAY_UPDATE";
		    RPCEvents["Ready"] = "READY";
		    /**
		     * @unstable
		     */
		    RPCEvents["RelationshipUpdate"] = "RELATIONSHIP_UPDATE";
		    RPCEvents["SpeakingStart"] = "SPEAKING_START";
		    RPCEvents["SpeakingStop"] = "SPEAKING_STOP";
		    RPCEvents["VoiceChannelSelect"] = "VOICE_CHANNEL_SELECT";
		    RPCEvents["VoiceConnectionStatus"] = "VOICE_CONNECTION_STATUS";
		    RPCEvents["VoiceSettingsUpdate"] = "VOICE_SETTINGS_UPDATE";
		    /**
		     * @unstable
		     */
		    RPCEvents["VoiceSettingsUpdate2"] = "VOICE_SETTINGS_UPDATE_2";
		    /**
		     * Dispatches channel voice state objects
		     */
		    RPCEvents["VoiceStateCreate"] = "VOICE_STATE_CREATE";
		    /**
		     * Dispatches channel voice state objects
		     */
		    RPCEvents["VoiceStateDelete"] = "VOICE_STATE_DELETE";
		    /**
		     * Dispatches channel voice state objects
		     */
		    RPCEvents["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
		})(RPCEvents || (exports.RPCEvents = RPCEvents = {}));
		
	} (v10$3));
	return v10$3;
}

var v10Exports$2 = requireV10$2();
var mod$3 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports$2);

const RPCCloseEventCodes = mod$3.RPCCloseEventCodes;
const RPCCommands = mod$3.RPCCommands;
const RPCDeviceType = mod$3.RPCDeviceType;
const RPCErrorCodes = mod$3.RPCErrorCodes;
const RPCEvents = mod$3.RPCEvents;
const RPCVersion = mod$3.RPCVersion;
const RPCVoiceSettingsModeType = mod$3.RPCVoiceSettingsModeType;
const RPCVoiceShortcutKeyComboKeyType = mod$3.RPCVoiceShortcutKeyComboKeyType;
const RelationshipType = mod$3.RelationshipType;
const VoiceConnectionStates = mod$3.VoiceConnectionStates;

var v10$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  RPCCloseEventCodes: RPCCloseEventCodes,
  RPCCommands: RPCCommands,
  RPCDeviceType: RPCDeviceType,
  RPCErrorCodes: RPCErrorCodes,
  RPCEvents: RPCEvents,
  RPCVersion: RPCVersion,
  RPCVoiceSettingsModeType: RPCVoiceSettingsModeType,
  RPCVoiceShortcutKeyComboKeyType: RPCVoiceShortcutKeyComboKeyType,
  RelationshipType: RelationshipType,
  VoiceConnectionStates: VoiceConnectionStates,
  default: mod$3
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(v10$2);

var v10$1 = {};

var hasRequiredV10$1;

function requireV10$1 () {
	if (hasRequiredV10$1) return v10$1;
	hasRequiredV10$1 = 1;
	Object.defineProperty(v10$1, "__esModule", { value: true });
	v10$1.isDMInteraction = isDMInteraction;
	v10$1.isGuildInteraction = isGuildInteraction;
	v10$1.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction;
	v10$1.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction;
	v10$1.isMessageComponentDMInteraction = isMessageComponentDMInteraction;
	v10$1.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction;
	v10$1.isLinkButton = isLinkButton;
	v10$1.isInteractionButton = isInteractionButton;
	v10$1.isMessageComponentInteraction = isMessageComponentInteraction;
	v10$1.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction;
	v10$1.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction;
	v10$1.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction;
	v10$1.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction;
	const index_1 = require$$2;
	// Interactions
	/**
	 * A type-guard check for DM interactions
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the interaction was received in a DM channel
	 */
	function isDMInteraction(interaction) {
	    return Reflect.has(interaction, 'user');
	}
	/**
	 * A type-guard check for guild interactions
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the interaction was received in a guild
	 */
	function isGuildInteraction(interaction) {
	    return Reflect.has(interaction, 'guild_id');
	}
	// ApplicationCommandInteractions
	/**
	 * A type-guard check for DM application command interactions
	 *
	 * @param interaction - The application command interaction to check against
	 * @returns A boolean that indicates if the application command interaction was received in a DM channel
	 */
	function isApplicationCommandDMInteraction(interaction) {
	    return isDMInteraction(interaction);
	}
	/**
	 * A type-guard check for guild application command interactions
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the application command interaction was received in a guild
	 */
	function isApplicationCommandGuildInteraction(interaction) {
	    return isGuildInteraction(interaction);
	}
	// MessageComponentInteractions
	/**
	 * A type-guard check for DM message component interactions
	 *
	 * @param interaction - The message component interaction to check against
	 * @returns A boolean that indicates if the message component interaction was received in a DM channel
	 */
	function isMessageComponentDMInteraction(interaction) {
	    return isDMInteraction(interaction);
	}
	/**
	 * A type-guard check for guild message component interactions
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the message component interaction was received in a guild
	 */
	function isMessageComponentGuildInteraction(interaction) {
	    return isGuildInteraction(interaction);
	}
	// Buttons
	/**
	 * A type-guard check for buttons that have a `url` attached to them.
	 *
	 * @param component - The button to check against
	 * @returns A boolean that indicates if the button has a `url` attached to it
	 */
	function isLinkButton(component) {
	    return component.style === index_1.ButtonStyle.Link;
	}
	/**
	 * A type-guard check for buttons that have a `custom_id` attached to them.
	 *
	 * @param component - The button to check against
	 * @returns A boolean that indicates if the button has a `custom_id` attached to it
	 */
	function isInteractionButton(component) {
	    return ![index_1.ButtonStyle.Link, index_1.ButtonStyle.Premium].includes(component.style);
	}
	// Message Components
	/**
	 * A type-guard check for message component interactions
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the interaction is a message component
	 */
	function isMessageComponentInteraction(interaction) {
	    return interaction.type === index_1.InteractionType.MessageComponent;
	}
	/**
	 * A type-guard check for button message component interactions
	 *
	 * @param interaction - The message component interaction to check against
	 * @returns A boolean that indicates if the message component is a button
	 */
	function isMessageComponentButtonInteraction(interaction) {
	    return interaction.data.component_type === index_1.ComponentType.Button;
	}
	/**
	 * A type-guard check for select menu message component interactions
	 *
	 * @param interaction - The message component interaction to check against
	 * @returns A boolean that indicates if the message component is a select menu
	 */
	function isMessageComponentSelectMenuInteraction(interaction) {
	    return [
	        index_1.ComponentType.StringSelect,
	        index_1.ComponentType.UserSelect,
	        index_1.ComponentType.RoleSelect,
	        index_1.ComponentType.MentionableSelect,
	        index_1.ComponentType.ChannelSelect,
	    ].includes(interaction.data.component_type);
	}
	// Application Commands
	/**
	 * A type-guard check for chat input application commands.
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the interaction is a chat input application command
	 */
	function isChatInputApplicationCommandInteraction(interaction) {
	    return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
	}
	/**
	 * A type-guard check for context menu application commands.
	 *
	 * @param interaction - The interaction to check against
	 * @returns A boolean that indicates if the interaction is a context menu application command
	 */
	function isContextMenuApplicationCommandInteraction(interaction) {
	    return (interaction.data.type === index_1.ApplicationCommandType.Message ||
	        interaction.data.type === index_1.ApplicationCommandType.User);
	}
	
	return v10$1;
}

var v10Exports$1 = requireV10$1();
var mod$2 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports$1);

const isApplicationCommandDMInteraction = mod$2.isApplicationCommandDMInteraction;
const isApplicationCommandGuildInteraction = mod$2.isApplicationCommandGuildInteraction;
const isChatInputApplicationCommandInteraction = mod$2.isChatInputApplicationCommandInteraction;
const isContextMenuApplicationCommandInteraction = mod$2.isContextMenuApplicationCommandInteraction;
const isDMInteraction = mod$2.isDMInteraction;
const isGuildInteraction = mod$2.isGuildInteraction;
const isInteractionButton = mod$2.isInteractionButton;
const isLinkButton = mod$2.isLinkButton;
const isMessageComponentButtonInteraction = mod$2.isMessageComponentButtonInteraction;
const isMessageComponentDMInteraction = mod$2.isMessageComponentDMInteraction;
const isMessageComponentGuildInteraction = mod$2.isMessageComponentGuildInteraction;
const isMessageComponentInteraction = mod$2.isMessageComponentInteraction;
const isMessageComponentSelectMenuInteraction = mod$2.isMessageComponentSelectMenuInteraction;

var v10 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mod$2,
  isApplicationCommandDMInteraction: isApplicationCommandDMInteraction,
  isApplicationCommandGuildInteraction: isApplicationCommandGuildInteraction,
  isChatInputApplicationCommandInteraction: isChatInputApplicationCommandInteraction,
  isContextMenuApplicationCommandInteraction: isContextMenuApplicationCommandInteraction,
  isDMInteraction: isDMInteraction,
  isGuildInteraction: isGuildInteraction,
  isInteractionButton: isInteractionButton,
  isLinkButton: isLinkButton,
  isMessageComponentButtonInteraction: isMessageComponentButtonInteraction,
  isMessageComponentDMInteraction: isMessageComponentDMInteraction,
  isMessageComponentGuildInteraction: isMessageComponentGuildInteraction,
  isMessageComponentInteraction: isMessageComponentInteraction,
  isMessageComponentSelectMenuInteraction: isMessageComponentSelectMenuInteraction
});

var require$$6 = /*@__PURE__*/getAugmentedNamespace(v10);

var hasRequiredV10;

function requireV10 () {
	if (hasRequiredV10) return v10$a;
	hasRequiredV10 = 1;
	(function (exports) {
		var __createBinding = (v10$a && v10$a.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (v10$a && v10$a.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Utils = void 0;
		__exportStar(require$$0, exports);
		__exportStar(require$$1, exports);
		__exportStar(require$$2, exports);
		__exportStar(require$$3, exports);
		__exportStar(require$$4, exports);
		__exportStar(requireInternals(), exports);
		exports.Utils = require$$6;
		
	} (v10$a));
	return v10$a;
}

var v10Exports = requireV10();
var mod$1 = /*@__PURE__*/getDefaultExportFromCjs(v10Exports);

mod$1.APIApplicationCommandPermissionsConstant;
mod$1.APIVersion;
mod$1.ActivityFlags;
mod$1.ActivityPlatform;
mod$1.ActivityType;
mod$1.AllowedMentionsTypes;
mod$1.ApplicationCommandOptionType;
mod$1.ApplicationCommandPermissionType;
mod$1.ApplicationCommandType;
mod$1.ApplicationFlags;
mod$1.ApplicationIntegrationType;
mod$1.ApplicationRoleConnectionMetadataType;
mod$1.ApplicationWebhookEventStatus;
mod$1.ApplicationWebhookEventType;
mod$1.ApplicationWebhookType;
mod$1.AttachmentFlags;
mod$1.AuditLogEvent;
mod$1.AuditLogOptionsType;
mod$1.AutoModerationActionType;
mod$1.AutoModerationRuleEventType;
mod$1.AutoModerationRuleKeywordPresetType;
mod$1.AutoModerationRuleTriggerType;
mod$1.ButtonStyle;
mod$1.CDNRoutes;
mod$1.ChannelFlags;
mod$1.ChannelType;
mod$1.ComponentType;
mod$1.ConnectionService;
mod$1.ConnectionVisibility;
mod$1.EmbedType;
mod$1.EntitlementOwnerType;
mod$1.EntitlementType;
mod$1.EntryPointCommandHandlerType;
mod$1.FormattingPatterns;
mod$1.ForumLayoutType;
mod$1.GatewayCloseCodes;
mod$1.GatewayDispatchEvents;
mod$1.GatewayIntentBits;
const GatewayOpcodes = mod$1.GatewayOpcodes;
mod$1.GatewayVersion;
mod$1.GuildDefaultMessageNotifications;
mod$1.GuildExplicitContentFilter;
mod$1.GuildFeature;
mod$1.GuildHubType;
mod$1.GuildMFALevel;
mod$1.GuildMemberFlags;
mod$1.GuildNSFWLevel;
mod$1.GuildOnboardingMode;
mod$1.GuildOnboardingPromptType;
mod$1.GuildPremiumTier;
mod$1.GuildScheduledEventEntityType;
mod$1.GuildScheduledEventPrivacyLevel;
mod$1.GuildScheduledEventRecurrenceRuleFrequency;
mod$1.GuildScheduledEventRecurrenceRuleMonth;
mod$1.GuildScheduledEventRecurrenceRuleWeekday;
mod$1.GuildScheduledEventStatus;
mod$1.GuildSystemChannelFlags;
mod$1.GuildVerificationLevel;
mod$1.GuildWidgetStyle;
mod$1.ImageFormat;
mod$1.IntegrationExpireBehavior;
mod$1.InteractionContextType;
mod$1.InteractionResponseType;
mod$1.InteractionType;
mod$1.InviteFlags;
mod$1.InviteTargetType;
mod$1.InviteType;
mod$1.Locale;
mod$1.MembershipScreeningFieldType;
mod$1.MessageActivityType;
mod$1.MessageFlags;
mod$1.MessageReferenceType;
mod$1.MessageType;
mod$1.NameplatePalette;
mod$1.OAuth2Routes;
mod$1.OAuth2Scopes;
mod$1.OverwriteType;
mod$1.PermissionFlagsBits;
mod$1.PollLayoutType;
mod$1.PresenceUpdateStatus;
mod$1.RESTJSONErrorCodes;
mod$1.RPCCloseEventCodes;
mod$1.RPCCommands;
mod$1.RPCDeviceType;
mod$1.RPCErrorCodes;
mod$1.RPCEvents;
mod$1.RPCVersion;
mod$1.RPCVoiceSettingsModeType;
mod$1.RPCVoiceShortcutKeyComboKeyType;
mod$1.ReactionType;
mod$1.RelationshipType;
mod$1.RoleFlags;
mod$1.RouteBases;
mod$1.Routes;
mod$1.SKUFlags;
mod$1.SKUType;
mod$1.SelectMenuDefaultValueType;
mod$1.SeparatorSpacingSize;
mod$1.SortOrderType;
mod$1.StageInstancePrivacyLevel;
mod$1.StatusDisplayType;
mod$1.StickerFormatType;
mod$1.StickerPackApplicationId;
mod$1.StickerType;
mod$1.SubscriptionStatus;
mod$1.TeamMemberMembershipState;
mod$1.TeamMemberRole;
mod$1.TextInputStyle;
mod$1.ThreadAutoArchiveDuration;
mod$1.ThreadMemberFlags;
mod$1.UnfurledMediaItemLoadingState;
mod$1.UserFlags;
mod$1.UserPremiumType;
mod$1.Utils;
mod$1.VideoQualityMode;
mod$1.VoiceChannelEffectSendAnimationType;
mod$1.VoiceConnectionStates;
mod$1.WebhookType;
mod$1.urlSafeCharacters;

var v8 = {};

var hasRequiredV8;

function requireV8 () {
	if (hasRequiredV8) return v8;
	hasRequiredV8 = 1;
	Object.defineProperty(v8, "__esModule", { value: true });
	v8.VoiceSpeakingFlags = v8.VoiceEncryptionMode = v8.VoiceCloseCodes = v8.VoiceOpcodes = v8.VoiceGatewayVersion = void 0;
	v8.VoiceGatewayVersion = '8';
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes}
	 */
	var VoiceOpcodes;
	(function (VoiceOpcodes) {
	    /**
	     * Begin a voice websocket connection
	     */
	    VoiceOpcodes[VoiceOpcodes["Identify"] = 0] = "Identify";
	    /**
	     * Select the voice protocol
	     */
	    VoiceOpcodes[VoiceOpcodes["SelectProtocol"] = 1] = "SelectProtocol";
	    /**
	     * Complete the websocket handshake
	     */
	    VoiceOpcodes[VoiceOpcodes["Ready"] = 2] = "Ready";
	    /**
	     * Keep the websocket connection alive
	     */
	    VoiceOpcodes[VoiceOpcodes["Heartbeat"] = 3] = "Heartbeat";
	    /**
	     * Describe the session
	     */
	    VoiceOpcodes[VoiceOpcodes["SessionDescription"] = 4] = "SessionDescription";
	    /**
	     * Indicate which users are speaking
	     */
	    VoiceOpcodes[VoiceOpcodes["Speaking"] = 5] = "Speaking";
	    /**
	     * Sent to acknowledge a received client heartbeat
	     */
	    VoiceOpcodes[VoiceOpcodes["HeartbeatAck"] = 6] = "HeartbeatAck";
	    /**
	     * Resume a connection
	     */
	    VoiceOpcodes[VoiceOpcodes["Resume"] = 7] = "Resume";
	    /**
	     * Time to wait between sending heartbeats in milliseconds
	     */
	    VoiceOpcodes[VoiceOpcodes["Hello"] = 8] = "Hello";
	    /**
	     * Acknowledge a successful session resume
	     */
	    VoiceOpcodes[VoiceOpcodes["Resumed"] = 9] = "Resumed";
	    /**
	     * One or more clients have connected to the voice channel
	     */
	    VoiceOpcodes[VoiceOpcodes["ClientsConnect"] = 11] = "ClientsConnect";
	    /**
	     * A client has disconnected from the voice channel
	     */
	    VoiceOpcodes[VoiceOpcodes["ClientDisconnect"] = 13] = "ClientDisconnect";
	    /**
	     * A downgrade from the DAVE protocol is upcoming
	     */
	    VoiceOpcodes[VoiceOpcodes["DavePrepareTransition"] = 21] = "DavePrepareTransition";
	    /**
	     * Execute a previously announced protocol transition
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveExecuteTransition"] = 22] = "DaveExecuteTransition";
	    /**
	     * Acknowledge readiness previously announced transition
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveTransitionReady"] = 23] = "DaveTransitionReady";
	    /**
	     * A DAVE protocol version or group change is upcoming
	     */
	    VoiceOpcodes[VoiceOpcodes["DavePrepareEpoch"] = 24] = "DavePrepareEpoch";
	    /**
	     * Credential and public key for MLS external sender
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsExternalSender"] = 25] = "DaveMlsExternalSender";
	    /**
	     * MLS Key Package for pending group member
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsKeyPackage"] = 26] = "DaveMlsKeyPackage";
	    /**
	     * MLS Proposals to be appended or revoked
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsProposals"] = 27] = "DaveMlsProposals";
	    /**
	     * MLS Commit with optional MLS Welcome messages
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsCommitWelcome"] = 28] = "DaveMlsCommitWelcome";
	    /**
	     * MLS Commit to be processed for upcoming transition
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsAnnounceCommitTransition"] = 29] = "DaveMlsAnnounceCommitTransition";
	    /**
	     * MLS Welcome to group for upcoming transition
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsWelcome"] = 30] = "DaveMlsWelcome";
	    /**
	     * Flag invalid commit or welcome, request re-add
	     */
	    VoiceOpcodes[VoiceOpcodes["DaveMlsInvalidCommitWelcome"] = 31] = "DaveMlsInvalidCommitWelcome";
	})(VoiceOpcodes || (v8.VoiceOpcodes = VoiceOpcodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes}
	 */
	var VoiceCloseCodes;
	(function (VoiceCloseCodes) {
	    /**
	     * You sent an invalid opcode
	     */
	    VoiceCloseCodes[VoiceCloseCodes["UnknownOpcode"] = 4001] = "UnknownOpcode";
	    /**
	     * You sent a invalid payload in your identifying to the Gateway
	     */
	    VoiceCloseCodes[VoiceCloseCodes["FailedToDecode"] = 4002] = "FailedToDecode";
	    /**
	     * You sent a payload before identifying with the Gateway
	     */
	    VoiceCloseCodes[VoiceCloseCodes["NotAuthenticated"] = 4003] = "NotAuthenticated";
	    /**
	     * The token you sent in your identify payload is incorrect
	     */
	    VoiceCloseCodes[VoiceCloseCodes["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
	    /**
	     * You sent more than one identify payload. Stahp
	     */
	    VoiceCloseCodes[VoiceCloseCodes["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
	    /**
	     * Your session is no longer valid
	     */
	    VoiceCloseCodes[VoiceCloseCodes["SessionNoLongerValid"] = 4006] = "SessionNoLongerValid";
	    /**
	     * Your session has timed out
	     */
	    VoiceCloseCodes[VoiceCloseCodes["SessionTimeout"] = 4009] = "SessionTimeout";
	    /**
	     * We can't find the server you're trying to connect to
	     */
	    VoiceCloseCodes[VoiceCloseCodes["ServerNotFound"] = 4011] = "ServerNotFound";
	    /**
	     * We didn't recognize the protocol you sent
	     */
	    VoiceCloseCodes[VoiceCloseCodes["UnknownProtocol"] = 4012] = "UnknownProtocol";
	    /**
	     * Either the channel was deleted, you were kicked, or the main gateway session was dropped. Should not reconnect
	     */
	    VoiceCloseCodes[VoiceCloseCodes["Disconnected"] = 4014] = "Disconnected";
	    /**
	     * The server crashed. Our bad! Try resuming
	     */
	    VoiceCloseCodes[VoiceCloseCodes["VoiceServerCrashed"] = 4015] = "VoiceServerCrashed";
	    /**
	     * We didn't recognize your encryption
	     */
	    VoiceCloseCodes[VoiceCloseCodes["UnknownEncryptionMode"] = 4016] = "UnknownEncryptionMode";
	    /**
	     * You sent a malformed request
	     */
	    VoiceCloseCodes[VoiceCloseCodes["BadRequest"] = 4020] = "BadRequest";
	    /**
	     * Disconnect due to rate limit exceeded. Should not reconnect
	     */
	    VoiceCloseCodes[VoiceCloseCodes["RateLimited"] = 4021] = "RateLimited";
	    /**
	     * Disconnect all clients due to call terminated (channel deleted, voice server changed, etc.). Should not reconnect
	     */
	    VoiceCloseCodes[VoiceCloseCodes["CallTerminated"] = 4022] = "CallTerminated";
	})(VoiceCloseCodes || (v8.VoiceCloseCodes = VoiceCloseCodes = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/voice-connections#transport-encryption-modes}
	 */
	var VoiceEncryptionMode;
	(function (VoiceEncryptionMode) {
	    /**
	     * AEAD AES256-GCM (RTP Size)
	     */
	    VoiceEncryptionMode["AeadAes256GcmRtpSize"] = "aead_aes256_gcm_rtpsize";
	    /**
	     * AEAD XChaCha20 Poly1305 (RTP Size)
	     */
	    VoiceEncryptionMode["AeadXChaCha20Poly1305RtpSize"] = "aead_xchacha20_poly1305_rtpsize";
	    /**
	     * XSalsa20 Poly1305 Lite (RTP Size)
	     *
	     * @deprecated This encryption mode has been discontinued.
	     */
	    VoiceEncryptionMode["XSalsa20Poly1305LiteRtpSize"] = "xsalsa20_poly1305_lite_rtpsize";
	    /**
	     * AEAD AES256-GCM
	     *
	     * @deprecated This encryption mode has been discontinued.
	     */
	    VoiceEncryptionMode["AeadAes256Gcm"] = "aead_aes256_gcm";
	    /**
	     * XSalsa20 Poly1305
	     *
	     * @deprecated This encryption mode has been discontinued.
	     */
	    VoiceEncryptionMode["XSalsa20Poly1305"] = "xsalsa20_poly1305";
	    /**
	     * XSalsa20 Poly1305 Suffix
	     *
	     * @deprecated This encryption mode has been discontinued.
	     */
	    VoiceEncryptionMode["XSalsa20Poly1305Suffix"] = "xsalsa20_poly1305_suffix";
	    /**
	     * XSalsa20 Poly1305 Lite
	     *
	     * @deprecated This encryption mode has been discontinued.
	     */
	    VoiceEncryptionMode["XSalsa20Poly1305Lite"] = "xsalsa20_poly1305_lite";
	})(VoiceEncryptionMode || (v8.VoiceEncryptionMode = VoiceEncryptionMode = {}));
	/**
	 * @see {@link https://discord.com/developers/docs/topics/voice-connections#speaking}
	 */
	var VoiceSpeakingFlags;
	(function (VoiceSpeakingFlags) {
	    /**
	     * Normal transmission of voice audio
	     */
	    VoiceSpeakingFlags[VoiceSpeakingFlags["Microphone"] = 1] = "Microphone";
	    /**
	     * 	Transmission of context audio for video, no speaking indicator
	     */
	    VoiceSpeakingFlags[VoiceSpeakingFlags["Soundshare"] = 2] = "Soundshare";
	    /**
	     * Priority speaker, lowering audio of other speakers
	     */
	    VoiceSpeakingFlags[VoiceSpeakingFlags["Priority"] = 4] = "Priority";
	})(VoiceSpeakingFlags || (v8.VoiceSpeakingFlags = VoiceSpeakingFlags = {}));
	// #endregion Shared
	
	return v8;
}

var v8Exports = requireV8();
var mod = /*@__PURE__*/getDefaultExportFromCjs(v8Exports);

mod.VoiceCloseCodes;
const VoiceEncryptionMode = mod.VoiceEncryptionMode;
mod.VoiceGatewayVersion;
const VoiceOpcodes = mod.VoiceOpcodes;
mod.VoiceSpeakingFlags;

var bufferUtil = {exports: {}};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	const BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
	const hasBlob = typeof Blob !== 'undefined';

	if (hasBlob) BINARY_TYPES.push('blob');

	constants = {
	  BINARY_TYPES,
	  EMPTY_BUFFER: Buffer.alloc(0),
	  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
	  hasBlob,
	  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
	  kListener: Symbol('kListener'),
	  kStatusCode: Symbol('status-code'),
	  kWebSocket: Symbol('websocket'),
	  NOOP: () => {}
	};
	return constants;
}

var hasRequiredBufferUtil;

function requireBufferUtil () {
	if (hasRequiredBufferUtil) return bufferUtil.exports;
	hasRequiredBufferUtil = 1;

	const { EMPTY_BUFFER } = requireConstants();

	const FastBuffer = Buffer[Symbol.species];

	/**
	 * Merges an array of buffers into a new buffer.
	 *
	 * @param {Buffer[]} list The array of buffers to concat
	 * @param {Number} totalLength The total length of buffers in the list
	 * @return {Buffer} The resulting buffer
	 * @public
	 */
	function concat(list, totalLength) {
	  if (list.length === 0) return EMPTY_BUFFER;
	  if (list.length === 1) return list[0];

	  const target = Buffer.allocUnsafe(totalLength);
	  let offset = 0;

	  for (let i = 0; i < list.length; i++) {
	    const buf = list[i];
	    target.set(buf, offset);
	    offset += buf.length;
	  }

	  if (offset < totalLength) {
	    return new FastBuffer(target.buffer, target.byteOffset, offset);
	  }

	  return target;
	}

	/**
	 * Masks a buffer using the given mask.
	 *
	 * @param {Buffer} source The buffer to mask
	 * @param {Buffer} mask The mask to use
	 * @param {Buffer} output The buffer where to store the result
	 * @param {Number} offset The offset at which to start writing
	 * @param {Number} length The number of bytes to mask.
	 * @public
	 */
	function _mask(source, mask, output, offset, length) {
	  for (let i = 0; i < length; i++) {
	    output[offset + i] = source[i] ^ mask[i & 3];
	  }
	}

	/**
	 * Unmasks a buffer using the given mask.
	 *
	 * @param {Buffer} buffer The buffer to unmask
	 * @param {Buffer} mask The mask to use
	 * @public
	 */
	function _unmask(buffer, mask) {
	  for (let i = 0; i < buffer.length; i++) {
	    buffer[i] ^= mask[i & 3];
	  }
	}

	/**
	 * Converts a buffer to an `ArrayBuffer`.
	 *
	 * @param {Buffer} buf The buffer to convert
	 * @return {ArrayBuffer} Converted buffer
	 * @public
	 */
	function toArrayBuffer(buf) {
	  if (buf.length === buf.buffer.byteLength) {
	    return buf.buffer;
	  }

	  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
	}

	/**
	 * Converts `data` to a `Buffer`.
	 *
	 * @param {*} data The data to convert
	 * @return {Buffer} The buffer
	 * @throws {TypeError}
	 * @public
	 */
	function toBuffer(data) {
	  toBuffer.readOnly = true;

	  if (Buffer.isBuffer(data)) return data;

	  let buf;

	  if (data instanceof ArrayBuffer) {
	    buf = new FastBuffer(data);
	  } else if (ArrayBuffer.isView(data)) {
	    buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
	  } else {
	    buf = Buffer.from(data);
	    toBuffer.readOnly = false;
	  }

	  return buf;
	}

	bufferUtil.exports = {
	  concat,
	  mask: _mask,
	  toArrayBuffer,
	  toBuffer,
	  unmask: _unmask
	};

	/* istanbul ignore else  */
	if (!process.env.WS_NO_BUFFER_UTIL) {
	  try {
	    const bufferUtil$1 = require('bufferutil');

	    bufferUtil.exports.mask = function (source, mask, output, offset, length) {
	      if (length < 48) _mask(source, mask, output, offset, length);
	      else bufferUtil$1.mask(source, mask, output, offset, length);
	    };

	    bufferUtil.exports.unmask = function (buffer, mask) {
	      if (buffer.length < 32) _unmask(buffer, mask);
	      else bufferUtil$1.unmask(buffer, mask);
	    };
	  } catch (e) {
	    // Continue regardless of the error.
	  }
	}
	return bufferUtil.exports;
}

var limiter;
var hasRequiredLimiter;

function requireLimiter () {
	if (hasRequiredLimiter) return limiter;
	hasRequiredLimiter = 1;

	const kDone = Symbol('kDone');
	const kRun = Symbol('kRun');

	/**
	 * A very simple job queue with adjustable concurrency. Adapted from
	 * https://github.com/STRML/async-limiter
	 */
	class Limiter {
	  /**
	   * Creates a new `Limiter`.
	   *
	   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
	   *     to run concurrently
	   */
	  constructor(concurrency) {
	    this[kDone] = () => {
	      this.pending--;
	      this[kRun]();
	    };
	    this.concurrency = concurrency || Infinity;
	    this.jobs = [];
	    this.pending = 0;
	  }

	  /**
	   * Adds a job to the queue.
	   *
	   * @param {Function} job The job to run
	   * @public
	   */
	  add(job) {
	    this.jobs.push(job);
	    this[kRun]();
	  }

	  /**
	   * Removes a job from the queue and runs it if possible.
	   *
	   * @private
	   */
	  [kRun]() {
	    if (this.pending === this.concurrency) return;

	    if (this.jobs.length) {
	      const job = this.jobs.shift();

	      this.pending++;
	      job(this[kDone]);
	    }
	  }
	}

	limiter = Limiter;
	return limiter;
}

var permessageDeflate;
var hasRequiredPermessageDeflate;

function requirePermessageDeflate () {
	if (hasRequiredPermessageDeflate) return permessageDeflate;
	hasRequiredPermessageDeflate = 1;

	const zlib = require$$0$2;

	const bufferUtil = requireBufferUtil();
	const Limiter = requireLimiter();
	const { kStatusCode } = requireConstants();

	const FastBuffer = Buffer[Symbol.species];
	const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
	const kPerMessageDeflate = Symbol('permessage-deflate');
	const kTotalLength = Symbol('total-length');
	const kCallback = Symbol('callback');
	const kBuffers = Symbol('buffers');
	const kError = Symbol('error');

	//
	// We limit zlib concurrency, which prevents severe memory fragmentation
	// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
	// and https://github.com/websockets/ws/issues/1202
	//
	// Intentionally global; it's the global thread pool that's an issue.
	//
	let zlibLimiter;

	/**
	 * permessage-deflate implementation.
	 */
	class PerMessageDeflate {
	  /**
	   * Creates a PerMessageDeflate instance.
	   *
	   * @param {Object} [options] Configuration options
	   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
	   *     for, or request, a custom client window size
	   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
	   *     acknowledge disabling of client context takeover
	   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
	   *     calls to zlib
	   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
	   *     use of a custom server window size
	   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
	   *     disabling of server context takeover
	   * @param {Number} [options.threshold=1024] Size (in bytes) below which
	   *     messages should not be compressed if context takeover is disabled
	   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
	   *     deflate
	   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
	   *     inflate
	   * @param {Boolean} [isServer=false] Create the instance in either server or
	   *     client mode
	   * @param {Number} [maxPayload=0] The maximum allowed message length
	   */
	  constructor(options, isServer, maxPayload) {
	    this._maxPayload = maxPayload | 0;
	    this._options = options || {};
	    this._threshold =
	      this._options.threshold !== undefined ? this._options.threshold : 1024;
	    this._isServer = !!isServer;
	    this._deflate = null;
	    this._inflate = null;

	    this.params = null;

	    if (!zlibLimiter) {
	      const concurrency =
	        this._options.concurrencyLimit !== undefined
	          ? this._options.concurrencyLimit
	          : 10;
	      zlibLimiter = new Limiter(concurrency);
	    }
	  }

	  /**
	   * @type {String}
	   */
	  static get extensionName() {
	    return 'permessage-deflate';
	  }

	  /**
	   * Create an extension negotiation offer.
	   *
	   * @return {Object} Extension parameters
	   * @public
	   */
	  offer() {
	    const params = {};

	    if (this._options.serverNoContextTakeover) {
	      params.server_no_context_takeover = true;
	    }
	    if (this._options.clientNoContextTakeover) {
	      params.client_no_context_takeover = true;
	    }
	    if (this._options.serverMaxWindowBits) {
	      params.server_max_window_bits = this._options.serverMaxWindowBits;
	    }
	    if (this._options.clientMaxWindowBits) {
	      params.client_max_window_bits = this._options.clientMaxWindowBits;
	    } else if (this._options.clientMaxWindowBits == null) {
	      params.client_max_window_bits = true;
	    }

	    return params;
	  }

	  /**
	   * Accept an extension negotiation offer/response.
	   *
	   * @param {Array} configurations The extension negotiation offers/reponse
	   * @return {Object} Accepted configuration
	   * @public
	   */
	  accept(configurations) {
	    configurations = this.normalizeParams(configurations);

	    this.params = this._isServer
	      ? this.acceptAsServer(configurations)
	      : this.acceptAsClient(configurations);

	    return this.params;
	  }

	  /**
	   * Releases all resources used by the extension.
	   *
	   * @public
	   */
	  cleanup() {
	    if (this._inflate) {
	      this._inflate.close();
	      this._inflate = null;
	    }

	    if (this._deflate) {
	      const callback = this._deflate[kCallback];

	      this._deflate.close();
	      this._deflate = null;

	      if (callback) {
	        callback(
	          new Error(
	            'The deflate stream was closed while data was being processed'
	          )
	        );
	      }
	    }
	  }

	  /**
	   *  Accept an extension negotiation offer.
	   *
	   * @param {Array} offers The extension negotiation offers
	   * @return {Object} Accepted configuration
	   * @private
	   */
	  acceptAsServer(offers) {
	    const opts = this._options;
	    const accepted = offers.find((params) => {
	      if (
	        (opts.serverNoContextTakeover === false &&
	          params.server_no_context_takeover) ||
	        (params.server_max_window_bits &&
	          (opts.serverMaxWindowBits === false ||
	            (typeof opts.serverMaxWindowBits === 'number' &&
	              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
	        (typeof opts.clientMaxWindowBits === 'number' &&
	          !params.client_max_window_bits)
	      ) {
	        return false;
	      }

	      return true;
	    });

	    if (!accepted) {
	      throw new Error('None of the extension offers can be accepted');
	    }

	    if (opts.serverNoContextTakeover) {
	      accepted.server_no_context_takeover = true;
	    }
	    if (opts.clientNoContextTakeover) {
	      accepted.client_no_context_takeover = true;
	    }
	    if (typeof opts.serverMaxWindowBits === 'number') {
	      accepted.server_max_window_bits = opts.serverMaxWindowBits;
	    }
	    if (typeof opts.clientMaxWindowBits === 'number') {
	      accepted.client_max_window_bits = opts.clientMaxWindowBits;
	    } else if (
	      accepted.client_max_window_bits === true ||
	      opts.clientMaxWindowBits === false
	    ) {
	      delete accepted.client_max_window_bits;
	    }

	    return accepted;
	  }

	  /**
	   * Accept the extension negotiation response.
	   *
	   * @param {Array} response The extension negotiation response
	   * @return {Object} Accepted configuration
	   * @private
	   */
	  acceptAsClient(response) {
	    const params = response[0];

	    if (
	      this._options.clientNoContextTakeover === false &&
	      params.client_no_context_takeover
	    ) {
	      throw new Error('Unexpected parameter "client_no_context_takeover"');
	    }

	    if (!params.client_max_window_bits) {
	      if (typeof this._options.clientMaxWindowBits === 'number') {
	        params.client_max_window_bits = this._options.clientMaxWindowBits;
	      }
	    } else if (
	      this._options.clientMaxWindowBits === false ||
	      (typeof this._options.clientMaxWindowBits === 'number' &&
	        params.client_max_window_bits > this._options.clientMaxWindowBits)
	    ) {
	      throw new Error(
	        'Unexpected or invalid parameter "client_max_window_bits"'
	      );
	    }

	    return params;
	  }

	  /**
	   * Normalize parameters.
	   *
	   * @param {Array} configurations The extension negotiation offers/reponse
	   * @return {Array} The offers/response with normalized parameters
	   * @private
	   */
	  normalizeParams(configurations) {
	    configurations.forEach((params) => {
	      Object.keys(params).forEach((key) => {
	        let value = params[key];

	        if (value.length > 1) {
	          throw new Error(`Parameter "${key}" must have only a single value`);
	        }

	        value = value[0];

	        if (key === 'client_max_window_bits') {
	          if (value !== true) {
	            const num = +value;
	            if (!Number.isInteger(num) || num < 8 || num > 15) {
	              throw new TypeError(
	                `Invalid value for parameter "${key}": ${value}`
	              );
	            }
	            value = num;
	          } else if (!this._isServer) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else if (key === 'server_max_window_bits') {
	          const num = +value;
	          if (!Number.isInteger(num) || num < 8 || num > 15) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	          value = num;
	        } else if (
	          key === 'client_no_context_takeover' ||
	          key === 'server_no_context_takeover'
	        ) {
	          if (value !== true) {
	            throw new TypeError(
	              `Invalid value for parameter "${key}": ${value}`
	            );
	          }
	        } else {
	          throw new Error(`Unknown parameter "${key}"`);
	        }

	        params[key] = value;
	      });
	    });

	    return configurations;
	  }

	  /**
	   * Decompress data. Concurrency limited.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @public
	   */
	  decompress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._decompress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }

	  /**
	   * Compress data. Concurrency limited.
	   *
	   * @param {(Buffer|String)} data Data to compress
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @public
	   */
	  compress(data, fin, callback) {
	    zlibLimiter.add((done) => {
	      this._compress(data, fin, (err, result) => {
	        done();
	        callback(err, result);
	      });
	    });
	  }

	  /**
	   * Decompress data.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @private
	   */
	  _decompress(data, fin, callback) {
	    const endpoint = this._isServer ? 'client' : 'server';

	    if (!this._inflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];

	      this._inflate = zlib.createInflateRaw({
	        ...this._options.zlibInflateOptions,
	        windowBits
	      });
	      this._inflate[kPerMessageDeflate] = this;
	      this._inflate[kTotalLength] = 0;
	      this._inflate[kBuffers] = [];
	      this._inflate.on('error', inflateOnError);
	      this._inflate.on('data', inflateOnData);
	    }

	    this._inflate[kCallback] = callback;

	    this._inflate.write(data);
	    if (fin) this._inflate.write(TRAILER);

	    this._inflate.flush(() => {
	      const err = this._inflate[kError];

	      if (err) {
	        this._inflate.close();
	        this._inflate = null;
	        callback(err);
	        return;
	      }

	      const data = bufferUtil.concat(
	        this._inflate[kBuffers],
	        this._inflate[kTotalLength]
	      );

	      if (this._inflate._readableState.endEmitted) {
	        this._inflate.close();
	        this._inflate = null;
	      } else {
	        this._inflate[kTotalLength] = 0;
	        this._inflate[kBuffers] = [];

	        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	          this._inflate.reset();
	        }
	      }

	      callback(null, data);
	    });
	  }

	  /**
	   * Compress data.
	   *
	   * @param {(Buffer|String)} data Data to compress
	   * @param {Boolean} fin Specifies whether or not this is the last fragment
	   * @param {Function} callback Callback
	   * @private
	   */
	  _compress(data, fin, callback) {
	    const endpoint = this._isServer ? 'server' : 'client';

	    if (!this._deflate) {
	      const key = `${endpoint}_max_window_bits`;
	      const windowBits =
	        typeof this.params[key] !== 'number'
	          ? zlib.Z_DEFAULT_WINDOWBITS
	          : this.params[key];

	      this._deflate = zlib.createDeflateRaw({
	        ...this._options.zlibDeflateOptions,
	        windowBits
	      });

	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];

	      this._deflate.on('data', deflateOnData);
	    }

	    this._deflate[kCallback] = callback;

	    this._deflate.write(data);
	    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
	      if (!this._deflate) {
	        //
	        // The deflate stream was closed while data was being processed.
	        //
	        return;
	      }

	      let data = bufferUtil.concat(
	        this._deflate[kBuffers],
	        this._deflate[kTotalLength]
	      );

	      if (fin) {
	        data = new FastBuffer(data.buffer, data.byteOffset, data.length - 4);
	      }

	      //
	      // Ensure that the callback will not be called again in
	      // `PerMessageDeflate#cleanup()`.
	      //
	      this._deflate[kCallback] = null;

	      this._deflate[kTotalLength] = 0;
	      this._deflate[kBuffers] = [];

	      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
	        this._deflate.reset();
	      }

	      callback(null, data);
	    });
	  }
	}

	permessageDeflate = PerMessageDeflate;

	/**
	 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function deflateOnData(chunk) {
	  this[kBuffers].push(chunk);
	  this[kTotalLength] += chunk.length;
	}

	/**
	 * The listener of the `zlib.InflateRaw` stream `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function inflateOnData(chunk) {
	  this[kTotalLength] += chunk.length;

	  if (
	    this[kPerMessageDeflate]._maxPayload < 1 ||
	    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
	  ) {
	    this[kBuffers].push(chunk);
	    return;
	  }

	  this[kError] = new RangeError('Max payload size exceeded');
	  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
	  this[kError][kStatusCode] = 1009;
	  this.removeListener('data', inflateOnData);

	  //
	  // The choice to employ `zlib.reset()` over `zlib.close()` is dictated by the
	  // fact that in Node.js versions prior to 13.10.0, the callback for
	  // `zlib.flush()` is not called if `zlib.close()` is used. Utilizing
	  // `zlib.reset()` ensures that either the callback is invoked or an error is
	  // emitted.
	  //
	  this.reset();
	}

	/**
	 * The listener of the `zlib.InflateRaw` stream `'error'` event.
	 *
	 * @param {Error} err The emitted error
	 * @private
	 */
	function inflateOnError(err) {
	  //
	  // There is no need to call `Zlib#close()` as the handle is automatically
	  // closed when an error is emitted.
	  //
	  this[kPerMessageDeflate]._inflate = null;

	  if (this[kError]) {
	    this[kCallback](this[kError]);
	    return;
	  }

	  err[kStatusCode] = 1007;
	  this[kCallback](err);
	}
	return permessageDeflate;
}

var validation = {exports: {}};

var hasRequiredValidation;

function requireValidation () {
	if (hasRequiredValidation) return validation.exports;
	hasRequiredValidation = 1;

	const { isUtf8 } = require$$0$3;

	const { hasBlob } = requireConstants();

	//
	// Allowed token characters:
	//
	// '!', '#', '$', '%', '&', ''', '*', '+', '-',
	// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
	//
	// tokenChars[32] === 0 // ' '
	// tokenChars[33] === 1 // '!'
	// tokenChars[34] === 0 // '"'
	// ...
	//
	// prettier-ignore
	const tokenChars = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
	];

	/**
	 * Checks if a status code is allowed in a close frame.
	 *
	 * @param {Number} code The status code
	 * @return {Boolean} `true` if the status code is valid, else `false`
	 * @public
	 */
	function isValidStatusCode(code) {
	  return (
	    (code >= 1000 &&
	      code <= 1014 &&
	      code !== 1004 &&
	      code !== 1005 &&
	      code !== 1006) ||
	    (code >= 3000 && code <= 4999)
	  );
	}

	/**
	 * Checks if a given buffer contains only correct UTF-8.
	 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
	 * Markus Kuhn.
	 *
	 * @param {Buffer} buf The buffer to check
	 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
	 * @public
	 */
	function _isValidUTF8(buf) {
	  const len = buf.length;
	  let i = 0;

	  while (i < len) {
	    if ((buf[i] & 0x80) === 0) {
	      // 0xxxxxxx
	      i++;
	    } else if ((buf[i] & 0xe0) === 0xc0) {
	      // 110xxxxx 10xxxxxx
	      if (
	        i + 1 === len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i] & 0xfe) === 0xc0 // Overlong
	      ) {
	        return false;
	      }

	      i += 2;
	    } else if ((buf[i] & 0xf0) === 0xe0) {
	      // 1110xxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 2 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
	        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
	      ) {
	        return false;
	      }

	      i += 3;
	    } else if ((buf[i] & 0xf8) === 0xf0) {
	      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 3 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i + 3] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
	        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
	        buf[i] > 0xf4 // > U+10FFFF
	      ) {
	        return false;
	      }

	      i += 4;
	    } else {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Determines whether a value is a `Blob`.
	 *
	 * @param {*} value The value to be tested
	 * @return {Boolean} `true` if `value` is a `Blob`, else `false`
	 * @private
	 */
	function isBlob(value) {
	  return (
	    hasBlob &&
	    typeof value === 'object' &&
	    typeof value.arrayBuffer === 'function' &&
	    typeof value.type === 'string' &&
	    typeof value.stream === 'function' &&
	    (value[Symbol.toStringTag] === 'Blob' ||
	      value[Symbol.toStringTag] === 'File')
	  );
	}

	validation.exports = {
	  isBlob,
	  isValidStatusCode,
	  isValidUTF8: _isValidUTF8,
	  tokenChars
	};

	if (isUtf8) {
	  validation.exports.isValidUTF8 = function (buf) {
	    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
	  };
	} /* istanbul ignore else  */ else if (!process.env.WS_NO_UTF_8_VALIDATE) {
	  try {
	    const isValidUTF8 = require('utf-8-validate');

	    validation.exports.isValidUTF8 = function (buf) {
	      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
	    };
	  } catch (e) {
	    // Continue regardless of the error.
	  }
	}
	return validation.exports;
}

var receiver;
var hasRequiredReceiver;

function requireReceiver () {
	if (hasRequiredReceiver) return receiver;
	hasRequiredReceiver = 1;

	const { Writable } = require$$0$4;

	const PerMessageDeflate = requirePermessageDeflate();
	const {
	  BINARY_TYPES,
	  EMPTY_BUFFER,
	  kStatusCode,
	  kWebSocket
	} = requireConstants();
	const { concat, toArrayBuffer, unmask } = requireBufferUtil();
	const { isValidStatusCode, isValidUTF8 } = requireValidation();

	const FastBuffer = Buffer[Symbol.species];

	const GET_INFO = 0;
	const GET_PAYLOAD_LENGTH_16 = 1;
	const GET_PAYLOAD_LENGTH_64 = 2;
	const GET_MASK = 3;
	const GET_DATA = 4;
	const INFLATING = 5;
	const DEFER_EVENT = 6;

	/**
	 * HyBi Receiver implementation.
	 *
	 * @extends Writable
	 */
	class Receiver extends Writable {
	  /**
	   * Creates a Receiver instance.
	   *
	   * @param {Object} [options] Options object
	   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {String} [options.binaryType=nodebuffer] The type for binary data
	   * @param {Object} [options.extensions] An object containing the negotiated
	   *     extensions
	   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
	   *     client or server mode
	   * @param {Number} [options.maxPayload=0] The maximum allowed message length
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   */
	  constructor(options = {}) {
	    super();

	    this._allowSynchronousEvents =
	      options.allowSynchronousEvents !== undefined
	        ? options.allowSynchronousEvents
	        : true;
	    this._binaryType = options.binaryType || BINARY_TYPES[0];
	    this._extensions = options.extensions || {};
	    this._isServer = !!options.isServer;
	    this._maxPayload = options.maxPayload | 0;
	    this._skipUTF8Validation = !!options.skipUTF8Validation;
	    this[kWebSocket] = undefined;

	    this._bufferedBytes = 0;
	    this._buffers = [];

	    this._compressed = false;
	    this._payloadLength = 0;
	    this._mask = undefined;
	    this._fragmented = 0;
	    this._masked = false;
	    this._fin = false;
	    this._opcode = 0;

	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._fragments = [];

	    this._errored = false;
	    this._loop = false;
	    this._state = GET_INFO;
	  }

	  /**
	   * Implements `Writable.prototype._write()`.
	   *
	   * @param {Buffer} chunk The chunk of data to write
	   * @param {String} encoding The character encoding of `chunk`
	   * @param {Function} cb Callback
	   * @private
	   */
	  _write(chunk, encoding, cb) {
	    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

	    this._bufferedBytes += chunk.length;
	    this._buffers.push(chunk);
	    this.startLoop(cb);
	  }

	  /**
	   * Consumes `n` bytes from the buffered data.
	   *
	   * @param {Number} n The number of bytes to consume
	   * @return {Buffer} The consumed bytes
	   * @private
	   */
	  consume(n) {
	    this._bufferedBytes -= n;

	    if (n === this._buffers[0].length) return this._buffers.shift();

	    if (n < this._buffers[0].length) {
	      const buf = this._buffers[0];
	      this._buffers[0] = new FastBuffer(
	        buf.buffer,
	        buf.byteOffset + n,
	        buf.length - n
	      );

	      return new FastBuffer(buf.buffer, buf.byteOffset, n);
	    }

	    const dst = Buffer.allocUnsafe(n);

	    do {
	      const buf = this._buffers[0];
	      const offset = dst.length - n;

	      if (n >= buf.length) {
	        dst.set(this._buffers.shift(), offset);
	      } else {
	        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
	        this._buffers[0] = new FastBuffer(
	          buf.buffer,
	          buf.byteOffset + n,
	          buf.length - n
	        );
	      }

	      n -= buf.length;
	    } while (n > 0);

	    return dst;
	  }

	  /**
	   * Starts the parsing loop.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  startLoop(cb) {
	    this._loop = true;

	    do {
	      switch (this._state) {
	        case GET_INFO:
	          this.getInfo(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_16:
	          this.getPayloadLength16(cb);
	          break;
	        case GET_PAYLOAD_LENGTH_64:
	          this.getPayloadLength64(cb);
	          break;
	        case GET_MASK:
	          this.getMask();
	          break;
	        case GET_DATA:
	          this.getData(cb);
	          break;
	        case INFLATING:
	        case DEFER_EVENT:
	          this._loop = false;
	          return;
	      }
	    } while (this._loop);

	    if (!this._errored) cb();
	  }

	  /**
	   * Reads the first two bytes of a frame.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getInfo(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }

	    const buf = this.consume(2);

	    if ((buf[0] & 0x30) !== 0x00) {
	      const error = this.createError(
	        RangeError,
	        'RSV2 and RSV3 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_2_3'
	      );

	      cb(error);
	      return;
	    }

	    const compressed = (buf[0] & 0x40) === 0x40;

	    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
	      const error = this.createError(
	        RangeError,
	        'RSV1 must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_RSV_1'
	      );

	      cb(error);
	      return;
	    }

	    this._fin = (buf[0] & 0x80) === 0x80;
	    this._opcode = buf[0] & 0x0f;
	    this._payloadLength = buf[1] & 0x7f;

	    if (this._opcode === 0x00) {
	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );

	        cb(error);
	        return;
	      }

	      if (!this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          'invalid opcode 0',
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );

	        cb(error);
	        return;
	      }

	      this._opcode = this._fragmented;
	    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
	      if (this._fragmented) {
	        const error = this.createError(
	          RangeError,
	          `invalid opcode ${this._opcode}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_OPCODE'
	        );

	        cb(error);
	        return;
	      }

	      this._compressed = compressed;
	    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
	      if (!this._fin) {
	        const error = this.createError(
	          RangeError,
	          'FIN must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_FIN'
	        );

	        cb(error);
	        return;
	      }

	      if (compressed) {
	        const error = this.createError(
	          RangeError,
	          'RSV1 must be clear',
	          true,
	          1002,
	          'WS_ERR_UNEXPECTED_RSV_1'
	        );

	        cb(error);
	        return;
	      }

	      if (
	        this._payloadLength > 0x7d ||
	        (this._opcode === 0x08 && this._payloadLength === 1)
	      ) {
	        const error = this.createError(
	          RangeError,
	          `invalid payload length ${this._payloadLength}`,
	          true,
	          1002,
	          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
	        );

	        cb(error);
	        return;
	      }
	    } else {
	      const error = this.createError(
	        RangeError,
	        `invalid opcode ${this._opcode}`,
	        true,
	        1002,
	        'WS_ERR_INVALID_OPCODE'
	      );

	      cb(error);
	      return;
	    }

	    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
	    this._masked = (buf[1] & 0x80) === 0x80;

	    if (this._isServer) {
	      if (!this._masked) {
	        const error = this.createError(
	          RangeError,
	          'MASK must be set',
	          true,
	          1002,
	          'WS_ERR_EXPECTED_MASK'
	        );

	        cb(error);
	        return;
	      }
	    } else if (this._masked) {
	      const error = this.createError(
	        RangeError,
	        'MASK must be clear',
	        true,
	        1002,
	        'WS_ERR_UNEXPECTED_MASK'
	      );

	      cb(error);
	      return;
	    }

	    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
	    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
	    else this.haveLength(cb);
	  }

	  /**
	   * Gets extended payload length (7+16).
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getPayloadLength16(cb) {
	    if (this._bufferedBytes < 2) {
	      this._loop = false;
	      return;
	    }

	    this._payloadLength = this.consume(2).readUInt16BE(0);
	    this.haveLength(cb);
	  }

	  /**
	   * Gets extended payload length (7+64).
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getPayloadLength64(cb) {
	    if (this._bufferedBytes < 8) {
	      this._loop = false;
	      return;
	    }

	    const buf = this.consume(8);
	    const num = buf.readUInt32BE(0);

	    //
	    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
	    // if payload length is greater than this number.
	    //
	    if (num > Math.pow(2, 53 - 32) - 1) {
	      const error = this.createError(
	        RangeError,
	        'Unsupported WebSocket frame: payload length > 2^53 - 1',
	        false,
	        1009,
	        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
	      );

	      cb(error);
	      return;
	    }

	    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
	    this.haveLength(cb);
	  }

	  /**
	   * Payload length has been read.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  haveLength(cb) {
	    if (this._payloadLength && this._opcode < 0x08) {
	      this._totalPayloadLength += this._payloadLength;
	      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
	        const error = this.createError(
	          RangeError,
	          'Max payload size exceeded',
	          false,
	          1009,
	          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	        );

	        cb(error);
	        return;
	      }
	    }

	    if (this._masked) this._state = GET_MASK;
	    else this._state = GET_DATA;
	  }

	  /**
	   * Reads mask bytes.
	   *
	   * @private
	   */
	  getMask() {
	    if (this._bufferedBytes < 4) {
	      this._loop = false;
	      return;
	    }

	    this._mask = this.consume(4);
	    this._state = GET_DATA;
	  }

	  /**
	   * Reads data bytes.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  getData(cb) {
	    let data = EMPTY_BUFFER;

	    if (this._payloadLength) {
	      if (this._bufferedBytes < this._payloadLength) {
	        this._loop = false;
	        return;
	      }

	      data = this.consume(this._payloadLength);

	      if (
	        this._masked &&
	        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
	      ) {
	        unmask(data, this._mask);
	      }
	    }

	    if (this._opcode > 0x07) {
	      this.controlMessage(data, cb);
	      return;
	    }

	    if (this._compressed) {
	      this._state = INFLATING;
	      this.decompress(data, cb);
	      return;
	    }

	    if (data.length) {
	      //
	      // This message is not compressed so its length is the sum of the payload
	      // length of all fragments.
	      //
	      this._messageLength = this._totalPayloadLength;
	      this._fragments.push(data);
	    }

	    this.dataMessage(cb);
	  }

	  /**
	   * Decompresses data.
	   *
	   * @param {Buffer} data Compressed data
	   * @param {Function} cb Callback
	   * @private
	   */
	  decompress(data, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

	    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
	      if (err) return cb(err);

	      if (buf.length) {
	        this._messageLength += buf.length;
	        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
	          const error = this.createError(
	            RangeError,
	            'Max payload size exceeded',
	            false,
	            1009,
	            'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
	          );

	          cb(error);
	          return;
	        }

	        this._fragments.push(buf);
	      }

	      this.dataMessage(cb);
	      if (this._state === GET_INFO) this.startLoop(cb);
	    });
	  }

	  /**
	   * Handles a data message.
	   *
	   * @param {Function} cb Callback
	   * @private
	   */
	  dataMessage(cb) {
	    if (!this._fin) {
	      this._state = GET_INFO;
	      return;
	    }

	    const messageLength = this._messageLength;
	    const fragments = this._fragments;

	    this._totalPayloadLength = 0;
	    this._messageLength = 0;
	    this._fragmented = 0;
	    this._fragments = [];

	    if (this._opcode === 2) {
	      let data;

	      if (this._binaryType === 'nodebuffer') {
	        data = concat(fragments, messageLength);
	      } else if (this._binaryType === 'arraybuffer') {
	        data = toArrayBuffer(concat(fragments, messageLength));
	      } else if (this._binaryType === 'blob') {
	        data = new Blob(fragments);
	      } else {
	        data = fragments;
	      }

	      if (this._allowSynchronousEvents) {
	        this.emit('message', data, true);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', data, true);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    } else {
	      const buf = concat(fragments, messageLength);

	      if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	        const error = this.createError(
	          Error,
	          'invalid UTF-8 sequence',
	          true,
	          1007,
	          'WS_ERR_INVALID_UTF8'
	        );

	        cb(error);
	        return;
	      }

	      if (this._state === INFLATING || this._allowSynchronousEvents) {
	        this.emit('message', buf, false);
	        this._state = GET_INFO;
	      } else {
	        this._state = DEFER_EVENT;
	        setImmediate(() => {
	          this.emit('message', buf, false);
	          this._state = GET_INFO;
	          this.startLoop(cb);
	        });
	      }
	    }
	  }

	  /**
	   * Handles a control message.
	   *
	   * @param {Buffer} data Data to handle
	   * @return {(Error|RangeError|undefined)} A possible error
	   * @private
	   */
	  controlMessage(data, cb) {
	    if (this._opcode === 0x08) {
	      if (data.length === 0) {
	        this._loop = false;
	        this.emit('conclude', 1005, EMPTY_BUFFER);
	        this.end();
	      } else {
	        const code = data.readUInt16BE(0);

	        if (!isValidStatusCode(code)) {
	          const error = this.createError(
	            RangeError,
	            `invalid status code ${code}`,
	            true,
	            1002,
	            'WS_ERR_INVALID_CLOSE_CODE'
	          );

	          cb(error);
	          return;
	        }

	        const buf = new FastBuffer(
	          data.buffer,
	          data.byteOffset + 2,
	          data.length - 2
	        );

	        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
	          const error = this.createError(
	            Error,
	            'invalid UTF-8 sequence',
	            true,
	            1007,
	            'WS_ERR_INVALID_UTF8'
	          );

	          cb(error);
	          return;
	        }

	        this._loop = false;
	        this.emit('conclude', code, buf);
	        this.end();
	      }

	      this._state = GET_INFO;
	      return;
	    }

	    if (this._allowSynchronousEvents) {
	      this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	      this._state = GET_INFO;
	    } else {
	      this._state = DEFER_EVENT;
	      setImmediate(() => {
	        this.emit(this._opcode === 0x09 ? 'ping' : 'pong', data);
	        this._state = GET_INFO;
	        this.startLoop(cb);
	      });
	    }
	  }

	  /**
	   * Builds an error object.
	   *
	   * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
	   * @param {String} message The error message
	   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
	   *     `message`
	   * @param {Number} statusCode The status code
	   * @param {String} errorCode The exposed error code
	   * @return {(Error|RangeError)} The error
	   * @private
	   */
	  createError(ErrorCtor, message, prefix, statusCode, errorCode) {
	    this._loop = false;
	    this._errored = true;

	    const err = new ErrorCtor(
	      prefix ? `Invalid WebSocket frame: ${message}` : message
	    );

	    Error.captureStackTrace(err, this.createError);
	    err.code = errorCode;
	    err[kStatusCode] = statusCode;
	    return err;
	  }
	}

	receiver = Receiver;
	return receiver;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex" }] */

var sender;
var hasRequiredSender;

function requireSender () {
	if (hasRequiredSender) return sender;
	hasRequiredSender = 1;

	const { Duplex } = require$$0$4;
	const { randomFillSync } = crypto;

	const PerMessageDeflate = requirePermessageDeflate();
	const { EMPTY_BUFFER, kWebSocket, NOOP } = requireConstants();
	const { isBlob, isValidStatusCode } = requireValidation();
	const { mask: applyMask, toBuffer } = requireBufferUtil();

	const kByteLength = Symbol('kByteLength');
	const maskBuffer = Buffer.alloc(4);
	const RANDOM_POOL_SIZE = 8 * 1024;
	let randomPool;
	let randomPoolPointer = RANDOM_POOL_SIZE;

	const DEFAULT = 0;
	const DEFLATING = 1;
	const GET_BLOB_DATA = 2;

	/**
	 * HyBi Sender implementation.
	 */
	class Sender {
	  /**
	   * Creates a Sender instance.
	   *
	   * @param {Duplex} socket The connection socket
	   * @param {Object} [extensions] An object containing the negotiated extensions
	   * @param {Function} [generateMask] The function used to generate the masking
	   *     key
	   */
	  constructor(socket, extensions, generateMask) {
	    this._extensions = extensions || {};

	    if (generateMask) {
	      this._generateMask = generateMask;
	      this._maskBuffer = Buffer.alloc(4);
	    }

	    this._socket = socket;

	    this._firstFragment = true;
	    this._compress = false;

	    this._bufferedBytes = 0;
	    this._queue = [];
	    this._state = DEFAULT;
	    this.onerror = NOOP;
	    this[kWebSocket] = undefined;
	  }

	  /**
	   * Frames a piece of data according to the HyBi WebSocket protocol.
	   *
	   * @param {(Buffer|String)} data The data to frame
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @return {(Buffer|String)[]} The framed data
	   * @public
	   */
	  static frame(data, options) {
	    let mask;
	    let merge = false;
	    let offset = 2;
	    let skipMasking = false;

	    if (options.mask) {
	      mask = options.maskBuffer || maskBuffer;

	      if (options.generateMask) {
	        options.generateMask(mask);
	      } else {
	        if (randomPoolPointer === RANDOM_POOL_SIZE) {
	          /* istanbul ignore else  */
	          if (randomPool === undefined) {
	            //
	            // This is lazily initialized because server-sent frames must not
	            // be masked so it may never be used.
	            //
	            randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
	          }

	          randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
	          randomPoolPointer = 0;
	        }

	        mask[0] = randomPool[randomPoolPointer++];
	        mask[1] = randomPool[randomPoolPointer++];
	        mask[2] = randomPool[randomPoolPointer++];
	        mask[3] = randomPool[randomPoolPointer++];
	      }

	      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
	      offset = 6;
	    }

	    let dataLength;

	    if (typeof data === 'string') {
	      if (
	        (!options.mask || skipMasking) &&
	        options[kByteLength] !== undefined
	      ) {
	        dataLength = options[kByteLength];
	      } else {
	        data = Buffer.from(data);
	        dataLength = data.length;
	      }
	    } else {
	      dataLength = data.length;
	      merge = options.mask && options.readOnly && !skipMasking;
	    }

	    let payloadLength = dataLength;

	    if (dataLength >= 65536) {
	      offset += 8;
	      payloadLength = 127;
	    } else if (dataLength > 125) {
	      offset += 2;
	      payloadLength = 126;
	    }

	    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

	    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
	    if (options.rsv1) target[0] |= 0x40;

	    target[1] = payloadLength;

	    if (payloadLength === 126) {
	      target.writeUInt16BE(dataLength, 2);
	    } else if (payloadLength === 127) {
	      target[2] = target[3] = 0;
	      target.writeUIntBE(dataLength, 4, 6);
	    }

	    if (!options.mask) return [target, data];

	    target[1] |= 0x80;
	    target[offset - 4] = mask[0];
	    target[offset - 3] = mask[1];
	    target[offset - 2] = mask[2];
	    target[offset - 1] = mask[3];

	    if (skipMasking) return [target, data];

	    if (merge) {
	      applyMask(data, mask, target, offset, dataLength);
	      return [target];
	    }

	    applyMask(data, mask, data, 0, dataLength);
	    return [target, data];
	  }

	  /**
	   * Sends a close message to the other peer.
	   *
	   * @param {Number} [code] The status code component of the body
	   * @param {(String|Buffer)} [data] The message component of the body
	   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  close(code, data, mask, cb) {
	    let buf;

	    if (code === undefined) {
	      buf = EMPTY_BUFFER;
	    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
	      throw new TypeError('First argument must be a valid error code number');
	    } else if (data === undefined || !data.length) {
	      buf = Buffer.allocUnsafe(2);
	      buf.writeUInt16BE(code, 0);
	    } else {
	      const length = Buffer.byteLength(data);

	      if (length > 123) {
	        throw new RangeError('The message must not be greater than 123 bytes');
	      }

	      buf = Buffer.allocUnsafe(2 + length);
	      buf.writeUInt16BE(code, 0);

	      if (typeof data === 'string') {
	        buf.write(data, 2);
	      } else {
	        buf.set(data, 2);
	      }
	    }

	    const options = {
	      [kByteLength]: buf.length,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x08,
	      readOnly: false,
	      rsv1: false
	    };

	    if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, buf, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(buf, options), cb);
	    }
	  }

	  /**
	   * Sends a ping message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  ping(data, mask, cb) {
	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }

	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x09,
	      readOnly,
	      rsv1: false
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }

	  /**
	   * Sends a pong message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  pong(data, mask, cb) {
	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (byteLength > 125) {
	      throw new RangeError('The data size must not be greater than 125 bytes');
	    }

	    const options = {
	      [kByteLength]: byteLength,
	      fin: true,
	      generateMask: this._generateMask,
	      mask,
	      maskBuffer: this._maskBuffer,
	      opcode: 0x0a,
	      readOnly,
	      rsv1: false
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, false, options, cb]);
	      } else {
	        this.getBlobData(data, false, options, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, false, options, cb]);
	    } else {
	      this.sendFrame(Sender.frame(data, options), cb);
	    }
	  }

	  /**
	   * Sends a data message to the other peer.
	   *
	   * @param {*} data The message to send
	   * @param {Object} options Options object
	   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
	   *     or text
	   * @param {Boolean} [options.compress=false] Specifies whether or not to
	   *     compress `data`
	   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
	   *     last one
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Function} [cb] Callback
	   * @public
	   */
	  send(data, options, cb) {
	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
	    let opcode = options.binary ? 2 : 1;
	    let rsv1 = options.compress;

	    let byteLength;
	    let readOnly;

	    if (typeof data === 'string') {
	      byteLength = Buffer.byteLength(data);
	      readOnly = false;
	    } else if (isBlob(data)) {
	      byteLength = data.size;
	      readOnly = false;
	    } else {
	      data = toBuffer(data);
	      byteLength = data.length;
	      readOnly = toBuffer.readOnly;
	    }

	    if (this._firstFragment) {
	      this._firstFragment = false;
	      if (
	        rsv1 &&
	        perMessageDeflate &&
	        perMessageDeflate.params[
	          perMessageDeflate._isServer
	            ? 'server_no_context_takeover'
	            : 'client_no_context_takeover'
	        ]
	      ) {
	        rsv1 = byteLength >= perMessageDeflate._threshold;
	      }
	      this._compress = rsv1;
	    } else {
	      rsv1 = false;
	      opcode = 0;
	    }

	    if (options.fin) this._firstFragment = true;

	    const opts = {
	      [kByteLength]: byteLength,
	      fin: options.fin,
	      generateMask: this._generateMask,
	      mask: options.mask,
	      maskBuffer: this._maskBuffer,
	      opcode,
	      readOnly,
	      rsv1
	    };

	    if (isBlob(data)) {
	      if (this._state !== DEFAULT) {
	        this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
	      } else {
	        this.getBlobData(data, this._compress, opts, cb);
	      }
	    } else if (this._state !== DEFAULT) {
	      this.enqueue([this.dispatch, data, this._compress, opts, cb]);
	    } else {
	      this.dispatch(data, this._compress, opts, cb);
	    }
	  }

	  /**
	   * Gets the contents of a blob as binary data.
	   *
	   * @param {Blob} blob The blob
	   * @param {Boolean} [compress=false] Specifies whether or not to compress
	   *     the data
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  getBlobData(blob, compress, options, cb) {
	    this._bufferedBytes += options[kByteLength];
	    this._state = GET_BLOB_DATA;

	    blob
	      .arrayBuffer()
	      .then((arrayBuffer) => {
	        if (this._socket.destroyed) {
	          const err = new Error(
	            'The socket was closed while the blob was being read'
	          );

	          //
	          // `callCallbacks` is called in the next tick to ensure that errors
	          // that might be thrown in the callbacks behave like errors thrown
	          // outside the promise chain.
	          //
	          process.nextTick(callCallbacks, this, err, cb);
	          return;
	        }

	        this._bufferedBytes -= options[kByteLength];
	        const data = toBuffer(arrayBuffer);

	        if (!compress) {
	          this._state = DEFAULT;
	          this.sendFrame(Sender.frame(data, options), cb);
	          this.dequeue();
	        } else {
	          this.dispatch(data, compress, options, cb);
	        }
	      })
	      .catch((err) => {
	        //
	        // `onError` is called in the next tick for the same reason that
	        // `callCallbacks` above is.
	        //
	        process.nextTick(onError, this, err, cb);
	      });
	  }

	  /**
	   * Dispatches a message.
	   *
	   * @param {(Buffer|String)} data The message to send
	   * @param {Boolean} [compress=false] Specifies whether or not to compress
	   *     `data`
	   * @param {Object} options Options object
	   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
	   *     FIN bit
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
	   *     `data`
	   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
	   *     key
	   * @param {Number} options.opcode The opcode
	   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
	   *     modified
	   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
	   *     RSV1 bit
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  dispatch(data, compress, options, cb) {
	    if (!compress) {
	      this.sendFrame(Sender.frame(data, options), cb);
	      return;
	    }

	    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

	    this._bufferedBytes += options[kByteLength];
	    this._state = DEFLATING;
	    perMessageDeflate.compress(data, options.fin, (_, buf) => {
	      if (this._socket.destroyed) {
	        const err = new Error(
	          'The socket was closed while data was being compressed'
	        );

	        callCallbacks(this, err, cb);
	        return;
	      }

	      this._bufferedBytes -= options[kByteLength];
	      this._state = DEFAULT;
	      options.readOnly = false;
	      this.sendFrame(Sender.frame(buf, options), cb);
	      this.dequeue();
	    });
	  }

	  /**
	   * Executes queued send operations.
	   *
	   * @private
	   */
	  dequeue() {
	    while (this._state === DEFAULT && this._queue.length) {
	      const params = this._queue.shift();

	      this._bufferedBytes -= params[3][kByteLength];
	      Reflect.apply(params[0], this, params.slice(1));
	    }
	  }

	  /**
	   * Enqueues a send operation.
	   *
	   * @param {Array} params Send operation parameters.
	   * @private
	   */
	  enqueue(params) {
	    this._bufferedBytes += params[3][kByteLength];
	    this._queue.push(params);
	  }

	  /**
	   * Sends a frame.
	   *
	   * @param {(Buffer | String)[]} list The frame to send
	   * @param {Function} [cb] Callback
	   * @private
	   */
	  sendFrame(list, cb) {
	    if (list.length === 2) {
	      this._socket.cork();
	      this._socket.write(list[0]);
	      this._socket.write(list[1], cb);
	      this._socket.uncork();
	    } else {
	      this._socket.write(list[0], cb);
	    }
	  }
	}

	sender = Sender;

	/**
	 * Calls queued callbacks with an error.
	 *
	 * @param {Sender} sender The `Sender` instance
	 * @param {Error} err The error to call the callbacks with
	 * @param {Function} [cb] The first callback
	 * @private
	 */
	function callCallbacks(sender, err, cb) {
	  if (typeof cb === 'function') cb(err);

	  for (let i = 0; i < sender._queue.length; i++) {
	    const params = sender._queue[i];
	    const callback = params[params.length - 1];

	    if (typeof callback === 'function') callback(err);
	  }
	}

	/**
	 * Handles a `Sender` error.
	 *
	 * @param {Sender} sender The `Sender` instance
	 * @param {Error} err The error
	 * @param {Function} [cb] The first pending callback
	 * @private
	 */
	function onError(sender, err, cb) {
	  callCallbacks(sender, err, cb);
	  sender.onerror(err);
	}
	return sender;
}

var eventTarget;
var hasRequiredEventTarget;

function requireEventTarget () {
	if (hasRequiredEventTarget) return eventTarget;
	hasRequiredEventTarget = 1;

	const { kForOnEventAttribute, kListener } = requireConstants();

	const kCode = Symbol('kCode');
	const kData = Symbol('kData');
	const kError = Symbol('kError');
	const kMessage = Symbol('kMessage');
	const kReason = Symbol('kReason');
	const kTarget = Symbol('kTarget');
	const kType = Symbol('kType');
	const kWasClean = Symbol('kWasClean');

	/**
	 * Class representing an event.
	 */
	class Event {
	  /**
	   * Create a new `Event`.
	   *
	   * @param {String} type The name of the event
	   * @throws {TypeError} If the `type` argument is not specified
	   */
	  constructor(type) {
	    this[kTarget] = null;
	    this[kType] = type;
	  }

	  /**
	   * @type {*}
	   */
	  get target() {
	    return this[kTarget];
	  }

	  /**
	   * @type {String}
	   */
	  get type() {
	    return this[kType];
	  }
	}

	Object.defineProperty(Event.prototype, 'target', { enumerable: true });
	Object.defineProperty(Event.prototype, 'type', { enumerable: true });

	/**
	 * Class representing a close event.
	 *
	 * @extends Event
	 */
	class CloseEvent extends Event {
	  /**
	   * Create a new `CloseEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {Number} [options.code=0] The status code explaining why the
	   *     connection was closed
	   * @param {String} [options.reason=''] A human-readable string explaining why
	   *     the connection was closed
	   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
	   *     connection was cleanly closed
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kCode] = options.code === undefined ? 0 : options.code;
	    this[kReason] = options.reason === undefined ? '' : options.reason;
	    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
	  }

	  /**
	   * @type {Number}
	   */
	  get code() {
	    return this[kCode];
	  }

	  /**
	   * @type {String}
	   */
	  get reason() {
	    return this[kReason];
	  }

	  /**
	   * @type {Boolean}
	   */
	  get wasClean() {
	    return this[kWasClean];
	  }
	}

	Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
	Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

	/**
	 * Class representing an error event.
	 *
	 * @extends Event
	 */
	class ErrorEvent extends Event {
	  /**
	   * Create a new `ErrorEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {*} [options.error=null] The error that generated this event
	   * @param {String} [options.message=''] The error message
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kError] = options.error === undefined ? null : options.error;
	    this[kMessage] = options.message === undefined ? '' : options.message;
	  }

	  /**
	   * @type {*}
	   */
	  get error() {
	    return this[kError];
	  }

	  /**
	   * @type {String}
	   */
	  get message() {
	    return this[kMessage];
	  }
	}

	Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
	Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

	/**
	 * Class representing a message event.
	 *
	 * @extends Event
	 */
	class MessageEvent extends Event {
	  /**
	   * Create a new `MessageEvent`.
	   *
	   * @param {String} type The name of the event
	   * @param {Object} [options] A dictionary object that allows for setting
	   *     attributes via object members of the same name
	   * @param {*} [options.data=null] The message content
	   */
	  constructor(type, options = {}) {
	    super(type);

	    this[kData] = options.data === undefined ? null : options.data;
	  }

	  /**
	   * @type {*}
	   */
	  get data() {
	    return this[kData];
	  }
	}

	Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

	/**
	 * This provides methods for emulating the `EventTarget` interface. It's not
	 * meant to be used directly.
	 *
	 * @mixin
	 */
	const EventTarget = {
	  /**
	   * Register an event listener.
	   *
	   * @param {String} type A string representing the event type to listen for
	   * @param {(Function|Object)} handler The listener to add
	   * @param {Object} [options] An options object specifies characteristics about
	   *     the event listener
	   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
	   *     listener should be invoked at most once after being added. If `true`,
	   *     the listener would be automatically removed when invoked.
	   * @public
	   */
	  addEventListener(type, handler, options = {}) {
	    for (const listener of this.listeners(type)) {
	      if (
	        !options[kForOnEventAttribute] &&
	        listener[kListener] === handler &&
	        !listener[kForOnEventAttribute]
	      ) {
	        return;
	      }
	    }

	    let wrapper;

	    if (type === 'message') {
	      wrapper = function onMessage(data, isBinary) {
	        const event = new MessageEvent('message', {
	          data: isBinary ? data : data.toString()
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'close') {
	      wrapper = function onClose(code, message) {
	        const event = new CloseEvent('close', {
	          code,
	          reason: message.toString(),
	          wasClean: this._closeFrameReceived && this._closeFrameSent
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'error') {
	      wrapper = function onError(error) {
	        const event = new ErrorEvent('error', {
	          error,
	          message: error.message
	        });

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else if (type === 'open') {
	      wrapper = function onOpen() {
	        const event = new Event('open');

	        event[kTarget] = this;
	        callListener(handler, this, event);
	      };
	    } else {
	      return;
	    }

	    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
	    wrapper[kListener] = handler;

	    if (options.once) {
	      this.once(type, wrapper);
	    } else {
	      this.on(type, wrapper);
	    }
	  },

	  /**
	   * Remove an event listener.
	   *
	   * @param {String} type A string representing the event type to remove
	   * @param {(Function|Object)} handler The listener to remove
	   * @public
	   */
	  removeEventListener(type, handler) {
	    for (const listener of this.listeners(type)) {
	      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
	        this.removeListener(type, listener);
	        break;
	      }
	    }
	  }
	};

	eventTarget = {
	  CloseEvent,
	  ErrorEvent,
	  Event,
	  EventTarget,
	  MessageEvent
	};

	/**
	 * Call an event listener
	 *
	 * @param {(Function|Object)} listener The listener to call
	 * @param {*} thisArg The value to use as `this`` when calling the listener
	 * @param {Event} event The event to pass to the listener
	 * @private
	 */
	function callListener(listener, thisArg, event) {
	  if (typeof listener === 'object' && listener.handleEvent) {
	    listener.handleEvent.call(listener, event);
	  } else {
	    listener.call(thisArg, event);
	  }
	}
	return eventTarget;
}

var extension;
var hasRequiredExtension;

function requireExtension () {
	if (hasRequiredExtension) return extension;
	hasRequiredExtension = 1;

	const { tokenChars } = requireValidation();

	/**
	 * Adds an offer to the map of extension offers or a parameter to the map of
	 * parameters.
	 *
	 * @param {Object} dest The map of extension offers or parameters
	 * @param {String} name The extension or parameter name
	 * @param {(Object|Boolean|String)} elem The extension parameters or the
	 *     parameter value
	 * @private
	 */
	function push(dest, name, elem) {
	  if (dest[name] === undefined) dest[name] = [elem];
	  else dest[name].push(elem);
	}

	/**
	 * Parses the `Sec-WebSocket-Extensions` header into an object.
	 *
	 * @param {String} header The field value of the header
	 * @return {Object} The parsed object
	 * @public
	 */
	function parse(header) {
	  const offers = Object.create(null);
	  let params = Object.create(null);
	  let mustUnescape = false;
	  let isEscaping = false;
	  let inQuotes = false;
	  let extensionName;
	  let paramName;
	  let start = -1;
	  let code = -1;
	  let end = -1;
	  let i = 0;

	  for (; i < header.length; i++) {
	    code = header.charCodeAt(i);

	    if (extensionName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (
	        i !== 0 &&
	        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
	      ) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        const name = header.slice(start, end);
	        if (code === 0x2c) {
	          push(offers, name, params);
	          params = Object.create(null);
	        } else {
	          extensionName = name;
	        }

	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else if (paramName === undefined) {
	      if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (code === 0x20 || code === 0x09) {
	        if (end === -1 && start !== -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        push(params, header.slice(start, end), true);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }

	        start = end = -1;
	      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
	        paramName = header.slice(start, i);
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    } else {
	      //
	      // The value of a quoted-string after unescaping must conform to the
	      // token ABNF, so only token characters are valid.
	      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
	      //
	      if (isEscaping) {
	        if (tokenChars[code] !== 1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	        if (start === -1) start = i;
	        else if (!mustUnescape) mustUnescape = true;
	        isEscaping = false;
	      } else if (inQuotes) {
	        if (tokenChars[code] === 1) {
	          if (start === -1) start = i;
	        } else if (code === 0x22 /* '"' */ && start !== -1) {
	          inQuotes = false;
	          end = i;
	        } else if (code === 0x5c /* '\' */) {
	          isEscaping = true;
	        } else {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }
	      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
	        inQuotes = true;
	      } else if (end === -1 && tokenChars[code] === 1) {
	        if (start === -1) start = i;
	      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
	        if (end === -1) end = i;
	      } else if (code === 0x3b || code === 0x2c) {
	        if (start === -1) {
	          throw new SyntaxError(`Unexpected character at index ${i}`);
	        }

	        if (end === -1) end = i;
	        let value = header.slice(start, end);
	        if (mustUnescape) {
	          value = value.replace(/\\/g, '');
	          mustUnescape = false;
	        }
	        push(params, paramName, value);
	        if (code === 0x2c) {
	          push(offers, extensionName, params);
	          params = Object.create(null);
	          extensionName = undefined;
	        }

	        paramName = undefined;
	        start = end = -1;
	      } else {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }
	    }
	  }

	  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
	    throw new SyntaxError('Unexpected end of input');
	  }

	  if (end === -1) end = i;
	  const token = header.slice(start, end);
	  if (extensionName === undefined) {
	    push(offers, token, params);
	  } else {
	    if (paramName === undefined) {
	      push(params, token, true);
	    } else if (mustUnescape) {
	      push(params, paramName, token.replace(/\\/g, ''));
	    } else {
	      push(params, paramName, token);
	    }
	    push(offers, extensionName, params);
	  }

	  return offers;
	}

	/**
	 * Builds the `Sec-WebSocket-Extensions` header field value.
	 *
	 * @param {Object} extensions The map of extensions and parameters to format
	 * @return {String} A string representing the given object
	 * @public
	 */
	function format(extensions) {
	  return Object.keys(extensions)
	    .map((extension) => {
	      let configurations = extensions[extension];
	      if (!Array.isArray(configurations)) configurations = [configurations];
	      return configurations
	        .map((params) => {
	          return [extension]
	            .concat(
	              Object.keys(params).map((k) => {
	                let values = params[k];
	                if (!Array.isArray(values)) values = [values];
	                return values
	                  .map((v) => (v === true ? k : `${k}=${v}`))
	                  .join('; ');
	              })
	            )
	            .join('; ');
	        })
	        .join(', ');
	    })
	    .join(', ');
	}

	extension = { format, parse };
	return extension;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex|Readable$", "caughtErrors": "none" }] */

var websocket;
var hasRequiredWebsocket;

function requireWebsocket () {
	if (hasRequiredWebsocket) return websocket;
	hasRequiredWebsocket = 1;

	const EventEmitter = require$$0$5;
	const https = require$$1$1;
	const http = require$$2$1;
	const net = require$$3$1;
	const tls = require$$4$1;
	const { randomBytes, createHash } = crypto;
	const { Duplex, Readable } = require$$0$4;
	const { URL } = require$$7;

	const PerMessageDeflate = requirePermessageDeflate();
	const Receiver = requireReceiver();
	const Sender = requireSender();
	const { isBlob } = requireValidation();

	const {
	  BINARY_TYPES,
	  EMPTY_BUFFER,
	  GUID,
	  kForOnEventAttribute,
	  kListener,
	  kStatusCode,
	  kWebSocket,
	  NOOP
	} = requireConstants();
	const {
	  EventTarget: { addEventListener, removeEventListener }
	} = requireEventTarget();
	const { format, parse } = requireExtension();
	const { toBuffer } = requireBufferUtil();

	const closeTimeout = 30 * 1000;
	const kAborted = Symbol('kAborted');
	const protocolVersions = [8, 13];
	const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
	const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

	/**
	 * Class representing a WebSocket.
	 *
	 * @extends EventEmitter
	 */
	class WebSocket extends EventEmitter {
	  /**
	   * Create a new `WebSocket`.
	   *
	   * @param {(String|URL)} address The URL to which to connect
	   * @param {(String|String[])} [protocols] The subprotocols
	   * @param {Object} [options] Connection options
	   */
	  constructor(address, protocols, options) {
	    super();

	    this._binaryType = BINARY_TYPES[0];
	    this._closeCode = 1006;
	    this._closeFrameReceived = false;
	    this._closeFrameSent = false;
	    this._closeMessage = EMPTY_BUFFER;
	    this._closeTimer = null;
	    this._errorEmitted = false;
	    this._extensions = {};
	    this._paused = false;
	    this._protocol = '';
	    this._readyState = WebSocket.CONNECTING;
	    this._receiver = null;
	    this._sender = null;
	    this._socket = null;

	    if (address !== null) {
	      this._bufferedAmount = 0;
	      this._isServer = false;
	      this._redirects = 0;

	      if (protocols === undefined) {
	        protocols = [];
	      } else if (!Array.isArray(protocols)) {
	        if (typeof protocols === 'object' && protocols !== null) {
	          options = protocols;
	          protocols = [];
	        } else {
	          protocols = [protocols];
	        }
	      }

	      initAsClient(this, address, protocols, options);
	    } else {
	      this._autoPong = options.autoPong;
	      this._isServer = true;
	    }
	  }

	  /**
	   * For historical reasons, the custom "nodebuffer" type is used by the default
	   * instead of "blob".
	   *
	   * @type {String}
	   */
	  get binaryType() {
	    return this._binaryType;
	  }

	  set binaryType(type) {
	    if (!BINARY_TYPES.includes(type)) return;

	    this._binaryType = type;

	    //
	    // Allow to change `binaryType` on the fly.
	    //
	    if (this._receiver) this._receiver._binaryType = type;
	  }

	  /**
	   * @type {Number}
	   */
	  get bufferedAmount() {
	    if (!this._socket) return this._bufferedAmount;

	    return this._socket._writableState.length + this._sender._bufferedBytes;
	  }

	  /**
	   * @type {String}
	   */
	  get extensions() {
	    return Object.keys(this._extensions).join();
	  }

	  /**
	   * @type {Boolean}
	   */
	  get isPaused() {
	    return this._paused;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onclose() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onerror() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onopen() {
	    return null;
	  }

	  /**
	   * @type {Function}
	   */
	  /* istanbul ignore next */
	  get onmessage() {
	    return null;
	  }

	  /**
	   * @type {String}
	   */
	  get protocol() {
	    return this._protocol;
	  }

	  /**
	   * @type {Number}
	   */
	  get readyState() {
	    return this._readyState;
	  }

	  /**
	   * @type {String}
	   */
	  get url() {
	    return this._url;
	  }

	  /**
	   * Set up the socket and the internal resources.
	   *
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Object} options Options object
	   * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {Function} [options.generateMask] The function used to generate the
	   *     masking key
	   * @param {Number} [options.maxPayload=0] The maximum allowed message size
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   * @private
	   */
	  setSocket(socket, head, options) {
	    const receiver = new Receiver({
	      allowSynchronousEvents: options.allowSynchronousEvents,
	      binaryType: this.binaryType,
	      extensions: this._extensions,
	      isServer: this._isServer,
	      maxPayload: options.maxPayload,
	      skipUTF8Validation: options.skipUTF8Validation
	    });

	    const sender = new Sender(socket, this._extensions, options.generateMask);

	    this._receiver = receiver;
	    this._sender = sender;
	    this._socket = socket;

	    receiver[kWebSocket] = this;
	    sender[kWebSocket] = this;
	    socket[kWebSocket] = this;

	    receiver.on('conclude', receiverOnConclude);
	    receiver.on('drain', receiverOnDrain);
	    receiver.on('error', receiverOnError);
	    receiver.on('message', receiverOnMessage);
	    receiver.on('ping', receiverOnPing);
	    receiver.on('pong', receiverOnPong);

	    sender.onerror = senderOnError;

	    //
	    // These methods may not be available if `socket` is just a `Duplex`.
	    //
	    if (socket.setTimeout) socket.setTimeout(0);
	    if (socket.setNoDelay) socket.setNoDelay();

	    if (head.length > 0) socket.unshift(head);

	    socket.on('close', socketOnClose);
	    socket.on('data', socketOnData);
	    socket.on('end', socketOnEnd);
	    socket.on('error', socketOnError);

	    this._readyState = WebSocket.OPEN;
	    this.emit('open');
	  }

	  /**
	   * Emit the `'close'` event.
	   *
	   * @private
	   */
	  emitClose() {
	    if (!this._socket) {
	      this._readyState = WebSocket.CLOSED;
	      this.emit('close', this._closeCode, this._closeMessage);
	      return;
	    }

	    if (this._extensions[PerMessageDeflate.extensionName]) {
	      this._extensions[PerMessageDeflate.extensionName].cleanup();
	    }

	    this._receiver.removeAllListeners();
	    this._readyState = WebSocket.CLOSED;
	    this.emit('close', this._closeCode, this._closeMessage);
	  }

	  /**
	   * Start a closing handshake.
	   *
	   *          +----------+   +-----------+   +----------+
	   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
	   *    |     +----------+   +-----------+   +----------+     |
	   *          +----------+   +-----------+         |
	   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
	   *          +----------+   +-----------+   |
	   *    |           |                        |   +---+        |
	   *                +------------------------+-->|fin| - - - -
	   *    |         +---+                      |   +---+
	   *     - - - - -|fin|<---------------------+
	   *              +---+
	   *
	   * @param {Number} [code] Status code explaining why the connection is closing
	   * @param {(String|Buffer)} [data] The reason why the connection is
	   *     closing
	   * @public
	   */
	  close(code, data) {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }

	    if (this.readyState === WebSocket.CLOSING) {
	      if (
	        this._closeFrameSent &&
	        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
	      ) {
	        this._socket.end();
	      }

	      return;
	    }

	    this._readyState = WebSocket.CLOSING;
	    this._sender.close(code, data, !this._isServer, (err) => {
	      //
	      // This error is handled by the `'error'` listener on the socket. We only
	      // want to know if the close frame has been sent here.
	      //
	      if (err) return;

	      this._closeFrameSent = true;

	      if (
	        this._closeFrameReceived ||
	        this._receiver._writableState.errorEmitted
	      ) {
	        this._socket.end();
	      }
	    });

	    setCloseTimer(this);
	  }

	  /**
	   * Pause the socket.
	   *
	   * @public
	   */
	  pause() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }

	    this._paused = true;
	    this._socket.pause();
	  }

	  /**
	   * Send a ping.
	   *
	   * @param {*} [data] The data to send
	   * @param {Boolean} [mask] Indicates whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when the ping is sent
	   * @public
	   */
	  ping(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    if (mask === undefined) mask = !this._isServer;
	    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
	  }

	  /**
	   * Send a pong.
	   *
	   * @param {*} [data] The data to send
	   * @param {Boolean} [mask] Indicates whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when the pong is sent
	   * @public
	   */
	  pong(data, mask, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof data === 'function') {
	      cb = data;
	      data = mask = undefined;
	    } else if (typeof mask === 'function') {
	      cb = mask;
	      mask = undefined;
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    if (mask === undefined) mask = !this._isServer;
	    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
	  }

	  /**
	   * Resume the socket.
	   *
	   * @public
	   */
	  resume() {
	    if (
	      this.readyState === WebSocket.CONNECTING ||
	      this.readyState === WebSocket.CLOSED
	    ) {
	      return;
	    }

	    this._paused = false;
	    if (!this._receiver._writableState.needDrain) this._socket.resume();
	  }

	  /**
	   * Send a data message.
	   *
	   * @param {*} data The message to send
	   * @param {Object} [options] Options object
	   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
	   *     text
	   * @param {Boolean} [options.compress] Specifies whether or not to compress
	   *     `data`
	   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
	   *     last one
	   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
	   * @param {Function} [cb] Callback which is executed when data is written out
	   * @public
	   */
	  send(data, options, cb) {
	    if (this.readyState === WebSocket.CONNECTING) {
	      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
	    }

	    if (typeof options === 'function') {
	      cb = options;
	      options = {};
	    }

	    if (typeof data === 'number') data = data.toString();

	    if (this.readyState !== WebSocket.OPEN) {
	      sendAfterClose(this, data, cb);
	      return;
	    }

	    const opts = {
	      binary: typeof data !== 'string',
	      mask: !this._isServer,
	      compress: true,
	      fin: true,
	      ...options
	    };

	    if (!this._extensions[PerMessageDeflate.extensionName]) {
	      opts.compress = false;
	    }

	    this._sender.send(data || EMPTY_BUFFER, opts, cb);
	  }

	  /**
	   * Forcibly close the connection.
	   *
	   * @public
	   */
	  terminate() {
	    if (this.readyState === WebSocket.CLOSED) return;
	    if (this.readyState === WebSocket.CONNECTING) {
	      const msg = 'WebSocket was closed before the connection was established';
	      abortHandshake(this, this._req, msg);
	      return;
	    }

	    if (this._socket) {
	      this._readyState = WebSocket.CLOSING;
	      this._socket.destroy();
	    }
	  }
	}

	/**
	 * @constant {Number} CONNECTING
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});

	/**
	 * @constant {Number} CONNECTING
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
	  enumerable: true,
	  value: readyStates.indexOf('CONNECTING')
	});

	/**
	 * @constant {Number} OPEN
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});

	/**
	 * @constant {Number} OPEN
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'OPEN', {
	  enumerable: true,
	  value: readyStates.indexOf('OPEN')
	});

	/**
	 * @constant {Number} CLOSING
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});

	/**
	 * @constant {Number} CLOSING
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CLOSING', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSING')
	});

	/**
	 * @constant {Number} CLOSED
	 * @memberof WebSocket
	 */
	Object.defineProperty(WebSocket, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});

	/**
	 * @constant {Number} CLOSED
	 * @memberof WebSocket.prototype
	 */
	Object.defineProperty(WebSocket.prototype, 'CLOSED', {
	  enumerable: true,
	  value: readyStates.indexOf('CLOSED')
	});

	[
	  'binaryType',
	  'bufferedAmount',
	  'extensions',
	  'isPaused',
	  'protocol',
	  'readyState',
	  'url'
	].forEach((property) => {
	  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
	});

	//
	// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
	// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
	//
	['open', 'error', 'close', 'message'].forEach((method) => {
	  Object.defineProperty(WebSocket.prototype, `on${method}`, {
	    enumerable: true,
	    get() {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) return listener[kListener];
	      }

	      return null;
	    },
	    set(handler) {
	      for (const listener of this.listeners(method)) {
	        if (listener[kForOnEventAttribute]) {
	          this.removeListener(method, listener);
	          break;
	        }
	      }

	      if (typeof handler !== 'function') return;

	      this.addEventListener(method, handler, {
	        [kForOnEventAttribute]: true
	      });
	    }
	  });
	});

	WebSocket.prototype.addEventListener = addEventListener;
	WebSocket.prototype.removeEventListener = removeEventListener;

	websocket = WebSocket;

	/**
	 * Initialize a WebSocket client.
	 *
	 * @param {WebSocket} websocket The client to initialize
	 * @param {(String|URL)} address The URL to which to connect
	 * @param {Array} protocols The subprotocols
	 * @param {Object} [options] Connection options
	 * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether any
	 *     of the `'message'`, `'ping'`, and `'pong'` events can be emitted multiple
	 *     times in the same tick
	 * @param {Boolean} [options.autoPong=true] Specifies whether or not to
	 *     automatically send a pong in response to a ping
	 * @param {Function} [options.finishRequest] A function which can be used to
	 *     customize the headers of each http request before it is sent
	 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
	 *     redirects
	 * @param {Function} [options.generateMask] The function used to generate the
	 *     masking key
	 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
	 *     handshake request
	 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
	 *     size
	 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
	 *     allowed
	 * @param {String} [options.origin] Value of the `Origin` or
	 *     `Sec-WebSocket-Origin` header
	 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
	 *     permessage-deflate
	 * @param {Number} [options.protocolVersion=13] Value of the
	 *     `Sec-WebSocket-Version` header
	 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	 *     not to skip UTF-8 validation for text and close messages
	 * @private
	 */
	function initAsClient(websocket, address, protocols, options) {
	  const opts = {
	    allowSynchronousEvents: true,
	    autoPong: true,
	    protocolVersion: protocolVersions[1],
	    maxPayload: 100 * 1024 * 1024,
	    skipUTF8Validation: false,
	    perMessageDeflate: true,
	    followRedirects: false,
	    maxRedirects: 10,
	    ...options,
	    socketPath: undefined,
	    hostname: undefined,
	    protocol: undefined,
	    timeout: undefined,
	    method: 'GET',
	    host: undefined,
	    path: undefined,
	    port: undefined
	  };

	  websocket._autoPong = opts.autoPong;

	  if (!protocolVersions.includes(opts.protocolVersion)) {
	    throw new RangeError(
	      `Unsupported protocol version: ${opts.protocolVersion} ` +
	        `(supported versions: ${protocolVersions.join(', ')})`
	    );
	  }

	  let parsedUrl;

	  if (address instanceof URL) {
	    parsedUrl = address;
	  } else {
	    try {
	      parsedUrl = new URL(address);
	    } catch (e) {
	      throw new SyntaxError(`Invalid URL: ${address}`);
	    }
	  }

	  if (parsedUrl.protocol === 'http:') {
	    parsedUrl.protocol = 'ws:';
	  } else if (parsedUrl.protocol === 'https:') {
	    parsedUrl.protocol = 'wss:';
	  }

	  websocket._url = parsedUrl.href;

	  const isSecure = parsedUrl.protocol === 'wss:';
	  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
	  let invalidUrlMessage;

	  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
	    invalidUrlMessage =
	      'The URL\'s protocol must be one of "ws:", "wss:", ' +
	      '"http:", "https:", or "ws+unix:"';
	  } else if (isIpcUrl && !parsedUrl.pathname) {
	    invalidUrlMessage = "The URL's pathname is empty";
	  } else if (parsedUrl.hash) {
	    invalidUrlMessage = 'The URL contains a fragment identifier';
	  }

	  if (invalidUrlMessage) {
	    const err = new SyntaxError(invalidUrlMessage);

	    if (websocket._redirects === 0) {
	      throw err;
	    } else {
	      emitErrorAndClose(websocket, err);
	      return;
	    }
	  }

	  const defaultPort = isSecure ? 443 : 80;
	  const key = randomBytes(16).toString('base64');
	  const request = isSecure ? https.request : http.request;
	  const protocolSet = new Set();
	  let perMessageDeflate;

	  opts.createConnection =
	    opts.createConnection || (isSecure ? tlsConnect : netConnect);
	  opts.defaultPort = opts.defaultPort || defaultPort;
	  opts.port = parsedUrl.port || defaultPort;
	  opts.host = parsedUrl.hostname.startsWith('[')
	    ? parsedUrl.hostname.slice(1, -1)
	    : parsedUrl.hostname;
	  opts.headers = {
	    ...opts.headers,
	    'Sec-WebSocket-Version': opts.protocolVersion,
	    'Sec-WebSocket-Key': key,
	    Connection: 'Upgrade',
	    Upgrade: 'websocket'
	  };
	  opts.path = parsedUrl.pathname + parsedUrl.search;
	  opts.timeout = opts.handshakeTimeout;

	  if (opts.perMessageDeflate) {
	    perMessageDeflate = new PerMessageDeflate(
	      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
	      false,
	      opts.maxPayload
	    );
	    opts.headers['Sec-WebSocket-Extensions'] = format({
	      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
	    });
	  }
	  if (protocols.length) {
	    for (const protocol of protocols) {
	      if (
	        typeof protocol !== 'string' ||
	        !subprotocolRegex.test(protocol) ||
	        protocolSet.has(protocol)
	      ) {
	        throw new SyntaxError(
	          'An invalid or duplicated subprotocol was specified'
	        );
	      }

	      protocolSet.add(protocol);
	    }

	    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
	  }
	  if (opts.origin) {
	    if (opts.protocolVersion < 13) {
	      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
	    } else {
	      opts.headers.Origin = opts.origin;
	    }
	  }
	  if (parsedUrl.username || parsedUrl.password) {
	    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
	  }

	  if (isIpcUrl) {
	    const parts = opts.path.split(':');

	    opts.socketPath = parts[0];
	    opts.path = parts[1];
	  }

	  let req;

	  if (opts.followRedirects) {
	    if (websocket._redirects === 0) {
	      websocket._originalIpc = isIpcUrl;
	      websocket._originalSecure = isSecure;
	      websocket._originalHostOrSocketPath = isIpcUrl
	        ? opts.socketPath
	        : parsedUrl.host;

	      const headers = options && options.headers;

	      //
	      // Shallow copy the user provided options so that headers can be changed
	      // without mutating the original object.
	      //
	      options = { ...options, headers: {} };

	      if (headers) {
	        for (const [key, value] of Object.entries(headers)) {
	          options.headers[key.toLowerCase()] = value;
	        }
	      }
	    } else if (websocket.listenerCount('redirect') === 0) {
	      const isSameHost = isIpcUrl
	        ? websocket._originalIpc
	          ? opts.socketPath === websocket._originalHostOrSocketPath
	          : false
	        : websocket._originalIpc
	          ? false
	          : parsedUrl.host === websocket._originalHostOrSocketPath;

	      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
	        //
	        // Match curl 7.77.0 behavior and drop the following headers. These
	        // headers are also dropped when following a redirect to a subdomain.
	        //
	        delete opts.headers.authorization;
	        delete opts.headers.cookie;

	        if (!isSameHost) delete opts.headers.host;

	        opts.auth = undefined;
	      }
	    }

	    //
	    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
	    // If the `Authorization` header is set, then there is nothing to do as it
	    // will take precedence.
	    //
	    if (opts.auth && !options.headers.authorization) {
	      options.headers.authorization =
	        'Basic ' + Buffer.from(opts.auth).toString('base64');
	    }

	    req = websocket._req = request(opts);

	    if (websocket._redirects) {
	      //
	      // Unlike what is done for the `'upgrade'` event, no early exit is
	      // triggered here if the user calls `websocket.close()` or
	      // `websocket.terminate()` from a listener of the `'redirect'` event. This
	      // is because the user can also call `request.destroy()` with an error
	      // before calling `websocket.close()` or `websocket.terminate()` and this
	      // would result in an error being emitted on the `request` object with no
	      // `'error'` event listeners attached.
	      //
	      websocket.emit('redirect', websocket.url, req);
	    }
	  } else {
	    req = websocket._req = request(opts);
	  }

	  if (opts.timeout) {
	    req.on('timeout', () => {
	      abortHandshake(websocket, req, 'Opening handshake has timed out');
	    });
	  }

	  req.on('error', (err) => {
	    if (req === null || req[kAborted]) return;

	    req = websocket._req = null;
	    emitErrorAndClose(websocket, err);
	  });

	  req.on('response', (res) => {
	    const location = res.headers.location;
	    const statusCode = res.statusCode;

	    if (
	      location &&
	      opts.followRedirects &&
	      statusCode >= 300 &&
	      statusCode < 400
	    ) {
	      if (++websocket._redirects > opts.maxRedirects) {
	        abortHandshake(websocket, req, 'Maximum redirects exceeded');
	        return;
	      }

	      req.abort();

	      let addr;

	      try {
	        addr = new URL(location, address);
	      } catch (e) {
	        const err = new SyntaxError(`Invalid URL: ${location}`);
	        emitErrorAndClose(websocket, err);
	        return;
	      }

	      initAsClient(websocket, addr, protocols, options);
	    } else if (!websocket.emit('unexpected-response', req, res)) {
	      abortHandshake(
	        websocket,
	        req,
	        `Unexpected server response: ${res.statusCode}`
	      );
	    }
	  });

	  req.on('upgrade', (res, socket, head) => {
	    websocket.emit('upgrade', res);

	    //
	    // The user may have closed the connection from a listener of the
	    // `'upgrade'` event.
	    //
	    if (websocket.readyState !== WebSocket.CONNECTING) return;

	    req = websocket._req = null;

	    const upgrade = res.headers.upgrade;

	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      abortHandshake(websocket, socket, 'Invalid Upgrade header');
	      return;
	    }

	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');

	    if (res.headers['sec-websocket-accept'] !== digest) {
	      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
	      return;
	    }

	    const serverProt = res.headers['sec-websocket-protocol'];
	    let protError;

	    if (serverProt !== undefined) {
	      if (!protocolSet.size) {
	        protError = 'Server sent a subprotocol but none was requested';
	      } else if (!protocolSet.has(serverProt)) {
	        protError = 'Server sent an invalid subprotocol';
	      }
	    } else if (protocolSet.size) {
	      protError = 'Server sent no subprotocol';
	    }

	    if (protError) {
	      abortHandshake(websocket, socket, protError);
	      return;
	    }

	    if (serverProt) websocket._protocol = serverProt;

	    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

	    if (secWebSocketExtensions !== undefined) {
	      if (!perMessageDeflate) {
	        const message =
	          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
	          'was requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      let extensions;

	      try {
	        extensions = parse(secWebSocketExtensions);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      const extensionNames = Object.keys(extensions);

	      if (
	        extensionNames.length !== 1 ||
	        extensionNames[0] !== PerMessageDeflate.extensionName
	      ) {
	        const message = 'Server indicated an extension that was not requested';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      try {
	        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Extensions header';
	        abortHandshake(websocket, socket, message);
	        return;
	      }

	      websocket._extensions[PerMessageDeflate.extensionName] =
	        perMessageDeflate;
	    }

	    websocket.setSocket(socket, head, {
	      allowSynchronousEvents: opts.allowSynchronousEvents,
	      generateMask: opts.generateMask,
	      maxPayload: opts.maxPayload,
	      skipUTF8Validation: opts.skipUTF8Validation
	    });
	  });

	  if (opts.finishRequest) {
	    opts.finishRequest(req, websocket);
	  } else {
	    req.end();
	  }
	}

	/**
	 * Emit the `'error'` and `'close'` events.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {Error} The error to emit
	 * @private
	 */
	function emitErrorAndClose(websocket, err) {
	  websocket._readyState = WebSocket.CLOSING;
	  //
	  // The following assignment is practically useless and is done only for
	  // consistency.
	  //
	  websocket._errorEmitted = true;
	  websocket.emit('error', err);
	  websocket.emitClose();
	}

	/**
	 * Create a `net.Socket` and initiate a connection.
	 *
	 * @param {Object} options Connection options
	 * @return {net.Socket} The newly created socket used to start the connection
	 * @private
	 */
	function netConnect(options) {
	  options.path = options.socketPath;
	  return net.connect(options);
	}

	/**
	 * Create a `tls.TLSSocket` and initiate a connection.
	 *
	 * @param {Object} options Connection options
	 * @return {tls.TLSSocket} The newly created socket used to start the connection
	 * @private
	 */
	function tlsConnect(options) {
	  options.path = undefined;

	  if (!options.servername && options.servername !== '') {
	    options.servername = net.isIP(options.host) ? '' : options.host;
	  }

	  return tls.connect(options);
	}

	/**
	 * Abort the handshake and emit an error.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
	 *     abort or the socket to destroy
	 * @param {String} message The error message
	 * @private
	 */
	function abortHandshake(websocket, stream, message) {
	  websocket._readyState = WebSocket.CLOSING;

	  const err = new Error(message);
	  Error.captureStackTrace(err, abortHandshake);

	  if (stream.setHeader) {
	    stream[kAborted] = true;
	    stream.abort();

	    if (stream.socket && !stream.socket.destroyed) {
	      //
	      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
	      // called after the request completed. See
	      // https://github.com/websockets/ws/issues/1869.
	      //
	      stream.socket.destroy();
	    }

	    process.nextTick(emitErrorAndClose, websocket, err);
	  } else {
	    stream.destroy(err);
	    stream.once('error', websocket.emit.bind(websocket, 'error'));
	    stream.once('close', websocket.emitClose.bind(websocket));
	  }
	}

	/**
	 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
	 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @param {*} [data] The data to send
	 * @param {Function} [cb] Callback
	 * @private
	 */
	function sendAfterClose(websocket, data, cb) {
	  if (data) {
	    const length = isBlob(data) ? data.size : toBuffer(data).length;

	    //
	    // The `_bufferedAmount` property is used only when the peer is a client and
	    // the opening handshake fails. Under these circumstances, in fact, the
	    // `setSocket()` method is not called, so the `_socket` and `_sender`
	    // properties are set to `null`.
	    //
	    if (websocket._socket) websocket._sender._bufferedBytes += length;
	    else websocket._bufferedAmount += length;
	  }

	  if (cb) {
	    const err = new Error(
	      `WebSocket is not open: readyState ${websocket.readyState} ` +
	        `(${readyStates[websocket.readyState]})`
	    );
	    process.nextTick(cb, err);
	  }
	}

	/**
	 * The listener of the `Receiver` `'conclude'` event.
	 *
	 * @param {Number} code The status code
	 * @param {Buffer} reason The reason for closing
	 * @private
	 */
	function receiverOnConclude(code, reason) {
	  const websocket = this[kWebSocket];

	  websocket._closeFrameReceived = true;
	  websocket._closeMessage = reason;
	  websocket._closeCode = code;

	  if (websocket._socket[kWebSocket] === undefined) return;

	  websocket._socket.removeListener('data', socketOnData);
	  process.nextTick(resume, websocket._socket);

	  if (code === 1005) websocket.close();
	  else websocket.close(code, reason);
	}

	/**
	 * The listener of the `Receiver` `'drain'` event.
	 *
	 * @private
	 */
	function receiverOnDrain() {
	  const websocket = this[kWebSocket];

	  if (!websocket.isPaused) websocket._socket.resume();
	}

	/**
	 * The listener of the `Receiver` `'error'` event.
	 *
	 * @param {(RangeError|Error)} err The emitted error
	 * @private
	 */
	function receiverOnError(err) {
	  const websocket = this[kWebSocket];

	  if (websocket._socket[kWebSocket] !== undefined) {
	    websocket._socket.removeListener('data', socketOnData);

	    //
	    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
	    // https://github.com/websockets/ws/issues/1940.
	    //
	    process.nextTick(resume, websocket._socket);

	    websocket.close(err[kStatusCode]);
	  }

	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}

	/**
	 * The listener of the `Receiver` `'finish'` event.
	 *
	 * @private
	 */
	function receiverOnFinish() {
	  this[kWebSocket].emitClose();
	}

	/**
	 * The listener of the `Receiver` `'message'` event.
	 *
	 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
	 * @param {Boolean} isBinary Specifies whether the message is binary or not
	 * @private
	 */
	function receiverOnMessage(data, isBinary) {
	  this[kWebSocket].emit('message', data, isBinary);
	}

	/**
	 * The listener of the `Receiver` `'ping'` event.
	 *
	 * @param {Buffer} data The data included in the ping frame
	 * @private
	 */
	function receiverOnPing(data) {
	  const websocket = this[kWebSocket];

	  if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
	  websocket.emit('ping', data);
	}

	/**
	 * The listener of the `Receiver` `'pong'` event.
	 *
	 * @param {Buffer} data The data included in the pong frame
	 * @private
	 */
	function receiverOnPong(data) {
	  this[kWebSocket].emit('pong', data);
	}

	/**
	 * Resume a readable stream
	 *
	 * @param {Readable} stream The readable stream
	 * @private
	 */
	function resume(stream) {
	  stream.resume();
	}

	/**
	 * The `Sender` error event handler.
	 *
	 * @param {Error} The error
	 * @private
	 */
	function senderOnError(err) {
	  const websocket = this[kWebSocket];

	  if (websocket.readyState === WebSocket.CLOSED) return;
	  if (websocket.readyState === WebSocket.OPEN) {
	    websocket._readyState = WebSocket.CLOSING;
	    setCloseTimer(websocket);
	  }

	  //
	  // `socket.end()` is used instead of `socket.destroy()` to allow the other
	  // peer to finish sending queued data. There is no need to set a timer here
	  // because `CLOSING` means that it is already set or not needed.
	  //
	  this._socket.end();

	  if (!websocket._errorEmitted) {
	    websocket._errorEmitted = true;
	    websocket.emit('error', err);
	  }
	}

	/**
	 * Set a timer to destroy the underlying raw socket of a WebSocket.
	 *
	 * @param {WebSocket} websocket The WebSocket instance
	 * @private
	 */
	function setCloseTimer(websocket) {
	  websocket._closeTimer = setTimeout(
	    websocket._socket.destroy.bind(websocket._socket),
	    closeTimeout
	  );
	}

	/**
	 * The listener of the socket `'close'` event.
	 *
	 * @private
	 */
	function socketOnClose() {
	  const websocket = this[kWebSocket];

	  this.removeListener('close', socketOnClose);
	  this.removeListener('data', socketOnData);
	  this.removeListener('end', socketOnEnd);

	  websocket._readyState = WebSocket.CLOSING;

	  let chunk;

	  //
	  // The close frame might not have been received or the `'end'` event emitted,
	  // for example, if the socket was destroyed due to an error. Ensure that the
	  // `receiver` stream is closed after writing any remaining buffered data to
	  // it. If the readable side of the socket is in flowing mode then there is no
	  // buffered data as everything has been already written and `readable.read()`
	  // will return `null`. If instead, the socket is paused, any possible buffered
	  // data will be read as a single chunk.
	  //
	  if (
	    !this._readableState.endEmitted &&
	    !websocket._closeFrameReceived &&
	    !websocket._receiver._writableState.errorEmitted &&
	    (chunk = websocket._socket.read()) !== null
	  ) {
	    websocket._receiver.write(chunk);
	  }

	  websocket._receiver.end();

	  this[kWebSocket] = undefined;

	  clearTimeout(websocket._closeTimer);

	  if (
	    websocket._receiver._writableState.finished ||
	    websocket._receiver._writableState.errorEmitted
	  ) {
	    websocket.emitClose();
	  } else {
	    websocket._receiver.on('error', receiverOnFinish);
	    websocket._receiver.on('finish', receiverOnFinish);
	  }
	}

	/**
	 * The listener of the socket `'data'` event.
	 *
	 * @param {Buffer} chunk A chunk of data
	 * @private
	 */
	function socketOnData(chunk) {
	  if (!this[kWebSocket]._receiver.write(chunk)) {
	    this.pause();
	  }
	}

	/**
	 * The listener of the socket `'end'` event.
	 *
	 * @private
	 */
	function socketOnEnd() {
	  const websocket = this[kWebSocket];

	  websocket._readyState = WebSocket.CLOSING;
	  websocket._receiver.end();
	  this.end();
	}

	/**
	 * The listener of the socket `'error'` event.
	 *
	 * @private
	 */
	function socketOnError() {
	  const websocket = this[kWebSocket];

	  this.removeListener('error', socketOnError);
	  this.on('error', NOOP);

	  if (websocket) {
	    websocket._readyState = WebSocket.CLOSING;
	    this.destroy();
	  }
	}
	return websocket;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^WebSocket$" }] */

var stream;
var hasRequiredStream;

function requireStream () {
	if (hasRequiredStream) return stream;
	hasRequiredStream = 1;

	requireWebsocket();
	const { Duplex } = require$$0$4;

	/**
	 * Emits the `'close'` event on a stream.
	 *
	 * @param {Duplex} stream The stream.
	 * @private
	 */
	function emitClose(stream) {
	  stream.emit('close');
	}

	/**
	 * The listener of the `'end'` event.
	 *
	 * @private
	 */
	function duplexOnEnd() {
	  if (!this.destroyed && this._writableState.finished) {
	    this.destroy();
	  }
	}

	/**
	 * The listener of the `'error'` event.
	 *
	 * @param {Error} err The error
	 * @private
	 */
	function duplexOnError(err) {
	  this.removeListener('error', duplexOnError);
	  this.destroy();
	  if (this.listenerCount('error') === 0) {
	    // Do not suppress the throwing behavior.
	    this.emit('error', err);
	  }
	}

	/**
	 * Wraps a `WebSocket` in a duplex stream.
	 *
	 * @param {WebSocket} ws The `WebSocket` to wrap
	 * @param {Object} [options] The options for the `Duplex` constructor
	 * @return {Duplex} The duplex stream
	 * @public
	 */
	function createWebSocketStream(ws, options) {
	  let terminateOnDestroy = true;

	  const duplex = new Duplex({
	    ...options,
	    autoDestroy: false,
	    emitClose: false,
	    objectMode: false,
	    writableObjectMode: false
	  });

	  ws.on('message', function message(msg, isBinary) {
	    const data =
	      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

	    if (!duplex.push(data)) ws.pause();
	  });

	  ws.once('error', function error(err) {
	    if (duplex.destroyed) return;

	    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
	    //
	    // - If the `'error'` event is emitted before the `'open'` event, then
	    //   `ws.terminate()` is a noop as no socket is assigned.
	    // - Otherwise, the error is re-emitted by the listener of the `'error'`
	    //   event of the `Receiver` object. The listener already closes the
	    //   connection by calling `ws.close()`. This allows a close frame to be
	    //   sent to the other peer. If `ws.terminate()` is called right after this,
	    //   then the close frame might not be sent.
	    terminateOnDestroy = false;
	    duplex.destroy(err);
	  });

	  ws.once('close', function close() {
	    if (duplex.destroyed) return;

	    duplex.push(null);
	  });

	  duplex._destroy = function (err, callback) {
	    if (ws.readyState === ws.CLOSED) {
	      callback(err);
	      process.nextTick(emitClose, duplex);
	      return;
	    }

	    let called = false;

	    ws.once('error', function error(err) {
	      called = true;
	      callback(err);
	    });

	    ws.once('close', function close() {
	      if (!called) callback(err);
	      process.nextTick(emitClose, duplex);
	    });

	    if (terminateOnDestroy) ws.terminate();
	  };

	  duplex._final = function (callback) {
	    if (ws.readyState === ws.CONNECTING) {
	      ws.once('open', function open() {
	        duplex._final(callback);
	      });
	      return;
	    }

	    // If the value of the `_socket` property is `null` it means that `ws` is a
	    // client websocket and the handshake failed. In fact, when this happens, a
	    // socket is never assigned to the websocket. Wait for the `'error'` event
	    // that will be emitted by the websocket.
	    if (ws._socket === null) return;

	    if (ws._socket._writableState.finished) {
	      callback();
	      if (duplex._readableState.endEmitted) duplex.destroy();
	    } else {
	      ws._socket.once('finish', function finish() {
	        // `duplex` is not destroyed here because the `'end'` event will be
	        // emitted on `duplex` after this `'finish'` event. The EOF signaling
	        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
	        callback();
	      });
	      ws.close();
	    }
	  };

	  duplex._read = function () {
	    if (ws.isPaused) ws.resume();
	  };

	  duplex._write = function (chunk, encoding, callback) {
	    if (ws.readyState === ws.CONNECTING) {
	      ws.once('open', function open() {
	        duplex._write(chunk, encoding, callback);
	      });
	      return;
	    }

	    ws.send(chunk, callback);
	  };

	  duplex.on('end', duplexOnEnd);
	  duplex.on('error', duplexOnError);
	  return duplex;
	}

	stream = createWebSocketStream;
	return stream;
}

requireStream();

requireReceiver();

requireSender();

var websocketExports = requireWebsocket();
var WebSocket = /*@__PURE__*/getDefaultExportFromCjs(websocketExports);

var subprotocol;
var hasRequiredSubprotocol;

function requireSubprotocol () {
	if (hasRequiredSubprotocol) return subprotocol;
	hasRequiredSubprotocol = 1;

	const { tokenChars } = requireValidation();

	/**
	 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
	 *
	 * @param {String} header The field value of the header
	 * @return {Set} The subprotocol names
	 * @public
	 */
	function parse(header) {
	  const protocols = new Set();
	  let start = -1;
	  let end = -1;
	  let i = 0;

	  for (i; i < header.length; i++) {
	    const code = header.charCodeAt(i);

	    if (end === -1 && tokenChars[code] === 1) {
	      if (start === -1) start = i;
	    } else if (
	      i !== 0 &&
	      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
	    ) {
	      if (end === -1 && start !== -1) end = i;
	    } else if (code === 0x2c /* ',' */) {
	      if (start === -1) {
	        throw new SyntaxError(`Unexpected character at index ${i}`);
	      }

	      if (end === -1) end = i;

	      const protocol = header.slice(start, end);

	      if (protocols.has(protocol)) {
	        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	      }

	      protocols.add(protocol);
	      start = end = -1;
	    } else {
	      throw new SyntaxError(`Unexpected character at index ${i}`);
	    }
	  }

	  if (start === -1 || end !== -1) {
	    throw new SyntaxError('Unexpected end of input');
	  }

	  const protocol = header.slice(start, i);

	  if (protocols.has(protocol)) {
	    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
	  }

	  protocols.add(protocol);
	  return protocols;
	}

	subprotocol = { parse };
	return subprotocol;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex$", "caughtErrors": "none" }] */

var websocketServer;
var hasRequiredWebsocketServer;

function requireWebsocketServer () {
	if (hasRequiredWebsocketServer) return websocketServer;
	hasRequiredWebsocketServer = 1;

	const EventEmitter = require$$0$5;
	const http = require$$2$1;
	const { Duplex } = require$$0$4;
	const { createHash } = crypto;

	const extension = requireExtension();
	const PerMessageDeflate = requirePermessageDeflate();
	const subprotocol = requireSubprotocol();
	const WebSocket = requireWebsocket();
	const { GUID, kWebSocket } = requireConstants();

	const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

	const RUNNING = 0;
	const CLOSING = 1;
	const CLOSED = 2;

	/**
	 * Class representing a WebSocket server.
	 *
	 * @extends EventEmitter
	 */
	class WebSocketServer extends EventEmitter {
	  /**
	   * Create a `WebSocketServer` instance.
	   *
	   * @param {Object} options Configuration options
	   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
	   *     automatically send a pong in response to a ping
	   * @param {Number} [options.backlog=511] The maximum length of the queue of
	   *     pending connections
	   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
	   *     track clients
	   * @param {Function} [options.handleProtocols] A hook to handle protocols
	   * @param {String} [options.host] The hostname where to bind the server
	   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
	   *     size
	   * @param {Boolean} [options.noServer=false] Enable no server mode
	   * @param {String} [options.path] Accept only connections matching this path
	   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
	   *     permessage-deflate
	   * @param {Number} [options.port] The port where to bind the server
	   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
	   *     server to use
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   * @param {Function} [options.verifyClient] A hook to reject connections
	   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
	   *     class to use. It must be the `WebSocket` class or class that extends it
	   * @param {Function} [callback] A listener for the `listening` event
	   */
	  constructor(options, callback) {
	    super();

	    options = {
	      allowSynchronousEvents: true,
	      autoPong: true,
	      maxPayload: 100 * 1024 * 1024,
	      skipUTF8Validation: false,
	      perMessageDeflate: false,
	      handleProtocols: null,
	      clientTracking: true,
	      verifyClient: null,
	      noServer: false,
	      backlog: null, // use default (511 as implemented in net.js)
	      server: null,
	      host: null,
	      path: null,
	      port: null,
	      WebSocket,
	      ...options
	    };

	    if (
	      (options.port == null && !options.server && !options.noServer) ||
	      (options.port != null && (options.server || options.noServer)) ||
	      (options.server && options.noServer)
	    ) {
	      throw new TypeError(
	        'One and only one of the "port", "server", or "noServer" options ' +
	          'must be specified'
	      );
	    }

	    if (options.port != null) {
	      this._server = http.createServer((req, res) => {
	        const body = http.STATUS_CODES[426];

	        res.writeHead(426, {
	          'Content-Length': body.length,
	          'Content-Type': 'text/plain'
	        });
	        res.end(body);
	      });
	      this._server.listen(
	        options.port,
	        options.host,
	        options.backlog,
	        callback
	      );
	    } else if (options.server) {
	      this._server = options.server;
	    }

	    if (this._server) {
	      const emitConnection = this.emit.bind(this, 'connection');

	      this._removeListeners = addListeners(this._server, {
	        listening: this.emit.bind(this, 'listening'),
	        error: this.emit.bind(this, 'error'),
	        upgrade: (req, socket, head) => {
	          this.handleUpgrade(req, socket, head, emitConnection);
	        }
	      });
	    }

	    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
	    if (options.clientTracking) {
	      this.clients = new Set();
	      this._shouldEmitClose = false;
	    }

	    this.options = options;
	    this._state = RUNNING;
	  }

	  /**
	   * Returns the bound address, the address family name, and port of the server
	   * as reported by the operating system if listening on an IP socket.
	   * If the server is listening on a pipe or UNIX domain socket, the name is
	   * returned as a string.
	   *
	   * @return {(Object|String|null)} The address of the server
	   * @public
	   */
	  address() {
	    if (this.options.noServer) {
	      throw new Error('The server is operating in "noServer" mode');
	    }

	    if (!this._server) return null;
	    return this._server.address();
	  }

	  /**
	   * Stop the server from accepting new connections and emit the `'close'` event
	   * when all existing connections are closed.
	   *
	   * @param {Function} [cb] A one-time listener for the `'close'` event
	   * @public
	   */
	  close(cb) {
	    if (this._state === CLOSED) {
	      if (cb) {
	        this.once('close', () => {
	          cb(new Error('The server is not running'));
	        });
	      }

	      process.nextTick(emitClose, this);
	      return;
	    }

	    if (cb) this.once('close', cb);

	    if (this._state === CLOSING) return;
	    this._state = CLOSING;

	    if (this.options.noServer || this.options.server) {
	      if (this._server) {
	        this._removeListeners();
	        this._removeListeners = this._server = null;
	      }

	      if (this.clients) {
	        if (!this.clients.size) {
	          process.nextTick(emitClose, this);
	        } else {
	          this._shouldEmitClose = true;
	        }
	      } else {
	        process.nextTick(emitClose, this);
	      }
	    } else {
	      const server = this._server;

	      this._removeListeners();
	      this._removeListeners = this._server = null;

	      //
	      // The HTTP/S server was created internally. Close it, and rely on its
	      // `'close'` event.
	      //
	      server.close(() => {
	        emitClose(this);
	      });
	    }
	  }

	  /**
	   * See if a given request should be handled by this server instance.
	   *
	   * @param {http.IncomingMessage} req Request object to inspect
	   * @return {Boolean} `true` if the request is valid, else `false`
	   * @public
	   */
	  shouldHandle(req) {
	    if (this.options.path) {
	      const index = req.url.indexOf('?');
	      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

	      if (pathname !== this.options.path) return false;
	    }

	    return true;
	  }

	  /**
	   * Handle a HTTP Upgrade request.
	   *
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @public
	   */
	  handleUpgrade(req, socket, head, cb) {
	    socket.on('error', socketOnError);

	    const key = req.headers['sec-websocket-key'];
	    const upgrade = req.headers.upgrade;
	    const version = +req.headers['sec-websocket-version'];

	    if (req.method !== 'GET') {
	      const message = 'Invalid HTTP method';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
	      return;
	    }

	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      const message = 'Invalid Upgrade header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (key === undefined || !keyRegex.test(key)) {
	      const message = 'Missing or invalid Sec-WebSocket-Key header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (version !== 13 && version !== 8) {
	      const message = 'Missing or invalid Sec-WebSocket-Version header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
	        'Sec-WebSocket-Version': '13, 8'
	      });
	      return;
	    }

	    if (!this.shouldHandle(req)) {
	      abortHandshake(socket, 400);
	      return;
	    }

	    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
	    let protocols = new Set();

	    if (secWebSocketProtocol !== undefined) {
	      try {
	        protocols = subprotocol.parse(secWebSocketProtocol);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Protocol header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
	    const extensions = {};

	    if (
	      this.options.perMessageDeflate &&
	      secWebSocketExtensions !== undefined
	    ) {
	      const perMessageDeflate = new PerMessageDeflate(
	        this.options.perMessageDeflate,
	        true,
	        this.options.maxPayload
	      );

	      try {
	        const offers = extension.parse(secWebSocketExtensions);

	        if (offers[PerMessageDeflate.extensionName]) {
	          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
	          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
	        }
	      } catch (err) {
	        const message =
	          'Invalid or unacceptable Sec-WebSocket-Extensions header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    //
	    // Optionally call external client verification handler.
	    //
	    if (this.options.verifyClient) {
	      const info = {
	        origin:
	          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
	        secure: !!(req.socket.authorized || req.socket.encrypted),
	        req
	      };

	      if (this.options.verifyClient.length === 2) {
	        this.options.verifyClient(info, (verified, code, message, headers) => {
	          if (!verified) {
	            return abortHandshake(socket, code || 401, message, headers);
	          }

	          this.completeUpgrade(
	            extensions,
	            key,
	            protocols,
	            req,
	            socket,
	            head,
	            cb
	          );
	        });
	        return;
	      }

	      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
	    }

	    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
	  }

	  /**
	   * Upgrade the connection to WebSocket.
	   *
	   * @param {Object} extensions The accepted extensions
	   * @param {String} key The value of the `Sec-WebSocket-Key` header
	   * @param {Set} protocols The subprotocols
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @throws {Error} If called more than once with the same socket
	   * @private
	   */
	  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
	    //
	    // Destroy the socket if the client has already sent a FIN packet.
	    //
	    if (!socket.readable || !socket.writable) return socket.destroy();

	    if (socket[kWebSocket]) {
	      throw new Error(
	        'server.handleUpgrade() was called more than once with the same ' +
	          'socket, possibly due to a misconfiguration'
	      );
	    }

	    if (this._state > RUNNING) return abortHandshake(socket, 503);

	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');

	    const headers = [
	      'HTTP/1.1 101 Switching Protocols',
	      'Upgrade: websocket',
	      'Connection: Upgrade',
	      `Sec-WebSocket-Accept: ${digest}`
	    ];

	    const ws = new this.options.WebSocket(null, undefined, this.options);

	    if (protocols.size) {
	      //
	      // Optionally call external protocol selection handler.
	      //
	      const protocol = this.options.handleProtocols
	        ? this.options.handleProtocols(protocols, req)
	        : protocols.values().next().value;

	      if (protocol) {
	        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
	        ws._protocol = protocol;
	      }
	    }

	    if (extensions[PerMessageDeflate.extensionName]) {
	      const params = extensions[PerMessageDeflate.extensionName].params;
	      const value = extension.format({
	        [PerMessageDeflate.extensionName]: [params]
	      });
	      headers.push(`Sec-WebSocket-Extensions: ${value}`);
	      ws._extensions = extensions;
	    }

	    //
	    // Allow external modification/inspection of handshake headers.
	    //
	    this.emit('headers', headers, req);

	    socket.write(headers.concat('\r\n').join('\r\n'));
	    socket.removeListener('error', socketOnError);

	    ws.setSocket(socket, head, {
	      allowSynchronousEvents: this.options.allowSynchronousEvents,
	      maxPayload: this.options.maxPayload,
	      skipUTF8Validation: this.options.skipUTF8Validation
	    });

	    if (this.clients) {
	      this.clients.add(ws);
	      ws.on('close', () => {
	        this.clients.delete(ws);

	        if (this._shouldEmitClose && !this.clients.size) {
	          process.nextTick(emitClose, this);
	        }
	      });
	    }

	    cb(ws, req);
	  }
	}

	websocketServer = WebSocketServer;

	/**
	 * Add event listeners on an `EventEmitter` using a map of <event, listener>
	 * pairs.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @param {Object.<String, Function>} map The listeners to add
	 * @return {Function} A function that will remove the added listeners when
	 *     called
	 * @private
	 */
	function addListeners(server, map) {
	  for (const event of Object.keys(map)) server.on(event, map[event]);

	  return function removeListeners() {
	    for (const event of Object.keys(map)) {
	      server.removeListener(event, map[event]);
	    }
	  };
	}

	/**
	 * Emit a `'close'` event on an `EventEmitter`.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @private
	 */
	function emitClose(server) {
	  server._state = CLOSED;
	  server.emit('close');
	}

	/**
	 * Handle socket errors.
	 *
	 * @private
	 */
	function socketOnError() {
	  this.destroy();
	}

	/**
	 * Close the connection when preconditions are not fulfilled.
	 *
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} [message] The HTTP response body
	 * @param {Object} [headers] Additional HTTP response headers
	 * @private
	 */
	function abortHandshake(socket, code, message, headers) {
	  //
	  // The socket is writable unless the user destroyed or ended it before calling
	  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
	  // error. Handling this does not make much sense as the worst that can happen
	  // is that some of the data written by the user might be discarded due to the
	  // call to `socket.end()` below, which triggers an `'error'` event that in
	  // turn causes the socket to be destroyed.
	  //
	  message = message || http.STATUS_CODES[code];
	  headers = {
	    Connection: 'close',
	    'Content-Type': 'text/html',
	    'Content-Length': Buffer.byteLength(message),
	    ...headers
	  };

	  socket.once('finish', socket.destroy);

	  socket.end(
	    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
	      Object.keys(headers)
	        .map((h) => `${h}: ${headers[h]}`)
	        .join('\r\n') +
	      '\r\n\r\n' +
	      message
	  );
	}

	/**
	 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
	 * one listener for it, otherwise call `abortHandshake()`.
	 *
	 * @param {WebSocketServer} server The WebSocket server
	 * @param {http.IncomingMessage} req The request object
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} message The HTTP response body
	 * @param {Object} [headers] The HTTP response headers
	 * @private
	 */
	function abortHandshakeOrEmitwsClientError(
	  server,
	  req,
	  socket,
	  code,
	  message,
	  headers
	) {
	  if (server.listenerCount('wsClientError')) {
	    const err = new Error(message);
	    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

	    server.emit('wsClientError', err, socket, req);
	  } else {
	    abortHandshake(socket, code, message, headers);
	  }
	}
	return websocketServer;
}

requireWebsocketServer();

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var loader = {};

var hasRequiredLoader;

function requireLoader () {
	if (hasRequiredLoader) return loader;
	hasRequiredLoader = 1;
	loader.require = function loader(list) {
	  const errorLog = [];
	  for (const [name, fn] of list) {
	    try {
	      const data = fn(commonjsRequire(name));
	      data.name = name;
	      return data;
	    } catch (e) {
	      errorLog.push(e);
	    }
	  }
	  throw new Error(errorLog.join('\n'));
	};
	return loader;
}

var Opus_1;
var hasRequiredOpus$1;

function requireOpus$1 () {
	if (hasRequiredOpus$1) return Opus_1;
	hasRequiredOpus$1 = 1;
	// Partly based on https://github.com/Rantanen/node-opus/blob/master/lib/Encoder.js

	const { Transform } = require$$0$4;
	const loader = requireLoader();

	const CTL = {
	  BITRATE: 4002,
	  FEC: 4012,
	  PLP: 4014,
	};

	let Opus = {};

	function loadOpus(refresh = false) {
	  if (Opus.Encoder && !refresh) return Opus;

	  Opus = loader.require([
	    ['@discordjs/opus', opus => ({ Encoder: opus.OpusEncoder })],
	    ['node-opus', opus => ({ Encoder: opus.OpusEncoder })],
	    ['opusscript', opus => ({ Encoder: opus })],
	  ]);
	  return Opus;
	}

	const charCode = x => x.charCodeAt(0);
	const OPUS_HEAD = Buffer.from([...'OpusHead'].map(charCode));
	const OPUS_TAGS = Buffer.from([...'OpusTags'].map(charCode));

	// frame size = (channels * rate * frame_duration) / 1000

	/**
	 * Takes a stream of Opus data and outputs a stream of PCM data, or the inverse.
	 * **You shouldn't directly instantiate this class, see opus.Encoder and opus.Decoder instead!**
	 * @memberof opus
	 * @extends TransformStream
	 * @protected
	 */
	class OpusStream extends Transform {
	  /**
	   * Creates a new Opus transformer.
	   * @private
	   * @memberof opus
	   * @param {Object} [options] options that you would pass to a regular Transform stream
	   */
	  constructor(options = {}) {
	    if (!loadOpus().Encoder) {
	      throw Error('Could not find an Opus module! Please install @discordjs/opus, node-opus, or opusscript.');
	    }
	    super(Object.assign({ readableObjectMode: true }, options));
	    if (Opus.name === 'opusscript') {
	      options.application = Opus.Encoder.Application[options.application];
	    }
	    this.encoder = new Opus.Encoder(options.rate, options.channels, options.application);

	    this._options = options;
	    this._required = this._options.frameSize * this._options.channels * 2;
	  }

	  _encode(buffer) {
	    return this.encoder.encode(buffer, this._options.frameSize);
	  }

	  _decode(buffer) {
	    return this.encoder.decode(buffer, Opus.name === 'opusscript' ? null : this._options.frameSize);
	  }

	  /**
	   * Returns the Opus module being used - `opusscript`, `node-opus`, or `@discordjs/opus`.
	   * @type {string}
	   * @readonly
	   * @example
	   * console.log(`Using Opus module ${prism.opus.Encoder.type}`);
	   */
	  static get type() {
	    return Opus.name;
	  }

	  /**
	   * Sets the bitrate of the stream.
	   * @param {number} bitrate the bitrate to use use, e.g. 48000
	   * @public
	   */
	  setBitrate(bitrate) {
	    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
	      .apply(this.encoder, [CTL.BITRATE, Math.min(128e3, Math.max(16e3, bitrate))]);
	  }

	  /**
	   * Enables or disables forward error correction.
	   * @param {boolean} enabled whether or not to enable FEC.
	   * @public
	   */
	  setFEC(enabled) {
	    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
	      .apply(this.encoder, [CTL.FEC, enabled ? 1 : 0]);
	  }

	  /**
	   * Sets the expected packet loss over network transmission.
	   * @param {number} [percentage] a percentage (represented between 0 and 1)
	   */
	  setPLP(percentage) {
	    (this.encoder.applyEncoderCTL || this.encoder.encoderCTL)
	      .apply(this.encoder, [CTL.PLP, Math.min(100, Math.max(0, percentage * 100))]);
	  }

	  _final(cb) {
	    this._cleanup();
	    cb();
	  }

	  _destroy(err, cb) {
	    this._cleanup();
	    return cb ? cb(err) : undefined;
	  }

	  /**
	   * Cleans up the Opus stream when it is no longer needed
	   * @private
	   */
	  _cleanup() {
	    if (Opus.name === 'opusscript' && this.encoder) this.encoder.delete();
	    this.encoder = null;
	  }
	}

	/**
	 * An Opus encoder stream.
	 *
	 * Outputs opus packets in [object mode.](https://nodejs.org/api/stream.html#stream_object_mode)
	 * @extends opus.OpusStream
	 * @memberof opus
	 * @example
	 * const encoder = new prism.opus.Encoder({ frameSize: 960, channels: 2, rate: 48000 });
	 * pcmAudio.pipe(encoder);
	 * // encoder will now output Opus-encoded audio packets
	 */
	class Encoder extends OpusStream {
	  /**
	   * Creates a new Opus encoder stream.
	   * @memberof opus
	   * @param {Object} options options that you would pass to a regular OpusStream, plus a few more:
	   * @param {number} options.frameSize the frame size in bytes to use (e.g. 960 for stereo audio at 48KHz with a frame
	   * duration of 20ms)
	   * @param {number} options.channels the number of channels to use
	   * @param {number} options.rate the sampling rate in Hz
	   */
	  constructor(options) {
	    super(options);
	    this._buffer = Buffer.alloc(0);
	  }

	  _transform(chunk, encoding, done) {
	    this._buffer = Buffer.concat([this._buffer, chunk]);
	    let n = 0;
	    while (this._buffer.length >= this._required * (n + 1)) {
	      const buf = this._encode(this._buffer.slice(n * this._required, (n + 1) * this._required));
	      this.push(buf);
	      n++;
	    }
	    if (n > 0) this._buffer = this._buffer.slice(n * this._required);
	    return done();
	  }

	  _destroy(err, cb) {
	    super._destroy(err, cb);
	    this._buffer = null;
	  }
	}

	/**
	 * An Opus decoder stream.
	 *
	 * Note that any stream you pipe into this must be in
	 * [object mode](https://nodejs.org/api/stream.html#stream_object_mode) and should output Opus packets.
	 * @extends opus.OpusStream
	 * @memberof opus
	 * @example
	 * const decoder = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
	 * input.pipe(decoder);
	 * // decoder will now output PCM audio
	 */
	class Decoder extends OpusStream {
	  _transform(chunk, encoding, done) {
	    const signature = chunk.slice(0, 8);
	    if (chunk.length >= 8 && signature.equals(OPUS_HEAD)) {
	      this.emit('format', {
	        channels: this._options.channels,
	        sampleRate: this._options.rate,
	        bitDepth: 16,
	        float: false,
	        signed: true,
	        version: chunk.readUInt8(8),
	        preSkip: chunk.readUInt16LE(10),
	        gain: chunk.readUInt16LE(16),
	      });
	      return done();
	    }
	    if (chunk.length >= 8 && signature.equals(OPUS_TAGS)) {
	      this.emit('tags', chunk);
	      return done();
	    }
	    try {
	      this.push(this._decode(chunk));
	    } catch (e) {
	      return done(e);
	    }
	    return done();
	  }
	}

	Opus_1 = { Decoder, Encoder };
	return Opus_1;
}

var OggDemuxer_1;
var hasRequiredOggDemuxer;

function requireOggDemuxer () {
	if (hasRequiredOggDemuxer) return OggDemuxer_1;
	hasRequiredOggDemuxer = 1;
	const { Transform } = require$$0$4;

	const OGG_PAGE_HEADER_SIZE = 26;
	const STREAM_STRUCTURE_VERSION = 0;

	const charCode = x => x.charCodeAt(0);
	const OGGS_HEADER = Buffer.from([...'OggS'].map(charCode));
	const OPUS_HEAD = Buffer.from([...'OpusHead'].map(charCode));
	const OPUS_TAGS = Buffer.from([...'OpusTags'].map(charCode));

	/**
	 * Demuxes an Ogg stream (containing Opus audio) to output an Opus stream.
	 * @extends {TransformStream}
	 * @memberof opus
	 */
	class OggDemuxer extends Transform {
	  /**
	   * Creates a new OggOpus demuxer.
	   * @param {Object} [options] options that you would pass to a regular Transform stream.
	   * @memberof opus
	   */
	  constructor(options = {}) {
	    super(Object.assign({ readableObjectMode: true }, options));
	    this._remainder = null;
	    this._head = null;
	    this._bitstream = null;
	  }

	  _transform(chunk, encoding, done) {
	    if (this._remainder) {
	      chunk = Buffer.concat([this._remainder, chunk]);
	      this._remainder = null;
	    }

	    try {
	      while (chunk) {
	        const result = this._readPage(chunk);
	        if (result) chunk = result;
	        else break;
	      }
	    } catch (error) {
	      done(error);
	      return;
	    }
	    this._remainder = chunk;
	    done();
	  }

	  /**
	   * Reads a page from a buffer
	   * @private
	   * @param {Buffer} chunk the chunk containing the page
	   * @returns {boolean|Buffer} if a buffer, it will be a slice of the excess data of the original, otherwise it will be
	   * false and would indicate that there is not enough data to go ahead with reading this page.
	   */
	  _readPage(chunk) {
	    if (chunk.length < OGG_PAGE_HEADER_SIZE) {
	      return false;
	    }
	    if (!chunk.slice(0, 4).equals(OGGS_HEADER)) {
	      throw Error(`capture_pattern is not ${OGGS_HEADER}`);
	    }
	    if (chunk.readUInt8(4) !== STREAM_STRUCTURE_VERSION) {
	      throw Error(`stream_structure_version is not ${STREAM_STRUCTURE_VERSION}`);
	    }

	    if (chunk.length < 27) return false;
	    const pageSegments = chunk.readUInt8(26);
	    if (chunk.length < 27 + pageSegments) return false;
	    const table = chunk.slice(27, 27 + pageSegments);
	    const bitstream = chunk.readUInt32BE(14);

	    let sizes = [], totalSize = 0;

	    for (let i = 0; i < pageSegments;) {
	      let size = 0, x = 255;
	      while (x === 255) {
	        if (i >= table.length) return false;
	        x = table.readUInt8(i);
	        i++;
	        size += x;
	      }
	      sizes.push(size);
	      totalSize += size;
	    }

	    if (chunk.length < 27 + pageSegments + totalSize) return false;

	    let start = 27 + pageSegments;
	    for (const size of sizes) {
	      const segment = chunk.slice(start, start + size);
	      const header = segment.slice(0, 8);
	      if (this._head) {
	        if (header.equals(OPUS_TAGS)) this.emit('tags', segment);
	        else if (this._bitstream === bitstream) this.push(segment);
	      } else if (header.equals(OPUS_HEAD)) {
	        this.emit('head', segment);
	        this._head = segment;
	        this._bitstream = bitstream;
	      } else {
	        this.emit('unknownSegment', segment);
	      }
	      start += size;
	    }
	    return chunk.slice(start);
	  }

	  _destroy(err, cb) {
	    this._cleanup();
	    return cb ? cb(err) : undefined;
	  }

	  _final(cb) {
	    this._cleanup();
	    cb();
	  }

	  /**
	   * Cleans up the demuxer when it is no longer required.
	   * @private
	   */
	  _cleanup() {
	    this._remainder = null;
	    this._head = null;
	    this._bitstream = null;
	  }
	}

	/**
	 * Emitted when the demuxer encounters the opus head.
	 * @event OggDemuxer#head
	 * @memberof opus
	 * @param {Buffer} segment a buffer containing the opus head data.
	 */

	/**
	 * Emitted when the demuxer encounters opus tags.
	 * @event OggDemuxer#tags
	 * @memberof opus
	 * @param {Buffer} segment a buffer containing the opus tags.
	 */

	OggDemuxer_1 = OggDemuxer;
	return OggDemuxer_1;
}

var WebmBase;
var hasRequiredWebmBase;

function requireWebmBase () {
	if (hasRequiredWebmBase) return WebmBase;
	hasRequiredWebmBase = 1;
	const { Transform } = require$$0$4;

	/**
	 * Base class for WebmOpusDemuxer and WebmVorbisDemuxer.
	 * **You shouldn't directly instantiate this class, use the opus.WebmDemuxer and vorbis.WebmDemuxer
	 * implementations instead!**
	 * @memberof core
	 * @protected
	 * @extends TransformStream
	 */
	class WebmBaseDemuxer extends Transform {
	  /**
	   * Creates a new Webm demuxer.
	   * @private
	   * @memberof core
	   * @param {Object} [options] options that you would pass to a regular Transform stream.
	   */
	  constructor(options = {}) {
	    super(Object.assign({ readableObjectMode: true }, options));
	    this._remainder = null;
	    this._length = 0;
	    this._count = 0;
	    this._skipUntil = null;
	    this._track = null;
	    this._incompleteTrack = {};
	    this._ebmlFound = false;
	  }

	  _transform(chunk, encoding, done) {
	    this._length += chunk.length;
	    if (this._remainder) {
	      chunk = Buffer.concat([this._remainder, chunk]);
	      this._remainder = null;
	    }
	    let offset = 0;
	    if (this._skipUntil && this._length > this._skipUntil) {
	      offset = this._skipUntil - this._count;
	      this._skipUntil = null;
	    } else if (this._skipUntil) {
	      this._count += chunk.length;
	      done();
	      return;
	    }
	    let result;
	    while (result !== TOO_SHORT) {
	      try {
	        result = this._readTag(chunk, offset);
	      } catch (error) {
	        done(error);
	        return;
	      }
	      if (result === TOO_SHORT) break;
	      if (result._skipUntil) {
	        this._skipUntil = result._skipUntil;
	        break;
	      }
	      if (result.offset) offset = result.offset;
	      else break;
	    }
	    this._count += offset;
	    this._remainder = chunk.slice(offset);
	    done();
	    return;
	  }

	  /**
	   * Reads an EBML ID from a buffer.
	   * @private
	   * @param {Buffer} chunk the buffer to read from.
	   * @param {number} offset the offset in the buffer.
	   * @returns {Object|Symbol} contains an `id` property (buffer) and the new `offset` (number).
	   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
	   */
	  _readEBMLId(chunk, offset) {
	    const idLength = vintLength(chunk, offset);
	    if (idLength === TOO_SHORT) return TOO_SHORT;
	    return {
	      id: chunk.slice(offset, offset + idLength),
	      offset: offset + idLength,
	    };
	  }

	  /**
	   * Reads a size variable-integer to calculate the length of the data of a tag.
	   * @private
	   * @param {Buffer} chunk the buffer to read from.
	   * @param {number} offset the offset in the buffer.
	   * @returns {Object|Symbol} contains property `offset` (number), `dataLength` (number) and `sizeLength` (number).
	   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
	   */
	  _readTagDataSize(chunk, offset) {
	    const sizeLength = vintLength(chunk, offset);
	    if (sizeLength === TOO_SHORT) return TOO_SHORT;
	    const dataLength = expandVint(chunk, offset, offset + sizeLength);
	    return { offset: offset + sizeLength, dataLength, sizeLength };
	  }

	  /**
	   * Takes a buffer and attempts to read and process a tag.
	   * @private
	   * @param {Buffer} chunk the buffer to read from.
	   * @param {number} offset the offset in the buffer.
	   * @returns {Object|Symbol} contains the new `offset` (number) and optionally the `_skipUntil` property,
	   * indicating that the stream should ignore any data until a certain length is reached.
	   * Returns the TOO_SHORT symbol if the data wasn't big enough to facilitate the request.
	   */
	  _readTag(chunk, offset) {
	    const idData = this._readEBMLId(chunk, offset);
	    if (idData === TOO_SHORT) return TOO_SHORT;
	    const ebmlID = idData.id.toString('hex');
	    if (!this._ebmlFound) {
	      if (ebmlID === '1a45dfa3') this._ebmlFound = true;
	      else throw Error('Did not find the EBML tag at the start of the stream');
	    }
	    offset = idData.offset;
	    const sizeData = this._readTagDataSize(chunk, offset);
	    if (sizeData === TOO_SHORT) return TOO_SHORT;
	    const { dataLength } = sizeData;
	    offset = sizeData.offset;
	    // If this tag isn't useful, tell the stream to stop processing data until the tag ends
	    if (typeof TAGS[ebmlID] === 'undefined') {
	      if (chunk.length > offset + dataLength) {
	        return { offset: offset + dataLength };
	      }
	      return { offset, _skipUntil: this._count + offset + dataLength };
	    }

	    const tagHasChildren = TAGS[ebmlID];
	    if (tagHasChildren) {
	      return { offset };
	    }

	    if (offset + dataLength > chunk.length) return TOO_SHORT;
	    const data = chunk.slice(offset, offset + dataLength);
	    if (!this._track) {
	      if (ebmlID === 'ae') this._incompleteTrack = {};
	      if (ebmlID === 'd7') this._incompleteTrack.number = data[0];
	      if (ebmlID === '83') this._incompleteTrack.type = data[0];
	      if (this._incompleteTrack.type === 2 && typeof this._incompleteTrack.number !== 'undefined') {
	        this._track = this._incompleteTrack;
	      }
	    }
	    if (ebmlID === '63a2') {
	      this._checkHead(data);
	      this.emit('head', data);
	    } else if (ebmlID === 'a3') {
	      if (!this._track) throw Error('No audio track in this webm!');
	      if ((data[0] & 0xF) === this._track.number) {
	        this.push(data.slice(4));
	      }
	    }
	    return { offset: offset + dataLength };
	  }

	  _destroy(err, cb) {
	    this._cleanup();
	    return cb ? cb(err) : undefined;
	  }

	  _final(cb) {
	    this._cleanup();
	    cb();
	  }

	  /**
	   * Cleans up the demuxer when it is no longer required.
	   * @private
	   */
	  _cleanup() {
	    this._remainder = null;
	    this._incompleteTrack = {};
	  }
	}

	/**
	 * A symbol that is returned by some functions that indicates the buffer it has been provided is not large enough
	 * to facilitate a request.
	 * @name WebmBaseDemuxer#TOO_SHORT
	 * @memberof core
	 * @private
	 * @type {Symbol}
	 */
	const TOO_SHORT = WebmBaseDemuxer.TOO_SHORT = Symbol('TOO_SHORT');

	/**
	 * A map that takes a value of an EBML ID in hex string form, with the value being a boolean that indicates whether
	 * this tag has children.
	 * @name WebmBaseDemuxer#TAGS
	 * @memberof core
	 * @private
	 * @type {Object}
	 */
	const TAGS = WebmBaseDemuxer.TAGS = { // value is true if the element has children
	  '1a45dfa3': true, // EBML
	  '18538067': true, // Segment
	  '1f43b675': true, // Cluster
	  '1654ae6b': true, // Tracks
	  'ae': true, // TrackEntry
	  'd7': false, // TrackNumber
	  '83': false, // TrackType
	  'a3': false, // SimpleBlock
	  '63a2': false,
	};

	WebmBase = WebmBaseDemuxer;

	function vintLength(buffer, index) {
	  if (index < 0 || index > buffer.length - 1) {
	    return TOO_SHORT;
	  }
	  let i = 0;
	  for (; i < 8; i++) if ((1 << (7 - i)) & buffer[index]) break;
	  i++;
	  if (index + i > buffer.length) {
	    return TOO_SHORT;
	  }
	  return i;
	}

	function expandVint(buffer, start, end) {
	  const length = vintLength(buffer, start);
	  if (end > buffer.length || length === TOO_SHORT) return TOO_SHORT;
	  let mask = (1 << (8 - length)) - 1;
	  let value = buffer[start] & mask;
	  for (let i = start + 1; i < end; i++) {
	    value = (value << 8) + buffer[i];
	  }
	  return value;
	}
	return WebmBase;
}

var WebmDemuxer_1$1;
var hasRequiredWebmDemuxer$1;

function requireWebmDemuxer$1 () {
	if (hasRequiredWebmDemuxer$1) return WebmDemuxer_1$1;
	hasRequiredWebmDemuxer$1 = 1;
	const WebmBaseDemuxer = requireWebmBase();

	const OPUS_HEAD = Buffer.from([...'OpusHead'].map(x => x.charCodeAt(0)));

	/**
	 * Demuxes a Webm stream (containing Opus audio) to output an Opus stream.
	 * @extends core.WebmBaseDemuxer
	 * @memberof opus
	 * @example
	 * const fs = require('fs');
	 * const file = fs.createReadStream('./audio.webm');
	 * const demuxer = new prism.opus.WebmDemuxer();
	 * const opus = file.pipe(demuxer);
	 * // opus is now a ReadableStream in object mode outputting Opus packets
	 */
	class WebmDemuxer extends WebmBaseDemuxer {
	  _checkHead(data) {
	    if (!data.slice(0, 8).equals(OPUS_HEAD)) {
	      throw Error('Audio codec is not Opus!');
	    }
	  }
	}

	WebmDemuxer_1$1 = WebmDemuxer;
	return WebmDemuxer_1$1;
}

/**
 * Opus features
 * @namespace opus
 */

var opus;
var hasRequiredOpus;

function requireOpus () {
	if (hasRequiredOpus) return opus;
	hasRequiredOpus = 1;
	opus = {
	  // Encoder and Decoder
	  ...requireOpus$1(),
	  OggDemuxer: requireOggDemuxer(),
	  WebmDemuxer: requireWebmDemuxer$1(),
	};
	return opus;
}

var WebmDemuxer_1;
var hasRequiredWebmDemuxer;

function requireWebmDemuxer () {
	if (hasRequiredWebmDemuxer) return WebmDemuxer_1;
	hasRequiredWebmDemuxer = 1;
	const WebmBaseDemuxer = requireWebmBase();

	const VORBIS_HEAD = Buffer.from([...'vorbis'].map(x => x.charCodeAt(0)));

	/**
	 * Demuxes a Webm stream (containing Vorbis audio) to output a Vorbis stream.
	 * @memberof vorbis
	 * @extends core.WebmBaseDemuxer
	 */
	class WebmDemuxer extends WebmBaseDemuxer {
	  _checkHead(data) {
	    if (data.readUInt8(0) !== 2 || !data.slice(4, 10).equals(VORBIS_HEAD)) {
	      throw Error('Audio codec is not Vorbis!');
	    }

	    this.push(data.slice(3, 3 + data.readUInt8(1)));
	    this.push(data.slice(3 + data.readUInt8(1), 3 + data.readUInt8(1) + data.readUInt8(2)));
	    this.push(data.slice(3 + data.readUInt8(1) + data.readUInt8(2)));
	  }
	}

	WebmDemuxer_1 = WebmDemuxer;
	return WebmDemuxer_1;
}

/**
 * Vorbis features
 * @namespace vorbis
 */

var vorbis;
var hasRequiredVorbis;

function requireVorbis () {
	if (hasRequiredVorbis) return vorbis;
	hasRequiredVorbis = 1;
	vorbis = {
	  WebmDemuxer: requireWebmDemuxer(),
	};
	return vorbis;
}

var FFmpeg_1;
var hasRequiredFFmpeg;

function requireFFmpeg () {
	if (hasRequiredFFmpeg) return FFmpeg_1;
	hasRequiredFFmpeg = 1;
	const ChildProcess = require$$0$6;
	const { Duplex } = require$$0$4;

	let FFMPEG = {
	  command: null,
	  output: null,
	};

	const VERSION_REGEX = /version (.+) Copyright/mi;

	Object.defineProperty(FFMPEG, 'version', {
	  get() {
	    return VERSION_REGEX.exec(FFMPEG.output)[1];
	  },
	  enumerable: true,
	});

	/**
	 * An FFmpeg transform stream that provides an interface to FFmpeg.
	 * @memberof core
	 */
	class FFmpeg extends Duplex {
	  /**
	   * Creates a new FFmpeg transform stream
	   * @memberof core
	   * @param {Object} options Options you would pass to a regular Transform stream, plus an `args` option
	   * @param {Array<string>} options.args Arguments to pass to FFmpeg
	   * @param {boolean} [options.shell=false] Whether FFmpeg should be spawned inside a shell
	   * @example
	   * // By default, if you don't specify an input (`-i ...`) prism will assume you're piping a stream into it.
	   * const transcoder = new prism.FFmpeg({
	   *  args: [
	   *    '-analyzeduration', '0',
	   *    '-loglevel', '0',
	   *    '-f', 's16le',
	   *    '-ar', '48000',
	   *    '-ac', '2',
	   *  ]
	   * });
	   * const s16le = mp3File.pipe(transcoder);
	   * const opus = s16le.pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }));
	   */
	  constructor(options = {}) {
	    super();
	    this.process = FFmpeg.create({ shell: false, ...options });
	    const EVENTS = {
	      readable: this._reader,
	      data: this._reader,
	      end: this._reader,
	      unpipe: this._reader,
	      finish: this._writer,
	      drain: this._writer,
	    };

	    this._readableState = this._reader._readableState;
	    this._writableState = this._writer._writableState;

	    this._copy(['write', 'end'], this._writer);
	    this._copy(['read', 'setEncoding', 'pipe', 'unpipe'], this._reader);

	    for (const method of ['on', 'once', 'removeListener', 'removeListeners', 'listeners']) {
	      this[method] = (ev, fn) => EVENTS[ev] ? EVENTS[ev][method](ev, fn) : Duplex.prototype[method].call(this, ev, fn);
	    }

	    const processError = error => this.emit('error', error);
	    this._reader.on('error', processError);
	    this._writer.on('error', processError);
	  }

	  get _reader() { return this.process.stdout; }
	  get _writer() { return this.process.stdin; }

	  _copy(methods, target) {
	    for (const method of methods) {
	      this[method] = target[method].bind(target);
	    }
	  }

	  _destroy(err, cb) {
	    this._cleanup();
	    return cb ? cb(err) : undefined;
	  }

	  _final(cb) {
	    this._cleanup();
	    cb();
	  }

	  _cleanup() {
	    if (this.process) {
	      this.once('error', () => {});
	      this.process.kill('SIGKILL');
	      this.process = null;
	    }
	  }


	  /**
	   * The available FFmpeg information
	   * @typedef {Object} FFmpegInfo
	   * @memberof core
	   * @property {string} command The command used to launch FFmpeg
	   * @property {string} output The output from running `ffmpeg -h`
	   * @property {string} version The version of FFmpeg being used, determined from `output`.
	   */

	  /**
	   * Finds a suitable FFmpeg command and obtains the debug information from it.
	   * @param {boolean} [force=false] If true, will ignore any cached results and search for the command again
	   * @returns {FFmpegInfo}
	   * @throws Will throw an error if FFmpeg cannot be found.
	   * @example
	   * const ffmpeg = prism.FFmpeg.getInfo();
	   *
	   * console.log(`Using FFmpeg version ${ffmpeg.version}`);
	   *
	   * if (ffmpeg.output.includes('--enable-libopus')) {
	   *   console.log('libopus is available!');
	   * } else {
	   *   console.log('libopus is unavailable!');
	   * }
	   */
	  static getInfo(force = false) {
	    if (FFMPEG.command && !force) return FFMPEG;
	    const sources = [() => {
	      const ffmpegStatic = require$$2$2;
	      return ffmpegStatic.path || ffmpegStatic;
	    }, 'ffmpeg', 'avconv', './ffmpeg', './avconv'];
	    for (let source of sources) {
	      try {
	        if (typeof source === 'function') source = source();
	        const result = ChildProcess.spawnSync(source, ['-h'], { windowsHide: true });
	        if (result.error) throw result.error;
	        Object.assign(FFMPEG, {
	          command: source,
	          output: Buffer.concat(result.output.filter(Boolean)).toString(),
	        });
	        return FFMPEG;
	      } catch (error) {
	        // Do nothing
	      }
	    }
	    throw new Error('FFmpeg/avconv not found!');
	  }

	  /**
	   * Creates a new FFmpeg instance. If you do not include `-i ...` it will be assumed that `-i -` should be prepended
	   * to the options and that you'll be piping data into the process.
	   * @param {String[]} [args=[]] Arguments to pass to FFmpeg
	   * @returns {ChildProcess}
	   * @private
	   * @throws Will throw an error if FFmpeg cannot be found.
	   */
	  static create({ args = [], shell = false } = {}) {
	    if (!args.includes('-i')) args.unshift('-i', '-');
	    return ChildProcess.spawn(FFmpeg.getInfo().command, args.concat(['pipe:1']), { windowsHide: true, shell });
	  }
	}

	FFmpeg_1 = FFmpeg;
	return FFmpeg_1;
}

var VolumeTransformer_1;
var hasRequiredVolumeTransformer;

function requireVolumeTransformer () {
	if (hasRequiredVolumeTransformer) return VolumeTransformer_1;
	hasRequiredVolumeTransformer = 1;
	// Based on discord.js' old volume system

	const { Transform } = require$$0$4;

	/**
	 * Transforms a stream of PCM volume.
	 * @memberof core
	 * @extends TransformStream
	 */
	class VolumeTransformer extends Transform {
	  /**
	   * @memberof core
	   * @param {Object} options Any optional TransformStream options plus some extra:
	   * @param {string} options.type The type of transformer: s16le (signed 16-bit little-endian), s16be, s32le, s32be
	   * @param {number} [options.volume=1] The output volume of the stream
	   * @example
	   * // Half the volume of a signed 16-bit little-endian PCM stream
	   * input
	   *  .pipe(new prism.VolumeTransformer({ type: 's16le', volume: 0.5 }))
	   *  .pipe(writeStream);
	   */
	  constructor(options = {}) {
	    super(options);
	    switch (options.type) {
	      case 's16le':
	        this._readInt = (buffer, index) => buffer.readInt16LE(index);
	        this._writeInt = (buffer, int, index) => buffer.writeInt16LE(int, index);
	        this._bits = 16;
	        break;
	      case 's16be':
	        this._readInt = (buffer, index) => buffer.readInt16BE(index);
	        this._writeInt = (buffer, int, index) => buffer.writeInt16BE(int, index);
	        this._bits = 16;
	        break;
	      case 's32le':
	        this._readInt = (buffer, index) => buffer.readInt32LE(index);
	        this._writeInt = (buffer, int, index) => buffer.writeInt32LE(int, index);
	        this._bits = 32;
	        break;
	      case 's32be':
	        this._readInt = (buffer, index) => buffer.readInt32BE(index);
	        this._writeInt = (buffer, int, index) => buffer.writeInt32BE(int, index);
	        this._bits = 32;
	        break;
	      default:
	        throw new Error('VolumeTransformer type should be one of s16le, s16be, s32le, s32be');
	    }
	    this._bytes = this._bits / 8;
	    this._extremum = Math.pow(2, this._bits - 1);
	    this.volume = typeof options.volume === 'undefined' ? 1 : options.volume;
	    this._chunk = Buffer.alloc(0);
	  }

	  _readInt(buffer, index) { return index; }
	  _writeInt(buffer, int, index) { return index; }

	  _transform(chunk, encoding, done) {
	    // If the volume is 1, act like a passthrough stream
	    if (this.volume === 1) {
	      this.push(chunk);
	      return done();
	    }

	    const { _bytes, _extremum } = this;

	    chunk = this._chunk = Buffer.concat([this._chunk, chunk]);
	    if (chunk.length < _bytes) return done();

	    const complete = Math.floor(chunk.length / _bytes) * _bytes;

	    for (let i = 0; i < complete; i += _bytes) {
	      const int = Math.min(_extremum - 1, Math.max(-_extremum, Math.floor(this.volume * this._readInt(chunk, i))));
	      this._writeInt(chunk, int, i);
	    }

	    this._chunk = chunk.slice(complete);
	    this.push(chunk.slice(0, complete));
	    return done();
	  }

	  _destroy(err, cb) {
	    super._destroy(err, cb);
	    this._chunk = null;
	  }

	  /**
	   * Sets the volume relative to the input stream - i.e. 1 is normal, 0.5 is half, 2 is double.
	   * @param {number} volume The volume that you want to set
	   */
	  setVolume(volume) {
	    this.volume = volume;
	  }

	  /**
	   * Sets the volume in decibels.
	   * @param {number} db The decibels
	   */
	  setVolumeDecibels(db) {
	    this.setVolume(Math.pow(10, db / 20));
	  }

	  /**
	   * Sets the volume so that a perceived value of 0.5 is half the perceived volume etc.
	   * @param {number} value The value for the volume
	   */
	  setVolumeLogarithmic(value) {
	    this.setVolume(Math.pow(value, 1.660964));
	  }

	  /**
	   * The current volume of the stream in decibels
	   * @readonly
	   * @type {number}
	   */
	  get volumeDecibels() {
	    return Math.log10(this.volume) * 20;
	  }
	  /**
	   * The current volume of the stream from a logarithmic scale
	   * @readonly
	   * @type {number}
	   */
	  get volumeLogarithmic() {
	    return Math.pow(this.volume, 1 / 1.660964);
	  }
	}

	VolumeTransformer_1 = VolumeTransformer;
	return VolumeTransformer_1;
}

/**
 * Core features.
 * **You shouldn't prefix imports from this namespace with `core`.**
 * @namespace core
 */

var core;
var hasRequiredCore;

function requireCore () {
	if (hasRequiredCore) return core;
	hasRequiredCore = 1;
	core = {
	  FFmpeg: requireFFmpeg(),
	  VolumeTransformer: requireVolumeTransformer(),
	};
	return core;
}

var src;
var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;
	src = {
	  opus: requireOpus(),
	  vorbis: requireVorbis(),
	  ...requireCore(),
	};
	return src;
}

var srcExports = requireSrc();
var prism4 = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

const require$1 = createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require$1 !== "undefined" ? require$1 : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require$1 !== "undefined" ? require$1 : a)[b]
}) : x)(function(x) {
  if (typeof require$1 !== "undefined") return require$1.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
function createJoinVoiceChannelPayload(config) {
  return {
    op: GatewayOpcodes.VoiceStateUpdate,
    // eslint-disable-next-line id-length
    d: {
      guild_id: config.guildId,
      channel_id: config.channelId,
      self_deaf: config.selfDeaf,
      self_mute: config.selfMute
    }
  };
}
__name(createJoinVoiceChannelPayload, "createJoinVoiceChannelPayload");
var groups = /* @__PURE__ */ new Map();
groups.set("default", /* @__PURE__ */ new Map());
function getOrCreateGroup(group) {
  const existing = groups.get(group);
  if (existing) return existing;
  const map = /* @__PURE__ */ new Map();
  groups.set(group, map);
  return map;
}
__name(getOrCreateGroup, "getOrCreateGroup");
function getGroups() {
  return groups;
}
__name(getGroups, "getGroups");
function getVoiceConnections(group = "default") {
  return groups.get(group);
}
__name(getVoiceConnections, "getVoiceConnections");
function getVoiceConnection(guildId, group = "default") {
  return getVoiceConnections(group)?.get(guildId);
}
__name(getVoiceConnection, "getVoiceConnection");
function untrackVoiceConnection(voiceConnection) {
  return getVoiceConnections(voiceConnection.joinConfig.group)?.delete(voiceConnection.joinConfig.guildId);
}
__name(untrackVoiceConnection, "untrackVoiceConnection");
function trackVoiceConnection(voiceConnection) {
  return getOrCreateGroup(voiceConnection.joinConfig.group).set(voiceConnection.joinConfig.guildId, voiceConnection);
}
__name(trackVoiceConnection, "trackVoiceConnection");
var FRAME_LENGTH = 20;
var audioCycleInterval;
var nextTime = -1;
var audioPlayers = [];
function audioCycleStep() {
  if (nextTime === -1) return;
  nextTime += FRAME_LENGTH;
  const available = audioPlayers.filter((player) => player.checkPlayable());
  for (const player of available) {
    player["_stepDispatch"]();
  }
  prepareNextAudioFrame(available);
}
__name(audioCycleStep, "audioCycleStep");
function prepareNextAudioFrame(players) {
  const nextPlayer = players.shift();
  if (!nextPlayer) {
    if (nextTime !== -1) {
      audioCycleInterval = setTimeout(() => audioCycleStep(), nextTime - Date.now());
    }
    return;
  }
  nextPlayer["_stepPrepare"]();
  setImmediate(() => prepareNextAudioFrame(players));
}
__name(prepareNextAudioFrame, "prepareNextAudioFrame");
function hasAudioPlayer(target) {
  return audioPlayers.includes(target);
}
__name(hasAudioPlayer, "hasAudioPlayer");
function addAudioPlayer(player) {
  if (hasAudioPlayer(player)) return player;
  audioPlayers.push(player);
  if (audioPlayers.length === 1) {
    nextTime = Date.now();
    setImmediate(() => audioCycleStep());
  }
  return player;
}
__name(addAudioPlayer, "addAudioPlayer");
function deleteAudioPlayer(player) {
  const index = audioPlayers.indexOf(player);
  if (index === -1) return;
  audioPlayers.splice(index, 1);
  if (audioPlayers.length === 0) {
    nextTime = -1;
    if (audioCycleInterval !== void 0) clearTimeout(audioCycleInterval);
  }
}
__name(deleteAudioPlayer, "deleteAudioPlayer");
var libs = {
  "sodium-native": /* @__PURE__ */ __name((sodium) => ({
    crypto_aead_xchacha20poly1305_ietf_decrypt: /* @__PURE__ */ __name((cipherText, additionalData, nonce2, key) => {
      const message = Buffer$1.alloc(cipherText.length - sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES);
      sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(message, null, cipherText, additionalData, nonce2, key);
      return message;
    }, "crypto_aead_xchacha20poly1305_ietf_decrypt"),
    crypto_aead_xchacha20poly1305_ietf_encrypt: /* @__PURE__ */ __name((plaintext, additionalData, nonce2, key) => {
      const cipherText = Buffer$1.alloc(plaintext.length + sodium.crypto_aead_xchacha20poly1305_ietf_ABYTES);
      sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(cipherText, plaintext, additionalData, null, nonce2, key);
      return cipherText;
    }, "crypto_aead_xchacha20poly1305_ietf_encrypt")
  }), "sodium-native"),
  sodium: /* @__PURE__ */ __name((sodium) => ({
    crypto_aead_xchacha20poly1305_ietf_decrypt: /* @__PURE__ */ __name((cipherText, additionalData, nonce2, key) => sodium.api.crypto_aead_xchacha20poly1305_ietf_decrypt(cipherText, additionalData, null, nonce2, key), "crypto_aead_xchacha20poly1305_ietf_decrypt"),
    crypto_aead_xchacha20poly1305_ietf_encrypt: /* @__PURE__ */ __name((plaintext, additionalData, nonce2, key) => sodium.api.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, additionalData, null, nonce2, key), "crypto_aead_xchacha20poly1305_ietf_encrypt")
  }), "sodium"),
  "libsodium-wrappers": /* @__PURE__ */ __name((sodium) => ({
    crypto_aead_xchacha20poly1305_ietf_decrypt: /* @__PURE__ */ __name((cipherText, additionalData, nonce2, key) => sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, cipherText, additionalData, nonce2, key), "crypto_aead_xchacha20poly1305_ietf_decrypt"),
    crypto_aead_xchacha20poly1305_ietf_encrypt: /* @__PURE__ */ __name((plaintext, additionalData, nonce2, key) => sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, additionalData, null, nonce2, key), "crypto_aead_xchacha20poly1305_ietf_encrypt")
  }), "libsodium-wrappers"),
  "@stablelib/xchacha20poly1305": /* @__PURE__ */ __name((stablelib) => ({
    crypto_aead_xchacha20poly1305_ietf_decrypt(plaintext, additionalData, nonce2, key) {
      const crypto3 = new stablelib.XChaCha20Poly1305(key);
      return crypto3.open(nonce2, plaintext, additionalData);
    },
    crypto_aead_xchacha20poly1305_ietf_encrypt(cipherText, additionalData, nonce2, key) {
      const crypto3 = new stablelib.XChaCha20Poly1305(key);
      return crypto3.seal(nonce2, cipherText, additionalData);
    }
  }), "@stablelib/xchacha20poly1305"),
  "@noble/ciphers/chacha": /* @__PURE__ */ __name((noble) => ({
    crypto_aead_xchacha20poly1305_ietf_decrypt(cipherText, additionalData, nonce2, key) {
      const chacha = noble.xchacha20poly1305(key, nonce2, additionalData);
      return chacha.decrypt(cipherText);
    },
    crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, additionalData, nonce2, key) {
      const chacha = noble.xchacha20poly1305(key, nonce2, additionalData);
      return chacha.encrypt(plaintext);
    }
  }), "@noble/ciphers/chacha")
};
var fallbackError = /* @__PURE__ */ __name(() => {
  throw new Error(
    `Cannot play audio as no valid encryption package is installed.
- Install one of:
  - sodium
  - libsodium-wrappers
  - @stablelib/xchacha20poly1305
  - @noble/ciphers.
- Use the generateDependencyReport() function for more information.
`
  );
}, "fallbackError");
var methods = {
  crypto_aead_xchacha20poly1305_ietf_encrypt: fallbackError,
  crypto_aead_xchacha20poly1305_ietf_decrypt: fallbackError
};
new Promise(async (resolve2) => {
  for (const libName of Object.keys(libs)) {
    try {
      const lib = await import(libName);
      if (libName === "libsodium-wrappers" && lib.ready) {
        await lib.ready;
      }
      Object.assign(methods, libs[libName](lib));
      break;
    } catch {
    }
  }
  resolve2();
});

// src/util/util.ts
var noop = /* @__PURE__ */ __name(() => {
}, "noop");

// src/audio/AudioPlayerError.ts
var AudioPlayerError = class extends Error {
  static {
    __name(this, "AudioPlayerError");
  }
  /**
   * The resource associated with the audio player at the time the error was thrown.
   */
  resource;
  constructor(error, resource) {
    super(error.message);
    this.resource = resource;
    this.name = error.name;
    this.stack = error.stack;
  }
};

// src/audio/PlayerSubscription.ts
var PlayerSubscription = class {
  static {
    __name(this, "PlayerSubscription");
  }
  /**
   * The voice connection of this subscription.
   */
  connection;
  /**
   * The audio player of this subscription.
   */
  player;
  constructor(connection, player) {
    this.connection = connection;
    this.player = player;
  }
  /**
   * Unsubscribes the connection from the audio player, meaning that the
   * audio player cannot stream audio to it until a new subscription is made.
   */
  unsubscribe() {
    this.connection["onSubscriptionRemoved"](this);
    this.player["unsubscribe"](this);
  }
};

// src/audio/AudioPlayer.ts
var SILENCE_FRAME = Buffer$1.from([248, 255, 254]);
function stringifyState(state) {
  return JSON.stringify({
    ...state,
    resource: Reflect.has(state, "resource"),
    stepTimeout: Reflect.has(state, "stepTimeout")
  });
}
__name(stringifyState, "stringifyState");
var AudioPlayer = class extends EventEmitter {
  static {
    __name(this, "AudioPlayer");
  }
  /**
   * The state that the AudioPlayer is in.
   */
  _state;
  /**
   * A list of VoiceConnections that are registered to this AudioPlayer. The player will attempt to play audio
   * to the streams in this list.
   */
  subscribers = [];
  /**
   * The behavior that the player should follow when it enters certain situations.
   */
  behaviors;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * Creates a new AudioPlayer.
   */
  constructor(options = {}) {
    super();
    this._state = { status: "idle" /* Idle */ };
    this.behaviors = {
      noSubscriber: "pause" /* Pause */,
      maxMissedFrames: 5,
      ...options.behaviors
    };
    this.debug = options.debug === false ? null : (message) => this.emit("debug", message);
  }
  /**
   * A list of subscribed voice connections that can currently receive audio to play.
   */
  get playable() {
    return this.subscribers.filter(({ connection }) => connection.state.status === "ready" /* Ready */).map(({ connection }) => connection);
  }
  /**
   * Subscribes a VoiceConnection to the audio player's play list. If the VoiceConnection is already subscribed,
   * then the existing subscription is used.
   *
   * @remarks
   * This method should not be directly called. Instead, use VoiceConnection#subscribe.
   * @param connection - The connection to subscribe
   * @returns The new subscription if the voice connection is not yet subscribed, otherwise the existing subscription
   */
  // @ts-ignore
  subscribe(connection) {
    const existingSubscription = this.subscribers.find((subscription) => subscription.connection === connection);
    if (!existingSubscription) {
      const subscription = new PlayerSubscription(connection, this);
      this.subscribers.push(subscription);
      setImmediate(() => this.emit("subscribe", subscription));
      return subscription;
    }
    return existingSubscription;
  }
  /**
   * Unsubscribes a subscription - i.e. removes a voice connection from the play list of the audio player.
   *
   * @remarks
   * This method should not be directly called. Instead, use PlayerSubscription#unsubscribe.
   * @param subscription - The subscription to remove
   * @returns Whether or not the subscription existed on the player and was removed
   */
  // @ts-ignore
  unsubscribe(subscription) {
    const index = this.subscribers.indexOf(subscription);
    const exists = index !== -1;
    if (exists) {
      this.subscribers.splice(index, 1);
      subscription.connection.setSpeaking(false);
      this.emit("unsubscribe", subscription);
    }
    return exists;
  }
  /**
   * The state that the player is in.
   *
   * @remarks
   * The setter will perform clean-up operations where necessary.
   */
  get state() {
    return this._state;
  }
  set state(newState) {
    const oldState = this._state;
    const newResource = Reflect.get(newState, "resource");
    if (oldState.status !== "idle" /* Idle */ && oldState.resource !== newResource) {
      oldState.resource.playStream.on("error", noop);
      oldState.resource.playStream.off("error", oldState.onStreamError);
      oldState.resource.audioPlayer = void 0;
      oldState.resource.playStream.destroy();
      oldState.resource.playStream.read();
    }
    if (oldState.status === "buffering" /* Buffering */ && (newState.status !== "buffering" /* Buffering */ || newState.resource !== oldState.resource)) {
      oldState.resource.playStream.off("end", oldState.onFailureCallback);
      oldState.resource.playStream.off("close", oldState.onFailureCallback);
      oldState.resource.playStream.off("finish", oldState.onFailureCallback);
      oldState.resource.playStream.off("readable", oldState.onReadableCallback);
    }
    if (newState.status === "idle" /* Idle */) {
      this._signalStopSpeaking();
      deleteAudioPlayer(this);
    }
    if (newResource) {
      addAudioPlayer(this);
    }
    const didChangeResources = oldState.status !== "idle" /* Idle */ && newState.status === "playing" /* Playing */ && oldState.resource !== newState.resource;
    this._state = newState;
    this.emit("stateChange", oldState, this._state);
    if (oldState.status !== newState.status || didChangeResources) {
      this.emit(newState.status, oldState, this._state);
    }
    this.debug?.(`state change:
from ${stringifyState(oldState)}
to ${stringifyState(newState)}`);
  }
  /**
   * Plays a new resource on the player. If the player is already playing a resource, the existing resource is destroyed
   * (it cannot be reused, even in another player) and is replaced with the new resource.
   *
   * @remarks
   * The player will transition to the Playing state once playback begins, and will return to the Idle state once
   * playback is ended.
   *
   * If the player was previously playing a resource and this method is called, the player will not transition to the
   * Idle state during the swap over.
   * @param resource - The resource to play
   * @throws Will throw if attempting to play an audio resource that has already ended, or is being played by another player
   */
  play(resource) {
    if (resource.ended) {
      throw new Error("Cannot play a resource that has already ended.");
    }
    if (resource.audioPlayer) {
      if (resource.audioPlayer === this) {
        return;
      }
      throw new Error("Resource is already being played by another audio player.");
    }
    resource.audioPlayer = this;
    const onStreamError = /* @__PURE__ */ __name((error) => {
      if (this.state.status !== "idle" /* Idle */) {
        this.emit("error", new AudioPlayerError(error, this.state.resource));
      }
      if (this.state.status !== "idle" /* Idle */ && this.state.resource === resource) {
        this.state = {
          status: "idle" /* Idle */
        };
      }
    }, "onStreamError");
    resource.playStream.once("error", onStreamError);
    if (resource.started) {
      this.state = {
        status: "playing" /* Playing */,
        missedFrames: 0,
        playbackDuration: 0,
        resource,
        onStreamError
      };
    } else {
      const onReadableCallback = /* @__PURE__ */ __name(() => {
        if (this.state.status === "buffering" /* Buffering */ && this.state.resource === resource) {
          this.state = {
            status: "playing" /* Playing */,
            missedFrames: 0,
            playbackDuration: 0,
            resource,
            onStreamError
          };
        }
      }, "onReadableCallback");
      const onFailureCallback = /* @__PURE__ */ __name(() => {
        if (this.state.status === "buffering" /* Buffering */ && this.state.resource === resource) {
          this.state = {
            status: "idle" /* Idle */
          };
        }
      }, "onFailureCallback");
      resource.playStream.once("readable", onReadableCallback);
      resource.playStream.once("end", onFailureCallback);
      resource.playStream.once("close", onFailureCallback);
      resource.playStream.once("finish", onFailureCallback);
      this.state = {
        status: "buffering" /* Buffering */,
        resource,
        onReadableCallback,
        onFailureCallback,
        onStreamError
      };
    }
  }
  /**
   * Pauses playback of the current resource, if any.
   *
   * @param interpolateSilence - If true, the player will play 5 packets of silence after pausing to prevent audio glitches
   * @returns `true` if the player was successfully paused, otherwise `false`
   */
  pause(interpolateSilence = true) {
    if (this.state.status !== "playing" /* Playing */) return false;
    this.state = {
      ...this.state,
      status: "paused" /* Paused */,
      silencePacketsRemaining: interpolateSilence ? 5 : 0
    };
    return true;
  }
  /**
   * Unpauses playback of the current resource, if any.
   *
   * @returns `true` if the player was successfully unpaused, otherwise `false`
   */
  unpause() {
    if (this.state.status !== "paused" /* Paused */) return false;
    this.state = {
      ...this.state,
      status: "playing" /* Playing */,
      missedFrames: 0
    };
    return true;
  }
  /**
   * Stops playback of the current resource and destroys the resource. The player will either transition to the Idle state,
   * or remain in its current state until the silence padding frames of the resource have been played.
   *
   * @param force - If true, will force the player to enter the Idle state even if the resource has silence padding frames
   * @returns `true` if the player will come to a stop, otherwise `false`
   */
  stop(force = false) {
    if (this.state.status === "idle" /* Idle */) return false;
    if (force || this.state.resource.silencePaddingFrames === 0) {
      this.state = {
        status: "idle" /* Idle */
      };
    } else if (this.state.resource.silenceRemaining === -1) {
      this.state.resource.silenceRemaining = this.state.resource.silencePaddingFrames;
    }
    return true;
  }
  /**
   * Checks whether the underlying resource (if any) is playable (readable)
   *
   * @returns `true` if the resource is playable, otherwise `false`
   */
  checkPlayable() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */) return false;
    if (!state.resource.readable) {
      this.state = {
        status: "idle" /* Idle */
      };
      return false;
    }
    return true;
  }
  /**
   * Called roughly every 20ms by the global audio player timer. Dispatches any audio packets that are buffered
   * by the active connections of this audio player.
   */
  // @ts-ignore
  _stepDispatch() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */) return;
    for (const connection of this.playable) {
      connection.dispatchAudio();
    }
  }
  /**
   * Called roughly every 20ms by the global audio player timer. Attempts to read an audio packet from the
   * underlying resource of the stream, and then has all the active connections of the audio player prepare it
   * (encrypt it, append header data) so that it is ready to play at the start of the next cycle.
   */
  // @ts-ignore
  _stepPrepare() {
    const state = this._state;
    if (state.status === "idle" /* Idle */ || state.status === "buffering" /* Buffering */) return;
    const playable = this.playable;
    if (state.status === "autopaused" /* AutoPaused */ && playable.length > 0) {
      this.state = {
        ...state,
        status: "playing" /* Playing */,
        missedFrames: 0
      };
    }
    if (state.status === "paused" /* Paused */ || state.status === "autopaused" /* AutoPaused */) {
      if (state.silencePacketsRemaining > 0) {
        state.silencePacketsRemaining--;
        this._preparePacket(SILENCE_FRAME, playable, state);
        if (state.silencePacketsRemaining === 0) {
          this._signalStopSpeaking();
        }
      }
      return;
    }
    if (playable.length === 0) {
      if (this.behaviors.noSubscriber === "pause" /* Pause */) {
        this.state = {
          ...state,
          status: "autopaused" /* AutoPaused */,
          silencePacketsRemaining: 5
        };
        return;
      } else if (this.behaviors.noSubscriber === "stop" /* Stop */) {
        this.stop(true);
      }
    }
    const packet = state.resource.read();
    if (state.status === "playing" /* Playing */) {
      if (packet) {
        this._preparePacket(packet, playable, state);
        state.missedFrames = 0;
      } else {
        this._preparePacket(SILENCE_FRAME, playable, state);
        state.missedFrames++;
        if (state.missedFrames >= this.behaviors.maxMissedFrames) {
          this.stop();
        }
      }
    }
  }
  /**
   * Signals to all the subscribed connections that they should send a packet to Discord indicating
   * they are no longer speaking. Called once playback of a resource ends.
   */
  _signalStopSpeaking() {
    for (const { connection } of this.subscribers) {
      connection.setSpeaking(false);
    }
  }
  /**
   * Instructs the given connections to each prepare this packet to be played at the start of the
   * next cycle.
   *
   * @param packet - The Opus packet to be prepared by each receiver
   * @param receivers - The connections that should play this packet
   */
  _preparePacket(packet, receivers, state) {
    state.playbackDuration += 20;
    for (const connection of receivers) {
      connection.prepareAudioPacket(packet);
    }
  }
};
function createAudioPlayer(options) {
  return new AudioPlayer(options);
}
__name(createAudioPlayer, "createAudioPlayer");

// src/networking/DAVESession.ts
var Davey = null;
var TRANSITION_EXPIRY = 10;
var TRANSITION_EXPIRY_PENDING_DOWNGRADE = 24;
var DEFAULT_DECRYPTION_FAILURE_TOLERANCE = 36;
new Promise(async (resolve2) => {
  try {
    const lib = await import('@snazzah/davey');
    Davey = lib;
  } catch {
  }
  resolve2();
});
function getMaxProtocolVersion() {
  return Davey?.DAVE_PROTOCOL_VERSION;
}
__name(getMaxProtocolVersion, "getMaxProtocolVersion");
var DAVESession = class extends EventEmitter {
  static {
    __name(this, "DAVESession");
  }
  /**
   * The channel id represented by this session.
   */
  channelId;
  /**
   * The user id represented by this session.
   */
  userId;
  /**
   * The protocol version being used.
   */
  protocolVersion;
  /**
   * The last transition id executed.
   */
  lastTransitionId;
  /**
   * The pending transition.
   */
  pendingTransition;
  /**
   * Whether this session was downgraded previously.
   */
  downgraded = false;
  /**
   * The amount of consecutive failures encountered when decrypting.
   */
  consecutiveFailures = 0;
  /**
   * The amount of consecutive failures needed to attempt to recover.
   */
  failureTolerance;
  /**
   * Whether this session is currently re-initializing due to an invalid transition.
   */
  reinitializing = false;
  /**
   * The underlying DAVE Session of this wrapper.
   */
  session;
  constructor(protocolVersion, userId, channelId, options) {
    if (Davey === null)
      throw new Error(
        `Cannot utilize the DAVE protocol as the @snazzah/davey package has not been installed.
- Use the generateDependencyReport() function for more information.
`
      );
    super();
    this.protocolVersion = protocolVersion;
    this.userId = userId;
    this.channelId = channelId;
    this.failureTolerance = options.decryptionFailureTolerance ?? DEFAULT_DECRYPTION_FAILURE_TOLERANCE;
  }
  /**
   * The current voice privacy code of the session. Will be `null` if there is no session.
   */
  get voicePrivacyCode() {
    if (this.protocolVersion === 0 || !this.session?.voicePrivacyCode) {
      return null;
    }
    return this.session.voicePrivacyCode;
  }
  /**
   * Gets the verification code for a user in the session.
   *
   * @throws Will throw if there is not an active session or the user id provided is invalid or not in the session.
   */
  async getVerificationCode(userId) {
    if (!this.session) throw new Error("Session not available");
    return this.session.getVerificationCode(userId);
  }
  /**
   * Re-initializes (or initializes) the underlying session.
   */
  reinit() {
    if (this.protocolVersion > 0) {
      if (this.session) {
        this.session.reinit(this.protocolVersion, this.userId, this.channelId);
        this.emit("debug", `Session reinitialized for protocol version ${this.protocolVersion}`);
      } else {
        this.session = new Davey.DAVESession(this.protocolVersion, this.userId, this.channelId);
        this.emit("debug", `Session initialized for protocol version ${this.protocolVersion}`);
      }
      this.emit("keyPackage", this.session.getSerializedKeyPackage());
    } else if (this.session) {
      this.session.reset();
      this.session.setPassthroughMode(true, TRANSITION_EXPIRY);
      this.emit("debug", "Session reset");
    }
  }
  /**
   * Set the external sender for this session.
   *
   * @param externalSender - The external sender
   */
  setExternalSender(externalSender) {
    if (!this.session) throw new Error("No session available");
    this.session.setExternalSender(externalSender);
    this.emit("debug", "Set MLS external sender");
  }
  /**
   * Prepare for a transition.
   *
   * @param data - The transition data
   * @returns Whether we should signal to the voice server that we are ready
   */
  prepareTransition(data) {
    this.emit("debug", `Preparing for transition (${data.transition_id}, v${data.protocol_version})`);
    this.pendingTransition = data;
    if (data.transition_id === 0) {
      this.executeTransition(data.transition_id);
    } else {
      if (data.protocol_version === 0) this.session?.setPassthroughMode(true, TRANSITION_EXPIRY_PENDING_DOWNGRADE);
      return true;
    }
    return false;
  }
  /**
   * Execute a transition.
   *
   * @param transitionId - The transition id to execute on
   */
  executeTransition(transitionId) {
    this.emit("debug", `Executing transition (${transitionId})`);
    if (!this.pendingTransition) {
      this.emit("debug", `Received execute transition, but we don't have a pending transition for ${transitionId}`);
      return;
    }
    let transitioned = false;
    if (transitionId === this.pendingTransition.transition_id) {
      const oldVersion = this.protocolVersion;
      this.protocolVersion = this.pendingTransition.protocol_version;
      if (oldVersion !== this.protocolVersion && this.protocolVersion === 0) {
        this.downgraded = true;
        this.emit("debug", "Session downgraded");
      } else if (transitionId > 0 && this.downgraded) {
        this.downgraded = false;
        this.session?.setPassthroughMode(true, TRANSITION_EXPIRY);
        this.emit("debug", "Session upgraded");
      }
      transitioned = true;
      this.reinitializing = false;
      this.lastTransitionId = transitionId;
      this.emit("debug", `Transition executed (v${oldVersion} -> v${this.protocolVersion}, id: ${transitionId})`);
    } else {
      this.emit(
        "debug",
        `Received execute transition for an unexpected transition id (expected: ${this.pendingTransition.transition_id}, actual: ${transitionId})`
      );
    }
    this.pendingTransition = void 0;
    return transitioned;
  }
  /**
   * Prepare for a new epoch.
   *
   * @param data - The epoch data
   */
  prepareEpoch(data) {
    this.emit("debug", `Preparing for epoch (${data.epoch})`);
    if (data.epoch === 1) {
      this.protocolVersion = data.protocol_version;
      this.reinit();
    }
  }
  /**
   * Recover from an invalid transition by re-initializing.
   *
   * @param transitionId - The transition id to invalidate
   */
  recoverFromInvalidTransition(transitionId) {
    if (this.reinitializing) return;
    this.emit("debug", `Invalidating transition ${transitionId}`);
    this.reinitializing = true;
    this.consecutiveFailures = 0;
    this.emit("invalidateTransition", transitionId);
    this.reinit();
  }
  /**
   * Processes proposals from the MLS group.
   *
   * @param payload - The binary message payload
   * @param connectedClients - The set of connected client IDs
   * @returns The payload to send back to the voice server, if there is one
   */
  processProposals(payload, connectedClients) {
    if (!this.session) throw new Error("No session available");
    const optype = payload.readUInt8(0);
    const { commit, welcome } = this.session.processProposals(
      optype,
      payload.subarray(1),
      Array.from(connectedClients)
    );
    this.emit("debug", "MLS proposals processed");
    if (!commit) return;
    return welcome ? Buffer$1.concat([commit, welcome]) : commit;
  }
  /**
   * Processes a commit from the MLS group.
   *
   * @param payload - The payload
   * @returns The transaction id and whether it was successful
   */
  processCommit(payload) {
    if (!this.session) throw new Error("No session available");
    const transitionId = payload.readUInt16BE(0);
    try {
      this.session.processCommit(payload.subarray(2));
      if (transitionId === 0) {
        this.reinitializing = false;
        this.lastTransitionId = transitionId;
      } else {
        this.pendingTransition = { transition_id: transitionId, protocol_version: this.protocolVersion };
      }
      this.emit("debug", `MLS commit processed (transition id: ${transitionId})`);
      return { transitionId, success: true };
    } catch (error) {
      this.emit("debug", `MLS commit errored from transition ${transitionId}: ${error}`);
      this.recoverFromInvalidTransition(transitionId);
      return { transitionId, success: false };
    }
  }
  /**
   * Processes a welcome from the MLS group.
   *
   * @param payload - The payload
   * @returns The transaction id and whether it was successful
   */
  processWelcome(payload) {
    if (!this.session) throw new Error("No session available");
    const transitionId = payload.readUInt16BE(0);
    try {
      this.session.processWelcome(payload.subarray(2));
      if (transitionId === 0) {
        this.reinitializing = false;
        this.lastTransitionId = transitionId;
      } else {
        this.pendingTransition = { transition_id: transitionId, protocol_version: this.protocolVersion };
      }
      this.emit("debug", `MLS welcome processed (transition id: ${transitionId})`);
      return { transitionId, success: true };
    } catch (error) {
      this.emit("debug", `MLS welcome errored from transition ${transitionId}: ${error}`);
      this.recoverFromInvalidTransition(transitionId);
      return { transitionId, success: false };
    }
  }
  /**
   * Encrypt a packet using end-to-end encryption.
   *
   * @param packet - The packet to encrypt
   */
  encrypt(packet) {
    if (this.protocolVersion === 0 || !this.session?.ready || packet.equals(SILENCE_FRAME)) return packet;
    return this.session.encryptOpus(packet);
  }
  /**
   * Decrypt a packet using end-to-end encryption.
   *
   * @param packet - The packet to decrypt
   * @param userId - The user id that sent the packet
   * @returns The decrypted packet, or `null` if the decryption failed but should be ignored
   */
  decrypt(packet, userId) {
    const canDecrypt = this.session?.ready && (this.protocolVersion !== 0 || this.session?.canPassthrough(userId));
    if (packet.equals(SILENCE_FRAME) || !canDecrypt || !this.session) return packet;
    try {
      const buffer = this.session.decrypt(userId, Davey.MediaType.AUDIO, packet);
      this.consecutiveFailures = 0;
      return buffer;
    } catch (error) {
      if (!this.reinitializing && !this.pendingTransition) {
        this.consecutiveFailures++;
        this.emit("debug", `Failed to decrypt a packet (${this.consecutiveFailures} consecutive fails)`);
        if (this.consecutiveFailures > this.failureTolerance) {
          if (this.lastTransitionId) this.recoverFromInvalidTransition(this.lastTransitionId);
          else throw error;
        }
      } else if (this.reinitializing) {
        this.emit("debug", "Failed to decrypt a packet (reinitializing session)");
      } else if (this.pendingTransition) {
        this.emit(
          "debug",
          `Failed to decrypt a packet (pending transition ${this.pendingTransition.transition_id} to v${this.pendingTransition.protocol_version})`
        );
      }
    }
    return null;
  }
  /**
   * Resets the session.
   */
  destroy() {
    try {
      this.session?.reset();
    } catch {
    }
  }
};
function parseLocalPacket(message) {
  const packet = Buffer$1.from(message);
  const ip = packet.slice(8, packet.indexOf(0, 8)).toString("utf8");
  if (!isIPv4(ip)) {
    throw new Error("Malformed IP address");
  }
  const port = packet.readUInt16BE(packet.length - 2);
  return { ip, port };
}
__name(parseLocalPacket, "parseLocalPacket");
var KEEP_ALIVE_INTERVAL = 5e3;
var MAX_COUNTER_VALUE = 2 ** 32 - 1;
var VoiceUDPSocket = class extends EventEmitter {
  static {
    __name(this, "VoiceUDPSocket");
  }
  /**
   * The underlying network Socket for the VoiceUDPSocket.
   */
  socket;
  /**
   * The socket details for Discord (remote)
   */
  remote;
  /**
   * The counter used in the keep alive mechanism.
   */
  keepAliveCounter = 0;
  /**
   * The buffer used to write the keep alive counter into.
   */
  keepAliveBuffer;
  /**
   * The Node.js interval for the keep-alive mechanism.
   */
  keepAliveInterval;
  /**
   * The time taken to receive a response to keep alive messages.
   *
   * @deprecated This field is no longer updated as keep alive messages are no longer tracked.
   */
  ping;
  /**
   * Creates a new VoiceUDPSocket.
   *
   * @param remote - Details of the remote socket
   */
  constructor(remote) {
    super();
    this.socket = createSocket("udp4");
    this.socket.on("error", (error) => this.emit("error", error));
    this.socket.on("message", (buffer) => this.onMessage(buffer));
    this.socket.on("close", () => this.emit("close"));
    this.remote = remote;
    this.keepAliveBuffer = Buffer$1.alloc(8);
    this.keepAliveInterval = setInterval(() => this.keepAlive(), KEEP_ALIVE_INTERVAL);
    setImmediate(() => this.keepAlive());
  }
  /**
   * Called when a message is received on the UDP socket.
   *
   * @param buffer - The received buffer
   */
  onMessage(buffer) {
    this.emit("message", buffer);
  }
  /**
   * Called at a regular interval to check whether we are still able to send datagrams to Discord.
   */
  keepAlive() {
    this.keepAliveBuffer.writeUInt32LE(this.keepAliveCounter, 0);
    this.send(this.keepAliveBuffer);
    this.keepAliveCounter++;
    if (this.keepAliveCounter > MAX_COUNTER_VALUE) {
      this.keepAliveCounter = 0;
    }
  }
  /**
   * Sends a buffer to Discord.
   *
   * @param buffer - The buffer to send
   */
  send(buffer) {
    this.socket.send(buffer, this.remote.port, this.remote.ip);
  }
  /**
   * Closes the socket, the instance will not be able to be reused.
   */
  destroy() {
    try {
      this.socket.close();
    } catch {
    }
    clearInterval(this.keepAliveInterval);
  }
  /**
   * Performs IP discovery to discover the local address and port to be used for the voice connection.
   *
   * @param ssrc - The SSRC received from Discord
   */
  async performIPDiscovery(ssrc) {
    return new Promise((resolve2, reject) => {
      const listener = /* @__PURE__ */ __name((message) => {
        try {
          if (message.readUInt16BE(0) !== 2) return;
          const packet = parseLocalPacket(message);
          this.socket.off("message", listener);
          resolve2(packet);
        } catch {
        }
      }, "listener");
      this.socket.on("message", listener);
      this.socket.once("close", () => reject(new Error("Cannot perform IP discovery - socket closed")));
      const discoveryBuffer = Buffer$1.alloc(74);
      discoveryBuffer.writeUInt16BE(1, 0);
      discoveryBuffer.writeUInt16BE(70, 2);
      discoveryBuffer.writeUInt32BE(ssrc, 4);
      this.send(discoveryBuffer);
    });
  }
};
var VoiceWebSocket = class extends EventEmitter {
  static {
    __name(this, "VoiceWebSocket");
  }
  /**
   * The current heartbeat interval, if any.
   */
  heartbeatInterval;
  /**
   * The time (milliseconds since UNIX epoch) that the last heartbeat acknowledgement packet was received.
   * This is set to 0 if an acknowledgement packet hasn't been received yet.
   */
  lastHeartbeatAck;
  /**
   * The time (milliseconds since UNIX epoch) that the last heartbeat was sent. This is set to 0 if a heartbeat
   * hasn't been sent yet.
   */
  lastHeartbeatSend;
  /**
   * The number of consecutively missed heartbeats.
   */
  missedHeartbeats = 0;
  /**
   * The last recorded ping.
   */
  ping;
  /**
   * The last sequence number acknowledged from Discord. Will be `-1` if no sequence numbered messages have been received.
   */
  sequence = -1;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * The underlying WebSocket of this wrapper.
   */
  ws;
  /**
   * Creates a new VoiceWebSocket.
   *
   * @param address - The address to connect to
   */
  constructor(address, debug) {
    super();
    this.ws = new WebSocket(address);
    this.ws.onmessage = (err) => this.onMessage(err);
    this.ws.onopen = (err) => this.emit("open", err);
    this.ws.onerror = (err) => this.emit("error", err instanceof Error ? err : err.error);
    this.ws.onclose = (err) => this.emit("close", err);
    this.lastHeartbeatAck = 0;
    this.lastHeartbeatSend = 0;
    this.debug = debug ? (message) => this.emit("debug", message) : null;
  }
  /**
   * Destroys the VoiceWebSocket. The heartbeat interval is cleared, and the connection is closed.
   */
  destroy() {
    try {
      this.debug?.("destroyed");
      this.setHeartbeatInterval(-1);
      this.ws.close(1e3);
    } catch (error) {
      const err = error;
      this.emit("error", err);
    }
  }
  /**
   * Handles message events on the WebSocket. Attempts to JSON parse the messages and emit them
   * as packets. Binary messages will be parsed and emitted.
   *
   * @param event - The message event
   */
  onMessage(event) {
    if (event.data instanceof Buffer$1 || event.data instanceof ArrayBuffer) {
      const buffer = event.data instanceof ArrayBuffer ? Buffer$1.from(event.data) : event.data;
      const seq = buffer.readUInt16BE(0);
      const op = buffer.readUInt8(2);
      const payload = buffer.subarray(3);
      this.sequence = seq;
      this.debug?.(`<< [bin] opcode ${op}, seq ${seq}, ${payload.byteLength} bytes`);
      this.emit("binary", { op, seq, payload });
      return;
    } else if (typeof event.data !== "string") {
      return;
    }
    this.debug?.(`<< ${event.data}`);
    let packet;
    try {
      packet = JSON.parse(event.data);
    } catch (error) {
      const err = error;
      this.emit("error", err);
      return;
    }
    if (packet.seq) {
      this.sequence = packet.seq;
    }
    if (packet.op === VoiceOpcodes.HeartbeatAck) {
      this.lastHeartbeatAck = Date.now();
      this.missedHeartbeats = 0;
      this.ping = this.lastHeartbeatAck - this.lastHeartbeatSend;
    }
    this.emit("packet", packet);
  }
  /**
   * Sends a JSON-stringifiable packet over the WebSocket.
   *
   * @param packet - The packet to send
   */
  sendPacket(packet) {
    try {
      const stringified = JSON.stringify(packet);
      this.debug?.(`>> ${stringified}`);
      this.ws.send(stringified);
    } catch (error) {
      const err = error;
      this.emit("error", err);
    }
  }
  /**
   * Sends a binary message over the WebSocket.
   *
   * @param opcode - The opcode to use
   * @param payload - The payload to send
   */
  sendBinaryMessage(opcode, payload) {
    try {
      const message = Buffer$1.concat([new Uint8Array([opcode]), payload]);
      this.debug?.(`>> [bin] opcode ${opcode}, ${payload.byteLength} bytes`);
      this.ws.send(message);
    } catch (error) {
      const err = error;
      this.emit("error", err);
    }
  }
  /**
   * Sends a heartbeat over the WebSocket.
   */
  sendHeartbeat() {
    this.lastHeartbeatSend = Date.now();
    this.missedHeartbeats++;
    const nonce2 = this.lastHeartbeatSend;
    this.sendPacket({
      op: VoiceOpcodes.Heartbeat,
      // eslint-disable-next-line id-length
      d: {
        // eslint-disable-next-line id-length
        t: nonce2,
        seq_ack: this.sequence
      }
    });
  }
  /**
   * Sets/clears an interval to send heartbeats over the WebSocket.
   *
   * @param ms - The interval in milliseconds. If negative, the interval will be unset
   */
  setHeartbeatInterval(ms) {
    if (this.heartbeatInterval !== void 0) clearInterval(this.heartbeatInterval);
    if (ms > 0) {
      this.heartbeatInterval = setInterval(() => {
        if (this.lastHeartbeatSend !== 0 && this.missedHeartbeats >= 3) {
          this.ws.close();
          this.setHeartbeatInterval(-1);
        }
        this.sendHeartbeat();
      }, ms);
    }
  }
};

// src/networking/Networking.ts
var CHANNELS = 2;
var TIMESTAMP_INC = 48e3 / 100 * CHANNELS;
var MAX_NONCE_SIZE = 2 ** 32 - 1;
var SUPPORTED_ENCRYPTION_MODES = [VoiceEncryptionMode.AeadXChaCha20Poly1305RtpSize];
if (crypto.getCiphers().includes("aes-256-gcm")) {
  SUPPORTED_ENCRYPTION_MODES.unshift(VoiceEncryptionMode.AeadAes256GcmRtpSize);
}
var nonce = Buffer$1.alloc(24);
function stringifyState2(state) {
  return JSON.stringify({
    ...state,
    ws: Reflect.has(state, "ws"),
    udp: Reflect.has(state, "udp")
  });
}
__name(stringifyState2, "stringifyState");
function chooseEncryptionMode(options) {
  const option = options.find((option2) => SUPPORTED_ENCRYPTION_MODES.includes(option2));
  if (!option) {
    throw new Error(`No compatible encryption modes. Available include: ${options.join(", ")}`);
  }
  return option;
}
__name(chooseEncryptionMode, "chooseEncryptionMode");
function randomNBit(numberOfBits) {
  return Math.floor(Math.random() * 2 ** numberOfBits);
}
__name(randomNBit, "randomNBit");
var Networking = class extends EventEmitter {
  static {
    __name(this, "Networking");
  }
  _state;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * The options used to create this Networking instance.
   */
  options;
  /**
   * Creates a new Networking instance.
   */
  constructor(connectionOptions, options) {
    super();
    this.onWsOpen = this.onWsOpen.bind(this);
    this.onChildError = this.onChildError.bind(this);
    this.onWsPacket = this.onWsPacket.bind(this);
    this.onWsBinary = this.onWsBinary.bind(this);
    this.onWsClose = this.onWsClose.bind(this);
    this.onWsDebug = this.onWsDebug.bind(this);
    this.onUdpDebug = this.onUdpDebug.bind(this);
    this.onUdpClose = this.onUdpClose.bind(this);
    this.onDaveDebug = this.onDaveDebug.bind(this);
    this.onDaveKeyPackage = this.onDaveKeyPackage.bind(this);
    this.onDaveInvalidateTransition = this.onDaveInvalidateTransition.bind(this);
    this.debug = options?.debug ? (message) => this.emit("debug", message) : null;
    this._state = {
      code: 0 /* OpeningWs */,
      ws: this.createWebSocket(connectionOptions.endpoint),
      connectionOptions
    };
    this.options = options;
  }
  /**
   * Destroys the Networking instance, transitioning it into the Closed state.
   */
  destroy() {
    this.state = {
      code: 6 /* Closed */
    };
  }
  /**
   * The current state of the networking instance.
   *
   * @remarks
   * The setter will perform clean-up operations where necessary.
   */
  get state() {
    return this._state;
  }
  set state(newState) {
    const oldWs = Reflect.get(this._state, "ws");
    const newWs = Reflect.get(newState, "ws");
    if (oldWs && oldWs !== newWs) {
      oldWs.off("debug", this.onWsDebug);
      oldWs.on("error", noop);
      oldWs.off("error", this.onChildError);
      oldWs.off("open", this.onWsOpen);
      oldWs.off("packet", this.onWsPacket);
      oldWs.off("binary", this.onWsBinary);
      oldWs.off("close", this.onWsClose);
      oldWs.destroy();
    }
    const oldUdp = Reflect.get(this._state, "udp");
    const newUdp = Reflect.get(newState, "udp");
    if (oldUdp && oldUdp !== newUdp) {
      oldUdp.on("error", noop);
      oldUdp.off("error", this.onChildError);
      oldUdp.off("close", this.onUdpClose);
      oldUdp.off("debug", this.onUdpDebug);
      oldUdp.destroy();
    }
    const oldDave = Reflect.get(this._state, "dave");
    const newDave = Reflect.get(newState, "dave");
    if (oldDave && oldDave !== newDave) {
      oldDave.off("error", this.onChildError);
      oldDave.off("debug", this.onDaveDebug);
      oldDave.off("keyPackage", this.onDaveKeyPackage);
      oldDave.off("invalidateTransition", this.onDaveInvalidateTransition);
      oldDave.destroy();
    }
    const oldState = this._state;
    this._state = newState;
    this.emit("stateChange", oldState, newState);
    this.debug?.(`state change:
from ${stringifyState2(oldState)}
to ${stringifyState2(newState)}`);
  }
  /**
   * Creates a new WebSocket to a Discord Voice gateway.
   *
   * @param endpoint - The endpoint to connect to
   * @param lastSequence - The last sequence to set for this WebSocket
   */
  createWebSocket(endpoint, lastSequence) {
    const ws = new VoiceWebSocket(`wss://${endpoint}?v=8`, Boolean(this.debug));
    if (lastSequence !== void 0) {
      ws.sequence = lastSequence;
    }
    ws.on("error", this.onChildError);
    ws.once("open", this.onWsOpen);
    ws.on("packet", this.onWsPacket);
    ws.on("binary", this.onWsBinary);
    ws.once("close", this.onWsClose);
    ws.on("debug", this.onWsDebug);
    return ws;
  }
  /**
   * Creates a new DAVE session for this voice connection if we can create one.
   *
   * @param protocolVersion - The protocol version to use
   */
  createDaveSession(protocolVersion) {
    if (getMaxProtocolVersion() === null || this.options.daveEncryption === false || this.state.code !== 3 /* SelectingProtocol */ && this.state.code !== 4 /* Ready */ && this.state.code !== 5 /* Resuming */) {
      return;
    }
    const session = new DAVESession(
      protocolVersion,
      this.state.connectionOptions.userId,
      this.state.connectionOptions.channelId,
      {
        decryptionFailureTolerance: this.options.decryptionFailureTolerance
      }
    );
    session.on("error", this.onChildError);
    session.on("debug", this.onDaveDebug);
    session.on("keyPackage", this.onDaveKeyPackage);
    session.on("invalidateTransition", this.onDaveInvalidateTransition);
    session.reinit();
    return session;
  }
  /**
   * Propagates errors from the children VoiceWebSocket, VoiceUDPSocket and DAVESession.
   *
   * @param error - The error that was emitted by a child
   */
  onChildError(error) {
    this.emit("error", error);
  }
  /**
   * Called when the WebSocket opens. Depending on the state that the instance is in,
   * it will either identify with a new session, or it will attempt to resume an existing session.
   */
  onWsOpen() {
    if (this.state.code === 0 /* OpeningWs */) {
      this.state.ws.sendPacket({
        op: VoiceOpcodes.Identify,
        d: {
          server_id: this.state.connectionOptions.serverId,
          user_id: this.state.connectionOptions.userId,
          session_id: this.state.connectionOptions.sessionId,
          token: this.state.connectionOptions.token,
          max_dave_protocol_version: this.options.daveEncryption === false ? 0 : getMaxProtocolVersion() ?? 0
        }
      });
      this.state = {
        ...this.state,
        code: 1 /* Identifying */
      };
    } else if (this.state.code === 5 /* Resuming */) {
      this.state.ws.sendPacket({
        op: VoiceOpcodes.Resume,
        d: {
          server_id: this.state.connectionOptions.serverId,
          session_id: this.state.connectionOptions.sessionId,
          token: this.state.connectionOptions.token,
          seq_ack: this.state.ws.sequence
        }
      });
    }
  }
  /**
   * Called when the WebSocket closes. Based on the reason for closing (given by the code parameter),
   * the instance will either attempt to resume, or enter the closed state and emit a 'close' event
   * with the close code, allowing the user to decide whether or not they would like to reconnect.
   *
   * @param code - The close code
   */
  onWsClose({ code }) {
    const canResume = code === 4015 || code < 4e3;
    if (canResume && this.state.code === 4 /* Ready */) {
      const lastSequence = this.state.ws.sequence;
      this.state = {
        ...this.state,
        code: 5 /* Resuming */,
        ws: this.createWebSocket(this.state.connectionOptions.endpoint, lastSequence)
      };
    } else if (this.state.code !== 6 /* Closed */) {
      this.destroy();
      this.emit("close", code);
    }
  }
  /**
   * Called when the UDP socket has closed itself if it has stopped receiving replies from Discord.
   */
  onUdpClose() {
    if (this.state.code === 4 /* Ready */) {
      const lastSequence = this.state.ws.sequence;
      this.state = {
        ...this.state,
        code: 5 /* Resuming */,
        ws: this.createWebSocket(this.state.connectionOptions.endpoint, lastSequence)
      };
    }
  }
  /**
   * Called when a packet is received on the connection's WebSocket.
   *
   * @param packet - The received packet
   */
  onWsPacket(packet) {
    if (packet.op === VoiceOpcodes.Hello && this.state.code !== 6 /* Closed */) {
      this.state.ws.setHeartbeatInterval(packet.d.heartbeat_interval);
    } else if (packet.op === VoiceOpcodes.Ready && this.state.code === 1 /* Identifying */) {
      const { ip, port, ssrc, modes } = packet.d;
      const udp = new VoiceUDPSocket({ ip, port });
      udp.on("error", this.onChildError);
      udp.on("debug", this.onUdpDebug);
      udp.once("close", this.onUdpClose);
      udp.performIPDiscovery(ssrc).then((localConfig) => {
        if (this.state.code !== 2 /* UdpHandshaking */) return;
        this.state.ws.sendPacket({
          op: VoiceOpcodes.SelectProtocol,
          d: {
            protocol: "udp",
            data: {
              address: localConfig.ip,
              port: localConfig.port,
              mode: chooseEncryptionMode(modes)
            }
          }
        });
        this.state = {
          ...this.state,
          code: 3 /* SelectingProtocol */
        };
      }).catch((error) => this.emit("error", error));
      this.state = {
        ...this.state,
        code: 2 /* UdpHandshaking */,
        udp,
        connectionData: {
          ssrc,
          connectedClients: /* @__PURE__ */ new Set()
        }
      };
    } else if (packet.op === VoiceOpcodes.SessionDescription && this.state.code === 3 /* SelectingProtocol */) {
      const { mode: encryptionMode, secret_key: secretKey, dave_protocol_version: daveProtocolVersion } = packet.d;
      this.state = {
        ...this.state,
        code: 4 /* Ready */,
        dave: this.createDaveSession(daveProtocolVersion),
        connectionData: {
          ...this.state.connectionData,
          encryptionMode,
          secretKey: new Uint8Array(secretKey),
          sequence: randomNBit(16),
          timestamp: randomNBit(32),
          nonce: 0,
          nonceBuffer: encryptionMode === "aead_aes256_gcm_rtpsize" ? Buffer$1.alloc(12) : Buffer$1.alloc(24),
          speaking: false,
          packetsPlayed: 0
        }
      };
    } else if (packet.op === VoiceOpcodes.Resumed && this.state.code === 5 /* Resuming */) {
      this.state = {
        ...this.state,
        code: 4 /* Ready */
      };
      this.state.connectionData.speaking = false;
    } else if ((packet.op === VoiceOpcodes.ClientsConnect || packet.op === VoiceOpcodes.ClientDisconnect) && (this.state.code === 4 /* Ready */ || this.state.code === 2 /* UdpHandshaking */ || this.state.code === 3 /* SelectingProtocol */ || this.state.code === 5 /* Resuming */)) {
      const { connectionData } = this.state;
      if (packet.op === VoiceOpcodes.ClientsConnect)
        for (const id of packet.d.user_ids) connectionData.connectedClients.add(id);
      else {
        connectionData.connectedClients.delete(packet.d.user_id);
      }
    } else if ((this.state.code === 4 /* Ready */ || this.state.code === 5 /* Resuming */) && this.state.dave) {
      if (packet.op === VoiceOpcodes.DavePrepareTransition) {
        const sendReady = this.state.dave.prepareTransition(packet.d);
        if (sendReady)
          this.state.ws.sendPacket({
            op: VoiceOpcodes.DaveTransitionReady,
            d: { transition_id: packet.d.transition_id }
          });
        if (packet.d.transition_id === 0) {
          this.emit("transitioned", 0);
        }
      } else if (packet.op === VoiceOpcodes.DaveExecuteTransition) {
        const transitioned = this.state.dave.executeTransition(packet.d.transition_id);
        if (transitioned) this.emit("transitioned", packet.d.transition_id);
      } else if (packet.op === VoiceOpcodes.DavePrepareEpoch) this.state.dave.prepareEpoch(packet.d);
    }
  }
  /**
   * Called when a binary message is received on the connection's WebSocket.
   *
   * @param message - The received message
   */
  onWsBinary(message) {
    if (this.state.code === 4 /* Ready */ && this.state.dave) {
      if (message.op === VoiceOpcodes.DaveMlsExternalSender) {
        this.state.dave.setExternalSender(message.payload);
      } else if (message.op === VoiceOpcodes.DaveMlsProposals) {
        const payload = this.state.dave.processProposals(message.payload, this.state.connectionData.connectedClients);
        if (payload) this.state.ws.sendBinaryMessage(VoiceOpcodes.DaveMlsCommitWelcome, payload);
      } else if (message.op === VoiceOpcodes.DaveMlsAnnounceCommitTransition) {
        const { transitionId, success } = this.state.dave.processCommit(message.payload);
        if (success) {
          if (transitionId === 0) this.emit("transitioned", transitionId);
          else
            this.state.ws.sendPacket({
              op: VoiceOpcodes.DaveTransitionReady,
              d: { transition_id: transitionId }
            });
        }
      } else if (message.op === VoiceOpcodes.DaveMlsWelcome) {
        const { transitionId, success } = this.state.dave.processWelcome(message.payload);
        if (success) {
          if (transitionId === 0) this.emit("transitioned", transitionId);
          else
            this.state.ws.sendPacket({
              op: VoiceOpcodes.DaveTransitionReady,
              d: { transition_id: transitionId }
            });
        }
      }
    }
  }
  /**
   * Called when a new key package is ready to be sent to the voice server.
   *
   * @param keyPackage - The new key package
   */
  onDaveKeyPackage(keyPackage) {
    if (this.state.code === 3 /* SelectingProtocol */ || this.state.code === 4 /* Ready */)
      this.state.ws.sendBinaryMessage(VoiceOpcodes.DaveMlsKeyPackage, keyPackage);
  }
  /**
   * Called when the DAVE session wants to invalidate their transition and re-initialize.
   *
   * @param transitionId - The transition to invalidate
   */
  onDaveInvalidateTransition(transitionId) {
    if (this.state.code === 3 /* SelectingProtocol */ || this.state.code === 4 /* Ready */)
      this.state.ws.sendPacket({
        op: VoiceOpcodes.DaveMlsInvalidCommitWelcome,
        d: { transition_id: transitionId }
      });
  }
  /**
   * Propagates debug messages from the child WebSocket.
   *
   * @param message - The emitted debug message
   */
  onWsDebug(message) {
    this.debug?.(`[WS] ${message}`);
  }
  /**
   * Propagates debug messages from the child UDPSocket.
   *
   * @param message - The emitted debug message
   */
  onUdpDebug(message) {
    this.debug?.(`[UDP] ${message}`);
  }
  /**
   * Propagates debug messages from the child DAVESession.
   *
   * @param message - The emitted debug message
   */
  onDaveDebug(message) {
    this.debug?.(`[DAVE] ${message}`);
  }
  /**
   * Prepares an Opus packet for playback. This includes attaching metadata to it and encrypting it.
   * It will be stored within the instance, and can be played by dispatchAudio()
   *
   * @remarks
   * Calling this method while there is already a prepared audio packet that has not yet been dispatched
   * will overwrite the existing audio packet. This should be avoided.
   * @param opusPacket - The Opus packet to encrypt
   * @returns The audio packet that was prepared
   */
  prepareAudioPacket(opusPacket) {
    const state = this.state;
    if (state.code !== 4 /* Ready */) return;
    state.preparedPacket = this.createAudioPacket(opusPacket, state.connectionData, state.dave);
    return state.preparedPacket;
  }
  /**
   * Dispatches the audio packet previously prepared by prepareAudioPacket(opusPacket). The audio packet
   * is consumed and cannot be dispatched again.
   */
  dispatchAudio() {
    const state = this.state;
    if (state.code !== 4 /* Ready */) return false;
    if (state.preparedPacket !== void 0) {
      this.playAudioPacket(state.preparedPacket);
      state.preparedPacket = void 0;
      return true;
    }
    return false;
  }
  /**
   * Plays an audio packet, updating timing metadata used for playback.
   *
   * @param audioPacket - The audio packet to play
   */
  playAudioPacket(audioPacket) {
    const state = this.state;
    if (state.code !== 4 /* Ready */) return;
    const { connectionData } = state;
    connectionData.packetsPlayed++;
    connectionData.sequence++;
    connectionData.timestamp += TIMESTAMP_INC;
    if (connectionData.sequence >= 2 ** 16) connectionData.sequence = 0;
    if (connectionData.timestamp >= 2 ** 32) connectionData.timestamp = 0;
    this.setSpeaking(true);
    state.udp.send(audioPacket);
  }
  /**
   * Sends a packet to the voice gateway indicating that the client has start/stopped sending
   * audio.
   *
   * @param speaking - Whether or not the client should be shown as speaking
   */
  setSpeaking(speaking) {
    const state = this.state;
    if (state.code !== 4 /* Ready */) return;
    if (state.connectionData.speaking === speaking) return;
    state.connectionData.speaking = speaking;
    state.ws.sendPacket({
      op: VoiceOpcodes.Speaking,
      d: {
        speaking: speaking ? 1 : 0,
        delay: 0,
        ssrc: state.connectionData.ssrc
      }
    });
  }
  /**
   * Creates a new audio packet from an Opus packet. This involves encrypting the packet,
   * then prepending a header that includes metadata.
   *
   * @param opusPacket - The Opus packet to prepare
   * @param connectionData - The current connection data of the instance
   * @param daveSession - The DAVE session to use for encryption
   */
  createAudioPacket(opusPacket, connectionData, daveSession) {
    const rtpHeader = Buffer$1.alloc(12);
    rtpHeader[0] = 128;
    rtpHeader[1] = 120;
    const { sequence, timestamp, ssrc } = connectionData;
    rtpHeader.writeUIntBE(sequence, 2, 2);
    rtpHeader.writeUIntBE(timestamp, 4, 4);
    rtpHeader.writeUIntBE(ssrc, 8, 4);
    rtpHeader.copy(nonce, 0, 0, 12);
    return Buffer$1.concat([rtpHeader, ...this.encryptOpusPacket(opusPacket, connectionData, rtpHeader, daveSession)]);
  }
  /**
   * Encrypts an Opus packet using the format agreed upon by the instance and Discord.
   *
   * @param opusPacket - The Opus packet to encrypt
   * @param connectionData - The current connection data of the instance
   * @param daveSession - The DAVE session to use for encryption
   */
  encryptOpusPacket(opusPacket, connectionData, additionalData, daveSession) {
    const { secretKey, encryptionMode } = connectionData;
    const packet = daveSession?.encrypt(opusPacket) ?? opusPacket;
    connectionData.nonce++;
    if (connectionData.nonce > MAX_NONCE_SIZE) connectionData.nonce = 0;
    connectionData.nonceBuffer.writeUInt32BE(connectionData.nonce, 0);
    const noncePadding = connectionData.nonceBuffer.subarray(0, 4);
    let encrypted;
    switch (encryptionMode) {
      case "aead_aes256_gcm_rtpsize": {
        const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, connectionData.nonceBuffer);
        cipher.setAAD(additionalData);
        encrypted = Buffer$1.concat([cipher.update(packet), cipher.final(), cipher.getAuthTag()]);
        return [encrypted, noncePadding];
      }
      case "aead_xchacha20_poly1305_rtpsize": {
        encrypted = methods.crypto_aead_xchacha20poly1305_ietf_encrypt(
          packet,
          additionalData,
          connectionData.nonceBuffer,
          secretKey
        );
        return [encrypted, noncePadding];
      }
      default: {
        throw new RangeError(`Unsupported encryption method: ${encryptionMode}`);
      }
    }
  }
};
function createDefaultAudioReceiveStreamOptions() {
  return {
    end: {
      behavior: 0 /* Manual */
    }
  };
}
__name(createDefaultAudioReceiveStreamOptions, "createDefaultAudioReceiveStreamOptions");
var AudioReceiveStream = class extends Readable {
  static {
    __name(this, "AudioReceiveStream");
  }
  /**
   * The end behavior of the receive stream.
   */
  end;
  endTimeout;
  constructor(options) {
    const { end, ...rest } = options;
    super({
      ...rest,
      objectMode: true
    });
    this.end = end;
  }
  push(buffer) {
    if (buffer && (this.end.behavior === 2 /* AfterInactivity */ || this.end.behavior === 1 /* AfterSilence */ && (buffer.compare(SILENCE_FRAME) !== 0 || this.endTimeout === void 0))) {
      this.renewEndTimeout(this.end);
    }
    if (buffer === null) {
      nextTick(() => this.destroy());
    }
    return super.push(buffer);
  }
  renewEndTimeout(end) {
    if (this.endTimeout) {
      clearTimeout(this.endTimeout);
    }
    this.endTimeout = setTimeout(() => this.push(null), end.duration);
  }
  _read() {
  }
};
var SSRCMap = class extends EventEmitter {
  static {
    __name(this, "SSRCMap");
  }
  /**
   * The underlying map.
   */
  map;
  constructor() {
    super();
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * Updates the map with new user data
   *
   * @param data - The data to update with
   */
  update(data) {
    const existing = this.map.get(data.audioSSRC);
    const newValue = {
      ...this.map.get(data.audioSSRC),
      ...data
    };
    this.map.set(data.audioSSRC, newValue);
    if (!existing) this.emit("create", newValue);
    this.emit("update", existing, newValue);
  }
  /**
   * Gets the stored voice data of a user.
   *
   * @param target - The target, either their user id or audio SSRC
   */
  get(target) {
    if (typeof target === "number") {
      return this.map.get(target);
    }
    for (const data of this.map.values()) {
      if (data.userId === target) {
        return data;
      }
    }
    return void 0;
  }
  /**
   * Deletes the stored voice data about a user.
   *
   * @param target - The target of the delete operation, either their audio SSRC or user id
   * @returns The data that was deleted, if any
   */
  delete(target) {
    if (typeof target === "number") {
      const existing = this.map.get(target);
      if (existing) {
        this.map.delete(target);
        this.emit("delete", existing);
      }
      return existing;
    }
    for (const [audioSSRC, data] of this.map.entries()) {
      if (data.userId === target) {
        this.map.delete(audioSSRC);
        this.emit("delete", data);
        return data;
      }
    }
    return void 0;
  }
};
var SpeakingMap = class _SpeakingMap extends EventEmitter {
  static {
    __name(this, "SpeakingMap");
  }
  /**
   * The delay after a packet is received from a user until they're marked as not speaking anymore.
   */
  static DELAY = 100;
  /**
   * The currently speaking users, mapped to the milliseconds since UNIX epoch at which they started speaking.
   */
  users;
  speakingTimeouts;
  constructor() {
    super();
    this.users = /* @__PURE__ */ new Map();
    this.speakingTimeouts = /* @__PURE__ */ new Map();
  }
  onPacket(userId) {
    const timeout = this.speakingTimeouts.get(userId);
    if (timeout) {
      clearTimeout(timeout);
    } else {
      this.users.set(userId, Date.now());
      this.emit("start", userId);
    }
    this.startTimeout(userId);
  }
  startTimeout(userId) {
    this.speakingTimeouts.set(
      userId,
      setTimeout(() => {
        this.emit("end", userId);
        this.speakingTimeouts.delete(userId);
        this.users.delete(userId);
      }, _SpeakingMap.DELAY)
    );
  }
};

// src/receive/VoiceReceiver.ts
var HEADER_EXTENSION_BYTE = Buffer$1.from([190, 222]);
var UNPADDED_NONCE_LENGTH = 4;
var AUTH_TAG_LENGTH = 16;
var VoiceReceiver = class {
  static {
    __name(this, "VoiceReceiver");
  }
  /**
   * The attached connection of this receiver.
   */
  voiceConnection;
  /**
   * Maps SSRCs to Discord user ids.
   */
  ssrcMap;
  /**
   * The current audio subscriptions of this receiver.
   */
  subscriptions;
  /**
   * The connection data of the receiver.
   *
   * @internal
   */
  connectionData;
  /**
   * The speaking map of the receiver.
   */
  speaking;
  constructor(voiceConnection) {
    this.voiceConnection = voiceConnection;
    this.ssrcMap = new SSRCMap();
    this.speaking = new SpeakingMap();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.connectionData = {};
    this.onWsPacket = this.onWsPacket.bind(this);
    this.onUdpMessage = this.onUdpMessage.bind(this);
  }
  /**
   * Called when a packet is received on the attached connection's WebSocket.
   *
   * @param packet - The received packet
   * @internal
   */
  onWsPacket(packet) {
    if (packet.op === VoiceOpcodes.ClientDisconnect) {
      this.ssrcMap.delete(packet.d.user_id);
    } else if (packet.op === VoiceOpcodes.Speaking) {
      this.ssrcMap.update({ userId: packet.d.user_id, audioSSRC: packet.d.ssrc });
    }
  }
  decrypt(buffer, mode, nonce2, secretKey) {
    buffer.copy(nonce2, 0, buffer.length - UNPADDED_NONCE_LENGTH);
    let headerSize = 12;
    const first = buffer.readUint8();
    if (first >> 4 & 1) headerSize += 4;
    const header = buffer.subarray(0, headerSize);
    const encrypted = buffer.subarray(headerSize, buffer.length - AUTH_TAG_LENGTH - UNPADDED_NONCE_LENGTH);
    const authTag = buffer.subarray(
      buffer.length - AUTH_TAG_LENGTH - UNPADDED_NONCE_LENGTH,
      buffer.length - UNPADDED_NONCE_LENGTH
    );
    switch (mode) {
      case "aead_aes256_gcm_rtpsize": {
        const decipheriv = crypto.createDecipheriv("aes-256-gcm", secretKey, nonce2);
        decipheriv.setAAD(header);
        decipheriv.setAuthTag(authTag);
        return Buffer$1.concat([decipheriv.update(encrypted), decipheriv.final()]);
      }
      case "aead_xchacha20_poly1305_rtpsize": {
        return Buffer$1.from(
          methods.crypto_aead_xchacha20poly1305_ietf_decrypt(
            Buffer$1.concat([encrypted, authTag]),
            header,
            nonce2,
            secretKey
          )
        );
      }
      default: {
        throw new RangeError(`Unsupported decryption method: ${mode}`);
      }
    }
  }
  /**
   * Parses an audio packet, decrypting it to yield an Opus packet.
   *
   * @param buffer - The buffer to parse
   * @param mode - The encryption mode
   * @param nonce - The nonce buffer used by the connection for encryption
   * @param secretKey - The secret key used by the connection for encryption
   * @param userId - The user id that sent the packet
   * @returns The parsed Opus packet
   */
  parsePacket(buffer, mode, nonce2, secretKey, userId) {
    let packet = this.decrypt(buffer, mode, nonce2, secretKey);
    if (!packet) throw new Error("Failed to parse packet");
    if (buffer.subarray(12, 14).compare(HEADER_EXTENSION_BYTE) === 0) {
      const headerExtensionLength = buffer.subarray(14).readUInt16BE();
      packet = packet.subarray(4 * headerExtensionLength);
    }
    if (this.voiceConnection.state.status === "ready" /* Ready */ && (this.voiceConnection.state.networking.state.code === 4 /* Ready */ || this.voiceConnection.state.networking.state.code === 5 /* Resuming */)) {
      const daveSession = this.voiceConnection.state.networking.state.dave;
      if (daveSession) packet = daveSession.decrypt(packet, userId);
    }
    return packet;
  }
  /**
   * Called when the UDP socket of the attached connection receives a message.
   *
   * @param msg - The received message
   * @internal
   */
  onUdpMessage(msg) {
    if (msg.length <= 8) return;
    const ssrc = msg.readUInt32BE(8);
    const userData = this.ssrcMap.get(ssrc);
    if (!userData) return;
    this.speaking.onPacket(userData.userId);
    const stream = this.subscriptions.get(userData.userId);
    if (!stream) return;
    if (this.connectionData.encryptionMode && this.connectionData.nonceBuffer && this.connectionData.secretKey) {
      try {
        const packet = this.parsePacket(
          msg,
          this.connectionData.encryptionMode,
          this.connectionData.nonceBuffer,
          this.connectionData.secretKey,
          userData.userId
        );
        if (packet) stream.push(packet);
      } catch (error) {
        stream.destroy(error);
      }
    }
  }
  /**
   * Creates a subscription for the given user id.
   *
   * @param target - The id of the user to subscribe to
   * @returns A readable stream of Opus packets received from the target
   */
  subscribe(userId, options) {
    const existing = this.subscriptions.get(userId);
    if (existing) return existing;
    const stream = new AudioReceiveStream({
      ...createDefaultAudioReceiveStreamOptions(),
      ...options
    });
    stream.once("close", () => this.subscriptions.delete(userId));
    this.subscriptions.set(userId, stream);
    return stream;
  }
};
var VoiceConnection = class extends EventEmitter {
  static {
    __name(this, "VoiceConnection");
  }
  /**
   * The number of consecutive rejoin attempts. Initially 0, and increments for each rejoin.
   * When a connection is successfully established, it resets to 0.
   */
  rejoinAttempts;
  /**
   * The state of the voice connection.
   */
  _state;
  /**
   * A configuration storing all the data needed to reconnect to a Guild's voice server.
   *
   * @internal
   */
  joinConfig;
  /**
   * The two packets needed to successfully establish a voice connection. They are received
   * from the main Discord gateway after signalling to change the voice state.
   */
  packets;
  /**
   * The receiver of this voice connection. You should join the voice channel with `selfDeaf` set
   * to false for this feature to work properly.
   */
  receiver;
  /**
   * The debug logger function, if debugging is enabled.
   */
  debug;
  /**
   * The options used to create this voice connection.
   */
  options;
  /**
   * Creates a new voice connection.
   *
   * @param joinConfig - The data required to establish the voice connection
   * @param options - The options used to create this voice connection
   */
  constructor(joinConfig, options) {
    super();
    this.debug = options.debug ? (message) => this.emit("debug", message) : null;
    this.rejoinAttempts = 0;
    this.receiver = new VoiceReceiver(this);
    this.onNetworkingClose = this.onNetworkingClose.bind(this);
    this.onNetworkingStateChange = this.onNetworkingStateChange.bind(this);
    this.onNetworkingError = this.onNetworkingError.bind(this);
    this.onNetworkingDebug = this.onNetworkingDebug.bind(this);
    this.onNetworkingTransitioned = this.onNetworkingTransitioned.bind(this);
    const adapter = options.adapterCreator({
      onVoiceServerUpdate: /* @__PURE__ */ __name((data) => this.addServerPacket(data), "onVoiceServerUpdate"),
      onVoiceStateUpdate: /* @__PURE__ */ __name((data) => this.addStatePacket(data), "onVoiceStateUpdate"),
      destroy: /* @__PURE__ */ __name(() => this.destroy(false), "destroy")
    });
    this._state = { status: "signalling" /* Signalling */, adapter };
    this.packets = {
      server: void 0,
      state: void 0
    };
    this.joinConfig = joinConfig;
    this.options = options;
  }
  /**
   * The current state of the voice connection.
   *
   * @remarks
   * The setter will perform clean-up operations where necessary.
   */
  get state() {
    return this._state;
  }
  set state(newState) {
    const oldState = this._state;
    const oldNetworking = Reflect.get(oldState, "networking");
    const newNetworking = Reflect.get(newState, "networking");
    const oldSubscription = Reflect.get(oldState, "subscription");
    const newSubscription = Reflect.get(newState, "subscription");
    if (oldNetworking !== newNetworking) {
      if (oldNetworking) {
        oldNetworking.on("error", noop);
        oldNetworking.off("debug", this.onNetworkingDebug);
        oldNetworking.off("error", this.onNetworkingError);
        oldNetworking.off("close", this.onNetworkingClose);
        oldNetworking.off("stateChange", this.onNetworkingStateChange);
        oldNetworking.off("transitioned", this.onNetworkingTransitioned);
        oldNetworking.destroy();
      }
      if (newNetworking) this.updateReceiveBindings(newNetworking.state, oldNetworking?.state);
    }
    if (newState.status === "ready" /* Ready */) {
      this.rejoinAttempts = 0;
    } else if (newState.status === "destroyed" /* Destroyed */) {
      for (const stream of this.receiver.subscriptions.values()) {
        if (!stream.destroyed) stream.destroy();
      }
    }
    if (oldState.status !== "destroyed" /* Destroyed */ && newState.status === "destroyed" /* Destroyed */) {
      oldState.adapter.destroy();
    }
    this._state = newState;
    if (oldSubscription && oldSubscription !== newSubscription) {
      oldSubscription.unsubscribe();
    }
    this.emit("stateChange", oldState, newState);
    if (oldState.status !== newState.status) {
      this.emit(newState.status, oldState, newState);
    }
  }
  /**
   * Registers a `VOICE_SERVER_UPDATE` packet to the voice connection. This will cause it to reconnect using the
   * new data provided in the packet.
   *
   * @param packet - The received `VOICE_SERVER_UPDATE` packet
   */
  addServerPacket(packet) {
    this.packets.server = packet;
    if (packet.endpoint) {
      this.configureNetworking();
    } else if (this.state.status !== "destroyed" /* Destroyed */) {
      this.state = {
        ...this.state,
        status: "disconnected" /* Disconnected */,
        reason: 2 /* EndpointRemoved */
      };
    }
  }
  /**
   * Registers a `VOICE_STATE_UPDATE` packet to the voice connection. Most importantly, it stores the id of the
   * channel that the client is connected to.
   *
   * @param packet - The received `VOICE_STATE_UPDATE` packet
   */
  addStatePacket(packet) {
    this.packets.state = packet;
    if (packet.self_deaf !== void 0) this.joinConfig.selfDeaf = packet.self_deaf;
    if (packet.self_mute !== void 0) this.joinConfig.selfMute = packet.self_mute;
    if (packet.channel_id) this.joinConfig.channelId = packet.channel_id;
  }
  /**
   * Called when the networking state changes, and the new ws/udp packet/message handlers need to be rebound
   * to the new instances.
   *
   * @param newState - The new networking state
   * @param oldState - The old networking state, if there is one
   */
  updateReceiveBindings(newState, oldState) {
    const oldWs = Reflect.get(oldState ?? {}, "ws");
    const newWs = Reflect.get(newState, "ws");
    const oldUdp = Reflect.get(oldState ?? {}, "udp");
    const newUdp = Reflect.get(newState, "udp");
    if (oldWs !== newWs) {
      oldWs?.off("packet", this.receiver.onWsPacket);
      newWs?.on("packet", this.receiver.onWsPacket);
    }
    if (oldUdp !== newUdp) {
      oldUdp?.off("message", this.receiver.onUdpMessage);
      newUdp?.on("message", this.receiver.onUdpMessage);
    }
    this.receiver.connectionData = Reflect.get(newState, "connectionData") ?? {};
  }
  /**
   * Attempts to configure a networking instance for this voice connection using the received packets.
   * Both packets are required, and any existing networking instance will be destroyed.
   *
   * @remarks
   * This is called when the voice server of the connection changes, e.g. if the bot is moved into a
   * different channel in the same guild but has a different voice server. In this instance, the connection
   * needs to be re-established to the new voice server.
   *
   * The connection will transition to the Connecting state when this is called.
   */
  configureNetworking() {
    const { server, state } = this.packets;
    if (!server || !state || this.state.status === "destroyed" /* Destroyed */ || !server.endpoint) return;
    const networking = new Networking(
      {
        endpoint: server.endpoint,
        serverId: server.guild_id,
        token: server.token,
        sessionId: state.session_id,
        userId: state.user_id,
        channelId: state.channel_id
      },
      {
        debug: Boolean(this.debug),
        daveEncryption: this.options.daveEncryption ?? true,
        decryptionFailureTolerance: this.options.decryptionFailureTolerance
      }
    );
    networking.once("close", this.onNetworkingClose);
    networking.on("stateChange", this.onNetworkingStateChange);
    networking.on("error", this.onNetworkingError);
    networking.on("debug", this.onNetworkingDebug);
    networking.on("transitioned", this.onNetworkingTransitioned);
    this.state = {
      ...this.state,
      status: "connecting" /* Connecting */,
      networking
    };
  }
  /**
   * Called when the networking instance for this connection closes. If the close code is 4014 (do not reconnect),
   * the voice connection will transition to the Disconnected state which will store the close code. You can
   * decide whether or not to reconnect when this occurs by listening for the state change and calling reconnect().
   *
   * @remarks
   * If the close code was anything other than 4014, it is likely that the closing was not intended, and so the
   * VoiceConnection will signal to Discord that it would like to rejoin the channel. This automatically attempts
   * to re-establish the connection. This would be seen as a transition from the Ready state to the Signalling state.
   * @param code - The close code
   */
  onNetworkingClose(code) {
    if (this.state.status === "destroyed" /* Destroyed */) return;
    if (code === 4014) {
      this.state = {
        ...this.state,
        status: "disconnected" /* Disconnected */,
        reason: 0 /* WebSocketClose */,
        closeCode: code
      };
    } else {
      this.state = {
        ...this.state,
        status: "signalling" /* Signalling */
      };
      this.rejoinAttempts++;
      if (!this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
        this.state = {
          ...this.state,
          status: "disconnected" /* Disconnected */,
          reason: 1 /* AdapterUnavailable */
        };
      }
    }
  }
  /**
   * Called when the state of the networking instance changes. This is used to derive the state of the voice connection.
   *
   * @param oldState - The previous state
   * @param newState - The new state
   */
  onNetworkingStateChange(oldState, newState) {
    this.updateReceiveBindings(newState, oldState);
    if (oldState.code === newState.code) return;
    if (this.state.status !== "connecting" /* Connecting */ && this.state.status !== "ready" /* Ready */)
      return;
    if (newState.code === 4 /* Ready */) {
      this.state = {
        ...this.state,
        status: "ready" /* Ready */
      };
    } else if (newState.code !== 6 /* Closed */) {
      this.state = {
        ...this.state,
        status: "connecting" /* Connecting */
      };
    }
  }
  /**
   * Propagates errors from the underlying network instance.
   *
   * @param error - The error to propagate
   */
  onNetworkingError(error) {
    this.emit("error", error);
  }
  /**
   * Propagates debug messages from the underlying network instance.
   *
   * @param message - The debug message to propagate
   */
  onNetworkingDebug(message) {
    this.debug?.(`[NW] ${message}`);
  }
  /**
   * Propagates transitions from the underlying network instance.
   *
   * @param transitionId - The transition id
   */
  onNetworkingTransitioned(transitionId) {
    this.emit("transitioned", transitionId);
  }
  /**
   * Prepares an audio packet for dispatch.
   *
   * @param buffer - The Opus packet to prepare
   */
  prepareAudioPacket(buffer) {
    const state = this.state;
    if (state.status !== "ready" /* Ready */) return;
    return state.networking.prepareAudioPacket(buffer);
  }
  /**
   * Dispatches the previously prepared audio packet (if any)
   */
  dispatchAudio() {
    const state = this.state;
    if (state.status !== "ready" /* Ready */) return;
    return state.networking.dispatchAudio();
  }
  /**
   * Prepares an audio packet and dispatches it immediately.
   *
   * @param buffer - The Opus packet to play
   */
  playOpusPacket(buffer) {
    const state = this.state;
    if (state.status !== "ready" /* Ready */) return;
    state.networking.prepareAudioPacket(buffer);
    return state.networking.dispatchAudio();
  }
  /**
   * Destroys the VoiceConnection, preventing it from connecting to voice again.
   * This method should be called when you no longer require the VoiceConnection to
   * prevent memory leaks.
   *
   * @param adapterAvailable - Whether the adapter can be used
   */
  destroy(adapterAvailable = true) {
    if (this.state.status === "destroyed" /* Destroyed */) {
      throw new Error("Cannot destroy VoiceConnection - it has already been destroyed");
    }
    if (getVoiceConnection(this.joinConfig.guildId, this.joinConfig.group) === this) {
      untrackVoiceConnection(this);
    }
    if (adapterAvailable) {
      this.state.adapter.sendPayload(createJoinVoiceChannelPayload({ ...this.joinConfig, channelId: null }));
    }
    this.state = {
      status: "destroyed" /* Destroyed */
    };
  }
  /**
   * Disconnects the VoiceConnection, allowing the possibility of rejoining later on.
   *
   * @returns `true` if the connection was successfully disconnected
   */
  disconnect() {
    if (this.state.status === "destroyed" /* Destroyed */ || this.state.status === "signalling" /* Signalling */) {
      return false;
    }
    this.joinConfig.channelId = null;
    if (!this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
      this.state = {
        adapter: this.state.adapter,
        subscription: this.state.subscription,
        status: "disconnected" /* Disconnected */,
        reason: 1 /* AdapterUnavailable */
      };
      return false;
    }
    this.state = {
      adapter: this.state.adapter,
      reason: 3 /* Manual */,
      status: "disconnected" /* Disconnected */
    };
    return true;
  }
  /**
   * Attempts to rejoin (better explanation soon:tm:)
   *
   * @remarks
   * Calling this method successfully will automatically increment the `rejoinAttempts` counter,
   * which you can use to inform whether or not you'd like to keep attempting to reconnect your
   * voice connection.
   *
   * A state transition from Disconnected to Signalling will be observed when this is called.
   */
  rejoin(joinConfig) {
    if (this.state.status === "destroyed" /* Destroyed */) {
      return false;
    }
    const notReady = this.state.status !== "ready" /* Ready */;
    if (notReady) this.rejoinAttempts++;
    Object.assign(this.joinConfig, joinConfig);
    if (this.state.adapter.sendPayload(createJoinVoiceChannelPayload(this.joinConfig))) {
      if (notReady) {
        this.state = {
          ...this.state,
          status: "signalling" /* Signalling */
        };
      }
      return true;
    }
    this.state = {
      adapter: this.state.adapter,
      subscription: this.state.subscription,
      status: "disconnected" /* Disconnected */,
      reason: 1 /* AdapterUnavailable */
    };
    return false;
  }
  /**
   * Updates the speaking status of the voice connection. This is used when audio players are done playing audio,
   * and need to signal that the connection is no longer playing audio.
   *
   * @param enabled - Whether or not to show as speaking
   */
  setSpeaking(enabled) {
    if (this.state.status !== "ready" /* Ready */) return false;
    return this.state.networking.setSpeaking(enabled);
  }
  /**
   * Subscribes to an audio player, allowing the player to play audio on this voice connection.
   *
   * @param player - The audio player to subscribe to
   * @returns The created subscription
   */
  subscribe(player) {
    if (this.state.status === "destroyed" /* Destroyed */) return;
    const subscription = player["subscribe"](this);
    this.state = {
      ...this.state,
      subscription
    };
    return subscription;
  }
  /**
   * The latest ping (in milliseconds) for the WebSocket connection and audio playback for this voice
   * connection, if this data is available.
   *
   * @remarks
   * For this data to be available, the VoiceConnection must be in the Ready state, and its underlying
   * WebSocket connection and UDP socket must have had at least one ping-pong exchange.
   */
  get ping() {
    if (this.state.status === "ready" /* Ready */ && this.state.networking.state.code === 4 /* Ready */) {
      return {
        ws: this.state.networking.state.ws.ping,
        udp: this.state.networking.state.udp.ping
      };
    }
    return {
      ws: void 0,
      udp: void 0
    };
  }
  /**
   * The current voice privacy code of the encrypted session.
   *
   * @remarks
   * For this data to be available, the VoiceConnection must be in the Ready state,
   * and the connection would have to be end-to-end encrypted.
   */
  get voicePrivacyCode() {
    if (this.state.status === "ready" /* Ready */ && this.state.networking.state.code === 4 /* Ready */) {
      return this.state.networking.state.dave?.voicePrivacyCode ?? void 0;
    }
    return void 0;
  }
  /**
   * Gets the verification code for a user in the session.
   *
   * @throws Will throw if end-to-end encryption is not on or if the user id provided is not in the session.
   */
  async getVerificationCode(userId) {
    if (this.state.status === "ready" /* Ready */ && this.state.networking.state.code === 4 /* Ready */ && this.state.networking.state.dave) {
      return this.state.networking.state.dave.getVerificationCode(userId);
    }
    throw new Error("Session not available");
  }
  /**
   * Called when a subscription of this voice connection to an audio player is removed.
   *
   * @param subscription - The removed subscription
   */
  onSubscriptionRemoved(subscription) {
    if (this.state.status !== "destroyed" /* Destroyed */ && this.state.subscription === subscription) {
      this.state = {
        ...this.state,
        subscription: void 0
      };
    }
  }
};
function createVoiceConnection(joinConfig, options) {
  const payload = createJoinVoiceChannelPayload(joinConfig);
  const existing = getVoiceConnection(joinConfig.guildId, joinConfig.group);
  if (existing && existing.state.status !== "destroyed" /* Destroyed */) {
    if (existing.state.status === "disconnected" /* Disconnected */) {
      existing.rejoin({
        channelId: joinConfig.channelId,
        selfDeaf: joinConfig.selfDeaf,
        selfMute: joinConfig.selfMute
      });
    } else if (!existing.state.adapter.sendPayload(payload)) {
      existing.state = {
        ...existing.state,
        status: "disconnected" /* Disconnected */,
        reason: 1 /* AdapterUnavailable */
      };
    }
    return existing;
  }
  const voiceConnection = new VoiceConnection(joinConfig, options);
  trackVoiceConnection(voiceConnection);
  if (voiceConnection.state.status !== "destroyed" /* Destroyed */ && !voiceConnection.state.adapter.sendPayload(payload)) {
    voiceConnection.state = {
      ...voiceConnection.state,
      status: "disconnected" /* Disconnected */,
      reason: 1 /* AdapterUnavailable */
    };
  }
  return voiceConnection;
}
__name(createVoiceConnection, "createVoiceConnection");

// src/joinVoiceChannel.ts
function joinVoiceChannel(options) {
  const joinConfig = {
    selfDeaf: true,
    selfMute: false,
    group: "default",
    ...options
  };
  return createVoiceConnection(joinConfig, {
    adapterCreator: options.adapterCreator,
    debug: options.debug,
    daveEncryption: options.daveEncryption,
    decryptionFailureTolerance: options.decryptionFailureTolerance
  });
}
__name(joinVoiceChannel, "joinVoiceChannel");
var FFMPEG_PCM_ARGUMENTS = ["-analyzeduration", "0", "-loglevel", "0", "-f", "s16le", "-ar", "48000", "-ac", "2"];
var FFMPEG_OPUS_ARGUMENTS = [
  "-analyzeduration",
  "0",
  "-loglevel",
  "0",
  "-acodec",
  "libopus",
  "-f",
  "opus",
  "-ar",
  "48000",
  "-ac",
  "2"
];
var StreamType = /* @__PURE__ */ ((StreamType2) => {
  StreamType2["Arbitrary"] = "arbitrary";
  StreamType2["OggOpus"] = "ogg/opus";
  StreamType2["Opus"] = "opus";
  StreamType2["Raw"] = "raw";
  StreamType2["WebmOpus"] = "webm/opus";
  return StreamType2;
})(StreamType || {});
var Node = class {
  static {
    __name(this, "Node");
  }
  /**
   * The outbound edges from this node.
   */
  edges = [];
  /**
   * The type of stream for this node.
   */
  type;
  constructor(type) {
    this.type = type;
  }
  /**
   * Creates an outbound edge from this node.
   *
   * @param edge - The edge to create
   */
  addEdge(edge) {
    this.edges.push({ ...edge, from: this });
  }
};
var NODES = null;
function getNode(type) {
  const node = (NODES ??= initializeNodes()).get(type);
  if (!node) throw new Error(`Node type '${type}' does not exist!`);
  return node;
}
__name(getNode, "getNode");
function canEnableFFmpegOptimizations() {
  try {
    return prism4.FFmpeg.getInfo().output.includes("--enable-libopus");
  } catch {
  }
  return false;
}
__name(canEnableFFmpegOptimizations, "canEnableFFmpegOptimizations");
function initializeNodes() {
  const nodes = /* @__PURE__ */ new Map();
  for (const streamType of Object.values(StreamType)) {
    nodes.set(streamType, new Node(streamType));
  }
  nodes.get("raw" /* Raw */).addEdge({
    type: "opus encoder" /* OpusEncoder */,
    to: nodes.get("opus" /* Opus */),
    cost: 1.5,
    transformer: /* @__PURE__ */ __name(() => new prism4.opus.Encoder({ rate: 48e3, channels: 2, frameSize: 960 }), "transformer")
  });
  nodes.get("opus" /* Opus */).addEdge({
    type: "opus decoder" /* OpusDecoder */,
    to: nodes.get("raw" /* Raw */),
    cost: 1.5,
    transformer: /* @__PURE__ */ __name(() => new prism4.opus.Decoder({ rate: 48e3, channels: 2, frameSize: 960 }), "transformer")
  });
  nodes.get("ogg/opus" /* OggOpus */).addEdge({
    type: "ogg/opus demuxer" /* OggOpusDemuxer */,
    to: nodes.get("opus" /* Opus */),
    cost: 1,
    transformer: /* @__PURE__ */ __name(() => new prism4.opus.OggDemuxer(), "transformer")
  });
  nodes.get("webm/opus" /* WebmOpus */).addEdge({
    type: "webm/opus demuxer" /* WebmOpusDemuxer */,
    to: nodes.get("opus" /* Opus */),
    cost: 1,
    transformer: /* @__PURE__ */ __name(() => new prism4.opus.WebmDemuxer(), "transformer")
  });
  const FFMPEG_PCM_EDGE = {
    type: "ffmpeg pcm" /* FFmpegPCM */,
    to: nodes.get("raw" /* Raw */),
    cost: 2,
    transformer: /* @__PURE__ */ __name((input) => new prism4.FFmpeg({
      args: ["-i", typeof input === "string" ? input : "-", ...FFMPEG_PCM_ARGUMENTS]
    }), "transformer")
  };
  nodes.get("arbitrary" /* Arbitrary */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("ogg/opus" /* OggOpus */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("webm/opus" /* WebmOpus */).addEdge(FFMPEG_PCM_EDGE);
  nodes.get("raw" /* Raw */).addEdge({
    type: "volume transformer" /* InlineVolume */,
    to: nodes.get("raw" /* Raw */),
    cost: 0.5,
    transformer: /* @__PURE__ */ __name(() => new prism4.VolumeTransformer({ type: "s16le" }), "transformer")
  });
  if (canEnableFFmpegOptimizations()) {
    const FFMPEG_OGG_EDGE = {
      type: "ffmpeg ogg" /* FFmpegOgg */,
      to: nodes.get("ogg/opus" /* OggOpus */),
      cost: 2,
      transformer: /* @__PURE__ */ __name((input) => new prism4.FFmpeg({
        args: ["-i", typeof input === "string" ? input : "-", ...FFMPEG_OPUS_ARGUMENTS]
      }), "transformer")
    };
    nodes.get("arbitrary" /* Arbitrary */).addEdge(FFMPEG_OGG_EDGE);
    nodes.get("ogg/opus" /* OggOpus */).addEdge(FFMPEG_OGG_EDGE);
    nodes.get("webm/opus" /* WebmOpus */).addEdge(FFMPEG_OGG_EDGE);
  }
  return nodes;
}
__name(initializeNodes, "initializeNodes");
function findPath(from, constraints, goal = getNode("opus" /* Opus */), path = [], depth = 5) {
  if (from === goal && constraints(path)) {
    return { cost: 0 };
  } else if (depth === 0) {
    return { cost: Number.POSITIVE_INFINITY };
  }
  let currentBest;
  for (const edge of from.edges) {
    if (currentBest && edge.cost > currentBest.cost) continue;
    const next = findPath(edge.to, constraints, goal, [...path, edge], depth - 1);
    const cost = edge.cost + next.cost;
    if (!currentBest || cost < currentBest.cost) {
      currentBest = { cost, edge, next };
    }
  }
  return currentBest ?? { cost: Number.POSITIVE_INFINITY };
}
__name(findPath, "findPath");
function constructPipeline(step) {
  const edges = [];
  let current = step;
  while (current?.edge) {
    edges.push(current.edge);
    current = current.next;
  }
  return edges;
}
__name(constructPipeline, "constructPipeline");
function findPipeline(from, constraint) {
  return constructPipeline(findPath(getNode(from), constraint));
}
__name(findPipeline, "findPipeline");

// src/audio/AudioResource.ts
var AudioResource = class {
  static {
    __name(this, "AudioResource");
  }
  /**
   * An object-mode Readable stream that emits Opus packets. This is what is played by audio players.
   */
  playStream;
  /**
   * The pipeline used to convert the input stream into a playable format. For example, this may
   * contain an FFmpeg component for arbitrary inputs, and it may contain a VolumeTransformer component
   * for resources with inline volume transformation enabled.
   */
  edges;
  /**
   * Optional metadata that can be used to identify the resource.
   */
  metadata;
  /**
   * If the resource was created with inline volume transformation enabled, then this will be a
   * prism-media VolumeTransformer. You can use this to alter the volume of the stream.
   */
  volume;
  /**
   * If using an Opus encoder to create this audio resource, then this will be a prism-media opus.Encoder.
   * You can use this to control settings such as bitrate, FEC, PLP.
   */
  encoder;
  /**
   * The audio player that the resource is subscribed to, if any.
   */
  audioPlayer;
  /**
   * The playback duration of this audio resource, given in milliseconds.
   */
  playbackDuration = 0;
  /**
   * Whether or not the stream for this resource has started (data has become readable)
   */
  started = false;
  /**
   * The number of silence frames to append to the end of the resource's audio stream, to prevent interpolation glitches.
   */
  silencePaddingFrames;
  /**
   * The number of remaining silence frames to play. If -1, the frames have not yet started playing.
   */
  silenceRemaining = -1;
  constructor(edges, streams, metadata, silencePaddingFrames) {
    this.edges = edges;
    this.playStream = streams.length > 1 ? pipeline(streams, noop) : streams[0];
    this.metadata = metadata;
    this.silencePaddingFrames = silencePaddingFrames;
    for (const stream of streams) {
      if (stream instanceof prism4.VolumeTransformer) {
        this.volume = stream;
      } else if (stream instanceof prism4.opus.Encoder) {
        this.encoder = stream;
      }
    }
    this.playStream.once("readable", () => this.started = true);
  }
  /**
   * Whether this resource is readable. If the underlying resource is no longer readable, this will still return true
   * while there are silence padding frames left to play.
   */
  get readable() {
    if (this.silenceRemaining === 0) return false;
    const real = this.playStream.readable;
    if (!real) {
      if (this.silenceRemaining === -1) this.silenceRemaining = this.silencePaddingFrames;
      return this.silenceRemaining !== 0;
    }
    return real;
  }
  /**
   * Whether this resource has ended or not.
   */
  get ended() {
    return this.playStream.readableEnded || this.playStream.destroyed || this.silenceRemaining === 0;
  }
  /**
   * Attempts to read an Opus packet from the audio resource. If a packet is available, the playbackDuration
   * is incremented.
   *
   * @remarks
   * It is advisable to check that the playStream is readable before calling this method. While no runtime
   * errors will be thrown, you should check that the resource is still available before attempting to
   * read from it.
   * @internal
   */
  read() {
    if (this.silenceRemaining === 0) {
      return null;
    } else if (this.silenceRemaining > 0) {
      this.silenceRemaining--;
      return SILENCE_FRAME;
    }
    const packet = this.playStream.read();
    if (packet) {
      this.playbackDuration += 20;
    }
    return packet;
  }
};
var VOLUME_CONSTRAINT = /* @__PURE__ */ __name((path) => path.some((edge) => edge.type === "volume transformer" /* InlineVolume */), "VOLUME_CONSTRAINT");
var NO_CONSTRAINT = /* @__PURE__ */ __name(() => true, "NO_CONSTRAINT");
function inferStreamType(stream) {
  if (stream instanceof prism4.opus.Encoder) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  } else if (stream instanceof prism4.opus.Decoder) {
    return { streamType: "raw" /* Raw */, hasVolume: false };
  } else if (stream instanceof prism4.VolumeTransformer) {
    return { streamType: "raw" /* Raw */, hasVolume: true };
  } else if (stream instanceof prism4.opus.OggDemuxer) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  } else if (stream instanceof prism4.opus.WebmDemuxer) {
    return { streamType: "opus" /* Opus */, hasVolume: false };
  }
  return { streamType: "arbitrary" /* Arbitrary */, hasVolume: false };
}
__name(inferStreamType, "inferStreamType");
function createAudioResource(input, options = {}) {
  let inputType = options.inputType;
  let needsInlineVolume = Boolean(options.inlineVolume);
  if (typeof input === "string") {
    inputType = "arbitrary" /* Arbitrary */;
  } else if (inputType === void 0) {
    const analysis = inferStreamType(input);
    inputType = analysis.streamType;
    needsInlineVolume = needsInlineVolume && !analysis.hasVolume;
  }
  const transformerPipeline = findPipeline(inputType, needsInlineVolume ? VOLUME_CONSTRAINT : NO_CONSTRAINT);
  if (transformerPipeline.length === 0) {
    if (typeof input === "string") throw new Error(`Invalid pipeline constructed for string resource '${input}'`);
    return new AudioResource(
      [],
      [input],
      options.metadata ?? null,
      options.silencePaddingFrames ?? 5
    );
  }
  const streams = transformerPipeline.map((edge) => edge.transformer(input));
  if (typeof input !== "string") streams.unshift(input);
  return new AudioResource(
    transformerPipeline,
    streams,
    options.metadata ?? null,
    options.silencePaddingFrames ?? 5
  );
}
__name(createAudioResource, "createAudioResource");
function findPackageJSON(dir, packageName, depth) {
  if (depth === 0) return void 0;
  const attemptedPath = resolve(dir, "./package.json");
  try {
    const pkg = __require(attemptedPath);
    if (pkg.name !== packageName) throw new Error("package.json does not match");
    return pkg;
  } catch {
    return findPackageJSON(resolve(dir, ".."), packageName, depth - 1);
  }
}
__name(findPackageJSON, "findPackageJSON");
function version(name) {
  try {
    if (name === "@discordjs/voice") {
      return "0.19.0";
    }
    const pkg = findPackageJSON(dirname(__require.resolve(name)), name, 3);
    return pkg?.version ?? "not found";
  } catch {
    return "not found";
  }
}
__name(version, "version");
function generateDependencyReport() {
  const report = [];
  const addVersion = /* @__PURE__ */ __name((name) => report.push(`- ${name}: ${version(name)}`), "addVersion");
  report.push("Core Dependencies");
  addVersion("@discordjs/voice");
  addVersion("prism-media");
  report.push("");
  report.push("Opus Libraries");
  addVersion("@discordjs/opus");
  addVersion("opusscript");
  report.push("");
  report.push("Encryption Libraries");
  report.push(`- native crypto support for aes-256-gcm: ${getCiphers().includes("aes-256-gcm") ? "yes" : "no"}`);
  addVersion("sodium-native");
  addVersion("sodium");
  addVersion("libsodium-wrappers");
  addVersion("@stablelib/xchacha20poly1305");
  addVersion("@noble/ciphers");
  report.push("");
  report.push("DAVE Libraries");
  addVersion("@snazzah/davey");
  report.push("");
  report.push("FFmpeg");
  try {
    const info = prism4.FFmpeg.getInfo();
    report.push(`- version: ${info.version}`);
    report.push(`- libopus: ${info.output.includes("--enable-libopus") ? "yes" : "no"}`);
  } catch {
    report.push("- not found");
  }
  return ["-".repeat(50), ...report, "-".repeat(50)].join("\n");
}
__name(generateDependencyReport, "generateDependencyReport");

// src/util/abortAfter.ts
function abortAfter(delay) {
  const ac = new AbortController();
  const timeout = setTimeout(() => ac.abort(), delay);
  ac.signal.addEventListener("abort", () => clearTimeout(timeout));
  return [ac, ac.signal];
}
__name(abortAfter, "abortAfter");

// src/util/entersState.ts
async function entersState(target, status, timeoutOrSignal) {
  if (target.state.status !== status) {
    const [ac, signal] = typeof timeoutOrSignal === "number" ? abortAfter(timeoutOrSignal) : [void 0, timeoutOrSignal];
    try {
      await once(target, status, { signal });
    } finally {
      ac?.abort();
    }
  }
  return target;
}
__name(entersState, "entersState");
function validateDiscordOpusHead(opusHead) {
  const channels = opusHead.readUInt8(9);
  const sampleRate = opusHead.readUInt32LE(12);
  return channels === 2 && sampleRate === 48e3;
}
__name(validateDiscordOpusHead, "validateDiscordOpusHead");
async function demuxProbe(stream, probeSize = 1024, validator = validateDiscordOpusHead) {
  return new Promise((resolve2, reject) => {
    if (stream.readableObjectMode) {
      reject(new Error("Cannot probe a readable stream in object mode"));
      return;
    }
    if (stream.readableEnded) {
      reject(new Error("Cannot probe a stream that has ended"));
      return;
    }
    let readBuffer = Buffer$1.alloc(0);
    let resolved;
    const finish = /* @__PURE__ */ __name((type) => {
      stream.off("data", onData);
      stream.off("close", onClose);
      stream.off("end", onClose);
      stream.pause();
      resolved = type;
      if (stream.readableEnded) {
        resolve2({
          stream: Readable.from(readBuffer),
          type
        });
      } else {
        if (readBuffer.length > 0) {
          stream.push(readBuffer);
        }
        resolve2({
          stream,
          type
        });
      }
    }, "finish");
    const foundHead = /* @__PURE__ */ __name((type) => (head) => {
      if (validator(head)) {
        finish(type);
      }
    }, "foundHead");
    const webm = new prism4.opus.WebmDemuxer();
    webm.once("error", noop);
    webm.on("head", foundHead("webm/opus" /* WebmOpus */));
    const ogg = new prism4.opus.OggDemuxer();
    ogg.once("error", noop);
    ogg.on("head", foundHead("ogg/opus" /* OggOpus */));
    const onClose = /* @__PURE__ */ __name(() => {
      if (!resolved) {
        finish("arbitrary" /* Arbitrary */);
      }
    }, "onClose");
    const onData = /* @__PURE__ */ __name((buffer) => {
      readBuffer = Buffer$1.concat([readBuffer, buffer]);
      webm.write(buffer);
      ogg.write(buffer);
      if (readBuffer.length >= probeSize) {
        stream.off("data", onData);
        stream.pause();
        process$1.nextTick(onClose);
      }
    }, "onData");
    stream.once("error", reject);
    stream.on("data", onData);
    stream.once("close", onClose);
    stream.once("end", onClose);
  });
}
__name(demuxProbe, "demuxProbe");

/**
 * Puppet Function.
 * @callback PuppetTool
 * @param {import('discord.js').Message<true>} message
 * @param {{authorID: string, permission: string}} permissions
 * @returns {void}
 */
/**
 * @type {PuppetTool}
 */
function puppet ({content, guild, author, /* member, */ channel}, permissions) {
  // Transmit message as:
  // !puppet <CHANNEL> | <MESSAGE>
  if (
    author.id === permissions.authorID

  // Reenable this if we allow `getCommands.js` to pass in arbitrary users
  // or are using this file elsewhere
  // || member.permissions.has(permissions.permission)
  ) {
    const regex = /!puppet (?<userChannel>\S.+) \| (?<msg>\S.+)/iv;
    const echo = content.match(regex);

    // Did regex pass
    if (echo) {
      // eslint-disable-next-line @stylistic/max-len -- Long
      const {userChannel, msg} = /** @type {{userChannel: string, msg: string}} */ (
        echo.groups
      );

      const destination = guild?.channels.cache.find(
        (val) => val.name === userChannel
      );

      // Does the channel exist?
      if (destination && destination.isTextBased()) {
        destination.send(msg);
      } else {
        channel.send(`Channel ${userChannel} does not exist!`);
      }
    }
  }
}

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @param {object} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('discord-tts')} cfg.discordTTS
 * @returns {import('./getCommands.js').BotCommands}
 */
const getAdmin = ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  discordTTS, guildCheckin, _
}) => {
  return {
    speak: {
      re: /!speak/iv,
      /*
      helpInfo: {
        name: '!speak some words',
        value: 'Reads some words as speech'
      },
      */
      /* c8 ignore next 39 */
      /* eslint-disable require-await -- Easier */
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        /* eslint-enable require-await -- Easier */
        // Todo: Needs testing
        if (!ADMIN_IDS.includes(message.author.id)) {
          return;
        }

        const words = message.content.split(' ').slice(2).join(' ');

        // Todo: Abstract out code so browser can instead use `SpeechSynthesis`
        const channel = message.member?.voice.channel;
        if (!channel) {
          // eslint-disable-next-line no-console -- Debugging
          console.log('Message member not in a voice channel with `channel`');
          return;
        }
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();

        player.play(createAudioResource(discordTTS.getVoiceStream(words)));
        connection.subscribe(player);

        // console.error(_('speechError'), err);

        // eslint-disable-next-line no-console -- Debugging
        console.log(_('speakingBegun'));
      }
    },
    puppet: {
      re: /!puppet (?:\S.+) \| (?:\S.+)/iv,
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // Puppet handling
          puppet(message, {
            authorID: PUPPET_AUTHOR});

          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Puppet command issued by ${message.author.username}.`
          );
        }
      }
    },
    echo: {
      re: /!echo\b/iv,
      /**
       * Echo what was said.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          message.channel.send(
            `Here's what you said, ${
              message.author.username
            }: \`\`${message.content}\`\``
          );

          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Echo command issued by ${message.author.username}.`
          );
        }
      }
    },
    checkin: {
      re: /!checkin\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Checkin command issued by ${message.author.username}.`
          );
          try {
            return await guildCheckin();
          /* c8 ignore next 4 */
          } catch (err) {
            // eslint-disable-next-line no-console -- CLI
            console.error('Error checking in', err);
          }
        }
        return undefined;
      }
    }
  };
};

/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord.js')} cfg.Discord
 * @returns {import('./getCommands.js').BotCommands}
 */
const getBahaiInfo = ({client, Discord}) => {
  return {
    /*
      question: {
        re: /\b(?:question|q):.*\b/iv,
        action (message) {

        }
      },
    */
    info: {
      re: /!info/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        // Define the embed features
        const embed = new Discord.EmbedBuilder();

        // Initialize output
        const embedDescription = "Bahá'í Bot for Discord\n";

        // Add data
        embed.setAuthor({
          name: 'BahaiBot',
          iconURL: client.user?.avatarURL() ?? undefined
        });

        embed.setDescription(embedDescription);

        embed.addFields([
          {
            name: 'Support Server',
            value: '[Invite link](https://discord.gg/NE6dJaw)',
            inline: false
          }
        ]);

        message.channel.send({embeds: [embed]});
      }
    },
    badi: {
      re: /\bbad[íi]\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = client.emojis.cache.find((val) => val.name === '9star');
        message.channel.send(
          `OK ${
            message.author.username
          }, here you go. https://bahaipedia.org/Badí‘${star
            ? ` ${star.toString()}`
            : ''}`
        );
      }
    }
  };
};

/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @returns {import('./getCommands.js').BotCommands}
 */
const getBahaiSalutations = ({client}) => {
  /**
   * @param {import('discord.js').Message<true>} message
   * @returns {import('discord.js').GuildEmoji|undefined}
   */
  const reactToStar = (message) => {
    const star = client.emojis.cache.find((val) => val.name === '9star');
    if (star) {
      message.react(star);
    }
    return star;
  };
  return {
    // GREETINGS //
    abha: {
      re: /\b(?:all[aá]h['’´\-]?[uo]?['’´\-]?abh[aá]|abh[aá])/iv,
      /**
       * Alláh-u-Abhá!
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);

        message.channel.send(
          `Alláh-u-Abhá, ${message.author.username}! ${star
            ? star.toString()
            : ''}`
        );
      },
      notMentioned: {
        /**
         * If welcome AND a user are mentioned.
         * @param {import('discord.js').Message<true>} message
         * @returns {boolean}
         */
        check (message) {
          return Boolean(message.mentions.members?.first());
        },
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          reactToStar(message);
        }
      }
    },
    nawruz: {
      re: /\b(?:(?:happy|joyous)\s?n[ao]w[\- ]?ro?[uú]z|n[ao]w[\- ]?ro?[uú]z\s?(?:m[uo]b[aá]r[aá]k))\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);
        const sabz = client.emojis.cache.find((val) => val.name === 'sabzi');
        message.channel.send(
          `Happy Naw-Rúz! ${star
            ? star.toString()
            : ''}${sabz
            ? sabz.toString()
            : ''}`
        );
      }
    },
    ridvan: {
      re: /\b(?:(?:happy|joyous)\s?r[ie][ḍdz][vw][aá]n|r[ie][ḍdz][vw][aá]n\s?(?:m[uo]b[aá]r[aá]k))\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);
        message.channel.send(`Happy Ridván! ${star ? star.toString() : ''}`);
      }
    }
  };
};

/**
 * @returns {import('./getCommands.js').BotCommands}
 */
const getSalutations = () => {
  return {
    sup: {
      re: /\b(?:su+p|wh[au]+[sz]+[au]+p|(?:(?:what|wut)['’´]?s (?:up|new|good|gud|cookin[g'’´])))\b/iv,
      /**
       * What's up?
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const nms = ['Not much', 'Not too much', 'Not a lot', 'Not very much'];
        const nm = nms[
          Math.floor(Math.random() * nms.length)
        ]; // Pick a random greeting
        const happies = [
          'Just glad to be here.', 'Just happy to be here.',
          'Same as usual.', 'Same old, same old.', 'Just like usual.',
          'Just waiting to be of service.',
          'Just waiting to be of service to somebody.',
          'Just waiting to be of service to someone.',
          'Just waiting for questions to answer.',
          'Just waiting for questions I can help answer.'
        ];
        const happy = happies[
          Math.floor(Math.random() * happies.length)
        ]; // Pick a random greeting
        message.channel.send(
          `${nm}, ${message.author.username}. ${happy}`
        );
      }
    },
    morning: {
      re: /\bgood morning\b/iv,
      /**
       * Good morning.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Good morning ${message.author.username}! :coffee:`
        );
      }
    },
    afternoon: {
      re: /\bgood afternoon\b/iv,
      /**
       * Good afternoon.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good afternoon ${message.author.username}!`);
      }
    },
    evening: {
      re: /\bgood evening\b/iv,
      /**
       * Good evening.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good evening ${message.author.username}!`);
      }
    },
    hello: {
      re: /\b(?:h[uea]llo|hi|hi there|howdy|yo|heya|sal[aá]{1,2}m)\b/iv,
      /**
       * Hello.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Hello ${message.author.username}!`);
      }
    },
    welcome: {
      re: /^(?:everyone|everybody)?\W*(?:please|pleez|pls|plz)?\W*(?:\W*welcome|.*>+\W*welcome\b|.*\bwb\b)/iv,
      /**
       * Welcome.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Thanks, ${message.author.username}! :wave:`
        );
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {boolean}
         */
        check (message) {
          return Boolean(message.mentions.members?.first());
        },
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('👋');
        }
      }
    }
  };
};

/**
* @returns {import('./getCommands.js').BotCommands}
*/
const getLightHearted = () => {
  return {
    /* OTHER CHIT-CHAT */
    coffee: {
      re: /\u{2615}/u,
      /**
       * Coffee (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':coffee:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('☕');
        }
      }
    },
    tea: {
      re: /\u{1F375}/u,
      /**
       * Tea (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':tea:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('🍵');
        }
      }
    },
    popcorn: {
      re: /\u{1F37F}/u,
      /**
       * Popcorn (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':popcorn:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('🍿');
        }
      }
    },
    // Lulz (should be at the end so everything else is processed first).
    unladen: {
      re: /\bunladen\sswallow\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          'What do you mean, an African, or European swallow?'
        );
      }
    },
    bruh: {
      re: /\bbruh\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Bruh.');
      }
    },
    goodbot: {
      re: /\bgood\s?bot\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.react('😊');
        message.channel.send('Thanks!');
      }
    },
    badbot: {
      re: /\bbad\s?bot\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.react('☹️');
        message.channel.send('Sorry.');
      }
    },
    repeating: {
      re: /\brepeating yourself\b/iv,
      /**
       * Repeating.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const srs = [
          'Oops, sorry...', 'Oops, sorry!', 'Sorry!', 'Oops!', 'Sorry...',
          'Sorry... :sweat_smile:', 'Oops, sorry... :sweat_smile:'
        ];
        const sr = srs[
          Math.floor(Math.random() * srs.length)
        ]; // Pick a random greeting
        const excs = [
          "I tend to do that, don't I?",
          "I guess I tend to do that, don't I?",
          "I suppose I tend to do that, don't I?",
          "I'm just a chatbot, after all.",
          'I am a chatbot, after all.', 'I *am* a chatbot, after all.',
          "That does happen a lot, doesn't it."
        ];
        const exc = excs[
          Math.floor(Math.random() * excs.length)
        ]; // Pick a random greeting
        message.channel.send(`${sr} ${exc}`);
      }
    },
    santacat: {
      re: /\b(?:my|santa['’´]?s)\scat\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const cats = [
          'Not telling.', "That's a secret to everybody.",
          "Didn't somebody make a meme out of it?",
          'Which one? This one? :cat2:', "Wouldn't you like to know.",
          'Who do you think I am? Schrödinger?'
        ];
        const cat = cats[
          Math.floor(Math.random() * cats.length)
        ]; // Pick a random greeting
        message.channel.send(cat);
      }
    },
    ping: {
      re: /\bping\b/iv,
      /**
       * Ping message.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Pong :ping_pong:');
      }
    }
  };
};

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
* @param {object} cfg
* @param {import('@google-cloud/dialogflow').SessionsClient} cfg.app
* @param {import('../router.js').Router} cfg.router
* @param {import('discord.js').Client} cfg.client
* @param {import('discord.js')} cfg.Discord
* @param {import('intl-dom').I18NCallback} cfg._
* @param {import('../discordBot.js').Settings} cfg.settings
* @returns {import('./getCommands.js').BotCommand}
*/
const getDefaultCommand = ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  app, router, client, Discord, _, settings
}) => {
  return {
    re: /[\s\S]*/u, // Should always match
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {Promise<void>}
     */
    async action (message) {
      /* BOT DATA */
      // Variables and initial data

      // Removes an initial bot reference and converts other snowflake
      //  sequences to username

      // Trim is necessary to ensure the `offset` can be 0 when matching
      //   snowflake at beginning
      const userInput = message.content.trimStart().replaceAll(
        /<@!?(?<snowflake>\d+)>/gv,
        (__, n1, offset, wholeStr, {snowflake}) => {
          if (snowflake === client.user?.id) {
            // Re-add this condition if the intents are ever modified to take
            //   into account "BahaiBot" as part of the text (e.g., so that
            //   "Who is X, BahaiBot" is as good of a match as "Who is X",
            //   and in case, it needs to handle, "Why is Bahaibot ignoring
            //   me?") types of queries
            // && !offset
            return '';
          }
          const {username} = client.users.resolve(snowflake);

          return username;
        }
      );

      // Creates a new session, using original Discord-bot-defined sessionID
      const sessionID = message.author.id;
      const sessionPath = app.projectAgentSessionPath(
        /** @type {string} */ (settings.PROJECT_ID),
        sessionID
      );

      // The text query request
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: userInput, // was message,
            // The language used by the client
            languageCode: _.resolvedLocale
          }
        }
      };

      /* eslint-disable jsdoc/imports-as-dependencies -- Bug */
      /**
      * @throws {DialogflowError}
      * @returns {Promise<
      *   import('@google-cloud/dialogflow').protos.google.
      *     cloud.dialogflow.v2.IDetectIntentResponse
      * >} responses
      */
      async function dialogflowCall () {
        /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
        // Send request and log result
        try {
          const [response] = await app.detectIntent(request);
          await router(response, message, client, Discord, _);
          // Allow use as returned value from call by enclosing function
          return response;
        } catch (error) {
          // Let the user know
          message.channel.send(
            `<@${
              message.author.id
            }>, I couldn't process your question at the moment.`
          );

          // Allow a consuming await chain to catch this as a proper error (and
          //   log there)
          throw error;
        }
      }

      // Return in case an implementation wants this as a Promise that
      //  waits to resolve
      // return await dialogflowCall();
      await dialogflowCall();
    }
  };
};

/**
 * @param {object} cfg
 * @param {import('./getCommands.js').BotCommands} cfg.commands
 */
const addHelp = ({commands}) => {
  /**
  * @typedef {{name: string, value: string}} BotHelpField
  */

  const help = {
    re: /!help\b/iv,
    helpInfo: {
      name: '!help',
      value: 'Displays help text.'
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'I can respond to well-formed questions about basic ' +
              "Baha'i topics. As well, the following commands can help me " +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !help`',
          fields
        }]
      });
    }
  };

  commands.help = help;

  /**
   * @type {BotHelpField[]}
   */
  const fields = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpInfo}) => {
      return helpInfo;
    }).filter(Boolean)
  );
};

// DISCORD ID CONSTANTS


const BAHAI_FYI_GUILD_ID = '346962599771897859'; // Bahá'í.FYI
const BAHAI_FYI_RULES_CHANNEL_ID = '351854934368583681'; // #rules
const BAHAI_FYI_GENERAL_CHANNEL_ID = '346962600212561920'; // #general
const BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID = '671628531717111808'; // #irc-bridge
const BAHAI_FYI_STUDY_HALL_CHANNEL_ID = '346963530836344832'; // #study-hall
const BAHAI_FYI_HELP_TEAM = '644722296929648641'; // @Help

const BAHAI_LAB_GUILD_ID = '325981722082672661'; // Bahá'í Lab
const BAHAI_LAB_BOT_TESTING_CHANNEL_ID = '391408369891672064'; // #bot-testing

const USER_AB = '309427494778306560';

const ADMIN_IDS = [
  USER_AB,
  '324993843005227008' // dragfyre
];

const ADMIN_ROLES = [
  'Admins', 'Trusted Servant', 'Mods', 'Help'
];

const ADMIN_PERMISSION = 'ADMINISTRATOR';

// Todo: i18nize messages within `getBahaiWikis.js`, `getReader.js`,
//   `messages.js`, and the command files.
// Todo: i18nize behavior of `getWikiTools.js`, `getBahaiWikis.js`


/**
* @callback ActionBehavior
* @param {import('discord.js').Message<true>} message
* @returns {Promise<void>|void}
*/

/**
* @callback ActionCheck
* @param {import('discord.js').Message<true>} message
* @returns {boolean}
*/

/**
* @typedef {object} NotMentionedCommand
* @property {ActionBehavior} action
* @property {ActionCheck} [check]
*/

/**
* @typedef {object} BotCommand
* @property {RegExp} re
* @property {ActionBehavior} action
* @property {NotMentionedCommand} [notMentioned]
* @property {{name: string, value: string}} [helpInfo]
*/

/**
* @typedef {Object<string,BotCommand>} BotCommands
*/

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @param {object} cfg
 * @param {import('@google-cloud/dialogflow').SessionsClient} cfg.app
 * @param {import('../router.js').Router} cfg.router
 * @param {import('discord.js')} cfg.Discord
 * @param {import('../getWikiTools.js').BotWikiTools} cfg.wikiTools
 * @param {import('discord.js').Client} cfg.client
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('../bot.js').GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('discord-tts')} cfg.discordTTS
 * @returns {Promise<import('./getCommands.js').BotCommands>}
 */
const getCommands = async function ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  app, router, Discord,
  wikiTools, client, guildCheckin,
  _,
  // eslint-disable-next-line no-unused-vars -- Not currently in use
  getLocalizedSetting,
  fs, settings,
  discordTTS
}) {
  const {
    PUPPET_AUTHOR = USER_AB,
    ADMIN_PERMISSION: ADMIN_PERMISSION$1 = ADMIN_PERMISSION,
    ADMIN_IDS: ADMIN_IDS$1 = ADMIN_IDS,
    ADMIN_ROLES: ADMIN_ROLES$1 = ADMIN_ROLES,
    enabledCommandGroups = ['*'],
    disabledCommandGroups = []
  } = settings;

  const anyCommand = enabledCommandGroups.includes('*');

  // eslint-disable-next-line @stylistic/max-len -- Long
  const objs = await Promise.all(/** @type {([string, () => BotCommands])[]} */ ([
    ['socialInfo', () => getSocialInfo({ADMIN_ROLES: ADMIN_ROLES$1, client})],
    [
      'bahaiWritings',
      () => getBahaiWritings({fs, settings, client, Discord})
    ],
    ['bahaiWikis', () => getBahaiWikis({wikiTools, client, _})],
    ['admin', () => getAdmin({
      ADMIN_IDS: ADMIN_IDS$1, ADMIN_PERMISSION: ADMIN_PERMISSION$1, PUPPET_AUTHOR, guildCheckin, _,
      discordTTS
    })],
    ['bahaiInfo', () => getBahaiInfo({client, Discord})],
    ['bahaiSalutations', () => getBahaiSalutations({client})],
    ['salutations', () => getSalutations()],
    ['lightHearted', () => getLightHearted()]
  ]).map(async ([name, cmd]) => {
    if (
      (anyCommand || enabledCommandGroups.includes(name)) &&
      !disabledCommandGroups.includes(name)
    ) {
      return await cmd();
    }
    return null;
  }));

  const commands = /** @type {{[x: string]: BotCommand}} */ (
    objs.reduce((cmds, obj) => {
      cmds = {...cmds, ...obj};
      return cmds;
    }, {})
  );

  addHelp({commands});

  // After adding help to ensure `!help` has priority
  commands.default = getDefaultCommand({
    app, router, client, Discord, _, settings
  });

  return commands;
};

/*
  Resource Loader
*/

// import questions from './questions.js';

// Export the router

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @callback Router
 * @param {import('@google-cloud/dialogflow').protos.google.
 *     cloud.dialogflow.v2.IDetectIntentResponse} response
 * NOTE: response.queryResult.fulfillmentMessages is the array (not used)
 * NOTE: response.queryResult.fulfillmentText a string with default response
 * @param {import('discord.js').Message<true>} message
 * @param {import('discord.js').Client} client
 * @param {import('discord.js')} Discord
 * @param {import('intl-dom').I18NCallback} _
 * @returns {void}
 */
/* eslint-enable jsdoc/imports-as-dependencies -- Bug */

/**
 * @type {Router}
 */
const router = (response, message, client, Discord, _) => {
  // eslint-disable-next-line no-console -- CLI
  console.log(_('routerResponse'), response);
  // eslint-disable-next-line @stylistic/max-len -- Long
  const speech = response.queryResult?.fulfillmentMessages?.[0]?.text?.text?.[0];
  message.channel.send(/** @type {string} */ (speech));
};

const greets = {
  debugCheckin: [
    'Hi', 'Hi', 'Hi there', 'Hello', 'Hello', 'Hello there',
    'Hey', "What's up", "What's new"
  ],
  fyiCheckin: {
    general: [
      'Hi, everyone.', 'Hi, everybody.', 'Hi, everyone.',
      'Hi there, everyone!', 'Hello, everyone.',
      'Hello there, everyone.', 'Alláh-u-Abhá!',
      'Alláh’u’abhá, everyone.', 'Alláh-u-Abhá, everyone.',
      "What's cooking, everybody?", "Hey all, what's cooking?",
      "What's up, everyone?", "What's good, everyone?",
      "Hey everyone, what's new?", "Hey everybody, what's up?",
      "Hey, what's up everyone?", "Hi everybody, what's up?"
    ],
    ircBridge: [
      'Hello IRC.', 'Hi, everybody.', 'Hi, everyone.',
      'Hi there, everyone!', 'Hello, everyone.',
      'Hello there, everyone.', 'Alláh-u-Abhá!',
      'Alláh-u-Abhá, IRC.', 'Alláh-u-Abhá, everyone.',
      "What's cooking, everybody?", "Hey all, what's cooking?",
      "What's up, everyone?", "What's good, everyone?",
      "Hey everyone, what's new?", "Hey everybody, what's up?",
      "Hey, what's up everyone?", "Hi everybody, what's up?"
    ]
  },
  guildMemberAdd: [
    'Hi', 'Hi', 'Hi there', 'Hello', 'Hello', 'Hello there',
    'Hey', "What's up", "What's new"
  ]
};

const happies = {
  /**
   * @param {string} awesome
   * @returns {string[]}
   */
  guildMemberAdd: (awesome) => [
    'Happy to have you with us!', 'Pleased to have you with us!',
    'Great to have you with us!', "It's great to have you with us!",
    "It's a pleasure to have you with us!",
    'Pleased to have you with us! :smile:',
    "It's a pleasure to have you with us! :smile:",
    'Happy to have you with us! :smile:',
    'Great to have you with us! :smile:',
    `Happy to have you with us! ${awesome}`,
    'Glad you could join us! :smile:',
    `Glad you could join us! ${awesome}`,
    'Happy to have you with us today!',
    'Pleased to have you with us today!',
    'Great to have you with us today!',
    "It's great to have you with us today!",
    "It's a pleasure to have you with us today!",
    'Pleased to have you with us today! :smile:',
    "It's a pleasure to have you with us today! :smile:",
    'Happy to have you with us today! :smile:',
    'Great to have you with us today! :smile:',
    `Happy to have you with us today! ${awesome}`,
    'Glad you could join us today! :smile:',
    `Glad you could join us today! ${awesome}`
  ]
};

/**
 * @callback GuildCheckin
 * @param {import('./getWikiTools.js').Integer} [nowtime=Date.now()]
 * @returns {Promise<void>}
 */

// Start counting uptime prior to login
const readytime = Date.now();

/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @param {import('./integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('./getWikiTools.js').BotWikiTools} cfg.wikiTools
 * @param {import('./discordBot.js').Settings} cfg.settings
 * @param {import('./bot.js').GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {import('intl-dom').I18NCallback} cfg._
 * @returns {GuildCheckin}
 */
function getCheckin ({
  client, fs, wikiTools, settings, getLocalizedSetting, _
}) {
  const {
    bstarEmoji = 'bstar',
    checkinGuilds = [
      {
        guildID: BAHAI_LAB_GUILD_ID,
        guildName: getLocalizedSetting('labServerName'),
        guildChannels: [
          {
            id: BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
            greetings: getLocalizedSetting('debugCheckin', {
              defaultValue: greets.debugCheckin
            }),
            reportUptime: true
          }
        ]
      },
      {
        guildID: BAHAI_FYI_GUILD_ID,
        guildName: getLocalizedSetting('serverName'),
        guildChannels: [
          {
            id: BAHAI_FYI_GENERAL_CHANNEL_ID,
            greetings: getLocalizedSetting('fyiCheckin-general', {
              defaultValue: greets.fyiCheckin.general
            })
          },
          {
            id: BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
            greetings: getLocalizedSetting('fyiCheckin-ircBridge', {
              defaultValue: greets.fyiCheckin.ircBridge
            })
          },
          {
            id: BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
            bpToday: true
          }
        ]
      }
    ]
  } = settings;

  /**
   * @type {GuildCheckin}
   */
  return async function guildCheckin (nowtime = Date.now()) {
    // Hi, guild (Bahá'í.FYI)

    let channels;
    for (const {guildID, guildName, guildChannels} of checkinGuilds) {
      const guild = client.guilds.cache.get(guildID);
      if (!guild) {
        continue;
      }
      // We found our guild (Bahá'í.FYI)

      // eslint-disable-next-line no-console -- CLI
      console.log(_('checkingIn', {
        // eslint-disable-next-line object-shorthand -- TS
        guildName: /** @type {string} */ (guildName)
      }));

      channels = guildChannels.map((guildChannel) => {
        const {
          id: guildChannelID, greetings
        } = guildChannel;
        const bpToday = 'bpToday' in guildChannel && guildChannel.bpToday;
        const reportUptime = 'reportUptime' in guildChannel &&
          guildChannel.reportUptime;

        return {
          guildName,
          bpToday,
          greetings,
          reportUptime,
          channel: /** @type {import('discord.js').TextChannel} */ (
            guild.channels.cache.get(guildChannelID)
          )
        };
      }).filter(({channel}) => {
        return channel;
      });

      if (!channels.length) {
        return;
      }
    }

    if (!channels) {
      return;
    }

    const channelList = {
      list: /** @type {[string[]]} */ ([
        channels.map(({channel}) => {
          const name = channel?.name;
          return `#${name}`;
        })
      ])
    };

    const guildFileName = 'greet.guild.txt';

    try {
      const stats = await fs.stat(guildFileName);
      const mtime = new Date(
        stats.mtime
      ); // When was the token file modified?
      const timedeltaSeconds = (nowtime - mtime.getTime()) / 1000;

      // eslint-disable-next-line no-console -- CLI
      console.log(
        _('lastGreeting', {
          relativeTime: istr(Math.floor(timedeltaSeconds)),
          channels: channelList
        })
      );
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.log(_(
        'firstGreet', {
          channels: channelList
        }
      ));
    }

    // Avoid repeatedly retrieving today in history if present
    let todayInHistoryResult;
    if (channels.some(({bpToday}) => {
      return bpToday;
    })) {
      todayInHistoryResult = await wikiTools.bpGetToday();
    }

    // We found any of the channels
    for (const {
      channel, bpToday, greetings, guildName, reportUptime
    } of channels) {
      // eslint-disable-next-line no-console -- CLI
      console.log(_('channelFound', {
        // eslint-disable-next-line object-shorthand -- TS
        guildName: /** @type {string} */ (guildName),
        channelName: /** @type {string} */ (channel?.name)
      }));

      if (greetings) {
        const greet = /** @type {string[]} */ (greetings)[
          Math.floor(Math.random() * /** @type {string[]} */ (greetings).length)
        ]; // Pick a random greeting
        if (reportUptime) {
          const now = new Date();
          const uptime = nowtime - readytime;
          channel?.send(
            /** @type {string} */ (_('uptimeGreet', {
              greet,
              now: now.toString(),
              uptime: istr(Math.floor(uptime / 1000))
            }))
          ); // Check in
        } else {
          channel?.send(greet); // Greet everyone
        }
      }

      if (!bpToday ||
        !todayInHistoryResult) {
        continue;
      }

      const bstar = client.emojis.cache.find(
        (val) => val.name === bstarEmoji
      );

      // eslint-disable-next-line no-console -- CLI
      console.log(_('postingTodayInHistory'));

      channel?.send({
        content: /** @type {string} */ (_('hereIsQueryResult')),
        embeds: [{
          color: 3447003,
          description: /** @type {string} */ (_('todayInHistoryResult', {
            today: {
              date: [
                Date.now(),
                {month: 'long', day: 'numeric'}
              ]
            },
            bstar: bstar?.toString() ?? '',
            todayInHistoryResult
          }))
        }]
      });
    }

    try {
      await fs.writeFile(guildFileName, nowtime.toString());
      // eslint-disable-next-line no-console -- CLI
      console.log(_(
        'greetingSent', {
          channels: channelList
        }
      ));
    } catch (err) { // Update the token file
      // eslint-disable-next-line no-console -- CLI
      console.error(_('errorWritingGuild', {
        guildFileName
      }), err);
    }
  };
}

// Todo: Ought to do a review to ensure all Promise APIs are awaited or at
//   least flagged as deliberately not awaiting


/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * This lets us also update the `client` value and dependent code against
 * a unit testing mock client.
 * @typedef {object} BotOptions
 * @property {boolean} [checkins=false]
 * @property {string[]} [locales=["en-US"]]
 * @property {globalThis.fetch|import('node-fetch').
 *   default} [fetch=globalThis.fetch]
 * @property {typeof import('intl-dom').i18n} [i18n=globalThis?.intlDom?.i18n]
 * @property {import('./getWikiTools.js').
 *   StripTags} [striptags=globalThis.striptags]
 * @property {import('discord.js').Client} [client=new Discord.Client()]
 * @property {import('discord.js')} Discord
 * @property {import('discord-tts')} discordTTS
 * @property {import('@google-cloud/dialogflow')} dialogflow
 * @property {import('./integratedClientServerBot.js').LimitedFs} fs
 * @property {import('./discordBot.js').GetPath} getPath
 * @property {GetSettings} [getSettings]
 * @property {number} [commandInterval]
 * @property {import('discord.js-rate-limiter').RateLimiter} [rateLimiter]
 * @property {boolean} [exitNoThrow=false] Set to true for testing
 */
/* eslint-enable jsdoc/imports-as-dependencies -- Bug */

/**
 * @typedef {{
 *   client: import('discord.js').Client,
 *   botCommands: import('./commands/getCommands.js').BotCommands,
 *   guildCheckin: import('./getCheckin.js').GuildCheckin,
 *   system?: import('./discordBot.js').SettingsFile,
 *   getSettings?: GetSettings
 * }} BotResponse
 */

/**
 * @callback GetLocalizedSetting
 * @param {string} key
 * @param {object} [cfg]
 * @param {string[]|{
 *   guildMemberAdd: (str: string) => string[]
 * }} [cfg.defaultValue]
 * @returns {string|string[]|Text|DocumentFragment|{
 *   guildMemberAdd: (str: string) => string[]
 * }}
 */

const defaultLocale = 'en-US';
const supportedLocales = [
  // Add any other available locales here (or read `_locales` for directory
  //   names):
  defaultLocale
];

/**
 * @template {object} T
 * @template {keyof T} Keys
 * @typedef {T & Required<Pick<T, Keys>>} WithRequired
 */


/**
 * @callback GetSettings
 * @param {import('./discordBot.js').SettingsFile} settings
 * @returns {import('./discordBot.js').Settings}
 */

/**
 * @param {WithRequired<
 *   Partial<BotOptions>,
 *   'fs' | 'dialogflow' | 'Discord' | 'discordTTS'
 * > & Partial<BotOptions>} cfg
 * @returns {Promise<BotResponse>}
 */
const bot = async ({
  checkins = false,
  locales = typeof navigator === 'undefined'
    ? [defaultLocale]
    /* c8 ignore next 3 */
    : [...navigator.languages.filter((locale) => {
      return supportedLocales.includes(locale);
    }), defaultLocale],
  // eslint-disable-next-line no-shadow -- Familiar
  fetch = globalThis.fetch,
  // Default to dependencies' globals in case using UMD files and user not
  //  supplying own modular versions
  i18n = globalThis.intlDom?.i18n,
  striptags = globalThis.striptags,
  client: cl,
  Discord,
  discordTTS, // `speak` admin command
  dialogflow,
  fs,
  /**
   * @type {GetSettings}
   */
  getSettings: defaultGetSettings,
  getPath = (path) => path,
  // numberOfCommands = 1,
  commandInterval = 2000,
  rateLimiter = new distExports.RateLimiter(1, commandInterval),
  exitNoThrow = false
}) => {
  /**
  * @param {import('discord.js').Message} message
  * @returns {boolean}
  */
  const isUserAbusive = (message) => {
    const limited = rateLimiter.take(message.author.id);
    return limited;
  };

  // Update local copy
  // Create an instance of a Discord client
  const client = cl || /* c8 ignore next */ new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.MessageContent
      // Discord.GatewayIntentBits.GuildPresences
    ]
  });

  // Import the .json settings (use this when JSON importing is standard in
  //   Node and the browser)
  // // eslint-disable-next-line node/no-unpublished-import -- User must set
  // const system = (
  //   await import('../settings.json', {with: {type: 'json'}})
  // ).default;

  const system = JSON.parse(
    await fs.readFile(getPath('settings.json'), 'utf8')
  );

  const getSettings = typeof defaultGetSettings === 'function'
    ? defaultGetSettings
    : /** @type {GetSettings} */ (sys) => sys.development;

  const settings = getSettings(system);

  // const dayInSeconds = 24 * 60 * 60;
  // const twelveHoursInSeconds = 12 * 60 * 60;
  const fortyMinutesInMilliseconds = 40 * 60 * 1000;
  const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

  // Dialogflow setup
  const app = new dialogflow.SessionsClient({
    keyFilename: getPath(/** @type {string} */ (settings.PROJECT_JSON))
  });

  const {
    // The token of your bot -
    // https://discordapp.com/developers/applications/me
    //  (set on settings.json)
    token,
    disableNotMentioned = false,
    welcomeChannel = 'welcome',
    awesomeEmoji = 'awesome',
    helpTeam = BAHAI_FYI_HELP_TEAM,
    rulesChannel = BAHAI_FYI_RULES_CHANNEL_ID
  } = settings;

  const _ = await i18n({
    localesBasePath: 'src',
    locales
  });

  /**
   * @type {GetLocalizedSetting}
   */
  const getLocalizedSetting = (key, {defaultValue} = {}) => {
    return settings?.locales?.[_.resolvedLocale][key] ||
      defaultValue || _(key);
  };

  const wikiTools = getWikiTools({
    fetch, striptags, _
  });

  // Import commands and set default command
  const guildCheckin = getCheckin({
    client, fs, wikiTools, settings, getLocalizedSetting, _
  });

  const botCommands = await getCommands({
    app, router, Discord,
    wikiTools, client, guildCheckin,
    _, getLocalizedSetting,
    fs, settings, discordTTS
  });

  /**
  * @callback ReadyListener
  * @returns {void}
  */

  // The ready event is vital, it means that your bot will only start
  //  reacting to information from Discord _after_ ready is emitted
  client.on('clientReady', /** @type {ReadyListener} */ () => {
    // eslint-disable-next-line no-console -- CLI
    console.log(_('BahaiBotOnline'));

    // To run immediately (as for testing), uncomment:
    // guildCheckin();

    if (!checkins) {
      return;
    }

    // Set presence to show help syntax

    client.user?.setPresence({
      activities: [{
        name: '@BahaiBot !help', type: 0 // 'PLAYING'
      }]
    });

    setSaferInterval((interval) => {
      const date = new Date();
      // console.log('Checking date', date,
      //  'hours?', date.getUTCHours(), 'minutes', date.getUTCMinutes());
      // 12pm UTC == 8am EST (8:00am-8:59am)
      if (date.getUTCHours() === 12) { // 0-23 UTC
        // console.log('Matches 12 hours');
        // To avoid running twice in the hour, bump forty minutes before
        //   next check
        if (date.getUTCMinutes() < 15) {
          // console.log('Under 15 minutes, so jumping 40');
          return fortyMinutesInMilliseconds - interval;
        }
        // console.log('Not under 15, so safe to execute');
        // 8:15am-8:59am EST (so safe to increment 50 minutes without
        //   recurring within the 8am EST (12pm UTC) window)
        guildCheckin();
      } /* else {
        console.log('FAILED check');
      } */
      // Keep normal supplied interval (`fiftyMinutesInMilliseconds`); we could
      //   also just return `undefined`
      return 0;
    }, fiftyMinutesInMilliseconds, {
      exitNoThrow
    });
  });

  // Process Bot Commands

  /**
  * @callback MessageListener
  * @param {import('discord.js').Message} msg
  * @returns {Promise<void>}
  */

  // Create an event listener for messages
  client.on(
    'messageCreate', /** @type {MessageListener} */ async (msg) => {
      // if (!msg.guildId) {
      //   return;
      // }
      const message = /** @type {import('discord.js').Message<true>} */ (msg);

      // Collect userID
      // Ensure that the bot is being messaged
      if (client.user && message.mentions.has(client.user)) {
        if (isUserAbusive(message)) {
          return;
        }
        /* MAIN FUNCTIONS */
        for (const command of Object.values(botCommands)) {
          // console.log('Command info',
          //  command.re, message.content, command.re.test(message.content)
          // );
          if (command.re.test(message.content)) {
            try {
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line no-await-in-loop -- Needs to be in series
              await command.action(message);
            /* c8 ignore start */
            } catch (err) {
              // eslint-disable-next-line no-console -- CLI
              console.error(
                _('errorExecuting')
              );
              // eslint-disable-next-line no-console -- CLI
              console.error(
                message.content, err
              );
            }
            client.emit('bahaibot:command-finished');
            /* c8 ignore stop */
            break;
          }
        }
        client.emit('bahaibot:command-finished');
      } else if (!disableNotMentioned) { // If the Bot is NOT Mentioned
        const notMentionedCommands = Object.values(
          botCommands
        ).filter((cmd) => {
          return cmd.notMentioned;
        });
        for (const {re, notMentioned} of notMentionedCommands) {
          if (re.test(message.content) &&
            (!notMentioned?.check ||
              // Any extra checks
              notMentioned.check(message))
          ) {
            // eslint-disable-next-line @stylistic/max-len -- Long
            // eslint-disable-next-line no-await-in-loop -- Needs to be in series
            await notMentioned?.action(message);
            client.emit('bahaibot:command-finished');
            break;
          }
        }
        client.emit('bahaibot:command-finished');
      }
    }
  );

  // EVENT BASED ACTIONS

  // New user added

  /**
  * @callback GuildMemberAddListener
  * @param {import('discord.js').GuildMember} ev
  * @returns {void}
  */

  client.on('guildMemberAdd', /** @type {GuildMemberAddListener} */ (ev) => {
    const wcChannel = ev.guild.channels.cache.find(
      (val) => val.name === welcomeChannel
    );
    if (!wcChannel || !wcChannel.isTextBased()) {
      return;
    }
    const awesome = client.emojis.cache.find(
      (val) => val.name === awesomeEmoji
    );

    const greetGuildMemberAdd = /** @type {string[]} */ (getLocalizedSetting(
      'greet-guildMemberAdd', {
        defaultValue: greets.guildMemberAdd
      }
    ));

    const greet = greetGuildMemberAdd[
      Math.floor(Math.random() * greetGuildMemberAdd.length)
    ]; // Pick a random greeting

    const happiesObj = getLocalizedSetting(
      'happies',
      {
        defaultValue: happies
      }
    );

    const happiesArray = awesome
      ? /** @type {{guildMemberAdd: (str: string) => string[]}} */ (
        happiesObj
      ).guildMemberAdd(awesome.toString())
      : /** @type {{guildMemberAdd: (str: string) => string[]}} */ (
        happiesObj
      ).guildMemberAdd(':smile:');

    const happy = happiesArray[
      Math.floor(Math.random() * happiesArray.length)
    ]; // Pick a random greeting

    wcChannel.send(
      /** @type {string} */ (_('guildMemberAddWelcome', {
        userID: `<@!${ev.user.id}>`,
        greet,
        happy,
        serverName: /** @type {string} */ (
          getLocalizedSetting('serverName')
        ),
        helpTeam: `<@&${helpTeam}>`,
        // eslint-disable-next-line @stylistic/max-len -- Long
        rulesChannel: ev.guild.channels.cache.get(rulesChannel)?.toString() ?? ''
      }))
    );
  });

  // Log our bot in
  client.login(/** @type {string} */ (token));

  return {client, botCommands, guildCheckin, system, getSettings};
};

// We could let the user rely on the (global) defaults for these instead of
//  baking in these two modules, but they would be forced to non-modularly
//  add script tags and rely on globals.

const {hash, search} = location;
const hashParams = hash.slice(1);

// GET LOCALE
const locales = [
  new URLSearchParams(hashParams).get('locales') ||
  new URLSearchParams(search).get('locales') || 'en_US'
];

// GET OTHER OPTIONS
const checkins = Boolean(new URLSearchParams(hashParams).get('checkins') ||
  new URLSearchParams(search).get('checkins'));

/**
 * @param {string} path
 * @returns {string}
 */
const getPath = (path) => {
  return `${location.href.replace(/\/$/v, '')}/${path}`;
};

// Note: These implementations are specific to our needs
const fs = /** @type {LimitedFs} */ ({
  /**
   * @param {string|URL} fileName
   * @returns {Promise<string>}
   */
  async readFile (fileName) {
    return await (await fetch(
      typeof fileName === 'object' && 'href' in fileName && fileName.href
        ? fileName.href
        : fileName
    )).text();
  },
  /**
   * @param {string} fileName
   * @param {string} data
   * @returns {void}
   */
  writeFile (fileName, data) {
    localStorage.setItem(`bahaibot-${fileName}`, String(data || Date.now()));
  },
  /**
   * @param {string} fileName
   * @returns {Promise<{mtime: Date}>}
   */
  stat (fileName) {
    return Promise.resolve({
      mtime: new Date(Number(localStorage.getItem(`bahaibot-${fileName}`)))
    });
  },
  /**
   * @param {string} fileName
   * @returns {void}
   */
  unlink (fileName) {
    localStorage.removeItem(fileName);
  }
});

/**
 * @template {object} T
 * @template {keyof T} K
 * @typedef {Omit<T, K> & Partial<Pick<T, K>>} SetOptional
 */

/**
 * @typedef {Pick<import('node:fs/promises'),
 *   'readFile'|'writeFile'|'stat'|'unlink'>} LimitedFs
 */

/**
 * This is created separately from `index.js` so as to allow testing files to
 * have Discord conveniently baked in, requiring case-by-case overrides only.
 * @param {SetOptional<import('./bot.js').BotOptions, 'getPath'|'fs'>} args
 * @returns {Promise<import('./bot.js').BotResponse>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    getPath,
    fs,
    fetch,
    i18n,
    /** @type {import('./getWikiTools.js').StripTags} */
    striptags: (str) => fe(str).result,
    // Todo: See about using https://github.com/mishushakov/dialogflow-web-v2
    //   to pass in as is (or with an adapter as needed) for our `dialogflow`
    //   argument, allowing the user to only neeed to pass in their own
    //   `Discord`
    ...args
  });
}

export { discordBot as default };
