import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  }, 
  {
    state: 'operations',
    name: 'slot selection',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'slot_allotment',
        name: 'select slot'
      }
     
    ]
  },
  {
    state: 'authentication',
    name: 'AUTHENTICATION',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'signin',
        name: 'SIGNIN'
      },
      {
        state: 'signup',
        name: 'SIGNUP'
      },
    ]
  },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
