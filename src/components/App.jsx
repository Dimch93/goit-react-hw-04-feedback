import { FeedbackOptions } from './feedbackOptions/FeedbackOptions';
import { useState } from 'react';
import { Statistics } from './statistics/Statistics';
import { Section } from './section/Section';
import { Notification } from './notification/Notification';

export const App = () => {
  const [option, setOption] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = option =>
    setOption(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));

  const countTotalFeedback = () => {
    const { good, neutral, bad } = option;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = option;
    return Math.round(
      countTotalFeedback() === 0 ? 0 : (good / countTotalFeedback()) * 100
    );
  };

  const { good, neutral, bad } = option;

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </>
  );
};
