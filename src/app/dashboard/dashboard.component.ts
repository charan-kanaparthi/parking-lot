import { Component } from '@angular/core';
import * as shape from 'd3-shape';
import{DashboardService} from './dashboard.service';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import {
  generateData
} from '../shared/chartData';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  data1:any;
  graphData:any;
  single=[];
  tempArray=[];
  multi=[];
  graph: {
    links: any[],
    nodes: any[]
  };
  dateData: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  tooltipDisabled = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'GDP Per Capita';
  showGridLines = true;
  roundDomains = false;
  colorScheme = {
    domain: [
    '#0099cc', '#2ECC71', '#4cc3d9', '#ffc65d', '#d96557', '#ba68c8'
    ]
  };
  schemeType = 'ordinal';
  // line interpolation
  curve = shape.curveLinear;
  // line, area
  timeline = false;
  // margin
  margin = false;
  marginTop = 40;
  marginRight = 40;
  marginBottom = 40;
  marginLeft = 40;
  // gauge
  gaugeMin = 0;
  gaugeMax = 50;
  gaugeLargeSegments = 10;
  gaugeSmallSegments = 5;
  gaugeTextValue = '';
  gaugeUnits = 'alerts';
  gaugeAngleSpan = 240;
  gaugeStartAngle = -120;
  gaugeShowAxis = true;
  gaugeValue = 50; // linear gauge value
  gaugePreviousValue = 70;

  maxRadius = 10;
  minRadius = 3;

  innerPadding = 0;
  barPadding = 8;
  groupPadding = 16;
 

  constructor(private dashboard:DashboardService) {
    this.dateData = generateData(5, false);
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  ngOnInit()
  {
    this.getData();
  }

  getData()
  {
    this.dashboard.getChartData().subscribe((data)=>{this.data1=data});
    this.dashboard.getBarGraphData().subscribe((data)=>{this.graphData=data});
    setTimeout(()=>{this.getRows()},2000)
  }

  getRows()
  {
    this.single=this.data1;
    var total=this.graphData.total;
    for(var i in this.graphData.data)
    {
      var name1=this.graphData.data[i].name;
      var present=this.graphData.data[i].present;
      var absent=total-present;
      var temp=
        {
          name:name1,
          series:
          [
            {name:'Present',value:present},
            {name:'Absent',value:absent}
          ]
        };
      this.tempArray[i]=temp;
    }
    this.multi=this.tempArray;
  }
}
