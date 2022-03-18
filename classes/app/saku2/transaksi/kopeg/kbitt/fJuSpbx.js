window.app_saku2_transaksi_kopeg_kbitt_fJuSpb = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fJuSpb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fJuSpb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Jurnal Beban Operasional", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:true}); 				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[320,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:true});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Transaksi","List Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No SPB","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,200,80,100]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],												
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,222,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:2});		
		this.e_giro = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Dokumen", maxLength:50});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,18,990,370], childPage:["Data SPB","Detail Pengajuan","Item Jurnal"]});		
		this.cb_spb = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,222,20],caption:"No SPB",tag:0,multiSelection:false,change:[this,"doChange"]});		
		this.e_nilainet = new saiLabelEdit(this.pc1.childPage[0],{bound:[780,11,200,20],caption:"Nilai SPB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-65],colCount:13,tag:0,
		            colTitle:["No Agenda","Tanggal","Modul","Bagian / Unit","Uraian","Nilai KasBank","Catatan Ver Akun","Tgl Input","User","No Ver.","Tgl Ver","No Ver2","Tgl Ver2"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[70,90,70,90,150,60,200,100,200,150,60,70,80]],
					readOnly:true,colFormat:[[5],[cfNilai]],					
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
				
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Agenda", readOnly:true, tag:9});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Modul", readOnly:true, tag:9});						
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", readOnly:true, tag:9});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Tanggal", readOnly:true, tag:9});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Tgl Input", readOnly:true, tag:9});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"User Input", readOnly:true, tag:9});								
		this.e_nikpj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"NIK Panjar", readOnly:true, tag:9});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai Penyelesaian", readOnly:true, tipeText:ttNilai, text:"0", tag:9});				
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,200,20],caption:"Nilai Panjar", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ver = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Verifikasi", readOnly:true, tag:9});												
		this.e_tglver = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Tgl Ver.", readOnly:true, tag:9});										
		this.e_fiat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"No Ver Akun", readOnly:true, tag:9});												
		this.e_tglfiat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Tgl Ver Akun", readOnly:true, tag:9});										
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,80],caption:"Cat. Ver Akun",readOnly:true, tag:9});
		this.e_cf = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Kode CashFlow", readOnly:true, tag:9});												
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,50,100,50,100,250,40,150,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No KB",maxLength:30,readOnly:true,visible: false});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
			this.cb_jenis.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='004' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.e_giro.setText("-");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fJuSpb.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fJuSpb.implement({
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
			this.jenis = "JU";
			if (nilaiToFloat(this.e_nilainet.getText())>0) {				
				this.dc = "C";
			}
			else {				
				this.dc = "D";
			}
						
			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-BY"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update it_aju_m set no_kas='-',progress='S' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update it_spb_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					}
					
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,tgl_input,ref1,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_spb.getText()+"','"+this.cb_spb.rightLabelCaption+"','"+this.app._kodePP+"','JUSPB','JUSPB','IDR',1,"+Math.abs(nilaiToFloat(this.e_nilainet.getText()))+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','"+this.e_giro.getText()+"',getdate(),'"+this.cb_jenis.getText()+"','"+this.app._userLog+"')");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref)  "+
							"select '"+this.e_nb.getText()+"',a.no_aju,'"+this.dp_d1.getDateString()+"',a.no_urut,a.kode_akun,a.keterangan,a.dc,a.nilai,a.kode_pp,a.kode_drk,'-','-','-','-','-','-',a.kode_lokasi,'JUSPB','FIAT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_spb='"+this.cb_spb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.nilai>0 and a.kode_akun not like'2%' ");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spb.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_jenis.getText()+"','"+this.cb_spb.rightLabelCaption+"','"+this.dc+"',"+Math.abs(nilaiToFloat(this.e_nilainet.getText()))+",'"+this.app._kodePP+"','-','-','-','-','-','-','-','"+this.app._lokasi+"','JUSPB','BYMHD','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
					
					sql.add("update it_spb_m set no_kas='"+this.e_nb.getText()+"' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("update it_aju_m set no_kas='"+this.e_nb.getText()+"',progress='3' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
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
					this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1); 			
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);									
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																										
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from ju_m where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update it_aju_m set no_kas='-',progress='S' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update it_spb_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);
	},				
	doChange:function(sender){
		if (sender == this.cb_spb && this.cb_spb.getText() != "") this.doLoad();
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);									
			this.e_noaju.setText(this.sg.cells(0,row));			
			this.e_modul.setText(this.sg.cells(2,row));			
			this.e_ket.setText(this.sg.cells(4,row));			
			this.e_tgl.setText(this.sg.cells(1,row));			
			this.e_tglinput.setText(this.sg.cells(7,row));			
			this.e_user.setText(this.sg.cells(8,row));			
			this.e_total.setText(this.sg.cells(5,row));												
			this.e_ver.setText(this.sg.cells(9,row));			
			this.e_tglver.setText(this.sg.cells(10,row));			
			this.e_fiat.setText(this.sg.cells(11,row));			
			this.e_tglfiat.setText(this.sg.cells(12,row));						
			this.e_memo.setText(this.sg.cells(6,row));							
						
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,aa.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar,isnull(bb.kode_cf,'-') as kode_cf "+
						"from it_aju_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                inner join it_aju_m aa on a.no_aju=aa.no_aju and a.kode_lokasi=aa.kode_lokasi "+						
						"                inner join fiat_m bb on bb.no_fiat=aa.no_fiat and bb.kode_lokasi=aa.kode_lokasi "+						
						"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"                left join karyawan e on aa.nik_panjar=e.nik and aa.kode_lokasi=e.kode_lokasi "+
						"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_akun not like'2%' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg1.clear(1);							
			this.e_nikpj.setText(line.nik_panjar);			
			this.e_cf.setText(line.kode_cf);
			
			if(this.e_modul.getText() == "PJPTG") {
				var data = this.dbLib.getDataProvider("select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai_pj "+
					   "from it_aju_d a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					   "where b.no_ptg='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));						
					} 
				}
			}
		}
	},
	doLoad:function(sender){
		if (this.cb_spb.getText() != "") {
			//jika minus berarti kasbank biasa tanpa spb
			if (this.stsSimpan == 1) vProg = " and a.progress in ('S') ";
			else vProg = " and a.progress in ('3') ";
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,a.keterangan,xx.nilai_fiat as nilai,g.catatan,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,e.no_ver,convert(varchar,e.tgl_input,103) as tgl_ver,f.no_fiat,convert(varchar,f.tgl_input,103) as tgl_fiat  "+
						 "from it_aju_m a "+
						 "inner join (select no_aju,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as nilai_fiat from it_aju_d where kode_lokasi='"+this.app._lokasi+"' group by no_aju,kode_lokasi) xx on a.no_aju=xx.no_aju and a.kode_lokasi=xx.kode_lokasi "+
						 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
						 "inner join ver_m e on a.no_ver=e.no_ver and a.kode_lokasi=e.kode_lokasi "+
						 "inner join fiat_m f on f.no_fiat=a.no_fiat and f.kode_lokasi=a.kode_lokasi "+
						 "inner join fiat_d g on f.no_fiat=g.no_fiat and f.kode_lokasi=g.kode_lokasi "+					 					 
						 "where a.no_spb = '"+this.cb_spb.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vProg;						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);		
			
			var strSQL = "select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
			             "from it_aju_d a "+
						 "inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_spb = '"+this.cb_spb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.kode_akun not like '2%'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_nilainet.setText(floatToNilai(line.total));									
				}
			}
		}
		else system.alert(this,"SPB tidak valid.","Pilih No SPB");
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_aju,line.tanggal,line.modul,line.pp,line.keterangan,floatToNilai(line.nilai),line.catatan,line.tgl_input,line.nik_user,line.no_ver,line.tgl_ver,line.no_fiat,line.tgl_fiat]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_kbitt_rptJuJurnalTuForm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}						
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
			this.sg.clear(1); this.sg1.clear(1); this.sg3.clear(1); 			
			this.e_memo.setText("-");
			this.pc1.setActivePage(this.pc1.childPage[0]);					
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);									
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																
		var strSQL = "select a.no_ju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from ju_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='JUSPB' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_ju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var data = this.dbLib.getDataProvider("select convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.ref1,a.no_link,a.no_dokumen "+
						   "from ju_m a  "+					   
						   "where a.no_ju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);										
						this.cb_jenis.setText(line.ref1);					
						this.e_giro.setText(line.no_link);					
						this.cb_spb.setSQL("select no_spb, keterangan from it_spb_m where no_kas='"+this.e_nb.getText()+"' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No SPB","Deskripsi"],"and","Data SPB",true);									
						this.cb_spb.setText(line.no_dokumen);					
					} 
				}				
			}						
		} catch(e) {alert(e);}
	}		
});


