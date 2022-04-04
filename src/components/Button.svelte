<script lang="ts">
	export let onclick: () => Promise<any>;
</script>

<button
	on:click={onclick}
	class="relative m-auto py-5 px-10 
	shadow-[inset_0_0_0_2px_rgba(255,255,255,0.3)] 
	before:absolute before:h-0 before:w-[2px] 
	before:shadow-[inset_1px_1px_0_1px_#008ce6] 
	before:bottom-0 before:left-0 
	before:transition-[height,width] before:duration-[400ms_400ms] 
	before:delay-[400ms,0s] before:ease-in-out 
	hover:before:h-full hover:before:w-full 
	hover:before:transition-[height,width] hover:before:duration-[400ms_400ms] 
	hover:before:delay-[0s,400ms] hover:before:ease-in-out 
	after:absolute after:h-0 after:w-[2px] 
	after:shadow-[inset_-1px_-1px_0_1px_#008ce6] 
	after:top-0 after:right-0 
	after:ease-[cubic-bezier(0.86, 0, 0.07, 1)] 
	after:transition-[height,width] after:duration-[400ms_400ms] 
	after:delay-[400ms,0s] after:ease-in-out 
	hover:after:h-full hover:after:w-full
	hover:after:transition-[height,width] hover:after:duration-[400ms_400ms] 
	hover:after:delay-[0s,400ms] hover:after:ease-in-out"
>
	<slot />
</button>
