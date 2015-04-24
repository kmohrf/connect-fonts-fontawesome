const path = require("path"),
      fs = require("fs"),
      mkdirp = require("mkdirp"),
      fontawesome = require.resolve(path.join('font-awesome', 'package')),
      awesomefontdir = path.resolve(path.join(fontawesome, '..', 'fonts'));

// connect-fonts is very strict about
// font directory layout, it expects:
// directory
//  `- locale (or 'default')
//       `- font
//       `- font
//  `- locale (or 'default')
//       `- font
//
// Standard distribution of the font awesome is flat, so we
// need to copy files over.
//
const dst = path.join(__dirname, 'fonts'),
    dstpkg = path.join(dst, 'package.json');
    dstdir = path.join(dst, 'default');

mkdirp(dstdir, function(err) {
	if (!err) {
		  try {
			if (require(fontawesome).version == require(dstpkg).version) {
			  // We have the same version cached already
			  return;
			}
		  } catch(e) { }
		  fs.readdir(awesomefontdir, function(err, files) {
			  if (!err) {
				 files.forEach(function(fontFile) {
					 fs.createReadStream(path.join(awesomefontdir, fontFile))
						.pipe(fs.createWriteStream(path.join(dstdir, fontFile)));
				 });
				 // We copy the package.json from font-awesome.
				 // This way we can compare versions to
				 // automatically update fonts when needed.
				 fs.createReadStream(fontawesome).pipe(fs.createWriteStream(dstpkg));
			  }
		  });
	} else
		console.log('Cannot create ' + dstdir);
});

module.exports = {
	"root": dst, // We should really be able to say "root": awesomefontdir

	// Package info
	"package": {
		"name": "connect-fonts-fontawesome",
		"homepage": "https://github.com/kmohrf/connect-fonts-fontawesome",
		"repourl": "https://github.com/kmohrf/connect-fonts-fontawesome",
		"bugsurl": "https://github.com/kmohrf/connect-fonts-fontawesome/issues"
	},

	// Package author info
	"author": {
		"name": "Konrad Mohrfeldt",
		"emails": "konrad.mohrfeldt@farbdev.org",
		"urls": "https://konradmohrfeldt.farbdev.org",
		"github": "https://github.com/kmohrf",
		"twitter": "@kmohrf"
	},

	// package license info
	"license": {
		"name": "MIT License"
	},

	// Common font information
	"font_common": {
		"names": "fontawesome",
		"family": "FontAwesome",
		"copyright": "Copyright (c) Dave Gandy (@davegandy)"
	},


	// where to find a locale's fonts in the fonts directory
	"locale-to-subdirs": {},

	// what font types are enabled and what are the extensions of
	// the font files.
	//
	// valid types are embedded-opentype, woff, truetype, svg
	"enabled-types": [ "eot", "woff", "ttf", "svg" ],

	// The fonts. The name of the font must be the same as the font
	// in the fonts directory.
	"fonts": {
		"fontawesome-webfont": {
			"fontFamily": "FontAwesome",
			"fontStyle": "normal",
			"fontWeight": "400",
			"local": ["FontAwesome"]
		}
	}
};
