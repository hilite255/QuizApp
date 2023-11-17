import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.jsx';
import { SimpleQuestion } from './SimpleQuestion.jsx';
import { TrueFalseQuestion } from './TrueFalseQuestion.jsx';

export const QuestionContainer = ({ question }) => {
    if (question.type === 'multipleChoice') {
        return (
            <MultipleChoiceQuestion
                question={question.question}
                options={question.options}
            />
        );
    }
    if (question.type === 'simple') {
        return <SimpleQuestion question={question.question} />;
    }
    if (question.type === 'trueFalse') {
        return <TrueFalseQuestion question={question.question} />;
    }
};
