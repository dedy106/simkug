<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptSPMutasi extends server_report_basic
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
        $kode_kelola=$tmp[1];


		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        // while ($row = $rs->FetchNextObject($toupper=false))
		// {
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1400'>
                <style>
                    td{
                        border:1px solid black;
                        padding:2px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN MUTASI SAHAM YAKES TELKOM </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px;text-align:left'>Periode</th>
                        <th style='font-size:14px;text-align:left' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:12px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='10' rowspan='2'>No</td>
                        <td style='text-align:center' width='100' rowspan='2'>Jenis Dana</td>
                        <td style='text-align:center' width='50' rowspan='2'>Kode Mitra</td>
                        <td style='text-align:center' width='300' colspan='3'>Hasil Transaksi </td>
                        <td style='text-align:center' width='200' colspan='2'>Hasil Perolehan</td>
                        <td style='text-align:center' width='200' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' width='200' colspan='2'>Gain (loss) Net</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Transaksi</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Settlement/Bayar</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100' >Jumlah Saham</td>
                        <td style='text-align:center' width='100' >Harga per Saham (Net)</td>
                        <td style='text-align:center' width='100' >Jumlah (Net)</td>
                        <td style='text-align:center' width='100' >Per Saham</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Per Saham</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Dari Harga Perolehan</td>
                        <td style='text-align:center' width='100' >Dari Harga Buku</td>
                    </tr>";
                    $jenis= array('Penjualan','Pembelian');
                    $jumlah1=0;$hjual1=0;$n_jual1=0;$h_oleh1=0;$n_oleh1=0;$h_buku1=0;$nbuku1=0;$gl_oleh1=0;$gl_buku1=0;
    
                    for($i=0;$i<count($jenis);$i++){
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='' colspan='14'>".strtoupper($jenis[$i])." </td>
                        </tr>";

                        $no=1;
                        $sql = "select * from (select 'Penjualan' as jenis, e.nama as nama_plan, c.kode_mitra, a.jumlah, a.n_jual/a.jumlah as hjual, a.n_jual as n_jual,
                        a.h_oleh, a.h_oleh * a.jumlah as n_oleh, a.h_buku, a.h_buku * a.jumlah as nbuku, a.n_jual - (a.h_oleh * a.jumlah) as gl_oleh, a.n_jual - (a.h_buku * a.jumlah) as gl_buku, convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set
                        from inv_spjual_d a 
                        inner join inv_spjual_m b on a.no_spjual=b.no_spjual 
                        inner join inv_mitra c on a.kode_mitra=c.kode_mitra
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $this->filter
                        
                        union all
                        
                        select 'Pembelian' as jenis, e.nama as nama_plan, c.kode_mitra, a.jumlah, a.n_beli/a.jumlah as hbeli, a.n_beli,
                        0 as h_oleh, 0 as n_oleh, 0 as h_buku, 0 as nbuku,0 as gl_oleh, 0 as gl_buku,  convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set
                        from inv_spbeli_d a 
                        inner join inv_spbeli_m b on a.no_spbeli=b.no_spbeli
                        inner join inv_mitra c on a.kode_mitra=c.kode_mitra
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $this->filter
                        ) x
                        where x.jenis = '".$jenis[$i]."'
                        order by x.jenis, x.kode_mitra, x.nama_plan ";
                        $rs1 = $dbLib->execute($sql);
                        $jumlah_jl=0;$hjual_jl=0;$n_jual_jl=0;$h_oleh_jl=0;$n_oleh_jl=0;$h_buku_jl=0;$nbuku_jl=0;$gl_oleh_jl=0;$gl_buku_jl=0;
    
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $jumlah_jl+=$row1->jumlah;
                            $hjual_jl+=$row1->hjual;
                            $n_jual_jl+=$row1->n_jual;  
                            $h_oleh_jl+=$row1->h_oleh;  
                            $n_oleh_jl+=$row1->n_oleh; 
                            $h_buku_jl+=$row1->h_buku; 
                            $nbuku_jl+=$row1->nbuku; 
                            $gl_oleh_jl+=$row1->gl_oleh;
                            $gl_buku_jl+=$row1->gl_buku;
                            
                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row1->nama_plan</td>
                            <td style='border-top: medium none;text-align:left'>$row1->kode_mitra</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->jumlah != 0 ? number_format($row1->jumlah,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->hjual != 0 ? number_format($row1->hjual,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_jual != 0 ? number_format($row1->n_jual,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_oleh != 0 ? number_format($row1->h_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_oleh != 0 ? number_format($row1->n_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_buku != 0 ? number_format($row1->h_buku,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->nbuku != 0 ? number_format($row1->nbuku,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_oleh != 0 ? number_format($row1->gl_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_buku != 0 ? number_format($row1->gl_buku,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_set</td>
                        </tr>";
                        $no++;
    
                        }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='' colspan='3'>TOTAL ".strtoupper($jenis[$i])." </td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah_jl != 0 ? number_format($jumlah_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual_jl != 0 ? number_format($hjual_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual_jl != 0 ? number_format($n_jual_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh_jl != 0 ? number_format($h_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh_jl != 0 ? number_format($n_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku_jl != 0 ? number_format($h_buku_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku_jl != 0 ? number_format($nbuku_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh_jl != 0 ? number_format($gl_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku_jl != 0 ? number_format($gl_buku_jl,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";

                        $jumlah1+=$jumlah_jl;
                        $hjual1+=$hjual_jl;
                        $n_jual1+=$n_jual_jl;  
                        $h_oleh1+=$h_oleh_jl;  
                        $n_oleh1+=$n_oleh_jl; 
                        $h_buku1+=$h_buku_jl; 
                        $nbuku1+=$nbuku_jl; 
                        $gl_oleh1+=$gl_oleh_jl;
                        $gl_buku1+=$gl_buku_jl;
                    }
                    echo"
                        <tr style='font-weight:bold'>
                            <td style='' colspan='3'>GRAND TOTAL </td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah1 != 0 ? number_format($jumlah1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual1 != 0 ? number_format($hjual1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual1 != 0 ? number_format($n_jual1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh1 != 0 ? number_format($h_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh1 != 0 ? number_format($n_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku1 != 0 ? number_format($h_buku1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku1 != 0 ? number_format($nbuku1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh1 != 0 ? number_format($gl_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku1 != 0 ? number_format($gl_buku1,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";

                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        // }
		return "";
		
	}
	
}
?>
