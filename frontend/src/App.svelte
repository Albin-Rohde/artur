<script>
import RegisterForm from "./components/RegisterForm.svelte";

function doOnClick(){

}




	//username
	//email
	//password
	//password confirmation
</script>

<main>

<h1> Welcome to Artur! </h1>
<form>
<RegisterForm></RegisterForm>
</form>




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
