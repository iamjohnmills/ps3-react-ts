import React from 'react'
import EventBus from "./EventBus";
import SvgIcons from "./SvgIcons";
import Menu from "./Menu";

interface IAppMenu {
  label: string,
  icon: string,
  description?: string,
  menu?: Array<IAppMenu>
}

interface IAppProps {
  id: number,
  menu: IAppMenu,
  active: boolean,
}

interface IAppState {
  class: string,
  classes: Array<string>,
}

class MenuItem extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      class: 'item',
      classes: [],
    };
  }
  componentDidMount(): void {
    this.init()
  }
  componentDidUpdate(prev: IAppProps): void {
    if(JSON.stringify(this.props) === JSON.stringify(prev)) return;
    this.setState({ classes: [this.state.class, this.props.active ? 'active': ''] });
  }
  init(): void {
    this.setState({ classes: [this.state.class, this.props.active ? 'active': ''] });
  }
  render(): React.ReactElement { return (
  <div className={this.state.classes.join(' ')} data-id={this.props.id}>
    <div className="icon">
      <SvgIcons name={this.props.menu.icon} />
    </div>
    <div className="label">
      <div className="title">{this.props.menu.label}</div>
      {this.props.menu.description ?
      <div className="description">{this.props.menu.description}</div>
      : null }
    </div>
    { this.props.menu.menu ?
      <Menu parent_active={this.props.active} menu={this.props.menu.menu} axis="y" start_top="-130px" />
    : null }
  </div>
  ) }
}

export default MenuItem
