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
class server_report_saku3_tu_rptBukuRKA extends server_report_basic
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
        .navbar{
            height:60px;
            box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
            position: sticky;
            top:0;
            
        }

        .navbar a {
            color: rgba(0, 0, 0, 0.9);
        }
        .separator {
            border-bottom: 1px solid #d7d7d7;
        }
        .search > input{
            width: 100%;
            height: 32px;
            border-radius: 1.5rem;
            padding-left: 1rem;
            border: initial;
            background: #f8f8f8;
            outline: initial !important;
            color: #3a3a3a;
            font-size: 14px !important;
        }
        .mb-0{
            margin-bottom: 0px !important;
        }
        .search > i {
            position:absolute;z-index:10;cursor:pointer;right:10px;margin-top:5px;font-size:20px;color:#d7d7d7
        }
        .my-3{
            margin-bottom: 1rem !important;
            margin-top: 1rem !important;
        }
        .listing-desc{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
        .listing-heading{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            height:50px !important;
        }
        .row-berita{
            cursor:pointer;
        }
        </style>
        <div class='container-fluid mt-3'>
            <div class='row'>
                <div class='col-12'>
                    <nav class='navbar sticky-top navbar-light text-center' style='z-index:1 !important'>
                        <a class='navbar-brand ml-3' id='btn-home' href='#'>Home</a>
                        <a class='navbar-brand navbar-right' href='#' style='width: 250px;'>
                            <div style='width:100%' class='search d-inline-block float-md-left mr-1 mb-1 align-top search-asset'>
                                <input class='inp-repo' placeholder='Cari'>
                                <i class='fa fa-search' id='search-repo'></i>
                            </div>
                        </a>
                    </nav>
                </div>
            </div>
            <div class='row mt-3' id='list-berita'>

            </div>
        </div>
        <script type='text/javascript'>
            
            function getBeritaList(kode=null,sub=null,judul){
                $.ajax({
                    type:'GET',
                    url:'$root_ser/BukuRKA.php?fx=getBukuRKAList',
                    dataType:'JSON',
                    data:{kode_pp:kode,kode_sub:sub},
                    success: function(result){
                        var html = '';
                        $('#list-berita').html(html);
                        if(result.status){
                            if(result.data.length > 0){
                                for(var i=0; i < result.data.length; i++){
                                    var line = result.data[i];
                                    html+=`
                                    <div class='col-12 col-lg-8 row-berita'>
                                        <p hidden class='no_bukti'>`+line.no_bukti+`</p>
                                        <div class='card flex-row listing-card-container p-2 card-berita'>
                                            <div class='w-60 d-flex align-items-center right_`+line.no_bukti+`'>
                                                <div class='card-body py-2 '>
                                                    <p class='text-primary bold mb-0'>`+line.kode_pp+` - `+line.nama_pp+`</p>
                                                    <p class='text-muted text-small'>By `+line.nama_buat+` - `+line.tanggal+`</p>
                                                    <div class='listing-desc text-muted ellipsis' style=''>`+line.keterangan+`</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class='separator my-3'></div>
                                    </div>
                                    `;
                                }
                                $('#list-berita').html(html);
                                $('#list-berita').on('click','.row-berita',function(e){
                                    e.preventDefault();
                                    var kode = $(this).closest('div').find('p.no_bukti').html();
                                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_tu_rptBukuRKADetail','','$kode_lokasi/$periode/$nik/'+kode);
                                });

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

            getBeritaList();

            $('.search').on('click','#search-repo',function(e){
                e.preventDefault();
                console.log('click');
                var judul = $('.inp-repo').val();
                if(judul != undefined && judul != ''){
                    getBeritaList(null,null,judul);
                }
            })

            $('.search').on('keydown','.inp-repo',function(e){
                if(e.which == 13){
                    e.preventDefault();
                    console.log('enter');
                    var judul = $('.inp-repo').val();
                    if(judul != undefined && judul != ''){
                        getBeritaList(null,null,judul);
                    }
                }
            })

            $('#btn-home').on('click',function(e){
                e.preventDefault();
                getBeritaList();
            })
           
        </script>      
        ";
		return "";
	}
	
}
?>
