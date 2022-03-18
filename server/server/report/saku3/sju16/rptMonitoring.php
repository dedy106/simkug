<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptMonitoring extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$tahun=substr($tmp[0],0,4);
    $sql="select count(no_pb) as semua,sum(nilai) as j_semua,
    select count(a.no_pb) as semua,sum(nilai) as j_semua,
    sum(case when a.no_kas='-' then a.nilai else 0 end) as pending,
    sum(case when a.no_kas<>'-' then a.nilai else 0 end) as selesai
		from sju_pb_m a $this->filter ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>MONITORING PEMBAYARAN</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='170' height='25'>SUMMARY</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' rowspan='2' align='center' class='isi_bukti'>NO.</td>
        <td width='100' colspan='2' align='center' class='isi_bukti'>Jumlah Pengajuan</td>
        <td width='80' colspan='2' align='center' class='isi_bukti'>Di Selesaikan</td>
        <td width='100' colspan='2' align='center' class='isi_bukti'>Pending </td>
      </tr>
      <tr bgcolor='#CCCCCC'>
      <td width='90'  align='center' class='header_laporan'>Jumlah</td>
      <td width='90'  align='center' class='header_laporan'>Nilai</td>
      <td width='90'  align='center' class='header_laporan'>Jumlah</td>
      <td width='90'  align='center' class='header_laporan'>Nilai</td>
      <td width='90'  align='center' class='header_laporan'>Jumlah</td>
      <td width='90'  align='center' class='header_laporan'>Nilai</td>
     </tr>";
     $sql="select count(no_pb) as semua,sum(nilai) as j_semua
		from sju_pb_m a $this->filter 
union ALL
select count(no_pb) as selesai,sum(nilai) as j_selesai
		from sju_pb_m a
where a.no_kas <> '-'
union ALL
select count(no_pb) as pending,sum(nilai) as j_pending
		from sju_pb_m a
where a.no_kas = '-'
";
	  
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td class='isi_bukti' align='center'>$j</td>
        <td class='isi_bukti'>$row1->semua</td>
        <td class='isi_bukti' align='right'>".number_format($row1->j_semua,0,",",".")."</td>
        <td class='isi_bukti'>$row1->selesai</td>
        <td class='isi_bukti' align='right'>".number_format($row1->j_selesai,0,",",".")."</td>
        <td class='isi_bukti'>$row1->pending</td>
        <td class='isi_bukti' align='right'>".number_format($row1->j_pending,0,",",".")."</td>
      </tr>";
			$j+=1;
		}

      echo "
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400' class='isi_bukti'>PENDING PEMBAYARAN :</td>
      </tr>
      <tr>
        <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='isi_bukti'>NO</td>
            <td width='80' align='center' class='isi_bukti'>USER UNIT</td>
            <td width='200' align='center' class='isi_bukti'>TANGGAL</td>
            <td width='90' align='center' class='isi_bukti'>NO PENGAJUAN</td>
            <td width='80' align='center' class='isi_bukti'>KEPERLUAN</td>
            <td width='200' align='center' class='isi_bukti'>NILAI</td>
            <td width='90' align='center' class='isi_bukti'>DUE DATE</td>
          </tr>";
          $sql="select a.nik_user,a.tanggal,a.no_pb,a.keterangan,a.nilai,a.due_date,DATEDIFF (DAY, a.tanggal, a.due_date) as aging
          from sju_pb_m a
      where a.kode_lokasi='$row->kode_lokasi' and a.no_kas = '-'
            order by a.no_pb ";
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
          echo "<tr>
            <td class='isi_bukti' align='center'>$j</td>
            <td class='isi_bukti'>$row1->nik_user</td>
           <td class='isi_bukti'>$row1->tanggal</td>
           <td class='isi_bukti'>$row1->no_pb</td>
           <td class='isi_bukti'>$row1->keterangan</td>
             <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
             <td class='isi_bukti'>$row1->due_date</td>
             <td class='isi_bukti'>$row1->aging</td>
  
          </tr>";
			$j+=1;
		}

          echo "
        </table>
      </tr>
    </table></td>

  <tr>
    <td>&nbsp;</td>
  </tr>
  <br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
