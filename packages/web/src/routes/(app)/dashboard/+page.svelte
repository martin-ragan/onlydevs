<script lang="ts">
	import { Button } from "@onlydevs/ui";
	import Icon from "../../../lib/icon/Icon.svelte";

    type Day = {
        day: number;
        streak: boolean;
    }

    let { data } = $props();

    const coursesInProgress = data.coursesInProgress;
    

    let days: Day[] = [
        {day: 1, streak: true},
        {day: 2, streak: true},
        {day: 3, streak: true},
        {day: 4, streak: false},
        {day: 5, streak: false},
        {day: 6, streak: false},
        {day: 7, streak: false},
    ];

    const abbrevDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const currentDay = new Date().getDay() || 7;

</script>
<section class="p-6">
    <div class="hero bg-[#252525] py-7 px-8 h-72 flex items-start">
        <h1 class="text-5xl font-bold text-white text-left w-full">Welcome back</h1>
    </div>

    <div class="flex gap-4 mt-8 items-stretch h-full w-full justify-center">
        <div class="ssp-6 bg-secondary-content">
            <div class="border border-primary p-4 rounded-md mb-4">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex items-center justify-start gap-2">
                        <h2 class="text-xl font-semibold text-white">Study streak</h2>
                        <span class="text-slate-400 text-sm">14 days</span>
                    </div>
                    <Button>
                        Claim daily reward
                    </Button>
                </div>

                <div class="flex gap-2">
                    {#each days as day}
                        <button class="flex flex-col items-center rounded-md gap-0.5 justify-center h-11 w-20 rounded-md" 
                            class:bg-[#45C58B]={day.streak && day.day <= currentDay}
                            class:border-2={!day.streak && day.day <= currentDay} 
                            class:border-[#45C58B]={!day.streak && day.day <= currentDay}
                            class:bg-[#9C9C9C]={day.day > currentDay}>
                            <span class="text-white text-xs font-bold p-0 m-0">{abbrevDays[day.day - 1]}</span>
                            <span class="text-white text-[10px] font-thin p-0 m-0">5 XP</span>
                        </button>
                    {/each}
                </div>
            </div>

            <div class="border border-primary rounded-md p-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-white">Courses you're taking</h2>
                    <a href="/courses" class="text-white text-sm inline-flex items-center gap-1 font-thin">View all <Icon name="arrow-right" size="8px" /></a>
                </div>

                {#each coursesInProgress as course}
                    <div class="flex items-stretch gap-2 rounded-md border border-primary mb-4">
                        <img src={course.cover} alt={course.title} class="h-20 w-20 object-cover rounded-l-md" />
                        <div class="flex-1 flex items-stretch gap-8 pr-4">
                            <div class="flex-1 flex flex-col justify-center gap-2"> 
                                <h3 class="text-white text-base font-light">{course.title}</h3>
                                <div class="flex gap-2 items-center">
                                    <span class="text-white text-xs font-light">{course.progress}%</span>
                                    <progress class="progress progress-success bg-primary h-1" value={course.progress} max="100"></progress>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <Button class={"h-10 w-30"}>
                                    <Icon name="play" size="14px" />
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
        <div class="p-6 bg-[#252525] rounded-lg w-full"></div>
    </div>
</section>
