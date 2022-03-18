<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptMonitoring2 extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_lokasi,count(a.no_pb) as semua,sum(a.nilai) as j_semua,
sum(case when a.no_kas='-' then a.nilai else 0 end) as pending,
sum(case when a.no_kas<>'-' then a.nilai else 0 end) as selesai
		from sju_pb_m a $this->filter
		group by a.kode_lokasi";
		
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("monitoring pembayaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "
		<td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
		<tr bgcolor='#CCCCCC'>
		  <td width='8' rowspan='2' align='center' class='header_laporan'>NO.</td>
		  <td width='100' colspan='2' align='center' class='header_laporan'>Pengajuan</td>
		  <td width='80' colspan='1' align='center' class='header_laporan'>Di Selesaikan</td>
		  <td width='100' colspan='1' align='center' class='header_laporan'>Pending </td>
		</tr>
		<tr bgcolor='#CCCCCC'>
		<td width='90'  align='center' class='header_laporan'>Jumlah</td>
		<td width='90'  align='center' class='header_laporan'>Nilai</td>
		<td width='90'  align='center' class='header_laporan'>Nilai</td>
		<td width='90'  align='center' class='header_laporan'>Nilai</td>
	   </tr>";
		$paket=0;$tambahan=0;$bayar_paket=0;$bayar_tambahan=0;$saldo_paket=0;$saldo_tambahan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
			
		echo "<tr >
		<td class='isi_bukti' align='center'>$i</td>
				<td class='isi_bukti'>$row->semua</td>
				<td class='isi_bukti' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->kode_lokasi');\">".number_format($row->j_semua,0,",",".")."</a>";
			echo "</td>
			<td class='isi_bukti' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_lokasi');\">".number_format($row->selesai,0,",",".")."</a>";
			echo "</td>
        <td class='isi_bukti' align='right'>".number_format($row->pending,0,",",".")."</td
     </tr>";
			$i=$i+1;
		}
		echo "";
		echo "</table><br>";

		echo"<tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400' class='isi_bukti'><b>PENDING PEMBAYARAN :</b></td>
      </tr>
      <tr>
        <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>NO</td>
            <td width='450' align='center' class='header_laporan'>USER/UNIT</td>
            <td width='90' align='center' class='header_laporan'>TANGGAL</td>
            <td width='130' align='center' class='header_laporan'>NO PENGAJUAN</td>
            <td width='300' align='center' class='header_laporan'>KEPERLUAN</td>
            <td width='90' align='center' class='header_laporan'>NILAI</td>
            <td width='90' align='center' class='header_laporan'>DUE DATE</td>
            <td width='30' align='center' class='header_laporan'>AGING</td>
          </tr>";
          $sql1="select a.nik_user,b.nama,CONVERT(varchar, a.tanggal, 105) as tanggal,c.nama as nama_pp,a.no_pb,a.keterangan,a.nilai,CONVERT(varchar, a.due_date, 105) as due_date,DATEDIFF (DAY, a.tanggal, getdate()) as aging
          from sju_pb_m a
		  inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
		  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
			$this->filter and a.no_kas = '-' 
			order by a.tanggal ";
	  $rs1 = $dbLib->execute($sql1);
	  $j=1; $t_n1=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$total+=$row1->nilai;

          echo "<tr>
            <td class='isi_bukti' align='center'>$j</td>
            <td class='isi_bukti'>$row1->nama | $row1->nama_pp</td>
           <td class='isi_bukti'>$row1->tanggal</td>
           <td class='isi_bukti'>$row1->no_pb</td>
           <td class='isi_bukti'>$row1->keterangan</td>
             <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
             <td class='isi_bukti'>$row1->due_date</td>
             <td class='isi_bukti'>$row1->aging</td>
  
          </tr>";
			$j+=1;
		}
		echo "<tr>
		<td height='23' colspan='5' valign='top'  class='isi_bukti' align='right'>Total&nbsp;</td>
		<td valign='top'  class='isi_bukti' align='right'>".number_format($total,0,',','.')."</td>
	</tr>
		</table>
		</td>
		</tr>
		</tr>";
		echo "</div>";
		return "";
		
	}
	
}
?>
