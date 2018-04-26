
 <?php
require_once('db/config.php'); 

//forgot password
if (isset($_POST['submit']))
{
$eml   = $_POST['mail'];
$sql = "SELECT password FROM users WHERE mail='$eml'";
//echo "<br>$sql";
$res = mysqli_query($con,$sql)or die("Error: ".mysqli_error($con));
$row = mysqli_fetch_array($res);
$_SESSION["forget_mail"] = $eml;
$_SESSION["forget_mail_pass"] = $row[0];
$row[0];
if($row[0]!=""){  
       header("Location: 11.php");
    }
    else
        $log_val = "Enter A valid Email";
}
session_start();
$tb_nme = $_GET['ctst_nme'];
$sql = "select * from $tb_nme"; 
$res = mysqli_query($con,$sql);
$result = array();
mysqli_close($con);
?>
<?php echo "User:   ".$_SESSION["user"];?></a></h2>
<?php while($row = mysqli_fetch_array($res)){
array_push($result,
array(
));
echo"
<div class=\"container\">
  <form action=\"index.php\" method = \"POST\">
    <div class=\"row\">
    <h4><a href=\"http://www.radssoon.com/projeccelator/generic.php?prj_id=23&&nme=Voltage%20doubler\">$row[0]</a></h4>
       </div>
  
  </form>
  </div>";
}
?>
 <?php
$ee = $_SESSION["forget_mail"];
$pass= $_SESSION["forget_mail_pass"];
$to =  $ee;
$subject = "Projeccelator Password";

$message = "Your Password is $pass <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>*This is a Computer generated mail-id. Kindly Don't reply to it";
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// More headers
$headers .= 'From: Projeccelator@radssoon.com' . "\r\n";
mail($to,$subject,$message,$headers);
       header("Location: index.php");
?>