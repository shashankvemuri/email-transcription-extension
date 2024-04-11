(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["InboxSDK"] = factory();
	else
		root["InboxSDK"] = factory();
})(globalThis, () => {
return  (() => { 
 	var __webpack_modules__ = ({

 2705:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(5639);

var Symbol = root.Symbol;

module.exports = Symbol;

 }),

 4239:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705),
    getRawTag = __webpack_require__(9607),
    objectToString = __webpack_require__(2333);

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

 }),

 7561:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(7990);

var reTrimStart = /^\s+/;

function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;

 }),

 1957:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;

 }),

 9607:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(2705);

var objectProto = Object.prototype;

var hasOwnProperty = objectProto.hasOwnProperty;

var nativeObjectToString = objectProto.toString;

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

 }),

 2333:
 ((module) => {

var objectProto = Object.prototype;

var nativeObjectToString = objectProto.toString;

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

 }),

 5639:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(1957);

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

 }),

 7990:
 ((module) => {

var reWhitespace = /\s/;

function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;

 }),

 9567:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(554);

var FUNC_ERROR_TEXT = 'Expected a function';

function before(n, func) {
  var result;
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n = toInteger(n);
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

module.exports = before;

 }),

 7204:
 ((module) => {

function fromPairs(pairs) {
  var index = -1,
      length = pairs == null ? 0 : pairs.length,
      result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}

module.exports = fromPairs;

 }),

 3218:
 ((module) => {

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

 }),

 7005:
 ((module) => {

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

 }),

 3448:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(4239),
    isObjectLike = __webpack_require__(7005);

var symbolTag = '[object Symbol]';

function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

 }),

 1463:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var before = __webpack_require__(9567);

function once(func) {
  return before(2, func);
}

module.exports = once;

 }),

 8601:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var toNumber = __webpack_require__(4841);

var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

 }),

 554:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var toFinite = __webpack_require__(8601);

function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

 }),

 4841:
 ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(7561),
    isObject = __webpack_require__(3218),
    isSymbol = __webpack_require__(3448);

var NAN = 0 / 0;

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

var reIsBinary = /^0b[01]+$/i;

var reIsOctal = /^0o[0-7]+$/i;

var freeParseInt = parseInt;

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

 }),

 443:
 ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
  value: true
});
exports.Z = delay;

function delay(time, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, time);
  });
}

 }),

 9335:
 ((module) => {

"use strict";

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

 }),

 8795:
 ((module) => {

"use strict";

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

 }),

 7735:
 ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.decode = exports.parse = __webpack_require__(9335);
exports.encode = exports.stringify = __webpack_require__(8795);

 })

 	});

 	var __webpack_module_cache__ = {};

 	function __webpack_require__(moduleId) {

 		var cachedModule = __webpack_module_cache__[moduleId];
 		if (cachedModule !== undefined) {
 			return cachedModule.exports;
 		}

 		var module = __webpack_module_cache__[moduleId] = {

 			exports: {}
 		};

 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

 		return module.exports;
 	}

 	(() => {

 		__webpack_require__.n = (module) => {
 			var getter = module && module.__esModule ?
 				() => (module['default']) :
 				() => (module);
 			__webpack_require__.d(getter, { a: getter });
 			return getter;
 		};
 	})();

 	(() => {

 		__webpack_require__.d = (exports, definition) => {
 			for(var key in definition) {
 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
 				}
 			}
 		};
 	})();

 	(() => {
 		__webpack_require__.g = (function() {
 			if (typeof globalThis === 'object') return globalThis;
 			try {
 				return this || new Function('return this')();
 			} catch (e) {
 				if (typeof window === 'object') return window;
 			}
 		})();
 	})();

 	(() => {
 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
 	})();

 	(() => {

 		__webpack_require__.r = (exports) => {
 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 			}
 			Object.defineProperty(exports, '__esModule', { value: true });
 		};
 	})();

var __webpack_exports__ = {};

(() => {
"use strict";

__webpack_require__.d(__webpack_exports__, {
  "default": () => ( inboxsdk_REMOTE)
});

var inboxsdk_namespaceObject = {};
__webpack_require__.r(inboxsdk_namespaceObject);
__webpack_require__.d(inboxsdk_namespaceObject, {
  "LOADER_VERSION": () => (LOADER_VERSION),
  "load": () => (load),
  "loadScript": () => (inboxsdk_loadScript)
});

;
let loadScript = () => {
  throw new Error('This function is not usable in Chrome MV3 extensions');
};
function setLoadScript(fn) {
  loadScript = fn;
}

var once = __webpack_require__(1463);
var once_default = __webpack_require__.n(once);
;
const r = /([?&])_=[^&]*/;
let nonce = Date.now() + Math.floor(Math.random() * Math.pow(2, 32));
function cachebustUrl(url) {
  if (r.test(url)) {
    return url.replace(r, '$1_=' + nonce++);
  } else {
    return url + (/\?/.test(url) ? '&' : '?') + '_=' + nonce++;
  }
}

var fromPairs = __webpack_require__(7204);
var fromPairs_default = __webpack_require__.n(fromPairs);
;

const URLS = ['https://www.inboxsdk.com/images/logo-red.png'];
function imageTest(url) {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.onload = function () {
      resolve(true);
    };
    img.addEventListener('loadend', function () {
      resolve(false);
    });
    img.onerror = function () {
      resolve(false);
    };
    img.src = cachebustUrl(url);
  });
}
function connectivityTest() {
  return Promise.all(URLS.map(url => imageTest(url).then(success => [url, success]))).then(results => fromPairs_default()(results));
}

var querystring_es3 = __webpack_require__(7735);

var js = __webpack_require__(443);
;

const MAX_TIMEOUT = 64 * 1000; 
const MAX_RETRIES = 5;
const serversToIgnore = {};

function ajax(opts) {
  if (!opts || typeof opts.url !== 'string') {
    throw new Error('URL must be given');
  }
  return new Promise(function (resolve, reject) {
    const method = opts.method ? opts.method : 'GET';
    let url = opts.url;
    let stringData = null;
    if (opts.data) {
      stringData = typeof opts.data === 'string' ? opts.data : querystring_es3.stringify(opts.data);
      if (method === 'GET' || method === 'HEAD') {
        url += (/\?/.test(url) ? '&' : '?') + stringData;
        stringData = null;
      }
    }
    const canRetry = opts.canRetry != null ? opts.canRetry : method === 'GET' || method === 'HEAD';
    const match = url.match(/(?:(?:[a-z]+:)?\/\/)?([^/]*)\//);
    if (!match) {
      throw new Error('Failed to match url');
    }
    const server = match[1];
    if (Object.prototype.hasOwnProperty.call(serversToIgnore, server)) {
      reject(new Error(`Server at ${url} has told us to stop connecting`));
      return;
    }
    if (opts.cachebust) {
      url = cachebustUrl(url);
    }
    const XMLHttpRequest = opts.XMLHttpRequest || window.XMLHttpRequest;
    const xhr = new XMLHttpRequest();
    Object.assign(xhr, opts.xhrFields);
    xhr.onerror = function (event) {
      if ((opts.retryNum || 0) < MAX_RETRIES) {
        if (xhr.status === 502 || (xhr.status === 0 || xhr.status >= 500) && canRetry) {
          resolve(_retry(opts));
          return;
        }
      }
      const err = Object.assign(new Error(`Failed to load ${url}`), {
        event,
        xhr,
        status: xhr.status
      });

      if (xhr.status == 490) {
        serversToIgnore[server] = true;
      }
      reject(err);
    };
    xhr.onload = function (event) {
      if (xhr.status === 200) {
        resolve({
          xhr,
          text: xhr.responseText
        });
      } else {
        xhr.onerror(event);
      }
    };
    xhr.open(method, url, true);
    if (opts.headers) {
      const {
        headers
      } = opts;
      Object.keys(headers).forEach(name => {
        const value = headers[name];
        xhr.setRequestHeader(name, value);
      });
    }
    xhr.send(stringData);
  });
}
function _retry(opts) {
  const retryNum = (opts.retryNum || 0) + 1;

  const retryTimeout = Math.min(Math.pow(2, retryNum) * 1000, MAX_TIMEOUT);
  return (0,js.Z)(retryTimeout).then(() => ajax(Object.assign({}, opts, {
    retryNum
  })));
}
;

function rateLimit(fn, period, count) {
  let calls = [];
  return function () {
    const now = Date.now();
    calls = calls.filter(time => time > now - period);
    if (calls.length >= count) {
      throw new Error('Function rate limit exceeded');
    }
    calls.push(now);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return fn.apply(this, args);
  };
}
;
function getStackTrace() {
  const err = new Error('Stack saver');

  return ('' + err.stack).replace(/^([^\n]*\n){2}/, '');
}
;
function getExtensionId() {
  const chrome = __webpack_require__.g.chrome;
  if (chrome && chrome.extension && chrome.extension.getURL) {
    return chrome.extension.getURL('');
  }
  return null;
}
;
function getSessionId() {
  const attrValue = typeof document !== 'undefined' && document.documentElement.getAttribute('data-inboxsdk-session-id');
  if (typeof attrValue === 'string') {
    return attrValue;
  } else {
    const sessionId = Date.now() + '-' + Math.random();
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-inboxsdk-session-id', sessionId);
    }
    return sessionId;
  }
}
;

const BUILD_VERSION = "2.1.26-1702920944009-9d8c897abf8d2bea-MODIFIED";
if (false) {}

var isObject = __webpack_require__(3218);
var isObject_default = __webpack_require__.n(isObject);
;

const sessionId = getSessionId();

function logError(err, details, context) {
  if (typeof document === 'undefined') {

    throw err;
  }

  try {
    if (haveWeSeenThisErrorAlready(err)) {
      return;
    } else {
      markErrorAsSeen(err);
    }
    if (!(err instanceof Error)) {
      console.warn('First parameter to Logger.error was not an error object:', err);
      err = new Error('Logger.error called with non-error: ' + err);
      markErrorAsSeen(err);
    }
    const {
      appIds,
      implVersion,
      userEmailHash
    } = context;
    const loaderVersion = context.loaderVersion || BUILD_VERSION;
    const sentByApp = !!context.sentByApp;
    const errorProperties = {};
    for (const name in err) {
      if (Object.prototype.hasOwnProperty.call(err, name)) {
        try {
          const value = err[name];
          JSON.stringify(value);
          errorProperties[name] = value;
        } catch (err) {

        }
      }
    }
    if (Object.keys(errorProperties).length > 0) {
      details = {
        errorProperties,
        details
      };
    }

    const nowStack = getStackTrace();
    const stuffToLog = ['Error logged:', err];
    if (err && err.stack) {
      stuffToLog.push('\n\nOriginal error stack:\n' + err.stack);
    }
    stuffToLog.push('\n\nError logged from:\n' + nowStack);
    if (details) {
      stuffToLog.push('\n\nError details:', details);
    }
    stuffToLog.push('\n\nExtension App Ids:', JSON.stringify(appIds, null, 2));
    stuffToLog.push('\nSent by App:', sentByApp);
    stuffToLog.push('\nSession Id:', sessionId);
    stuffToLog.push('\nExtension Id:', getExtensionId());
    stuffToLog.push('\nInboxSDK Loader Version:', loaderVersion);
    stuffToLog.push('\nInboxSDK Implementation Version:', implVersion);
    console.error(...stuffToLog);
    const report = {
      message: err && err.message || err,
      stack: err && err.stack,
      loggedFrom: nowStack,
      details,
      appIds,
      sentByApp,
      sessionId,
      emailHash: userEmailHash,
      extensionId: getExtensionId(),
      loaderVersion: loaderVersion,
      implementationVersion: implVersion,
      origin: document.location.origin,
      timestamp: Date.now() * 1000
    };
    sendError(report);
    if (document.documentElement.getAttribute('inboxsdk-emit-error-event') === 'true') {
      document.documentElement.dispatchEvent(new CustomEvent('inboxSDKerror', {
        bubbles: false,
        cancelable: false,
        detail: {
          message: err && err.message || err,
          stack: err && err.stack,
          loggedFrom: nowStack,
          details,
          sentByApp
        }
      }));
    }
  } catch (err2) {
    tooManyErrors(err2, [err, details, context]);
  }
}
const _extensionSeenErrors = (() => {

  if (!__webpack_require__.g.__inboxsdk_extensionSeenErrors && __webpack_require__.g.WeakMap) {
    Object.defineProperty(__webpack_require__.g, '__inboxsdk_extensionSeenErrors', {
      value: new __webpack_require__.g.WeakMap()
    });
  }
  return {
    has(e) {
      if (__webpack_require__.g.__inboxsdk_extensionSeenErrors) {
        return __webpack_require__.g.__inboxsdk_extensionSeenErrors.has(e);
      } else {
        try {
          return !!e.__inboxsdk_extensionHasSeenError;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    },
    add(e) {
      if (__webpack_require__.g.__inboxsdk_extensionSeenErrors && __webpack_require__.g.__inboxsdk_extensionSeenErrors.set) {

        __webpack_require__.g.__inboxsdk_extensionSeenErrors.set(e, true);
      } else if (__webpack_require__.g.__inboxsdk_extensionSeenErrors && __webpack_require__.g.__inboxsdk_extensionSeenErrors.add) {

        __webpack_require__.g.__inboxsdk_extensionSeenErrors.add(e);
      } else {
        try {
          Object.defineProperty(e, '__inboxsdk_extensionHasSeenError', {
            value: true
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
})();
function haveWeSeenThisErrorAlready(error) {
  if (isObject_default()(error)) {
    return _extensionSeenErrors.has(error);
  }
  return false;
}
function markErrorAsSeen(error) {
  if (isObject_default()(error)) {
    _extensionSeenErrors.add(error);
  }
}

const sendError = rateLimit(function (report) {
  try {
    ajax({
      url: 'https://api.inboxsdk.com/api/v2/errors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(report)
    }).catch(err2 => {
      tooManyErrors(err2, [report]);
    });
  } catch (err2) {
    tooManyErrors(err2, [report]);
  }
}, 60 * 1000, 10);
function tooManyErrors(err2, originalArgs) {
  console.error('ERROR REPORTING ERROR', err2);
  console.error('ORIGINAL ERROR', originalArgs);
}
;

const isContentScript = once_default()(function () {
  if (__webpack_require__.g.chrome && __webpack_require__.g.chrome.extension) return true;
  if (__webpack_require__.g.safari && __webpack_require__.g.safari.extension) return true;
  return false;
});
function addScriptToPage(url, cors) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  if (cors) {
    script.crossOrigin = 'anonymous';
  }
  const promise = new Promise((resolve, reject) => {
    script.addEventListener('error', function (event) {
      reject(event.error || new Error(event.message || 'Load failure: ' + url, event.filename, event.lineno, event.column));
    }, false);
    script.addEventListener('load', function () {

      setTimeout(resolve, 1);
    }, false);
  });
  script.src = url;
  if (!document.head) throw new Error('missing head');
  document.head.appendChild(script);
  return promise;
}
function load_script_loadScript(url, opts) {
  let pr;
  if (isContentScript()) {
    const attempt = function (retryNum, lastErr) {
      if (retryNum > 3) {
        throw lastErr || new Error('Ran out of loadScript attempts for unknown reason');
      }
      return ajax({
        url,
        cachebust: retryNum > 0,
        XMLHttpRequest: opts ? opts.XMLHttpRequest : undefined
      }).then(response => {

        const originalCode = response.text;
        const indirectEval = eval;
        const codeParts = [];
        if (opts && opts.disableSourceMappingURL) {

          codeParts.push(originalCode.replace(/\/\/# sourceMappingURL=(?!data:)[^\n]*\n?$/, ''));
        } else {
          codeParts.push(originalCode);
        }
        if (!opts || !opts.nowrap) {
          codeParts.unshift('(function(){');
          codeParts.push('\n});');
        }
        codeParts.push('\n//# sourceURL=' + url + '\n');
        const codeToRun = codeParts.join('');
        let program;
        try {
          program = indirectEval(codeToRun);
        } catch (err) {
          if (err && err.name === 'SyntaxError') {
            logError(err, {
              retryNum,
              caughtSyntaxError: true,
              url,
              message: `SyntaxError in loading ${url}. Did we not load it fully? Trying again...`
            }, {});
            return (0,js.Z)(5000).then(() => attempt(retryNum + 1, err));
          }

          throw err;
        }
        if (!opts || !opts.nowrap) {
          program.call(__webpack_require__.g);
        }
      });
    };
    pr = attempt(0, null);
  } else {

    pr = addScriptToPage(url, true).catch(() => {

      return addScriptToPage(url, false).then(() => {
        console.warn('Script ' + url + ' included without CORS headers. Error logs might be censored by the browser.');
      });
    });
  }
  pr.catch(err => {
    return connectivityTest().then(connectivityTestResults => {
      logError(err, {
        url,
        connectivityTestResults,
        status: err && err.status,
        response: err && err.xhr ? err.xhr.responseText : null,
        message: 'Failed to load script'
      }, {});
    });
  });
  return pr;
}
;

const loadPI = once_default()(() => {
  return load_script_loadScript("https://www.inboxsdk.com/build/platform-implementation.js", {

    nowrap: true
  });
});
 const load_platform_implementation_REMOTE = (loadPI);
;
class PlatformImplementationLoader {

  static loadScript = () => {
    throw new Error('Unexpected error: This function must be overridden');
  };
  static async load(appId, opts) {
    if (!globalThis.__InboxSDKImpLoader) {
      await this.loadScript();
      if (!globalThis.__InboxSDKImpLoader) {
        throw new Error('Implementation file did not load correctly');
      }
    }
    return globalThis.__InboxSDKImpLoader.load('0.1', appId, opts);
  }
  static async preload() {

    this.loadScript();
  }
}
;

PlatformImplementationLoader.loadScript = load_platform_implementation_REMOTE;
;

const LOADER_VERSION = BUILD_VERSION;

function inboxsdk_loadScript(url, opts) {
  return loadScript(url, opts);
}
function load(version, appId, opts) {
  opts = Object.assign({

    globalErrorLogging: true
  }, opts, {

    VERSION: LOADER_VERSION,
    REQUESTED_API_VERSION: version
  });
  return PlatformImplementationLoader.load(appId, opts);
}
const pageOrigin =  false || document.location.origin;
if ('https://mail.google.com' === pageOrigin) {
  PlatformImplementationLoader.preload();
}
;

setLoadScript(load_script_loadScript);
 const inboxsdk_REMOTE = (inboxsdk_namespaceObject);
})();

__webpack_exports__ = __webpack_exports__["default"];
 	return __webpack_exports__;
 })()
;
});