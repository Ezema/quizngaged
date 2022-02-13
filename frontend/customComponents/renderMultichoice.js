
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
    questionBody, questionVariants, updateVariants, setCurrentAnswer
  }
  ){
 
 const selectVariant = (ind) => {
   var newQuestionVariants = questionVariants.map((variant, index) => {
     if(ind ==index){
        variant.isSelected = true
     } else {
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
   </>
    
}