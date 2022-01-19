import * as React from 'react';

import MyClassrooms from './my-classrooms.js'

export default function MainApp() {
  const [userIsAuthenticated,setUserIsAuthenticated] = React.useState(false)  

  const [URI, setURI] = React.useState(undefined)

  

  React.useEffect(() => {    
    if(URI==undefined){      
      let fullPath = window.location.pathname+window.location.search
      if((window.location.pathname).localeCompare('/')==0){        
        window.location.pathname = "my-classrooms"
        setURI("my-classrooms")
      }
      else{
        setURI(window.location.pathname)
      }
    }
  }, [URI]);


  return (
    <MyClassrooms userIsAuthenticated={userIsAuthenticated}></MyClassrooms>
  );
}