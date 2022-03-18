<body class="hold-transition login-page">
<div class="login-box">
  <!--<div class="login-logo">-->
    <!--<a href="../../index2.html"><b>SAI</b>Front End</a>-->
  <!--</div>-->
  <!-- /.login-logo -->
  <div class="login-box-body" style="background:white;width:310px;margin:120px auto;padding:20px">
    <h3 style='font-size:25px'>Login</h3>
    <form action="cLogin.php?fx=login" method='POST'>
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control"  placeholder="Username" name="nik" required>
          <div class="input-group-addon"><i class="fa fa-user"></i></div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control"  placeholder="Password" name="pass" required>
          <div class="input-group-addon"><i class="fa fa-lock"></i></div>
        </div>
      </div>
      <div class="row">
        <!--<div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>-->
        <!-- /.col -->
            <div class="col-xs-6">
                <button type="submit" class="btn btn-primary btn-block btn-flat" style="margin-top:3px;">Sign In</button>
            </div>
        <!-- /.col -->
      </div>
    </form>

    <!--<div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>-->
    <!-- /.social-auth-links -->

    <!--<a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>-->

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

</body>
