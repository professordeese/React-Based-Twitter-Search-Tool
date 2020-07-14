// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.
// NOTE: That this.props.children returns an array containing the individual elements of the JSX script
// returned by the child component.  More lines of JSX corresponds to more children.  It does not pass the 
// JavaScript object itself.  As such, we CANNOT directly manipulate the child passed to GenericComponentParent.
// We can only try to manipulate its implementation as JSX.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class CardParent extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    // TODO: Initialize state.
    // NOTE: That we should avoid assigning any parent component's id based on a property of its child.  This is
    // because the child may be updated, while the state may not.  It is difficult to setState() when updating
    // because it causes infinite loops.
    state = {id:"id.-99"};

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentWillMount(){
        const headerMessage = "<<CardParent//componentWillMount>> + ";

        // TODO: Transfer props to state if necessary.
        this.setState({id:this.props.idPassed});
    }

    componentDidMount(){
        const headerMessage = "<<CardParent/componentDidMOUNT>> + ";
    }

    componentDidUpdate(){
        const headerMessage = "<<CardParent/componentDidUPDATE>> + ";
    }

    componentWillUnmount(){
        const headerMessage = "<<CardParent/componentWillUNMOUNT>> + ";
        console.log(headerMessage + "<<ID>>" + this.state.id);
    }

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (Parent.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  

    onClickMoveItem = () => {
        const headerMessage = "<<CardParent//onClickMoveItem>> + ";
        this.props.onClickMoveItemPassed(this.state.id);
    }

    onClickDeleteItem = () => {
        const headerMessage = "<<CardParent//onClickDeleteItem>> + ";
        console.log(headerMessage + "<<Click>>")
        this.props.onClickDeleteItemPassed(this.state.id);
    }
    
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<CardParent//genSummary>> + ";
        return("<<AllPropKeys>> " + Object.keys(this.props));
    }

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<CardParent//Render>> + ";

        // TODO: Define style for render function below.
        const jsonStyle = {
            padding:'3px 3px 3px 3px',
            width:'95%',
            marginLeft:'auto',
            marginRight:'auto',
            backgroundColor:'#404040',
            borderStyle:'solid',
            borderColor:'#808080',
            borderWidth:'2px',
            borderRadius:'7.5px'
        };
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 

        // TODO: Render parent based on whether this.props.showButtons is true or false.
        if(this.props.showButtons) {

            return(            
                // TODO: Display card taken from: https://semantic-ui.com/views/card.html
                // NOTE: Don't forget to change class to className.
                <div
                    style={jsonStyle}              
                >
                    <div 
                        className="content"
                        style={{
                            width:'100%',
                            marginLeft:'auto',
                            marginRight:'auto',
                            padding:'1% 1% 1% 1%'
                        }}>
                        {this.props.children}
                    </div>
                    <div
                        className="extraContent"
                        style={{
                            width:'100%',
                            marginLeft:'auto',
                            marginRight:'auto',
                            padding:'1% 1% 1% 1%'
                        }}
                    >
                        <div className="ui two buttons">
                            <div 
                                className="ui inverted red button"
                                onClick={this.onClickDeleteItem}>
                                    Delete Item
                            </div>
                            <div 
                                className="ui inverted green button"
                                onClick={this.onClickMoveItem}>
                                    Save Item
                            </div>    
                        </div>
                   </div>
                </div>
            );

        } else {
            
            return(
                <div 
                    style={jsonStyle}
                >
                <div 
                    className="content"
                    style={{
                        width:'100%',
                        marginLeft:'auto',
                        marginRight:'auto',
                        padding:'1% 1% 1% 1%'
                    }}>
                        {this.props.children}
                    </div>
                    <div 
                        className="extraContent"
                        style={{
                            width:'100%',
                            marginLeft:'auto',
                            marginRight:'auto',
                            padding:'1% 1% 1% 1%'
                    }}>
                        <div className="ui two buttons">
                            <div 
                                className="ui inverted red button"
                                onClick={this.onClickDeleteItem}>
                                    Delete Item
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

// EXPORT CLASS ---------- ---------- ---------- ---------- 

export default CardParent;