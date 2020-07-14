// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: This code provides a guide for design of a React Component with state.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class GenericComponent extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.

    constructor(propsPassed) {
        
        // TODO: Pass props to super-constructor.
        super(propsPassed);

        // NOTE: That super-constructor must go before this.
        const headerName = "<<GComponent/Constructor>>...";
        
        // INITIALIZE STATE ---------- ---------- ---------- ---------- 
        
        // TODO: Pass props to state.
        this.state = {key001:propsPassed.key001, key002:propsPassed.key002, keyImage:propsPassed.keyImage};
        
        // TODO: Define other non-props/non-state attributes of the class.
        this.otherVars = {junk:"Junk"};
    }

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentDidMount(){
        const headerMessage = "<<GComponent/ComponentDidMOUNT>> + ";
        console.log(headerMessage);
    }

    componentDidUpdate(){
        const headerMessage = "<<GComponent/ComponentDidUPDATE>> ";
        console.log(headerMessage);
    }
    
    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (GenericComponentParent.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  
    // NOTE: Usually there are no listeners here.
    
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<GComponent/GenString>> + ";
        return("<<Key001>> " + this.state.key001 + " <<Key002>> " + this.state.key002);
    }

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<GComponent//Render>> + ";

        // TODO: Define style for render method below.
        const jsonStyle = {};
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 

        return( 
            <div>   
                <img 
                    src={this.state.keyImage}
                    alt="somethingAlt"
                    height="100"
                    width="100"
                />
            {headerMessage + this.genSummary()}
            </div>
        );
    }
};

// EXPORT CLASS ---------- ---------- ---------- ---------- 

export default GenericComponent;