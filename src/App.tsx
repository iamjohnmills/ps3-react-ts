import React from 'react'
import EventBus from "./EventBus";
import Wave from "./Wave";
import Menu from "./Menu";
import {MenuData} from "./MenuData.ts"
import menu_sound from './menu-click.wav';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.el_app = React.createRef();
    this.menu_sound = new Audio(menu_sound);
  }
  componentDidMount(): void {
    this.init();
  }
  init(): void {
    this.el_app?.current?.focus();
  }
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    event.preventDefault();
    if(event.code === 'ArrowRight' || event.code === 'ArrowLeft'){
      EventBus.dispatch('navigate', { x: event.code === 'ArrowRight' ? 1 : -1 });
      this.menu_sound.play();
    } else if(event.code === 'ArrowUp' || event.code === 'ArrowDown'){
      EventBus.dispatch('navigate', { y: event.code === 'ArrowDown' ? 1 : -1 });
      this.menu_sound.play();
    }
  }
  render() { return (
  <div className="app" ref={this.el_app} tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
    <Wave />
    <div className="menus">
      <Menu id={0} menu={MenuData} direction="x" />
    </div>
  </div>
  ) }
}

export default App
