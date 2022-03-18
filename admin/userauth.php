<?php

function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");		
	global $dbhost;
	global $dbuser;
	global $dbpass;
	global $database;
	global $dbdriver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$dbdriver);
	define("CONN_HOST",$dbhost);
	
	$adoc = ADONewConnection($dbdriver);
	if ($driver == "ado_mssql")
	{
	  $connected = $adoc->Connect($host, $user, $pass);
	  $adoc->hasTop = "TOP";			  
	}else 			
	  $connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
	if (!$connected){
		error_log($adoc->ErrorMsg());
	}
	return $adoc;
}
function execute($sql, &$error) { 	
	$schema = db_Connect();
	$resultSet = $schema->execute($sql);
	$error = false;
	if (!$resultSet){
		error_log($schema->ErrorMsg());
		error_log($sql);
		echo "error::" . $schema->ErrorMsg();
		$error = true;
		return null;
	}else return $resultSet;
}	
$cmd = $_REQUEST["cmd"];
if ($cmd == null){
	$uname = $_REQUEST["uname"];
	$email = $_REQUEST["email"];
	$rs = execute("select email from sysfreeuser where email = '$email' ", $error);
	if(!$error){
		if ($rs->EOF){
			try{
				$actid = md5(date("r"));
				$pwd = md5(date("c"));
				execute("insert into sysfreeuser (email, nama, actid,tanggal, pwd,status)values('$email','$uname','$actid',now(),'$pwd','N')",$error);			
				if ($error){
					echo "error database access: " ;
					return;
				}
				require_once("../server/server/mail/swift_required.php"); 
				$smtpHost = "smtp.gmail.com";
				$smtpPort = 465;
				$smtpType = "tls"; 		
				$from = "admin@roojax.com";
				$smtpUsername = "admin@roojax.com";
				$smtpPassword="saisai";
				$smtpTimeout = 10;
				$to = $email;
				$subject = "roojax activation for free user";
				$body = "<p>Thank you for try our product. Please click this link below to activate your account.<br>
						<table width='500' >
							<tr><td>Nama</td></td><td>:</td>td>$uname></td></tr>
							<tr><td>Password</td></td><td>:</td><td>$pwd></td></tr>
						</table><br>
						<a href='http://www.roojax.com/admin/userauth.php?cmd=activated&actid=$actid'>http://www.roojax.com/admin/userauth.php?cmd=activated&actid=$actid</a><br><br>
						Best Regard,<br><br>
						roojax admin<br><br>";
				$transport = Swift_SmtpTransport::newInstance($smtpHost, $smtpPort, $smtpType);				
				if ($transport)
					$transport->setTimeout($smtpTimeout);
				else throw ("error: Create Transport Layer");
				if (!empty($smtpUsername)) {
				    $transport->setUsername($smtpUsername);
				    $transport->setPassword($smtpPassword);
				}
				$mailer = Swift_Mailer::newInstance($transport);
				if ($mailer) ;
				else throw ("error: Create Mailer");
				//Create a message
				$message = Swift_Message::newInstance($subject)
				  ->setFrom(array($from))
				  ->setTo(array($to))
				  ->setBody($body,"text/html");		  
				if ($mailer->send($message))
				{
					echo "Check your email to activate your id $email ($actid)";//confirm by email		
				}else{
					execute("delete from sysfreeuser where actid = '$actid'",$error);
					echo "Error sending email.......";
				}
			}catch(Exception $e){
				error_log($e->getMessage());
				echo $e->getMessage();
				execute("delete from sysfreeuser where actid = '$actid'",$error);
			}
		}else echo "error :: $email is already exists, try again";
	}
}else if ($cmd == "sendmail"){
	try{
		$content = urldecode($_REQUEST["content"]);
		$email = $_REQUEST["email"];
		require_once("../server/server/mail/swift_required.php"); 
		$smtpHost = "smtp.gmail.com";
		$smtpPort = 465;
		$smtpType = "tls"; 		
		$from = "admin@roojax.com";
		$smtpUsername = "admin@roojax.com";
		$smtpPassword="saisai";
		$to = "admin@roojax.com";
		$subject = "FAQ from "+$email;
		$body = $content;
		$transport = Swift_SmtpTransport::newInstance($smtpHost, $smtpPort, $smtpType);				
		if ($transport)
			$transport->setTimeout($smtpTimeout);
		else throw ("error: Create Transport Layer");
		if (!empty($smtpUsername)) {
		    $transport->setUsername($smtpUsername);
		    $transport->setPassword($smtpPassword);
		}
		$mailer = Swift_Mailer::newInstance($transport);
		if ($mailer) ;
		else throw ("error: Create Mailer");
		//Create a message
		$message = Swift_Message::newInstance($subject)
		  ->setFrom(array($from))
		  ->setTo(array($to))
		  ->setBody($body,"text/html");		  
		if ($mailer->send($message))
		{
			echo "Check your email to activate your id $email ($actid)";//confirm by email		
		}else{
			echo "Error sending email.......";
		}
	}catch(Exception $e){
		error_log($e->getMessage());
		echo $e->getMessage();	
	}
}else{
	$actid = $_REQUEST["actid"];
	execute("update sysfreeuser set status = 'A' where actid = '$actid'",$error);		
	if (!$error){
		echo ("<script language='javascript'>window.location = 'confirm.php?actid=$actid;</script>");
	}
}
?>