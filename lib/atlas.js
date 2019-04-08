Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Atlas;

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

var _texture = require("./texture");

var _texture2 = _interopRequireDefault(_texture);

var _extend = require("./util/extend");

var _extend2 = _interopRequireDefault(_extend);

var _create = require("./util/create");

var _create2 = _interopRequireDefault(_create);

var _is = require("./util/is");

var _is2 = _interopRequireDefault(_is);

var _string = require("./util/string");

var string = _interopRequireWildcard(_string);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

if (typeof DEBUG === 'undefined') DEBUG = true;

// name : atlas
var _atlases_map = {};
// [atlas]
var _atlases_arr = [];

// TODO: print subquery not found error
// TODO: index textures

_core2.default.atlas = function (def) {
  var atlas = _is2.default.fn(def.draw) ? def : new Atlas(def);
  if (def.name) {
    _atlases_map[def.name] = atlas;
  }
  _atlases_arr.push(atlas);

  deprecated(def, 'imagePath');
  deprecated(def, 'imageRatio');

  var url = def.imagePath;
  var ratio = def.imageRatio || 1;
  if (_is2.default.string(def.image)) {
    url = def.image;
  } else if (_is2.default.hash(def.image)) {
    url = def.image.src || def.image.url;
    ratio = def.image.ratio || ratio;
  }
  url && _core2.default.preload(function (done) {
    url = _core2.default.resolve(url);
    DEBUG && console.log('Loading atlas: ' + url);
    var imageloader = _core2.default.config('image-loader');

    imageloader(url, function (image) {
      DEBUG && console.log('Image loaded: ' + url);
      atlas.src(image, ratio);
      done();
    }, function (err) {
      DEBUG && console.log('Error loading atlas: ' + url, err);
      done();
    });
  });

  return atlas;
};

Atlas._super = _texture2.default;
Atlas.prototype = (0, _create2.default)(Atlas._super.prototype);

function Atlas(def) {
  Atlas._super.call(this);

  var atlas = this;

  deprecated(def, 'filter');
  deprecated(def, 'cutouts');
  deprecated(def, 'sprites');
  deprecated(def, 'factory');

  var map = def.map || def.filter;
  var ppu = def.ppu || def.ratio || 1;
  var trim = def.trim || 0;
  var textures = def.textures;
  var factory = def.factory;
  var cutouts = def.cutouts || def.sprites;

  function make(def) {
    if (!def || _is2.default.fn(def.draw)) {
      return def;
    }

    def = (0, _extend2.default)({}, def);

    if (_is2.default.fn(map)) {
      def = map(def);
    }

    if (ppu != 1) {
      def.x *= ppu, def.y *= ppu;
      def.width *= ppu, def.height *= ppu;
      def.top *= ppu, def.bottom *= ppu;
      def.left *= ppu, def.right *= ppu;
    }

    if (trim != 0) {
      def.x += trim, def.y += trim;
      def.width -= 2 * trim, def.height -= 2 * trim;
      def.top -= trim, def.bottom -= trim;
      def.left -= trim, def.right -= trim;
    }

    var texture = atlas.pipe();
    texture.top = def.top, texture.bottom = def.bottom;
    texture.left = def.left, texture.right = def.right;
    texture.src(def.x, def.y, def.width, def.height);
    return texture;
  }

  function find(query) {
    if (textures) {
      if (_is2.default.fn(textures)) {
        return textures(query);
      } else if (_is2.default.hash(textures)) {
        return textures[query];
      }
    }
    if (cutouts) {
      // deprecated
      var result = null,
          n = 0;
      for (var i = 0; i < cutouts.length; i++) {
        if (string.startsWith(cutouts[i].name, query)) {
          if (n === 0) {
            result = cutouts[i];
          } else if (n === 1) {
            result = [result, cutouts[i]];
          } else {
            result.push(cutouts[i]);
          }
          n++;
        }
      }
      if (n === 0 && _is2.default.fn(factory)) {
        result = function result(subquery) {
          return factory(query + (subquery ? subquery : ''));
        };
      }
      return result;
    }
  }

  this.select = function (query) {
    if (!query) {
      // TODO: if `textures` is texture def, map or fn?
      return new Selection(this.pipe());
    }
    var found = find(query);
    if (found) {
      return new Selection(found, find, make);
    }
  };
}

var nfTexture = new _texture2.default();
nfTexture.x = nfTexture.y = nfTexture.width = nfTexture.height = 0;
nfTexture.pipe = nfTexture.src = nfTexture.dest = function () {
  return this;
};
nfTexture.draw = function () {};

var nfSelection = new Selection(nfTexture);

function Selection(result, find, make) {
  function link(result, subquery) {
    if (!result) {
      return nfTexture;
    } else if (_is2.default.fn(result.draw)) {
      return result;
    } else if (_is2.default.hash(result) && _is2.default.number(result.width) && _is2.default.number(result.height) && _is2.default.fn(make)) {
      return make(result);
    } else if (_is2.default.hash(result) && _is2.default.defined(subquery)) {
      return link(result[subquery]);
    } else if (_is2.default.fn(result)) {
      return link(result(subquery));
    } else if (_is2.default.array(result)) {
      return link(result[0]);
    } else if (_is2.default.string(result) && _is2.default.fn(find)) {
      return link(find(result));
    }
  }

  this.one = function (subquery) {
    return link(result, subquery);
  };

  this.array = function (arr) {
    var array = _is2.default.array(arr) ? arr : [];
    if (_is2.default.array(result)) {
      for (var i = 0; i < result.length; i++) {
        array[i] = link(result[i]);
      }
    } else {
      array[0] = link(result);
    }
    return array;
  };
}

_core2.default.texture = function (query) {
  if (!_is2.default.string(query)) {
    return new Selection(query);
  }

  var result = null,
      atlas,
      i;

  if ((i = query.indexOf(':')) > 0 && query.length > i + 1) {
    atlas = _atlases_map[query.slice(0, i)];
    result = atlas && atlas.select(query.slice(i + 1));
  }

  if (!result && (atlas = _atlases_map[query])) {
    result = atlas.select();
  }

  for (i = 0; !result && i < _atlases_arr.length; i++) {
    result = _atlases_arr[i].select(query);
  }

  if (!result) {
    console.error('Texture not found: ' + query);
    result = nfSelection;
  }

  return result;
};

function deprecated(hash, name, msg) {
  if (name in hash) console.log(msg ? msg.replace('%name', name) : '\'' + name + '\' field of texture atlas is deprecated.');
}
module.exports = exports.default;
