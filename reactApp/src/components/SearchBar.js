// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class SearchBar extends React.Component{
    // NOTE: That "props" represents properties passed to this class by its parent.  For a CLASS, this name 
    // cannot be changed.  It must be referred to as props.  Note that "key" is not part of props.

    // CONSTRUCTOR FUNCTION ---------- ---------- ---------- ----------
    // NOTE: That this constructor can accept a single input, defined as a JSON object.  It cannot be passed
    // individual values as is done in Java.  This may not always be needed?

    // TODO: Initialize state.
    // NOTE: That we should avoid assigning any parent component's id based on a property of its child.  This is
    // because the child may be updated, while the state may not.  It is difficult to setState() when updating
    // because it causes infinite loops.
    state = {term:"Enter Search Term Here..."};

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentWillMount(){
        const headerMessage = "<<SearchBar//componentWILLMount>> + ";

        // TODO: Transfer props to state if necessary.
        //this.setState({id:this.props.idPassed});
    }

    componentDidMount(){
        const headerMessage = "<<SearchBar/componentDIDMount>> + ";
    }

    componentDidUpdate(){}

    componentWillUnmount(){}

    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class.
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself.  

    onSubmitSearch = (eventPassed) => {
        const headerMessage = "<<SearchBar//onSubmitSearch>> + ";
        
        // TODO: This line of code prevents the page from attempting to submit itself
        // and reloading the page when enter is pressed.
        eventPassed.preventDefault();
        
        // TODO: Trigger outcomes of submission.
        console.log(headerMessage + "<<SubmitForm>> + <<Term>> + " + this.state.term);
        this.props.onSubmitSearchPassed(this.state.term);
    }
    
    // OTHER METHODS ---------- ---------- ---------- ----------

    genSummary() {
        const headerMessage = "<<SearchBar//genSummary>> + ";
        return("<<AllPropKeys>> " + Object.keys(this.props));
    }

    // RENDER METHOD(S) ---------- ---------- ---------- ---------- 
    // NOTE: That these method names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<TweetComponent/Render>> + ";

        // TODO: Define style for render function below.
        const jsonStyle = {
            width:'90%',
            display:'block',
            marginLeft:'auto',
            marginRight:'auto',
            backgroundColor:'#202020',
            borderStyle:'solid',
            borderColor:'#808080',
            borderWidth:'2px'
        };
            

/*
        const jsonStyle = {
            width:this.props.dimsPassed.width,
            position:'relative',
            verticalAlign:"top",
            display:"inline-block"
        };*/
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 

        return(

            // TODO: Use 'ui segment' to encapsulate the rest of the component.  This allows us
            // to effectively format the html code using jsonStyle. */}
            <div 
                className="ui segment"
                style={jsonStyle}
            >
                {/* TODO: Define form with onSubmit property, routed to the onFormSubmit method */}
                {/* that we define above.  NOTE: Again that onFormSubmit should not be followed */}
                {/* by parenthesis. NOTE: That below is an alternative to the "this" binding problem. */}
                {/* <<PREVIOUS VERSION>> <form onSubmit={this.onFormSubmit} className="ui form"> */}
                <form 
                    onSubmit={(eventPassed) => this.onSubmitSearch(eventPassed)}
                    className="ui form"
                    style={{
                        display:'inline-block', whiteSpace:'nowrap', overlowX:'auto',verticalAlign:'top',
                        width:(0.65*this.props.dimsPassed.width)
                    }}
                >    
                    {/* TODO001: Define text input to account for fact that it will */}
                    {/* re-render every time that this.setState is called.  This is */}
                    {/* something all classes will do. */}
                    {/* TODO002: Define value=term such that our input doesn't disappear */}
                    {/* every time that it changes. */}
                    {/* TODO003: Save e.target.value to the state. */}
                    <input 
                        type="text"                             
                        value={this.state.term}                            
                        onChange={(e) => this.setState({term: e.target.value.toLowerCase()})} 
                        style={{
                            backgroundColor:'#404040',
                            color:'#bebebe'
                        }}
                    />
                </form>
                <div 
                    class="ui buttons" 
                    style={{
                        display:'inline-block', whiteSpace:'nowrap', overlowX:'auto', verticalAlign:'top',
                        padding:'0px 0px 0px ' + (0.01*this.props.dimsPassed.width) + 'px'}}>
                    <button 
                        class="ui inverted secondary button"
                        style={{
                            width:(0.1*this.props.dimsPassed.width),
                            color:'#bebebe'}}
                        onClick={(eventPassed) => this.onSubmitSearch(eventPassed)}
                            >Update Results
                    </button>
                    <button 
                        class="ui inverted secondary button" 
                        style={{
                            width:(0.1*this.props.dimsPassed.width),
                            color:'#bebebe'
                        }}
                        onClick={() => this.props.onClickSavePassed()}>
                            Save To Disk
                    </button>
                </div>
            </div>
        );  
    }
};

// TODO: Export component.
export default SearchBar;