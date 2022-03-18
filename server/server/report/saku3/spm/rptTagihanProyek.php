<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptTagihanProyek extends server_report_basic
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
		$jenis=$tmp[2];
		$nama_file="invoice.xls";

       $sql="select a.kode_lokasi,a.no_piutang,'proyek' as kode,a.kode_pp,a.no_piutang,a.akun_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl, a.keterangan, a.kode_cust,a.kode_pp,a.periode,a.nilai,a.nilai_ppn,a.no_fpajak,b.nama as nama_cust,c.nama as nama_pp,a.nilai_ppn+a.nilai as total 
            from spm_piutang_m a
            inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
			$this->filter and a.modul <> 'rev'
			union all
			select  a.kode_lokasi,a.no_piutang,'umum' as kode,a.kode_pp,a.no_piutang,a.akun_piutang,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.kode_cust,a.kode_pp,a.periode,a.nilai,a.nilai_ppn,'-' as no_fpajak,b.nama as nama_cust,c.nama as nama_pp, a.nilai_ppn+a.nilai as total 
			from piutang_m a
			inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
			$this->filter
            order by a.no_piutang ";
            // echo $sql;

		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data invoice",$this->lokasi,"TAHUN ".$periode);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='60' align='center' class='header_laporan'>Periode</td>
			<td width='60' align='center' class='header_laporan'>Modul</td>
			<td width='60' align='center' class='header_laporan'>Lok PP</td>
			<td width='80' align='center' class='header_laporan'>Akun Piutang</td>
			<td width='80' align='center' class='header_laporan'>Akun PDPT</td>
			<td width='80' align='center' class='header_laporan'>Akun PPH</td>
			<td width='100' align='center' class='header_laporan'>No Piutang</td>
            <td width='100' align='center' class='header_laporan'>No Invoice</td>
            <td width='100' align='center' class='header_laporan'>Nomor Faktur</td>
            <td width='120'  align='center' class='header_laporan'>Nama Lawan Transaksi</td>
            <td width='150' align='center' class='header_laporan'>Uraian Pekerjaan</td>
            <td width='60' align='center' class='header_laporan'>Tanggal Penerbitan</td>
            <td width='60' align='center' class='header_laporan'>Jumlah Tagihan</td>
            <td width='60' align='center' class='header_laporan'>DPP</td>
            <td width='60' align='center' class='header_laporan'>PPN</td>
        </tr>";
		$nilai=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
           
			$nilai=$nilai+$row->nilai;
            $nilai_ppn=$nilai_ppn+$row->nilai_ppn;
            $total=$total+$row->total;			
			
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->periode</td>
			<td class='isi_laporan'>$row->kode</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->akun_piutang</td>";
			$sql1="select distinct kode_akun as akun_pdpt from spm_piutang_j where jenis in ('PDPT') and no_piutang='$row->no_piutang'
			union all
			select distinct kode_akun as akun_pdpt from piutang_j where jenis in ('PDPT') and no_piutang='$row->no_piutang'
			 ";
			 $rs1=$dbLib->execute($sql1);
			 $row1 = $rs1->FetchNextObject($toupper=false);
		echo"<td class='isi_laporan'>$row1->akun_pdpt</td>";
			$sql2="select distinct kode_akun as akun_pph from spm_piutang_j where jenis in ('PPHM') and no_piutang='$row->no_piutang'
			union all
			select distinct kode_akun as akun_pph from piutang_j where jenis in ('PPHM') and no_piutang='$row->no_piutang'
			";
			$rs2=$dbLib->execute($sql2);
			$row2 = $rs2->FetchNextObject($toupper=false);
		echo"<td class='isi_laporan'>$row2->akun_pph</td>";
			echo"
			 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi','$row->kode');\">$row->no_piutang</a>";
		echo "</td></td>
            <td class='isi_laporan'>$row->no_dokumen</td>
            <td class='isi_laporan'>$row->no_fpajak</td>
            <td class='isi_laporan'>$row->nama_cust</td>
            <td class='isi_laporan'>$row->keterangan</td> 
            <td class='isi_laporan'>$row->tgl</td>            
            <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>           
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
            </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='13'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
