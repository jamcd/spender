import React from 'react'
import axios from 'axios'

const TestComponent: React.FC = () => {
    const [text, setText] = React.useState("");
  
    React.useEffect(() => {
      axios
        .get("/ping")
        .then(response => {
          setText(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    return <p>{text || "Loading..."}</p>;
  };

  export default TestComponent
