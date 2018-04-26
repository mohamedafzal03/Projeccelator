<?php

echo"<script>
		alert('haha')       
        </script>";
$err_insrt="";	

include('db/config.php');
//for std
if (isset($_POST['submit']))
{
	
$name   = $_POST['name'];
$eml   = $_POST['email'];
$pass   = $_POST['password'];
$dpt   = $_POST['dept'];
$year   = $_POST['year'];
$rno   = $_POST['rno'];
$phn_no   = $_POST['phone'];
$user_type =$_POST['users'];
//emailid already exists

$query1=mysqli_query($conn,"select count(*) as cnt from users where mail='$eml'");
$row1=mysqli_fetch_assoc($query1);
$num=$row1["cnt"];
if($num==0)
{
	echo"<script>
		alert('email counted');       
        </script>";
$sql_query = "insert into users(name,mail,password,dpt,yr,rl_no,ph_no,user_type) values('$name','$eml','$pass','$dpt','$year','$rno','$phn_no','$user_type');";

if(mysqli_query($con,$sql_query)){
    $err_insrt = "Enter the email-id and password to login";
	header("Location: login.php");
}
else
{
    $err_insrt = "Use a different mail-id";
	header("Location: form_ajax.php");
}
}
else{
	
	echo"<script>
		alert('email id already exist');       
        </script>";
}
}
?>