// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: This code provides a guide for design of a React Component that acts primarily as a list of 
// other components.
// NOTE: That this.props.children returns an array containing the individual elements of the JSX script
// returned by the child component.  More lines of JSX corresponds to more children.  It does not pass the 
// JavaScript object itself.  As such, we CANNOT directly manipulate the child passed to GenericComponentParent.
// We can only try to manipulate its implementation as JSX.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // NOTE: That this is usually first.
import GenericComponent from "./GenericComponent";
import GenericComponentParent from "./GenericComponentParent";


//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class ListGenericComponentClass extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentDidMount(){
        const headerMessage = "<<GCList/ComponentDidMOUNT>> + ";
        console.log(headerMessage);
    }

    componentDidUpdate(){
        const headerMessage = "<<GCList/ComponentDidUPDATE>> + ";
        console.log(headerMessage);
    }

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (GenericComponentList.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  
    onButtonClickList = () => {
        const messageHeader = "<<GCList//onButonClickList>> + "
        console.log(messageHeader + Math.random());
        //NOTE: This will NOT call App listener...return this.props.onButtonClickPassed;
        this.props.onButtonClickPassed();
    }

    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<GCList//genSummary>> + ";
        return(headerMessage + "<<LengthOfArray>> " + this.props.arrayPassed.length);
    };

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    genListToRender() {

        // TODO: Define an array of components from mapping of array of inputs.
        const arrayComponentsJSX = this.props.arrayPassed.map((componentK001) => {
            return(
                <GenericComponentParent
                    onButtonClickPassed={this.onButtonClickList}>
                    {componentK001.render()}
                </GenericComponentParent>
            );
        });
        return arrayComponentsJSX;
    }
    
    render() {
        const headerMessage = "<<GCList//Render>> + "

        // TODO: Define style for render function below.
        const jsonStyle = {};
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 
        
        return(
            <div
                style={{display:"inline-block"}}>
                {this.genListToRender()} 
            </div>
        );
    }
};

// EXPORT CLASS ---------- ---------- ---------- ---------- 

export default ListGenericComponentClass;