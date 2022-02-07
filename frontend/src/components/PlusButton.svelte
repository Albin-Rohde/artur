<script lang="ts">
    export let onClick: (...a: any) => any;
</script>

<button class='knapp' on:click|preventDefault={onClick}><img src='assets/plus.png' alt="*_*" class="plus" ></button>

<style>
    .knapp {  
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        background: #add5a9;
        width: 15vw;
        height: 6vh;



    }
    .knapp:hover {
        background: #96cb92;
    }
    .knapp:focus {
        background: #d6a7b4;
    }
    .knapp img {
        height: 90%;
        width: 20%;
        object-fit: contain;
    }
</style>