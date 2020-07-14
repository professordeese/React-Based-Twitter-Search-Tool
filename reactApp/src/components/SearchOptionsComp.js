// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.


// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class SearchOptionsComp extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    // TODO: Initialize state.
    // NOTE: That we should avoid assigning any parent component's id based on a property of its child.  This is
    // because the child may be updated, while the state may not.  It is difficult to setState() when updating
    // because it causes infinite loops.
    state = {default:'something'};

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentWillMount(){ const headerMessage = "<<SearchOptionsComp//componentWILLMount>> + ";}

    componentDidMount(){ const headerMessage = "<<SearchOptionsComp/componentDIDMount>> + "; }

    componentDidUpdate(){}

    componentWillUnmount(){}

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class.
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.

    onChangeOptions = (eventPassed) => {
        const headerMessage = "<<SearchOptionsComp//onOptionsChange>> + ";

        // TODO: This line of code prevents the page from attempting to submit itself
        // and reloading the page when enter is pressed.
        // eventPassed.preventDefault();

        // TODO: Get statuses of all check boxes.
        const statusBox001 = document.getElementById('checkBox001').checked;
        const statusBox002 = document.getElementById('checkBox002').checked;
        var textBox003 = document.getElementById('textBox003').value;

        // TODO: Replace blank textBox003 with n/a.
        if(textBox003===""){textBox003="n/a";}

        // TODO: Return results to parent listener method.
        console.log("<<CheckBoxStatuses>>" + statusBox001 + statusBox002 + textBox003);
        this.props.onChangeOptionsPassed([statusBox001, statusBox002, textBox003]);
    }
    
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() { const headerMessage = "<<SearchOptionsComp//genSummary>> + "; }
    
    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<SearchOptionsComp/Render>> + ";

        // TODO: Define style for render function below.
        const jsonStyle = {
            backgroundColor:'#202020',
            marginLeft:'auto',
            marginRight:'auto',
            padding:'10px 0px 30px 0px',
            width:'90%',    
            optionalBelow:'---------- ---------- ---------- ---------- ',
            borderStyle:'none',
            borderColor:'#000000',
            borderWidth:'99px',
            textAlign:'center'
        };
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 

        return(
            <div>      
                <div
                    class="ui segment"                
                    style={jsonStyle}>
                    <div
                        class="ui checkbox"
                        style={{marginRight:'20px'}}>
                            <input 
                                type="checkbox"
                                id='checkBox001'
                                onClick={(eventPassed) => this.onChangeOptions(eventPassed)}>
                            </input>
                            <label
                                style={{color:'#bebebe'}}>
                                    Eliminate @tags from search results;     
                            </label>
                    </div>
                    <div
                        class="ui checkbox"
                        style={{marginRight:'20px'}}>
                            <input 
                                type="checkbox"
                                id='checkBox002'
                                onClick={(eventPassed) => this.onChangeOptions(eventPassed)}>
                            </input>
                            <label
                                style={{color:'#bebebe'}}>
                                    Exclude retweets from search results;
                            </label>
                    </div>
                    <div 
                        class="ui mini icon input">
                            <input 
                                type="text"
                                id='textBox003'
                                placeholder="Enter zip code here..."
                                style={{
                                    color:'#bebebe',
                                    backgroundColor:'#404040'}}
                                onChange={(eventPassed) => this.onChangeOptions(eventPassed)}>
                            </input>
                            <label
                                style={{
                                    fontSize:'14px',
                                    color:'#bebebe',
                                    padding:'4px 0px 0px 10px',
                                    verticalAlign:'middle'
                                    }}>
                                        Specify locality for search results as ZIP code;     
                            </label>                                        
                    </div>
                </div>
            </div>
        );
    }  
}




        
// TODO: Export component.
export default SearchOptionsComp;