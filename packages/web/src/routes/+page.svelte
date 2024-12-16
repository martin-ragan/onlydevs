<script lang="ts">
	let { data } = $props();
</script>

<section class="bg-secondary-content h-screen">
    <div class="hero">
        <div class="hero-content py-20 text-center text-neutral-content">
            <div class="max-w-2xl">
                <h1 class="mb-5 text-7xl py-2 font-bold bg-gradient-to-r from-gray-200 to-green-500 inline-block text-transparent bg-clip-text">Vitajte na OnlyDevs</h1>
                <p class="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">Vaše cesta k dokonalosti online vzdělávání.</p>
                <div class="mt-12 text-center">
                    {#if !data.user}
                        <a href="/login" class="btn bg-primary-green text-white border-0">
                            Přihlásit se do aplikace
                        </a>
                    {:else}
                        <a href="/dashboard" class="btn bg-primary-green text-white border-0">
                            Přejít na kurzy
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <div class="text-white mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
            <h2 class="text-3xl font-bold sm:text-4xl">Nakopněte svoje učení</h2>

            <p class="mt-4">Onlydevs je platforma navržená a vytvořená programátory pro programátory.</p>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
                    class="block rounded-xl border border-neutral-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
            >
                <h2 class="mt-4 text-xl font-bold">Učení ve velikosti bitů</h2>

                <p class="mt-1 text-sm">
                    Učte se vlastním tempem, naše moduly trvají jen několik minut. Nemusíte si vyhradit hodiny času.
                </p>
            </div>

            <div
                    class="block rounded-xl border border-neutral-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
            >
                <h2 class="mt-4 text-xl font-bold">Různorodost</h2>

                <p class="mt-1 text-sm">
                    Nabízíme různé typy modulů, od videí po kvízy, abychom vám zajistili neustálé zapojení a učení.
                </p>
            </div>

            <div
                    class="block rounded-xl border border-neutral-800 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10"
            >
                <h2 class="mt-4 text-xl font-bold">Sledujte svoji cestu</h2>

                <p class="mt-1 text-sm">
                    Sledujte své pokroky a zjistěte, jak daleko jste se dostali. Vždy můžete pokračovat tam, kde jste skončili
                    jediným kliknutím.
                </p>
            </div>
        </div>
    </div>
</section>
