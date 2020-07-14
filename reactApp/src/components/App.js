// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.

// TODO: Import external components (first by convention) then internal components.
import React from 'react'; // This is usually first.
import Faker from 'faker';
import Axios from 'axios';
import GenLib from './GenLib';
import imageTwitter001 from '../images/imgTwitterLogo20190816.png';
import imageHeader001 from '../images/imgNotebook20190819.png';
import file001 from '../other/ZipCodesTXT.txt';
import TweetComponent from './TweetComponent';
import CardParent from './CardParent';
import CardList from './CardList';
import SearchBar from './SearchBar';
import JQuery from 'jquery';
import FileSaver from 'file-saver';
import SearchOptionsComp from './SearchOptionsComp';
import XDate from 'xdate';

// DEFINE COMPONENT ---------- ---------- ---------- ---------- 

class App extends React.Component {

    // TODO: Define state array.
    state = { arrayPopular001:[], arrayRecent002:[], arraySaved003:[], arrayBoxStatuses: [false, false, 'n/a'], windowWidth:0, windowHeight:0 };

    // LIFECYCLE METHODS ---------- ---------- ---------- ---------- 

    componentWillMount(){
        const headerMessage = "<<App/componentWILLMount>> + ";
        this.setState({arrayPopular001:this.genBlankCard(), arrayRecent002:this.genBlankCard(), arraySaved003:this.genBlankCard()});
    }

    componentDidMount(){
        const headerMessage = "<<App/componentDidMOUNT>> + ";
        
        // TODO: Update window dimensions when app is first mounted.
        this.updateWindowDims();

        // TODO: Attach event listener to window for resizing. Then pass this.updateWindowDims as callback function.
        window.addEventListener('resize', this.updateWindowDims); // no parenthesis
        console.log(headerMessage + "<<WindowWidth>> " + this.state.windowWidth + " <<WindowHeight>> " + this.state.windowHeight);
    }
            
    componentDidUpdate(){
        const headerMessage = "<<App/componentDidUPDATE>> + ";
        console.log(headerMessage);
    }

    componentWillUnmount(){
        const headerMessage = "<<App/componentWillUNMOUNT>> + ";
        console.log(headerMessage + "<<ID>>" + this.state.id);
    }

    // OTHER METHODS ---------- ---------- ---------- ----------

    // TODO: Define event method using the arrow function to lexically bind this
    // method to the context of this class (App.JS), giving us access to this.setState().
    updateWindowDims = () => {
        const headerMessage = "<<App//updateWindowDims>> + ";
        console.log(headerMessage + "<<Height>> " + window.innerHeight + " <<Width>> " + window.innerWidth);
        this.setState({windowHeight: window.innerHeight, windowWidth: window.innerWidth});
    }    

    // RENDER FUNCTIONS ---------- ---------- ---------- ---------- 
    // NOTE: That these function names should remain static, unchanged from application to application.

    render() {
        const headerMessage = "<<App//Render>> + ";

        // TODO: Define style for render function below.
        const jsonStyle = {
            width:'100%',
            marginLeft:'auto',
            marginRight:'auto',
            backgroundColor:'#202020'
        };
        
        // TODO: Define JSON Object to define all props for the React Component below.
        // const jsonAllPropsTweet = {name:"Anthony",date:"01/01/2019",text:"I said something interesting.",imageAvatar:imgAvatar};
            
        // DEFINE JSX TO RENDER ---------- ---------- ---------- ---------- 
        
        return(
            <div
                style={jsonStyle}    
            >
                <img 
                    style={{
                        padding:'15px 2px 0px 2px',
                        display:'block',
                        marginLeft:'auto',
                        marginRight:'auto',
                        width:this.state.windowWidth/4}}
                    src={imageHeader001}>
                </img>
                <p
                    style={{
                        textAlign:'center',
                        color:'#bebebe',
                        size:'15px'
                    }}>
                    Beta V1.0 August 2019, www.AnthonyDeese.com
                </p>               
                <SearchBar
                    onSubmitSearchPassed={this.onSearchSubmit}
                    onClickSavePassed={this.onSaveResults}
                    dimsPassed = {{width: (this.state.windowWidth), height:this.state.windowHeight}}
                ></SearchBar>
                <SearchOptionsComp
                    onChangeOptionsPassed={this.onChangeOptions}
                    documentPassed={document}
                    windowPassed={window}>
                </SearchOptionsComp>
                <CardList
                    showButtons={true}
                    onClickDeleteItemPassed={this.onClickDeleteItemFromLeft}
                    onClickMoveItemPassed={this.onClickMoveItemFromLeft}
                    arrayPassed={this.state.arrayPopular001}
                    dimsPassed = {{width: (this.state.windowWidth/3.05), height:this.state.windowHeight}}
                    labelTop={'Trending Suggestions'}>
                </CardList>
                <CardList
                    showButtons={true}
                    onClickDeleteItemPassed={this.onClickDeleteItemFromMiddle}
                    onClickMoveItemPassed={this.onClickMoveItemFromMiddle}
                    arrayPassed={this.state.arrayRecent002}
                    dimsPassed = {{width: (this.state.windowWidth/3.05), height:this.state.windowHeight}}
                    labelTop={this.defineLabel()}>
                </CardList>
                <CardList
                    showButtons={false}
                    onClickDeleteItemPassed={this.onClickDeleteItemFromRight}
                    onClickMoveItemPassed={this.onClickMoveItemFromMiddle}
                    arrayPassed={this.state.arraySaved003}
                    dimsPassed = {{width: (this.state.windowWidth/3.05), height:this.state.windowHeight}}
                    labelTop={"Saved"}>
                </CardList>
                <h2 class='ui header'>
                    <div
                        style={{
                            padding:'15px 2px 0px 2px',
                            color:'#404040',
                            textAlign:'center',
                            verticalAlign:'bottom',
                            height:this.state.windowHeight
                            }}>
                             Nothing here? User search-bar above to get results.
                        </div>
                   
                </h2>
            </div>
            
        );      
    }

    defineLabel() {
        if(this.state.arrayBoxStatuses[2]==='n/a') {
            return "Recent Results";
        } else {
            return "Recent Results Near " + this.state.arrayBoxStatuses[2];
        }
    }
            
    // EVENT LISTENERS/HANDLERS ---------- ---------- ---------- ----------
    
    // TODO: Define event listeners/handlers using the arrow function to lexically bind this
    // method to the context of this class (GenericComponentParent.JS).
    // NOTE: As discussed above, we CANNOT use an event listener to manipulate the parameters
    // of a child component because it is passed as JSX code and NOT as the JavaScript component
    // itself. 

    onSaveResults = () => {

        const stringToSave = GenLib.saveTweetsToCSV(this.state.arraySaved003);


        /*
        var dataArray = new Array;
        for (var o in this.state.arraySaved003) {
            var innerValue = this.state.arraySaved003[o]===null?'':this.state.arraySaved003[o].toString();
            var result = innerValue.replace(/"/g, '""');
            result = '"' + result + '"';
            dataArray.push(result);
        }
        console.log(dataArray)
        */



        var blob = new Blob([stringToSave], {type: 'text/plain;charset=utf-8'});
        FileSaver.saveAs(blob, "Saved_Twitter_Results_Open_In_Excel.csv");
    }

    onChangeOptions = (statusesPassed) => {
        const headerMessage = "<<App//onChangeOptions>> + ";
        this.setState({arrayBoxStatuses:statusesPassed});
    }

    // NOTE: This listener/handler will address submission to search bar at top of screen.
    onSearchSubmit = (termPassed) => {
        const headerMessage = "<<App//onSearchSubmit>> + ";
        console.log(headerMessage + "<<SubmitForm>> + <<Term>> + " + termPassed);

        // CONFIGURE BOTH SEARCHES ---------- ---------- ---------- ---------- 

        // TODO: Save context of app to another variable for use within Axios requets.
        const appThis = this;

        // TODO: Define parameters to be included within GET/HTTP request.
        const paramsToPass = {
            q:termPassed,
            bearerToken: // {YOU NEED TO GET OUR OWN BEARER TOKEN}
        }
        
        // TODO: Create proxy server to overcome CORS problem. 
        const urlResource = // {YOU NEED YOUR OWN PROXY SERVER};

        // TODO: Get random date within last three days.
        const dateToday = new XDate();
        var dateForSearch = '';
        if(Math.random()>0.33333) {
            dateForSearch = GenLib.formatDateAsYYYYMMDD(dateToday.addDays(0));
        } else {
            if(Math.random()>0.5) {
                dateForSearch = GenLib.formatDateAsYYYYMMDD(dateToday.addDays(-1));
            } else {
                if(Math.random()>0.5) {
                    dateForSearch = GenLib.formatDateAsYYYYMMDD(dateToday.addDays(-2));
                } else {
                    dateForSearch = GenLib.formatDateAsYYYYMMDD(dateToday.addDays(-4));
                }
            }
        }

        // TODO: Randomize search radius.
        var radiusForSearch = '';
        if(Math.random() > 0.5) {
            radiusForSearch = '5mi';
        } else {
            if(Math.random()>0.5) {
                radiusForSearch='10mi';
            } else {
                radiusForSearch='20mi';
            }
        }

        // TODO: Initialize stringGeoCode to ''.
        var stringGeoCodeVarying = '';
        var stringGeoCodeWide = '';

        // TODO: Determine whether specific location has been requested.
        if(appThis.state.arrayBoxStatuses[2] !== 'n/a') {

            // TODO: Extract array containing lat/long information.
            const jsonGeoCode = GenLib.convertZipCodeToLatLong(appThis.state.arrayBoxStatuses[2], file001);

            // TODO: Account for null case.
            if(jsonGeoCode) {

                // TODO: Create geocode with format as required by Twitter. 
                // NOTE: An example is: geocode=39.952600,-75.165200,10mi
                stringGeoCodeVarying = '&geocode=' + jsonGeoCode.lat + ',' + jsonGeoCode.long + ',' + radiusForSearch;
                stringGeoCodeWide = '&geocode=' + jsonGeoCode.lat + ',' + jsonGeoCode.long + ',100mi';
            }
        }       
        
        // TODO: Define url for both GET/HTTP requests.
        var urlRequestRecent = encodeURI(urlResource + "?q=" + GenLib.makeOrCapital(paramsToPass.q) + "&result_type=recent&until=" + dateForSearch + "&count=99" + stringGeoCodeVarying + "&bearerToken=" + paramsToPass.bearerToken);
        var urlRequestPopular = encodeURI(urlResource + "?q=" + GenLib.makeOrCapital(paramsToPass.q) + "&result_type=popular&until=" + GenLib.formatDateAsYYYYMMDD(new Date()) + "&count=99" + stringGeoCodeWide + "&bearerToken=" + paramsToPass.bearerToken);
        var urlRequestPopularNoLocation = encodeURI(urlResource + "?q=" + GenLib.makeOrCapital(paramsToPass.q) + "&result_type=popular&until=" + GenLib.formatDateAsYYYYMMDD(new Date()) + "&count=99" + "&bearerToken=" + paramsToPass.bearerToken);

        // MAKE REQUEST FOR RECENT RESULTS ---------- ---------- ---------- ---------- 

        // TODO: Make GET/HTTP request to Express server running locally.
        // NOTE: That you have to be very careful here what types of headers you try to pass.
        // Only a small number, like 'Content-Type' will atcually be accepted by the Express Server
        // without causing a problem.  
        Axios.get(urlRequestRecent)
            .then(function(responseAxios001) {
                const arrayTweetComponents = App.parseTwitterResponse(responseAxios001, appThis.state.arrayBoxStatuses, true);
                appThis.setState({arrayRecent002: arrayTweetComponents});
            }).catch(function(errorAxios001) {
                App.displayRequestError(headerMessage,errorAxios001);
            }
        );

        // MAKE REQUEST FOR POPULAR RESULTS ---------- ---------- ---------- ---------- 

        // TODO: Same as above...
        Axios.get(urlRequestPopular)
            .then(function(responseAxios002) {
                const arrayTweetComponents002 = App.parseTwitterResponse(responseAxios002, appThis.state.arrayBoxStatuses, false);
                console.log(arrayTweetComponents002);

                // TODO: Then get results without location information.
                Axios.get(urlRequestPopularNoLocation)
                    .then(function(responseAxios003) {
                        const arrayTweetComponents003 = App.parseTwitterResponse(responseAxios003, appThis.state.arrayBoxStatuses, false);
                        console.log(arrayTweetComponents003);
                        const arrayTweetComponents004 = arrayTweetComponents002.concat(arrayTweetComponents003);
                        console.log(arrayTweetComponents004);
                        //var arrayTemp = appThis.state.arrayPopular001;
                        //arrayTemp.push(arrayTweetComponents);
                        appThis.setState({arrayPopular001: arrayTweetComponents004});
                    }).catch(function(errorAxios003) {
                        App.displayRequestError(headerMessage,errorAxios003);
                    }
                );
                //appThis.setState({arrayPopular001: arrayTweetComponents});
            }).catch(function(errorAxios002) {
                App.displayRequestError(headerMessage,errorAxios002);
            }
        );

        // TODO: Same as above...
        /*Axios.get(urlRequestPopularNoLocation)
            .then(function(responseAxios003) {
                const arrayTweetComponents = App.parseTwitterResponse(responseAxios003, appThis.state.arrayBoxStatuses, false);
                var arrayTemp = appThis.state.arrayPopular001;
                arrayTemp.push(arrayTweetComponents);
                appThis.setState({arrayPopular001: arrayTemp});
            }).catch(function(errorAxios001) {
                App.displayRequestError(headerMessage,errorAxios001);
            }
        );*/
    }
    
    onClickMoveItemFromMiddle = (idPassed) => {
        const headerMessage = "<<App//onButtonClickMoveItem>> + ";
        //console.log(headerMessage + "<<ID>> " + idPassed);

        // TODO: Define variable to indicate index of element of arrayState001 to be moved.
        var kElementToMove = -99;

        // TODO: Determine index of button pushed, within CardList.
        kElementToMove = idPassed.split(".")[1];     

        // TODO: Load both arrayState001 and arrayState003, such that changed may be made.
        var arrayCopy002 = this.state.arrayRecent002;
        var arrayCopy003 = this.state.arraySaved003;

        // TODO: Make appropriate changes.  Push new element to arrayCopy003.  Delete one element
        // from arrayCopy001.
        arrayCopy003.unshift(arrayCopy002[kElementToMove]);
        arrayCopy002.splice(kElementToMove,1);

        // TODO: Set the state.
        this.setState({arrayRecent002:arrayCopy002, arraySaved003:arrayCopy003});
    }

    onClickMoveItemFromLeft = (idPassed) => {
        const headerMessage = "<<App//onButtonClickMoveItemFromLeft>> + ";

        // TODO: Define variable to indicate index of element of arrayState001 to be moved.
        var kElementToMove = -99;

        // TODO: Determine index of button pushed, within CardList.
        kElementToMove = idPassed.split(".")[1];     

        // TODO: Load both arrayState001 and arrayState003, such that changed may be made.
        var arrayCopy001 = this.state.arrayPopular001;
        var arrayCopy003 = this.state.arraySaved003;

        // TODO: Make appropriate changes.  Push new element to arrayCopy003.  Delete one element
        // from arrayCopy001.
        arrayCopy003.unshift(arrayCopy001[kElementToMove]);
        arrayCopy001.splice(kElementToMove,1);

        // TODO: Set the state.
        this.setState({arrayPopular001:arrayCopy001, arraySaved003:arrayCopy003});
    }

    onClickDeleteItemFromRight = (idPassed) => {
        const headerMessage = "<<App//onClickDeleteItemFromRight>> + ";
        console.log(headerMessage + "<<ID>>" + idPassed);
        
        // TODO: Define variable to indicate index of element of arrayStateXXX to be deleted.
        var kElementToDelete = -99;

        // TODO: Determine index of button pushed, within CardList.
        kElementToDelete = idPassed.split(".")[1];     

        // TODO: Load required array(s), such that changes may be made.
        var arrayCopy003 = this.state.arraySaved003;

        // TODO: Make appropriate changes.  
        arrayCopy003.splice(kElementToDelete,1);
        //arrayCopy003.splice(kElementToDelete,kElementToDelete+1);
        
        // TODO: Set the state.
        this.setState({arrayState003:arrayCopy003});
    }

    onClickDeleteItemFromMiddle = (idPassed) => {
        const headerMessage = "<<App//onClickDeleteItemFromMiddle>> + ";
        console.log(headerMessage + "<<ID>>" + idPassed);
        
        // TODO: Define variable to indicate index of element of arrayStateXXX to be deleted.
        var kElementToDelete = -99;

        // TODO: Determine index of button pushed, within CardList.
        kElementToDelete = idPassed.split(".")[1];     

        // TODO: Load required array(s), such that changes may be made.
        var arrayCopy002 = this.state.arrayRecent002;

        // TODO: Make appropriate changes.  
        arrayCopy002.splice(kElementToDelete,1);
        
        // TODO: Set the state.
        this.setState({arrayRecent002:arrayCopy002});
    }

    onClickDeleteItemFromLeft = (idPassed) => {
        const headerMessage = "<<App//onClickDeleteItemFromMiddle>> + ";
        console.log(headerMessage + "<<ID>>" + idPassed);
        
        // TODO: Define variable to indicate index of element of arrayStateXXX to be deleted.
        var kElementToDelete = -99;

        // TODO: Determine index of button pushed, within CardList.
        kElementToDelete = idPassed.split(".")[1];     

        // TODO: Load required array(s), such that changes may be made.
        var arrayCopy001 = this.state.arrayPopular001;

        // TODO: Make appropriate changes.  
        arrayCopy001.splice(kElementToDelete,1);
        
        // TODO: Set the state.
        this.setState({arrayPopular001:arrayCopy001});
    }

    // OTHER/STATIC METHODS ---------- ---------- ---------- 
    
    genBlankCard() {
        const headerMessage = "<<App/genBlankCard>> + ";

        const cardToReturn = new TweetComponent({name:'Nothing to show yet. Begin by performing seach above.', date:null, imageAvatar:null, text:null});
        const arrayToReturn = [];
        //arrayToReturn.push(cardToReturn);
        return arrayToReturn;
    }

    static displayRequestError = (headerMessagePassed, errorPassed) => {
        // NOTE: That this code was provided by: https://github.com/axios/axios#handling-errors
        if (errorPassed.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(headerMessagePassed + "<<AxiosError>> Server response is out of range of 2XX.")
            console.log(errorPassed.response.data);
            console.log(errorPassed.response.status);
            console.log(errorPassed.response.headers);
        } else if (errorPassed.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(headerMessagePassed + "<<AxiosError>> Request was made but no response was received.")
            console.log(errorPassed.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(headerMessagePassed + "<<AxiosError>> Something happened in setting up the request that triggered an error.")
            console.log("Error", errorPassed.message);
        }
        console.log(errorPassed.config);
    }

    static parseTwitterResponse(responsePassed, arrayOptionsPassed, boolRandomize) {
        const headerMessage = "<<App/parseTwitterResponse>> + ";
        //console.log(headerMessage + "<<CallMethod>>");
    
        // TODO: Extract statuses from responsePassed.
        const arrayStatus = responsePassed.data.statuses;

        // TODO: Initialize an array of GenericComponents.
        var arrayTweetComponents = [];

        // TODO: Cycle through XXX elements.
        for(var k001 = 0; k001 < arrayStatus.length; k001++) {

            // TODO: Get first two letters of text string, to check for retweet.
            const firstTwoLetters = arrayStatus[k001].text.substr(0,2);
            
            // TODO: Check to retweets, then probably eliminate them.
            if((firstTwoLetters!=="RT") || (arrayOptionsPassed[1] === false)) {
            
                // TODO: Extract attributes from each element of arrayStatus.
                const nameK = arrayStatus[k001].user.screen_name;
                const dateK = (arrayStatus[k001].created_at.split("+")[0]).split(":")[0] + ":" + (arrayStatus[k001].created_at.split("+")[0]).split(":")[1]
                const urlAvatarK =  imageTwitter001;//Faker.image.avatar(); //arrayStatus[k001].user.profile_image_url;           
                var textK = arrayStatus[k001].text;
                
                // NOTE: That there is a general format (provided by Twitter) for links
                // to tweets based on their ID.
                const idK = arrayStatus[k001].id_str;
                const urlTweetK = "https://twitter.com/AnyUser/status/" + idK;

                // TODO: Remove @-tags from textK if requested in arrayOptionsPassed.
                if(arrayOptionsPassed[0]) {
                    textK = this.removeAtTags(textK);
                }
                
                // TODO: Create TweetComponent from JSON.
                if(arrayOptionsPassed[0]) {}
                const jsonTweetK = {name: nameK, date: dateK, text: textK, urlAvatar: urlAvatarK, urlSource: urlTweetK};
                const tweetComponentK = new TweetComponent(jsonTweetK);
            
                // TODO: Add tweetComponentK to arrayTweetComponents.
                arrayTweetComponents.push(tweetComponentK);
            }
        }

        // TODO: Randomize order for tweets.
        if(boolRandomize) {
            this.shuffleArrayElements(arrayTweetComponents);
        }

        // TODO: Take only the beginning of arrayTweetComponents.
        arrayTweetComponents = arrayTweetComponents.slice(0,Math.min(50,arrayTweetComponents.length));
        
        // TODO: Return arrayTweetComponents.
        return arrayTweetComponents;
    }

    static removeAtTags(stringPassed) {
        const headerMessage = "<<App/removeAtTags>> + ";

        // TODO: Initialize string to return.
        var stringToReturn = '';
        
        // TODO: Split string by spaces.
        const arrayStrings = stringPassed.split(' ');

        // TODO: Cycle through all elements.
        for(const stringK001 of arrayStrings) {

            // TODO: Append stringK001 to strigToReturn, unless it begins
            // within an @ tag.  Otherwise, ignore it.
            if(stringK001.substr(0,1) === '@') {
                stringToReturn = stringToReturn + '<@> ';
            } else {
                stringToReturn = stringToReturn + stringK001 + ' ';
            }
        }

        // TODO: Return appropriate result.
        return stringToReturn;
    }

    static shuffleArrayElements(arrayPassedIn) {
        arrayPassedIn.sort(() => Math.random() - 0.5);
    }
};

// TODO: Export component.
export default App;

