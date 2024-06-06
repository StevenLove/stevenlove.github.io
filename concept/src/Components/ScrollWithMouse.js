import React, { Component } from 'react';
// import {ScrollTo} from "react-scroll-to";
import * as Scroll from 'react-scroll';
let scroll = Scroll.animateScroll;

class ScrollWithMouse extends Component {

    scrollDiff = 10;
    scrollTime = 20 ;
    handle = undefined;
    scrollAmt = 0;
    id = this.props.scrollID;

    smoothDuration = 1000;
    smoothDistance = 530;
    

    speeds = [10,15,25,40]

    getscrollDistance = () => {
        let elementHeight = document.getElementById(this.id).offsetHeight;
        console.log("element height",elementHeight);
        return elementHeight-30;
    }
    
    scrollDown=n=>{
        console.log("scroll down",this.id);
        if(n === undefined) n = this.scrollDiff;
        scroll.scrollMore(n,{
            containerId:this.id,
            smooth:false,
            duration:0
        });
    }
    scrollUp=n=>{
        if(n === undefined) n = -this.scrollDiff;
        scroll.scrollMore(-n,{
            containerId:this.id,
            smooth:false,
            duration:0
        });
    }
    scrollDownSmooth = () => {
        scroll.scrollMore(this.getscrollDistance(),{
            containerId:this.id,
            smooth:true,
            duration:this.smoothDuration
        })
    }
    scrollUpSmooth = () => {
        scroll.scrollMore(-this.getscrollDistance(),{
            containerId:this.id,
            smooth:true,
            duration:this.smoothDuration
        })
    }
    startScrollDown = speed => {
        return;
        speed = this.speeds[speed];
        this.scrollDown(speed);
        this.handle = setInterval(()=>this.scrollDown(speed),this.scrollTime)
    }
    startScrollUp = speed => {
        return;
        speed = this.speeds[speed];
        this.scrollUp(speed);
        this.handle = setInterval(()=>this.scrollUp(speed),this.scrollTime)
    }
    stopScrolling = () => {
        clearInterval(this.handle)
    }

    render() {
        return (
            <div className="scrollContainer">
                <div className="scrollArea scrollArea-up" style={{height:"20px"}} onMouseEnter={()=>this.startScrollUp(0)} onMouseLeave={this.stopScrolling} onClick={this.scrollUpSmooth}></div>
                <div className="scrollArea scrollArea-up" style={{height:"15px"}} onMouseEnter={()=>this.startScrollUp(1)} onMouseLeave={this.stopScrolling} onClick={this.scrollUpSmooth}></div>
                <div className="scrollArea scrollArea-up" style={{height:"10px"}} onMouseEnter={()=>this.startScrollUp(2)} onMouseLeave={this.stopScrolling} onClick={this.scrollUpSmooth}></div>
                <div className="scrollArea scrollArea-up" style={{height:"5px"}}  onMouseEnter={()=>this.startScrollUp(3)} onMouseLeave={this.stopScrolling} onClick={this.scrollUpSmooth}></div>
                <div id="inner">
                    {this.props.children}
                </div>
                <div className="scrollArea scrollArea-down" style={{height:"20px"}} onMouseEnter={()=>this.startScrollDown(0)} onMouseLeave={this.stopScrolling} onClick={this.scrollDownSmooth}></div>
                <div className="scrollArea scrollArea-down" style={{height:"15px"}} onMouseEnter={()=>this.startScrollDown(1)} onMouseLeave={this.stopScrolling} onClick={this.scrollDownSmooth}></div>
                <div className="scrollArea scrollArea-down" style={{height:"10px"}} onMouseEnter={()=>this.startScrollDown(2)} onMouseLeave={this.stopScrolling} onClick={this.scrollDownSmooth}></div>
                <div className="scrollArea scrollArea-down" style={{height:"5px"}}  onMouseEnter={()=>this.startScrollDown(3)} onMouseLeave={this.stopScrolling} onClick={this.scrollDownSmooth}></div>

            </div>
        )
    }
}

export default ScrollWithMouse;
