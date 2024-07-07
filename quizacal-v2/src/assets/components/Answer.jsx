

export default function Answer(props){

    let backgroundColor = ""
    let border = ""
    let opacity = ""
    if( props.isChecked ){
        if ( props.isHeld ){
            if ( props.isCorrect ){
                backgroundColor = "#94D7A2"
                border = "0.79px solid #94D7A2"
            }
            else{
                backgroundColor = "#F8BCBC"
                border = "0.79px solid #F8BCBC"
                opacity = "50%"
            }
        }
        else {
            if ( props.isCorrect ){
            backgroundColor = "#94D7A2"
            border = "0.79px solid #94D7A2"
            }
            else{
                border = "0.79px solid #D6DBF5"
                opacity = "50%"
            }
        }
    }
    else{
        if ( props.isHeld ){
            backgroundColor = "#D6DBF5"
            border = "0.79px solid #D6DBF5"
        }
        else{
            backgroundColor = "#F5F7FB"
            border = "0.79px solid #4D5B9E"
        }
    }


        

    const styles = {
        backgroundColor: backgroundColor,
        border: border,
        opacity: opacity
    }

    return (
        <button style={styles} onClick={() => props.holdAnswer(props.id, props.questionId)} >
            <p>{props.value}</p>
        </button>
    )
}