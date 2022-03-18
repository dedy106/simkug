window.app_saku3_transaksi_investasi_invest2_fDepoPlan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fDepoPlan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fDepoPlan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rencana Penempatan Deposito", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Penempatan","List Penempatan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[300,80,100]],
					readOnly:true,
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Penempatan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});										
		this.bTampil = new button(this.pc2.childPage[0],{bound:[500,17,80,18],caption:"Data Deposito",click:[this,"doLoad"]});			
		this.bHit = new button(this.pc2.childPage[0],{bound:[620,17,80,18],caption:"Rekap",click:[this,"doHitKomposisi"]});			
	
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,10,990,348], childPage:["Penawaran Rate","Detail Plan","Komposisi","Rekap Data","Otorisasi"]});					
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,320],colCount:10,tag:9,		            
					colTitle:["Bank","Nama Bank","Rate DOC","Rate Berjangka","Maks Tempat","DOC Ext","Berjangka Ext","Total","Sisa","Keterangan"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[200,100,100,100,100,100,200,200,200,60]],
					colHide:[[0],[true]],
					colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],					
					checkItem: true,					
					nilaiChange:[this,"doNilaiChange"],					
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,150],colCount:19,tag:9,		            					
					colTitle:["Dana","Cabang","Nama Bank","Jth Tempo","Tanggal","Rate DOC","Rate Depo","Rate LPS","Dicairkan","Perpanjang","Usulan",
					          "Tgl Mulai","Tgl Selesai","Durasi Bln","Durasi Hari","Rate","Keterangan","Bank","No Depo"],					
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,60,80,80,80,80,80,80, 80,80,80,100,100,100,80,100,200,80,80]],
					colFormat:[[3,5,6,7,8,9,10, 13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,10,13,14,16,17,18],[5,6,7,8,9, 11,12,15]],										
					picklist:[[16],[new portalui_arrayMap({items:["DOC","DEPOSITO"]})]],					
					buttonStyle:[[11,12,16],[bsDate,bsDate,bsAuto]],					
					checkItem: true,					
					nilaiChange:[this,"doNilaiChange4"],change:[this,"doChangeCell4"],dblClick:[this,"doDoubleClick4"],					
					autoAppend:false,defaultRow:1});		
		
		this.sg5 = new saiGrid(this.pc1.childPage[1],{bound:[1,160,this.pc1.width-5,160],colCount:14,tag:9,		            					
					colTitle:["Dana","Cabang","Nama Bank","Rate DOC","Rate Depo","Rate LPS","Usulan",
					          "Tgl Mulai","Tgl Selesai","Durasi Bln","Durasi Hari","Rate","Keterangan","Bank"],					
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,80,80,80,80, 80,100,100,100,200,80,80]],
					colFormat:[[3,4,5,6,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,9,10,12,13],[3,4,5,6,7,8,11]],										
					picklist:[[0,12],[new portalui_arrayMap({items:["DAKES","DAKEM"]}),new portalui_arrayMap({items:["DOC","DEPOSITO"]})]],										
					buttonStyle:[[0,1,7,8,12],[bsAuto,bsEllips,bsDate,bsDate,bsAuto]],										
					checkItem: true,					
					nilaiChange:[this,"doNilaiChange5"],change:[this,"doChangeCell5"],	
					ellipsClick:[this,"doEllipsClick5"],									
					autoAppend:true,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg5});		
			
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,320],colCount:14,tag:9,		            
					colTitle:["Bank","Keterangan","DOC Ext","Berjangka Ext","Total","Komposisi","DOC JT","Depo JT","DOC Cair","DEPO Cair","DOC Pjng","Depo Pjng","DOC Baru","Depo Baru"],					
					colWidth:[[13,12,11,10,9,8, 7,6,5,4,3,2,1,0],[100,100,100,100,100,100, 100,100,100,100,100,100,100,60]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13],[]],					
					checkItem: true,					
					nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],					
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		
		this.e_total = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,220,20],caption:"Tot Deposito", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		this.e_bdoc = new saiLabelEdit(this.pc1.childPage[3],{bound:[520,11,220,20],caption:"DOC Penm. Baru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		
		this.e_cdoc = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"DOC Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		this.e_bdepo = new saiLabelEdit(this.pc1.childPage[3],{bound:[520,12,220,20],caption:"Depo Penm. Baru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		
		this.e_cdepo = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,220,20],caption:"Depo Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		
		this.e_pdoc = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"DOC Panjang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		this.e_pdepo = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"Depo Panjang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});											
		
		this.sg6 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,190],colCount:1,tag:9,		            
					colTitle:["Catatan"],					
					colWidth:[[0],[950]],				
					autoAppend:true,defaultRow:1});		
		this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg6});		
		
		
		this.cb_ttd1 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"NIK Mengusulkan",tag:2,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab1 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		this.cb_ttd2 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"Mengatahui 1 ",tag:2,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});												
		this.cb_ttd3 = new portalui_saiCBBL(this.pc1.childPage[4],{bound:[20,15,220,20],caption:"Mengetahui 2",tag:2,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab3 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		
		
		this.rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
						
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_ttd1.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			//this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd2.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ttd3.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fDepoPlan.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fDepoPlan.implement({		
	doLoad:	function() {				
		try {					
			var strSQL = "select a.kode_bankklp,a.inisial as nama,'-' as p_doc,'-' as p_depo, "+ //isnull(b.p_doc,0) as p_doc,isnull(p_depo,0) as p_depo,
				"case a.jenis when 'BUMN' then 999999999999 else d.maxtempat end as maxtempat,"+
				"ISNULL(g.doc,0) as doc,"+
				"ISNULL(h.depo,0) as depo,"+
				"ISNULL(g.doc,0) + ISNULL(h.depo,0) as total,"+

				"case a.jenis when 'BUMN' then 999999999999 else d.maxtempat-(ISNULL(g.doc,0) + ISNULL(h.depo,0)) end as sisa, "+
				
				"ISNULL(i.doc_jtempo,0) as doc_jtempo,"+
				"ISNULL(j.depo_jtempo,0) as depo_jtempo "+
				

				"from inv_bankklp a "+
				"inner join inv_banknilai_d d on a.kode_bankklp = d.kode_bankklp "+
				"inner join inv_banknilai_m e on d.no_bukti = e.no_bukti and e.no_flag='-' "+
				"left join inv_suspen f on a.kode_bankklp=f.kode_bankklp and f.status='SUSPEND' and '"+this.dp_d1.getDateString()+"' between f.tgl_awal and f.tgl_akhir "+
				
				
				/*
				"left join "+
				"("+
				"	select kode_bankklp,persen1 as p_doc "+
				"	from (select kode_bankklp,persen1, "+
				"				 row_number() over(partition by kode_bankklp,persen1 order by tanggal desc) as rn "+
				"		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank "+
				"		  where x.jenis = 'DOC' and x.tanggal<='"+this.dp_d1.getDateString()+"') as T "+
				"	where rn = 1  "+
				") b on a.kode_bankklp=b.kode_bankklp "+
				
				"left join "+
				"("+
				"	select kode_bankklp,persen1 as p_depo "+
				"	from (select kode_bankklp,persen1,"+
				"				 row_number() over(partition by kode_bankklp,persen1 order by tanggal desc) as rn "+
				"		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank "+
				"		  where x.jenis = 'DEPOSITO' and x.tanggal<='"+this.dp_d1.getDateString()+"') as T "+
				"	where rn = 1  "+
				") c on a.kode_bankklp=c.kode_bankklp "+
				*/
				
				
				//yg aktif
				"left join ("+
				"	select c.kode_bankklp,SUM(a.nilai) as doc "+
				"	from inv_depo2_m a "+
				"	inner join inv_bank c on a.bdepo=c.kode_bank  "+
				"	left join inv_depotutup_m b on a.no_depo=b.no_depo and b.tanggal<='"+this.dp_d1.getDateString()+"' "+
				"	where b.no_depo is null and a.jenis='DOC' and a.kode_kelola ='YKT' and a.tgl_mulai<= '"+this.dp_d1.getDateString()+"' "+
				"	group by c.kode_bankklp "+
				") g on a.kode_bankklp=g.kode_bankklp "+
				
				"left join ("+
				"	select c.kode_bankklp,SUM(a.nilai) as depo "+
				"	from inv_depo2_m a "+
				"	inner join inv_bank c on a.bdepo=c.kode_bank  "+
				"	left join inv_depotutup_m b on a.no_depo=b.no_depo and b.tanggal<='"+this.dp_d1.getDateString()+"' "+
				"	where b.no_depo is null and a.jenis='DEPOSITO' and a.kode_kelola ='YKT' and a.tgl_mulai<= '"+this.dp_d1.getDateString()+"' "+
				"	group by c.kode_bankklp "+
				") h on a.kode_bankklp=h.kode_bankklp "+
				
				//jatuh tempo
				"left join ("+
				"	select c.kode_bankklp,SUM(a.nilai) as doc_jtempo "+
				"	from inv_depo2_m a "+
				"	inner join inv_bank c on a.bdepo=c.kode_bank  "+
				"	left join inv_depotutup_m b on a.no_depo=b.no_depo and b.tanggal<='"+this.dp_d1.getDateString()+"' "+
				"	where b.no_depo is null and a.jenis='DOC' and a.tgl_selesai <= '"+this.dp_d1.getDateString()+"' and a.kode_kelola ='YKT' "+
				"	group by c.kode_bankklp "+
				") i on a.kode_bankklp=i.kode_bankklp "+
				
				"left join ("+
				"	select c.kode_bankklp,SUM(a.nilai) as depo_jtempo "+
				"	from inv_depo2_m a "+
				"	inner join inv_bank c on a.bdepo=c.kode_bank  "+
				"	left join inv_depotutup_m b on a.no_depo=b.no_depo and b.tanggal<='"+this.dp_d1.getDateString()+"' "+
				"	where b.no_depo is null and a.jenis='DEPOSITO' and a.tgl_selesai <= '"+this.dp_d1.getDateString()+"' and a.kode_kelola ='YKT' "+
				"	group by c.kode_bankklp "+
				") j on a.kode_bankklp=j.kode_bankklp "+

				"where   f.no_suspen is null "+
				"order by a.nu,d.equity desc ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				var total = 0 
				this.sg.clear();
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.sg.appendData([line.kode_bankklp,line.nama,line.p_doc,line.p_depo,floatToNilai(line.maxtempat),floatToNilai(line.doc),floatToNilai(line.depo),floatToNilai(line.total),floatToNilai(line.sisa),"-"]);
					this.sg2.appendData([line.kode_bankklp,line.nama,floatToNilai(line.doc),floatToNilai(line.depo),floatToNilai(line.total),"0",floatToNilai(line.doc_jtempo),floatToNilai(line.depo_jtempo),
					                     "0","0",	"0","0",	"0","0"]);
					total += parseFloat(line.total);
					
					
					
				}
			} else this.sg.clear(1);
			
			
			for (var j=0;j < this.sg.getRowCount();j++) {
				if (this.sg.rowValid(j)){				
					var p_doc = p_depo = p_ket = "";
					var strSQL = "select a.keterangan,a.jenis,convert(varchar,a.persen1)+'% ('+CONVERT(varchar,a.jk1)+'-'+CONVERT(varchar,a.jk2)+' '+a.sat+')' as rate "+
								 "from inv_bank_rate a inner join inv_bank b on a.kode_bank=b.kode_bank and b.flag_bdepo='1' and b.kode_kelola='YKT' "+
								 "where  b.kode_bankklp = '"+this.sg.cells(0,j)+"' and a.tanggal = '"+this.dp_d1.getDateString()+"' ";								
					
					var data2 = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2;						
						for (var i in data2.rs.rows){
							line2 = data2.rs.rows[i];	
							if (line2.jenis == "DOC") p_doc += ";"+line2.rate+"";
							if (line2.jenis == "DEPOSITO") p_depo += ";"+line2.rate+"";
							p_ket += ";"+line2.keterangan+"";
						}
					}
						
					p_doc = p_doc.substr(1);
					p_depo = p_depo.substr(1);
					p_ket = p_ket.substr(1);
					
					if (p_doc == "") p_doc = "-";
					if (p_depo == "") p_depo = "-";	
					if (p_ket == "") p_ket = "-";	
					
					this.sg.cells(2,j,p_doc);
					this.sg.cells(3,j,p_depo);
					this.sg.cells(9,j,p_ket);
				}
			}
			
			
			var komposisi = 0 ;
			for (var i=0;i < this.sg2.getRowCount();i++) {
				if (this.sg2.rowValid(i)){				
					if (this.sg2.cells(4, i) != "0") {
						komposisi = nilaiToFloat(this.sg2.cells(4, i)) / total; 
						komposisi = Math.round(komposisi * 10000) / 100;
						this.sg2.cells(5, i, komposisi);
					}
				}
			}
					
			var strSQL = "select a.no_depo,b.kode_bankklp,a.status_dana,b.kode_bank,b.nama,a.nilai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,isnull(c.p_doc,0) as rate_doc,isnull(d.p_depo,0) as rate_depo,'7.5' as lps,0 as cair,0 as panjang,0 as usul, "+
						 "convert(varchar,a.tgl_selesai ,103)as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_akhir,1 as dur_bulan,1 as dur_hari,0 as rate_usul,a.jenis "+
						 
						 "from inv_depo2_m a "+
						 "inner join inv_bank b on a.bdepo= b.kode_bank "+
						 
						 "left join "+
						 "("+
						 "	select top 1 kode_bank,persen1 as p_doc "+
						 "	from (select x.kode_bank,x.persen1, "+
						 "				 row_number() over(partition by x.kode_bank,x.persen1 order by x.tanggal desc) as rn "+
						 "		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank "+
						 "		  where x.jenis = 'DOC' and x.tanggal='"+this.dp_d1.getDateString()+"') as T "+
						 "	where rn = 1  "+
						 ") c on a.bdepo=c.kode_bank "+
				
						 "left join "+
						 "("+
						 "	select top 1 kode_bank,persen1 as p_depo "+
						 "	from (select x.kode_bank,x.persen1,"+
						 "				 row_number() over(partition by x.kode_bank,x.persen1 order by x.tanggal desc) as rn "+
						 "		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank "+
						 "		  where x.jenis = 'DEPOSITO' and x.tanggal='"+this.dp_d1.getDateString()+"') as T "+
						 "	where rn = 1  "+
						 ") d on a.bdepo=d.kode_bank "+
						 
						 "where a.progress = '1' and a.tgl_selesai = '"+this.dp_d1.getDateString()+"' and a.kode_kelola ='YKT' ";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;	
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.sg4.appendData([line.status_dana,line.kode_bank,line.nama,floatToNilai(line.nilai),line.tgl_selesai,floatToNilai(line.rate_doc),floatToNilai(line.rate_depo),floatToNilai(line.lps),floatToNilai(line.cair),floatToNilai(line.panjang),floatToNilai(line.usul),line.tgl_mulai,line.tgl_akhir,line.dur_bulan,line.dur_hari,line.rate_usul,line.jenis,line.kode_bankklp,line.no_depo]);
				}
			} else this.sg4.clear(1);
			
																
		}
		catch(e) {
			alert(e);
		}
	},
	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_depoplan_m where no_plan='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depoplan_rekap where no_plan='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depoplan_d where no_plan='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depoplan_komposisi where no_plan='"+this.e_nb.getText()+"'");
						sql.add("delete from inv_depoplan_catat where no_plan='"+this.e_nb.getText()+"'");
					}																		
					
					sql.add("insert into inv_depoplan_m (no_plan,kode_lokasi,periode,nik_user,tgl_input,tanggal,keterangan,nik_usul,jab_usul,nik_tahu1,jab_tahu1,nik_tahu2,jab_tahu2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_ttd1.getText()+"','"+this.e_jab1.getText()+"','"+this.cb_ttd2.getText()+"','"+this.e_jab2.getText()+"','"+this.cb_ttd3.getText()+"','"+this.e_jab3.getText()+"')");
					
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)){				
							sql.add("insert into inv_depoplan_rekap(nu,no_plan,kode_lokasi,kode_bankklp,p_doc,p_depo,maks,nilai_doc,nilai_depo,keterangan) values "+
									"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(9,i)+"')");
						}
					}
					for (var i=0;i < this.sg4.getRowCount();i++) {
						if (this.sg4.rowValid(i)){				
							var tgl_jt = this.sg4.cells(4,i).substr(6,4)+"-"+this.sg4.cells(4,i).substr(3,2)+"-"+this.sg4.cells(4,i).substr(0,2);
							var tgl_mulai = this.sg4.cells(11,i).substr(6,4)+"-"+this.sg4.cells(11,i).substr(3,2)+"-"+this.sg4.cells(11,i).substr(0,2);
							var tgl_selesai = this.sg4.cells(12,i).substr(6,4)+"-"+this.sg4.cells(12,i).substr(3,2)+"-"+this.sg4.cells(12,i).substr(0,2);							
							sql.add("insert into inv_depoplan_d(no_plan,kode_lokasi,status_input,status_dana,kode_bank,kode_bankklp,nilai_jt,tanggal,p_doc,p_depo,p_lps,nilai_cair,nilai_panjang,nilai_usul,tgl_mulai,tgl_selesai,dur_bulan,dur_hari,rate,jenis,no_depo,modul,no_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','JTEMPO','"+this.sg4.cells(0,i)+"','"+this.sg4.cells(1,i)+"','"+this.sg4.cells(17,i)+"',"+nilaiToFloat(this.sg4.cells(3,i))+",'"+tgl_jt+"',"+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(6,i))+","+nilaiToFloat(this.sg4.cells(7,i))+","+nilaiToFloat(this.sg4.cells(8,i))+","+nilaiToFloat(this.sg4.cells(9,i))+","+nilaiToFloat(this.sg4.cells(10,i))+",'"+tgl_mulai+"','"+tgl_selesai+"',"+nilaiToFloat(this.sg4.cells(13,i))+","+nilaiToFloat(this.sg4.cells(14,i))+","+nilaiToFloat(this.sg4.cells(15,i))+",'"+this.sg4.cells(16,i)+"','"+this.sg4.cells(18,i)+"','-','-')");
						}
					}
					
					for (var i=0;i < this.sg5.getRowCount();i++) {
						if (this.sg5.rowValid(i)){				
							var tgl_mulai = this.sg5.cells(11,i).substr(6,4)+"-"+this.sg5.cells(11,i).substr(3,2)+"-"+this.sg5.cells(11,i).substr(0,2);
							var tgl_selesai = this.sg5.cells(12,i).substr(6,4)+"-"+this.sg5.cells(12,i).substr(3,2)+"-"+this.sg5.cells(12,i).substr(0,2);							
							
							sql.add("insert into inv_depoplan_d(no_plan,kode_lokasi,status_input,status_dana,kode_bank,kode_bankklp,nilai_jt,tanggal,p_doc,p_depo,p_lps,nilai_cair,nilai_panjang,nilai_usul,tgl_mulai,tgl_selesai,dur_bulan,dur_hari,rate,jenis,no_depo,modul,no_ref) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','USUL','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(1,i)+"','"+this.sg5.cells(13,i)+"',0,'"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.sg5.cells(3,i))+","+nilaiToFloat(this.sg5.cells(4,i))+","+nilaiToFloat(this.sg5.cells(5,i))+",0,0,"+nilaiToFloat(this.sg5.cells(6,i))+",'"+this.sg5.getCellDateValue(7,i)+"','"+this.sg5.getCellDateValue(8,i)+"',"+nilaiToFloat(this.sg5.cells(9,i))+","+nilaiToFloat(this.sg5.cells(10,i))+","+nilaiToFloat(this.sg5.cells(11,i))+",'"+this.sg5.cells(12,i)+"','-','-','-')");
						}
					}
					
					for (var i=0;i < this.sg2.getRowCount();i++) {
						if (this.sg2.rowValid(i)){				
							sql.add("insert into inv_depoplan_komposisi(nu,no_plan,kode_lokasi,kode_bankklp,nilai_doc,nilai_depo,p_komp,doc_jt,depo_jt,doc_cair,depo_cair,doc_panjang,depo_panjang,doc_baru,depo_baru) values "+
									"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+","+nilaiToFloat(this.sg2.cells(8,i))+","+nilaiToFloat(this.sg2.cells(9,i))+","+nilaiToFloat(this.sg2.cells(10,i))+","+nilaiToFloat(this.sg2.cells(11,i))+","+nilaiToFloat(this.sg2.cells(12,i))+","+nilaiToFloat(this.sg2.cells(13,i))+")");
						}
					}
					for (var i=0;i < this.sg6.getRowCount();i++) {
						if (this.sg6.rowValid(i)){				
							sql.add("insert into inv_depoplan_catat(no_plan,nu,keterangan) values "+
									"('"+this.e_nb.getText()+"',"+i+",'"+this.sg6.cells(0,i)+"')");
						}
					}					
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);										
					setTipeButton(tbAllFalse);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.sg3.clear(1);
					this.sg2.clear(1);					
					this.sg.clear(1);
					this.sg4.clear(1);
					this.sg5.clear(1);					
					this.doClick();
				break;
			case "simpan" :									
			case "ubah" :									
				this.doHitKomposisi();			
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from inv_depoplan_m where no_plan='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_depoplan_rekap where no_plan='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_depoplan_d where no_plan='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_depoplan_komposisi where no_plan='"+this.e_nb.getText()+"'");
				sql.add("delete from inv_depoplan_catat where no_plan='"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) {
			this.doClick();					
		}
	},
	doClick : function(sender){				
		if (this.stsSimpan == 0) {
			this.sg3.clear(1);
			this.sg2.clear(1);
			this.sg.clear(1);
			this.sg4.clear(1);	
			this.sg5.clear(1);		
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depoplan_m","no_plan",this.app._lokasi+"-PL"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;
	},	
	doChange : function(sender){		
		if (this.stsSimpan == 1) {			
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd1.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab1.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd2 && this.cb_ttd2.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd2.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab2.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd3 && this.cb_ttd3.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd3.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab3.setText(line.jabatan);
				}
			}		
		}
	},	
	doChangeCell2: function(sender, col, row){				
		if (col == 8 || col == 9 || col == 10 || col == 11 || col == 12 || col == 13) this.sg2.validasi();					
	},	
	doDoubleClick4: function(sender, col , row) {
		//colTitle:["Dana","Cabang","Nama Bank","Jth Tempo","Tanggal","Rate DOC","Rate Depo","Rate LPS","Dicairkan","Perpanjang","Usulan",
		// "Tgl Mulai","Tgl Selesai","Durasi Bln","Durasi Hari","Rate","Keterangan","Bank","No Depo"],					
		if (col == 8) {
			this.sg4.cells(8,row,this.sg4.cells(3,row));
			this.sg4.cells(9,row,this.sg4.cells(3,row));
		}			
	},
	doChangeCell4: function(sender, col, row){				
		if (col == 11 || col == 12) {
			if (this.sg4.cells(11,row) != "" && this.sg4.cells(12,row) != "")
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.sg4.getCellDateValue(11,row)+"','"+this.sg4.getCellDateValue(12,row)+"') as hari,round(datediff(day,'"+this.sg4.getCellDateValue(11,row)+"','"+this.sg4.getCellDateValue(12,row)+"') / 30,0) as bln ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];												
				this.sg4.cells(14,row,line.hari);
				this.sg4.cells(13,row,line.bln);
				
				if (parseFloat(line.hari) < 28) {
					this.sg4.cells(15,row,this.sg4.cells(5,row));
					this.sg4.cells(16,row,"DOC");
				}
				else {
					this.sg4.cells(15,row,this.sg4.cells(6,row));
					this.sg4.cells(16,row,"DEPOSITO");
				}
			}
		}
		
	},	
	doChangeCell5: function(sender, col, row){				
		if (col == 1) {
			var strSQL = "select a.kode_bankklp,isnull(c.p_doc,0) as rate_doc,isnull(d.p_depo,0) as rate_depo,'7.5' as lps "+	 
						 "from inv_bank a "+
						 
						 "left join "+
						 "("+
						 "	select kode_bank,persen1 as p_doc "+
						 "	from (select x.kode_bank,x.persen1, "+
						 "				 row_number() over(partition by x.kode_bank,x.persen1 order by x.tanggal desc) as rn "+
						 "		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank and y.kode_kelola ='YKT' "+
						 "		  where x.jenis = 'DOC' and x.tanggal='"+this.dp_d1.getDateString()+"') as T "+ //x.tanggal<='"+this.dp_d1.getDateString()+"'
						 "	where rn = 1  "+
						 ") c on a.kode_bank=c.kode_bank "+
				
						 "left join "+
						 "("+
						 "	select kode_bank,persen1 as p_depo "+
						 "	from (select x.kode_bank,x.persen1,"+
						 "				 row_number() over(partition by x.kode_bank,x.persen1 order by x.tanggal desc) as rn "+
						 "		  from inv_bank_rate x inner join inv_bank y on x.kode_bank=y.kode_bank and y.kode_kelola ='YKT' "+
						 "		  where x.jenis = 'DEPOSITO' and x.tanggal='"+this.dp_d1.getDateString()+"') as T "+ //x.tanggal<='"+this.dp_d1.getDateString()+"'
						 "	where rn = 1  "+
						 ") d on a.kode_bank=d.kode_bank "+
						 
						 "where a.kode_bank='"+this.sg5.cells(1,row)+"' and a.kode_kelola ='YKT' ";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																		
				this.sg5.cells(3,row,line.rate_doc);
				this.sg5.cells(4,row,line.rate_depo);		
				this.sg5.cells(5,row,line.lps);	
				this.sg5.cells(13,row,line.kode_bankklp);	
				if (this.sg5.cells(7,row) == "") {
					this.sg5.cells(7,row,this.dp_d1.getText());
					this.sg5.cells(8,row,this.dp_d1.getText());
				}				
			}
		}
		
		if (col == 7 || col == 8) {
			if (this.sg5.cells(7,row) != "" && this.sg5.cells(8,row) != "")
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.sg5.getCellDateValue(7,row)+"','"+this.sg5.getCellDateValue(8,row)+"') as hari,round(datediff(day,'"+this.sg5.getCellDateValue(7,row)+"','"+this.sg5.getCellDateValue(8,row)+"') / 30,0) as bln ",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];												
				this.sg5.cells(10,row,line.hari);
				this.sg5.cells(9,row,line.bln);
				
				if (parseFloat(line.hari) < 28) {
					this.sg5.cells(11,row,this.sg5.cells(3,row));
					this.sg5.cells(12,row,"DOC");
				}
				else {
					this.sg5.cells(11,row,this.sg5.cells(4,row));
					this.sg5.cells(12,row,"DEPOSITO");
				}
			}
		}	
					
	},	
	doHitKomposisi: function() {
		for (var j=0;j < this.sg2.getRowCount();j++){
			this.sg2.cells(8,j,0);
			this.sg2.cells(9,j,0);
			this.sg2.cells(10,j,0);
			this.sg2.cells(11,j,0);
			this.sg2.cells(12,j,0);
			this.sg2.cells(13,j,0);
		}
		
		for (var i=0;i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i)){
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg4.cells(17,i) == this.sg2.cells(0,j) && this.sg4.cells(16,i) == "DOC") {
						cair = nilaiToFloat(this.sg2.cells(8,j)) + nilaiToFloat(this.sg4.cells(8,i));
						this.sg2.cells(8,j,cair);
					}
					
					if (this.sg4.cells(17,i) == this.sg2.cells(0,j) && this.sg4.cells(16,i) == "DEPOSITO") {
						cair = nilaiToFloat(this.sg2.cells(9,j)) + nilaiToFloat(this.sg4.cells(8,i));
						this.sg2.cells(9,j,cair);
					}
					
				}
			}
		}
		
		for (var i=0;i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i)){
				var panjang = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg4.cells(17,i) == this.sg2.cells(0,j) && this.sg4.cells(16,i) == "DOC") {
						panjang = nilaiToFloat(this.sg2.cells(10,j)) + nilaiToFloat(this.sg4.cells(9,i));
						this.sg2.cells(10,j,panjang);
					}
					
					if (this.sg4.cells(17,i) == this.sg2.cells(0,j) && this.sg4.cells(16,i) == "DEPOSITO") {
						panjang = nilaiToFloat(this.sg2.cells(11,j)) + nilaiToFloat(this.sg4.cells(9,i));
						this.sg2.cells(11,j,panjang);
					}
					
				}
			}
		}
		
		
		for (var i=0;i < this.sg5.getRowCount();i++){
			if (this.sg5.rowValid(i)){
				var usul = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg5.cells(13,i) == this.sg2.cells(0,j) && this.sg5.cells(12,i) == "DOC") {
						usul = nilaiToFloat(this.sg2.cells(12,j)) + nilaiToFloat(this.sg5.cells(6,i));
						this.sg2.cells(12,j,usul);
					}
					
					if (this.sg5.cells(13,i) == this.sg2.cells(0,j) && this.sg5.cells(12,i) == "DEPOSITO") {
						usul = nilaiToFloat(this.sg2.cells(13,j)) + nilaiToFloat(this.sg5.cells(6,i));
						this.sg2.cells(13,j,usul);
					}
					
				}
			}
		}
		
		
		this.pc1.setActivePage(this.pc1.childPage[3]);
		
	},
	doNilaiChange2: function(){
		try{			
			var c_doc = c_depo = p_doc = p_depo = b_doc = b_depo = 0 ;			
			for (var i=0; i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i)){										
					if (this.sg2.cells(8,i) != "") c_doc += nilaiToFloat(this.sg2.cells(8,i));	
					if (this.sg2.cells(9,i) != "") c_depo += nilaiToFloat(this.sg2.cells(9,i));	
					if (this.sg2.cells(10,i) != "") p_doc += nilaiToFloat(this.sg2.cells(10,i));	
					if (this.sg2.cells(11,i) != "") p_depo += nilaiToFloat(this.sg2.cells(11,i));	
					if (this.sg2.cells(12,i) != "") b_doc += nilaiToFloat(this.sg2.cells(12,i));	
					if (this.sg2.cells(13,i) != "") b_depo += nilaiToFloat(this.sg2.cells(13,i));														
				}
			}
			
			this.e_cdoc.setText(floatToNilai(c_doc));	
			this.e_cdepo.setText(floatToNilai(c_depo));	
			this.e_pdoc.setText(floatToNilai(p_doc));	
			this.e_pdepo.setText(floatToNilai(p_depo));	
			this.e_bdoc.setText(floatToNilai(b_doc));	
			this.e_bdepo.setText(floatToNilai(b_depo));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doNilaiChange: function(){
		try{			
			var tot = 0 ;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(7,i));		
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick5: function(sender, col, row){
		try{						
			if (col == 1){
				this.standarLib.showListData(this, "Daftar Bank",sender,undefined, 
						"select kode_bank, nama+' - '+no_rek as nama from inv_bank where kode_kelola ='YKT' and flag_bdepo='1'",
						"select count(*) from inv_bank where kode_kelola ='YKT' and flag_bdepo='1' ",						
						["kode_bank","nama"],"and",["Kode","Nama"],false);				
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_if_rptIfForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_suspen='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;															 
								this.pc2.hide();
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;	
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataRek = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataRek.set(line.kode_bank, line.nama);										
								}								
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc2.show();
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);						
			setTipeButton(tbAllFalse);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.sg3.clear(1);
			this.sg.clear(1);
			this.sg4.clear(1);
			this.sg5.clear(1);
			this.sg2.clear(1);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	
	doLoad3:function(sender){												
		var strSQL = "select a.no_plan,convert(varchar,a.tanggal,103) as tgl,a.keterangan from inv_depoplan_m a where a.kode_lokasi ='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page = 1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_plan,line.tgl,line.keterangan]); 
			}			
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);										
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,baris));								
				
				var strSQL = "select * from inv_depoplan_m where no_plan='"+this.e_nb.getText()+"'";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);					
												
						this.cb_ttd1.setText(line.nikttd1);
						this.e_jab1.setText(line.jab1);						
						this.cb_ttd2.setText(line.nikttd2);						
						this.e_jab2.setText(line.jab2);
						this.cb_ttd3.setText(line.nikttd3);						
						this.e_jab3.setText(line.jab3);
						
					}
				}
																	
				
			}									
		} catch(e) {alert(e);}
	}	
});
