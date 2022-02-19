<script>
	import './SearchX.scss';
	import HeaderButton from "./HeaderButton.svelte";
	import MenuSurface from '@smui/menu-surface';
	import Textfield, {Input} from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text/index';
	import FloatingLabel from '@smui/floating-label';
	import LineRipple from '@smui/line-ripple';
	import Wrapper from '@smui/touch-target';
	import {onMount} from "svelte";
	let LogLevel;
	let xLogLevel = function() {
		console.info(...arguments);
	};
    let xValue = '';
    let xValueTemp = '';
    let xLineRippleRef;
    let xLabelRef;
    let xInputRef;
	let xFocusRef;
    export let xState = 0;
    export let xFocus = false;
    export const xLabel = "Search ";
    export const xHelpLabel = "Search";
    /**/
	const mouseEnterSearchBar = function (){
    };
	const focusSearchBar = function (){
		xState = 1;
		xValue = xValueTemp;
		xLogLevel("onFocusSearchBar");
		onFocusSearchBar();
    };
	const blurSearchBar = function (){
		//xState = 0;
		xValueTemp = xValue;
		//xValue = ``;
		xLogLevel("onBlurSearchBar");
		onBlurSearchBar();
    };
	const toggleMenu = function (){
		if (xState)
			xState = 0;
		else
			xState = 2;
			xLogLevel("onToggleMenu");
			onToggleMenu();
    };
	/**/
    const clickComboIcon = function () {
		toggleMenu();
    	xLogLevel("onClickComboIcon");
    	onClickComboIcon();
    };
	const clickSearchIcon = function (){
		console.log(xInputRef.$$.ctx[3])
		xState = 1;
		xValue = xValueTemp;
		xLogLevel("onClickSearchIcon");
		onClickSearchIcon();
    };
    const clickCloseIcon = function () {
		xState = 0;
		xValue = ``;
		xValueTemp = ``;
    	xLogLevel("onClickCloseIcon");
    	onClickCloseIcon();
    };
	/**/
	export let onToggleMenu = function () {    };
	export let onFocusSearchBar = function () {    };
	export let onBlurSearchBar = function () {    };
    export let onClickComboIcon = function () {    };
    export let onClickSearchIcon = function () {    };
    export let onClickCloseIcon = function () {    };
    /**/
	onMount(()=> console.log(xInputRef));
</script>
<Wrapper id="x-search">
    <HeaderButton icon="apps"
				  on:blur={blurSearchBar}
				  click={toggleMenu} touch/>
    <Textfield
            bind:input={xInputRef}
            bind:floatingLabel={xLabelRef}
            bind:lineRipple={xLineRippleRef}>
		<FloatingLabel
				bind:this={xLabelRef}
				for="input-manual-a"
		>{xLabel}
		</FloatingLabel>
		<div >
			<FloatingLabel
					bind:this={xLabelRef}
					for="input-manual-a">
				<!--{#if (xValue.length==0)}-->
					{#if ((xState == 0) || (xValue.length == 0))}
					<ul class="content__container__list">
						<li class="content__container__list__item">your modules!</li>
						<li class="content__container__list__item">saved lists and logs!</li>
						<li class="content__container__list__item">your order history!</li>
						<li class="content__container__list__item">everything!</li>
					</ul>
				{/if}
			</FloatingLabel>
		</div>
        <Input
                bind:this={xInputRef}
                bind:value={xValue}
                on:focus={focusSearchBar}
                on:blur={blurSearchBar}
				on:mouseenter={mouseEnterSearchBar}
                id="input-manual-a"
                aria-controls="helper-text-manual-a"
                aria-describedby="helper-text-manual-a"
        />
        <LineRipple bind:this={xLineRippleRef}/>
        <HelperText id="helper-text-manual-a">{xHelpLabel}
        </HelperText>
    </Textfield>
    {#if (xState==0)}
        <HeaderButton icon="search" click={clickSearchIcon} touch/>
    {:else}
		{#if ((xState == 2) || (xValue.length !== 0))}
			<slot class={xState>2?'':'hidden'}></slot>
		{/if}
        <HeaderButton icon="close" click={clickCloseIcon} touch/>
    {/if}
</Wrapper>
