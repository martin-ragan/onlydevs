<script lang="ts">
	import type { CheckpointLecture, CheckpointResult } from '../../models/types';
    import LectureContent from './LectureContent.svelte';
    import SingleChoiceQuestion from '../question/SingleChoiceQuestion.svelte';
    import MultipleChoiceQuestion from '../question/MultipleChoiceQuestion.svelte';
	import { enhance } from '$app/forms';

    let { lecture }: {lecture: CheckpointLecture} = $props();

    let evaluatedAnswers: CheckpointResult | null = $state(null);
    let isSubmitted = $state(false);
    let loading = $state(false);

    function handleFormSubmit() {
        loading = true;

        return async ({ result, update }) => {
            if (result.type === 'success') {
                evaluatedAnswers = result.data.checkpointResult;
                isSubmitted = true;
            }

            loading = false;
            await update();
        };
    }

    function refresh() {
        isSubmitted = false;
        evaluatedAnswers = null;
    }
</script>

<LectureContent content={lecture.content} />

<form 
  class="flex flex-col" 
  method="post" 
  action="?/submitCheckpointLecture"
  use:enhance={handleFormSubmit}
>
  {#each lecture.questions as question, index}
    {#if question.type === "single-choice"}
      <SingleChoiceQuestion
        question={question}
        index={index + 1}
        result={evaluatedAnswers?.answers[question.code]}
      />
    {/if}
    {#if question.type === "multiple-choice"}
      <MultipleChoiceQuestion
        question={question}
        index={index + 1}
        result={evaluatedAnswers?.answers[question.code]}
      />
    {/if}
  {/each}
  <input type="hidden" name="questions" value={JSON.stringify(lecture.questions)} />
  {#if isSubmitted}
    <p>You scored {evaluatedAnswers?.correctAnswers} out of {evaluatedAnswers?.totalAnswers}</p>
    <button onclick={() => refresh()} class="btn btn-primary w-32 mt-4">Try again</button>
  {:else}
    <button 
      class="btn btn-primary w-32 mt-4" 
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  {/if}
</form>
