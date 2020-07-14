// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: This code provides a guide for design of a React Component that acts primarily as a parent/container
// for another component.
// NOTE: That this.props.children returns an array containing the individual elements of the JSX script
// returned by the child component.  More lines of JSX corresponds to more children.  It does not pass the 
// JavaScript object itself.  As such, we CANNOT directly manipulate the child passed to GenericComponentParent.
// We can only try to manipulate its implementation as JSX.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class GenericComponentParent extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    constructor(propsPassed) {

        // TODO: Pass props to super-constructor.
        super(propsPassed);

        // NOTE: That super-constructor must go before this.
        const headerMessage = "<<GCParent/Constructor>> + ";
        
        // INITIALIZE STATE ---------- ---------- ---------- ---------- 
        
        this.state = {displayChild:true};
        
        // TODO: Define other non-props/non-state attributes of the class.
        this.otherVars = {junk:"Junk"};
    }

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentDidMount(){
        const headerMessage = "<<GCParent/ComponentDidMOUNT>> + ";
        console.log(headerMessage);
    }

    componentDidUpdate(){
        const headerMessage = "<<GCParent/ComponentDidUPDATE>> + ";
        console.log(headerMessage);
    }

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (GenericComponentParent.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  
    onButtonClickParent = () => {
        console.log("<<GCParent//onButtonClickParent>> " + Math.random());
        this.setState({displayChild:false});
        //NOTE: This will NOT call App listener...return this.props.onButtonClickPassed;
        this.props.onButtonClickPassed();
    }
    
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<GCParent/GenString>> + ";
        return("<<AllPropKeys>> " + Object.keys(this.props));
    }

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<GCParent/Render>> + ";
        
        // TODO: Define style for render method below.
        const jsonStyle = {};
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 
        
        // TODO: Conditionally render child-based on this.state.displayChild.  Ultimately, displayChild
        // is triggered by the button defined below.
        if(this.state.displayChild) {

            // TODO: Return JSX code for condition where displayChild = true.
            return( 
                <div
                    style={{width:250}}>
                    <div>
                        BEGIN CONTAINER ********** ********** ********** 
                        {this.props.children}
                    </div>
                    <div>
                        {/* NOTE: That onClick attributed should be defined without parenthesis.
                            Otherwise, the output of this function (as opposed to the function itself)
                            will be assigned to onClick.  This will result in an infinite loop where 
                            this.onButtonClickXXX is called for every render. */}
                        <button
                            onClick={this.onButtonClickParent}>
                            Delete Me?
                        </button>
                    </div>
                    <div>
                        ENDDD CONTAINER ********** ********** **********
                        <br /><br />
                    </div>
                </div>
            );

        } else {
        
            // TODO: Return JSX code for condition where displayChild = false.
            return(
                <div>
                    Deleted...
                    <br /><br />
                </div>
            );
        } 
    }
};

// EXPORT CLASS ---------- ---------- ---------- ---------- 

export default GenericComponentParent;