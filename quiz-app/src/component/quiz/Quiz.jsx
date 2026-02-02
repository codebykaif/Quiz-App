import React, { useState, useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {

  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(data[0])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)

  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)

  const optionArray = [option1, option2, option3, option4]

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("Correct")
        setScore(prev => prev + 1)   
      } else {
        e.target.classList.add("Wrong")
        optionArray[question.ans - 1].current.classList.add("Correct")
      }
      setLock(true)
    }
  }

  const next = () => {
    if (lock) {
      optionArray.forEach(option => {
        option.current.classList.remove("Correct")
        option.current.classList.remove("Wrong")
      })

      if (index === data.length - 1) {
        setResult(true)
      } else {
        setIndex(prev => {
          setQuestion(data[prev + 1])
          return prev + 1
        })
        setLock(false)
      }
    }
  }

  const reset = () => {
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)

    optionArray.forEach(option => {
      option.current.classList.remove("Correct")
      option.current.classList.remove("Wrong")
    })
  }

  return (
    <div className="container">
      <h1>BPO Assignment </h1>
      <hr />

      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>

          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} Of {data.length} Questions
          </div>
        </>
      ) : (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  )
}

export default Quiz
