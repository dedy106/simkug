<?php

date_default_timezone_set("Asia/Jakarta");

uses("server_DBConnection_dbLib");

uses("server_util_arrayList");

uses("server_util_rfcLib");



class yakeslib

{

	// function __construct()

	// {

	// 	$this->db = null;

	// }

	function showMe($param)
	{
		$result = "Welcome $param ";
		return $result;
	}

	function showProfile($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'nik' => 'esaku',
			'password' => 'saisai'
		);
		curl_setopt($ch, CURLOPT_URL,"https://devapi.simkug.com/api/esaku-auth/login");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		curl_close($ch); 
		$token = $output->token;

		$ch2 = curl_init(); 
		curl_setopt($ch2, CURLOPT_URL,"https://devapi.simkug.com/api/esaku-auth/profile-user?nik=".$param);
		curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json; charset=utf-8',
			'Authorization: Bearer '.$token //REST API KEY 
		));
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output2 = json_decode(curl_exec($ch2));
		curl_close($ch2);      
		return $output2->user;
	}

	function getPesertaSIKA($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'key' => 'IeXdn4oCBXN76PlsGXdB5PtuyAK7bqXvS1K4Y4k3s',
			'nikes' => $param
		);
		curl_setopt($ch, CURLOPT_URL,"https://sika.yakestelkom.or.id/api2/getPesertaSika");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		curl_close($ch); 
		return $output;
	}

	// private function getDb()

	// {

	

	// 	if ($this->db == null)

	// 	{

	// 		$this->db = new server_DBConnection_dbLib("mssql");

	// 	}	

	// 	return $this->db;

	// }

}

?>