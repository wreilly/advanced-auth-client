// NEW IDEA: // https://davidwalsh.name/object-keys
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

var lilInspector = function (yourObject, yourObjectVariableName_kids) {
    var lilKey; // we won't even initiate. what Type is a key, anyway? String? Hmm
    var lilObject = yourObject; // pros? cons? of doing this?
    console.log("\n **** !!!! lilInspector !!!! ****");
    /* *********
       Now we're just PASSING the "name" (we give it) IN:
       yourObjectVariableName_kids
    */
    if (yourObjectVariableName_kids) { // If we passed it in...
	var objectVariableNameThisTime = yourObjectVariableName_kids;
	console.log("objectVariableNameThisTime : " + objectVariableNameThisTime); }
    else {
	//	console.log("You forgot to pass in the yourObjectVariableName_kids, kid. No big deal.");
    }
    for (lilKey in lilObject){
	if(lilObject.hasOwnProperty(lilKey)) {
	    //	    console.log("!!!! lilInspector !!!!");
	    console.log("KEY   : lilKey            : " + lilKey);
	    console.log("VALUE : lilObject[lilKey] : " + lilObject[lilKey]);
	} else {
	    // do nuttin'
	}
    }
    console.log("**** !!!! /END lilInspector !!!! **** \n");
}

module.exports = lilInspector;
