import React from 'react'
import EventBus from "./EventBus";
import Wave from "./Wave";
import Menu from "./Menu";
import {MenuData} from "./MenuData"
// import menu_sound_file from './menu-click.wav';

interface IAppProps {}

class App extends React.Component<IAppProps, {}> {
  private el_app = React.createRef<HTMLDivElement>();
  private menu_data:Array<any> = MenuData;
  private allowed_x:Array<string> = ['ArrowRight','ArrowLeft'];
  private allowed_y:Array<string> = ['ArrowUp','ArrowDown'];
  private clientX:number = 0;
  private clientY:number = 0;
  constructor(props: IAppProps) {
    super(props);
  }
  componentDidMount(): void {
    this.init();
    window.addEventListener('touchstart', (event: React.TouchEvent): void => {
      this.clientX = event.touches[0].clientX;
      this.clientY = event.touches[0].clientY;
    });
    window.addEventListener('touchend', (event: React.TouchEvent): void => {
      const distance_x:number = event.changedTouches[0].clientX - this.clientX;
      const distance_y:number = event.changedTouches[0].clientY - this.clientY;
      if(Math.abs(distance_x) > 50){
        EventBus.dispatch('navigateX', distance_x <= 0 ? 1 : -1 );
      } else if(Math.abs(distance_y) > 50){
        EventBus.dispatch('navigateY', distance_y <= 0 ? 1 : -1 );
      }
    });
  }
  init(): void {
    if(this.el_app.current){
      this.el_app.current.focus();
    }
  }
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if(this.allowed_x.includes(event.code)){
      EventBus.dispatch('navigateX', event.code === 'ArrowRight' ? 1 : -1 );
      // if(this.menu_sound.duration > 0 && !this.menu_sound.paused){
      //   this.menu_sound.pause();
      //   this.menu_sound.currentTime = 0;
      // }
      // this.menu_sound.play();
    } else if(this.allowed_y.includes(event.code)){
      EventBus.dispatch('navigateY', event.code === 'ArrowDown' ? 1 : -1 );
      // if(this.menu_sound.duration > 0 && !this.menu_sound.paused){
      //   this.menu_sound.pause();
      //   this.menu_sound.currentTime = 0;
      // }
      // this.menu_sound.play();
    }
  }
  render(): React.ReactElement { return (
  <div className="app" ref={this.el_app} tabIndex={0} onKeyDown={this.handleKeyDown.bind(this)}>
    <Wave />
    <div className="menus">
      <Menu parent_active={true} menu={this.menu_data} axis="x" />
    </div>
  </div>
  ) }
}

export default App
