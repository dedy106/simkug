<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptTandaTerima extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bukti)
from brg_kirim_m a  $this->filter ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
        
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/aki.jpg";
		
		// $sql="select a.no_pesan,a.kode_lokasi, a.tgl_input,a.periode,a.kode_pp,convert(varchar,a.tanggal,103) as tgl, a.no_dokumen,a.keterangan,'-' as stor_loc 
        // from mb_pesan_m a        
        // $this->filter
        // order by a.no_pesan";

	
		// $start = (($this->page-1) * $this->rows);
		// $rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		// $rs=$dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("tanda terima",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		// while ($row = $rs->FetchNextObject($toupper=false))
		// {
			echo "
            <table width='800' cellspacing='0' cellpadding='0' border='0'>
              <tbody>
              <tr>
                  <td>
                      <table width='100%' border='0'>
                       <tbody>
                          
                          <tr>
                              <td><img src='$pathfoto' width='200' height='120'></td>
                              <td  class='judul_bukti' colspan='3' style='padding-left:100px'><b>TANDA TERIMA</b></td>
                          </tr>
                          <tr>
                              <td rowspan='3' style='font-size: 11px;'>
                              Jl. Maribaya No.105/212<br>
                              Lembang-Bandung 40391<br>
                              www.maribaya-resort.com</td>
                              <td width='250'></td>
                              <td width='200'></td>
                              <td width='150'></td>
                          </tr>
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                               <td></td>
                               <td></td>
                               <td></td>
                          </tr>
                          <tr>
                             <td>&nbsp;</td>
                             <td>&nbsp;</td>
                             <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>Telah diterima dari </td>
                            <td>:</td>
                            <td></td> 
                          </tr>
                          <tr>
                            <td>Ditujukan Kepada </td>
                            <td>:</td>
                            <td></td> 
                          </tr>
                          <tr>
                            <td>Berupa </td>
                            <td>:</td>
                            <td></td> 
                          </tr>
                          <tr>
                              <td height='400'>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                          </tr>
                      </tbody>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td>
                      <table width='100%' cellspacing='0' cellpadding='0' border='0'>
                          <tbody>
                              <tr>
                                  <td>&nbsp;<u>Memo:</u></td>
                              </tr>
                              <tr>
                                  <td>&nbsp;</td>
                              </tr>
                             
                              <tr>
                                  <td>&nbsp;</td>
                              </tr>
                              <tr>
                                  <td colspan='4'>Bandung, </td>
                              </tr>
                              <tr>
                                  <td>&nbsp;</td>
                              </tr>
                              <tr align='center'>
                                  <td width='350'><b>Yang Menyerahkan </b> </td>
                                  <td width='350'><b>Yang Menerima </b></td>
                              </tr>
                              <tr align='center'>
                                  <td width='350' height='80'>&nbsp;</td>
                                  <td width='350' height='80'>&nbsp;</td>
                              </tr> 
                              <tr align='center'>
                                  <td width='350'>(.............................) </td>
                                  <td width='350'>(.............................) </td>
                              </tr>
                              <tr valign='bottom' align='center'>
                                  <td class='garis_bawah' height='70'>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
              </tbody>
            </table>
           ";
		// }
		echo "</div>";
		return "";
	}
	
}
?>
  
