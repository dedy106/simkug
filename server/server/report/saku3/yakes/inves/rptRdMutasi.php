<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdMutasi extends server_report_basic
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
        $filter2=$tmp[2];

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
       
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1800'>
                <style>
                    td{
                        border:1px solid black;
                        padding:2px;
                        font-size:11px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN MUTASI REKSADANA YAKES TELKOM </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px;text-align:left'>Periode</th>
                        <th style='font-size:14px;text-align:left' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:10px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='10' rowspan='2'>No</td>
                        <td style='text-align:center' width='100' rowspan='2'>Jenis Dana</td>
                        <td style='text-align:center' width='150' rowspan='2'>Nama</td>
                        <td style='text-align:center' width='300' colspan='3'>Hasil Transaksi </td>
                        <td style='text-align:center' width='200' colspan='2'>Hasil Perolehan</td>
                        <td style='text-align:center' width='200' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' width='200' colspan='2'>Gain (loss) Net</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Transaksi</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Settlement/Bayar</td>
                        <td style='text-align:center' width='100' rowspan='2'>Keterangan</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100' >Jumlah Unit</td>
                        <td style='text-align:center' width='100' >Harga per Unit (Net)</td>
                        <td style='text-align:center' width='100' >Jumlah (Net)</td>
                        <td style='text-align:center' width='100' >Per Unit</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Per Unit</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Dari Harga Perolehan</td>
                        <td style='text-align:center' width='100' >Dari Harga Buku</td>
                    </tr>";
                    echo "<tr style='font-weight:bold'>
                        <td style='font-size:12px !important' width='100' colspan='15' >PENJUALAN</td>
                    </tr>";
                    $sql = "select distinct c.kode_rdklp,d.nama 
                    from inv_rdjual_d a
                    inner join inv_rd c on a.kode_rd=c.kode_rd
                    inner join inv_rdklp d on c.kode_rdklp=d.kode_rdklp
                    $this->filter
                    ";

                    // echo $sql;

                    $rs=$dbLib->execute($sql);

                    $jumlah1=0;$hjual1=0;$n_jual1=0;$h_oleh1=0;$n_oleh1=0;$h_buku1=0;$nbuku1=0;$gl_oleh1=0;$gl_buku1=0;

                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                        echo "<tr style='font-weight:bold'>
                        <td style='font-size:12px !important' width='100' colspan='15' >$row->nama</td>
                    </tr>";
                        $no=1;
                        $sql = "select 'Penjualan' as jenis, d.nama as nama_klp,e.nama as nama_plan, c.nama as nama_rd, a.jumlah, a.n_jual/a.jumlah as hjual, a.n_jual,
                        a.h_oleh, a.h_oleh * a.jumlah as n_oleh, a.h_buku, a.h_buku * a.jumlah as nbuku, a.n_jual - (a.h_oleh * a.jumlah) as gl_oleh, a.n_jual - (a.h_buku * a.jumlah) as gl_buku, convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set, b.keterangan
                        from inv_rdjual_d a 
                        inner join inv_rdjual_m b on a.no_rdjual=b.no_rdjual 
                        inner join inv_rd c on a.kode_rd=c.kode_rd
                        inner join inv_rdklp d on c.kode_rdklp=d.kode_rdklp
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $filter2 and c.kode_rdklp = '$row->kode_rdklp' 
                        order by jenis, nama_klp, nama_plan ";

                        
                    // echo $sql;


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
                            <td style='border-top: medium none;text-align:left'>$row1->nama_rd</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->jumlah != 0 ? number_format($row1->jumlah,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->hjual != 0 ? number_format($row1->hjual,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_jual != 0 ? number_format($row1->n_jual,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_oleh != 0 ? number_format($row1->h_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_oleh != 0 ? number_format($row1->n_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_buku != 0 ? number_format($row1->h_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->nbuku != 0 ? number_format($row1->nbuku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_oleh != 0 ? number_format($row1->gl_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_buku != 0 ? number_format($row1->gl_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_set</td>
                            <td style='border-top: medium none;text-align:left'>$row1->keterangan</td>
                        </tr>";
                        $no++;

                        }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-size:12px !important' colspan='3'>TOTAL $row->nama</td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah_jl != 0 ? number_format($jumlah_jl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual_jl != 0 ? number_format($hjual_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual_jl != 0 ? number_format($n_jual_jl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh_jl != 0 ? number_format($h_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh_jl != 0 ? number_format($n_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku_jl != 0 ? number_format($h_buku_jl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku_jl != 0 ? number_format($nbuku_jl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh_jl != 0 ? number_format($gl_oleh_jl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku_jl != 0 ? number_format($gl_buku_jl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
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
                            <td style='font-size:12px !important' colspan='3'>TOTAL PENJUALAN</td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah1 != 0 ? number_format($jumlah1,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual1 != 0 ? number_format($hjual1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual1 != 0 ? number_format($n_jual1,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh1 != 0 ? number_format($h_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh1 != 0 ? number_format($n_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku1 != 0 ? number_format($h_buku1,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku1 != 0 ? number_format($nbuku1,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh1 != 0 ? number_format($gl_oleh1,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku1 != 0 ? number_format($gl_buku1,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                    echo "<tr style='font-weight:bold'>
                        <td style='font-size:12px !important' width='100' colspan='15' >PEMBELIAN</td>
                    </tr>";
                    $sql = "select distinct c.kode_rdklp,d.nama 
                    from inv_rdbeli_d a
                    inner join inv_rd c on a.kode_rd=c.kode_rd
                    inner join inv_rdklp d on c.kode_rdklp=d.kode_rdklp
                    $this->filter
                    ";
                    $rs2=$dbLib->execute($sql);
                    $jumlah2=0;$hjual2=0;$n_jual2=0;$h_oleh2=0;$n_oleh2=0;$h_buku2=0;$nbuku2=0;$gl_oleh2=0;$gl_buku2=0;

                    while ($row2 = $rs2->FetchNextObject($toupper=false))
                    {
                        echo "<tr style='font-weight:bold'>
                        <td style='font-size:12px !important' width='100' colspan='15' >$row2->nama</td>
                    </tr>";
                        $no=1;
                         //BELI
                        $sql =" select 'Pembelian' as jenis, d.nama as nama_klp,e.nama as nama_plan, c.nama as nama_rd, a.jumlah, a.n_beli/a.jumlah as hbeli, a.n_beli,
                        0 as h_oleh, 0 as n_oleh, 0 as h_buku, 0 as nbuku,0 as gl_oleh, 0 as gl_buku,  convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set, b.keterangan
                        from inv_rdbeli_d a 
                        inner join inv_rdbeli_m b on a.no_rdbeli=b.no_rdbeli
                        inner join inv_rd c on a.kode_rd=c.kode_rd
                        inner join inv_rdklp d on c.kode_rdklp=d.kode_rdklp
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $filter2 and c.kode_rdklp = '$row2->kode_rdklp'
                        
                        order by jenis, nama_klp, nama_plan";

                        $rs3 = $dbLib->execute($sql);
                        $jumlah_bl=0;$hjual_bl=0;$n_jual_bl=0;$h_oleh_bl=0;$n_oleh_bl=0;$h_buku_bl=0;$nbuku_bl=0;$gl_oleh_bl=0;$gl_buku_bl=0;

                        while ($row3 = $rs3->FetchNextObject($toupper=false))
                        {
                            $jumlah_bl+=$row3->jumlah;
                            $hjual_bl+=$row3->hjual;
                            $n_jual_bl+=$row3->n_jual;  
                            $h_oleh_bl+=$row3->h_oleh;  
                            $n_oleh_bl+=$row3->n_oleh; 
                            $h_buku_bl+=$row3->h_buku; 
                            $nbuku_bl+=$row3->nbuku; 
                            $gl_oleh_bl+=$row3->gl_oleh;
                            $gl_buku_bl+=$row3->gl_buku;
                            
                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row3->nama_plan</td>
                            <td style='border-top: medium none;text-align:left'>$row3->nama_rd</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->jumlah != 0 ? number_format($row3->jumlah,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->hjual != 0 ? number_format($row3->hjual,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->n_jual != 0 ? number_format($row3->n_jual,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->h_oleh != 0 ? number_format($row3->h_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->n_oleh != 0 ? number_format($row3->n_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->h_buku != 0 ? number_format($row3->h_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->nbuku != 0 ? number_format($row3->nbuku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->gl_oleh != 0 ? number_format($row3->gl_oleh,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row3->gl_buku != 0 ? number_format($row3->gl_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:left'>$row3->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row3->tgl_set</td>
                            <td style='border-top: medium none;text-align:left'>$row3->keterangan</td>
                        </tr>";
                        $no++;

                        }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-size:12px !important' colspan='3'>TOTAL $row->nama</td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah_bl != 0 ? number_format($jumlah_bl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual_bl != 0 ? number_format($hjual_bl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual_bl != 0 ? number_format($n_jual_bl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh_bl != 0 ? number_format($h_oleh_bl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh_bl != 0 ? number_format($n_oleh_bl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku_bl != 0 ? number_format($h_buku_bl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku_bl != 0 ? number_format($nbuku_bl,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh_bl != 0 ? number_format($gl_oleh_bl,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku_bl != 0 ? number_format($gl_buku_bl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";

                        $jumlah2+=$jumlah_bl;
                        $hjual2+=$hjual_bl;
                        $n_jual2+=$n_jual_bl;  
                        $h_oleh2+=$h_oleh_bl;  
                        $n_oleh2+=$n_oleh_bl; 
                        $h_buku2+=$h_buku_bl; 
                        $nbuku2+=$nbuku_bl; 
                        $gl_oleh2+=$gl_oleh_bl;
                        $gl_buku2+=$gl_buku_bl;
                            
                    }
                    echo"
                        <tr style='font-weight:bold'>
                            <td style='font-size:12px !important'  colspan='3'>TOTAL PEMBELIAN</td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah2 != 0 ? number_format($jumlah2,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual2 != 0 ? number_format($hjual2,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual2 != 0 ? number_format($n_jual2,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh2 != 0 ? number_format($h_oleh2,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh2 != 0 ? number_format($n_oleh2,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku2 != 0 ? number_format($h_buku2,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku2 != 0 ? number_format($nbuku2,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh2 != 0 ? number_format($gl_oleh2,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku2 != 0 ? number_format($gl_buku2,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";

                        $jumlah3+=$jumlah1+$jumlah2;
                        $hjual3+=$hjual1+$hjual2;
                        $n_jual3+=$n_jual1+$n_jual2;  
                        $h_oleh3+=$h_oleh1+$h_oleh2;  
                        $n_oleh3+=$n_oleh1+$n_oleh2; 
                        $h_buku3+=$h_buku1+$h_buku2; 
                        $nbuku3+=$nbuku1+$nbuku2; 
                        $gl_oleh3+=$gl_oleh1+$gl_oleh2;
                        $gl_buku3+=$gl_buku1+$gl_buku2;

                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-size:12px !important'  colspan='3'>GRAND TOTAL</td>
                            <td style='border-top: medium none;text-align:right'>".($jumlah3 != 0 ? number_format($jumlah3,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($hjual3 != 0 ? number_format($hjual3,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_jual3 != 0 ? number_format($n_jual3,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_oleh3 != 0 ? number_format($h_oleh3,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($n_oleh3 != 0 ? number_format($n_oleh3,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($h_buku3 != 0 ? number_format($h_buku3,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($nbuku3 != 0 ? number_format($nbuku3,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_oleh3 != 0 ? number_format($gl_oleh3,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($gl_buku3 != 0 ? number_format($gl_buku3,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        
		return "";
		
	}
	
}
?>
