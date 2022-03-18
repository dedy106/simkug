<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");

class server_report_kopeg_rptKartuAgg extends server_report_basic
{
	function getTotalPage()
	{		
		return 0;
	}
	function getHtml()
	{
		$sql= "select a.no_dana,gg.nama as nama_bank,a.kode_agg,c.nama,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,".
						  " date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih,a.akun_piutang,a.akun_pjasa,a.nilai,a.lama_bayar ".
						  //", xx.npokok - ifnull(yy.p_angs,0) as spokok, xx.nbunga - ifnull(yy.j_angs,0) as sbunga, xx.npokok + xx.nbunga - ifnull(p_angs,0) - ifnull(j_angs,0) as saldo ".
						  "from kop_pinj_m a ".
						  "	  inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi ".
						  "   inner join kop_dana_m hh on a.no_dana=hh.no_bukti and a.kode_lokasi=hh.kode_lokasi ".
						  "   inner join vendor gg on hh.kode_vendor=gg.kode_vendor and gg.kode_lokasi=hh.kode_lokasi ".
						  
						  "                  inner join kop_pinj_spb ic on ic.no_kontrak=a.no_kontrak and a.kode_lokasi=ic.kode_lokasi ".
						  "                  inner join spb_m id on ic.no_spb=id.no_spb and id.kode_lokasi=ic.kode_lokasi ".
						  "                  inner join kas_d ie on ie.no_bukti=id.no_spb and id.kode_lokasi=ie.kode_lokasi ".
						  "                  inner join kas_m xf on xf.no_kas=ie.no_kas and xf.kode_lokasi=ie.kode_lokasi ";
		
		
	}	
	
}
?>
