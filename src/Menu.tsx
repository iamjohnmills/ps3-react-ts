import React from 'react'
import EventBus from "./EventBus";
import SvgIcons from "./SvgIcons";
import MenuItem from "./MenuItem";
import menu_sound from './menu-click.wav';

interface IAppProps {
	id: number,
	menu: Menu,
	parent_active?: boolean
}

interface Menu {
	label: string,
	icon: string,
	description?: string,
	menu?: array<Menu>
}

interface NavigateOptions {
	x?: number,
	y?: number,
}

interface IAppState {
	class: string,
  classes: Array<string>,
	left: string,
	top: string,
	active_item: number,
}

class Menu extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.el_menu = React.createRef();
		this.state = {
			class: 'menu',
			classes: [],
			active_item: 0,
			left: 'initial',
			top: 'initial',
		};
	}
	componentDidMount(): void {
		EventBus.on('navigate', this.handleNavigate.bind(this) )
		this.init()
	}
	componentDidUpdate(prev: IAppProps): void {
		if(JSON.stringify(this.props) === JSON.stringify(prev)) return;
	}
	init(): void {
    this.setState({ classes: [this.state.class] });
  }
	getNextItem(id:number): number {
		if(id < 0) return 0;
		if(this.props.menu && id >= this.props.menu.length) return this.props.menu.length - 1;
		return id;
	}
	handleNavigate(options:NavigateOptions): void {
		if(!this.props.parent_active && this.props.direction === 'x' && options.x){
			const next = this.getNextItem(this.state.active_item + options.x);
			this.setState({ active_item: next })
			const rect = this.el_menu.current.querySelector('.item.active').getBoundingClientRect();
			this.el_menu.current.style.left = `-${rect.width * next}px`;
		} if(this.props.parent_active && this.props.direction === 'y' && options.y){
			const next = this.getNextItem(this.state.active_item + options.y);
			this.setState({ active_item: next })
			const next_el = options.y === 1 ? this.el_menu.current.querySelector('.item.active').nextSibling : this.el_menu.current.querySelector('.item.active').previousSibling;
			if(next_el){
				const rect = next_el.getBoundingClientRect();
				this.el_menu.current.style.top = `-${rect.height * next + 130 }px`;
			}
		}
	}
	render() { return (
	<div ref={this.el_menu} className={this.state.classes.join(' ')}>
		{ this.props.menu.map( (menu:Menu,i:number) => (
			<MenuItem key={i} id={i} menu={menu} active={this.state.active_item === i} />
		))}
	</div>
	) }
}

export default Menu
