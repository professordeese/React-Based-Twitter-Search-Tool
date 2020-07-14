// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: That this.props.children returns an array containing the individual elements of the JSX script
// returned by the child component.  More lines of JSX corresponds to more children.  It does not pass the 
// JavaScript object itself.  As such, we CANNOT directly manipulate the child passed to Parent.
// We can only try to manipulate its implementation as JSX.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // NOTE: That this is usually first.
import CardParent from "./CardParent";

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class CardList extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentWillMount(){
        const headerMessage = "<<CardList//componentWillMOUNT>> + ";
    }

    componentDidMount(){
        const headerMessage = "<<CardList/componentDidMOUNT>> + ";
    }

    componentDidUpdate(){
        const headerMessage = "<<CardList/componentDidUPDATE>> + ";
    }

    componentWillUnmount(){
        const headerMessage = "<<CardParent/componentWillUNMOUNT>> + ";
    }

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (GenericComponentList.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  

    onClickMoveItem = (idPassed) => {
        const headerMessage = "<<CardList//onClickMoveItem>> + ";
        this.props.onClickMoveItemPassed(idPassed);
    }

    onClickDeleteItem = (idPassed) => {
        const headerMessage = "<<CardList//onClickDeleteItem>> + ";
        console.log(headerMessage + "<<ID>>" + idPassed);
        this.props.onClickDeleteItemPassed(idPassed);
    }

    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<CardList//genSummary>> + ";
        var stringToReturn = "";
        for(var k001 = 0; k001 < this.props.arrayPassed.length; k001++) {
            stringToReturn = stringToReturn + "<<Index/Name>>" + k001 + "//" + this.props.arrayPassed[k001].getName();
        }
        return stringToReturn;
    };
    
    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    genListToRender() {
        const headerMessage = "<<CardList//genListToRender>> + ";
        //console.log(headerMessage + "<<arrayPassedBelow>>");
        //console.log(this.props.arrayPassed);   
        
        // TODO: Define style for render function below.
        const jsonStyle = {};

        // TODO: Define an array of components from mapping of array of inputs (if not null value is passed).
        if(this.props.arrayPassed) {
            const arrayComponentsJSX = this.props.arrayPassed.map((componentK001, k001) => {

                // NOTE: That we have to be careful when assigning these IDs because they cannot be reassigned
                // upon update.  Therefore, we will use an ID based on its location in an array as opposed to 
                // "name" associated with it.

                // TODO: Define JSX for each element.
                return(
                    <div
                        style={{padding:'1% 1% 1% 1%'}}>
                            <CardParent
                                showButtons={this.props.showButtons}
                                idPassed={"id."+String(k001)}
                                onClickDeleteItemPassed={this.onClickDeleteItem}
                                onClickMoveItemPassed={this.onClickMoveItem}
                                dimsPassed={{width: (0.99*this.props.dimsPassed.width), height: (0.99*this.props.dimsPassed.height)}}>
                                    {componentK001.render()}
                                </CardParent>
                    </div>
                );
            });
            return arrayComponentsJSX;
        } else {
            console.log("return null");
            return(
                <div>
                    Bye
                </div>
            );
        }
        
    }

    render() {
        const headerMessage = "<<CardList//Render>> + "

        // TODO: Define style for render function below.
        const jsonStyle = {
            width:this.props.dimsPassed.width,
            position:'relative',
            verticalAlign:"top",
            display:"inline-block"
        };
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 
        
        return(
            <div
                style={jsonStyle}>
                    <h1 class='ui header'>
                    <div
                        style={{
                            padding:'15px 2px 0px 2px',
                            color:'#bebebe',
                            textAlign:'center',
                            verticalAlign:'bottom'
                            }}>
                                {this.props.labelTop}
                        </div>
                   
                    </h1>
                    {this.genListToRender()} 
            </div>
        );
    }
};

// EXPORT CLASS ---------- ---------- ---------- ---------- 

export default CardList;