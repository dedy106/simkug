<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_belajar_rptEmail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp = $tmp[2];
        $nik = $tmp[3];
        $pass = $tmp[4];
                
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;	
        $_SESSION['pass'] = $pass;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        
        $root_ser = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/web/server/belajar";
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
      
    echo "
      <div id='loading-overlay' style='background: rgba(233, 233, 233, 0.34) none repeat scroll 0% 0%; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;'>
          <center>
              <img src='$link/image/stackspinner.gif' style='position:fixed; top: 50%; transform: translateY(-50%);'>
          </center>
      </div>";
      echo"
        <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        body {
          font-family: 'Roboto', sans-serif !important;
        }
        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
          font-family: 'Roboto', sans-serif !important;
          font-weight: normal !important;
        }
        h3{
          margin-bottom: 5px;
          font-size:18px !important
        }
        h2{
          margin-bottom: 5px;
          margin-top:5px;
        }
        .judul-box{
          font-weight:bold;
          font-size:18px !important;
        }
        .inner{
          padding:5px !important;
        }
        
        .box-nil{
          margin-bottom: 20px !important;
        }
        
        .pad-more{
          padding-left:0px !important;
          padding-right:10px !important;
        }
        .mar-mor{
          margin-bottom:10px !important;
        }
        .box-wh{
          box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
        }
        #ajax-content-section{
          background: white !important;
        }
        th{
          vertical-align: middle !important; 
        }
        .badge{
            display: inline-block;
            padding: .25em .4em;
            font-size: 95%;
            text-align: center;
            border-radius: .25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .badge-success{
            background: #00a65a;
            color: white;
        }
        </style>
          <div id='sai_container'>
            <div class='row' id='saku-form'>
                <div class='col-sm-12' style='height: 90px;'>
                    <div class='box' style='padding:0px 20px;border:none;box-shadow:none'>
                        <form class='form' id='form-tambah' >
                            <div class='box-body pb-0' style='border:none;box-shadow:none'>
                                <h4 style='position:absolute'>Form Kirim Email</h4>&nbsp;
                                <button type='submit' class='btn btn-success ml-2'  style='float:right'><i class='fa fa-save'></i> Simpan</button>
                                <hr>
                            </div>
                            <div class='box-body' style='border:none;box-shadow:none' >
                                <div class='form-group row' id='row-id_upload' hidden>
                                    <div class='col-md-3'>
                                        <input class='form-control' type='hidden' id='id' name='id' readonly>
                                        <input class='form-control' type='hidden' id='text' name='text' value='-' readonly>
                                        <input class='form-control' type='hidden' id='from' name='from' value='devsaku5@gmail.com' readonly>
                                    </div>
                                </div>
                                <div class='form-group row'>
                                    <label for='to' class='col-md-2 col-form-label'>To</label>
                                    <div class='col-md-5'>
                                        <input class='form-control' type='text' id='to' name='to' required>
                                    </div>
                                    <p class='col-md-7' style='font-size: 10px;font-style: italic;'>Gunakan tanda pemisah ',' (koma) jika email yang dituju lebih dari satu. Contoh: tes@gmail.com, tes2@gmail.com</p>
                                </div>
                                <div class='form-group row'>
                                    <label for='subject' class='col-md-2 col-form-label'>Subject</label>
                                    <div class='col-md-5'>
                                        <input class='form-control' type='text' id='subject' name='subject' required>
                                    </div>
                                </div>
                                <div class='form-group row'>
                                    <label for='html' class='col-md-2 col-form-label'>Isi Email</label>
                                    <div class='col-md-5'>
                                        <textarea class='form-control' id='html' name='html' required></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <script type='text/javascript'>

            var iconloading = $('#loading-overlay');

            $('#saku-form').on('submit','#form-tambah',function(e){
                e.preventDefault();
                console.log('submit');
                iconloading.show();
                var formData = new FormData(this);
                
                var kode_lokasi = '$kode_lokasi';
                var kode_pp = '$kode_pp';
                formData.append('kode_lokasi',kode_lokasi);
                formData.append('kode_pp',kode_pp);

                for(var pair of formData.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]); 
                }

                $.ajax({
                    type: 'POST',
                    url: '$root_ser/Email.php?fx=send',
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false, 
                    success:function(result){
                        alert(result.message);
                        if(result.status){
                            $('#form-tambah')[0].reset();
                        }
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
                iconloading.hide();
            });

            // ENTER FIELD FORM
            $('#to,#subject,#html').keydown(function(e){
                var code = (e.keyCode ? e.keyCode : e.which);
                var nxt = ['to','subject','html'];
                if (code == 13 || code == 40) {
                    e.preventDefault();
                    var idx = nxt.indexOf(e.target.id);
                    idx++;
                    $('#'+nxt[idx]).focus();
                }else if(code == 38){
                    e.preventDefault();
                    var idx = nxt.indexOf(e.target.id);
                    idx--;
                    if(idx != -1){ 
                        $('#'+nxt[idx]).focus();
                    }
                }
            });
            // END ENTER FIELD FORM
        
          </script>      
        ";
		return "";
	}
	
}
?>
