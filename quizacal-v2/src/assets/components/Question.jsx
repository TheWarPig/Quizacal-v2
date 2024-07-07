import Answer from './Answer'

export default function Question(props){

    const answersElements = props.answers.map(item => (
        <Answer key={item.id} id={item.id} questionId={props.id} value={item.answer} isCorrect={item.isCorrect} isHeld={item.isHeld} holdAnswer={props.holdAnswer} isChecked={props.isChecked}/>
    ))
    return (
        <div className='question'>
            <h2 className='question-text'>{props.question}</h2>
            <div className='answers-div'>
                {[answersElements]}
            </div>
        </div>
    )

}