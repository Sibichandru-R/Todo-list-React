import mail from "./assets/images/sidebar-footer/mail.svg";
import calender from "./assets/images/sidebar-footer/calender.svg";
import people from "./assets/images/sidebar-footer/people.svg";
import link from "./assets/images/sidebar-footer/link.svg";
import tick from "./assets/images/sidebar-footer/tick.svg";
import list from "./assets/images/list.svg";
import grid from "./assets/images/grid.svg";
import star from "./assets/images/sidebar-body/star.svg";
import home from "./assets/images/sidebar-body/home.svg";
import sun from "./assets/images/sidebar-body/sun.svg";
import user from "./assets/images/sidebar-body/user.svg";
import repeat from "./assets/images/repeat.svg";
import remainder from "./assets/images/remainder.svg";

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
  { name: "Remind me", icon: remainder },
  { name: "Add Due Date", icon: calender },
  { name: "Repeat", icon: repeat },
];
