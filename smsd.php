<?php
	include_once("server/gammu.php");
	include_once("server/library.php");	
	
	$sms = new gammu("c:\gammu2\gammu.exe");	
	$done = false;
	$dataBuffer = $sms->Get();//get All SmS	
	echo "get Inbox";
	print_r($dataBuffer);
	$db = db_Connect();
	if ($dataBuffer['Inbox']) {			
		foreach ($dataBuffer['Inbox'] as $msg) {					
			list($k,$v)=each($dataBuffer['Inbox']);
				$date=$msg['SentTime'];
				$number=$msg['Number'];
				$body=$msg['body'];
				$smsc=$msg['SMSC'];						
			$datetmp = explode(" ",$date);
			$datetmp[0] = explode("/",$datetmp[0]);
			$date = $datetmp[0][2] ."-".$datetmp[0][1] ."-".$datetmp[0][0] ." ".$datetmp[1];							
			echo $number . " ".$date;
			//error_log(strpos($body,"REG") . " ". $body);
			$param = explode(" ",$body);			
			$rs = $db->execute("select nama, replytext, sqltext, addsql, kode_folder from sms_kunci where nama like '".$param[0]."%'");
			$folder = "-";
			if ($rs) {
				$tmp = $rs->FetchNextObject(false);
				$folder = $tmp->kode_folder;
				$id = md5(uniqid(rand(), true));			
				if ($tmp->sqltext != "-"){
					$nama = explode(" ",$tmp->nama);
					foreach ($param as $k => $value)
						if (strpos(" " . $nama[$k],"$") != false){
							//error_log("\\" . $nama[$k] . "=\$value;");
							eval("" . $nama[$k] . "=\$value;");
						}
					$key = substr($tmp->replytext,strpos($tmp->replytext,"$"));
					$key .= " ";
					$key = substr($key,0,strpos($key," "));									
					eval("\$sql = \"$tmp->sqltext\";");										
					if ($tmp->addsql != "-")
						eval("\$sql2 = \"$tmp->addsql\";");										
					$rs = $db->execute($sql);
					//error_log($sql);
					if ($rs) {
						$tmp2 = $rs->FetchNextObject(false);					
						$field = substr($key,1,strlen($key) - 1);
						$code = "" . $key . "=\$tmp2->".$field.";";
						eval($code);
						//error_log($code);
						if ($tmp->addsql != "-")
							$db->execute($sql2);
					}
				}					
				eval("\$text = \"$tmp->replytext\";");//"Terima kasih telah melakukan registrasi ke SMS Center kami.";
				$db->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan, kode_folder)values('$id','$number',now(), '$text','$folder')");		
				if ($sms->Send($number,$text,0,0,0,$respon)) {						
					if (strpos($respon,"OK") != false )
						$db->execute("update sms_outbox set flag_kirim = '1' where no_outbox = '$id'");					
				}		
			}
			$db->execute("insert into sms_inbox(dari, tanggal, pesan, smscenter, kode_folder)values('$number','$date', '$body', '$smsc','$folder')");			
		}		
		$done = true;
	}
	if ($done) $sms->Del(1,$respon);
	echo ($respon);	
?>