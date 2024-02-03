import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';


interface NavNodes {
  name: string;
  routeLink: string;
  iconName: string;
  children?: NavNodes[];
}

const TREE_DATA: NavNodes[] = [
  {
    name: 'Department',
    routeLink: '/department',
    iconName: 'business',
    children: [{name: 'Add Department', routeLink: '/department/add', iconName:''}, {name: 'View Department', routeLink: '/department/view',iconName:''}],
  },
  {
    name: 'Employee',
    routeLink: '/employee',
    iconName: 'supervisor_account',
    children: [{name: 'Add Employee', routeLink: '/employee/add', iconName: ''}, {name: 'View Employee', routeLink: '/employee/view', iconName: ''}],
  },
  
];

/** Flat node with expandable and level information */
interface NavFlatNode {
  expandable: boolean;
  name: string;
  routeLink: string;
  iconName: string;
  level: number;
}




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {

  private _transformer = (node: NavNodes, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      routeLink: node.routeLink,
      iconName: node.iconName,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<NavFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NavFlatNode) => node.expandable;
}
