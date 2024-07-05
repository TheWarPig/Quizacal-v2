import Answer from './Answer'

export default function Question(props){


    return (
        <div className='question'>
            <h2 className='question-text'>{props.question}</h2>
            <div className='answers-div'>
                <Answer value='Adios'/>
                <Answer value='Hola'/>
                <Answer value='Au Revoir'/>
                <Answer value='Salir'/>
            </div>
        </div>
    )

}