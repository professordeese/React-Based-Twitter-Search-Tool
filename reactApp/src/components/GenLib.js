// (c) 2020 Anthony S. Deese, Ph.D.
// www.AnthonyDeese.com
// youtube.com/c/AnthonyDeesePhD
// This code is licensed under MIT license.

import XDate from 'xdate';

class GenLib {

    static saveTweetsToCSV(arrayPassedIn) {
        const headerMessage = "<<GenLib//createCSV>> + ";

        // TODO: Initialize string to store results.
        var stringToReturn = 'UserName,Date,URL/Link to Tweet,Post/Text' + '\n';
        
        // TODO: Cycle through rows of arrayPassedIn.
        for(let elementK001 of arrayPassedIn) {

            // TODO: Remove all unwanted characters from text.
            var stringTextK001 = elementK001.props.text;
            stringTextK001 = GenLib.replaceAll(stringTextK001, '\n', '(N)');
            stringTextK001 = GenLib.replaceAll(stringTextK001, '\r', '(R)');
            stringTextK001 = GenLib.replaceAll(stringTextK001, ',', '(C)');
            
            // TODO: Add results to stringToReturn.
            stringToReturn = stringToReturn + elementK001.props.name + ',';
            stringToReturn = stringToReturn + elementK001.props.date + ',';
            stringToReturn = stringToReturn + elementK001.props.urlSource + ',';
            stringToReturn = stringToReturn + stringTextK001 + '\n';
        }
        console.log(headerMessage + "<<ArrayAsString>>" + stringToReturn);

        // TODO: Return output.
        return stringToReturn;
    }

    static replaceAll(stringPassedIN, charToRemoveIN, charToAddIN) {

        // TODO: Split stringPassedIn based on charToRemoveIN.
        const arrayStringSplit = stringPassedIN.split(charToRemoveIN);

        // TODO: Initialize string to return.
        var stringToReturn = arrayStringSplit[0];

        // TODO: Rebuild string with charToAddIN.
        for(let k001 = 1; k001 < arrayStringSplit.length; k001++) {
            stringToReturn = stringToReturn + 'charToAddIN' + arrayStringSplit[k001];
        }

        // TODO: Return output.
        return stringToReturn;
    }

    static loadTxtFileToString(filePassedIn){
        const headerMessage = "<<GenLib//LoadTxtFileToString>> + ";

        // NOTE: This code was taken from here: 
        // https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file

        var textToReturn = null;

        // TODO: Execute code below, as taken from example online.
        var fileRaw001 = new XMLHttpRequest();

        // NOTE: That the 'false' below makes the request synchronous.
        fileRaw001.open("GET", filePassedIn, false);
        
        fileRaw001.onreadystatechange = function () {
            if(fileRaw001.readyState === 4) {
                if(fileRaw001.status === 200 || fileRaw001.status == 0) {
                    textToReturn = fileRaw001.responseText;
                    

                }
            }
        }

        // TODO: Send request.
        fileRaw001.send(null);
        
        // TODO: Return output.
        return textToReturn;
    }

    static parseCSV(stringPassedIn){

        // TODO: Initialize array to contain rows of text file.  This requires
        // string to be split by '\n' end-of-line character.
        const arrayRows = stringPassedIn.split('\n');
        
        // TODO: Also initialize array to be returned.
        var matrixToReturn = [];

        // TODO: Cycle through rows / elements of arrayRows.
        for(var arrayRowK001 of arrayRows) {

            // TODO: Define array to contain column elements of this specific row
            // via 'split'.
            const arrayColsK001 = arrayRowK001.split(',');

            // TODO: Push arrayColsK001 to matrixToReturn.
            matrixToReturn.push(arrayColsK001);
        }

        // TODO: Return output.
        return matrixToReturn;
    }

    static convertZipCodeToLatLong(zipCodePassedIn, filePassedIn) {

        // TODO: Load filePassedIn to a matrix.
        const matrixZipCodes = this.parseCSV(this.loadTxtFileToString(filePassedIn));

        // TODO: Cycle through matrixZipCodes, searching for matching code.
        for(let arrayRowK001 of matrixZipCodes) {
            if(arrayRowK001[0] === zipCodePassedIn) {

                // TODO: Create Json Object to store results and return it.
                const jsonToReturn = {lat:arrayRowK001[1], long:arrayRowK001[2], description:arrayRowK001[11]+', '+arrayRowK001[5]};
                return jsonToReturn;
            }
        }

        // TODO: Return null if nothing is found.
        return null;
    }

    static addZeroBeforeInteger(intPassedIn) {
        if(isNaN(intPassedIn)) {
            return intPassedIn;
        } else {
            if(intPassedIn < 10 && intPassedIn > 0) {
                return '0' + intPassedIn;
            } else {
                return intPassedIn;
            }
        }
        return null;
    }

    static formatDateAsYYYYMMDD(datePassedIn) {
        return (datePassedIn.getFullYear() + '-' + this.addZeroBeforeInteger(datePassedIn.getMonth()+1) + '-' + this.addZeroBeforeInteger(datePassedIn.getDate()));
    }

    static makeOrCapital(stringPassed) {
        const arrayTemp001 = stringPassed.split('or');
        var stringToReturn = arrayTemp001[0];
        for(let k001 = 1; k001 < arrayTemp001.length; k001++) {
            stringToReturn = stringToReturn + 'OR' + arrayTemp001[k001];
        }
        return stringToReturn;
    }
}

export default GenLib;