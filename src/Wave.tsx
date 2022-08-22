// adapted from: https://codepen.io/cojdev/pen/PjYPKv
import React from 'react'
import EventBus from "./EventBus";

interface IAppProps {}
interface IAppState {}

class Wave extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.el_canvas = React.createRef();
		this.el_canvas_wrap = React.createRef();
		this.ctx = null;
		this.nodes = 6;
		this.waves = [];
		this.waveHeight = 300;
		this.state = {
		};
	}
	componentDidMount(): void {
		this.init();
	}
	init(): void {
		this.ctx = this.el_canvas.current.getContext("2d");
		this.el_canvas.current.width = window.innerWidth > 1920 ? window.innerWidth : 1920;
		this.el_canvas.current.height = this.waveHeight;
		// this.el_canvas_wrap.current.style.height = `${this.waveHeight - 1}px`;
		for (let i = 0; i < 3; i++) {
			this.waves.push( this.wave(1, this.nodes) );
		}
		console.log(this.waves)
    this.update();
  }
	wave(lambda, nodes_length) {
		let nodes = [];
		var tick = 1;
		for (var i = 0; i <= nodes_length+2; i++) {
			var temp = [(i-1) * this.el_canvas.current.width / nodes_length, 0, Math.random()*200, .3];
			nodes.push(temp);
		}
		return {
			lambda: lambda,
			nodes: nodes
		}
	}
	bounce(nodeArr) {
		nodeArr[1] = this.waveHeight/4*Math.sin(nodeArr[2]/20)+this.el_canvas.current.height/2;
		nodeArr[2] = nodeArr[2] + nodeArr[3];
	}
	drawWave(obj) {
		var diff = function(a,b) {
			return (b - a)/2 + a;
		}


		var gradient = this.ctx.createLinearGradient(0, 0, 0, this.el_canvas.current.height );
		gradient.addColorStop(0, "rgb(255, 255, 255, 0.5)");
		gradient.addColorStop(0.5, "rgb(255, 255, 255, 0.15)");
		gradient.addColorStop(1, "rgb(255, 255, 255, 0)");

		// var gradient = this.ctx.createRadialGradient(this.el_canvas.current.width/2, 0, 0, this.el_canvas.current.width/2, 0, 1000);
	  // gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
	  // gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		this.ctx.fillStyle = gradient;

		this.ctx.beginPath();
		this.ctx.moveTo(0,this.el_canvas.current.height + 1 );
		this.ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1] );

		for (var i = 0; i < obj.nodes.length; i++) {
			if (obj.nodes[i+1]) {
				this.ctx.quadraticCurveTo(
					obj.nodes[i][0],obj.nodes[i][1],
					diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
				);
			}
      else {
				this.ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
				this.ctx.lineTo(this.el_canvas.current.width,this.el_canvas.current.height + 1);
			}
		}
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.strokeStyle = 'rgba(255,255,255,0.6)'
		this.ctx.stroke();
	}
	update() {
    // var fill = window.getComputedStyle(document.querySelector(".header"),null).getPropertyValue("background-color");
		var fill = 'transparent'
		this.ctx.fillStyle = fill;
		this.ctx.globalCompositeOperation = "source-in";
		this.ctx.fillRect(0,0,this.el_canvas.current.width,this.el_canvas.current.height);
		this.ctx.globalCompositeOperation = "normal";
		for (var i = 0; i < this.waves.length; i++) {
			for (var j = 0; j < this.waves[i].nodes.length; j++) {
				this.bounce(this.waves[i].nodes[j]);
			}
			this.drawWave(this.waves[i]);
		}
		this.ctx.fillStyle = fill;

		this.ctx.globalCompositeOperation = "destination-out";

		var mask = this.ctx.createRadialGradient(this.el_canvas.current.width/2, 0, 0, this.el_canvas.current.width/2, 0, this.el_canvas.current.width);
	  mask.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
	  mask.addColorStop(0.55, 'rgba(255, 255, 255, 1)');

		// const mask = this.ctx.createLinearGradient(0, 0, 0, this.el_canvas.current.height);
		// mask.addColorStop(0, "rgba(255, 255, 255, 0)");
		// mask.addColorStop(1, "rgba(255, 255, 255, 1)");
		this.ctx.fillStyle = mask;
		this.ctx.fillRect(0, 0, this.el_canvas.current.width, this.el_canvas.current.height);

    requestAnimationFrame(() => {
			this.update()
		});
	}

	render() { return (
		<div className="canvas-container">
				<canvas ref={this.el_canvas}></canvas>
		</div>
	) }
}

export default Wave
