import React from 'react'
import EventBus from "./EventBus";
import SvgIcons from "./SvgIcons";
import MenuItem from "./MenuItem";
import menu_sound_file from './menu-click.wav';

interface IAppMenu {
  label: string,
  icon: string,
  axis: string,
  menu?: Array<IAppMenu>
}

interface IAppNext {
  index: number,
  width: number,
  height: number,
}

interface IAppProps {
  axis: string,
  start_top?: string,
  menu: Array<any>,
  parent_active?: boolean
}

interface IAppState {
  class: string,
  classes: Array<string>,
  left: string,
  top: string,
  active_item: number,
}

class Menu extends React.Component<IAppProps, IAppState> {

  private el_menu = React.createRef<HTMLDivElement>();
  private menu_sound = new Audio(menu_sound_file);

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      class: 'menu',
      classes: [],
      active_item: 0,
      left: '0px',
      top: '0px',
    };
  }
  componentDidMount(): void {
    if(this.props.axis === 'x'){
      EventBus.on('navigateX', this.handleNavigateX.bind(this) )
    } else if(this.props.axis === 'y'){
      EventBus.on('navigateY', this.handleNavigateY.bind(this) )
    }
    this.init()
  }
  init(): void {
    this.setState({ classes: [this.state.class], top: this.props.start_top ? this.props.start_top : this.state.top });
  }
  getNext(direction:number): IAppNext|null {
    const next_index:number = this.state.active_item + direction;
    const exists:boolean = !!this.props.menu[next_index];
    if(exists){
      const item_els = this.el_menu.current!.querySelectorAll('.item') as NodeListOf<Element>;
      const next_el = item_els[next_index] as HTMLElement|null;
      const next_rect:DOMRect|null = next_el?.getBoundingClientRect()!;
      return {
        index: next_index,
        width: next_rect?.width,
        height: next_rect?.height,
      }
    } else {
      return null;
    }
  }
  handleAudioTone(): void {
    if(this.menu_sound.duration > 0 && !this.menu_sound.paused){
      this.menu_sound.pause();
      this.menu_sound.currentTime = 0;
    }
    this.menu_sound.play();
  }
  handleNavigateX(direction:number): void {
    if(!this.props.parent_active) return;
    const next = this.getNext(direction);
    if(next){
      this.handleAudioTone();
      this.setState({ active_item: next?.index, left: `-${next?.width * next?.index}px` });
    }
  }
  handleNavigateY(direction:number): void {
    if(!this.props.parent_active) return;
    const next = this.getNext(direction);
    if(next){
      this.handleAudioTone();
      this.setState({ active_item: next?.index, top: `-${next?.height * next?.index + 130}px` });
    }
  }
  render(): React.ReactElement { return (
  <div ref={this.el_menu} style={{ left: this.state.left, top: this.state.top }}  className={this.state.classes.join(' ')}>
    { this.props.menu.map( (menu:IAppMenu,i:number) => (
      <MenuItem key={i} id={i} menu={menu} active={this.state.active_item === i} />
    ))}
  </div>
  ) }
}

export default Menu
