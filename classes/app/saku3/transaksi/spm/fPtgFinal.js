window.app_saku3_transaksi_spm_fPtgFinal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fPtgFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fPtgFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Panjar", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sgL = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]], colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClickL"],autoAppend:false,defaultRow:1});		
		this.sgnL = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgL,pager:[this,"doPagerL"]});
		this.bLoadL = new portalui_imageButton(this.sgnL,{bound:[this.sgnL.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoadL"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});			
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,18,995,345], childPage:["Data Pertanggungan","Detail Pertanggungan","Kas Bank"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:0,
		            colTitle:["No Bukti","No Panjar","Tanggal","No Dokumen","Keterangan","Nilai Panjar","Nilai Perttg.","Nilai Kas","Kode Akun","PP","Pemegang"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,70,80,80,80,200,100,80,100,100]],
					readOnly:true,colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
						
		this.e_nopj = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Panjar", readOnly:true});								
		this.e_akunpj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"Akun Panjar", readOnly:true});						
		this.e_noptg = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Pertangg.", readOnly:true});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});						
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"NIK Pemegang", readOnly:true});												
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Panjar", readOnly:true,tipeText:ttNilai,text:"0"});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,200,20],caption:"Nilai Pertgg.", readOnly:true,tipeText:ttNilai,text:"0"});						
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[10,10,this.pc1.width-20,220],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,200,50,150,80]],										
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		
		this.c_jenis = new saiCB(this.pc1.childPage[2],{bound:[20,22,200,20],caption:"Jenis",items:["BM"], readOnly:true,tag:2});
		this.e_nbkb = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_genkb = new portalui_imageButton(this.pc1.childPage[2],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_akun = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});				
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Nilai KasBank", readOnly:true,tipeText:ttNilai,text:"0"});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
					
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		this.dataCF = this.app._cf;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.nikapp = line.flag;
			} else this.nikapp = this.app._userLog;			
			this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun =b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun KasBank",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fPtgFinal.extend(window.childForm);
window.app_saku3_transaksi_spm_fPtgFinal.implement({
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
						sql.add("update panjarptg2_m set progress='4',no_final='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_m where modul = 'KBSLSPJ' and no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where modul = 'KBSLSPJ' and no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update panjarptg2_m set progress='6',no_final='"+this.e_nb.getText()+"' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (nilaiToFloat(this.e_nilaikb.getText()) == 0) {
						var posted = "F";
					}
					else {
						var posted = "X";
						if (nilaiToFloat(this.e_nilaikb.getText()) > 0) var DCkb = "D";
						else var DCkb = "C";
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							    "('"+this.e_nbkb.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBSLSPJ','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilaikb.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','"+this.e_noptg.getText()+"','"+this.e_nopj.getText()+"','"+this.cb_akun.getText()+"')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"('"+this.e_nbkb.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','"+DCkb+"',"+Math.abs(nilaiToFloat(this.e_nilaikb.getText()))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBSLSPJ','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
								"select '"+this.e_nbkb.getText()+"','"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,'-','-',kode_lokasi,'KBSLSPJ',jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
								"from panjarptg2_j where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_nopj.getText()+"','"+this.e_nbkb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.e_akunpj.getText()+"','"+this.cb_akun.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.app._kodePP+"','SLSPJ',"+parseNilai(this.e_nilai.getText())+",0,'-',2,'"+posted+"','"+this.e_periode.getText()+"','-','"+this.e_noptg.getText()+"','"+this.app._userLog+"',getdate())");						
					sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','"+this.e_nopj.getText()+"','"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from panjarptg2_j where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg3.clear(1); this.sgL.clear(1);
					if(this.stsSimpan == 1) this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :										
			case "ubah" :										
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_ptg from ptg_m where no_ptg<> '"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_ptg);
							return false;
						} 
					}
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();								
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
				this.preView="0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update panjarptg2_m set progress='4',no_final='-' where no_ptg='"+this.e_noptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where modul = 'KBSLSPJ' and no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where modul = 'KBSLSPJ' and no_dokumen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {									
				this.doLoad();
				this.e_nopj.setText("");
				this.e_akunpj.setText("");
				this.e_noptg.setText("");
				this.e_dok2.setText("");
				this.e_ket2.setText("");
				this.e_nik.setText("");
				this.e_nilaipj.setText("0");
				this.e_nilai.setText("0");
				this.e_nilaikb.setText("0");
				this.sg3.clear(1);
				this.sgL.clear(1);
			}
			this.stsSimpan = 1;
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ptg_m","no_ptg",this.app._lokasi+"-SP"+this.e_periode.getText().substr(2,4)+".","0000"));		
				this.e_dok.setFocus();
			}
			if (sender == this.i_genkb && this.c_jenis.getText()!= "") {
				this.e_nbkb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				this.cb_akun.setFocus();
			}
			setTipeButton(tbSimpan);			
		}		
	},			
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			this.e_nopj.setText(this.sg.cells(1,row));
			this.e_noptg.setText(this.sg.cells(0,row));
			this.e_dok2.setText(this.sg.cells(3,row));			
			this.e_ket2.setText(this.sg.cells(4,row));			
			this.e_nik.setText(this.sg.cells(10,row));						
			this.e_akunpj.setText(this.sg.cells(8,row));
			this.e_nilaipj.setText(this.sg.cells(5,row));
			this.e_nilai.setText(this.sg.cells(6,row));
			this.e_nilaikb.setText(this.sg.cells(7,row));
			if (nilaiToFloat(this.e_nilaikb.getText()) == 0) {
				this.e_nbkb.setTag("9");
				this.cb_akun.setTag("9");
				this.e_nilaikb.setTag("9");
			}
			else {
				this.e_nbkb.setTag("1");
				this.cb_akun.setTag("1");
				this.e_nilaikb.setTag("1");
				if (nilaiToFloat(this.e_nilaikb.getText()) > 0) this.c_jenis.setText("BM");
				else this.c_jenis.setText("KK");
				if (this.stsSimpan == 1) this.doClick(this.i_genkb);
			}
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
						"from panjarptg2_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
						"where a.jenis in('BEBAN','VER') and a.no_ptg = '"+this.e_noptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
				}				
			} else this.sg3.clear(1);
			this.sg3.validasi();			
		}
	},
	doLoad:function(sender){				
		var strSQL = "select a.no_ptg,a.no_panjar,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai_pj,a.nilai,a.nilai_kas,a.akun_panjar,b.kode_pp+' - '+b.nama as pp,c.nik+' - '+c.nama as pemohon "+
		             "from panjarptg2_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress='4' and a.kode_lokasi='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_ptg,line.no_panjar,line.tanggal,line.no_dokumen,line.keterangan,floatToNilai(line.nilai_pj),floatToNilai(line.nilai),floatToNilai(line.nilai_kas),line.akun_panjar,line.pp,line.pemohon]);
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
							if (this.preView=="1") {								
								if (nilaiToFloat(this.e_nilaikb.getText()) == 0) {
									this.nama_report="server_report_saku2_..............";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
								}
								else {
									this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								}
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
						}else system.info(this,result,"");
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg3.clear(1); this.sgL.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			if (this.stsSimpan == 1) this.doClick();
			this.doLoad();			
		} catch(e) {
			alert(e);
		}
	},	
	doLoadL:function(sender){																							 
		var strSQL = "select a.no_ptg,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_kas as no_dokumen,a.keterangan,a.nilai "+
		             "from ptg_m a left join kas_m b on a.no_ptg=b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.modul='KBSLSPJ' "+
				     "where ((b.no_kas is null and a.posted='F') or (a.posted='X' and b.posted='F')) and a.modul = 'SLSPJ' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgnL.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgnL.rearrange();
			this.doTampilDataL(1);
		} else this.sgL.clear(1);			
	},
	doTampilDataL: function(page) {
		this.sgL.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sgL.appendData([line.no_ptg,line.tgl,line.modul,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sgL.setNoUrut(start);
	},
	doPagerL: function(sender, page) {
		this.doTampilDataL(page);
	},
	doDoubleClickL: function(sender, col , row) {
		try{
			if (this.sgL.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sgL.cells(0,row));
				this.e_nbkb.setText(this.sgL.cells(3,row));				
												
				var data = this.dbLib.getDataProvider("select a.no_dokumen as nodok,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan as ket,"+
						   "isnull(b.jenis,'') as jenis,isnull(b.akun_kb,'') as akun_kb,isnull(b.no_kas,'') as no_kas,isnull(b.nilai,0) as nilaikb,isnull(b.kode_bank,'-') as kode_bank "+
						   "from ptg_m a left join kas_m b on a.no_ptg=b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.modul='KBSLSPJ' "+					   
						   "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.nodok);
						this.e_ket.setText(line.ket);										
						this.c_jenis.setText(line.jenis);
						this.e_nbkb.setText(line.no_kas);
						this.cb_akun.setText(line.kode_bank);
						this.e_nilaikb.setText(floatToNilai(line.nilaikb));
					} 
				}				
				var strSQL = "select a.no_ptg,a.no_panjar,convert(varchar,a.tanggal,103) as tanggal,a.no_dokumen,a.keterangan,a.nilai_pj,a.nilai,a.nilai_kas,a.akun_panjar,b.kode_pp+' - '+b.nama as pp,c.nik+' - '+c.nama as pemohon "+
							 "from panjarptg2_m a "+					 
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_final='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);		
				this.doDoubleClick(this.sg,0,0);
			}									
		} catch(e) {alert(e);}
	}	
});