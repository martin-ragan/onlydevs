<script lang="ts">
  import { slide, fade } from 'svelte/transition';

  type Answer = {
    code: string;
    label: string;
    explanation: string;
  };

  type CheckpointMultipleChoiceQuestion = {
    code: string;
    title: string;
    correct: string[];
    answers: Answer[];
  };

  type MultipleChoiceResult = {
    answer: string[];
    isCorrect: boolean;
  };

  let { question, index, result }: {question: CheckpointMultipleChoiceQuestion, index: number, result: MultipleChoiceResult | null } = $props();

  const isAnswerCorrect = (code: string) => question.correct.includes(code);
  const isAnswerChecked = (code: string) => result?.answer.includes(code) ?? false;
  const isQuestionAnswered = $derived(!!result);
  const isQuestionCorrect = $derived(result?.isCorrect ?? false);
</script>

<div
  class="divider {isQuestionAnswered && isQuestionCorrect ? 'divider-primary' : 'divider-neutral'} 
  {isQuestionAnswered && !isQuestionCorrect ? 'divider-error' : ''}"
  transition:fade
>
  <bold
    class="font-semibold {isQuestionAnswered && isQuestionCorrect ? 'text-primary' : ''} 
    {isQuestionAnswered && !isQuestionCorrect ? 'text-error' : ''}"
  >
    {index}
  </bold>
</div>

<div transition:fade>
  <fieldset>
    <section class="flex gap-2 pb-3 text-lg">
      <legend>{question.title}</legend>
    </section>
    {#each question.answers as answer}
      <div 
        class="py-1 ml-3 md:ml-10 cursor-pointer"
        transition:slide|local
      >
        <div class="flex items-center gap-4">
          <input
            type="checkbox"
            name={question.code}
            value={answer.code}
            id="{question.code}-{answer.code}"
            class="checkbox checkbox-success 
              {isAnswerChecked(answer.code) && !isAnswerCorrect(answer.code) ? 'checkbox-error' : ''} 
              {isAnswerChecked(answer.code) && isAnswerCorrect(answer.code) ? 'checkbox-primary' : ''}"
            disabled={!isAnswerChecked(answer.code) && !!result}
            checked={isAnswerChecked(answer.code)}
          />
          <label class="cursor-pointer" for="{question.code}-{answer.code}">
            {answer.label}
          </label>
        </div>
        {#if isAnswerChecked(answer.code)}
          <p
            transition:slide|local
            class="m-0 ml-10 p-0 text-sm {isAnswerCorrect(answer.code) ? 'text-primary' : 'text-error'}"
          >
            {answer.explanation}
          </p>
        {/if}
      </div>
    {/each}
  </fieldset>
</div>
