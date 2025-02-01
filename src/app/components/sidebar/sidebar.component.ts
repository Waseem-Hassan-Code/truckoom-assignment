import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Router } from '@angular/router';

interface NavNodes {
  name: string;
  routeLink: string;
  iconName: string;
  children?: NavNodes[];
}

const TREE_DATA: NavNodes[] = [
  { name: 'Dashboard', routeLink: '/dashboard', iconName: 'dashboard' },
  {
    name: 'Services',
    routeLink: '/services',
    iconName: 'assignment',
    children: [
      {
        name: 'Add Service',
        routeLink: '/services/add',
        iconName: 'add_circle',
      },
      {
        name: 'View Services',
        routeLink: '/services/view',
        iconName: 'visibility',
      },
    ],
  },
  {
    name: 'Tasks',
    routeLink: '/tasks',
    iconName: 'work',
    children: [
      { name: 'Add Task', routeLink: '/tasks/add', iconName: 'add_task' },
      { name: 'View Tasks', routeLink: '/tasks/view', iconName: 'view_list' },
    ],
  },
];

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
  styleUrls: ['./sidebar.component.css'],
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
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router) {
    this.dataSource.data = this.getFilteredTreeData();

    this.router.events.subscribe(() => {
      this.dataSource.data = this.getFilteredTreeData();
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getFilteredTreeData(): NavNodes[] {
    if (this.isAuthenticated()) {
      return TREE_DATA;
    } else {
      return TREE_DATA.filter((node) => node.name === '');
    }
  }

  hasChild = (_: number, node: NavFlatNode) => node.expandable;
}
