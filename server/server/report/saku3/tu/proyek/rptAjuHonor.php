<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptAjuHonor extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
        $kode_pp=$tmp[2];
        
        $sql = "select a.nama from pp a where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' ";
        $res = $dbLib->execute($sql);
        $nama_pp = $res->fields[0];
		
		$sql="select a.no_bukti,a.no_agenda,a.kode_pp as prodi,isnull(c.kode_pp,'-') as kode_pp,isnull(c.kode_dosen,'-') as nik,c.nama,b.bruto,b.fee,b.pajak,b.neto
        from it_honorntf_m a
        left join it_honorntf_rek b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
        left join it_dosen c on b.kode_dosen=c.kode_dosen and b.kode_lokasi=c.kode_lokasi 
        $this->filter
        order by a.no_bukti 
        ";

// echo $sql;

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
            $AddOnLib=new server_util_AddOnLib();	
            
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Pendapatan NTF Dosen Pembicara <br> Prodi ".$nama_pp,$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
        <tr bgcolor='#CCCCCC'>
            <td width='10' align='center' class='header_laporan'>No</td>
            <td width='100' align='center' class='header_laporan'>No Bukti</td>
            <td width='60' align='center' class='header_laporan'>Kode PP</td>
            <td width='100' align='center' class='header_laporan'>NIK</td>
            <td width='200' align='center' class='header_laporan'>Nama Dosen</td>
            <td width='90' align='center' class='header_laporan'>Bruto</td>
            <td width='90' align='center' class='header_laporan'>Fee</td>
            <td width='90'  align='center' class='header_laporan'>Pot.Pajak</td>
            <td width='90'  align='center' class='header_laporan'>Netto</td>
        </tr> 
        ";
      
		$bruto=0;  $fee=0; $pajak=0;$neto=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $bruto+=$row->bruto;
            $fee+=$row->fee;
            $pajak+=$row->pajak;
            $neto+=$row->neto;
            

echo "<tr >
      <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>$row->no_bukti</td>
      <td class='isi_laporan'>$row->kode_pp</td>
      <td class='isi_laporan'>$row->nik</td>
      <td class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan' align='right'>".number_format($row->bruto,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->fee,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->pajak,0,",",".")."</td>      
      <td class='isi_laporan' align='right'>".number_format($row->neto,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
echo "<tr >
	   <td class='isi_laporan' align='center' colspan='5'>Total</td>
       <td class='isi_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($fee,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($pajak,0,",",".")."</td>      
       <td class='isi_laporan' align='right'>".number_format($neto,0,",",".")."</td>
      </tr>";
echo "</table><br>";
echo "</div>";
		return "";
		
	}
	
}
?>
