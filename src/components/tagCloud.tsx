import { List, Tag } from 'antd';

import {Chart, registerShape} from "@antv/g2"
import { View } from "@antv/data-set";

function getTextAttrs(cfg) {
    return Object.assign({}, cfg.style, {
      fillOpacity: cfg.opacity,
      fontSize: cfg.origin._origin.size,
      rotate: cfg.origin._origin.rotate,
      text: cfg.origin._origin.text,
      textAlign: 'center',
      fontFamily: cfg.origin._origin.font,
      fill: cfg.color,
      textBaseline: 'Alphabetic'
    });
  }

registerShape('point', 'cloud', {
    draw: (cfg, container) =>{
      const attrs = getTextAttrs(cfg);
      return container.addShape('text', {
        attrs: Object.assign(attrs, {
          x: cfg.x,
          y: cfg.y
        })
      });
    }
  });

interface PostData {
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
  category: string;
  path: string;
}

var dv = new View().source(data);
var range = dv.range('value');
var min = range[0];
var max = range[1];
var imageMask = new Image();
imageMask.crossOrigin = '';
imageMask.src = '/assets/image/logo-mask-16x9.png';
imageMask.onload = function() {
  dv.transform({
    type: 'tag-cloud',
    fields: ['name', 'value'],
    imageMask: imageMask,
    font: 'Verdana',
    size: [window.innerWidth, window.innerHeight], // 宽高设置最好根据 imageMask 做调整
    padding: 0,
    timeInterval: 5000, // max execute time
    rotate: function rotate() {
      var random = ~~(Math.random() * 4) % 4;
      if (random == 2) {
        random = 0;
      }
      return random * 90; // 0, 90, 270
    },
    fontSize: function fontSize(d) {
      return (d.value - min) / (max - min) * (32 - 8) + 8;
    }
  });
  var chart = new Chart({
    container: 'mountNode',
    width: window.innerWidth, // 宽高设置最好根据 imageMask 做调整
    height: window.innerHeight,
    padding: 0
  });
  chart.data(dv);
  chart.legend(false);
  chart.axis(false);
  chart.tooltip({
    showTitle: false
  });
  chart.coordinate().reflect();
  chart.point().position('x*y').color('text').shape('cloud');
  chart.render();
};

const TagCloud = ({posts}) => {
  return (<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 6,
    }}
    dataSource={posts}
    footer={
      <div> </div>
    }
    renderItem={(item:PostData) => (
      <List.Item
        key={item.title}
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={<a href={item.path}>{item.title}</a>}
          // description={<a href={item.path} >{item.excerpt}</a>}
        />
        <p style={{cursor: 'pointer'}} onClick={()=> {window.location.href=item.path}}>{item.excerpt}</p>
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: "space-between"}}>
          <div>
          {item.tags.map(tag => {
            return (<Tag key={tag}>{tag}</Tag>)
          })}
          </div>
          <div>{item.date}</div>
        </div>
      </List.Item>
    )}
  />)
}

export default TagCloud;