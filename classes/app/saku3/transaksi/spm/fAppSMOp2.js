window.app_saku3_transaksi_spm_fAppSMOp2 = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_spm_fAppSMOp2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fAppSMOp2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval SM Proyek", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,220,20],caption:"Unit/Cabang", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});								
		this.c_modul3 = new saiCB(this,{bound:[20,10,200,20],caption:"Modul",items:["PBPR","PBBDD","PJAJU","PJPTG","PBLOG"], tag:9,change:[this,"doChange"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,407], childPage:["Daftar Bukti","Verifikasi","Jurnal & Budget","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Approve","Tgl Input","Kode PP"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,400,100,150,70,70,80,100,80]],
					colHide:[[12],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Verifikasi", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,450,20],caption:"No Dokumen", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,220,20],caption:"Total Pengajuan", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,450,20],caption:"PP/Unit", readOnly:true});		
		this.e_nilaiVer = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,13,220,20],caption:"Nilai Verifikasi", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,450,20],caption:"Deskripsi", readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,14,220,20],caption:"Total Verifikasi", readOnly:true, tipeText:ttNilai, text:"0"});						
				
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Due Date", readOnly:true});				
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,15,450,20],caption:"Pembuat", readOnly:true});
		this.e_totalRek = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,15,220,20],caption:"Total Rekening", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,16,this.pc1.width-5,212],colCount:7,tag:9,
		            colTitle:["Bank","Cabang","No Rekening","Nama Rekening","Bruto","Potongan","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,150,150,150,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],colFormat:[[4,5],[cfNilai,cfNilai]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});									
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,200],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode_proyek","Deskripsi"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,210,this.pc1.width-5,210],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
				
		this.c_modul2 = new saiCB(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"Modul",items:["PBPR","PJAJU","PJPTG","PBLOG"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_nb = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit/Cabang",true);		
			this.c_modul2.setText("");			
			this.c_modul3.setText("");

			//this.cb_pp.setText(this.app._kodePP);

		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_spm_fAppSMOp2.extend(window.childForm);
window.app_saku3_transaksi_spm_fAppSMOp2.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();									
					
					if (this.c_status.getText() == "RETURN") var vStatus = "S"; else var vStatus = "2";										
					sql.add("update spm_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPSDM' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into spm_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','APPSDM','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
												
					//---------------- flag bukti									
					if (this.e_modul.getText() == "PBPR") sql.add("update yk_pb_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					if (this.e_modul.getText() == "PBBDD") sql.add("update yk_pb_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					if (this.e_modul.getText() == "PBLOG") sql.add("update yk_pb_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					if (this.e_modul.getText() == "PJAJU") sql.add("update panjar2_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					if (this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PRPTG") sql.add("update panjarptg2_m set no_app2='"+this.e_nb.getText()+"',progress='"+vStatus+"' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";		
				if (this.e_modul.getText() != "PJPTG" && this.e_modul.getText() != "PRPTG") {		
					if (nilaiToFloat(this.e_total.getText()) <= 0) {				
						system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
						return false;						
					}	
				}			
				if (nilaiToFloat(this.e_total.getText()) != nilaiToFloat(this.e_totalRek.getText())) {				
					system.alert(this,"Transaksi tidak valid.","Total harus sama dengan Total Rekeningnya.");
					return false;						
				}
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
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				
				sql.add("delete from spm_app_m where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");			
				if (this.e_modul.getText() == "PBPR") sql.add("update yk_pb_m set no_app2='-',progress='9' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "PBBDD") sql.add("update yk_pb_m set no_app2='-',progress='9' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "PBLOG") sql.add("update yk_pb_m set no_app2='-',progress='9' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "PJAJU") sql.add("update panjar2_m set no_app2='-',progress='9' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				if (this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PRPTG") 
					sql.add("update panjarptg2_m set no_app2='-',progress='9' where no_ptg='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
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
		if (this.stsSimpan == 1) this.doClick();
		//this.doLoad();
	},	
	doChange:function(sender){				
		if (sender == this.c_modul3 || sender == this.cb_pp) this.doLoad();
		if ((sender == this.e_nilai || sender == this.e_nilaiVer) && this.e_nilai.getText()!="" && this.e_nilaiVer.getText()!="") {			
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_nilaiVer.getText())));
		}		
		if (sender == this.c_modul2) {
			if (this.c_modul2.getText() == "PBPR") this.cb_nb.setSQL("select no_pb, keterangan from yk_pb_m where modul = 'PBPR' and periode<='"+this.e_periode.getText()+"' and progress in ('2','S') and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
			if (this.c_modul2.getText() == "PBBDD") this.cb_nb.setSQL("select no_pb, keterangan from yk_pb_m where modul = 'PBBDD' and periode<='"+this.e_periode.getText()+"' and progress in ('2','S') and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
			if (this.c_modul2.getText() == "PBLOG") this.cb_nb.setSQL("select no_pb, keterangan from yk_pb_m where modul = 'PBLOG' and periode<='"+this.e_periode.getText()+"' and progress in ('2','S') and kode_lokasi='"+this.app._lokasi+"'",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
			if (this.c_modul2.getText() == "PJAJU") this.cb_nb.setSQL("select no_panjar, keterangan from panjar2_m where modul = 'PJAJU' and periode<='"+this.e_periode.getText()+"' and progress in ('2','S') and kode_lokasi='"+this.app._lokasi+"'",["no_panjar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
			if (this.c_modul2.getText() == "PJPTG" || this.c_modul2.getText() == "PRPTG") this.cb_nb.setSQL("select no_ptg, keterangan from panjarptg2_m where modul = 'PJPTG' and periode<='"+this.e_periode.getText()+"' and progress in ('2','S') and kode_lokasi='"+this.app._lokasi+"'",["no_ptg","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
		}
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			if (this.c_modul2.getText() == "PBPR") {					
				var strSQL = "select a.due_date,a.no_pb as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "PBBDD") {					
				var strSQL = "select a.due_date,a.no_pb as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "PBLOG") {					
				var strSQL = "select a.due_date,a.no_pb as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "PJAJU") {					
				var strSQL = "select a.due_date,a.no_panjar as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_panjar='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			if (this.c_modul2.getText() == "PJPTG" || this.c_modul2.getText() == "PRPTG") {					
				var strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,case a.progress when '2' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from panjarptg2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_ptg='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			}
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_app_m","no_app",this.app._lokasi+"-APK"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				this.e_modul.setText(this.sg.cells(0,row));				
				this.e_nobukti.setText(this.sg.cells(1,row));
				if (this.sg.cells(2,row) == "RETURN") this.c_status.setText(this.sg.cells(2,row));								
				else this.c_status.setText("APPROVE");								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_duedate.setText(this.sg.cells(4,row));
				this.e_pp.setText(this.sg.cells(5,row));
				this.e_dok.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(7,row));
				this.e_nilai.setText(this.sg.cells(8,row));				
				this.e_buat.setText(this.sg.cells(9,row));										
				this.noAppLama = this.sg.cells(10,row);						
				this.kodePPBukti = this.sg.cells(12,row);
				this.e_memo.setText(this.sg.cells(7,row));				
												
				this.doLoadRek();
				this.doLoadGar();
				this.doLoadJurnal();
				
				if (this.sg.cells(2,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				
			}
		} catch(e) {alert(e);}
	},		
	doLoadRek:function(){
		var strSQL1 = "select bank,cabang,no_rek,nama_rek,bruto,pajak,'"+this.e_ket.getText()+"' as keterangan "+
					  "from spm_rek where no_bukti ='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),line.keterangan.toUpperCase()]);
			}
		} 
		else this.sg1.clear(1);	
	},
	doLoadGar:function(){		
		if (this.e_modul.getText() == "PBPR") {		
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}
		if (this.e_modul.getText() == "PBBDD") {		
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}
		if (this.e_modul.getText() == "PBLOG") {		
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}	
		if (this.e_modul.getText() == "PJAJU") {		
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}	
		if (this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PRPTG") {		
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							  
						  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
		}
		var data = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];													
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
			}
		} else this.sg2.clear(1);
	},
	doLoadJurnal:function(){
		if (this.e_modul.getText() == "PBPR") {		
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_proyek,isnull(e.nama,'-') as nama_proyek "+
						  "from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
						  "				  inner join yk_pb_m d on a.no_pb=d.no_pb and a.kode_lokasi=d.kode_lokasi "+							
						  "               left join spm_proyek e on d.kode_proyek=e.kode_proyek and d.kode_lokasi=e.kode_lokasi "+
						  "where a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis<>'BMHD' ";
		}
		if (this.e_modul.getText() == "PBBDD") {		
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_proyek,isnull(e.nama,'-') as nama_proyek "+
						  "from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
						  "				  inner join yk_pb_m d on a.no_pb=d.no_pb and a.kode_lokasi=d.kode_lokasi "+							
						  "               left join spm_proyek e on d.kode_proyek=e.kode_proyek and d.kode_lokasi=e.kode_lokasi "+
						  "where a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis<>'BMHD' ";
		}
		if (this.e_modul.getText() == "PBLOG") {		
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,d.kode_proyek,isnull(e.nama,'-') as nama_proyek "+
						  "from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
						  "				  inner join yk_pb_m d on a.no_pb=d.no_pb and a.kode_lokasi=d.kode_lokasi "+							
						  "               left join spm_proyek e on d.kode_proyek=e.kode_proyek and d.kode_lokasi=e.kode_lokasi "+
						  "where a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis<>'BMHD' ";
		}	
		if (this.e_modul.getText() == "PJAJU") {		
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,'D' as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_proyek,'-' as nama_proyek "+
						  "from panjar2_m a inner join masakun b on a.akun_panjar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						  "where a.no_panjar = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		}	
		if (this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PRPTG") {		
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_proyek,'-' as nama_proyek "+
						  "from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						  "where a.no_ptg = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
		}		
		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_proyek,line.nama_proyek]);
			}
		} else this.sg3.clear(1);										
	},
	doLoad:function(sender){	
		try {														
																		
			var strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PBPR','PBBDD','PBLOG') "+					 
						 "union "+
				
						 "select a.due_date,a.no_panjar as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PJAJU') "+
						 "union "+
				
						 "select a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from panjarptg2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
						 "where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PJPTG','PRPTG') "+
				
						 "order by a.due_date";									
			
			if (this.c_modul3.getText() != "" && this.cb_pp.getText() != "") {
				if (this.c_modul3.getText() == "PBPR")	{
					strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PBPR') and a.kode_pp='"+this.cb_pp.getText()+"' ";				
				} 
				if (this.c_modul3.getText() == "PBBDD")	{
					strSQL =  strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PBBDD') and a.kode_pp='"+this.cb_pp.getText()+"' ";										
				} 
				if (this.c_modul3.getText() == "PBLOG")	{
					strSQL =  strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"               inner join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PBLOG') and a.kode_pp='"+this.cb_pp.getText()+"' ";										
				} 
				if (this.c_modul3.getText() == "PJAJU")	{
					strSQL = "select a.due_date,a.no_panjar as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PJAJU') and a.kode_pp='"+this.cb_pp.getText()+"' ";									
				} 
				//plus PRPTG
				if (this.c_modul3.getText() == "PJPTG")	{
					strSQL = "select a.tanggal as due_date,a.no_ptg as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_app2,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							"from panjarptg2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"                 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"where a.progress='9' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PJPTG','PRPTG') and a.kode_pp='"+this.cb_pp.getText()+"' ";									
				}
			}		

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			
		}
		catch(e) {
			alert(e);
		}							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app2,line.tglinput,line.kode_pp]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){		
		try{
			var totRek = totVer = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != "" && this.sg1.cells(5,i) != ""){
					totRek += nilaiToFloat(this.sg1.cells(4,i)) - nilaiToFloat(this.sg1.cells(5,i));					
				}
			}			
			this.e_totalRek.setText(floatToNilai(totRek));
			this.e_nilaiVer.setText(floatToNilai(totVer));
			
			if (this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PRPTG") this.e_totalRek.setText(this.e_nilai.getText());												
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   								
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
							this.dataAkun = new portalui_arrayMap();							
							this.dataPP = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
				this.pc1.show();   
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

