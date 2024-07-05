import yellowBlob from '/blob5.png'
import blueBlob from '/blob5-2.png'
import {useState, useEffect} from 'react'
import Question from './assets/components/Question'
import data from './data.js'
import { nanoid } from 'nanoid'


export default function App(){
    // console.log(data)
    const [isGameOn, setIsGameOn] = useState(false)
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        } finally {
          
        }
      };
      
      // Example usage:
      const handleFetchData = async () => {
        try {
          const data = await fetchData();
          console.log(data.results);
          setData(data.results)
          // Here you would typically update your state or do something with the data
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
            console.log('loaded');
            setIsLoading(false)
        }
      }

    function startGame(){
        setIsGameOn(true)
        handleFetchData()
    }

    function renderQuestions(){
        const questionElements = data.map(item => {
            // need to do somthing about the answers (push right answer to array and shuffly)
            <Question key={nanoid()} question={item.question} />
        })
    }


    return (
        <main>
            <img className='yellow-blob' src={yellowBlob} alt="Yellow blob" />
            <img className='blue-blob' src={blueBlob} alt="blue blob" />
            {
                isGameOn ?
                    !isLoading ? 
                    <div>
                        <Question question='How Would one say goodbye in Spanish?' />
                        <Question question='Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?' />
                        <Question question='What is the hottest planet in our Solar System?'/>
                        <Question question='In which country was the caesar salad invented?' />
                        <Question question='How Many Hearts Does An Octopus Have?' />
                    </div>
                    :
                    <div>Loading...</div>
                :
                    <div className='start-screen'>
                        <h1>Quizacal</h1>
                        <p>Version 2 of the project by Ido Strassberg</p>
                        <button onClick={startGame}>Start quiz</button>
                    </div>
                
            }
        </main>
    )

}