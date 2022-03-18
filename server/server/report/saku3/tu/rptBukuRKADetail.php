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
class server_report_saku3_tu_rptBukuRKADetail extends server_report_basic
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
        $nik=$tmp[2];
        $no_bukti=$tmp[3];
             
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/ypt";
        $root=$link;
        $path = $link."/";
		
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
        .btn-outline-light:hover {
            color: #131113;
            background-color: #ececec;
            border-color: #ececec;
        }
        .btn-outline-light {
            color: #131113;
            background-color: white;
            border-color: white !important;
        }
        .row-dok{
            cursor: pointer;
        }
        .card{
            border: initial;
            background: #fff;
            border-radius: .5rem;
            box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
        }     
        .mt-5{
            margin-top:2rem;
        }   
        .card-body{
            padding: 15px;
        }
        .d-flex{
            display:flex;
        }
        </style>
        <div class='container-fluid'>
            <div class='row'>
                <div class='col-12'>
                <a class='btn btn-outline-light pull-right' href='#' id='btn-back' style='right: 15px;border:1px solid black;font-size:1.25rem;top:0;border-radius:1rem'><i class='fa fa-arrow-left' style='transform-style: ;'></i> &nbsp;&nbsp; Back</a>
                </div>
            </div>
            <div class='row mt-5' id='row-detail'>
                <div class='col-xs-8 '>
                    <div class='card mb-4'>
                        <div class='card-body detail-body'>

                        </div>
                    </div>
                </div>
                <div class='col-xs-4'>
                    <div class='card mb-4'>
                        <div class='card-body'>
                            <h5 class='card-title'>Dokumen</h5>
                            <div class='list-dok'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='row mt-5' id='row-prev'>
                <div class='row-prev-ket pr-2 pl-4 py-2 col-12'>
                    <div class='col-md-12 row-ket' >
                    </div>
                </div>
                <div class='row-prev-pdf col-12'></div>
            </div>
        </div>
        <script type='text/javascript'>
            
            function getDetail(kode=null){
                $.ajax({
                    type:'GET',
                    url:'$root_ser/BukuRKA.php?fx=getBukuRKAListDetail',
                    dataType:'JSON',
                    data:{no_bukti:kode},
                    success: function(result){
                        var html = '';
                        $('.detail-body').html('');
                        $('.list-dok').html('');
                        if(result.status){
                            if(typeof result.data == 'object' && result.data.length > 0){
                                html += '<h6>'+result.data[0].kode_pp+' '+result.data[0].nama_pp+'</h6>';
                                html += result.data[0].keterangan;
                                $('.row-ket').html(result.data[0].keterangan);
                                $('.detail-body').html(html);
                            }
                            var dok = '';
                            if(typeof result.data2 == 'object' && result.data2.length > 0){
                                for(var i=0; i < result.data2.length; i++){
                                    dok +=`<div class='d-flex flex-row align-items-center mb-3 row-dok' href='#' data-href='`+result.data2[i].file_dok+`' data-jenis='`+result.data2[i].kode_jenis+`'>
                                        <a class='d-block position-relative' style='height:40px;width:40px'>
                                            <i class='fa fa-file large-icon initial-height' style='font-size:25px'></i>
                                        </a>
                                        <div class='pl-3 pt-2 pr-2 pb-2'>
                                            <a href='#'>
                                            <p class='list-item-heading mb-1'>`+result.data2[i].nama+`</p>
                                            </a>
                                        </div>
                                    </div>`;
                                }
                                $('.list-dok').html(dok);
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {       
                        if(jqXHR.status == 422){
                            var msg = jqXHR.responseText;
                        }else if(jqXHR.status == 500) {
                            var msg = 'Internal server error';
                        }else if(jqXHR.status == 405){
                            var msg = 'Route not valid. Page not found';
                        }
                        
                    }
                });
                
            }

            getDetail('$no_bukti');
            $('#row-prev').hide();
            var prev = 0;
            $('#btn-back').click(function(e){
                e.preventDefault();
                if(prev == 0){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_tu_rptBukuRKA','','$kode_lokasi/$periode/$nik/');
                }else{
                    $('#row-detail').show();
                    $('#row-prev').hide();
                    $('.row-prev-pdf').html('');
                    prev = 0;
                }
            })

            $('.list-dok').on('click','.row-dok',function(e){
                e.preventDefault();
                $('.row-prev-pdf').html('');
                var file_dok = $(this).data('href');
                var url = 'https://api.simkug.com/api/';
                $('.row-prev-pdf').html(`<div class='col-md-12'><embed src='`+url+`ypt-auth/storage2/`+file_dok+`' type='application/pdf' style='width:100%;height:calc(100vh - 120px)' />
                </div>`);
                $('#row-detail').hide();
                $('#row-prev').show();
                prev = 1;
            });
           
        </script>      
        ";
		return "";
	}
	
}
?>
