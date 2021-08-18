<script>

import App from "../App.svelte";

</script>
<div class='navbar'>
  <img src='assets/avatar.png' alt="*_*" class="avatar">
  <img src='assets/text.png' alt="*_*" class="text">
  <img src='assets/hamburger.png' alt="*_*" class="hamburger">
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
    background-color: #add5a9;
    grid-template-columns: 15% 70% 15%;
    height: 8vh;
  }
  .avatar {
    display: flex;
    grid-column: 1;
    float: left;
    margin-left: 20%;
    height: 4vh;
    width: 3vh;

  }
  .text{
    justify-self: center;
    grid-column: 2;
    height: 70%;
    width: 40%;

  }
  .hamburger {
    display: flex;
    grid-column: 3;
    float: right;
    margin-left: 60%;
    height: 5vh;
    width: 5vh;
  }

  .line {
    height: 0.1vh;
    background-color: rgb(77, 77, 77);
  }
</style>