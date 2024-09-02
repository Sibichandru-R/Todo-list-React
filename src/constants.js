import mail from "./assets/sidebar-footer/mail.svg";
import calender from "./assets/sidebar-footer/calender.svg";
import people from "./assets/sidebar-footer/people.svg";
import link from "./assets/sidebar-footer/link.svg";
import tick from "./assets/sidebar-footer/tick.svg";
import list from "./assets/list.svg";
import grid from "./assets/grid.svg";
import star from "./assets/sidebar-body/star.svg";
import home from "./assets/sidebar-body/home.svg";
import sun from "./assets/sidebar-body/sun.svg";
import user from "./assets/sidebar-body/user.svg";
import repeat from './assets/repeat.svg'
import remainder from './assets/remainder.svg'

export const sidebarContent = [
  { name: "My Day", icon: sun },
  { name: "Important", icon: star },
  { name: "Planned", icon: calender },
  { name: "Assigned to me", icon: user },
  { name: "Tasks", icon: home },
];

export const sidebarFooterIcons = [mail, calender, people, link, tick];

export const layouts = [
  { name: "grid", icon: grid },
  { name: "list", icon: list },
];

export const addTodoOptions = [
  { name: "calender", icon: calender },
  { name: "remind me", icon: remainder },
  { name: "repeat", icon: repeat },
];
