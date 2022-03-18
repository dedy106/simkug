<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptDetailPiutangNonBymhd extends server_report_basic
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
        a.kode_proyek,a.no_pks as no_kontrak,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103)  as tgl_selesai,a.nama as judul_kegiatan,c.nama as cust_klp,b.nama as cust,d.nama as cons,e.nama as jenis,'-' as metode1,'-' as metode2,convert(varchar,a.tgl_keg1,103) as tgl_keg1,convert(varchar,a.tgl_keg2,103) as tgl_keg2,a.nilai,(a.nilai*0.1) as nilai_ppn,a.nilai+(a.nilai*0.1) as total,
        isnull(f.billppn,0) as billppn,
        isnull(q.nilai_pokok,0) as bayar,
        isnull(h.tot_pdpt,0) as pdpt,
        a.nilai - isnull(h.tot_pdpt,0) as saldo_proyek,
        0 as agingbill,
        0 as agingbayar,
        a.nilai_or as target,
        isnull(i.panjar_aktif,0) as panjar_aktif,
        isnull(j.beban,0)+isnull(k.bebanbdd,0) as beban,
        isnull(l.bdd,0)-isnull(k.bebanbdd,0) as bdd,
        isnull(m.bmhd,0)-isnull(n.bmhd_bayar,0)  as bmhd,a.kode_lokasi,b.divisi,isnull(o.nilai_pph,0) as nilai_pph,
        isnull(p.nilai_ppn,0) as ppn_bayar,
        isnull(q.nilai_pokok,0)+isnull(p.nilai_ppn,0)+isnull(o.nilai_pph,0) as total_bayar,a.metode_penyelenggara as metode1,a.metode_bayar as metode2
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
		
		left join ( select c.kode_project,a.kode_lokasi,sum(a.nilai) as nilai_pph 
			from trans_j a 
			inner join piutang_bayar b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			inner join piutang_d c on c.no_piutang=b.no_piutang and c.kode_lokasi=b.kode_lokasi 
			where a.kode_akun='1165102' 
			group by c.kode_project,a.kode_lokasi) o on a.kode_proyek=o.kode_project and a.kode_lokasi=o.kode_lokasi 
        left join ( select c.kode_project,a.kode_lokasi,sum(a.nilai) as nilai_ppn 
			from trans_j a 
			inner join piutang_bayar b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			inner join piutang_d c on c.no_piutang=b.no_piutang and c.kode_lokasi=b.kode_lokasi 
			where a.kode_akun='2121107' 
			group by c.kode_project,a.kode_lokasi) p on a.kode_proyek=p.kode_project and a.kode_lokasi=p.kode_lokasi 
        left join ( select c.kode_project,a.kode_lokasi,sum(a.nilai) as nilai_pokok 
			from trans_j a 
			inner join piutang_bayar b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
			inner join piutang_d c on c.no_piutang=b.no_piutang and c.kode_lokasi=b.kode_lokasi 
			where a.jenis='KB' and a.kode_akun not in ('1165102','2121107')
			group by c.kode_project,a.kode_lokasi) q on a.kode_proyek=q.kode_project and a.kode_lokasi=q.kode_lokasi 
        
        $this->filter 
        order by a.kode_proyek ";
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
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Pengakuan Pendapatan Yang Diakui</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Saldo Proyek</td>
            <td width='360' colspan='4'  align='center' class='header_laporan'>Pembayaran</td>
            <td width='100' rowspan='3'  align='center' class='header_laporan'>Saldo Piutang</td>
            <td width='630' colspan='6'  align='center' class='header_laporan'>Beban</td>
            <td width='270' colspan='3'  align='center' class='header_laporan'>OR</td>
            <td width='100' rowspan='3' colspan='2'  align='center' class='header_laporan'>Profit</td>
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
            <td width='450' colspan='4' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo Target</td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Target beban dibagi target pendapatan
            </td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Realisasi beban dibagi target pendapatan
            </td>
            <td width='90' rowspan='2' align='center' class='header_laporan'>Realisasi dibandingkan target beban
            </td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='90' align='center' class='header_laporan'>Panjar</td>
            <td width='90' align='center' class='header_laporan'>Beban</td>
            <td width='90' align='center' class='header_laporan'>BDD</td>
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
            <td width='90' align='center' class='header_laporan'>R</td>
            <td width='90' align='center' class='header_laporan'>S</td>
            <td width='90' align='center' class='header_laporan'>T = O-S</td>
            <td width='90' align='center' class='header_laporan'>U</td>
            <td width='90' align='center' class='header_laporan'>V</td>
            <td width='90' align='center' class='header_laporan'>W</td>
            <td width='90' align='center' class='header_laporan'>X = U+V+W</td>
            <td width='90' align='center' class='header_laporan'>Y = R-X</td>
            <td width='90' align='center' class='header_laporan'>Z</td>
            <td width='90' align='center' class='header_laporan'>AA</td>
            <td width='90' align='center' class='header_laporan'>AB</td>
            <td width='90' align='center' class='header_laporan'>AC</td>
            <td width='90' align='center' class='header_laporan'>AE = Z+AA+AB+AC</td>
            <td width='90' align='center' class='header_laporan'>AF = Z-AE</td>
            <td width='90' align='center' class='header_laporan'>AG = Z/O</td>
            <td width='90' align='center' class='header_laporan'>AH = AE/O</td>
            <td width='90' align='center' class='header_laporan'>AI = AE/Z</td>
            <td width='90' align='center' class='header_laporan'>AJ = O-Z</td>
            <td width='90' align='center' class='header_laporan'>AK = O-AE</td>
        </tr>
        ";
		$nilai=0;
		$nilai_ppn=0;
		$nilai_pph=0;
		$ppn_bayar=0;
		$total=0;
		$bill_ppn=0;
		$bayar=0;
        $so_piu=0;
        $pdpt=0;
        $target=0;
        $panjar_aktif=0;
        $beban=0;
        $bdd=0;
        $bmhd=0;
        $nreal=0;
        $nsaldo=0;
        $nprofit=0;
        $nprofit2=0;
        $total_bayar=0;
        $so_proyek=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $real =$row->panjar_aktif+$row->beban+$row->bdd;
            $saldo = $row->target - $real;
            $or_target = ($row->target/ $row->nilai)*100;
            $or_real = ($real/$row->nilai)*100;
            $sisa = ($real/$row->target)*100;
            $profit = $row->nilai-$row->target;
            $profit2 = $row->nilai-$real;
            $saldo_piu = $row->billppn - $row->total_bayar;

			$nilai+=$row->nilai;
			$nilai_ppn+=$row->nilai_ppn;
			$ppn_bayar+=$row->ppn_bayar;
			$total+=$row->total;
			$bill_ppn+=$row->billppn;
			$so_proyek+=$row->saldo_proyek;
			$bayar+=$row->bayar;
			$nilai_pph+=$row->nilai_pph;
			$total_bayar+=$row->total_bayar;
			$so_piu+=$saldo_piu;
			$pdpt+=$row->pdpt;
			$target+=$row->target;
			$panjar_aktif+=$row->panjar_aktif;
			$beban+=$row->beban;
			$bdd+=$row->bdd;
			$bmhd+=$row->bmhd;
			$nreal+=$real;
            $nsaldo+=$saldo;
            $nprofit+=$profit;
            $nprofit2+=$profit2;
            
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_proyek</td>
            <td class='isi_laporan'>$row->no_kontrak</td>
            <td class='isi_laporan'>$row->tgl_mulai</td>
            <td class='isi_laporan'>$row->tgl_selesai</td>
            <td class='isi_laporan'>$row->judul_kegiatan</td>
            <td class='isi_laporan'>$row->cust_klp</td>
            <td class='isi_laporan'>$row->divisi</td>
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
            <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->saldo_proyek,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->ppn_bayar,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBayar('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->total_bayar,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'>".number_format($saldo_piu,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->target,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->panjar_aktif,0,",",".")."</td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->beban,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'>".number_format($row->bdd,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($real,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($or_target,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($or_real,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($sisa,2,",",".")."%</td>
            <td class='isi_laporan' align='right'>".number_format($profit,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($profit2,0,",",".")."</td>";
			$i=$i+1;
		}
		echo "<tr >
        <td class='isi_laporan' align='center' colspan='14'>Total</td>
        <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($bill_ppn,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($so_proyek,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($ppn_bayar,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($total_bayar,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($so_piu,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($target,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($panjar_aktif,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($beban,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($bdd,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nreal,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nsaldo,0,",",".")."</td>
        <td class='isi_laporan' align='right'>&nbsp;</td>
        <td class='isi_laporan' align='right'>&nbsp;</td>
        <td class='isi_laporan' align='right'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($nprofit,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($nprofit2,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>