function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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

// We want it to work in the browser, so commenting out
// import jsonExtra from 'json5';
// import jsonExtra from 'json-6';
var _jsonExtra = globalThis.jsonExtra;
var unescapeBackslashes = function unescapeBackslashes(str) {
  return str.replace(/\\+/g, function (esc) {
    return esc.slice(0, esc.length / 2);
  });
};
var parseJSONExtra = function parseJSONExtra(args) {
  return _jsonExtra.parse( // Doesn't actually currently allow explicit brackets,
  //  but in case we change our regex to allow inner brackets
  '{' + (args || '').replace(/^\{/, '').replace(/\}$/, '') + '}');
}; // Todo: Extract to own library (RegExtras?)

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
var _fetch = typeof fetch !== 'undefined' // istanbul ignore next
? fetch : null;
/**
 * @returns {fetch}
 */

var getFetch = function getFetch() {
  return _fetch;
};

var _doc = typeof document !== 'undefined' // istanbul ignore next
? document : null;
/**
 * @returns {document}
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
  /* istanbul ignore next */

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

var sort = function sort(locale, arrayOfItems, options) {
  return arrayOfItems.sort(new Intl.Collator(locale, options).compare);
};
var list = function list(locale, arrayOfItems, options) {
  return new Intl.ListFormat(locale, options).format(arrayOfItems);
};
var sortListSimple = function sortListSimple(locale, arrayOfItems, listOptions, collationOptions) {
  sort(locale, arrayOfItems, collationOptions);
  return list(locale, arrayOfItems, listOptions);
};
var sortList = function sortList(locale, arrayOfItems, map, listOptions, collationOptions) {
  if (typeof map !== 'function') {
    return sortListSimple(locale, arrayOfItems, map, listOptions);
  }

  sort(locale, arrayOfItems, collationOptions);
  var randomId = generateUUID();

  var placeholderArray = _toConsumableArray(arrayOfItems).map(function (_, i) {
    return "<<".concat(randomId).concat(i, ">>");
  });

  var nodes = [];

  var push = function push() {
    nodes.push.apply(nodes, arguments);
  };

  processRegex( // // eslint-disable-next-line prefer-named-capture-group
  new RegExp("<<".concat(randomId, "(\\d)>>"), 'gu'), list(locale, placeholderArray, listOptions), {
    betweenMatches: push,
    afterMatch: push,
    onMatch: function onMatch(_, idx) {
      push(map(arrayOfItems[idx], idx));
    }
  });

  var _doc = getDocument();

  var container = _doc.createDocumentFragment();

  container.append.apply(container, nodes);
  return container;
};

var getFormatterInfo = function getFormatterInfo(_ref) {
  var object = _ref.object;

  if (Array.isArray(object)) {
    if (typeof object[1] === 'function') {
      var _object = _slicedToArray(object, 4),
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
/* eslint-disable max-len */

/**
 * Callback to give replacement text based on a substitution value.
 * @callback AllSubstitutionCallback
 * @param {PlainObject} cfg
 * @param {string|Node|number|Date|RelativeTimeInfo|ListInfo|NumberInfo|DateInfo} cfg.value Contains
 *   the value returned by the individual substitution
 * @param {string} cfg.arg See `cfg.arg` of {@link SubstitutionCallback}.
 * @param {string} cfg.key The substitution key Not currently in use
 * @param {string} cfg.locale The locale
 * @returns {string|Element} The replacement text or element
*/

/* eslint-enable max-len */

/**
 * @type {AllSubstitutionCallback}
 */

var defaultAllSubstitutions = function defaultAllSubstitutions(_ref2) {
  var _Intl$DateTimeFormat;

  var value = _ref2.value,
      arg = _ref2.arg;
      _ref2.key;
      var locale = _ref2.locale;

  // Strings or DOM Nodes
  if (typeof value === 'string' || value && _typeof(value) === 'object' && 'nodeType' in value) {
    return value;
  }

  var opts;

  var applyArgs = function applyArgs(_ref3) {
    var type = _ref3.type,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? opts : _ref3$options,
        _ref3$checkArgOptions = _ref3.checkArgOptions,
        checkArgOptions = _ref3$checkArgOptions === void 0 ? false : _ref3$checkArgOptions;

    if (typeof arg === 'string') {
      var _arg$split = arg.split('|'),
          _arg$split2 = _slicedToArray(_arg$split, 3),
          userType = _arg$split2[0],
          extraArgs = _arg$split2[1],
          argOptions = _arg$split2[2]; // Alias


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

      var _getFormatterInfo = getFormatterInfo({
        object: value[singleKey]
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
          return (_Intl$DateTimeFormat = new Intl.DateTimeFormat(locale, applyArgs({
            type: 'DATERANGE',
            options: extraOpts
          }))).formatRange.apply(_Intl$DateTimeFormat, _toConsumableArray([value, opts].map(function (val) {
            return typeof val === 'number' ? new Date(val) : val;
          })));

        case 'region':
        case 'language':
        case 'script':
        case 'currency':
          return new Intl.DisplayNames(locale, _objectSpread2(_objectSpread2({}, applyArgs({
            type: singleKey.toUpperCase()
          })), {}, {
            type: singleKey
          })).of(value);

        case 'relative':
          // The second argument actually contains the primary options, so swap
          var _ref4 = [opts, extraOpts];
          extraOpts = _ref4[0];
          opts = _ref4[1];
          return new Intl.RelativeTimeFormat(locale, applyArgs({
            type: 'RELATIVE'
          })).format(value, extraOpts);
        // ListFormat (with Collator)

        case 'list':
          if (callback) {
            return sortList(locale, value, callback, applyArgs({
              type: 'LIST'
            }), applyArgs({
              type: 'LIST',
              options: extraOpts,
              checkArgOptions: true
            }));
          }

          return sortList(locale, value, applyArgs({
            type: 'LIST'
          }), applyArgs({
            type: 'LIST',
            options: extraOpts,
            checkArgOptions: true
          }));
      }
    }
  } // Dates


  if (value) {
    if (typeof value === 'number' && (expectsDatetime || /^DATE(?:TIME)(?:\||$)/.test(arg))) {
      value = new Date(value);
    }

    if (_typeof(value) === 'object' && typeof value.getTime === 'function') {
      return new Intl.DateTimeFormat(locale, applyArgs({
        type: 'DATETIME'
      })).format(value);
    }
  } // Date range


  if (Array.isArray(value)) {
    var _Intl$DateTimeFormat2;

    var _extraOpts2 = value[2];
    return (_Intl$DateTimeFormat2 = new Intl.DateTimeFormat(locale, applyArgs({
      type: 'DATERANGE',
      options: _extraOpts2
    }))).formatRange.apply(_Intl$DateTimeFormat2, _toConsumableArray(value.slice(0, 2).map(function (val) {
      return typeof val === 'number' ? new Date(val) : val;
    })));
  } // Numbers


  if (typeof value === 'number') {
    return new Intl.NumberFormat(locale, applyArgs({
      type: 'NUMBER'
    })).format(value);
  } // console.log('value', value);


  throw new TypeError('Unknown formatter');
};

/**
 * Base class for formatting.
 */

var Formatter = function Formatter() {
  _classCallCheck(this, Formatter);
};
/**
 * @param {PlainObject} cfg
 * @param {string} cfg.key
 * @param {LocaleBody} cfg.body
 * @param {string} cfg.type
 * @param {"richNested"|"rich"|"plain"|MessageStyleCallback} cfg.messageStyle
 * @returns {string|Element}
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
  } // We don't allow a substitution function here or below as comes
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
   * @param {LocalObject} locals
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
      var parent = this.locals;
      return this.constructor.isMatchingKey(key) && components.every(function (cmpt) {
        var result = (cmpt in parent);
        parent = parent[cmpt];
        return result;
      });
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
   * @param {SubstitutionObject} substitutions
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
      return this.constructor.isMatchingKey(key) && key in this.substitutions;
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
   * @param {Switches} switches
   * @param {SubstitutionObject} substitutions
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
   * @param {PlainObject} cfg
   * @param {string} cfg.locale
   * @param {string[]} cfg.usedKeys
   * @param {string} cfg.arg
   * @param {MissingSuppliedFormattersCallback} cfg.missingSuppliedFormatters
   * @returns {string}
   */


  _createClass(SwitchFormatter, [{
    key: "getSubstitution",
    value: function getSubstitution(key, _ref3) {
      var locale = _ref3.locale,
          usedKeys = _ref3.usedKeys,
          arg = _ref3.arg,
          missingSuppliedFormatters = _ref3.missingSuppliedFormatters;
      var ky = this.constructor.getKey(key).slice(1); // Expression might not actually use formatter, e.g., for singular,
      //  the conditional might just write out "one"

      var _this$getMatch = this.getMatch(ky),
          _this$getMatch2 = _slicedToArray(_this$getMatch, 3),
          objKey = _this$getMatch2[0],
          body = _this$getMatch2[1],
          keySegment = _this$getMatch2[2];

      usedKeys.push(keySegment);
      var type, opts;

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


      var getNumberFormat = function getNumberFormat(value, defaultOptions) {
        var numberOpts = parseJSONExtra(opts);
        return new Intl.NumberFormat(locale, _objectSpread2(_objectSpread2({}, defaultOptions), numberOpts)).format(value);
      };

      var getPluralFormat = function getPluralFormat(value, defaultOptions) {
        var pluralOpts = parseJSONExtra(opts);
        return new Intl.PluralRules(locale, _objectSpread2(_objectSpread2({}, defaultOptions), pluralOpts)).select(value);
      };

      var formatterValue = this.substitutions[keySegment];
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
            object: formatterValue[singleKey]
          }),
              value = _getFormatterInfo.value,
              options = _getFormatterInfo.options;

          if (!type) {
            type = singleKey.toUpperCase();
          }

          var typeMatches = singleKey.toUpperCase() === type;

          if (!typeMatches) {
            throw new TypeError("Expecting type \"".concat(type.toLowerCase(), "\"; instead found \"").concat(singleKey, "\"."));
          } // eslint-disable-next-line default-case


          switch (type) {
            case 'NUMBER':
              match = getNumberFormat(value, options);
              break;

            case 'PLURAL':
              match = getPluralFormat(value, options);
              break;
          }
        }
      } // We do not want the default `richNested` here as that will split
      //  up the likes of `0.0`


      var messageStyle = 'richNested';

      var preventNesting = function preventNesting(s) {
        return s.replace(/\\/g, '\\\\').replace(/\./g, '\\.');
      };

      try {
        return _getSubstitution({
          messageStyle: messageStyle,
          key: match ? preventNesting(match) : arg,
          body: body,
          type: 'switch'
        });
      } catch (err) {
        try {
          return _getSubstitution({
            messageStyle: messageStyle,
            key: '*' + preventNesting(match),
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
      return key && this.constructor.isMatchingKey(key) && Boolean(this.getMatch(key.slice(1)).length);
    }
    /**
    * @typedef {GenericArray} SwitchMatch
    * @property {string} 0 objKey
    * @property {LocaleBody} 1 body
    * @property {string} 2 keySegment
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
      return ks.reduce(function (obj, k, i) {
        if (i < ks.length - 1) {
          if (!(k in obj)) {
            throw new Error("Switch key \"".concat(k, "\" not found (from \"~").concat(ky, "\")"));
          }

          return obj[k];
        } // Todo: Should throw on encountering duplicate fundamental keys (even
        //  if there are different arguments, that should not be allowed)


        var ret = Object.entries(obj).find(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              switchKey = _ref5[0];

          return k === _this4.constructor.getKey(switchKey);
        });
        return ret ? [].concat(_toConsumableArray(ret), [k]) : [];
      }, this.switches);
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
      var match = key.match(/^(?:(?!\|)[\s\S])*/);
      return match && match[0];
    }
  }]);

  return SwitchFormatter;
}(Formatter);

/**
* @callback PromiseChainErrback
* @param {any} errBack
* @returns {Promise<any>|any}
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
  if (direct) {
    return then ? then(value) : value;
  }

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

    if (update) {
      var updateValue = update();

      if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
        stage = 2;
        break;
      }
    }
  }

  var pact = new _Pact();

  var reject = _settle.bind(null, pact, 2);

  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;

  function _resumeAfterBody(value) {
    result = value;

    do {
      if (update) {
        updateValue = update();

        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          updateValue.then(_resumeAfterUpdate).then(void 0, reject);
          return;
        }
      }

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
        } // We allow one more try


        if (!values.length) {
          breaking = true;
        } // // eslint-disable-next-line no-await-in-loop


        p = errBack(value);
      });
    }), function (_result2) {
      return ret;
    });
  })();
};

/**
* @callback SubstitutionCallback
* @param {PlainObject} cfg
* @param {string} cfg.arg By default, accepts the third portion of the
*   `formattingRegex` within `insertNodes`, i.e., to allow the locale to
*   supply arguments back to the calling script.
* @param {string} cfg.key The substitution key
* @returns {string|Element} The replacement text or element
*/

/**
 * May have additional properties if supplying options to an underlying
 * formatter.
 * @typedef {GenericArray} ValueArray
 * @property {string|Node|number|Date} 0 The main value
 * @property {PlainObject} [1] The options related to the main value
 * @property {PlainObject} [2] Any additional options
*/

/**
* @typedef {PlainObject} RelativeTimeInfo
* @property {ValueArray} relative
*/

/**
* @typedef {PlainObject} ListInfo
* @property {ValueArray} list
*/

/**
* @typedef {PlainObject} NumberInfo
* @property {ValueArray} number
*/

/**
* @typedef {PlainObject} DateInfo
* @property {ValueArray} date
*/

/**
* @typedef {Object<string, string>} PlainLocaleStringBodyObject
*/

/**
* @typedef {PlainObject} SwitchCaseInfo
* @property {boolean} [default=false] Whether this conditional is the default
*/

/**
* @typedef {GenericArray} SwitchCase
* @property {string} 0 The type
* @property {string} 1 The message
* @property {SwitchCaseInfo} [2] Info about the switch case
*/

/**
* @typedef {PlainObject<string, SwitchCase>} Switch
*/

/**
* @typedef {PlainObject<{string, Switch}>} Switches
*/

/**
* @typedef {PlainObject} LocaleStringSubObject
* @property {string} [message] The locale message with any formatting
*   place-holders; defaults to use of any single conditional
* @property {string} [description] A description to add translators
* @property {Switches} [switches] Conditionals
*/

/**
* @typedef {PlainObject<string, LocaleStringSubObject>} LocaleStringBodyObject
*/

/**
 * Takes a base path and locale and gives a URL.
 * @callback LocaleResolver
 * @param {string} localesBasePath (Trailing slash optional)
 * @param {string} locale BCP-47 language string
 * @returns {string} URL of the locale file to be fetched
*/

/**
* @typedef {PlainObject<string, string|Element|
* SubstitutionCallback>} SubstitutionObject
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

/* eslint-disable max-len */

/**
 * Callback to return a string or array of nodes and strings based on a localized
 * string, substitutions object, and other metadata.
 * @callback InsertNodesCallback
 * @param {PlainObject} cfg
 * @param {string} cfg.string The localized string
 * @param {boolean} [cfg.dom] If substitutions known to contain DOM, can be set
 *   to `true` to optimize
 * @param {string[]} [cfg.usedKeys=[]] Array for tracking which keys have been used
 * @param {SubstitutionObject} cfg.substitutions The formatting substitutions object
 * @param {?(AllSubstitutionCallback|AllSubstitutionCallback[])} [cfg.allSubstitutions] The
 *   callback or array composed thereof for applying to each substitution.
 * @param {string} locale The successfully resolved locale
 * @param {Integer} [maximumLocalNestingDepth=3] Depth of local variable resolution to
 *   check before reporting a recursion error
 * @param {MissingSuppliedFormattersCallback} [cfg.missingSuppliedFormatters] Callback
 *   supplied key to throw if the supplied key is present (if
 *   `throwOnMissingSuppliedFormatters` is enabled). Defaults to no-op.
 * @param {CheckExtraSuppliedFormattersCallback} [cfg.checkExtraSuppliedFormatters] No
 *   argument callback to check if any formatters are not present in `string`
 *   (if `throwOnExtraSuppliedFormatters` is enabled). Defaults to no-op.
 * @returns {string|Array<Node|string>}
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
  var localFormatter = new LocalFormatter(locals);
  var regularFormatter = new RegularFormatter(substitutions);
  var switchFormatter = new SwitchFormatter(switches, {
    substitutions: substitutions
  }); // eslint-disable-next-line max-len
  // eslint-disable-next-line prefer-named-capture-group, unicorn/no-unsafe-regex

  var formattingRegex = /(\\*)\{((?:(?:(?!\})[\s\S])|\\\})*?)(?:(\|)((?:(?!\})[\s\S])*))?\}/g;

  if (allSubstitutions) {
    allSubstitutions = Array.isArray(allSubstitutions) ? allSubstitutions : [allSubstitutions];
  }

  var getSubstitution = function getSubstitution(_ref4) {
    var key = _ref4.key,
        arg = _ref4.arg,
        substs = _ref4.substs;
    var substitution;
    var isLocalKey = localFormatter.constructor.isMatchingKey(key);

    if (isLocalKey) {
      substitution = localFormatter.getSubstitution(key);
    } else if (switchFormatter.constructor.isMatchingKey(key)) {
      substitution = switchFormatter.getSubstitution(key, {
        locale: locale,
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
    } // Todo: Could support resolving locals within arguments
    // Todo: Even for `null` `allSubstitutions`, we could have
    //  a mode to throw for non-string/non-DOM (non-numbers?),
    //  or whatever is not likely intended as a target for `toString()`.


    if (allSubstitutions) {
      substitution = allSubstitutions.reduce(function (subst, allSubst) {
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

    return substitution;
  };

  var recursiveLocalCount = 1;

  var checkLocalVars = function checkLocalVars(_ref5) {
    var substitution = _ref5.substitution,
        ky = _ref5.ky,
        arg = _ref5.arg,
        processSubsts = _ref5.processSubsts;

    if (typeof substitution === 'string' && substitution.includes('{')) {
      if (recursiveLocalCount++ > maximumLocalNestingDepth) {
        throw new TypeError('Too much recursion in local variables.');
      }

      if (localFormatter.constructor.isMatchingKey(ky)) {
        var extraSubsts = substitutions;
        var localFormatters;

        if (arg) {
          localFormatters = parseJSONExtra(arg);
          extraSubsts = _objectSpread2(_objectSpread2({}, substitutions), localFormatters);
        }

        substitution = processSubsts({
          str: substitution,
          substs: extraSubsts,
          formatter: localFormatter
        });

        if (localFormatters) {
          checkExtraSuppliedFormatters({
            substitutions: localFormatters
          });
        }
      } else if (switchFormatter.constructor.isMatchingKey(ky)) {
        substitution = processSubsts({
          str: substitution
        });
      }
    }

    return substitution;
  }; // Give chance to avoid this block when known to contain DOM


  if (!dom) {
    // Run this block to optimize non-DOM substitutions
    var returnsDOM = false;

    var replace = function replace(_ref6) {
      var str = _ref6.str,
          _ref6$substs = _ref6.substs,
          substs = _ref6$substs === void 0 ? substitutions : _ref6$substs,
          _ref6$formatter = _ref6.formatter,
          formatter = _ref6$formatter === void 0 ? regularFormatter : _ref6$formatter;
      return str.replace(formattingRegex, function (_, esc, ky, pipe, arg) {
        if (esc.length % 2) {
          return _;
        }

        if (missingSuppliedFormatters({
          key: ky,
          formatter: formatter
        })) {
          return _;
        }

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
        returnsDOM = returnsDOM || substitution && _typeof(substitution) === 'object' && 'nodeType' in substitution;
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

  var processSubstitutions = function processSubstitutions(_ref7) {
    var str = _ref7.str,
        _ref7$substs = _ref7.substs,
        substs = _ref7$substs === void 0 ? substitutions : _ref7$substs,
        _ref7$formatter = _ref7.formatter,
        formatter = _ref7$formatter === void 0 ? regularFormatter : _ref7$formatter;
    var nodes = []; // Copy to ensure we are resetting index on each instance (manually
    // resetting on `formattingRegex` is problematic with recursion that
    // uses the same regex copy)

    var regex = new RegExp(formattingRegex, 'gu');

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
          } else if ( // Clone so that multiple instances may be added (and no
          // side effects to user code)
          substitution && _typeof(substitution) === 'object' && 'nodeType' in substitution) {
            push(substitution.cloneNode(true));
          } else {
            push(substitution);
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
* @typedef {LocaleBody} LocalObject
*/

/**
 * May also contain language code and direction, translator name and
 * contact, etc., but no defaults currently apply besides reserving `locals`
 * @typedef {PlainObject} LocaleHead
 * @property {LocalObject} locals
*/

/**
* @typedef {LocaleStringBodyObject|
* PlainLocaleStringBodyObject|PlainObject} LocaleBody
*/

/**
* @typedef {PlainObject} LocaleObject
* @property {LocaleHead} [head]
* @property {LocaleBody} body
*/

/**
* @typedef {PlainObject} MessageStyleCallbackResult
* @property {string} value Regardless of message style, will contain the
*   string result
* @property {LocaleStringSubObject} [info] Full info on the localized item
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
 * @param {PlainObject} [cfg]
 * @param {"richNested"|"rich"|"plain"|MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @returns {MessageStyleCallback}
 */

var getMessageForKeyByStyle = function getMessageForKeyByStyle() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$messageStyle = _ref.messageStyle,
      messageStyle = _ref$messageStyle === void 0 ? 'richNested' : _ref$messageStyle;

  // Todo: Support `plainNested` style
  return typeof messageStyle === 'function' ? messageStyle : messageStyle === 'richNested' ? function (mainObj, key) {
    var obj = mainObj && _typeof(mainObj) === 'object' && mainObj.body;
    var keys = []; // eslint-disable-next-line prefer-named-capture-group

    var possiblyEscapedCharPattern = /(\\*)\./g;

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
    var ret = false;
    var currObj = obj;
    keysUnescaped.some(function (ky, i, kys) {
      if (!currObj || _typeof(currObj) !== 'object') {
        return true;
      }

      if ( // If specified key is too deep, we should fail
      i === kys.length - 1 && ky in currObj && currObj[ky] && _typeof(currObj[ky]) === 'object' && 'message' in currObj[ky] && // NECESSARY FOR SECURITY ON UNTRUSTED LOCALES
      typeof currObj[ky].message === 'string') {
        ret = {
          value: currObj[ky].message,
          info: currObj[ky]
        };
      }

      currObj = currObj[ky];
      return false;
    });
    return ret;
  } : messageStyle === 'rich' ? function (mainObj, key) {
    var obj = mainObj && _typeof(mainObj) === 'object' && mainObj.body;

    if (obj && _typeof(obj) === 'object' && key in obj && obj[key] && _typeof(obj[key]) === 'object' && 'message' in obj[key] && // NECESSARY FOR SECURITY ON UNTRUSTED LOCALES
    typeof obj[key].message === 'string') {
      return {
        value: obj[key].message,
        info: obj[key]
      };
    }

    return false;
  } : messageStyle === 'plain' ? function (mainObj, key) {
    var obj = mainObj && _typeof(mainObj) === 'object' && mainObj.body;

    if (obj && _typeof(obj) === 'object' && key in obj && obj[key] && typeof obj[key] === 'string') {
      return {
        value: obj[key]
      };
    }

    return false;
  } : function () {
    throw new TypeError("Unknown `messageStyle` ".concat(messageStyle));
  }();
};

/* eslint-disable max-len */

/**
 * @param {PlainObject} cfg
 * @param {string} [cfg.message] If present, this string will be the return value.
 * @param {false|null|undefined|LocaleObject} [cfg.defaults]
 * @param {"richNested"|"rich"|"plain"|MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @param {MessageStyleCallback} [cfg.messageForKey] Defaults to getting `MessageStyleCallback` based on `messageStyle`
 * @param {string} cfg.key Key to check against object of strings; used to find a default if no string `message` is provided.
 * @returns {string}
 */

var getStringFromMessageAndDefaults = function getStringFromMessageAndDefaults() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      message = _ref.message,
      defaults = _ref.defaults,
      messageStyle = _ref.messageStyle,
      _ref$messageForKey = _ref.messageForKey,
      messageForKey = _ref$messageForKey === void 0 ? getMessageForKeyByStyle({
    messageStyle: messageStyle
  }) : _ref$messageForKey,
      key = _ref.key;

  if (typeof key !== 'string') {
    throw new TypeError('An options object with a `key` string is expected on ' + '`getStringFromMessageAndDefaults`');
  } // NECESSARY CHECK FOR SECURITY ON UNTRUSTED LOCALES


  var str;

  if (typeof message === 'string') {
    str = message;
  } else if (defaults === false || defaults === undefined || defaults === null) {
    str = false;
  } else if (defaults && _typeof(defaults) === 'object') {
    str = messageForKey({
      body: defaults
    }, key);

    if (str) {
      str = str.value;
    }
  } else {
    throw new TypeError("Default locale strings must resolve to `false`, " + "nullish, or an object!");
  }

  if (str === false) {
    throw new Error("Key value not found for key: (".concat(key, ")"));
  }

  return str;
};

/* eslint-disable max-len */

/**
 *
 * @param {PlainObject} cfg
 * @param {string} cfg.string
 * @param {string} cfg.locale The (possibly already resolved) locale for use by
 *   configuring formatters
 * @param {LocalObject} [cfg.locals]
 * @param {LocalObject} [cfg.switches]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {?(AllSubstitutionCallback|AllSubstitutionCallback[])} [cfg.allSubstitutions=[defaultAllSubstitutions]]
 * @param {InsertNodesCallback} [cfg.insertNodes=defaultInsertNodes]
 * @param {false|SubstitutionObject} [cfg.substitutions=false]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {string|DocumentFragment}
 */

var getDOMForLocaleString = function getDOMForLocaleString() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      string = _ref.string,
      locale = _ref.locale,
      locals = _ref.locals,
      switches = _ref.switches;
      _ref.maximumLocalNestingDepth;
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

  var stringOrTextNode = function stringOrTextNode(str) {
    var _doc = getDocument();

    return forceNodeReturn ? _doc.createTextNode(str) : str;
  };

  var usedKeys = [];
  /**
  * @callback CheckExtraSuppliedFormattersCallback
  * @param {SubstitutionObject} substs
  * @throws {Error} Upon an extra formatting key being found
  * @returns {void}
  */

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
  * @callback MissingSuppliedFormattersCallback
  * @param {string} key
  * @param {SubstitutionObject} substs
  * @throws {Error} If missing formatting key
  * @returns {boolean}
  */

  /**
   * @type {MissingSuppliedFormattersCallback}
   */


  var missingSuppliedFormatters = function missingSuppliedFormatters(_ref3) {
    var key = _ref3.key,
        formatter = _ref3.formatter;
    var matching = formatter.isMatch(key);

    if (formatter.constructor.isMatchingKey(key) && !matching) {
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

  var container = _doc.createDocumentFragment();

  container.append.apply(container, _toConsumableArray(nodes));
  return container;
};

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}
/**
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
  } // Try without hyphen, i.e., the "lookup" algorithm:
  // See https://tools.ietf.org/html/rfc4647#section-3.4 and
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl


  return locale.replace(/\x2D(?:(?!\x2D)[\s\S])*$/, '');
};
/**
* @typedef {PlainObject} LocaleObjectInfo
* @property {LocaleObject} strings The successfully retrieved locale strings
* @property {string} locale The successfully resolved locale
*/

/**
 * @callback LocaleStringFinder
 * @param {PlainObject} [cfg={}]
 * @param {string[]} [cfg.locales=navigator.languages] BCP-47 language strings
 * @param {string[]} [cfg.defaultLocales=["en-US"]]
 * @param {string} [cfg.localesBasePath="."]
 * @param {LocaleResolver} [cfg.localeResolver=defaultLocaleResolver]
 * @param {"lookup"|LocaleMatcher} [cfg.localeMatcher]
 * @returns {Promise<LocaleObjectInfo>}
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

  return _findLocale({
    locales: locales,
    defaultLocales: defaultLocales,
    localeResolver: localeResolver,
    localesBasePath: localesBasePath,
    localeMatcher: localeMatcher
  });
};
/**
 * @type {LocaleStringFinder|LocaleFinder} Also has a `headOnly` boolean
 *  property to determine whether to make a simple HEAD and resolve to
 *  the locale rather than locale and contents
 */

var _findLocale = _async(function (_ref4) {
  /**
   * @callback getLocale
   * @throws {SyntaxError|TypeError|Error}
   * @param {string} locale
   * @returns {Promise<LocaleObjectInfo>}
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
      var _fetch = getFetch();

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
      if (err.name === 'SyntaxError') {
        throw err;
      }

      return _await$1(localeMatcher(locale), getLocale);
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

  return promiseChainForValues([].concat(_toConsumableArray(locales), _toConsumableArray(defaultLocales)), getLocale, 'No matching locale found!');
});

/**
 * Checks a key (against an object of strings). Optionally
 *  accepts an object of substitutions which are used when finding text
 *  within curly brackets (pipe symbol not allowed in its keys); the
 *  substitutions may be DOM elements as well as strings and may be
 *  functions which return the same (being provided the text after the
 *  pipe within brackets as the single argument).) Optionally accepts a
 *  config object, with the optional key "dom" which if set to `true`
 *  optimizes when DOM elements are (known to be) present.
 * @callback I18NCallback
 * @param {string} key Key to check against object of strings
 * @param {false|SubstitutionObject} [substitutions=false]
 * @param {PlainObject} [cfg={}]
 * @param {boolean} [cfg.dom=false]
 * @returns {string|DocumentFragment}
*/

/* eslint-disable max-len */

/**
 * @param {PlainObject} cfg
 * @param {LocaleObject} cfg.strings
 * @param {string} cfg.resolvedLocale
 * @param {"richNested"|"rich"|"plain"|MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @param {?AllSubstitutionCallback|AllSubstitutionCallback[]} [cfg.allSubstitutions]
 * @param {InsertNodesCallback} [cfg.insertNodes=defaultInsertNodes]
 * @param {false|null|undefined|LocaleObject} [cfg.defaults]
 * @param {false|SubstitutionObject} [cfg.substitutions={}]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {Promise<I18NCallback>} Rejects if no suitable locale is found.
 */

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}
/* eslint-disable max-len */

/**
 * @param {PlainObject} [cfg={}]
 * @param {string[]} [cfg.locales=navigator.languages] BCP-47 language strings
 * @param {string[]} [cfg.defaultLocales=["en-US"]]
 * @param {LocaleStringFinder} [cfg.localeStringFinder=findLocaleStrings]
 * @param {string} [cfg.localesBasePath="."]
 * @param {LocaleResolver} [cfg.localeResolver=defaultLocaleResolver]
 * @param {"lookup"|LocaleMatcher} [cfg.localeMatcher="lookup"]
 * @param {"richNested"|"rich"|"plain"|MessageStyleCallback} [cfg.messageStyle="richNested"]
 * @param {?AllSubstitutionCallback|AllSubstitutionCallback[]} [cfg.allSubstitutions]
 * @param {InsertNodesCallback} [cfg.insertNodes=defaultInsertNodes]
 * @param {false|null|undefined|LocaleObject} [cfg.defaults]
 * @param {false|SubstitutionObject} [cfg.substitutions={}]
 * @param {Integer} [cfg.maximumLocalNestingDepth=3]
 * @param {boolean} [cfg.dom=false]
 * @param {boolean} [cfg.forceNodeReturn=false]
 * @param {boolean} [cfg.throwOnMissingSuppliedFormatters=true]
 * @param {boolean} [cfg.throwOnExtraSuppliedFormatters=true]
 * @returns {Promise<I18NCallback>} Rejects if no suitable locale is found.
 */


var i18nServer = function i18nServer(_ref) {
  var strings = _ref.strings,
      resolvedLocale = _ref.resolvedLocale,
      messageStyle = _ref.messageStyle,
      defaultAllSubstitutionsValue = _ref.allSubstitutions,
      insertNodes = _ref.insertNodes,
      defaultDefaults = _ref.defaults,
      defaultSubstitutions = _ref.substitutions,
      maximumLocalNestingDepth = _ref.maximumLocalNestingDepth,
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
      maximumLocalNestingDepth: maximumLocalNestingDepth,
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

  formatter.sort = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return sort.apply(void 0, [resolvedLocale].concat(args));
  };

  formatter.sortList = function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return sortList.apply(void 0, [resolvedLocale].concat(args));
  };

  formatter.list = function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return list.apply(void 0, [resolvedLocale].concat(args));
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
      return i18nServer({
        strings: strings,
        resolvedLocale: resolvedLocale,
        messageStyle: messageStyle,
        allSubstitutions: allSubstitutions,
        insertNodes: insertNodes,
        defaults: defaults,
        substitutions: substitutions,
        maximumLocalNestingDepth: maximumLocalNestingDepth,
        dom: dom,
        forceNodeReturn: forceNodeReturn,
        throwOnMissingSuppliedFormatters: throwOnMissingSuppliedFormatters,
        throwOnExtraSuppliedFormatters: throwOnExtraSuppliedFormatters
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var striptags$1 = {exports: {}};

(function (module) {

(function (global) {

    // minimal symbol polyfill for IE11 and others
    if (typeof Symbol !== 'function') {
        var Symbol = function(name) {
            return name;
        };

        Symbol.nonNative = true;
    }

    const STATE_PLAINTEXT = Symbol('plaintext');
    const STATE_HTML      = Symbol('html');
    const STATE_COMMENT   = Symbol('comment');

    const ALLOWED_TAGS_REGEX  = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;

    function striptags(html, allowable_tags, tag_replacement) {
        html            = html || '';
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return striptags_internal(html, context);
    }

    function init_striptags_stream(allowable_tags, tag_replacement) {
        allowable_tags  = allowable_tags || [];
        tag_replacement = tag_replacement || '';

        let context = init_context(allowable_tags, tag_replacement);

        return function striptags_stream(html) {
            return striptags_internal(html || '', context);
        };
    }

    striptags.init_streaming_mode = init_striptags_stream;

    function init_context(allowable_tags, tag_replacement) {
        allowable_tags = parse_allowable_tags(allowable_tags);

        return {
            allowable_tags : allowable_tags,
            tag_replacement: tag_replacement,

            state         : STATE_PLAINTEXT,
            tag_buffer    : '',
            depth         : 0,
            in_quote_char : ''
        };
    }

    function striptags_internal(html, context) {
        if (typeof html != "string") {
            throw new TypeError("'html' parameter must be a string");
        }

        let allowable_tags  = context.allowable_tags;
        let tag_replacement = context.tag_replacement;

        let state         = context.state;
        let tag_buffer    = context.tag_buffer;
        let depth         = context.depth;
        let in_quote_char = context.in_quote_char;
        let output        = '';

        for (let idx = 0, length = html.length; idx < length; idx++) {
            let char = html[idx];

            if (state === STATE_PLAINTEXT) {
                switch (char) {
                    case '<':
                        state       = STATE_HTML;
                        tag_buffer += char;
                        break;

                    default:
                        output += char;
                        break;
                }
            }

            else if (state === STATE_HTML) {
                switch (char) {
                    case '<':
                        // ignore '<' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // we're seeing a nested '<'
                        depth++;
                        break;

                    case '>':
                        // ignore '>' if inside a quote
                        if (in_quote_char) {
                            break;
                        }

                        // something like this is happening: '<<>>'
                        if (depth) {
                            depth--;

                            break;
                        }

                        // this is closing the tag in tag_buffer
                        in_quote_char = '';
                        state         = STATE_PLAINTEXT;
                        tag_buffer   += '>';

                        if (allowable_tags.has(normalize_tag(tag_buffer))) {
                            output += tag_buffer;
                        } else {
                            output += tag_replacement;
                        }

                        tag_buffer = '';
                        break;

                    case '"':
                    case '\'':
                        // catch both single and double quotes

                        if (char === in_quote_char) {
                            in_quote_char = '';
                        } else {
                            in_quote_char = in_quote_char || char;
                        }

                        tag_buffer += char;
                        break;

                    case '-':
                        if (tag_buffer === '<!-') {
                            state = STATE_COMMENT;
                        }

                        tag_buffer += char;
                        break;

                    case ' ':
                    case '\n':
                        if (tag_buffer === '<') {
                            state      = STATE_PLAINTEXT;
                            output    += '< ';
                            tag_buffer = '';

                            break;
                        }

                        tag_buffer += char;
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }

            else if (state === STATE_COMMENT) {
                switch (char) {
                    case '>':
                        if (tag_buffer.slice(-2) == '--') {
                            // close the comment
                            state = STATE_PLAINTEXT;
                        }

                        tag_buffer = '';
                        break;

                    default:
                        tag_buffer += char;
                        break;
                }
            }
        }

        // save the context for future iterations
        context.state         = state;
        context.tag_buffer    = tag_buffer;
        context.depth         = depth;
        context.in_quote_char = in_quote_char;

        return output;
    }

    function parse_allowable_tags(allowable_tags) {
        let tag_set = new Set();

        if (typeof allowable_tags === 'string') {
            let match;

            while ((match = ALLOWED_TAGS_REGEX.exec(allowable_tags))) {
                tag_set.add(match[1]);
            }
        }

        else if (!Symbol.nonNative &&
                 typeof allowable_tags[Symbol.iterator] === 'function') {

            tag_set = new Set(allowable_tags);
        }

        else if (typeof allowable_tags.forEach === 'function') {
            // IE11 compatible
            allowable_tags.forEach(tag_set.add, tag_set);
        }

        return tag_set;
    }

    function normalize_tag(tag_buffer) {
        let match = NORMALIZE_TAG_REGEX.exec(tag_buffer);

        return match ? match[1].toLowerCase() : null;
    }

    if (module.exports) {
        // Node
        module.exports = striptags;
    }

    else {
        // Browser
        global.striptags = striptags;
    }
}(commonjsGlobal));
}(striptags$1));

var striptags = striptags$1.exports;

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
 * @param {Float} [interval=1000]
 * @param {PlainObject} [cfg={}]
 * @param {boolean} cfg.exitNoThrow
 * @returns {void}
 */
function setSaferInterval (userTimeout, interval = 1000, {
  exitNoThrow = false
} = {}) {
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

var rateLimiter$1 = {};

var limiter = {};

/**
 * A hierarchical token bucket for rate limiting. See
 * http://en.wikipedia.org/wiki/Token_bucket for more information.
 * @author John Hurliman <jhurliman@cull.tv>
 *
 * @param {Number} bucketSize Maximum number of tokens to hold in the bucket.
 *  Also known as the burst rate.
 * @param {Number} tokensPerInterval Number of tokens to drip into the bucket
 *  over the course of one interval.
 * @param {String|Number} interval The interval length in milliseconds, or as
 *  one of the following strings: 'second', 'minute', 'hour', day'.
 * @param {TokenBucket} parentBucket Optional. A token bucket that will act as
 *  the parent of this bucket.
 */
var TokenBucket$1 = function(bucketSize, tokensPerInterval, interval, parentBucket) {
  this.bucketSize = bucketSize;
  this.tokensPerInterval = tokensPerInterval;

  if (typeof interval === 'string') {
    switch (interval) {
      case 'sec': case 'second':
        this.interval = 1000; break;
      case 'min': case 'minute':
        this.interval = 1000 * 60; break;
      case 'hr': case 'hour':
        this.interval = 1000 * 60 * 60; break;
      case 'day':
        this.interval = 1000 * 60 * 60 * 24; break;
      default:
        throw new Error('Invaid interval ' + interval);
    }
  } else {
    this.interval = interval;
  }

  this.parentBucket = parentBucket;
  this.content = 0;
  this.lastDrip = +new Date();
};

TokenBucket$1.prototype = {
  bucketSize: 1,
  tokensPerInterval: 1,
  interval: 1000,
  parentBucket: null,
  content: 0,
  lastDrip: 0,

  /**
   * Remove the requested number of tokens and fire the given callback. If the
   * bucket (and any parent buckets) contains enough tokens this will happen
   * immediately. Otherwise, the removal and callback will happen when enough
   * tokens become available.
   * @param {Number} count The number of tokens to remove.
   * @param {Function} callback(err, remainingTokens)
   * @returns {Boolean} True if the callback was fired immediately, otherwise
   *  false.
   */
  removeTokens: function(count, callback) {
    var self = this;

    // Is this an infinite size bucket?
    if (!this.bucketSize) {
      process.nextTick(callback.bind(null, null, count, Number.POSITIVE_INFINITY));
      return true;
    }

    // Make sure the bucket can hold the requested number of tokens
    if (count > this.bucketSize) {
      process.nextTick(callback.bind(null, 'Requested tokens ' + count + ' exceeds bucket size ' +
        this.bucketSize, null));
      return false;
    }

    // Drip new tokens into this bucket
    this.drip();

    // If we don't have enough tokens in this bucket, come back later
    if (count > this.content)
      return comeBackLater();

    if (this.parentBucket) {
      // Remove the requested from the parent bucket first
      return this.parentBucket.removeTokens(count, function(err, remainingTokens) {
        if (err) return callback(err, null);

        // Check that we still have enough tokens in this bucket
        if (count > self.content)
          return comeBackLater();

        // Tokens were removed from the parent bucket, now remove them from
        // this bucket and fire the callback. Note that we look at the current
        // bucket and parent bucket's remaining tokens and return the smaller
        // of the two values
        self.content -= count;
        callback(null, Math.min(remainingTokens, self.content));
      });
    } else {
      // Remove the requested tokens from this bucket and fire the callback
      this.content -= count;
      process.nextTick(callback.bind(null, null, this.content));
      return true;
    }

    function comeBackLater() {
      // How long do we need to wait to make up the difference in tokens?
      var waitInterval = Math.ceil(
        (count - self.content) * (self.interval / self.tokensPerInterval));
      setTimeout(function() { self.removeTokens(count, callback); }, waitInterval);
      return false;
    }
  },

  /**
   * Attempt to remove the requested number of tokens and return immediately.
   * If the bucket (and any parent buckets) contains enough tokens this will
   * return true, otherwise false is returned.
   * @param {Number} count The number of tokens to remove.
   * @param {Boolean} True if the tokens were successfully removed, otherwise
   *  false.
   */
  tryRemoveTokens: function(count) {
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
  },

  /**
   * Add any new tokens to the bucket since the last drip.
   * @returns {Boolean} True if new tokens were added, otherwise false.
   */
  drip: function() {
    if (!this.tokensPerInterval) {
      this.content = this.bucketSize;
      return;
    }

    var now = +new Date();
    var deltaMS = Math.max(now - this.lastDrip, 0);
    this.lastDrip = now;

    var dripAmount = deltaMS * (this.tokensPerInterval / this.interval);
    this.content = Math.min(this.content + dripAmount, this.bucketSize);
  }
};

var tokenBucket = TokenBucket$1;

var getMilliseconds$1 = function() {
  if (typeof process !== 'undefined' && process.hrtime) {
    var hrtime = process.hrtime();
    var seconds = hrtime[0];
    var nanoseconds = hrtime[1];

    return seconds * 1e3 +  Math.floor(nanoseconds / 1e6);
  }

  return new Date().getTime();
};

var clock = getMilliseconds$1;

var TokenBucket = tokenBucket;
var getMilliseconds = clock;

/**
 * A generic rate limiter. Underneath the hood, this uses a token bucket plus
 * an additional check to limit how many tokens we can remove each interval.
 * @author John Hurliman <jhurliman@jhurliman.org>
 *
 * @param {Number} tokensPerInterval Maximum number of tokens that can be
 *  removed at any given moment and over the course of one interval.
 * @param {String|Number} interval The interval length in milliseconds, or as
 *  one of the following strings: 'second', 'minute', 'hour', day'.
 * @param {Boolean} fireImmediately Optional. Whether or not the callback
 *  will fire immediately when rate limiting is in effect (default is false).
 */
var RateLimiter$1 = function(tokensPerInterval, interval, fireImmediately) {
  this.tokenBucket = new TokenBucket(tokensPerInterval, tokensPerInterval,
    interval, null);

  // Fill the token bucket to start
  this.tokenBucket.content = tokensPerInterval;

  this.curIntervalStart = getMilliseconds();
  this.tokensThisInterval = 0;
  this.fireImmediately = fireImmediately;
};

RateLimiter$1.prototype = {
  tokenBucket: null,
  curIntervalStart: 0,
  tokensThisInterval: 0,
  fireImmediately: false,

  /**
   * Remove the requested number of tokens and fire the given callback. If the
   * rate limiter contains enough tokens and we haven't spent too many tokens
   * in this interval already, this will happen immediately. Otherwise, the
   * removal and callback will happen when enough tokens become available.
   * @param {Number} count The number of tokens to remove.
   * @param {Function} callback(err, remainingTokens)
   * @returns {Boolean} True if the callback was fired immediately, otherwise
   *  false.
   */
  removeTokens: function(count, callback) {
    // Make sure the request isn't for more than we can handle
    if (count > this.tokenBucket.bucketSize) {
      process.nextTick(callback.bind(null, 'Requested tokens ' + count +
        ' exceeds maximum tokens per interval ' + this.tokenBucket.bucketSize,
        null));
      return false;
    }

    var self = this;
    var now = getMilliseconds();

    // Advance the current interval and reset the current interval token count
    // if needed
    if (now < this.curIntervalStart
      || now - this.curIntervalStart >= this.tokenBucket.interval) {
      this.curIntervalStart = now;
      this.tokensThisInterval = 0;
    }

    // If we don't have enough tokens left in this interval, wait until the
    // next interval
    if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval) {
      if (this.fireImmediately) {
        process.nextTick(callback.bind(null, null, -1));
      } else {
        var waitInterval = Math.ceil(
          this.curIntervalStart + this.tokenBucket.interval - now);

        setTimeout(function() {
          self.tokenBucket.removeTokens(count, afterTokensRemoved);
        }, waitInterval);
      }
      return false;
    }

    // Remove the requested number of tokens from the token bucket
    return this.tokenBucket.removeTokens(count, afterTokensRemoved);

    function afterTokensRemoved(err, tokensRemaining) {
      if (err) return callback(err, null);

      self.tokensThisInterval += count;
      callback(null, tokensRemaining);
    }
  },

  /**
   * Attempt to remove the requested number of tokens and return immediately.
   * If the bucket (and any parent buckets) contains enough tokens and we
   * haven't spent too many tokens in this interval already, this will return
   * true. Otherwise, false is returned.
   * @param {Number} count The number of tokens to remove.
   * @param {Boolean} True if the tokens were successfully removed, otherwise
   *  false.
   */
  tryRemoveTokens: function(count) {
    // Make sure the request isn't for more than we can handle
    if (count > this.tokenBucket.bucketSize)
      return false;

    var now = getMilliseconds();

    // Advance the current interval and reset the current interval token count
    // if needed
    if (now < this.curIntervalStart
      || now - this.curIntervalStart >= this.tokenBucket.interval) {
      this.curIntervalStart = now;
      this.tokensThisInterval = 0;
    }

    // If we don't have enough tokens left in this interval, return false
    if (count > this.tokenBucket.tokensPerInterval - this.tokensThisInterval)
      return false;

    // Try to remove the requested number of tokens from the token bucket
    var removed = this.tokenBucket.tryRemoveTokens(count);
    if (removed) {
      this.tokensThisInterval += count;
    }
    return removed;
  },

  /**
   * Returns the number of tokens remaining in the TokenBucket.
   * @returns {Number} The number of tokens remaining.
   */
  getTokensRemaining: function () {
    this.tokenBucket.drip();
    return this.tokenBucket.content;
  }
};

var rateLimiter = RateLimiter$1;

limiter.RateLimiter = rateLimiter;
limiter.TokenBucket = tokenBucket;

Object.defineProperty(rateLimiter$1, "__esModule", { value: true });
rateLimiter$1.RateLimiter = void 0;
const limiter_1 = limiter;
class RateLimiter {
    constructor(amount, interval) {
        this.amount = amount;
        this.interval = interval;
        this.limiters = {};
    }
    /**
     * Takes a token from the rate limiter.
     * @param key A key which identifies the entity being limited (Ex: a username or ID).
     * @returns Whether this action exceeds the rate limit.
     */
    take(key) {
        let limiter = this.limiters[key];
        if (!limiter) {
            limiter = new limiter_1.RateLimiter(this.amount, this.interval);
            this.limiters[key] = limiter;
        }
        if (limiter.getTokensRemaining() < 1) {
            return true;
        }
        limiter.removeTokens(1, (error) => {
            if (error) {
                throw error;
            }
        });
        return false;
    }
}
rateLimiter$1.RateLimiter = RateLimiter;

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
var rate_limiter_1 = rateLimiter$1;
Object.defineProperty(exports, "RateLimiter", { enumerable: true, get: function () { return rate_limiter_1.RateLimiter; } });

}(dist));

/**
* @typedef {PlainObject} BotWikiTools
* @property {PuppetTool} puppet
* @property {BpGetTodayTool} bpGetToday
* @property {WikiGetRandomTool} wikiGetRandom
* @property {WikiGetURLTool} wikiGetURL
*/

/**
 * @param {PlainObject} cfg
 * @param {window.fetch} cfg.fetch
 * @param {external:IntlDom} cfg._
 * @param {striptags} cfg.striptags
 * @returns {BotWikiTools}
 */
function getWikiTools ({fetch, striptags, _}) {
  // Modules
  /**
   * @type {BotWikiTools}
   */
  return {
    /**
     * @callback BpGetTodayTool
     * @returns {Promise<string>}
     */
    /**
     * @type {BpGetTodayTool}
     */
    async bpGetToday () {
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale, options
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
     * @callback WikiGetRandomTool
     * @param {Integer} num
     * @param {string} host
     * @param {boolean} wikiPrefix
     * @returns {Promise<PageInfo|"">}
     */
    /**
     * @type {WikiGetRandomTool}
     */
    async wikiGetRandom (num, host, wikiPrefix) {
      const url = `https://${host}/api.php`;

      const queryParams = {
        action: 'query',
        indexpageids: '1',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        // list: (host == 'bahai.media')?'':'random',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        generator: 'random',
        grnnamespace: (host === 'bahai.media') ? '6' : '0',
        grnlimit: num,
        format: 'json'
      };

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
     * @callback WikiGetURLTool
     * @param {string} kw
     * @param {Integer} num
     * @param {string} host
     * @param {boolean} [wikiPrefix=false]
     * @returns {Promise<PageInfo|false|undefined>}
     */

    /**
     * @type {WikiGetURLTool}
     */
    async wikiGetURL (kw, num, host, wikiPrefix = false) {
      const url = `https://${host}/api.php`;
      const searchParams = {
        action: 'query',
        list: 'search',
        generator: 'search',
        prop: (host === 'bahai.media') ? 'imageinfo' : '',
        iiprop: (host === 'bahai.media') ? 'url' : '',
        srsearch: kw,
        srnamespace: (host === 'bahai.media') ? '6' : '0',
        srlimit: num,
        srprop: 'snippet',
        gsrsearch: kw,
        gsrnamespace: (host === 'bahai.media') ? '6' : '0',
        gsrlimit: num,
        format: 'json'
      };

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
     * @typedef {PlainObject} PageInfo
     * @property {string} url
     * @property {string} title
     * @property {string} snippet
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
* @param {PlainObject} cfg
* @param {string[]} cfg.ADMIN_ROLES
* @param {DiscordClient} cfg.client
* @returns {BotCommands}
*/
const getSocialInfo = ({
  ADMIN_ROLES, client
}) => {
  return {
    users: {
      re: /!users\b/iu,
      // helpInfo: {
      //  name: '!users',
      //  value: 'Displays a count of online users.'
      // }
      /**
       * Users gives the number of online users.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        const {guild} = message;
        const onlineCount = guild.members.cache.filter(
          (m) => m.presence.status !== 'offline'
        ).size;

        const admins = guild.members.cache.filter((m) => {
          if (
            m.roles.cache.some((r) => {
              return ADMIN_ROLES.includes(r.name);
            })
          ) {
            return m.presence.status !== 'offline';
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
            admins.size
          } admin/mod/helper(s).`
        );

        // eslint-disable-next-line no-console -- CLI
        console.log(`Users command issued by ${message.author.username}.`);
      }
    },
    seen: {
      re: /!seen\b/iu,
      // helpInfo: {
      //  name: '!seen',
      //  value: 'Displays the last time a user was seen online.'
      // },
      /**
       * Seen returns the last time a user sent a message.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
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

        // Todo: Stop ignoring this once test in place.
        /* c8 ignore next 13 */
        if (user.lastMessage) {
          const lastchan = user.lastMessage.channel;
          const stat = (
            user.presence.status === 'dnd' ? 'busy' : user.presence.status
          );
          const lastseen = new Date(user.lastMessage.createdAt);
          const now = new Date();
          const timedelta = (now > lastseen)
            ? now - lastseen
            : 0;
          replies.push(
            `${sname} is now ${stat}, and was last seen in ${
              lastchan
            } ${istr(timedelta / 1000)} ago.`
          );
        } else {
          const stat = (
            user.presence.status === 'dnd' ? 'busy' : user.presence.status
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

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams;

var hasSymbols$4 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$6 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$4 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$6.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$1.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$1.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$1.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation$3 = implementation$4;

var functionBind = Function.prototype.bind || implementation$3;

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$3 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError$3();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$3 = hasSymbols$4();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols$3 ? getProto([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$3 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$3 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$3 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$3 ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols$3 ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError$3,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$3('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$3('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$3('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError$3('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var GetIntrinsic$4 = getIntrinsic;

var $TypeError$2 = GetIntrinsic$4('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

var CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError$2(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

var RequireObjectCoercible$1 = CheckObjectCoercible;

var GetIntrinsic$3 = getIntrinsic;

var $Object = GetIntrinsic$3('%Object%');

var RequireObjectCoercible = RequireObjectCoercible$1;

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

var ToObject$1 = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

var isPrimitive$1 = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$5 = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

var isCallable$1 = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag$1) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr$5.call(value);
		return strClass === fnClass || strClass === genClass;
	};

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$4 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag;

var isDateObject = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr$4.call(value) === dateClass;
};

var isSymbol$1 = {exports: {}};

var toStr$3 = Object.prototype.toString;
var hasSymbols$2 = hasSymbols$4();

if (hasSymbols$2) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	isSymbol$1.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr$3.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	isSymbol$1.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false ;
	};
}

var hasSymbols$1 = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = isPrimitive$1;
var isCallable = isCallable$1;
var isDate = isDateObject;
var isSymbol = isSymbol$1.exports;

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
	return void 0;
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
var es2015 = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (arguments[1] === String) {
			hint = 'string';
		} else if (arguments[1] === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols$1) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

var toPrimitive = es2015;

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

var ToPrimitive$1 = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

var GetIntrinsic$2 = getIntrinsic;

var $String$1 = GetIntrinsic$2('%String%');
var $TypeError$1 = GetIntrinsic$2('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString$1 = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$1('Cannot convert a Symbol value to a string');
	}
	return $String$1(argument);
};

var GetIntrinsic$1 = getIntrinsic;

var $String = GetIntrinsic$1('%String%');

var ToPrimitive = ToPrimitive$1;
var ToString = ToString$1;

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

var ToPropertyKey$1 = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

var IsPropertyKey$1 = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

// https://262.ecma-international.org/5.1/#sec-8

var Type$2 = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

var ES5Type = Type$2;

// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

var Type$1 = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	if (typeof x === 'bigint') {
		return 'BigInt';
	}
	return ES5Type(x);
};

var GetIntrinsic = getIntrinsic;

var $TypeError = GetIntrinsic('%TypeError%');

var has$1 = src;

var IsPropertyKey = IsPropertyKey$1;
var Type = Type$1;

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

var HasOwnProperty$1 = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has$1(O, P);
};

var ToObject = ToObject$1;
var ToPropertyKey = ToPropertyKey$1;
var HasOwnProperty = HasOwnProperty$1;

var implementation$2 = function hasOwn(O, P) {
	var obj = ToObject(O);
	var key = ToPropertyKey(P);
	return HasOwnProperty(obj, key);
};

var implementation$1 = implementation$2;

var polyfill = function getPolyfill() {
	return Object.hasOwn || implementation$1;
};

var toStr$2 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr$2.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr$2.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var keysShim$1;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr$1 = Object.prototype.toString;
	var isArgs$1 = isArguments; // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim$1 = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr$1.call(object) === '[object Function]';
		var isArguments = isArgs$1(object);
		var isString = isObject && toStr$1.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
var implementation = keysShim$1;

var slice = Array.prototype.slice;
var isArgs = isArguments;

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : implementation;

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var objectKeys = keysShim;

var keys = objectKeys;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

var getPolyfill = polyfill;
var define = defineProperties_1;

var shim = function shimObjectHasOwn() {
	var polyfill = getPolyfill();
	define(Object, { hasOwn: polyfill }, {
		values: function testObjectHasOwn() {
			return Object.hasOwn !== polyfill;
		}
	});
	return polyfill;
};

shim();

/* READER AND LIBRARY FILE */

/**
 * @param {PlainObject} cfg
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @returns {Reader}
 */
async function getReader ({fs, settings}) {
  // IMPORT FILES

  /**
   * @typedef {PlainObject} ListingEntry
   * @property {string} title
   * @property {string} author
   * @property {string} filename
   * @property {string} url
   */

  /**
   * @typedef {PlainObject<string,ListingEntry>} LibraryListing
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
  const MAX_TEXT_LIMIT = settings.embedTextLimit;

  const availableRandomOptions = Object.keys(library.index);

  const fileRegex = /\bread (?<refName>\S.+) (?<index>[-.\d]+)\b/iu;

  // FUNCTIONS

  /**
  * @typedef {PlainObject} Footnote
  * @property {string} fn
  * @property {string} note
  */

  /**
  * @typedef {PlainObject} LibraryFileEntry
  * @property {string} title
  * @property {string} text
  * @property {Footnote[]} notes
  */

  /**
  * @typedef {LibraryFileEntry[]} LibraryFile
  */

  /**
   * Checks whether file exists.
   * @param {LibraryFile} file Name of the file based on the library_listing
   * @param {Integer} index
   * @returns {LibraryFileEntry|string}
   */
  function readFile (file, index) {
    // Collect size of file
    const max = file.chapters.length;

    // Setup index. It's subtracted by 1 due to array listing
    // 0 is the first element, 1 is the second, etc.
    index = Number.parseInt(index) - 1;

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
   * @param {Integer} l
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
      if (i < pos || i > pos + l) i = pos;

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
   * @param {external:DiscordModule} Discord
   * @param {string} avatar
   * @param {external:DiscordMessage} message
   * @param {Integer} refNumber
   * @param {string} refName
   * @param {LibraryFileEntry|string} content
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
      const embed = new Discord.MessageEmbed();

      // Set colors and data
      embed.setColor(colorBorder);
      embed.setAuthor(
        `${library.list[library.index[refName]].title} by ` +
        `${library.list[library.index[refName]].author}`,
        avatar
      );

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
            embed.addField('Notes', ntext);
          }
        }
      }

      // Publish message
      message.channel.send(embed);

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
   * @returns {LibraryFile}
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

  /**
   *
   * @param {external:DiscordMessage} message
   * @returns {void}
   */
  function showList (message) {
    const content = showListing();

    message.channel.send({
      content: `The following texts are available in my ` +
                      `library, ${message.author.username}.`,
      embed: {
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
      }
    });
  }

  /**
   *
   * @param {external:DiscordMessage} message
   * @param {string} avatar
   * @param {external:DiscordModule} Discord
   * @returns {Promise<void>}
   */
  async function readBook (message, avatar, Discord) {
    // Collect user input
    const userInput = message.content;

    // Pull the relevant data from the regex
    let {refName, index} = userInput.match(fileRegex).groups;

    // Make sure the file exists
    if (!Object.hasOwn(library.index, refName.toLowerCase())) {
      return;
    }

    // Transform user input
    refName = refName.toLowerCase();

    // Open the file
    const file = await openFile(refName);

    // Feed into readFile function
    const content = readFile(file, index);

    // If condition based on data type returned
    if (typeof content === 'object') {
      // Create the embed
      embedCreator(
        Discord, avatar, message, index, refName, content
      );
    /* c8 ignore next 6 */
    // Unless a book has a missing chapter numbering, it seems this will be
    //   unreachable
    } else {
      // Inform the user that they did not select the correct section
      message.channel.send(content);
    }
  }

  /**
   *
   * @param {external:DiscordMessage} message
   * @param {string} avatar
   * @param {external:DiscordModule} Discord
   * @returns {Promise<void>}
   */
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
    const content = readFile(file, randomNumber);

    // Create the embed
    embedCreator(Discord, avatar, message, randomNumber, refName, content);
  }

  /**
   *
   * @param {external:DiscordMessage} message
   * @returns {void}
   */
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
   * @type {Reader}
   */
  return {
    showList,
    readBook,
    readRandom,
    reader
  };
}

/**
 * @param {PlainObject} cfg
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @param {DiscordClient} cfg.client
 * @param {Discord} cfg.Discord
 * @returns {BotCommands}
 */
const getBahaiWritings = async ({fs, settings, client, Discord}) => {
  const reader = await getReader({fs, settings});

  return {
    readBook: {
      re: /\bread (?<refName>\S.+) (?<index>[-.\d]+)\b/iu,
      /**
       * Reads some scripture.
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readBook(
          message, client.user.avatarURL(), Discord
        );
      }
    },
    showList: {
      re: /\bread list$/iu,
      /**
       *
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.showList(message);
      }
    },
    readRandom: {
      re: /\bread random$/iu,
      /**
       *
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readRandom(
          message, client.user.avatarURL(), Discord
        );
      }
    },
    read: {
      re: /!read\b/iu,
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
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        return reader.reader(message);
      }
    }
  };
};

/**
 * @param {PlainObject} cfg
 * @param {BotWikiTools} cfg.wikiTools
 * @param {DiscordClient} cfg.client
 * @param {external:IntlDom} cfg._
 * @returns {BotCommand}
 */
const getBahaiWikis = function ({wikiTools, client, _}) {
  // Private methods

  /**
   * @param {DiscordMessage} message
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
      const options = {month: 'long', day: 'numeric'};
      const date = Date.now();
      const md = new Intl.DateTimeFormat(
        _.resolvedLocale, options
      ).format(date);
      message.channel.send({
        content: 'Here is the result of your query.',
        embed: {
          color: 3447003,
          description: `${
            bstarString
          }Here's Bahaipedia's Today in History entry for ${
            md
          }, ${message.author.username}:\n\n ${res}`
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embed: {
        color: 3447003,
        description: `${
          bstarString
        }Bahaipedia did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }
    });
  };

  /**
   * @param {DiscordMessage} message
   * @param {Integer} numResults
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
        embed: {
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
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your query.',
      embed: {
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your query, ${
          message.author.username
        }. There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }
    });
  };

  /**
   * @param {DiscordMessage} message
   * @param {string} kw
   * @param {Integer} numResults
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
    const res = sr?.title && sr;
    // console.log(pi);
    if (res) {
      // eslint-disable-next-line no-console -- CLI
      console.log(`Search completed: ${kw} => ${res.title}`);
      const regex = /<span class="searchmatch">|<\/span>/gui;
      const snip = res.snippet.replace(regex, '**');
      message.channel.send({
        content: 'Here is the result of your search.',
        embed: {
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
        }
      });
      return;
    }
    message.channel.send({
      content: 'Here is the result of your search.',
      embed: {
        color: 3447003,
        description: `${bstarString}${
          sitename
        } did not return any results for your search, ${
          message.author.username
        }. Did you spell your search terms correctly?\n\n` +
          `There may also have been a network problem. ` +
          `If you think you're getting this message in ` +
          `error, you may want to try again later.`
      }
    });
  };

  // Bp looks up keywords on bahaipedia
  /**
   * @param {DiscordMessage} message
   * @param {PlainObject} cfg
   * @param {boolean} cfg.forceToday
   * @returns {Promise<void>}
   */
  async function bahaipediaAction (message, {forceToday} = {}) {
    const bwikiMatch = /!(?:bp|pedia|b9|bahai9|bm|media|img)/gui;
    // const flag = /-([1-5]|r|rnd|rand|t|tih|today)/gui;

    const words = message.content.split(' ');
    // const parsed = false;

    // console.log("0: " + words);

    // find the word matching the call to this function
    const bpIdx = words.findIndex((i) => i.match(bwikiMatch));

    // remove this and all previous words
    words.splice(0, bpIdx + 1);

    // console.log("1: " + words);

    const rndRgx = /-(?:r|rnd|rand)/gui;
    const tihRgx = /-(?:t|tih|today)/gui;
    const nrRgx = /-(?<nr>[1-5])/ui;

    // search
    const searchRegex = /[\w\s'‘’()-_,.]+/gui;
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
      if (rndIdx >= 0) {
        rand = true;
        // remove this word
        words.splice(rndIdx, 1);
      } else { // rand supersedes today
        // find the today flag
        const tihIdx = words.findIndex((i) => i.match(tihRgx));
        if (tihIdx >= 0) {
          tih = true;
          // remove this word
          words.splice(tihIdx, 1);
        }
      }

      const nrIdx = words.findIndex((i) => i.match(nrRgx));
      if (nrIdx >= 0) {
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
    re: /!today\b/iu,
    helpInfo: {
      name: '!today',
      value: "Displays a list of events from today's date " +
          'in history, via Bahaipedia.'
    },
    /**
     * @param {DiscordMessage} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message, {forceToday: true});
    }
  };

  const b9 = {
    re: /!(?:b9|bahai9)\b/iu,
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bm = {
    re: /!(?:bm|media|img)\b/iu,
    /**
     * @param {DiscordMessage} message
     * @returns {Promise<void>}
     */
    async action (message) {
      return await bahaipediaAction(message);
    }
  };

  const bp = {
    re: /!(?:bp|pedia)\b/iu,
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
 * @param {external:DiscordMessage} message
 * @param {{authorID: number, permission: string}} permissions
 * @returns {void}
 */
/**
 * @type {PuppetTool}
 */
function puppet ({content, guild, author, member, channel}, permissions) {
  // Transmit message as:
  // !puppet <CHANNEL> | <MESSAGE>
  if (
    author.id === permissions.authorID

  // Reenable this if we allow `getCommands.js` to pass in arbitrary users
  // or are using this file elsewhere
  // || member.permissions.has(permissions.permission)
  ) {
    const regex = /!puppet (?<userChannel>\S.+) \| (?<msg>\S.+)/iu;
    const echo = content.match(regex);

    // Did regex pass
    if (echo) {
      const {userChannel, msg} = echo.groups;

      const destination = guild.channels.cache.find(
        (val) => val.name === userChannel
      );

      // Does the channel exist?
      if (destination) {
        destination.send(msg);
      } else {
        channel.send(`Channel ${userChannel} does not exist!`);
      }
    }
  }
}

/**
 * @param {PlainObject} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {GuildCheckin} cfg.guildCheckin
 * @param {external:IntlDom} cfg._
 * @param {DiscordClient} cfg.client
 * @param {DiscordTTS} cfg.discordTTS
 * @returns {BotCommands}
 */
const getAdmin = ({
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  discordTTS, guildCheckin, _, client
}) => {
  return {
    speak: {
      re: /!speak/iu,
      /*
      helpInfo: {
        name: '!speak some words',
        value: 'Reads some words as speech'
      },
      */
      /* c8 ignore next 39 */
      /**
       * Reads some scripture.
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        // Todo: Needs testing
        if (!ADMIN_IDS.includes(message.author.id)) {
          return;
        }

        const words = message.content.split(' ').slice(2).join(' ');

        // Todo: Abstract out code so browser can instead use `SpeechSynthesis`
        const broadcast = client.voice.createBroadcast();
        const channelId = message.member.voice.channelID;
        if (!channelId) {
          // eslint-disable-next-line no-console -- Debug
          console.log('Message member not in a voice channel with `channelID`');
        }
        const channel = client.channels.cache.get(channelId);
        const connection = await channel.join('');
        broadcast.play(discordTTS.getVoiceStream(words));
        const dispatcher = connection.play(broadcast);
        /* c8 ignore next 9 */
        // Would seem difficult to simulate this.
        dispatcher.on('error', (err) => {
          // eslint-disable-next-line no-console -- Debug
          console.error(_('speechError'), err);
        });
        dispatcher.on('debug', (err) => {
          // eslint-disable-next-line no-console -- Debug
          console.log(err);
        });
        /* c8 ignore next 5 */
        dispatcher.on('start', () => {
          // eslint-disable-next-line no-console -- Debug
          console.log(_('speakingBegun'));
        });
      }
    },
    puppet: {
      re: /!puppet (?:\S.+) \| (?:\S.+)/iu,
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // Puppet handling
          puppet(message, {
            authorID: PUPPET_AUTHOR,
            permission: ADMIN_PERMISSION
          });

          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Puppet command issued by ${message.author.username}.`
          );
        }
      }
    },
    echo: {
      re: /!echo\b/iu,
      /**
       * Echo what was said.
       * @param {DiscordMessage} message
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
      re: /!checkin\b/iu,
      /**
       * @param {DiscordMessage} message
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
 * @param {PlainObject} cfg
 * @param {DiscordClient} cfg.client
 * @param {Discord} cfg.Discord
 * @returns {BotCommands}
 */
const getBahaiInfo = ({client, Discord}) => {
  return {
    /*
      question: {
        re: /\b(?:question|q):.*\b/iu,
        action (message) {

        }
      },
    */
    info: {
      re: /!info/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        // Define the embed features
        const embed = new Discord.MessageEmbed();

        // Initialize output
        const embedDescription = "Bahá'í Bot for Discord\n";

        // Add data
        embed.setAuthor('BahaiBot', client.user.avatarURL());

        embed.setDescription(embedDescription);

        embed.addField(
          'Support Server', '[Invite link](https://discord.gg/NE6dJaw)'
        );

        message.channel.send(embed);
      }
    },
    badi: {
      re: /\bbad[íi]\b/iu,
      /**
       * @param {DiscordMessage} message
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
 * @param {PlainObject} cfg
 * @param {DiscordClient} cfg.client
 * @returns {BotCommands}
 */
const getBahaiSalutations = ({client}) => {
  /**
   * @param {DiscordMessage} message
   * @returns {DiscordEmoji}
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
      re: /\b(?:all[aá]h['’´-]?[uo]?['’´-]?abh[aá]|abh[aá])/iu,
      /**
       * Alláh-u-Abhá!
       * @param {DiscordMessage} message
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
         * @param {DiscordMessage} message
         * @returns {void}
         */
        check (message) {
          return Boolean(message.mentions.members.first());
        },
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          reactToStar(message);
        }
      }
    },
    nawruz: {
      re: /\b(?:(?:happy|joyous)\s?n[ao]w[- ]?ro?[uú]z|n[ao]w[- ]?ro?[uú]z\s?(?:m[uo]b[aá]r[aá]k))\b/iu,
      /**
       * @param {DiscordMessage} message
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
      re: /\b(?:(?:happy|joyous)\s?r[ie][ḍdz][vw][aá]n|r[ie][ḍdz][vw][aá]n\s?(?:m[uo]b[aá]r[aá]k))\b/iu,
      /**
       * @param {DiscordMessage} message
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
 * @returns {BotCommands}
 */
const getSalutations = () => {
  return {
    sup: {
      re: /\b(?:su+p|wh[au]+[sz]+[au]+p|(?:(?:what|wut)['’´]?s (?:up|new|good|gud|cookin[g'’´])))\b/iu,
      /**
       * What's up?
       * @param {DiscordMessage} message
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
      re: /\bgood morning\b/iu,
      /**
       * Good morning.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Good morning ${message.author.username}! :coffee:`
        );
      }
    },
    afternoon: {
      re: /\bgood afternoon\b/iu,
      /**
       * Good afternoon.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good afternoon ${message.author.username}!`);
      }
    },
    evening: {
      re: /\bgood evening\b/iu,
      /**
       * Good evening.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good evening ${message.author.username}!`);
      }
    },
    hello: {
      re: /\b(?:h[uea]llo|hi|hi there|howdy|yo|heya|sal[aá]{1,2}m)\b/iu,
      /**
       * Hello.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Hello ${message.author.username}!`);
      }
    },
    welcome: {
      re: /^(?:everyone|everybody)?[!:,\s\W]*(?:please|pleez|pls|plz)?[\s\W]*(?:[\s\W]*welcome|.*>+[\s\W]*welcome\b|.*\bwb\b)/iu,
      /**
       * Welcome.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Thanks, ${message.author.username}! :wave:`
        );
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
         * @returns {boolean}
         */
        check (message) {
          return Boolean(message.mentions.members.first());
        },
        /**
         * @param {DiscordMessage} message
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
* @returns {BotCommands}
*/
const getLightHearted = () => {
  return {
    /* OTHER CHIT-CHAT */
    coffee: {
      re: /\u{2615}/u,
      /**
       * Coffee (should be at the end so everything else is processed first).
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':coffee:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
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
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':tea:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
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
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':popcorn:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          message.react('🍿');
        }
      }
    },
    // Lulz (should be at the end so everything else is processed first).
    unladen: {
      re: /\bunladen\sswallow\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          'What do you mean, an African, or European swallow?'
        );
      }
    },
    bruh: {
      re: /\bbruh\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Bruh.');
      }
    },
    goodbot: {
      re: /\bgood\s?bot\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.react('😊');
        message.channel.send('Thanks!');
      }
    },
    badbot: {
      re: /\bbad\s?bot\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.react('☹️');
        message.channel.send('Sorry.');
      }
    },
    repeating: {
      re: /\brepeating yourself\b/iu,
      /**
       * Repeating.
       * @param {DiscordMessage} message
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
      re: /\b(?:my|santa['’´]?s)\scat\b/iu,
      /**
       * @param {DiscordMessage} message
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
      re: /\bping\b/iu,
      /**
       * Ping message.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Pong :ping_pong:');
      }
    }
  };
};

/**
* @param {PlainObject} cfg
* @param {DialogflowApp} cfg.app
* @param {Router} cfg.router
* @param {DiscordClient} cfg.client
* @param {Discord} cfg.Discord
* @param {external:IntlDom} cfg._
* @param {external:settings} cfg.settings
* @returns {BotCommand}
*/
const getDefaultCommand = ({
  app, router, client, Discord, _, settings
}) => {
  return {
    re: /[\s\S]*/u, // Should always match
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    async action (message) {
      /* BOT DATA */
      // Variables and initial data

      // Removes an initial bot reference and converts other snowflake
      //  sequences to username

      // Trim is necessary to ensure the `offset` can be 0 when matching
      //   snowflake at beginning
      const userInput = message.content.trimStart().replace(
        /<@!?(?<snowflake>\d+)>/gu,
        (__, n1, offset, wholeStr, {snowflake}) => {
          if (snowflake === client.user.id) {
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
        settings.PROJECT_ID,
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

      /**
      * @throws {DialogflowError}
      * @returns {Promise<external:DialogflowResponse[]>} responses
      */
      async function dialogflowCall () {
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
      return await dialogflowCall();
    }
  };
};

/**
 * @param {PlainObject} cfg
 * @param {BotCommands} cfg.commands
 */
const addHelp = ({commands}) => {
  /**
  * @typedef {{name: string, value: string}} BotHelpField
  */

  const help = {
    re: /!help\b/iu,
    helpInfo: {
      name: '!help',
      value: 'Displays help text.'
    },
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embed: {
          color: 8359053,
          description: 'I can respond to well-formed questions about basic ' +
              "Baha'i topics. As well, the following commands can help me " +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !help`',
          fields
        }
      });
    }
  };

  commands.help = help;

  /**
   * @type {BotHelpField[]}
   */
  const fields = [
    ...Object.values(commands).map(({helpInfo}) => {
      return helpInfo;
    }).filter((info) => info)
  ];
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

/**
* @callback ActionBehavior
* @param {DiscordMessage} message
* @returns {Promise<void>|void}
*/

/**
* @callback ActionCheck
* @param {DiscordMessage} message
* @returns {boolean}
*/

/**
* @typedef {PlainObject} NotMentionedCommand
* @property {ActionBehavior} action
* @property {ActionCheck} [check]
*/

/**
* @typedef {PlainObject} BotCommand
* @property {RegExp} re
* @property {ActionBehavior} action
* @property {NotMentionedCommand} [notMentioned]
*/

/**
* @typedef {Object<string,BotCommand>} BotCommands
*/

/**
 * @param {PlainObject} cfg
 * @param {DialogflowApp} cfg.app
 * @param {Router} cfg.router
 * @param {Discord} cfg.Discord
 * @param {BotWikiTools} cfg.wikiTools
 * @param {DiscordClient} cfg.client
 * @param {GuildCheckin} cfg.guildCheckin
 * @param {external:IntlDom} cfg._
 * @param {GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @param {DiscordTTS} cfg.discordTTS
 * @returns {Promise<BotCommands>}
 */
const getCommands = async function ({
  app, router, Discord,
  wikiTools, client, guildCheckin,
  _, getLocalizedSetting,
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

  const objs = await Promise.all([
    ['socialInfo', () => getSocialInfo({ADMIN_ROLES: ADMIN_ROLES$1, client})],
    [
      'bahaiWritings',
      () => getBahaiWritings({fs, settings, client, Discord})
    ],
    ['bahaiWikis', () => getBahaiWikis({wikiTools, client, _})],
    ['admin', () => getAdmin({
      ADMIN_IDS: ADMIN_IDS$1, ADMIN_PERMISSION: ADMIN_PERMISSION$1, PUPPET_AUTHOR, guildCheckin, _, client,
      discordTTS
    })],
    ['bahaiInfo', () => getBahaiInfo({client, Discord})],
    ['bahaiSalutations', () => getBahaiSalutations({client})],
    ['salutations', () => getSalutations()],
    ['lightHearted', () => getLightHearted()]
  ].map(async ([name, cmd]) => {
    if (
      (anyCommand || enabledCommandGroups.includes(name)) &&
      !disabledCommandGroups.includes(name)
    ) {
      return await cmd();
    }
    return null;
  }));

  const commands = objs.reduce((cmds, obj) => {
    cmds = {...cmds, ...obj};
    return cmds;
  }, {});

  addHelp({commands});

  // After adding help to ensure `!help` has priority
  commands.default = getDefaultCommand({
    app, router, client, Discord, _, settings
  });

  return commands;
};

// These are for the current API; old docs not online
/**
 * @external DiscordModule
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 */
/**
 * @external DiscordClient
 * @see https://discord.js.org/#/docs/main/stable/class/Client
 */
/**
 * @external DiscordMessage
 * @see https://discord.js.org/#/docs/main/stable/class/Message
 */
/**
 * @external DialogflowResponse
 * @see https://github.com/googleapis/nodejs-dialogflow
 */

/*
  Resource Loader
*/

// import questions from './questions.js';

// Export the router

/**
 * @callback Router
 * @param {external:DialogflowResponse} response
 * NOTE: response.queryResult.fulfillmentMessages is the array (not used)
 * NOTE: response.queryResult.fulfillmentText a string with default response
 * @param {external:DiscordMessage} message
 * @param {external:DiscordClient} client
 * @param {external:DiscordModule} Discord
 * @param {external:IntlDom} _
 * @returns {void}
 */

/**
 * @type {Router}
 */
const router = (response, message, client, Discord, _) => {
  // eslint-disable-next-line no-console -- CLI
  console.log(_('routerResponse'), response);
  const speech = response.queryResult.fulfillmentText;
  message.channel.send(speech);
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

// Start counting uptime prior to login
const readytime = Date.now();

/**
 * @param {PlainObject} cfg
 * @param {DiscordClient} [cfg.client]
 * @param {FileSystem} cfg.fs
 * @param {BotWikiTools} cfg.wikiTools
 * @param {Settings} cfg.settings
 * @param {GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {external:IntlDOMInternationalizer} cfg._
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
   * @callback GuildCheckin
   * @param {Integer} [nowtime=Date.now()]
   * @returns {Promise<void>}
   */

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
      console.log(_('checkingIn', {guildName}));

      channels = guildChannels.map(({
        id: guildChannelID, greetings, bpToday, reportUptime
      }) => {
        return {
          guildName,
          bpToday,
          greetings,
          reportUptime,
          channel: guild.channels.cache.get(guildChannelID)
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
      list: [
        channels.map(({channel: {name}}) => {
          return `#${name}`;
        })
      ]
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
        guildName,
        channelName: channel.name
      }));

      if (greetings) {
        const greet = greetings[
          Math.floor(Math.random() * greetings.length)
        ]; // Pick a random greeting
        if (reportUptime) {
          const now = new Date();
          const uptime = nowtime - readytime;
          channel.send(
            _('uptimeGreet', {
              greet,
              now: now.toString(),
              uptime: istr(Math.floor(uptime / 1000))
            })
          ); // Check in
        } else {
          channel.send(greet); // Greet everyone
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

      channel.send({
        content: _('hereIsQueryResult'),
        embed: {
          color: 3447003,
          description: _('todayInHistoryResult', {
            today: {
              date: [
                Date.now(),
                {month: 'long', day: 'numeric'}
              ]
            },
            bstar: bstar?.toString() ?? '',
            todayInHistoryResult
          })
        }
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

/**
 * This lets us also update the `client` value and dependent code against
 * a unit testing mock client.
 * @typedef {PlainObject} BotOptions
 * @property {boolean} [checkins=false]
 * @property {string[]} [locales=["en-US"]]
 * @property {window.fetch} [fetch=window.fetch]
 * @property {IntlDomI18N} [i18n=window?.intlDom?.i18n]
 * @property {striptags} [striptags=window.striptags]
 * @property {DiscordClient} [client=new Discord.Client()]
 * @property {Discord} Discord
 * @property {dialogflow} dialogflow
 * @property {FileSystem} fs
 * @property {GetPath} getPath
 * @property {boolean} [exitNoThrow=false] Set to true for testing
 */

/**
* @typedef {{client, botCommands, guildCheckin}} BotResponse
*/

const defaultLocale = 'en-US';
const supportedLocales = [
  // Add any other available locales here (or read `_locales` for directory
  //   names):
  defaultLocale
];

/**
 * @callback GetSettings
 * @returns {Object<string,any>}
 */

/**
 * @param {BotOptions} cfg
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
  fetch = window.fetch,
  // Default to dependencies' globals in case using UMD files and user not
  //  supplying own modular versions
  i18n = window?.intlDom?.i18n,
  striptags = window.striptags,
  client: cl,
  Discord,
  discordTTS, // `speak` admin command
  dialogflow,
  fs,
  /**
   * @type {GetSettings}
   */
  getSettings: defaultGetSettings,
  getPath,
  numberOfCommands = 1,
  commandInterval = 2000,
  rateLimiter = new dist.RateLimiter(1, commandInterval),
  exitNoThrow = false
} = {}) => {
  /**
  * @param {external:DiscordMessage} message
  * @returns {boolean}
  */
  const isUserAbusive = (message) => {
    const limited = rateLimiter.take(message.author.id);
    return limited;
  };

  // Update local copy
  // Create an instance of a Discord client
  const client = cl || /* c8 ignore next */ new Discord.Client();

  // Import the .json settings (use this when JSON importing is standard in
  //   Node and the browser)
  // // eslint-disable-next-line node/no-unpublished-import -- User must set
  // import system from '../settings.json';

  const system = JSON.parse(
    await fs.readFile(getPath('settings.json'), 'utf8')
  );

  const getSettings = typeof defaultGetSettings === 'function'
    ? defaultGetSettings
    : (sys) => sys.development;

  const settings = getSettings(system);

  // const dayInSeconds = 24 * 60 * 60;
  // const twelveHoursInSeconds = 12 * 60 * 60;
  const fortyMinutesInMilliseconds = 40 * 60 * 1000;
  const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

  // Dialogflow setup
  const app = new dialogflow.SessionsClient({
    keyFilename: getPath(settings.PROJECT_JSON)
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

  /**
  * @external IntlDOMInternationalizer
  * @see {@link https://github.com/brettz9/intl-dom}
  */
  /**
  * @type {external:IntlDOMInternationalizer}
  */
  const _ = await i18n({
    localesBasePath: 'src',
    locales
  });

  /**
   * @callback GetLocalizedSetting
   * @param {string} key
   * @param {PlainObject} cfg
   * @param {boolean} cfg.noDefaults
   * @returns {any}
   */

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
  client.on('ready', /** @type {ReadyListener} */ () => {
    // eslint-disable-next-line no-console -- CLI
    console.log(_('BahaiBotOnline'));

    // To run immediately (as for testing), uncomment:
    // guildCheckin();

    if (!checkins) {
      return;
    }

    // Set presence to show help syntax

    client.user.setPresence({
      activity: {name: '@BahaiBot !help', type: 'PLAYING'}
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
  * @param {external:DiscordMessage} message
  * @returns {void}
  */

  // Create an event listener for messages
  client.on(
    'message', /** @type {MessageListener} */ async (message) => {
      // Collect userID
      // Ensure that the bot is being messaged
      if (message.mentions.has(client.user)) {
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
              // eslint-disable-next-line max-len -- Long
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
            (!notMentioned.check ||
              // Any extra checks
              notMentioned.check(message))
          ) {
            // eslint-disable-next-line max-len -- Long
            // eslint-disable-next-line no-await-in-loop -- Needs to be in series
            await notMentioned.action(message);
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
  * @param {DiscordGuildMember} ev
  * @returns {void}
  */

  client.on('guildMemberAdd', /** @type {GuildMemberAddListener} */ (ev) => {
    const wcChannel = ev.guild.channels.cache.find(
      (val) => val.name === welcomeChannel
    );
    if (!wcChannel) {
      return;
    }
    const awesome = client.emojis.cache.find(
      (val) => val.name === awesomeEmoji
    );

    const greetGuildMemberAdd = getLocalizedSetting(
      'greet-guildMemberAdd', {
        defaultValue: greets.guildMemberAdd
      }
    );

    const greet = greetGuildMemberAdd[
      Math.floor(Math.random() * greetGuildMemberAdd.length)
    ]; // Pick a random greeting

    const happiesObj = getLocalizedSetting(
      'happies', {
        defaultValue: happies
      }
    );

    const happiesArray = awesome
      ? happiesObj.guildMemberAdd(awesome.toString())
      : happiesObj.guildMemberAdd(':smile:');

    const happy = happiesArray[
      Math.floor(Math.random() * happiesArray.length)
    ]; // Pick a random greeting

    wcChannel.send(
      _('guildMemberAddWelcome', {
        userID: `<@!${ev.user.id}>`,
        greet,
        happy,
        serverName: getLocalizedSetting('serverName'),
        helpTeam: `<@&${helpTeam}>`,
        rulesChannel: ev.guild.channels.cache.get(rulesChannel).toString()
      })
    );
  });

  // Log our bot in
  client.login(token);

  return {client, botCommands, guildCheckin, system, getSettings};
};

// eslint-disable-next-line max-len -- Long

const {hash, search} = location;
const hashParams = hash.slice(1);

// GET LOCALE
const locales = [
  new URLSearchParams(hashParams).get('locales') ||
  new URLSearchParams(search).get('locales')
];

// GET OTHER OPTIONS
const checkins = new URLSearchParams(hashParams).get('checkins') ||
  new URLSearchParams(search).get('checkins');

/**
 * @param {string} path
 * @returns {string}
 */
const getPath = (path) => {
  return `${location.href.replace(/\/$/u, '')}/${path}`;
};

// Note: These implementations are specific to our needs
const fs = {
  /**
   * @param {string} fileName
   * @returns {Promise<string>}
   */
  async readFile (fileName) {
    return await (await fetch(fileName?.href ?? fileName)).text();
  },
  /**
   * @param {string} fileName
   * @param {string} data
   * @returns {void}
   */
  writeFile (fileName, data) {
    localStorage.setItem(`bahaibot-${fileName}`, data || Date.now());
  },
  /**
   * @param {string} fileName
   * @returns {string}
   */
  stat (fileName) {
    return localStorage.getItem(`bahaibot-${fileName}`);
  },
  /**
   * @param {string} fileName
   * @returns {void}
   */
  unlink (fileName) {
    localStorage.removeItem(fileName);
  }
};

/**
 * This is created separately from `index.js` so as to allow testing files to
 * have Discord conveniently baked in, requiring case-by-case overrides only.
 * @param {BotOptions} args
 * @returns {Promise<void>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    getPath,
    fs,
    fetch,
    i18n,
    striptags,
    // Todo: See about using https://github.com/mishushakov/dialogflow-web-v2
    //   to pass in as is (or with an adapter as needed) for our `apiai`
    //   argument, allowing the user to only neeed to pass in their own
    //   `Discord`
    ...args
  });
}

export default discordBot;
