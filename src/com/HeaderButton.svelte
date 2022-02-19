<script>
	import {
		onMount
	} from 'svelte';
	import IconButton from '@smui/icon-button';
	export let style;
	export let active = true;
	export let icon = `sync_problem`
	export let alt = ""; // greater than, less than, or equal too
	export let onHeaderButtonMount = function(){};
	export let onClick = function(){};
	/**
	 *  subscribe to status
	 */
	onMount(onHeaderButtonMount || null);
</script>
{#if (active)}
    <IconButton class={("material-icons  " + (active?"active":""))}
                style={style}
                on:click={onClick} alt={alt}>
        {icon}
    </IconButton>
{/if}
