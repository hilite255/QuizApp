import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.jsx';
import { SimpleQuestion } from './SimpleQuestion.jsx';
import { TrueFalseQuestion } from './TrueFalseQuestion.jsx';
import { QUESTION_TYPES } from '../config.js';

export const QuestionContainer = ({ question, setAnswer }) => {
    if (question.type === QUESTION_TYPES.MULTIPLE) {
        return (
            <MultipleChoiceQuestion
                question={question.text}
                options={question.options}
                setAnswer={setAnswer}
            />
        );
    }
    if (question.type === QUESTION_TYPES.SIMPLE) {
        return (
            <SimpleQuestion question={question.text} setAnswer={setAnswer} />
        );
    }
    if (question.type === QUESTION_TYPES.TRUE_FALSE) {
        return (
            <TrueFalseQuestion question={question.text} setAnswer={setAnswer} />
        );
    }
};
