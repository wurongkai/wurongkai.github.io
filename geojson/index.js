const fs = require('fs');
const path = require('path');

// 读取原始GeoJSON文件
const geojsonFilePath = './100000_full.json';
let featureCollection = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));

// 遍历FeatureCollection中的每个Feature并写入单独文件
featureCollection.features.forEach((feature, index) => {
  // 定义输出文件路径与名称
  const outputPath = path.join('./output', `feature_${feature.properties.name}.geojson`);

  // 创建单个Feature的GeoJSON对象
  let singleFeatureJson = {
    "type": "Feature",
    "properties": feature.properties,
    "geometry": feature.geometry
  };

  // 将单个Feature转换为字符串并写入文件
  let singleFeatureString = JSON.stringify(singleFeatureJson, null, 2);
  
  // 写入文件
  fs.writeFileSync(outputPath, singleFeatureString, 'utf8');
});

console.log('已完成将GeoJSON Feature拆分为单独文件的操作。');