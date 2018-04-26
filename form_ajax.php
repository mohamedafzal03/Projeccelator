<!doctype html>
<?php
$err_insrt="";
$log_val="";
error_reporting(0);

include('db/config.php');
if (isset($_POST['submit']))
{
//echo"<script>alert('inside submit');</script>";
$name   = $_POST['name'];
$eml   = $_POST['email'];
$pass   = $_POST['password'];
$dpt   = $_POST['dept'];
$year   = $_POST['year'];
$rno   = $_POST['rno'];
$phn_no   = $_POST['phone'];
$user_type =$_POST['users'];
//emailid already exists
$query1=mysqli_query($con,"select count(*) as cnt from users where mail='$eml'");
$row1=mysqli_fetch_assoc($query1);
$num=$row1["cnt"];
if($num==0)
{
//echo"<script>alert('email counted');</script>";
$sql_query = "insert into users(name,mail,password,dpt,yr,rl_no,ph_no,user_type) values('$name','$eml','$pass','$dpt','$year','$rno','$phn_no','$user_type');";

if(mysqli_query($con,$sql_query)){
    echo"<script>
		alert('signed up successfully');
		window.location='login.php';
</script>";
	//header("Location: login.php");
}
else
{
    $err_insrt = "error in insertion";
	//header("Location: form_ajax.php");
}
}
else{
	$log_val="email id already exist";
	//header("Location: form_ajax.php");
}
}
?>
<html class="no-js">
    <head>
		<meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Projeccelator | Sign UP</title>
        <meta name="description" content="Projeccelator">

		<!-- Force no zoom on mobile devices. Prevents zoom in inputs. -->
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'>
        <link rel="icon" href="favicon.ico">
		<!--ajax-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


        <!-- OpenGraph for better sharing -->
		<meta property="og:title" content="Schoolrunner">
        <meta property="og:description" content="Empower Your School. Connect with data to analyze, track and improve student achievement.">
        <meta property="og:image"
         content="www.schoolrunner.org/img/schoolrunner-logo-4x1.png">
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
				<a href="login.php">&laquo;&nbsp;Login</a>
			</div>
		</div>
		<form action="form_ajax.php" method="post">
		<div class="row middle-xs center-xs sign-in-height">
			<div class="col-xs-12 col-sm-6 col-md-4">

				<div class="row center-xs sign-in-logo-container">
					<a href="index.htm" class="sr-logo-container">
						<img class="sr-logo" src="img\svg-logo.svg" alt="Schoolrunner">
					</a>
				</div>
				<div class="row center-xs title">
					<h3>Enter Your Details</h3>
				</div>
				
				<div class="row middle-xs domain-container">
					<div class="col-xs-5 col-sm start-xs sr-domain">
						Faculty / Student :
					</div>
					<div class="col-xs-7 col-sm-7 domain-input">

<select name="users" onchange="showUser(this.value)" style="background-color:#f7f7f7;">
<option value="">Select a person :</option>

  <option value="student">student</option>
  <option value="faculty">faculty</option>
</select>
					</div>
				</div>
				        <p><font color="blue"><?php echo $err_insrt ;?></font></p>
                        <p><font color="red"><?php echo $log_val ;?></font></p>
						<div id="txtHint"><br><b style="color:red">Select whether you are Faculty or Student  .</b>
			</div><br>
			
			<a href="login.php"class="domain">Already have an account then LOGIN?</a>
			</div>
			
		</div>
		</form>
	</div>
</div>
</div>
				</div>
<!--<div class="row center-xs">
					<div class="col-xs">
					<a href="index.php"class="domain">Already have an account then LOGIN?</a>
				</div></div>-->
						<br><br>

<!--ajax script-->
<script>
function showUser(str) {
  if (str=="") {
    document.getElementById("txtHint").innerHTML="";
    return;
  } 
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("txtHint").innerHTML=this.responseText;
    }	
  }
  if(str=="student"){
  xmlhttp.open("GET","student_signup.php?q="+str,true);
  }
  else{
  xmlhttp.open("GET","faculty_signup.php?q="+str,true);
  }
  xmlhttp.send();
}
</script>

        <script src="js\vendor.min.js"></script>
        <script src="js\branding.min.js"></script>
    </body>
</html>
