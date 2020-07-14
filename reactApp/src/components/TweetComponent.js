// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: This code provides a guide for design of a React Component with state.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class TweetComponent extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.

    constructor(propsPassed) {
        
        // TODO: Pass props to super-constructor.
        super(propsPassed);
        
        // DEFINE STATE ---------- ---------- ---------- ---------- 
        
        this.state = {name:propsPassed.name, date:propsPassed.date, urlAvatar:propsPassed.urlAvatar, text:propsPassed.text, urlSource: propsPassed.urlSource};
        
        // TODO: Define other non-props/non-state attributes of the class.
        this.otherVars = {junk:"Junk"};
    }
        
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessaage = "<<TweetComponent//GenString>> + ";
        return("<<AllPropKeys>> " + JSON.stringify(this.props));
    }

    getName() {
        return this.props.name;
    }

    genLinkText() {
        if(this.state.urlSource){
            return "Link to Source";
        } else {
            return null;
        }
    }

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<TweetComponent/Render>> + ";

        // TODO: Define style for render function below.
        const jsonStyle = {
            width:'90%',
            marginLeft:'auto',
            marginRight:'auto',
            backgroundColor:'#303030',
            borderStyle:'solid',
            borderColor:'#808080',
            borderWidth:'2px'
        };
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 

        return(    
            <div className="ui comments">
                <font color='white'>
                    <div className="comment">
                        <a className="avatar" href="/">
                            <img 
                                src={this.state.urlAvatar}
                                alt=""
                            />
                        </a>
                        <div className="content">
                            <a className="author" href="/">
                                <font color='#bebebe'>
                                    {this.state.name}
                                </font>
                            </a>
                            <div className="metadata">
                                <span className="date">
                                    <font color='#808080'>
                                        {this.state.date}
                                    </font>
                                </span>
                            </div>
                            <div className="text">
                                <font color='#bebebe'>
                                    {this.state.text}
                                </font>
                            </div>
                            <div className="text">
                                <a href={this.state.urlSource} target="_blank">
                                    <font color='#1da1f2'>
                                        {this.genLinkText()}
                                    </font>
                                </a>
                            </div>
                        </div>
                    </div>
                </font>
            </div>       
        );
    }
};




// TODO: Export component.
export default TweetComponent;