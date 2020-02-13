import { Class } from "./core";
import { Texture } from "./texture";
import { extendjs as extend } from "./util/extend";
import { createjs as create } from "./util/create";
import { is_defined, is_array, is_fn, is_number, is_hash, is_string } from "./util/is";
import { startsWith as string } from "./util/string";
var atlas__super;
if (typeof DEBUG === 'undefined')
  DEBUG = true;

// name : atlas
var _atlases_map = {};
// [atlas]
var _atlases_arr = [];

// TODO: print subquery not found error
// TODO: index textures

Class.atlas = function(def) {
  var atlas = is_fn(def.draw) ? def : new Atlas(def);
  if (def.name) {
    _atlases_map[def.name] = atlas;
  }
  _atlases_arr.push(atlas);

  deprecated(def, 'imagePath');
  deprecated(def, 'imageRatio');

  var url = def.imagePath;
  var ratio = def.imageRatio || 1;
  if (is_string(def.image)) {
    url = def.image;
  } else if (is_hash(def.image)) {
    url = def.image.src || def.image.url;
    ratio = def.image.ratio || ratio;
  }
  url && Class.preload(function(done) {
    url = Class.resolve(url);
    DEBUG && console.log('Loading atlas: ' + url);
    var imageloader = Class.config('image-loader');

    imageloader(url, function(image) {
      DEBUG && console.log('Image loaded: ' + url);
      atlas.src(image, ratio);
      done();

    }, function(err) {
      DEBUG && console.log('Error loading atlas: ' + url, err);
      done();
    });
  });

  return atlas;
};

atlas__super = Texture;
Atlas.prototype = create(atlas__super.prototype);

function Atlas(def) {
  atlas__super.call(this);

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
    if (!def || is_fn(def.draw)) {
      return def;
    }

    def = extend({}, def);

    if (is_fn(map)) {
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
      if (is_fn(textures)) {
        return textures(query);
      } else if (is_hash(textures)) {
        return textures[query];
      }
    }
    if (cutouts) { // deprecated
      var result = null, n = 0;
      for (var i = 0; i < cutouts.length; i++) {
        if (string.startsWith(cutouts[i].name, query)) {
          if (n === 0) {
            result = cutouts[i];
          } else if (n === 1) {
            result = [ result, cutouts[i] ];
          } else {
            result.push(cutouts[i]);
          }
          n++;
        }
      }
      if (n === 0 && is_fn(factory)) {
        result = function(subquery) {
          return factory(query + (subquery ? subquery : ''));
        };
      }
      return result;
    }
  }

  this.select = function(query) {
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

var nfTexture = new Texture();
nfTexture.x = nfTexture.y = nfTexture.width = nfTexture.height = 0;
nfTexture.pipe = nfTexture.src = nfTexture.dest = function() {
  return this;
};
nfTexture.draw = function() {
};

var nfSelection = new Selection(nfTexture);

function Selection(result, find, make) {
  function link(result, subquery) {
    if (!result) {
      return nfTexture;

    } else if (is_fn(result.draw)) {
      return result;

    } else if (is_hash(result) && is_number(result.width)
        && is_number(result.height) && is_fn(make)) {
      return make(result);

    } else if (is_hash(result) && is_defined(subquery)) {
      return link(result[subquery]);

    } else if (is_fn(result)) {
      return link(result(subquery));

    } else if (is_array(result)) {
      return link(result[0]);

    } else if (is_string(result) && is_fn(find)) {
      return link(find(result));
    }
  }

  this.one = function(subquery) {
    return link(result, subquery);
  };

  this.array = function(arr) {
    var array = is_array(arr) ? arr : [];
    if (is_array(result)) {
      for (var i = 0; i < result.length; i++) {
        array[i] = link(result[i]);
      }
    } else {
      array[0] = link(result);
    }
    return array;
  };
}

Class.texture = function(query) {
  if (!is_string(query)) {
    return new Selection(query);
  }

  var result = null, atlas, i;

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
  if (name in hash)
    console.log(msg ? msg.replace('%name', name) : '\'' + name
        + '\' field of texture atlas is deprecated.');
}
var exported_Atlas = Atlas;
export { exported_Atlas as Atlas };
