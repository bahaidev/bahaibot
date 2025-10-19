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

var require$$0 = /*@__PURE__*/getAugmentedNamespace(browser);

var hasRequiredClock;

function requireClock () {
	if (hasRequiredClock) return clock;
	hasRequiredClock = 1;
	Object.defineProperty(clock, "__esModule", { value: true });
	clock.wait = clock.getMilliseconds = void 0;
	const just_performance_1 = require$$0;
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

        const member = await message.guild.members.fetch({
          user,
          withPresences: true
        });
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
 * @param {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} cfg.DiscordVoice
 * @returns {import('./getCommands.js').BotCommands}
 */
const getAdmin = ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  DiscordVoice,
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
        const connection = DiscordVoice.joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = DiscordVoice.createAudioPlayer();

        player.play(
          DiscordVoice.createAudioResource(discordTTS.getVoiceStream(words))
        );
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
          return Boolean(message.mentions.users?.first());
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
          return Boolean(message.mentions.users.first());
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
 * @param {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} cfg.DiscordVoice
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
  discordTTS,
  DiscordVoice
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
      discordTTS, DiscordVoice
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
 * @property {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} DiscordVoice
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
 *   'fs' | 'dialogflow' | 'Discord' | 'discordTTS' | 'DiscordVoice'
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
  DiscordVoice,
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
    fs, settings, discordTTS, DiscordVoice
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
function integratedClientServerBot (args) {
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

export { integratedClientServerBot as default };
