<script lang="ts">
  import { slide, fade } from 'svelte/transition';
  import type { SingleChoiceResult } from "../../services/checkpointService";
  import cn from "../../utils/cn";
import type { CheckpointSingleChoiceQuestion } from "../server/content/_lecture";


  let { index, question, result }: { index: number, question: CheckpointSingleChoiceQuestion, result: SingleChoiceResult | null } = $props();


    const isAnswerCorrect = (code: string) => question.correct === code;
    const isAnswerChecked = (code: string) => result?.answer === code;
    const isQuestionAnswered = $derived(!!result);
    const isQuestionCorrect = $derived(result?.isCorrect ?? false);
</script>

<div
  transition:fade
  class={cn("divider divider-neutral", {
    "divider-primary": isQuestionAnswered && isQuestionCorrect,
    "divider-error": isQuestionAnswered && !isQuestionCorrect,
  })}
>
  <strong
    class={cn("font-semibold", {
      "text-primary": isQuestionAnswered && isQuestionCorrect,
      "text-error": isQuestionAnswered && !isQuestionCorrect,
    })}>{index}</strong
  >
</div>
<div transition:slide>
  <fieldset>
    <section class="flex gap-2 pb-3 text-lg">
      <legend>{question.title}</legend>
    </section>
    {#each question.answers as answer}
      <div 
        transition:slide
        class="py-1 ml-3 md:ml-10 cursor-pointer"
      >
        <div class="flex items-center gap-4">
          <input
            type="radio"
            name={question.code}
            value={answer.code}
            id={`${question.code}-${answer.code}`}
            class={cn("radio radio-success", {
              "radio-error": isAnswerChecked(answer.code) && !isAnswerCorrect(answer.code),
              "radio-primary": isAnswerChecked(answer.code) && isAnswerCorrect(answer.code),
            })}
            disabled={!isAnswerChecked(answer.code) && !!result}
            checked={isAnswerChecked(answer.code)}
          />
          <label class="cursor-pointer" for={`${question.code}-${answer.code}`}>
            {answer.label}
          </label>
        </div>
        {#if isAnswerChecked(answer.code)}
          <p 
            transition:slide
            class={cn("m-0 ml-10 p-0 text-sm", isAnswerCorrect(answer.code) ? "text-primary" : "text-error")}
          >
            {answer.explanation}
          </p>
        {/if}
      </div>
    {/each}
  </fieldset>
</div>
