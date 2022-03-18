<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptDetailPiutang extends server_report_basic
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
        a.kode_proyek,a.no_pks as no_kontrak,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103)  as tgl_selesai,a.nama as judul_kegiatan,c.nama as cust_klp,b.nama as cust,d.nama as cons,e.nama as jenis,'-' as metode1,'-' as metode2,convert(varchar,a.tgl_keg1,103) as tgl_keg1,convert(varchar,a.tgl_keg2,103) as tgl_keg2,a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total,
        isnull(f.billppn,0) as billppn,
        isnull(g.bayar,0) as bayar,
        isnull(h.tot_pdpt,0) as pdpt,
        a.nilai - isnull(h.tot_pdpt,0) as belum_pdpt,
        0 as agingbill,
        0 as agingbayar,
        a.nilai_or as target,
        isnull(i.panjar_aktif,0) as panjar_aktif,
        isnull(j.beban,0)+isnull(k.bebanbdd,0) as beban,
        isnull(l.bdd,0)-isnull(k.bebanbdd,0) as bdd,
        isnull(m.bmhd,0)-isnull(n.bmhd_bayar,0)  as bmhd,a.kode_lokasi
        
        
        from pr_proyek a
        inner join cust b on a.kode_cust =b.kode_cust and a.kode_lokasi=b.kode_lokasi
        left join cust_klp c on c.kode_klpcust =b.kode_klpcust and c.kode_lokasi=b.kode_lokasi
        inner join consumer d on a.kode_cons =d.kode_cons and a.kode_lokasi=d.kode_lokasi
        inner join pr_jenis e on a.kode_jenis=e.kode_jenis and a.kode_lokasi=e.kode_lokasi
        
        left join (
            select no_kontrak,kode_lokasi,sum(nilai+nilai_ppn) as billppn
            from bill_m 
            group by no_kontrak,kode_lokasi
        )f on a.kode_proyek=f.no_kontrak and a.kode_lokasi=f.kode_lokasi
        
        left join (
            select b.kode_project,a.kode_lokasi,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as bayar
            from piutang_bayar a inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
            group by b.kode_project,a.kode_lokasi
        )g on a.kode_proyek=g.kode_project and a.kode_lokasi=g.kode_lokasi 
        
        left join (
            select kode_project,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_pdpt
            from piutang_d 
            group by kode_project,kode_lokasi
        ) h on a.kode_proyek=h.kode_project and a.kode_lokasi=h.kode_lokasi
        
        left join (
            select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as panjar_aktif
            from pr_or_d where jenis='PJ' 
            group by kode_proyek,kode_lokasi
        ) i on a.kode_proyek=i.kode_proyek and a.kode_lokasi=i.kode_lokasi
        left join (
            select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as beban
            from pr_or_d where jenis like '%BEBAN%' 
            group by kode_proyek,kode_lokasi
        ) j on a.kode_proyek=j.kode_proyek and a.kode_lokasi=j.kode_lokasi
        left join (
            select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bebanbdd
            from pr_bdd_dist where jenis like '%BEBAN%' 
            group by kode_proyek,kode_lokasi
        ) k on a.kode_proyek=k.kode_proyek and a.kode_lokasi=k.kode_lokasi
        
        left join (
            select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as BDD
            from pr_or_d where jenis like '%BDD%' 
            group by kode_proyek,kode_lokasi
        ) l on a.kode_proyek=l.kode_proyek and a.kode_lokasi=l.kode_lokasi
        
        left join (
            select no_dokumen,kode_lokasi,sum(nilai) as bmhd
            from hutang_d 
            group by no_dokumen,kode_lokasi
        ) m on a.kode_proyek=m.no_dokumen and a.kode_lokasi=m.kode_lokasi
        
        left join (
            select b.no_dokumen,a.kode_lokasi,sum(case dc when 'D' then a.nilai else -a.nilai end) as bmhd_bayar 
            from hutbayar_d a inner join hutang_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi
            group by b.no_dokumen,a.kode_lokasi
        ) n on a.kode_proyek=n.no_dokumen and a.kode_lokasi=n.kode_lokasi
        
        $this->filter ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN DETAIL PROJECT",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='3400'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' rowspan='3'  align='center' class='header_laporan'>No</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>ID Proyek</td>
            <td width='150' rowspan='3'  align='center' class='header_laporan'>No Kontrak</td>
            <td width='180' colspan='2' align='center' class='header_laporan'>Tgl Kontrak</td>
            <td width='200' rowspan='3'  align='center' class='header_laporan'>Judul Kegiatan</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Customer Group</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Customer</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Consumer</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Jenis Pendapatan</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Metode Penyelenggaraan</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Metode Pembayaran</td>
            <td width='180' colspan='2'  align='center' class='header_laporan'>Tanggal Kegiatan</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Nilai Proyek</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Nilai PPN</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Total Nilai Proyek</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Nilai Invoice</td>
            <td width='360' colspan='4'  align='center' class='header_laporan'>Pembayaran</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Saldo Piutang</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Pengakuan Pendapatan Yang Diakui</td>
            <td width='630' colspan='7'  align='center' class='header_laporan'>Beban</td>
            <td width='270' colspan='3'  align='center' class='header_laporan'>OR</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Profit</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
        
            <td width='90' rowspan='2' align='center' class='header_laporan'>Mulai</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Akhir</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Awal</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Akhir</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Nilai Pokok</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>PPN</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>PPh 23</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Total Nilai</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Target</td>
            <td width='450' colspan='5' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo Target</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Target</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Sisa</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90' align='center' class='header_laporan'>Panjar</td>
            <td width='90' align='center' class='header_laporan'>Beban</td>
            <td width='90' align='center' class='header_laporan'>BDD</td>
            <td width='90' align='center' class='header_laporan'>BYMHD</td>
            <td width='90' align='center' class='header_laporan'>TOTAL REALISASI</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90' align='center' class='header_laporan'>A</td>
            <td width='90' align='center' class='header_laporan'>B</td>
            <td width='90' align='center' class='header_laporan'>C</td>
            <td width='90' align='center' class='header_laporan'>D</td>
            <td width='90' align='center' class='header_laporan'>E</td> 
            <td width='90' align='center' class='header_laporan'>F</td>
            <td width='90' align='center' class='header_laporan'>G</td>
            <td width='90' align='center' class='header_laporan'>H</td>
            <td width='90' align='center' class='header_laporan'>I</td>
            <td width='90' align='center' class='header_laporan'>J</td>
            <td width='90' align='center' class='header_laporan'>K</td>
            <td width='90' align='center' class='header_laporan'>L</td>
            <td width='90' align='center' class='header_laporan'>M</td>
            <td width='90' align='center' class='header_laporan'>N</td>
            <td width='90' align='center' class='header_laporan'>O</td>
            <td width='90' align='center' class='header_laporan'>P = O*10% </td>
            <td width='90' align='center' class='header_laporan'>Q = O+P</td>
            <td width='90' align='center' class='header_laporan'>T</td>
            <td width='90' align='center' class='header_laporan'>AA</td>
            <td width='90' align='center' class='header_laporan'>AB = AA * 10%</td>
            <td width='90' align='center' class='header_laporan'>AC = AA * 2%</td>
            <td width='90' align='center' class='header_laporan'>AD = AA12+AA13+AA14+AA15</td>
            <td width='90' align='center' class='header_laporan'>AE = Q - AD</td>
            <td width='90' align='center' class='header_laporan'>AG</td>
            <td width='90' align='center' class='header_laporan'>AL</td>
            <td width='90' align='center' class='header_laporan'>AM</td>
            <td width='90' align='center' class='header_laporan'>AN</td>
            <td width='90' align='center' class='header_laporan'>AO</td>
            <td width='90' align='center' class='header_laporan'>AP</td>
            <td width='90' align='center' class='header_laporan'>AQ = AM+AN+AO+AP</td>
            <td width='90' align='center' class='header_laporan'>AR = AL-AQ</td>
            <td width='90' align='center' class='header_laporan'>AS = AL/O</td>
            <td width='90' align='center' class='header_laporan'>AT = AQ/O</td>
            <td width='90' align='center' class='header_laporan'>AU = AS-AT</td>
            <td width='90' align='center' class='header_laporan'>AV = O-AQ</td>
        </tr>
        ";
		$n1=0;
		$n2=0;
		$n3=0;
		$n4=0;
		$n5=0;
        $real=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
	// 		$n1+=$row->n1;
	// 		$n2+=$row->n2;
	// 		$n3+=$row->n3;
	// 		$n4+=$row->n4;
	// 		$n5+=$row->n5;
            $real =$row->panjar_aktif+$row->beban+$row->bdd+$row->bmhd;
            $saldo = $row->target - $real;
            $or_target = ($row->target/ $row->nilai)*100;
            $or_real = ($real/$row->nilai)*100;
            $sisa = ($or_target - $or_real)*100;
            $profit = $row->nilai-$real;
            $saldo_piu = $row->total - $row->bayar;
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_proyek</td>
            <td class='isi_laporan'>$row->no_kontrak</td>
            <td class='isi_laporan'>$row->tgl_mulai</td>
            <td class='isi_laporan'>$row->tgl_selesai</td>
            <td class='isi_laporan'>$row->judul_kegiatan</td>
            <td class='isi_laporan'>$row->cust_klp</td>
            <td class='isi_laporan'>$row->cust</td>
            <td class='isi_laporan'>$row->cons</td>
            <td class='isi_laporan'>$row->jenis</td>
            <td class='isi_laporan'>$row->metode1</td>
            <td class='isi_laporan'>$row->metode2</td>
            <td class='isi_laporan'>$row->tgl_keg1</td>
            <td class='isi_laporan'>$row->tgl_keg2</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->billppn,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
            <td class='isi_laporan'>0</td>
            <td class='isi_laporan'>0</td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->bayar,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'>".number_format($saldo_piu,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->target,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->panjar_aktif,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->beban,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->bdd,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->bmhd,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($real,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($or_target,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($or_real,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($sisa,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($profit,0,",",".")."</td>";
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