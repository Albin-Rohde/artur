<script>
    export let text = '';

</script>

 
<button class='knapp'>{text}</button>



<style>
    .knapp {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background: #add5a9;
        width: 200px;
        height: 30px;
    }
    .knapp:hover {
        background: #96cb92;
    }
    .knapp:focus {
        background: #d6a7b4;
    }
</style>