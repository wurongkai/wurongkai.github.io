
// let now = new Date()
// while((new Date().getTime)-now.getTime()<1000*60*2){

// }
function sleep(d){  
    let t = Date.now();
    while(Date.now() - t <= d);  
}

function test(t) {
    alert('sleep');
    sleep(t);
    alert('run');
}


/** 1.初始化cesium并加载数据*/
Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NGM4MDcxOS05Zjk3LTQ2YmMtYjAxYi0zYTczNWFkYzFlN2EiLCJpZCI6NzY0NTcsImlhdCI6MTYzOTQ2ODI2NH0.Zsp28WnnCpj4wlAIQwIwcSob228zSaz510QE3zKQN58";
var viewer = new Cesium.Viewer("cesiumContainer", {
    //terrainProvider: Cesium.createWorldTerrain(),
    animation: false, //是否显示动画工具
    timeline: false, //是否显示时间轴工具
    fullscreenButton: false, //是否显示全屏按钮工具
});
viewer.scene.globe.depthTestAgainstTerrain = false;
var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
var screenPosition;

// test(1000*60)
function xyToLonlat(clickPosition) {
    // 使用Viewer的pickPosition方法从屏幕坐标转换到世界坐标（笛卡尔坐标）
    var cartesianPosition = viewer.camera.pickEllipsoid(
        clickPosition,
        Cesium.Ellipsoid.WGS84
    );

    // 如果鼠标点击在地球上（而非天空或其他物体上），则继续转换坐标
    if (cartesianPosition) {
        // 将世界坐标（笛卡尔坐标）转换为地理坐标（经度、纬度、高度）
        var cartographicPosition =
            Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesianPosition);

        // 将弧度形式的经度和纬度转换为度数
        var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
        var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);

        // 输出经纬度坐标
        console.log(
            `经度: ${longitude.toFixed(6)}, 纬度: ${latitude.toFixed(6)}`
        );
        return [longitude.toFixed(6), latitude.toFixed(6)];
    } else {
        console.log("鼠标点击位置不在地球上");
        return null;
    }
}

var myDataSource;
// fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
//     .then((response) =>
//         response.ok ? response.json() : Promise.reject(response)
//     )
//     .then((data) => {
//         console.log("GeoJsonData", data);
//         GeoJsonData = data;
//         // 处理数据
//         var GeoJsonDataPromise = viewer.dataSources.add(
//             Cesium.GeoJsonDataSource.load(data, {
//                 fill: Cesium.Color.PINK, //填充色
//                 stroke: Cesium.Color.HOTPINK, //轮廓颜色
//                 strokeWidth: 0, //轮廓宽度
//             })
//         );
//         GeoJsonDataPromise.then((dataSource) => {
//             myDataSource = dataSource;
//             viewer.zoomTo(GeoJsonDataPromise);
//             myDataSource.entities.values.forEach(function (entity) {
//                 entity.show = false;
//             });
//             // 或者使用更平滑过渡的效果（如果支持）
//             viewer.scene.morphTo2D();
//         });
//     })
//     .catch((error) => console.error("Error:", error));

// GeoJsonData = JSON.parse(GeoJsonData)
// 处理数据
var GeoJsonDataPromise = viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(GeoJsonData, {
        fill: Cesium.Color.PINK, //填充色
        stroke: Cesium.Color.HOTPINK, //轮廓颜色
        strokeWidth: 0, //轮廓宽度
    })
);
GeoJsonDataPromise.then((dataSource) => {
    myDataSource = dataSource;
    viewer.zoomTo(GeoJsonDataPromise);
    myDataSource.entities.values.forEach(function (entity) {
        entity.show = false;
    });
    // 或者使用更平滑过渡的效果（如果支持）
    viewer.scene.morphTo2D();
});

function setImgAndDrag() {
    // 获取目标父节点
    var container = document.querySelector(".card-container");
    var dataList = [
        // {
        //   name: "output_.png",
        //   path: "./img/1/output_.png",
        //   size: 62253,
        //   mtime: "2024-03-05T03:15:08.513Z",
        // },
        {
            name: "output_上海市.png",
            path: "./img/1/output_上海市.png",
            size: 70838,
            mtime: "2024-03-05T03:15:11.061Z",
        },
        {
            name: "output_云南省.png",
            path: "./img/1/output_云南省.png",
            size: 95190,
            mtime: "2024-03-05T03:15:11.730Z",
        },
        {
            name: "output_北京市.png",
            path: "./img/1/output_北京市.png",
            size: 62103,
            mtime: "2024-03-05T03:15:08.864Z",
        },
        {
            name: "output_内蒙古自治区.png",
            path: "./img/1/output_内蒙古自治区.png",
            size: 116666,
            mtime: "2024-03-05T03:15:10.462Z",
        },
        {
            name: "output_台湾省.png",
            path: "./img/1/output_台湾省.png",
            size: 48897,
            mtime: "2024-03-05T03:15:11.249Z",
        },
        {
            name: "output_吉林省.png",
            path: "./img/1/output_吉林省.png",
            size: 74355,
            mtime: "2024-03-05T03:15:10.035Z",
        },
        {
            name: "output_四川省.png",
            path: "./img/1/output_四川省.png",
            size: 115856,
            mtime: "2024-03-05T03:15:11.164Z",
        },
        {
            name: "output_天津市.png",
            path: "./img/1/output_天津市.png",
            size: 61576,
            mtime: "2024-03-05T03:15:11.336Z",
        },
        {
            name: "output_宁夏回族自治区.png",
            path: "./img/1/output_宁夏回族自治区.png",
            size: 74538,
            mtime: "2024-03-05T03:15:10.569Z",
        },
        {
            name: "output_安徽省.png",
            path: "./img/1/output_安徽省.png",
            size: 89768,
            mtime: "2024-03-05T03:15:08.656Z",
        },
        {
            name: "output_山东省.png",
            path: "./img/1/output_山东省.png",
            size: 89795,
            mtime: "2024-03-05T03:15:10.761Z",
        },
        {
            name: "output_山西省.png",
            path: "./img/1/output_山西省.png",
            size: 87272,
            mtime: "2024-03-05T03:15:10.862Z",
        },
        {
            name: "output_广东省.png",
            path: "./img/1/output_广东省.png",
            size: 81215,
            mtime: "2024-03-05T03:15:09.166Z",
        },
        {
            name: "output_广西壮族自治区.png",
            path: "./img/1/output_广西壮族自治区.png",
            size: 82547,
            mtime: "2024-03-05T03:15:09.264Z",
        },
        {
            name: "output_新疆维吾尔自治区.png",
            path: "./img/1/output_新疆维吾尔自治区.png",
            size: 59284,
            mtime: "2024-03-05T03:15:11.634Z",
        },
        {
            name: "output_江苏省.png",
            path: "./img/1/output_江苏省.png",
            size: 81587,
            mtime: "2024-03-05T03:15:10.136Z",
        },
        {
            name: "output_江西省.png",
            path: "./img/1/output_江西省.png",
            size: 91860,
            mtime: "2024-03-05T03:15:10.238Z",
        },
        {
            name: "output_河北省.png",
            path: "./img/1/output_河北省.png",
            size: 103806,
            mtime: "2024-03-05T03:15:09.543Z",
        },
        {
            name: "output_浙江省.png",
            path: "./img/1/output_浙江省.png",
            size: 80926,
            mtime: "2024-03-05T03:15:11.821Z",
        },
        {
            name: "output_海南省.png",
            path: "./img/1/output_海南省.png",
            size: 32468,
            mtime: "2024-03-05T03:15:09.445Z",
        },
        {
            name: "output_湖北省.png",
            path: "./img/1/output_湖北省.png",
            size: 87801,
            mtime: "2024-03-05T03:15:09.839Z",
        },
        {
            name: "output_湖南省.png",
            path: "./img/1/output_湖南省.png",
            size: 87355,
            mtime: "2024-03-05T03:15:09.942Z",
        },
        {
            name: "output_河南省.png",
            path: "./img/1/output_河南省.png",
            size: 77741,
            mtime: "2024-03-05T03:15:09.641Z",
        },
        {
            name: "output_澳门特别行政区.png",
            path: "./img/1/output_澳门特别行政区.png",
            size: 30291,
            mtime: "2024-03-05T03:15:08.774Z",
        },
        {
            name: "output_甘肃省.png",
            path: "./img/1/output_甘肃省.png",
            size: 102791,
            mtime: "2024-03-05T03:15:09.062Z",
        },
        {
            name: "output_福建省.png",
            path: "./img/1/output_福建省.png",
            size: 81000,
            mtime: "2024-03-05T03:15:08.959Z",
        },
        {
            name: "output_贵州省.png",
            path: "./img/1/output_贵州省.png",
            size: 93153,
            mtime: "2024-03-05T03:15:09.362Z",
        },
        {
            name: "output_西藏自治区.png",
            path: "./img/1/output_西藏自治区.png",
            size: 74752,
            mtime: "2024-03-05T03:15:11.434Z",
        },
        {
            name: "output_重庆市.png",
            path: "./img/1/output_重庆市.png",
            size: 84986,
            mtime: "2024-03-05T03:15:11.920Z",
        },
        {
            name: "output_辽宁省.png",
            path: "./img/1/output_辽宁省.png",
            size: 71637,
            mtime: "2024-03-05T03:15:10.333Z",
        },
        {
            name: "output_陕西省.png",
            path: "./img/1/output_陕西省.png",
            size: 106572,
            mtime: "2024-03-05T03:15:10.970Z",
        },
        {
            name: "output_青海省.png",
            path: "./img/1/output_青海省.png",
            size: 79382,
            mtime: "2024-03-05T03:15:10.666Z",
        },
        {
            name: "output_香港特别行政区.png",
            path: "./img/1/output_香港特别行政区.png",
            size: 74178,
            mtime: "2024-03-05T03:15:11.541Z",
        },
        {
            name: "output_黑龙江省.png",
            path: "./img/1/output_黑龙江省.png",
            size: 74024,
            mtime: "2024-03-05T03:15:09.739Z",
        },
    ];
    // 遍历列表并创建HTML结构
    dataList.forEach(function (item, index) {
        // 创建新的div元素并设置类名
        var cardDiv = document.createElement("div");
        cardDiv.className = "card";
        // cardDiv.setAttribute('draggable', 'true');

        // 创建新的img元素
        var imgElement = document.createElement("img");
        // cardDiv.setAttribute('draggable', 'false');

        // 设置img元素的src和alt属性
        imgElement.src = 'https://www.xqdtzg.cn/obs/qdt/20230109copy/' + item.path.split('./')[1];
        imgElement.alt = item.name.split("_")[1].split(".")[0];
        imgElement.className = "card__image";

        // 将img元素添加到div元素中
        cardDiv.appendChild(imgElement);

        // 将div元素添加到容器中
        container.appendChild(cardDiv);
    });

    // ----------------drag--------------------//
    var mapElement = document.querySelector("#cesiumContainer");
    let source,
        inCanvas = false;
    //拖拽开始事件，只触发一次
    mapElement.ondragstart = (e) => {
        //改变拖拽开始时的鼠标样式为加号
        e.dataTransfer.effectAllowed = "move"; //注意：这里的属性名不包含data-
        //dataTransfer.effectAllowed属性指定拖放操作所允许的一个效果
        // copy 操作用于指示被拖动的数据将从当前位置复制到放置位置。move 操作用于指定被拖动的数据将被移动。link 操作用于指示将在源和放置位置之间创建某种形式的关系或连接。
        // 获取H5自定义属性和设置自定义属性依然使用Attribute函数,eg:tBox.setAttribute("data-name", "123456");
        // 在H5里面新增了dataset属性（在IE11里面才能被支持），dataset属性会将这个元素的所有自定义属性全部以键值对的方式保存起来，并且也可以通过该属性获取属性值
        source = e.target;
        source.classList.add("drop-over");
        console.log("start", e.target);
    };

    //拖拽结束事件,表示拖拽这个元素到哪个元素之上，不断触发
    mapElement.ondragover = (e) => {
        e.preventDefault();
        // console.log('over', e.target)
    };

    //拖拽移入事件，只触发一次
    mapElement.ondragenter = (e) => {
        console.log("enter", e.target);
        let element = e.target;
        if (
            element &&
            element.tagName &&
            element.tagName.toLowerCase() === "canvas"
        ) {
            console.log("ya canvas");
            inCanvas = true;
        }
    };

    //拖拽放手在哪个元素,table,tr,td,这些元素是不允许元素拖拽到他的上面的，因此是不会触发这个事件的，要触发需阻止浏览器默认事件，在ondragover中阻止
    mapElement.ondrop = (e) => {
        console.log("e:", e);
        source.classList.remove("drop-over");
        let element = e.target;
        // 获取相对于视口的坐标
        var clientCoords = {
            x: e.clientX,
            y: e.clientY,
        };

        // 获取相对于整个文档的坐标
        var pageCoords = {
            x: e.pageX,
            y: e.pageY,
        };

        // 输出坐标信息
        console.log("Client Coordinates: ", clientCoords);
        console.log("Page Coordinates: ", pageCoords);

        // 有滚动条情况下的屏幕坐标，有兼容性问题
        // 并不是所有浏览器都支持window.scrollX和window.scrollY属性，有些浏览器可能需要使用window.pageXOffset和window.pageYOffset。同时，考虑到跨浏览器兼容性，有时可能需要额外的polyfill或适配处理
        var screenCoords = {
            x: e.clientX + window.scrollX,
            y: e.clientY + window.scrollY,
        };

        console.log("Screen Coordinates: ", screenCoords);

        if (inCanvas) {
            console.log("source:", source);
            let provenceName = source.getAttribute("alt");
            console.log("provenceName:", provenceName);
            console.log("GeoJsonData:", GeoJsonData);

            let properties = GeoJsonData.features.filter((f) => {
                return f.properties.name == provenceName;
            })[0].properties;
            console.log("center:", properties.center);
            console.log("centroid:", properties.centroid);

            let lonlat = xyToLonlat(screenCoords);
            var from = turf.point(properties.centroid || properties.center);
            var to = turf.point(lonlat);
            var options = { units: "kilometers" };
            var distance = turf.distance(from, to, options);
            console.log("distance:", distance);
            let polygon = getFeature("name", provenceName, "polygon");
            ;
            var pt = turf.point(lonlat);
            let poly = GeoJsonData.features.filter((f) => {
                return f.properties.name == provenceName;
            })[0];
            let inPolygon = turf.booleanPointInPolygon(pt, poly);


            if (distance < 200 || inPolygon) {
                toggleFeatureVisibility("name", provenceName, true);
                source.parentNode.remove();
            }
            if (!container.childElementCount) {
                alert("Welldone!")
            }
        }
    };
}
setTimeout(test(1000*30),1000*10)
setImgAndDrag();
// 定义一个方法，根据特定属性筛选并隐藏或显示要素
function toggleFeatureVisibility(
    attributeName,
    attributeValue,
    visibility
) {
    myDataSource.entities.values.forEach(function (entity) {
        // let a = entity.properties[attributeName]
        // let b = entity.properties[attributeName]._value
        // let c = entity.properties.hasOwnProperty(attributeName)
        // 
        if (
            entity.properties.hasOwnProperty(attributeName) &&
            entity.properties[attributeName]._value == attributeValue
        ) {
            entity.show = visibility;
        }
    });
}
// 定义一个方法，根据特定属性改变要素的透明度
function setFeatureOpacity(attributeName, attributeValue, opacity) {
    myDataSource.entities.values.forEach(function (entity) {
        if (
            entity.properties.hasOwnProperty(attributeName) &&
            entity.properties[attributeName]._value === attributeValue
        ) {
            if (entity.polygon) {
                entity.polygon.material.uniforms.color.alpha = opacity;
            } else if (entity.polyline) {
                entity.polyline.material.uniforms.color.alpha = opacity;
            } else if (entity.billboard) {
                entity.billboard.color.alpha = opacity;
            } // 根据需要添加其他类型的图形，如label或其他自定义图形
        }
    });
}
// 根据特定属性获取要素
function getFeature(attributeName, attributeValue, type) {
    let res;
    for (var i = 0; i < myDataSource.entities.values.length; i++) {
        let entity = myDataSource.entities.values[i];
        if (
            entity.properties.hasOwnProperty(attributeName) &&
            entity.properties[attributeName]._value === attributeValue
        ) {
            ;
            if (type == "polygon") {
                res = entity.polygon;
                break;
            } else if (type == "polyline") {
                res = entity.polyline;
                break;
            } else if (type == "billboard") {
                res = entity.billboard;
                break;
            } // 根据需要添加其他类型的图形，如label或其他自定义图形
        }
    }
    return res;
}