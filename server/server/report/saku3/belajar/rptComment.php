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
class server_report_saku3_belajar_rptComment extends server_report_basic
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
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/checklist.png";
        
        echo "<div class='row'>
        <div class='col-md-12'>
          <!-- Box Comment -->
          <div class='box box-widget'>
            <div class='box-header with-border'>
              <div class='user-block'>
                <img class='img-circle' src='$pathfoto' alt='User Image'>
                <span class='username'><a href='#'>Jonathan Burke Jr.</a></span>
                <span class='description'>Shared publicly - 7:30 PM Today</span>
              </div>
              <!-- /.user-block -->
              <div class='box-tools'>
                <button type='button' class='btn btn-box-tool' data-toggle='tooltip' title='Mark as read'>
                  <i class='fa fa-circle-o'></i></button>
                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                </button>
                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class='box-body'>
              <img class='img-responsive pad' src='$pathfoto' alt='Photo'>

              <p>I took this photo this morning. What do you guys think?</p>
              <button type='button' class='btn btn-default btn-xs'><i class='fa fa-share'></i> Share</button>
              <button type='button' class='btn btn-default btn-xs'><i class='fa fa-thumbs-o-up'></i> Like</button>
              <span class='pull-right text-muted'>127 likes - 3 comments</span>
            </div>
            <!-- /.box-body -->
            <div class='box-footer box-comments'>
              <div class='box-comment'>
                <!-- User image -->
                <img class='img-circle img-sm' src='$pathfoto' alt='User Image'>

                <div class='comment-text'>
                      <span class='username'>
                        Maria Gonzales
                        <span class='text-muted pull-right'>8:03 PM Today</span>
                      </span><!-- /.username -->
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </div>
                <!-- /.comment-text -->
              </div>
              <!-- /.box-comment -->
              <div class='box-comment'>
                <!-- User image -->
                <img class='img-circle img-sm' src='$pathfoto' alt='User Image'>

                <div class='comment-text'>
                      <span class='username'>
                        Luna Stark
                        <span class='text-muted pull-right'>8:03 PM Today</span>
                      </span><!-- /.username -->
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </div>
                <!-- /.comment-text -->
              </div>
              <!-- /.box-comment -->
            </div>
            <!-- /.box-footer -->
            <div class='box-footer'>
              <form>
                <img class='img-responsive img-circle img-sm' src='$pathfoto' alt='Alt Text'>
                <!-- .img-push is used to add margin to elements next to floating images -->
                <div class='img-push'>
                  <input type='text' class='form-control input-sm' onkeydown='loadData(event)' placeholder='Press enter to post a comment'>
                </div>
              </form>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
        </div>";
        echo "<script>
        function loadData(e){
            if(e.which == 13) {
                 alert('hello');
            }
        }
        </script>";
		return "";
	}
	
}
?>
