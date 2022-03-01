import '../styles/globals.css'
import dynamic from "next/dynamic";

function Quizngaged({ Component, pageProps }) {
  return (    
      <Component {...pageProps} />        
    )
}

//export default Quizngaged

export default dynamic(()=> Promise.resolve(Quizngaged),{
  ssr:false,
});
