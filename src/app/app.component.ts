import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DiagramModule, DataBinding, Diagram, MindMap, NodeModel, ConnectorModel, PointPortModel, IClickEventArgs } from '@syncfusion/ej2-angular-diagrams'; 
import { DataManager } from '@syncfusion/ej2-data';
import { mindMapData } from './data';
Diagram.Inject(DataBinding, MindMap)
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiagramModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Lizmotors';

  public data = {
    dataSource: new DataManager(mindMapData), 
    id: 'id',
    parentId: 'parentId'
  }
  public layoutSettings = {
    type: 'mindMap', horizantalSpacing: 50, verticalSpacing: 20
  }
  public nodeDefaults(obj: NodeModel) {
    console.log(obj, 'node obj')
    let nodeData:any = obj.data;
    obj.annotations = [{content: nodeData.Label, style: {color:'White'}}]
    obj.height = 30;
    obj.width = 110;
    if (nodeData.branch == 'Root') {
      obj.shape = {type:'Basic', shape: 'Parallelogram'},
      obj.style = {fill: '#E74C3C', strokeWidth: 0},
      obj.offsetX = -20;
      obj.offsetY = 250
    } else if (nodeData.branch == 'Right' || nodeData.branch == 'subRight') {
      obj.shape = {type:'Basic', shape: 'Rectangle'},
      obj.style = {fill: '#8E44AD', strokeWidth: 0}
      if (nodeData.parentId == 2) {
        obj.style = {fill: '#9999ff', strokeWidth: 0}
      } if (nodeData.parentId == 7) {
        obj.style = {fill: '#ff4dff', strokeWidth: 0}
      } if (nodeData.parentId == 9) {
        obj.style = {fill: '#66ff66', strokeWidth: 0}
      } if (nodeData.parentId == 3) {
        obj.style = {fill: '#ff80aa', strokeWidth: 0}
      } if (nodeData.parentId == 4) {
        obj.style = {fill: '#33ffcc', strokeWidth: 0}
      } if (nodeData.parentId == 5) {
        obj.style = {fill: '#ff4d94', strokeWidth: 0}
      } if (nodeData.parentId == 6) {
        obj.style = {fill: '#6666ff', strokeWidth: 0}
      }
    }
    if (nodeData.parentId == 1) {
      if (nodeData.Label == "Research") {obj.offsetX = 200; obj.offsetY = 50}
      if (nodeData.Label == "Planning") {obj.offsetX = 200; obj.offsetY = 150}
      if (nodeData.Label == "Design") {obj.offsetX = 200; obj.offsetY = 250}
      if (nodeData.Label == "Manufacturing") {obj.offsetX = 200; obj.offsetY = 350}
      if (nodeData.Label == "Sales") {obj.offsetX = 200; obj.offsetY = 450}
    } if (nodeData.parentId == 2) {
      if (nodeData.Label == "Internal") {obj.offsetX = 400; obj.offsetY = 30}
      if (nodeData.Label == "Enternal") {obj.offsetX = 400; obj.offsetY = 70}
    } if (nodeData.parentId == 3) {
      if (nodeData.Label == "PRD") {obj.offsetX = 400; obj.offsetY = 130}
      if (nodeData.Label == "Specs") {obj.offsetX = 400; obj.offsetY = 170}
    } if (nodeData.parentId == 4) {
      if (nodeData.Label == "Hardware") {obj.offsetX = 400; obj.offsetY = 230}
      if (nodeData.Label == "Software") {obj.offsetX = 400; obj.offsetY = 270}
    } if (nodeData.parentId == 5) {
      if (nodeData.Label == "Material") {obj.offsetX = 400; obj.offsetY = 330}
      if (nodeData.Label == "Production") {obj.offsetX = 400; obj.offsetY = 370}
    } if (nodeData.parentId == 6) {
      if (nodeData.Label == "Online") {obj.offsetX = 400; obj.offsetY = 430}
      if (nodeData.Label == "Dealership") {obj.offsetX = 400; obj.offsetY = 470}
    }
      if (nodeData.parentId == 7) {
      if (nodeData.Label == "B2C") {obj.offsetX = 600; obj.offsetY = 60}
    } if (nodeData.parentId == 9) {
      if (nodeData.Label == "Online") {obj.offsetX = 800; obj.offsetY = 30}
      if (nodeData.Label == "Public Data") {obj.offsetX = 800; obj.offsetY = 70}
      if (nodeData.Label == "Interview") {obj.offsetX = 800; obj.offsetY = 110}
      if (nodeData.Label == "Health") {obj.offsetX = 800; obj.offsetY = 150}
    }
    obj.ports = getPorts();
  }
  public connectorDefaults(connector: ConnectorModel, diagram: Diagram) {
    let sourceNode:NodeModel = diagram.getObject(connector.sourceID as string);
    let targetNode:NodeModel = diagram.getObject(connector.targetID as string);
    let targetNodeData: any = targetNode.data;
    connector.type = 'Bezier';
    connector.targetDecorator = {shape: 'None'};
    // if(targetNodeData.branch == 'Right' || targetNodeData.branch == 'subRight') {
      connector.sourcePortID = (sourceNode as any).ports[1].id;
      connector.targetPortID = (targetNode as any).ports[0].id;
      connector.style = {strokeColor: '#8E44AD', strokeWidth: 3}
    // }
  }
  
}
function getPorts(): PointPortModel[]{
  let ports: PointPortModel[] = [
    {id: 'port1', offset:{x:0, y:0.5}},
    {id: 'port2', offset:{x:1, y:0.5}}
  ]
  return ports
}
