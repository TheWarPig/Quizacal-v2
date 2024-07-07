import yellowBlob from '/blob5.png'
import blueBlob from '/blob5-2.png'
import {useState, useEffect} from 'react'
import Question from './assets/components/Question'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import { TailSpin } from 'react-loading-icons'



export default function App(){
    // console.log(data)
    const [isGameOn, setIsGameOn] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [questionElements, setQuestionElements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [correctAnswersNum, setCorrectAnswersNum] = useState(0)


    const fetchData = async () => {
        try {
          const response = await fetch('https://opentdb.com/api.php?amount=5');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          return result;
        } catch (e) {
          console.log(e);
          throw e; // Re-throwing the error allows the caller to handle it
        }
      };
      
      // Example usage:
      const handleFetchData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchData();
          
          const questionsArray = data.results.map(item => {
            // Process answers here (e.g., push right answer to array and shuffle)
            
            let answersArray = item.incorrect_answers.map(answerItem => (
              {
                id: nanoid(),
                answer: decode(answerItem),
                isCorrect: false,
                isHeld: false
              }
            ))

            answersArray.push(
              {
                id: nanoid(),
                answer: decode(item.correct_answer),
                isCorrect: true,
                isHeld: false
              }
            )
            
            for (let i = answersArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]];
            }
            return {
              id: nanoid(),
              question: decode(item.question),
              answers: answersArray
            };
          });
    
          console.log(questionsArray);
          setQuestionElements(questionsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };

    function startGame(){
        setIsGameOn(true)
        handleFetchData()
    }

    function holdAnswer(id, questionId){
      setQuestionElements(prevQuestionElements => prevQuestionElements.map(question => (
        question.id === questionId ?
        {
          id: question.id,
          question: question.question,
          answers: question.answers.map(answer => (
            answer.id === id ? {...answer, isHeld: !answer.isHeld} : {...answer, isHeld:false}
          ))

        }
        :
        question
      )))
    }

    function checkAnswers(){
      if (isChecked){
        setIsChecked(false)
        setIsLoading(true)
        startGame()
      }
      else{
        let isHeldCount = 0
        let correctCount = 0
        questionElements.forEach(question => {
          question.answers.forEach(answer => {
            if(answer.isHeld){
              isHeldCount ++
              if(answer.isCorrect){
                correctCount ++
              }
            }
          })
        })
        if(isHeldCount === questionElements.length){
          setCorrectAnswersNum(correctCount)
          setIsChecked(true)
        }
        else{
          alert("Please pick all the answers")
        }
      }
    }


 
    return (
        <main>
            <img className='yellow-blob' src={yellowBlob} alt="Yellow blob" />
            <img className='blue-blob' src={blueBlob} alt="blue blob" />
            {
                isGameOn ?
                    !isLoading ? 
                    <div className='questions-div'>
                      <div>
                        {
                          questionElements.map(({ id, question, answers }) => (
                            <Question key={id} id={id} question={question} answers={answers} holdAnswer={holdAnswer} isChecked={isChecked}/>
                          ))
                        }
                      </div>
                      <div className="checked-div">
                      {isChecked && <p className="cheked-p">You scored {correctAnswersNum}/{questionElements.length} correct answers</p>}
                      <button className='button' onClick={checkAnswers}>{isChecked ? "Play again" : "Check answers"}</button>
                      </div>
                    </div>
                    
                    :
                    <div>
                      <TailSpin stroke="#4D5B9E" transform='scale(2.5)'/>
                    </div>
                :
                    <div className='start-screen'>
                        <h1>Quizacal</h1>
                        <p>Version 2 of the project by Ido Strassberg</p>
                          <button className='button' onClick={startGame}>Start quiz</button>
                    </div>
                
            }
        </main>
    )

}