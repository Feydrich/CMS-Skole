import React, { useEffect, useRef } from 'react';


function Test() {

    const homePreflight = useRef(true);
    useEffect(() => {
        if(homePreflight.current){
            homePreflight.current = false;
            
        }
      }, []);


  return (
    <h1>Routing works!</h1>
  );
}

export default Test;


