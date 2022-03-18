<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_util_arrayList");
uses("server_util_Map");
uses("server_BasicObject");
uses("server_DBConnection_dbLib");
include_once("gammu.php");

class server_sms_sms extends server_BasicObject
{
	protected $sms;
	protected $workingDir;
	protected $daemon;
	protected $db;
	function __construct()
	{		
		$this->sms = new gammu("gammu");
		global $dirSeparator;
		global $serverDir;
		
		$this->workingDir = $serverDir;
		$this->sms->setFile($this->workingDir. $dirSeparator . "tmp" . $dirSeparator . "inbox.txt");		
		$this->daemon = true;	
		global $dbLib;
		$dbLib->db = $dbLib->db;
	}
	
	//------------------------------- Setter & Getter --------------------------------
	function sendSms($number, $text){			
		global $dbLib;		
		if($this->daemon){
			$id = md5(uniqid(rand(), true));
			$dbLib->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan)values('$id','$number',now(), '$text')");		
			if ($this->sms->Send($number,$text,0,0,0,$respon)) {						
				if (strpos($respon,"OK") != false )
					$dbLib->execute("update sms_outbox set flag_kirim = '1' where no_outbox = '$id'");
				return "SMS Terkirim ". $number;
			} else { 			
				return  str_replace("\n","",trim($respon));
			}			
		}else{	
			$id = md5(uniqid(rand(), true));
			$dbLib->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan)values('$id','$number',now(), '$text')");		
			if ($this->sms->Send($number,$text,0,0,0,$respon)) {						
				if (strpos($respon,"OK") != false )
					$dbLib->execute("update sms_outbox set flag_kirim = '1' where no_outbox = '$id'");
				return "SMS Terkirim ". $number;
			} else { 			
				return  str_replace("\n","",trim($respon));
			}			
		}
	}    
	function sendToMany($number, $text){		
		$num = explode(";",$number);
		$respons = "";
		global $dbLib;
		foreach($num as $number){
			if ($number == "-" || $number == "" ) continue;
			//error_log($number);
			if($this->daemon){			
					$id = md5(uniqid(rand(), true));
					$dbLib->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan)values('$id','$number',now(), '$text')");		
					if ($this->sms->Send($number,$text,0,0,0,$respon)) {						
						if (strpos($respon,"OK") != false )
							$dbLib->execute("update sms_outbox set flag_kirim = '1' where no_outbox = '$id'");
						$respons .= "SMS Terkirim ". $number;
					} else { 			
						$respons .=  str_replace("\n","",trim($respon));
					}															
			}else{	
				$id = md5(uniqid(rand(), true));
				$dbLib->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan)values('$id','$number',now(), '$text')");		
				if ($this->sms->Send($number,$text,0,0,0,$respon)) {						
					if (strpos($respon,"OK") != false )
						$dbLib->execute("update sms_outbox set flag_kirim = '1' where no_outbox = '$id'");
					$respons .= "SMS Terkirim ". $number;
				} else { 			
					$respons .= str_replace("\n","",trim($respon));
				}					
			}
			$respons .= "\n";
		}
		return $respons;
	}    
	function inbox(){
		global $dbLib;		
		if ($this->daemon){
			$inbox = new server_util_Map();					
			$sql = "select tanggal, dari, pesan, smscenter from sms_inbox order by tanggal desc";		
			$rs = $dbLib->LimitQuery($sql, 50, 0);
			if ($rs->EOF) return $inbox;
			$k = 0;
			while ($row = $rs->FetchNextObject($toupper=false)){
				$line = new server_util_Map();
				$line->set("date",$row->tanggal);
				$line->set("from",$row->dari);
				$line->set("body",$row->pesan);
				$line->set("smsc",$row->smscenter);					
				$inbox->set($k,$line);	
				$k++;
			}			
			return $inbox;
		}else {						
			$dataBuffer = $this->sms->Get();//get All SmS		
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
					$dbLib->execute("insert into sms_inbox(dari, tanggal, pesan, smscenter)values('$number','$date', '$body', '$smsc')");
				}			
			}								
			$inbox = new server_util_Map();					
			$sql = "select tanggal, dari, pesan, smscenter from sms_inbox order by tanggal desc";		
			$rs = $dbLib->LimitQuery($sql, 50, 0);
			if ($rs->EOF) return $inbox;
			$k = 0;
			while ($row = $rs->FetchNextObject($toupper=false)){
				$line = new server_util_Map();
				$line->set("date",$row->tanggal);
				$line->set("from",$row->dari);
				$line->set("body",$row->pesan);
				$line->set("smsc",$row->smscenter);					
				$inbox->set($k,$line);	
				$k++;
			}
			$this->sms->Del(1, $respon);					
			return $inbox;
		}
	}
	function outbox(){
		global $dbLib;		
		if ($this->daemon){
			$outbox = new server_util_Map();					
			$sql = "select tanggal, no_telp, pesan, flag_kirim from sms_outbox order by tanggal desc";		
			$rs = $dbLib->LimitQuery($sql, 50, 0);
			if ($rs->EOF) return $outbox;
			$k = 0;
			while ($row = $rs->FetchNextObject($toupper=false)){
				$line = new server_util_Map();
				$line->set("date",$row->tanggal);
				$line->set("to",$row->no_telp);
				$line->set("body",$row->pesan);
				$line->set("status",$row->flag_kirim);					
				$outbox->set($k,$line);	
				$k++;
			}
			return $outbox;
		}else{			
			$dataBuffer = $this->sms->Get();//get All SmS		
			if ($dataBuffer['Outbox']) {			
				foreach ($dataBuffer['Outbox'] as $msg) {					
					list($k,$v)=each($dataBuffer['Outbox']);				
						//$date=$msg['SentTime'];
						$number=$msg['Number'];
						$body=$msg['body'];															
					$id = md5(uniqid(rand(), true));
					$dbLib->execute("insert into sms_outbox(no_outbox,no_telp, tanggal, pesan)values('$id','$number',now(), '$body')");
				}			
			}			
			$outbox = new server_util_Map();					
			$sql = "select tanggal, no_telp, pesan, flag_kirim from sms_outbox order by tanggal desc";		
			$rs = $dbLib->LimitQuery($sql, 50, 0);
			if ($rs->EOF) return $outbox;
			$k = 0;
			while ($row = $rs->FetchNextObject($toupper=false)){
				$line = new server_util_Map();
				$line->set("date",$row->tanggal);
				$line->set("to",$row->no_telp);
				$line->set("body",$row->pesan);
				$line->set("status",$row->flag_kirim);					
				$outbox->set($k,$line);	
				$k++;
			}
			$this->sms->Del(2, $respon);			
			return $outbox;
		}
	}
	//$box = inbox or outbox
	function delSms($id, $box){
		$this->sms->Del($box, $respon);
		return $respon;
	}
	function getImei(){
		$this->sms->Identify($MANUFACTURER,$MODEL,$IMEI,$SIM_IMSI,$NetworkName,$NetworkLevel,$BatteryLevel,$respon);
		return $IMEI  .";" .$NetworkName;
	}
}

?>
