<!doctype html>
<?php
include('db/config.php');
error_reporting(0);
session_start();
 $err_insrt ="";
 $log_val= "";
if(isset($_POST["submit"]))
{
	$email=$_POST["email"];
	$password=$_POST["pass"];
  $result = mysqli_query($con,'select * from users where mail ="'.$email.'"and password="'.$password.'"');
  if(mysqli_num_rows($result)==1)
  {
        $sql = "SELECT name,user_type FROM users WHERE mail='$eml'";
		$res = mysqli_query($con,$sql)or die("Error: ".mysqli_error($con));
		$row = mysqli_fetch_array($res);
		$_SESSION["user"] = $row[1];
		$_SESSION["user_type"] = $row[5];
		
     header("Location: profile.php");
  }
  else
        $log_val = "Username or password might be wrong";
}
?>

<html class="no-js">
    <head>
		<meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Projeccelator | login</title>
        <meta name="description" content="Projeccelator">

		<!-- Force no zoom on mobile devices. Prevents zoom in inputs. -->
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'>
        <link rel="icon" href="favicon.ico">

        <!-- OpenGraph for better sharing -->
		<meta property="og:title" content="Schoolrunner">
        <meta property="og:description" content="Empower Your School. Connect with data to analyze, track and improve student achievement.">
        <meta property="og:image" content="www.schoolrunner.org/img/schoolrunner-logo-4x1.png">
        <link rel="stylesheet" href="css\vendor.min.css">
        <link rel="stylesheet" href="css\branding.min.css">

        <!-- Choozle Snippet -->
        <script type="text/javascript" src="js/bootstrap.js"></script>
    </head>
    <body class="signinPg">
        <ul class="stripe">
            <li class="band blue"></li>
            <li class="band teal"></li>
            <li class="band yellow"></li>
            <li class="band orange"></li>
            <li class="band red"></li>
        </ul>

        <div class="signin-content">
	<div class="wrap container-fluid">
		<div class="row end-xs">
			<div class="col-xs signin-nav">
				<a href="form_ajax.php">&laquo;&nbsp;SignUp</a>
			</div>
		</div>
		<form action="login.php" method="post">
		<div class="row middle-xs center-xs sign-in-height">
			<div class="col-xs-12 col-sm-6 col-md-4">

				<div class="row center-xs sign-in-logo-container">
					<a href="index.htm" class="sr-logo-container">
						<img class="sr-logo" src="img\svg-logo.svg" alt="Schoolrunner">
					</a>
				</div>
				<div class="row center-xs title">
					<h3>Enter your Details</h3>
				</div>
				<div class="row middle-xs domain-container">
					<div class="col-xs-5 col-sm start-xs sr-domain">
						Email Id
					</div>
					<div class="col-xs-7 col-sm-7 domain-input">
						<input type="email" name="email" value="" placeholder="enter your email-id" required>
					</div>

				</div><br>
				<div class="row middle-xs domain-container">
					<div class="col-xs-5 col-sm start-xs sr-domain">
						Password
					</div>
					<div class="col-xs-7 col-sm-7 domain-input">
						<input type="password" name="pass" value="" placeholder="enter your password" required>
					</div>

				</div><br>
                        <p><font color="blue"><?php echo $err_insrt ;?></font></p>
                        <p><font color="red"><?php echo $log_val ;?></font></p>
				<div class="row center-xs">
					<div class="col-xs">
						<button class="btn teal hover submit" type="submit" name="submit">Login &#10142;</button><br><br>
						<a href="form_ajax.php"class="	domain">New to projeccelator then Signup?</a>
					</div>
				</div>
				
			</div>
		</div>
		</form>
	</div>
</div>
<div class="domain-info" style="display: none;">

	</div>

        <script src="js\vendor.min.js"></script>
        <script src="js\branding.min.js"></script>
    </body>
</html>
