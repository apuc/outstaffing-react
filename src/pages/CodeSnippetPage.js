import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const CodeSnippetlighter = () => {
    const [codeString, setCodeString] = useState(``) 

    useEffect(()=>{
      fetch('/code.txt')
      .then((r) => r.text())
      .then(text  => {
        setCodeString(text)
      })  
    }, [])
  
    return (
        <SyntaxHighlighter language={"javascript"} style={a11yDark} wrapLongLines={false} customStyle={{fontSize:14}} showLineNumbers={true}>
          {codeString}
        </SyntaxHighlighter>
    );
  };