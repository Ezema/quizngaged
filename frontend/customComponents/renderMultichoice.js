
import * as React from 'react';


/* mui libraries */



const styleDefault = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white'
	
}

const styleSelected = {
  border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'lime'
}





export default function RenderMultichoice({
    questionBody, questionVariants, updateVariants, setCurrentAnswer, timer, timerMin, timerSec
  }
  ){
    const [seconds, setSeconds] = React.useState(timerSec);
    const [minutes, setMinutes] = React.useState(timerMin);
    React.useEffect(() => {
  
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if(seconds <= 10){
          setSeconds('0' + (seconds - 1))
        }
        if (seconds === 0 || seconds === '00') {
            if (minutes === 0) {
                setSeconds(0)
                clearInterval(myInterval)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000)
    return ()=> 
        clearInterval(myInterval);
      
    
    });
 
    const selectVariant = (ind) => {
   var newQuestionVariants = questionVariants.map((variant, index) => {
    if(ind ==index && !variant.isSelected){
        variant.isSelected = true
     } else if(ind ==index && variant.isSelected){
       variant.isSelected = false
     }
     return variant;
   })
   var selectedVariant =  questionVariants.find((variant,index) => ind==index)
   setCurrentAnswer(selectedVariant.id)
   updateVariants(newQuestionVariants)

 } 

   return <>
   <h3>{questionBody}</h3>
   <div className="tasks-conatiner">
         { questionVariants.map((variant, index) => {
          return <div className="variant-block" 
                     key={variant.id} 
                     style={variant.isSelected?{...styleSelected}:{...styleDefault}}
                     onClick={() => selectVariant(index)}>
                    <p>{variant.body}</p>
                 </div>
          })}
    </div>
    {timer?
          <div>
            {(minutes===0 && seconds === 0)?
            <p>Time Expired!</p>
            :
            <p>
              Time Left: {minutes}:{seconds}
            </p>
            }
          </div>
          :
          ""}
   </>
    
}