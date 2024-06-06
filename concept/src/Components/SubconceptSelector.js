import React, { Component } from 'react';

class SubconceptSelector extends Component {
    /* pass in a function 'selectFn' through props */

    colors = ["green","blue","red","yellow","black"];
    images = this.colors.map(color=>"img/pawn-"+color+".png");
    
    handleClick = (id) => {
        let color = this.colors[id];
        this.props.selectFn(color); 
    }

    

    render() {
        return (
            <span className="subconceptSelector">
                {
                    this.colors.map((color,id)=>{
                        let classString = "subconcept subconcept-"+color;
                        let isSelected = this.props.selectedSubconcept === color;
                        if(isSelected){
                            classString += " subconcept-selected";
                        }
                        return <div key={id} onClick={()=>this.handleClick(id)} className={classString}>
                            <img src={this.images[id]}/>
                        </div>
                    })
                }
            </span>
        );
    }
}

export default SubconceptSelector;
