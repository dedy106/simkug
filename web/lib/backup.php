<?php
    
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function Qassim_HTTP($method, $url, $header, $data){
        if( $method == 1 ){
            $method_type = 1; // 1 = POST
        }else{
            $method_type = 0; // 0 = GET
        }
     
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($curl, CURLOPT_HEADER, 0);
     
        if( $header !== 0 ){
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        }
     
        curl_setopt($curl, CURLOPT_POST, $method_type);
     
        if( $data !== 0 ){
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
     
        $response = curl_exec($curl);
       $json = json_decode($response, true);
        curl_close($curl);
     
        return $json;
    }
   

    function SEND_MAIL(){

        //Get Refresh Token From Database set when running Authentication File
        // include_once('GoogleAPI/vendor/autoload.php');
        // include_once('koneksi.php');
  
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
        $auth_provider_x509_cert_url="https://www.googleapis.com/oauth2/v1/certs";
        $client_secret="8Va_GyZnvYaZaePCTx38fB1y";
        $redirect_uris= array("urn:ietf:wg:oauth:2.0:oob","http://localhost");
  
        $client = new Google_Client();
        $client->setClientId($client_id);
        $client->setClientSecret($client_secret);
        $client->setRedirectUris($redirect_uris);
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

        try{
            $fromemail = "<enahadiani2>@gmail.com";
  
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
        }catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
        }   
        
     }

     function view(){
        $user_to_impersonate = "enahadiani2@gmail.com";
        // $token="ya29.GlsOBgTPLwcx8Sg29mcd8UoFM7fZ4X80gJX0ED6kD5gzXEJH1JFNZT_rTJVX4DvqF-M5glVQglHjuafjGq-KlC449XpbhCkmTlSVQ1Jc2sMLoGBTIuj6nLon-cNZ";
        $token="";
        // putenv("GOOGLE_APPLICATION_CREDENTIALS=google-api-php-client/service-account-credentials.json");
        // $client = new Google_Client();
        // $client->useApplicationDefaultCredentials();
        $sql = "select access_token, expires_in, scope, token_type, created, refresh_token from api_google order by tgl_input desc";
        $rs = execute($sql);
        if ($rs->RecordCount() > 0) {
            $tokens = $rs->getRowAssoc();
            // $refresh_token = $rs->fields[5];
            while($row = $rs->FetchNextObject($toupper=false)){
                $token = $row->access_token;
                $token2 = (array) $row;

            }
        }

        $client_id = "198055490527-ukj6as99octqbcibpaoa2on7osgsbtup.apps.googleusercontent.com";
        $project_id = "sai-mail-service-1535598919180";
        $auth_uri = "https://accounts.google.com/o/oauth2/auth";
        $token_uri = "https://www.googleapis.com/oauth2/v3/token";
        $auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
        $client_secret = "8Va_GyZnvYaZaePCTx38fB1y";
        $redirect_uris = array("urn:ietf:wg:oauth:2.0:oob","http://localhost");
  
        $client = new Google_Client();
        $client->setClientId($client_id);
        $client->setApplicationName("My Mailer");
        $client->setClientSecret($client_secret);
        $client->addScope("https://www.googleapis.com/auth/gmail.compose");
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');
        try {
            $client->setAccessToken($token);

            // if ($client->isAccessTokenExpired()) {
            //     $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            //     // $sts = '1';
            // }
       

            $service = new Google_Service_Gmail($client);
            // Process data
       
            $strSubject = "Test send email from saiweb 123";
            // $strRawMessage = "From: Me<developer@mysai.co.id>\r\n";
            $strRawMessage = "From: Me<nahwan.triatmaja@gmail.com>\r\n";
            $strRawMessage .= "To: Foo<enahadiani2@gmail.com>\r\n";
            // $strRawMessage .= "CC: Bar<bar@gmail.com>\r\n";
            $strRawMessage .= "Subject: =?utf-8?B?" . base64_encode($strSubject) . "?=\r\n";
            $strRawMessage .= "MIME-Version: 1.0\r\n";
            $strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
            $strRawMessage .= "Content-Transfer-Encoding: base64" . "\r\n\r\n";
            $strRawMessage .= "Send mail Works!!!" . "\r\n";
            // The message needs to be encoded in Base64URL
            $mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
            $msg = new Google_Service_Gmail_Message();
            $msg->setRaw($mime);
            //The special value **me** can be used to indicate the authenticated user.
            $service->users_messages->send("me", $msg);
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
           
        }
     }

     function view2(){
        try {
            $user_to_impersonate = "enahadiani2@gmail.com";
            // putenv("GOOGLE_APPLICATION_CREDENTIALS=google-api-php-client/service-account-credentials.json");
            // $client = new Google_Client();
            // $client->useApplicationDefaultCredentials();

            /*$client_id = "920840465269-qq1eci9dler07lv5fkrg257l5q7i8ptc.apps.googleusercontent.com";
            $project_id = "quickstart-1557365007621";
            $auth_uri = "https://accounts.google.com/o/oauth2/auth";
            $token_uri = "https://oauth2.googleapis.com/token";
            $auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
            $client_secret = "KbAcH7F_GJB3WnsEYfvxhy2R";
            $redirect_uri = "http://dev.simkug.com";*/
    
            $client = new Google_Client();
            // $client->setClientId($client_id);
            // $client->setApplicationName("My Mailer");
            // $client->setClientSecret($client_secret);
            // $client->setRedirectUri($redirect_uri);
            $config = array(
                "client_id"=>"299134638990-j30bgme2s5av85erbj966gqhdclo101m.apps.googleusercontent.com","project_id"=>"precise-ego-240101",
                "auth_uri"=>"https://accounts.google.com/o/oauth2/auth",
                "token_uri"=>"https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url"=>"https://www.googleapis.com/oauth2/v1/certs","client_secret"=>"rqsetsZGUgNSUaYLjwsuu3BF",
                "redirect_uris"=>array("http://dev.simkug.com/web/include_lib.php?hal=lib/backup.php&fx=view2")
            );
            $refresh_token="1/vKkEtoJTJOFdYR2WW7ILTX3BY_w59KE3bSamFlq_pJfvEZ3CaBYs_gPaeiWnr6tv";
            $client->setAuthConfig($config);
            $client->addScope("https://www.googleapis.com/auth/gmail.compose");
            $client->setAccessType('offline');
            $client->setApprovalPrompt('force');
            //token berhasil tp expired dalam satu jam 
            $token="ya29.GlsIB_PPstr8YvG8iUA-jPnrRzxIAqmn570dQqVgn-bIMowtwCEE94xIUeBsAYUpryXcaVoy3aDJKx13HuojllPAtTQwyev1r2zOiB0EEgDLrzeBWJKv77VEVc4w";

            if (ISSET($_GET['code'])){
                $client->setAccessToken($_GET['code']);
            }else{
                $client->setAccessToken($token);
            }
        
            // if ($client->isAccessTokenExpired()) {
            //     // Refresh the token if possible, else fetch a new one.
            //     if ($client->getRefreshToken()) {
            //         $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            //     } else {
            //         // Request authorization from the user.
            //         $authUrl = $client->createAuthUrl();
            //         printf("Open the following link in your browser:\n%s\n", $authUrl);
            //         print 'Enter verification code: ';
            //         $authCode = trim(fgets(STDIN));
        
            //         // Exchange authorization code for an access token.
            //         $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            //         $client->setAccessToken($accessToken);
        
            //         // Check to see if there was an error.
            //         if (array_key_exists('error', $accessToken)) {
            //             throw new Exception(join(', ', $accessToken));
            //         }
            //     }
            //     // // Save the token to a file.
            //     // if (!file_exists(dirname($tokenPath))) {
            //     //     mkdir(dirname($tokenPath), 0700, true);
            //     // }
            //     // file_put_contents($tokenPath, json_encode($client->getAccessToken()));
            // }
       
            $service = new Google_Service_Gmail($client);
            // Process data
        
            $strSubject = "Test send email from saiweb";
            $strRawMessage = "From: Me<enahadiani4@gmail.com>\r\n";
            $strRawMessage .= "To: Foo<enahadiani2@gmail.com>\r\n";
            // $strRawMessage .= "CC: Bar<bar@gmail.com>\r\n";
            $strRawMessage .= "Subject: =?utf-8?B?" . base64_encode($strSubject) . "?=\r\n";
            $strRawMessage .= "MIME-Version: 1.0\r\n";
            $strRawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
            $strRawMessage .= "Content-Transfer-Encoding: base64" . "\r\n\r\n";
            $strRawMessage .= "WOW AMAZING!!" . "\r\n";
            // The message needs to be encoded in Base64URL
            $mime = rtrim(strtr(base64_encode($strRawMessage), '+/', '-_'), '=');
            $msg = new Google_Service_Gmail_Message();
            $msg->setRaw($mime);
            //The special value **me** can be used to indicate the authenticated user.
            $service->users_messages->send("me", $msg);
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
        }
     }

    // class GoogleAPI extends Google_Client {
    //     function __construct($params = array()) {
    //         parent::__construct();
    //         // $this->CI =& get_instance();
    //         // $this->db = $this->CI->db;
    //         include("koneksi.php");

    //         $this->setAccessType('offline');
    //         $config = array(
    //             "client_id"=>"198055490527-ukj6as99octqbcibpaoa2on7osgsbtup.apps.googleusercontent.com","project_id"=>"sai-mail-service-1535598919180","auth_uri"=>"https://accounts.google.com/o/oauth2/auth","token_uri"=>"https://www.googleapis.com/oauth2/v3/token","auth_provider_x509_cert_url"=>"https://www.googleapis.com/oauth2/v1/certs","client_secret"=>"8Va_GyZnvYaZaePCTx38fB1y",
    //             "redirect_uris"=> array("urn:ietf:wg:oauth:2.0:oob","http://localhost")
    //         );
    //         $this->setAuthConfig($config);

    //         // hanya uncomment apabila data di tabel api_google sudah ada !
    //         /* */
    //             $token_db = execute("select access_token, expires_in, scope, token_type, created, refresh_token from api_google order by tgl_input desc");
    //             $accessToken = $token_db->getRowAssoc();
                
    //             $this->setAccessToken($accessToken);

    //             // Refresh the token if it's expired.
    //             if ($this->isAccessTokenExpired()) {
    //                 $this->fetchAccessTokenWithRefreshToken($this->getRefreshToken());
    //                 // $sts = '1';
    //             }
    //         /**/
    //     }
    // } 
?>