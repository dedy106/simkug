<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptMonitoringPiutang extends server_report_basic
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
		$tahun=$tmp[1];
		$filter2=$tmp[2];
		$sql="select 
        a.kode_proyek,a.no_pks as no_kontrak,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103)  as tgl_selesai,'-' as nama_am,c.nama as cust_klp,b.nama as cust,d.nama as cons,convert(varchar,f.tgl_pdpt,103) as tgl_pdpt,a.nama as judul_kegiatan,convert(varchar,a.tgl_keg1,103) as tgl_keg1,convert(varchar,a.tgl_keg2,103) as tgl_keg2,h.umur as umur_piu,convert(varchar,f.tgl_ba,103) as tgl_bast,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total,
        isnull(f.bill,0) as bill,isnull(f.billppn,0) as billppn,isnull(f.bill,0)+isnull(f.billppn,0) as total_bill,isnull(f.no_faktur,'-') as no_pajak, convert(varchar,f.tgl_fp,103) as tgl_pajak,
		convert(varchar,i.tanggal,103) as tgl_kirim,i.posisi,i.status,'-' as tgl_update,
        isnull(g.bayar,0) as bayar,g.tgl_bayar,
        isnull(h.tot_pdpt,0) as pdpt,
        (isnull(f.bill,0)+isnull(f.billppn,0))- isnull(g.bayar,0) as saldo_piu,
        ((isnull(f.bill,0)+isnull(f.billppn,0))- isnull(g.bayar,0)) - h.umur as aging_piu,0 as ccr, a.kode_lokasi,f.tgl_pdpt as tgl_pdpt2
        from pr_proyek a
        inner join cust b on a.kode_cust =b.kode_cust and a.kode_lokasi=b.kode_lokasi
        left join cust_klp c on c.kode_klpcust =b.kode_klpcust and c.kode_lokasi=b.kode_lokasi
        inner join consumer d on a.kode_cons =d.kode_cons and a.kode_lokasi=d.kode_lokasi
        left join (
            select no_kontrak,kode_lokasi,sum(nilai) as bill,sum(nilai_ppn) as billppn,min(no_faktur) as no_faktur,min(tgl_fp) as tgl_fp,min(tgl_ba) as tgl_ba,min(tanggal) as tgl_pdpt
            from bill_m 
            group by no_kontrak,kode_lokasi
        )f on a.kode_proyek=f.no_kontrak and a.kode_lokasi=f.kode_lokasi
        
        left join (
            select b.kode_project,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bayar,min(c.tanggal) as tgl_bayar
            from piutang_bayar a inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
			inner join trans_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi
            group by b.kode_project,a.kode_lokasi
        )g on a.kode_proyek=g.kode_project and a.kode_lokasi=g.kode_lokasi 
        
        left join (
            select kode_project,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_pdpt,max(umur) as umur
            from piutang_d 
            group by kode_project,kode_lokasi
        ) h on a.kode_proyek=h.kode_project and a.kode_lokasi=h.kode_lokasi
		left join (
			select b.tanggal,b.no_bukti,b.kode_lokasi,b.status as posisi,'-' as status,a.kode_project 
			from piutang_d a
			inner join pr_monitor b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi and b.no_ref='-'
		) i on a.kode_proyek=i.kode_project and a.kode_lokasi=i.kode_lokasi
        $this->filter and f.tgl_pdpt is not null
        order by isnull(f.tgl_pdpt,'-')
        ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN MONITORING PIUTANG",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='3150'>
        <tr bgcolor='#CCCCCC'>
            <td rowspan='2'  align='center' class='header_laporan'>No</td>
            <td rowspan='2'  align='center' class='header_laporan'>ID Proyek</td>
            <td rowspan='2'  align='center' class='header_laporan'>No Kontrak</td>
            <td colspan='2' align='center' class='header_laporan'>Tgl Kontrak</td>
            <td rowspan='2'  align='center' class='header_laporan'>Nama AM</td>
            <td rowspan='2'  align='center' class='header_laporan'>Group Customer</td>
            <td rowspan='2'  align='center' class='header_laporan'>Customer</td>
            <td rowspan='2'  align='center' class='header_laporan'>Tanggal Pengakuan Pendapatan
            </td>
            <td rowspan='2'  align='center' class='header_laporan'>Judul Kegiatan
            </td>
            <td colspan='2'  align='center' class='header_laporan'>Tanggal Kegiatan</td>
            <td rowspan='2'  align='center' class='header_laporan'>Umur Piutang</td>
            <td rowspan='2'  align='center' class='header_laporan'>Tanggal BAST</td>
            <td colspan='3'  align='center' class='header_laporan'>Invoice</td>
            <td colspan='2'  align='center' class='header_laporan'>Faktur Pajak</td>
            <td colspan='4'  align='center' class='header_laporan'>Update Invoice</td>
            <td colspan='3'  align='center' class='header_laporan'>Tanggal Pembayaran</td>
            <td rowspan='2'  align='center' class='header_laporan'>Jumlah Pembayaran</td>
            <td rowspan='2'  align='center' class='header_laporan'>Saldo Piutang</td>
            <td rowspan='2'  align='center' class='header_laporan'>Aging Piutang (hari)</td>
            <td rowspan='2'  align='center' class='header_laporan'>CCR</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90' align='center' class='header_laporan'>Mulai</td>
            <td width='90' align='center' class='header_laporan'>Selesai</td>
            <td width='90' align='center' class='header_laporan'>Awal</td>
            <td width='90' align='center' class='header_laporan'>Selesai</td>
            <td width='90' align='center' class='header_laporan'>Nilai</td>
            <td width='90' align='center' class='header_laporan'>PPN</td>
            <td width='90' align='center' class='header_laporan'>Total</td>
            <td width='90' align='center' class='header_laporan'>Nomor</td>
            <td width='90' align='center' class='header_laporan'>Tanggal</td>
            <td width='90' align='center' class='header_laporan'>Tanggal Kirim</td>
            <td width='90' align='center' class='header_laporan'>Posisi</td>
            <td width='90' align='center' class='header_laporan'>Status</td>
            <td width='90' align='center' class='header_laporan'>Tanggal Update</td>
            <td width='90' align='center' class='header_laporan'>Rekening 3588</td>
            <td width='90' align='center' class='header_laporan'>Rekening 5575</td>
            <td width='90' align='center' class='header_laporan'>Rekening 3554</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>A</td>
            <td width='100' align='center' class='header_laporan'>B</td>
            <td width='150' align='center' class='header_laporan'>C</td>
            <td width='90' align='center' class='header_laporan'>D</td>
            <td width='90' align='center' class='header_laporan'>E</td> 
            <td width='200' align='center' class='header_laporan'>F</td>
            <td width='200' align='center' class='header_laporan'>G</td>
            <td width='200' align='center' class='header_laporan'>H</td>
            <td width='90' align='center' class='header_laporan'>I</td>
            <td width='200' align='center' class='header_laporan'>J</td>
            <td width='90' align='center' class='header_laporan'>K</td>
            <td width='90' align='center' class='header_laporan'>L</td>
            <td width='90' align='center' class='header_laporan'>M</td>
            <td width='90' align='center' class='header_laporan'>N</td>
            <td width='90' align='center' class='header_laporan'>O</td>
            <td width='90' align='center' class='header_laporan'>P = O*10% </td>
            <td width='90' align='center' class='header_laporan'>Q</td>
            <td width='90' align='center' class='header_laporan'>R</td>
            <td width='90' align='center' class='header_laporan'>S</td>
            <td width='90' align='center' class='header_laporan'>T</td>
            <td width='90' align='center' class='header_laporan'>U</td>
            <td width='90' align='center' class='header_laporan'>V</td>
            <td width='90' align='center' class='header_laporan'>W</td>
            <td width='90' align='center' class='header_laporan'>X</td>
            <td width='90' align='center' class='header_laporan'>Y</td>
            <td width='90' align='center' class='header_laporan'>Z</td>
            <td width='90' align='center' class='header_laporan'>AA</td>
            <td width='90' align='center' class='header_laporan'>AB = Q - AA</td>
            <td width='90' align='center' class='header_laporan'>AC = AB - M</td>
            <td width='90' align='center' class='header_laporan'>AD = AB / Q</td>
        </tr>
        ";
		// $n1=0;
		// $n2=0;
		// $n3=0;
		// $n4=0;
		// $n5=0;
        // $real=0;
        $ccr=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
	// 		$n1+=$row->n1;
	// 		$n2+=$row->n2;
	// 		$n3+=$row->n3;
	// 		$n4+=$row->n4;
	// 		$n5+=$row->n5;
            // $real =$row->panjar_aktif+$row->beban+$row->bdd+$row->bmhd;
            // $saldo = $row->target - $real;
            // $or_target = ($row->target/ $row->nilai)*100;
            // $or_real = ($real/$row->nilai)*100;
            // $sisa = ($or_target - $or_real)*100;
            // $profit = $row->nilai-$real;
            // $saldo_piu = $row->total - $row->bayar;
            $ccr = ($row->saldo_piu/$row->total_bill)*100;
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_proyek</td>
            <td class='isi_laporan'>$row->no_kontrak</td>
            <td class='isi_laporan'>$row->tgl_mulai</td>
            <td class='isi_laporan'>$row->tgl_selesai</td>
            <td class='isi_laporan'>$row->nama_am</td>
            <td class='isi_laporan'>$row->cust_klp</td>
            <td class='isi_laporan'>$row->cust</td>
            <td class='isi_laporan'>$row->tgl_pdpt</td>
            <td class='isi_laporan'>$row->judul_kegiatan</td>
            <td class='isi_laporan'>$row->tgl_keg1</td>
            <td class='isi_laporan'>$row->tgl_keg2</td>
            <td class='isi_laporan'>$row->umur_piu</td>
            <td class='isi_laporan'>$row->tgl_bast</td>
            <td class='isi_laporan' align='right'>".number_format($row->bill,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->billppn,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->total_bill,0,",",".")."</td>
            <td class='isi_laporan'>$row->no_pajak</td>
            <td class='isi_laporan'>$row->tgl_pajak</td>
            <td class='isi_laporan'>$row->tgl_kirim</td>
            <td class='isi_laporan'>$row->posisi</td>
            <td class='isi_laporan'>$row->status</td>
            <td class='isi_laporan'>$row->tgl_update</td>
            <td class='isi_laporan'></td>
            <td class='isi_laporan'>$row->tgl_bayar</td>
            <td class='isi_laporan'></td>
            <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->saldo_piu,0,",",".")."</td>
            <td class='isi_laporan' align='right'>$row->aging_piu</td>
            <td class='isi_laporan' align='right'>".number_format($ccr,2,",",".")."%</td>";
			$i=$i+1;
		}
	// 	echo "<tr >
    //     <td class='isi_laporan' align='center' colspan='2'>Total</td>
    //     <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
    //     <td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
    //  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>