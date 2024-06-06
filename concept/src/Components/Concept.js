import React, { Component } from 'react';

class Concept extends Component {
    longPressTime = 800; // ms
    status = "not held"; // keep track of what the mouse is up to, mainly for clarity for the programmer
    // whenever the user clicks, schedule a long press that will occur after longPressTime ms
    longPressTimeoutHandler = undefined; // handle for cancelling the scheduled longPress, if the user releases before time is up

    constructor(props){
        super(props);
        /* anytime the mouse is released or touchscreen finger is lifted, call handleRelease */
        document.addEventListener("touchend",this.handleRelease);
        document.addEventListener("mouseup",this.handleRelease);
    }
    
    /* When you release the mouse */
    handleRelease = () => {
        // if you were holding it for < longPressTime, then trigger a normal click
        if(this.status=="holdingButNotLongEnough"){
            this.props.selectFn();
            clearTimeout(this.longPressTimeoutHandler); // prevent the pre-scheduled longpress from ocurring
        }
        if(this.status=="holdingLongerThanNecessar"){
            // the long press has already happened, so don't do anything
        }
        // acknowledge that we're no longer holding the mouse
        this.status = "not held";
        

    }
    triggerLongPress = () => {
        if(this.props.holdFn)this.props.holdFn(); // only try to call holdFn if we have one
        this.status = "holdingLongerThanNecessary";
    }
    /* happens when user presses the mouse down */
    handleGestureStart = () => {
        this.status="holdingButNotLongEnough";
        // schedule a longpress that will happen in the future if we don't release
        this.longPressTimeoutHandler = setTimeout(this.triggerLongPress,this.longPressTime);
    }

    render() {
        let name = this.props.name;
        let imgSrc = "img/"+name+".png";
        let altText = name;
        let className = "concept";
        if(this.props.main === "yes"){
            className = className + "Main";
        }
        // previously had onTouchStart={this.handleGestureStart} on the span below
        // but when tapping, onMouseDown and onTouchStart would trigger, causing a double click to happen...
        return(
            <span onMouseDown={this.handleGestureStart} className={className}>
                <img src={imgSrc} alt={altText}></img>
            </span>
        );
    }
}

export default Concept;
