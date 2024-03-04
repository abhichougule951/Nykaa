import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.socialintents.com/api/chat/socialintents.1.3.js#2c9faa358d0fecc6018d282846091495';
    script.async = true;

    document.body.appendChild(script);

   
    return () => {
      document.body.removeChild(script);
    };
  }, []); 

  return (
    <div>
      
    </div>
  );
};

export default Chatbot;
