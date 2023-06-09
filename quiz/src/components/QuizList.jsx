import React from 'react'
import { Quiz } from './Quiz'
  const quizStyle={
    div:{
      display:'flex',
      flexWrap:'wrap',
      //paddingTop: 140
    } 
  }
export function QuizList({quizzes, mode}) {
  return (
    <>      
      <div  style={quizStyle.div} >
        {quizzes.map(quiz=>{
          return <Quiz quiz={quiz} key={quiz.id} showMode={mode} />
        })}
      </div>     
    </>
  )
}
