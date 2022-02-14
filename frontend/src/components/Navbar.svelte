<script lang="ts">
export let onClick1: (...a: any) => any;
export let onClick2: (...a: any) => any;
// export let onClick3: (...a:any) => any;
</script>
<div class='navbar'>

 
  <div class="avatar-container" on:click|preventDefault={onClick1} ><img src='assets/avatar.png' alt="*_*" class="avatar"> </div>
  <div class="logo-container" on:click|preventDefault={onClick2} > <img src='assets/text.png' alt="*_*" class="logo"></div>
  <div class="burgir-container" ><img src='assets/hamburger.png' alt="*_*" class="hamburger"></div> 
</div>

<div class='line'></div>


<style>
  img{
    margin: 0px;
    padding: 0px;

  }
  .navbar {
    display: grid;
    align-items: center;
    background-color: #96cb92;
    grid-template-columns: 15% 70% 15%;
    height: 16vh;

  }
  .logo-container{
    grid-column: 2;
    height: 16vh;
    width: 40%;
    justify-self: center;
    display: flex;
    align-items: center;


  }
  .avatar-container{
    grid-column: 1;
    height: 16vh;
    width: 100%;
    justify-self: center;
    display: flex;
    align-items: center;
 
  }
  .avatar {
    margin-left: 37%; 
    height: 8vh;
    width: 6vh;

  }
  .logo{
    
    height: 85%;
    width: 100%;

  }
  .burgir-container{
    grid-column: 3;
    height: 16vh;
    width: 100%;
    justify-self: center;
    display: flex;
    align-items: center;
 
  }
  .hamburger {

    
    margin-left: 33%;
    height: 10vh;
    width: 10vh;
  }

  .line {
    height: 0.3vh;
    background-color: #a2c6c5;
  }
</style>