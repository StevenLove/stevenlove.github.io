import React, { Component } from 'react';
import Concept from "./Concept"
import ScrollWithMouse from './ScrollWithMouse';

class SelectedList extends Component{
    // the {variablename} syntax is only for inside the element like below in the <Concept>
	render() {
        const allColors = ['red','green','blue','yellow','black'];
        const getConceptStringsOfColor = targetColor => {
            return this.props.selected[targetColor];
        }

        const handleClick = (concept,color,index) => {
            let record = {
                concept:concept,
                color:color,
                index:index
            }
            this.props.selectFn(record);
        }

        const handleHold = (concept,color,index) => {
            let record = {
                concept:concept,
                color:color,
                index:index
            }
            this.props.holdFn(record);
        }

        const makeConceptElementFromString = (concept,color,index) => {
            let isMain = "no"
            if(index === 0){
                isMain = "yes";
            }
            return <Concept
                key={index}
                name={concept}
                main={isMain}
                selectFn={()=>handleClick(concept,color,index)}
                holdFn={()=>handleHold(concept,color,index)}>
             </Concept>
        } 
        let conceptGroups = allColors.map(color=>{
            let conceptStrings = getConceptStringsOfColor(color);
            return conceptStrings.map((concept,index)=>{
                return makeConceptElementFromString(concept,color,index);
            })
        })
        /* makes it so when we click on the red part of the selected subconcepts that it selects red! */
        let selectSubconcept = this.props.selectSubconcept;
        let ssc = color=>{ // returns a function that takes 0 arguments and selects the given color
            return ()=>{
                selectSubconcept(color)
            };
        }

        return (
            <ScrollWithMouse scrollID="panel3">
                <div onClick={ssc("green")} className="scl scl-g">{conceptGroups[1]}</div>
                <div onClick={ssc("blue")} className="scl scl-u">{conceptGroups[2]}</div>
                <div onClick={ssc("red")} className="scl scl-r">{conceptGroups[0]}</div>
                <div onClick={ssc("yellow")} className="scl scl-y">{conceptGroups[3]}</div>
                <div onClick={ssc("black")} className="scl scl-b">{conceptGroups[4]}</div>
            </ScrollWithMouse>
        );
    }
}

export default SelectedList;