/*** This custom function's purpose is to return an integer number
The function expects three inputs:
1. An array of key value pairs (array of objects)
2. A key 
3. A value
If there is a matching key value pair within the array of objects, it will return the index witin the array it belongs to, otherwise false.
It expects that the array contains unique key value pairs amongst the array members, otherwise it will return the first instance if found. */

export default  function findArrayIndex(objectArray, key, value){
    for (let i = 0; i<objectArray.length; i++){
        if (objectArray[i][key] == value) {
            return i
        }
        console.log("Search in array did not return an index")
    }
    console.log("Array is empty")
    return false
}


