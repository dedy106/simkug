<?php

    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    // function send(){
       
    //     /*
    //     $this->googleapi->setApplicationName('SJU Mail');
    //     $this->googleapi->setScopes(["https://www.googleapis.com/auth/gmail.compose"]);
        
    //     // db method
    //     $token_db = $this->sai->getRowArray("select access_token, expires_in, scope, token_type, created, refresh_token from api_google order by tgl_input desc");
    //     $accessToken = $token_db;
        
    //     $this->googleapi->setAccessToken($accessToken);
        
    //     // Refresh the token if it's expired.
    //     if ($this->googleapi->isAccessTokenExpired()) {
    //         $sts = "refreshed";
    //         // echo($this->googleapi->getRefreshToken());
    //         $this->googleapi->fetchAccessTokenWithRefreshToken($this->googleapi->getRefreshToken());
            
    //         // $this->googleapi->setAccessToken($this->googleapi->getAccessToken());
            
    //         // db update method
    //         // $this->db->
    //     }else{
    //         $sts = "valid";
    //     }
        
    //     // echo $detail['email'].'-'.$admin['email'];
    //     */
        
    //     $service = new Google_Service_Gmail($this->googleapi);
    //     // ---Process data
    //     try {
    //         $strSubject = "SAI Test - Send email with saiweb";
    //         $strRawMessage = "From: <enahadiani2@gmail.com>\r\n";
    //         $strRawMessage .= "To: <enahadiani4@gmail.com>\r\n";
    //         // $strRawMessage .= "CC: Bar<bar@gmail.com>\r\n";
    //         $strRawMessage .= "Subject: =?utf-8?B?" . base64_encode($strSubject) . "?=\r\n";
    //         $strRawMessage .= "MIME-Version: 1.0\r\n";
    //         $strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
    //         $strRawMessage .= "Content-Transfer-Encoding: base64" . "\r\n\r\n";
    //         $strRawMessage .= "<center>
    //         <img src='http://dbsju.simkug.com/assets/img/logosju.png' style='height:200px; width:auto;'>
    //         <h2>SURAT PERMOHONAN PENERBITAN JAMINAN</h2>" . "\r\n";
    //         $strRawMessage .= "<table>" . "\r\n";
    //         $strRawMessage .= "<tr><td>Jenis Surety Bond yang diminta oleh Prinsipal</td><td>:</td><td>".$detail["nama_jsb"]."</td></tr>" . "\r\n";
    //         $strRawMessage .= "<tr><td>Nilai Jaminan</td><td>:</td><td><b>10000</b></td></tr>" . "\r\n";
    //         $strRawMessage .= "<tr><td>Nama Principal Kontraktor</td><td>:</td><td>Ena</td></tr>" . "\r\n";
    //         $strRawMessage .= "<tr><td>Alamat</td><td>:</td><td>Pesona Bali Residence</td></tr>" . "\r\n";
    //         $strRawMessage .= "</table>" . "\r\n";
    //         $strRawMessage .= "</center>" . "\r\n";
    //         $strRawMessage .= "<div style='float:right'>
    //         <center>
    //         Kontraktor / Principal
    //         <br><br><br>
    //         KASNATA/Direktur Utama
    //         </center></div>" . "\r\n";
    //         // The message needs to be encoded in Base64URL
    //         $mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
    //         $msg = new Google_Service_Gmail_Message();
    //         $msg->setRaw($mime);
    //         //The special value **me** can be used to indicate the authenticated user.
    //         $service->users_messages->send("me", $msg);
    //         echo "Sukses kirim email";
    //     }catch (Exception $e) {
    //         echo "Gagal kirim email error: ".$e->getMessage());
    //     }
        
    // }

    function send(){
        $sql = "select access_token, expires_in, scope, token_type, created, refresh_token from api_google order by tgl_input desc";
        $rs = execute($sql);
        if ($rs->RecordCount > 0) {
            while($row = $rs->FecthNextObject($toupper=false)) {
               $token = $row->access_token;
               $refresh_token = $row->refresh_token;
            }
        }
  
        // Replace this with your Google Client ID
        $client_id     = "198055490527-ukj6as99octqbcibpaoa2on7osgsbtup.apps.googleusercontent.com";
        $project_id = "sai-mail-service-1535598919180";
        $auth_uri="https://accounts.google.com/o/oauth2/auth";
        $token_uri="https://www.googleapis.com/oauth2/v3/token";
        $auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs";$client_secret="8Va_GyZnvYaZaePCTx38fB1y";
        $redirect_uri= "urn:ietf:wg:oauth:2.0:oob";
  
        $client = new Google_Client();
        $client->setClientId($client_id);
        $client->setClientSecret($client_secret);
        $client->setRedirectUris($redirect_uri);
        $client->addScope("https://www.googleapis.com/auth/gmail.compose");
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');
  
        $client->setAccessToken($token);
  
        if ($client->isAccessTokenExpired()) {
        $client->refreshToken($refresh_token);
        $newtoken = $client->getAccessToken();
        $client->setAccessToken($newtoken);
        }
  
        $service = new Google_Service_Gmail($client);
  
        $fromemail = "<enahadiani4>@gmail.com";
        $RECIPIENT="enahadiani2@gmail.com";
        $EMAILSUBJECT="Test send email";
        $EMAILBODY="hello oooooo";
  
        $strRawMessage = "From: Email <$fromemail> \r\n";
        $strRawMessage .= "To: <$RECIPIENT>\r\n";
        $strRawMessage .= 'Subject: =?utf-8?B?' . base64_encode($EMAILSUBJECT) . "?=\r\n";
        $strRawMessage .= "MIME-Version: 1.0\r\n";
        $strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
        $strRawMessage .= 'Content-Transfer-Encoding: quoted-printable' . "\r\n\r\n";
        $strRawMessage .= "$EMAILBODY\r\n";
        $mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
        $msg = new Google_Service_Gmail_Message();
        $msg->setRaw($mime);
        $service->users_messages->send("me", $msg);
    }

    function view(){
        echo "test";
    }
?>
