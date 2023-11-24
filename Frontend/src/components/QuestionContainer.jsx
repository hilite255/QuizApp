import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.jsx';
import { SimpleQuestion } from './SimpleQuestion.jsx';
import { TrueFalseQuestion } from './TrueFalseQuestion.jsx';

export const QuestionContainer = ({ question, setAnswer }) => {
    if (question.type === 'MultipleChoice') {
        return (
            <MultipleChoiceQuestion
                question={question.text}
                options={question.options}
                setAnswer={setAnswer}
            />
        );
    }
    if (question.type === 'Simple') {
        return (
            <SimpleQuestion question={question.text} setAnswer={setAnswer} />
        );
    }
    if (question.type === 'TrueFalse') {
        return (
            <TrueFalseQuestion question={question.text} setAnswer={setAnswer} />
        );
    }
};
