<script lang="ts">
  let { data } = $props();
  let course = $derived(data.course);
  let lectures = $derived(data.lectures);
</script>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>

<div class="max-w-6xl mx-auto py-8 px-4">
  <h1 class="text-white text-3xl font-medium mb-8">{course.title}</h1>

  <div class="grid md:grid-cols-[1fr,300px] gap-8">
    <main>
      {#if course.sections?.length}
        {#each course.sections as section, index}
          <div class="mb-12" id="section-{index + 1}">
            <h2 class="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Topic {index + 1}</h2>
            <h3 class="text-white text-2xl font-medium mb-6">{section.title}</h3>
            
            {#if section.lectures?.length}
              <div class="space-y-4">
                {#each section.lectures as lecture, index}
                    {@const lectureData = lectures.find(l => l.slug === lecture)}
                  <div class="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-colors">
                    <a data-sveltekit-preload-data="tap" href={`/courses/${lectureData?.slug}`} class="flex items-start gap-4 group">
                      <div class="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={lectureData?.cover || "/default-lesson-icon.svg"} alt="" class="w-6 h-6" />
                      </div>
                      <div class="flex-1">
                        <h4 class="text-white text-lg font-medium mb-1">{lectureData?.title}</h4>
                        <p class="text-gray-400 text-sm line-clamp-2">{lectureData?.description}</p>
                      </div>
                      
                    </a>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </main>

    <aside>
      <div class="bg-gray-800/50 rounded-lg p-6 sticky top-4">
        <h2 class="text-white text-xl font-medium mb-4">Osnova</h2>
        <nav class="space-y-2">
          {#each course.sections as section, index}
            <a 
              href="#section-{index + 1}" 
              class="block text-gray-400 hover:text-white transition-colors"
            >
              {section.title}
              <span class="float-right text-gray-600">{section.lectures?.length || 0}</span>
            </a>
          {/each}
        </nav>
      </div>
    </aside>
  </div>
</div>
