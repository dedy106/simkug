window.app_saku3_transaksi_sapyakes_fDepoMI = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fDepoMI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fDepoMI";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan Deposito MI", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Deposito","List Deposito"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,				
				colTitle:["No Deposito","Keterangan","Tgl Mulai","JthTempo","Bank Depo","Nama Bank","Nominal"],
				colWidth:[[6,5,4,3,2,1,0],[100,220,100,80,80,220,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[6],[cfNilai]],
				dblClick:[this,"doDoubleClick3"],defaultRow:1,autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});								
		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Posting SAP", multiSelection:false, maxLength:10, tag:2, visible:false});				

		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Jenis",items:["DOC","DEPOSITO"], readOnly:true,tag:2});		
		this.c_stsdana = new saiCB(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Status Dana",items:["DAKES"], readOnly:true,tag:2});		
		this.bsumber = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.bdepo = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Bank Deposito", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.bcair = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Bank Pencairan", multiSelection:false, maxLength:10, tag:2});				
		this.bbunga = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bank Bunga", multiSelection:false, maxLength:10, tag:2});						
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[270,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[370,11,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_jml = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jumlah Hari", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_pbunga = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,13,200,20],caption:"Rate [%Tahun]", tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Penempatan", tipeText:ttNilai, text:"0"});										
		this.e_basis = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,18,200,20],caption:"Basis [Hari]", tipeText:ttNilai, text:"0"});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate2(this.dp_d2,this.dp_d2.year,this.dp_d2.month,this.dp_d2.day);						
			
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola where jenis='MI'",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
			this.bsumber.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.bdepo.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.bcair.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);
			this.bbunga.setSQL("select kode_bank, nama+' - '+no_rek as nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"where","Daftar Bank",true);			
			
			//this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_app.setText(line.nik);
			}
							   
			this.c_jenis.setText("DOC");
			this.c_stsdana.setText("DAKES");
			
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('VENDORDEPO','SAPHDEPO') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "VENDORDEPO") this.vendorDepo = line.flag;
					if (line.kode_spro == "SAPHDEPO") this.akunHDepo = line.flag;								
				}
			}
			*/
			


			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fDepoMI.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fDepoMI.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_depo2_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					if (this.c_jenis.getText() == "DOC") {
						var jmlHari = nilaiToFloat(this.e_jml.getText());
						var jmlBulan = 0;
					}
					else {
						var jmlBulan = nilaiToFloat(this.e_jml.getText());
						var jmlHari = 0;
					}
					
					sql.add("insert into inv_shop_m (no_shop,periode,nik_user,tgl_input,kode_lokasi,tanggal,keterangan,nik_app,tgl_awal,tgl_akhir,jml_hari,jml_bulan,progress,nilai,no_app,no_spb,bsumber,  nodin,kepada1,dari1,lamp1,hal1,nikttd1,jab1,  noins,nikttd2,jab2,nikttd3,jab3,just,kode_pp,modul,posted,nik_sap) values "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"',"+jmlHari+","+jmlBulan+",'0',"+nilaiToFloat(this.e_nilai.getText())+",'-','-','-', '-','-','-','-','-','-','-','-','-','-','-','-','-','"+this.app._kodePP+"','MI','F','"+this.cb_app.getText()+"')");					
					
					//flag bayar langsung
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBDEPOTMP','BM','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','X','-','-','-','-')");																
					
					sql.add("insert into inv_depo2_m(no_depo,kode_lokasi,periode,tanggal,nik_user,tgl_input,no_kas,progress,tgl_akru_seb,tgl_akru,jenis,status_dana,no_bilyet,keterangan,tgl_mulai,tgl_selesai,jml_hari,basis,p_bunga,nilai,bsumber,bdepo,bcair,bbunga,akun_depo,akun_piutang,akun_pdpt,nik_buat,kode_kelola,no_shop,ref1,tgl_hitung,tgl_hitungseb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','0','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_jenis.getText()+"','"+this.c_stsdana.getText()+"','-','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',"+nilaiToFloat(this.e_jml.getText())+","+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_pbunga.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.bsumber.getText()+"','"+this.bdepo.getText()+"','"+this.bcair.getText()+"','"+this.bbunga.getText()+"','-','-','-','"+this.app._userLog+"','"+this.cb_kelola.getText()+"','"+this.e_nb.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d2.getDateString()+"')");
													
					sql.add("update a set a.akun_depo=b.akun_depo,a.akun_piutang=b.akun_piutang,a.akun_pdpt=b.akun_bunga "+
							"from inv_depo2_m a inner join inv_depo_param b on a.jenis=b.jenis and a.status_dana=b.status "+
							"where a.no_depo='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select '"+this.e_nb.getText()+"',0,kode_lokasi,'DEPO','DEPO','-',tanggal,akun_depo,'D',nilai,keterangan,'"+this.app._kodePP+"',periode,'-','IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','-' "+
							"from inv_depo2_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select '"+this.e_nb.getText()+"',0,kode_lokasi,'DEPO','BANK','-',tanggal,'"+this.akunBank+"','C',nilai,keterangan,'"+this.app._kodePP+"',periode,'-','IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','-' "+
							"from inv_depo2_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					
					//sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod) "+
					//		"select '"+this.e_nb.getText()+"',999,kode_lokasi,'DEPO','HUTDEPO','-',tanggal,'"+this.akunHDepo+"','C',nilai,keterangan,'"+this.app._kodePP+"',periode,'-','IDR',1,nilai,tgl_input,nik_user,'-','-','-','"+this.vendorDepo+"','-','-','-','R001','-','T' "+
					//		"from inv_depo2_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
					this.stsSimpan = 1;
					this.sg3.clear(1);
				break;
			case "simpan" :			
			case "ubah" :						
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
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
				else this.simpan();
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
					sql.add("delete from inv_depo2_m where no_depo='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shop_m where no_shop='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate2: function(sender, y,m,d){		
		if (sender == this.dp_d2) {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
		}
		if (this.stsSimpan==1) this.doClick(this.i_gen);
		
		var data = this.dbLib.getDataProvider("select datediff (day ,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"') as jml ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.e_jml.setText(floatToNilai(line.jml));			
			
			if (nilaiToFloat(this.e_jml.getText()) < 30 && this.e_periode.getText().substr(4,3) != "02") {
				this.c_jenis.setText("DOC");	
			}
			if (nilaiToFloat(this.e_jml.getText()) >= 30 && this.e_periode.getText().substr(4,3) != "02") {
				this.c_jenis.setText("DEPOSITO");	
			}
			
			if (nilaiToFloat(this.e_jml.getText()) < 28 && this.e_periode.getText().substr(4,3) == "02") {
				this.c_jenis.setText("DOC");	
			}
			if (nilaiToFloat(this.e_jml.getText()) >= 28 && this.e_periode.getText().substr(4,3) == "02") {
				this.c_jenis.setText("DEPOSITO");	
			}
		}
	},
	doChange:function(sender){		
		if (this.stsSimpan == 1) {			
			if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
				var strSQL = "select kode_bank from inv_bank where flag_default='1' and kode_kelola='"+this.cb_kelola.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.bsumber.setText(line.kode_bank);				
				}
				
				var strSQL = "select akun_bank from inv_kelola where kode_kelola='"+this.cb_kelola.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.akunBank = line.akun_bank;			
				}
				
			}
			if (sender == this.bsumber && this.bsumber.getText()!="") {
				this.bcair.setText(this.bsumber.getText());
				this.bbunga.setText(this.bsumber.getText());
			}
			if (sender == this.bdepo && this.bdepo.getText()!="") {
				var strSQL = "select a.jml_hari,a.p_bunga from inv_bank a inner join inv_bankklp b on a.kode_bankklp=b.kode_bankklp where a.kode_bank='"+this.bdepo.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.e_basis.setText(floatToNilai(line.jml_hari));
					this.e_pbunga.setText(floatToNilai(line.p_bunga));				
				} 
			}					
		}		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depo2_m","no_depo",this.app._lokasi+"-DEPO"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad3:function(sender){																									
		var strSQL = "select a.no_depo,convert(varchar,a.tgl_mulai,103) as mulai,convert(varchar,a.tgl_selesai,103) as selesai,a.keterangan,a.bdepo,b.nama as nama_bank,a.nilai,a.no_bilyet "+
			         "from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
					 "					 inner join inv_shop_m c on a.no_depo=c.no_shop "+
					 "					 inner join glsap d on a.no_depo=d.no_bukti and d.no_doksap='-' "+
					 "where c.modul='MI' and a.progress = '0' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.tgl_mulai";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page =1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_depo,line.keterangan,line.mulai,line.selesai,line.bdepo,line.nama_bank,floatToNilai(line.nilai)]);
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select a.*,b.nik_app from inv_depo2_m a inner join inv_shop_m b on a.no_depo=b.no_shop and a.kode_lokasi=b.kode_lokasi "+
				             "where a.no_depo= '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);
						this.cb_kelola.setText(line.kode_kelola);
						this.c_jenis.setText(line.jenis);
						this.c_stsdana.setText(line.status_dana);
						this.bsumber.setText(line.bsumber);
						this.bdepo.setText(line.bdepo);
						this.bcair.setText(line.bcair);
						this.bbunga.setText(line.bbunga);
						this.dp_d2.setText(line.tgl_mulai);
						this.dp_d3.setText(line.tgl_selesai);
						this.e_jml.setText(floatToNilai(line.jml_hari));
						this.e_pbunga.setText(floatToNilai(line.p_bunga));
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_basis.setText(floatToNilai(line.basis));
						this.cb_app.setText(line.nik_app);
					}
				}				
			}
		} catch(e) {alert(e);}		
	}
	
});