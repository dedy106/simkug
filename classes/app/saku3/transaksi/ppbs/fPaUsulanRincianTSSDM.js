window.app_saku3_transaksi_ppbs_fPaUsulanRincianTSSDM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaUsulanRincianTSSDM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaUsulanRincianTSSDM";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Usulan Telkom School (SDM): Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,480], childPage:["Daftar Usulan","Data Usulan","Cari Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Kode DRK","Nama DRK","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,200,150,80,80,100]],readOnly:true,
					colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_drk = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,240,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,15,200,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,10,995,285], childPage:["Daftar Usulan Anggaran","Error Msg"]});				
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:32,tag:0,
		            colTitle:["Kode MTA","Nama","Kode PP","Nama PP","Rincian Kegiatan","Satuan","Tarif"
					          ,"Jan Vol","Jan Jml","Feb Vol","Feb Jml","Mar Vol","Mar Jml"  
							  ,"Apr Vol","Apr Jml","Mei Vol","Mei Jml","Jun Vol","Jun Jml"
							  ,"Jul Vol","Jul Jml","Agu Vol","Agu Jml","Sep Vol","Sep Jml"
							  ,"Okt Vol","Okt Jml","Nop Vol","Nop Jml","Des Vol","Des Jml"
					          ,"Total"],
					colWidth:[[31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,50,80,80,250,150,80,150,80]],										
					columnReadOnly:[true,[1,8,10,12,14,16,18,20,22,24,26,28,30,31],[0,4,5,6,7,9,11,13,15,17,19,21,23,25,27,29]],	
					colFormat:[[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		this.i_clear = new portalui_imageButton(this.sgn,{bound:[895,2,20,20],hint:"Clear",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClear"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Tahun",readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_drk2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,240,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:9});	
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150, tag:9});	
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.tahun = this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_pp order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}

			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);		

			var strSQL = "select distinct a.kode_akun,a.nama from masakun a "+						 
						 "inner join flag_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_flag in ('071') "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataAkun = data;
			}

			var strSQL = "select a.kode_pp, a.nama from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.tahun+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataPP = data;
			}
			
			this.doLoad();
			this.c_tahun2.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaUsulanRincianTSSDM.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaUsulanRincianTSSDM.implement({	
	doClear: function(){
		this.sg.clear(1);
		this.sg2.clear(1);
		this.sg.validasi();
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
							"select distinct a.kode_akun,a.nama from masakun a "+
							"inner join flag_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_flag in ('071') "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",							
							"select count(*) from masakun a "+
							"inner join flag_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_flag in ('071') "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
							"select a.kode_pp, a.nama from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.tahun+"'",							
							"select count(*) from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.tahun+"'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}												
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.doValidasi();

			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doValidasi: function() {
		this.inValid = false;
		this.sg2.clear(1);

		for (var i=0; i < this.sg.getRowCount();i++){
			this.sg.cells(1,i,"INVALID");
			this.sg.cells(3,i,"INVALID");					
			if (this.dataAkun.rs.rows.length > 0) {
				for (var j=0;j < this.dataAkun.rs.rows.length;j++) {
					if (this.sg.cells(0,i) == this.dataAkun.rs.rows[j].kode_akun) {						
						this.sg.cells(1,i,this.dataAkun.rs.rows[j].nama);	
					}													
				}	
				if (this.sg.cells(1,i) == "INVALID") this.inValid = true;						
			}	
			
			if (this.dataPP.rs.rows.length > 0) {
				for (var j=0;j < this.dataPP.rs.rows.length;j++) {
					if (this.sg.cells(2,i) == this.dataPP.rs.rows[j].kode_pp) {						
						this.sg.cells(3,i,this.dataPP.rs.rows[j].nama);	
					}													
				}	
				if (this.sg.cells(3,i) == "INVALID") this.inValid = true;						
			}	

		}

		if (!this.inValid) {
			if (this.stsSimpan==1) setTipeButton(tbSimpan);	
			else setTipeButton(tbUbahHapus);	
		}
		else {
			this.pc2.setActivePage(this.pc2.childPage[1]);	
			this.sg2.clear();
			for (var i=0; i < this.sg.getRowCount();i++) {
				if (this.sg.cells(1,i) == "INVALID" || this.sg.cells(3,i) == "INVALID") {
					var j = i+1;
					this.sg2.appendData([j]);						
				}
			}
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_usul_m","no_usul",this.app._lokasi+"-PPBS"+this.c_tahun.getText()+".","0000"));			
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var tahun=this.c_tahun.getText();
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','SDM','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','-','-','"+this.cb_drk.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"01',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"02',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+")");							
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"03',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"04',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(13,i))+","+nilaiToFloat(this.sg.cells(14,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"05',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(15,i))+","+nilaiToFloat(this.sg.cells(16,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"06',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(17,i))+","+nilaiToFloat(this.sg.cells(18,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"07',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(19,i))+","+nilaiToFloat(this.sg.cells(20,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"08',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(21,i))+","+nilaiToFloat(this.sg.cells(22,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"09',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(23,i))+","+nilaiToFloat(this.sg.cells(24,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"10',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(25,i))+","+nilaiToFloat(this.sg.cells(26,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"11',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(27,i))+","+nilaiToFloat(this.sg.cells(28,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"12',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(29,i))+","+nilaiToFloat(this.sg.cells(30,i))+")");
										
							}
						}
					}
										
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
							"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var tahun=this.c_tahun.getText();
					sql.add("delete from agg_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_usul_j where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_rkm,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','SDM','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','-','-','"+this.cb_drk.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"01',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"02',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+")");							
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"03',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"04',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(13,i))+","+nilaiToFloat(this.sg.cells(14,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"05',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(15,i))+","+nilaiToFloat(this.sg.cells(16,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"06',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(17,i))+","+nilaiToFloat(this.sg.cells(18,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"07',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(19,i))+","+nilaiToFloat(this.sg.cells(20,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"08',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(21,i))+","+nilaiToFloat(this.sg.cells(22,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"09',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(23,i))+","+nilaiToFloat(this.sg.cells(24,i))+")");
								
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"10',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(25,i))+","+nilaiToFloat(this.sg.cells(26,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"11',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(27,i))+","+nilaiToFloat(this.sg.cells(28,i))+")");
								sql.add("insert into agg_usul_j(nu,no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.cb_drk.getText()+"','"+this.sg.cells(0,i)+"','-','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+tahun+"12',"+nilaiToFloat(this.sg.cells(6,i))+",1,"+nilaiToFloat(this.sg.cells(29,i))+","+nilaiToFloat(this.sg.cells(30,i))+")");
										
							}
						}
					}
										
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
							"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from agg_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_usul_j where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.doValidasi();
				if (this.inValid) {					
					system.alert(this,"Transaksi tidak valid.","Terdapat data invalid.");
					return false;
				}
				if (this.stsOpen == "0"){
					system.alert(this,"Transaksi tidak valid.","Usulan sudah di-Close.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.stsOpen == "0"){
					system.alert(this,"Transaksi tidak valid.","Usulan sudah di-Close.");
					return false;
				}
				else this.ubah();
				break;				
			case "hapus" :	
				if (this.stsOpen == "0"){
					system.alert(this,"Transaksi tidak valid.","Usulan sudah di-Close.");
					return false;
				}
				else
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{						
			if (sender == this.c_tahun || sender==this.cb_pp){
				if (this.c_tahun.getText() != "") {
					this.cb_drk.setSQL("select a.kode_drk, a.nama from agg_drk a where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
				}

				if (this.c_tahun.getText() != "") {
					var strSQL = "select sts_open from agg_close where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							this.stsOpen = line.sts_open;
						}					
					}
				}
			}			
			if ((sender == this.c_tahun2) && this.c_tahun2.getText() != ""){
				this.cb_drk2.setSQL("select a.kode_drk, a.nama from agg_drk a where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun2.getText()+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		this.c_tahun.setText(y+1);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");								
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_usul_m","no_usul",this.app._lokasi+"-PPBS"+this.c_tahun.getText()+".","0000"));			
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
		}		
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.cb_drk2.getText() != "") var filter = filter+" and a.kode_drk = '"+this.cb_drk2.getText()+"' ";
			if (this.e_ket2.getText() != "") var filter = filter+" and a.keterangan like '%"+this.cb_drk2.getText()+"%' ";
			if (this.c_tahun2.getText() != "") var filter = filter+" and a.tahun = '"+this.c_tahun2.getText()+"' ";

			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_drk,b.nama as nama_drk,isnull(d.nilai,0) as nilai "+
		             	 "from agg_usul_m a "+
					 	 "inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+					 
					 	 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usul_j where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
					 	 "where a.kode_pp='SDM' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.no_usul ";			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				this.stsSimpan=0;
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select tanggal,tahun,keterangan,nik_app,kode_drk from agg_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);
						this.cb_drk.setText(line.kode_drk);
					} 
				}			
				var strSQL = "select distinct a.nu,a.kode_akun,c.nama as nama_akun,a.kode_pp,d.nama as nama_pp,a.kode_drk,a.keterangan,a.tarif,a.satuan "+
					",isnull(janvol,0) as janvol,isnull(jantot,0) as jantot "+
					",isnull(febvol,0) as febvol,isnull(febtot,0) as febtot "+
					",isnull(marvol,0) as marvol,isnull(martot,0) as martot "+
					",isnull(aprvol,0) as aprvol,isnull(aprtot,0) as aprtot "+
					",isnull(meivol,0) as meivol,isnull(meitot,0) as meitot "+
					",isnull(junvol,0) as junvol,isnull(juntot,0) as juntot "+
					",isnull(julvol,0) as julvol,isnull(jultot,0) as jultot "+
					",isnull(aguvol,0) as aguvol,isnull(agutot,0) as agutot "+
					",isnull(sepvol,0) as sepvol,isnull(septot,0) as septot "+
					",isnull(oktvol,0) as oktvol,isnull(okttot,0) as okttot "+
					",isnull(nopvol,0) as nopvol,isnull(noptot,0) as noptot "+
					",isnull(desvol,0) as desvol,isnull(destot,0) as destot "+
					",isnull(jantot,0)+isnull(febtot,0)+isnull(martot,0)+isnull(aprtot,0)+isnull(meitot,0)+isnull(juntot,0)+isnull(jultot,0)+isnull(agutot,0)+isnull(septot,0)+isnull(okttot,0)+isnull(noptot,0)+isnull(destot,0) as total "+
					"from agg_usul_j a  "+

					"inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					"inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+

					"left join (  "+
					"select nu  "+
					",sum(case when substring(periode,5,2) = '01' then vol else 0 end) as janvol  "+
					",sum(case when substring(periode,5,2) = '01' then total else 0 end) as jantot "+
					",sum(case when substring(periode,5,2) = '02' then vol else 0 end) as febvol "+
					",sum(case when substring(periode,5,2) = '02' then total else 0 end) as febtot "+
					",sum(case when substring(periode,5,2) = '03' then vol else 0 end) as marvol "+
					",sum(case when substring(periode,5,2) = '03' then total else 0 end) as martot "+
					",sum(case when substring(periode,5,2) = '04' then vol else 0 end) as aprvol "+
					",sum(case when substring(periode,5,2) = '04' then total else 0 end) as aprtot "+
					",sum(case when substring(periode,5,2) = '05' then vol else 0 end) as meivol "+
					",sum(case when substring(periode,5,2) = '05' then total else 0 end) as meitot "+
					",sum(case when substring(periode,5,2) = '06' then vol else 0 end) as junvol "+
					",sum(case when substring(periode,5,2) = '06' then total else 0 end) as juntot "+
					",sum(case when substring(periode,5,2) = '07' then vol else 0 end) as julvol "+
					",sum(case when substring(periode,5,2) = '07' then total else 0 end) as jultot "+
					",sum(case when substring(periode,5,2) = '08' then vol else 0 end) as aguvol "+
					",sum(case when substring(periode,5,2) = '08' then total else 0 end) as agutot "+
					",sum(case when substring(periode,5,2) = '09' then vol else 0 end) as sepvol "+
					",sum(case when substring(periode,5,2) = '09' then total else 0 end) as septot "+
					",sum(case when substring(periode,5,2) = '10' then vol else 0 end) as oktvol "+
					",sum(case when substring(periode,5,2) = '10' then total else 0 end) as okttot "+
					",sum(case when substring(periode,5,2) = '11' then vol else 0 end) as nopvol "+
					",sum(case when substring(periode,5,2) = '11' then total else 0 end) as noptot "+
					",sum(case when substring(periode,5,2) = '12' then vol else 0 end) as desvol "+
					",sum(case when substring(periode,5,2) = '12' then total else 0 end) as destot "+
					"from agg_usul_j "+
					"where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"group by nu) b on a.nu=b.nu  "+

					"where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.keterangan,line.satuan,
											floatToNilai(line.tarif),floatToNilai(line.janvol),floatToNilai(line.jantot),floatToNilai(line.febvol),floatToNilai(line.febtot),floatToNilai(line.marvol),floatToNilai(line.martot),  
											floatToNilai(line.aprvol),floatToNilai(line.aprtot),floatToNilai(line.meivol),floatToNilai(line.meitot),floatToNilai(line.junvol),floatToNilai(line.juntot),  	
											floatToNilai(line.julvol),floatToNilai(line.jultot),floatToNilai(line.aguvol),floatToNilai(line.agutot),floatToNilai(line.sepvol),floatToNilai(line.septot),  
											floatToNilai(line.oktvol),floatToNilai(line.okttot),floatToNilai(line.nopvol),floatToNilai(line.noptot),floatToNilai(line.desvol),floatToNilai(line.destot),
											floatToNilai(line.total)]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){	
		var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_drk,b.nama as nama_drk,isnull(d.nilai,0) as nilai "+
		             "from agg_usul_m a "+
					 "inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+					 
					 "left join (select no_usul,kode_lokasi,sum(total) as nilai from agg_usul_j where kode_lokasi='"+this.app._lokasi+"' group by no_usul,kode_lokasi )d on a.no_usul=d.no_usul and a.kode_lokasi=d.kode_lokasi "+ 
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.tahun+"' and a.kode_pp='SDM' order by a.no_usul ";				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_usul,line.tgl,line.kode_drk,line.nama_drk,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(31,i) != ""){
					tot += nilaiToFloat(this.sg.cells(31,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doChangeCell: function(sender, col, row){		
		if (col ==  6 || col ==  7  || col ==  9 || col ==  11 || col == 13 || col == 15 || col == 17 || col == 19 || col == 21 || col == 23 || col == 25 || col == 27 || col == 29 ) {			
			
			if (sender.cells(6,row) != "" && sender.cells(7,row) != "") {	
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(7,row));
				sender.cells(8,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(9,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(9,row));
				sender.cells(10,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(11,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(11,row));
				sender.cells(12,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(13,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(13,row));
				sender.cells(14,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(15,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(15,row));
				sender.cells(16,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(17,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(17,row));
				sender.cells(18,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(19,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(19,row));
				sender.cells(20,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(21,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(21,row));
				sender.cells(22,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(23,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(23,row));
				sender.cells(24,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(25,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(25,row));
				sender.cells(26,row,floatToNilai(jml));
			}
			
			if (sender.cells(6,row) != "" && sender.cells(27,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(27,row));
				sender.cells(28,row,floatToNilai(jml));
			}

			if (sender.cells(6,row) != "" && sender.cells(29,row) != "") {
				var jml = nilaiToFloat(sender.cells(6,row)) * nilaiToFloat(sender.cells(29,row));
				sender.cells(30,row,floatToNilai(jml));
			}
			
			if (sender.cells(28,row) != "" && sender.cells(30,row) != "" && sender.cells(8,row) != "" && sender.cells(10,row) != "" && 
			   sender.cells(12,row) != "" && sender.cells(14,row) != "" && sender.cells(16,row) != "" && sender.cells(18,row) != "" && sender.cells(20,row) != "" && 
			   sender.cells(22,row) != "" && sender.cells(24,row) != "" && sender.cells(26,row) != "") {
				var total = nilaiToFloat(sender.cells(28,row)) + nilaiToFloat(sender.cells(30,row)) + nilaiToFloat(sender.cells(8,row)) + nilaiToFloat(sender.cells(10,row)) + 
				            nilaiToFloat(sender.cells(12,row)) + nilaiToFloat(sender.cells(14,row)) + nilaiToFloat(sender.cells(16,row)) + nilaiToFloat(sender.cells(18,row)) + nilaiToFloat(sender.cells(20,row)) + 
							nilaiToFloat(sender.cells(22,row)) + nilaiToFloat(sender.cells(24,row)) + nilaiToFloat(sender.cells(26,row));
				sender.cells(31,row,floatToNilai(total));	
			}	
			
			sender.validasi();
		}	
	}
});