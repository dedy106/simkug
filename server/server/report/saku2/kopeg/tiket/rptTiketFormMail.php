<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_tiket_rptTiketFormMail extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_tiket) 
			from sai_tiket_m a $this->filter ";
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
		$sql="select a.no_tiket,a.kode_lokasi, a.nik_user,b.nama,a.judul, a.form, a.progress,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,CONVERT(varchar, getdate(), 120) as tgl_tiket,b.email
			from sai_tiket_m a 
			inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter
			order by a.no_tiket ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$mail=new server_util_mail();
		$pathfoto ="http://saiprod.simkug.com/image/logo_sai.png";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<div align='center'>"; 
			echo "<table width='600' border='1' cellspacing='0' cellpadding='0' style='border-collapse : collapse; bordercolor : #111111;'>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' rowspan='2' style='padding-left:10px;'><img src=$pathfoto width='60' height='60' /></td>
        <td width='330' rowspan='2' align='center' class='istyle17'>TICKETING</td>
        <td width='150' class='istyle15'>$row->no_tiket</td>
      </tr>
      <tr>
        <td> ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='550' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='103'>Judul</td>
        <td width='487'>: $row->judul </td>
      </tr>
      <tr>
        <td>Form</td>
        <td>: $row->form </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='30' bgcolor='#CCCCCC' style='padding-left:30px;' ><b>DESKRIPSI</b></td>
  </tr>
  <tr>
    <td align='center'><table width='550' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400' height='150'>$row->keterangan</td>
        <td width='150' valign='bottom'><table width='150' border='0' cellspacing='0' cellpadding='0'>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td style='text-decoration:underline;'>$row->nik_user</td>
          </tr>
          <tr>
            <td>$row->nama</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";	 
			echo "</div>";
			$html=ob_get_contents();
			$numSent = $mail->sendMail('admin@mysai.co.id',$row->email,"Tiket No : $row->no_tiket - $row->tgl_tiket", $html,null);
			$i=$i+1;
		}
	
		
		
		return "";
	}
	
}
?>
  
