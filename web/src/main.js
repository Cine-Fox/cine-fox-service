import { createApp } from "vue";
import App from "./App.vue";
import {
  Cell,
  Dialog,
  Circle,
  ConfigProvider,
  Divider,
  Icon,
  List,
  Notify,
  Picker,
  Popup,
  Progress,
  Sidebar,
  SidebarItem,
  Slider,
  Switch,
  Tag,
  Field,
  CellGroup,
} from "vant";
import "vant/lib/index.css";

createApp(App)
  .use(Field)
  .use(CellGroup)
  .use(Dialog)
  .use(Cell)
  .use(Circle)
  .use(Slider)
  .use(Tag)
  .use(Popup)
  .use(Notify)
  .use(Progress)
  .use(Switch)
  .use(Divider)
  .use(Picker)
  .use(Sidebar)
  .use(SidebarItem)
  .use(List)
  .use(ConfigProvider)
  .use(Icon)
  .mount("#app");
