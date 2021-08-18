<div class='navbar'>
  <div class="login">
    <button class="login-btn">Log in</button>
  </div>
</div>
<div class='line'></div>


<style>
  .navbar {
    display: grid;
    background-color: rgb(42, 42, 42);
    grid-template-columns: 15% 70% 15%;
    height: 7vh;
  }
  .login {
    grid-column: 3;
    float: right;
    text-align: right;
    margin-right: 10%;
  }
  .login-btn {
    margin-top: 7%;
  }
  .line {
    height: 0.1vh;
    background-color: rgb(77, 77, 77);
  }
</style>