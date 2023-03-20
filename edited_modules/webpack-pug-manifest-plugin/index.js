var path = require('path');

/*** Modified by Łukasz Ciecierski 2020 ***/


function WebpackPugManifestPlugin (options) {
  this.filename = options.filename;
  //this.sourcePath = options.sourcePath;
  this.assetPattern = options.assetPattern;
  this.outputDir = options.outputDir;
  this.contentPattern = options.contentPattern;
}

const parts = {
  'name': '(\\w+)',
  'anyhash': '\\w+'
};

WebpackPugManifestPlugin.prototype.apply = function (compiler) {
  var filename = this.filename ? this.filename : 'pug-manifest.pug'; 
  //var sourcePath = this.sourcePath ? this.sourcePath : "";  
  var assetPattern = this.assetPattern;
  var outputDir = this.outputDir;
  var contentPattern = this.contentPattern;

  //compiler.plugin('emit', function (compilation, callback) {
  compiler.hooks.emit.tap('PugManifest', function (compilation) {
    var assets = [];

    assetPattern = assetPattern.replace('[name]', parts.name);
    assetPattern = assetPattern.replace('[anyhash]', parts.anyhash);
    const regexp = new RegExp(assetPattern);

    var originalAssets = compilation.assets;

    var assetContentDict = {};
    for (asset in originalAssets) {
      var result = asset.match(regexp);

      if(result !== null && result[1] !== "undefined") {
        let entryName = result[1];
        let entryOutputDir = outputDir.replace('[name]', entryName);
        let entryFilename = filename.replace('[name]', entryName);

        var outputPath = path.join(entryOutputDir, entryFilename);

        let newAssetPiece = contentPattern.replace("[asset]", asset);

        if( entryName in assetContentDict )
          assetContentDict[entryName] = assetContentDict[entryName] + newAssetPiece + '\n';
        else
          assetContentDict[entryName] = newAssetPiece + '\n';

        func = (asset) => ({
          source: function () {
            return assetContentDict[ entryName ];
          },
          size: function () {
            return 1;
          }
        });

        compilation.assets[outputPath] = func(asset);

      }
    }
    ///callback();
  });
};

module.exports = WebpackPugManifestPlugin;


