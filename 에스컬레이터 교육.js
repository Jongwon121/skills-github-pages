const quizData = [
    {
        question: "에스컬레이터 이용 시 핸드레일을 잡아야 한다.",
        answer: "O",
        explanation: "안전을 위해 반드시 핸드레일을 잡고 이용해야 합니다."
    },
    {
        question: "에스컬레이터에서 뛰어다니거나 장난치는 것은 안전하다.",
        answer: "X",
        explanation: "에스컬레이터에서 장난치는 것은 매우 위험합니다."
    },
    {
        question: "에스컬레이터 비상정지 버튼은 빨간색이다.",
        answer: "O",
        explanation: "비상정지 버튼은 쉽게 식별할 수 있도록 빨간색으로 되어있습니다."
    },
    {
        question: "에스컬레이터에서 우측으로 서서 걸어가는 것이 좋다.",
        answer: "X",
        explanation: "에스컬레이터에서는 안전을 위해 걷지 말고 서서 이용해야 합니다."
    },
    {
        question: "에스컬레이터 탑승 전 노란선 안쪽에서 대기해야 한다.",
        answer: "O",
        explanation: "안전선 안쪽에서 대기하는 것이 안전합니다."
    }
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [showResult, setShowResult] = React.useState(false);
    const [answer, setAnswer] = React.useState(null);

    const handleAnswer = (selectedAnswer) => {
        const correct = selectedAnswer === quizData[currentQuestion].answer;
        if (correct) {
            setScore(score + 1);
        }
        setAnswer(selectedAnswer);
        
        setTimeout(() => {
            setAnswer(null);
            if (currentQuestion + 1 < quizData.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setAnswer(null);
    };

    if (showResult) {
        return (
            <div className="quiz-container">
                <div className="quiz-header">
                    <h1>퀴즈 결과</h1>
                    <div className="score-display">
                        총점: {score} / {quizData.length}
                    </div>
                </div>
                <button className="restart-button" onClick={resetQuiz}>
                    다시 시작하기
                </button>
            </div>
        );
    }

    const progress = ((currentQuestion) / quizData.length) * 100;

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1>에스컬레이터 안전 OX 퀴즈</h1>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <div className="question-container">
                <div className="question">
                    {currentQuestion + 1}. {quizData[currentQuestion].question}
                </div>
                <div className="options">
                    <button 
                        className={`option-button o-button ${answer === 'O' ? (quizData[currentQuestion].answer === 'O' ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => !answer && handleAnswer('O')}
                        disabled={answer !== null}
                    >
                        O
                    </button>
                    <button 
                        className={`option-button x-button ${answer === 'X' ? (quizData[currentQuestion].answer === 'X' ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => !answer && handleAnswer('X')}
                        disabled={answer !== null}
                    >
                        X
                    </button>
                </div>
                {answer && (
                    <div className={`result ${answer === quizData[currentQuestion].answer ? 'correct' : 'incorrect'}`}>
                        {quizData[currentQuestion].explanation}
                    </div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<Quiz />, document.getElementById('root'));
