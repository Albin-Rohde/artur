<script>
	import CustomButton from "./components/CustomButton.svelte";
	let count = 0;

	function doWhenClick() {
		count = count + 1;
	}

	function dontClick() {
		count = count - 1;
	}

	let arrayOfImages = ['url1', 'ulr2', 'albin', 'dessi']


	//username
	//email
	//password
	//password confirmation
</script>

<main>
	<h1>Clicked {count} many times!</h1>
	<CustomButton doWhenClicked={doWhenClick} text="klicka på mig"/>
	<CustomButton doWhenClicked={dontClick} text="klicka mig inte"/>
	{#each arrayOfImages as imageUrl}
		<p>{imageUrl}</p>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
