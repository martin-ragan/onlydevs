<script lang="ts">
    import { Marked } from "marked";
    import { markedHighlight } from "marked-highlight";
    import hljs from 'highlight.js';
    import typescript from 'highlight.js/lib/languages/typescript';
    import css from 'highlight.js/lib/languages/css';
    import './LectureContent.css';

    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('css', css);

    const marked = new Marked(
        markedHighlight({
            highlight(code, lang) {
                const language = hljs.getLanguage('typescript') ? 'typescript' : 'plaintext';
                return hljs.highlightAuto(code, ['typescript', 'css']).value;
            }
        })
    );


    let { content }: {content: string} = $props();
</script>

<div class="prose prose-invert markdown-area">
    {#await marked.parse(content)}
        <p>Loading...</p>
    {:then content}
        {@html content}
    {:catch error}
        <p class="error">Error loading content: {error.message}</p>
    {/await}
</div>