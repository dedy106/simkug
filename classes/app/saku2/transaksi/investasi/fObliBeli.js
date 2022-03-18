window.app_saku2_transaksi_investasi_fObliBeli = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_investasi_fObliBeli.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fObliBeli";
		this.itemsValue = new arrayList(); 
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembelian Obligasi: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,222,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.e_pph = new saiLabelEdit(this,{bound:[710,10,200,20],caption:"Total PPh", tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_obligor = new saiCBBL(this,{bound:[20,12,200,20],caption:"Obligor", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_nilai = new saiLabelEdit(this,{bound:[710,12,200,20],caption:"Tot Net Pembelian", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Pembelian Obligasi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:0,				
				colTitle:["Obligasi","Nama","Jenis","Akun Obligasi","Akun Piu Kupon","Tgl Mulai","Tgl Selesai","% Kupon","Basis","Nilai Nominal","Piutang Kupon",
				          "Nilai Oleh","Nilai PPh","Total","Selisih","Kode Broker","Nama"],				
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,80,100,100,80,100,100,100,70,70,70,70,80,80,70,200,80]],
				columnReadOnly:[true,[0,1,3,4,13,14,15,16],[2,5,6,7,8,9,10,11,12]],
				colFormat:[[7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				buttonStyle:[[0,2,5,6,15],[bsEllips,bsAuto,bsDate,bsDate,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				picklist:[[2],[new portalui_arrayMap({items:["HTM","AFS"]})]],checkItem: true,
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
				
		this.rearrangeChild(10, 23);
				
		//HTM = Dimiliki Hingga Jatuh Tempo
		//AFS = Tersedia Untuk Dijual
		//LR = Pinjaman Yang diberikan dan Piutang
		//FVTPL = Diukur pada Nilai Wajar Melalui Laporan LabaRugi
					
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_obligor.setSQL("select kode_obligor, nama from inv_obligor",["kode_obligor","nama"],false,["Kode","Nama"],"where","Daftar Obligor",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPINV','OBLHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																						
					if (line.kode_spro == "OBLHUT") this.akunHutang = line.flag;			
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;			
				}
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fObliBeli.extend(window.childForm);
window.app_saku2_transaksi_investasi_fObliBeli.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
				
					sql.add("insert into inv_oblibeli_m(no_beli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,no_dokumen,keterangan,kode_drk,kode_obligor) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'F','-','0','"+this.cb_buat.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_obligor.getText()+"')");
					
					//hutang di jurnal full, pph di kasbank
					var nilai = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_pph.getText());
					sql.add("insert into inv_oblibeli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLBELI','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(13,i) != ""){							
							sql.add("insert into inv_oblibeli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(3,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(11,i))+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLBELI','OBLIGASI','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							if (this.sg.cells(10,i) != "0") {
								sql.add("insert into inv_oblibeli_j(no_beli,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sg.cells(10,i))+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLBELI','PIUKUPON','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
							var datax = this.dbLib.getDataProvider("select datediff (day ,'"+this.sg.getCellDateValue(5,i)+"','"+this.sg.getCellDateValue(6,i)+"') as jml ",true);
							if (typeof datax == "object" && datax.rs.rows[0] != undefined){
								var linex = datax.rs.rows[0];							
								var jmlhari = linex.jml;
							}		
							sql.add("insert into inv_obli_d(no_beli,kode_lokasi,kode_jenis,status,akun_obligasi,akun_piukupon,nilai,nilai_beli,nilai_piukupon,tgl_mulai,tgl_selesai,jml_hari,tgl_akru,tgl_akru_seb,rate,basis,nilai_buku,tgl_akru_kupon,tgl_akru_kupon_seb,no_cair_piukupon,no_oblijual,pph,kode_broker) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(10,i))+",'"+this.sg.getCellDateValue(5,i)+"','"+this.sg.getCellDateValue(6,i)+"',"+jmlhari+",'"+this.sg.getCellDateValue(5,i)+"','"+this.sg.getCellDateValue(5,i)+"',"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(11,i))+",'"+this.sg.getCellDateValue(5,i)+"','"+this.sg.getCellDateValue(5,i)+"','-','-',"+nilaiToFloat(this.sg.cells(12,i))+",'"+this.sg.cells(15,i)+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					this.sg.clear(1);
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
				break;
			case "simpan" :					
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		this.doClick(this.i_gen);
	},
	doChange:function(sender){		
		if (sender == this.cb_obligor && this.cb_obligor.getText()!="") {
			this.sg.clear(1);						
		}		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_oblibeli_m","no_beli",this.app._lokasi+"-OBB"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_obligor.getText()!=""){
					this.standarLib.showListData(this, "Daftar Jenis Obligasi",sender,undefined, 
												  "select kode_jenis, nama  from inv_oblijenis where kode_obligor='"+this.cb_obligor.getText()+"'",
												  "select count(kode_jenis) from inv_oblijenis where kode_obligor='"+this.cb_obligor.getText()+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 15){
					this.standarLib.showListData(this, "Daftar Broker",sender,undefined, 
												  "select kode_broker, nama  from inv_broker",
												  "select count(kode_broker) from inv_broker",
												  ["kode_broker","nama"],"where",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {			
			var strSQL = "select a.akun_obligasi,a.akun_piukupon from inv_obligor a inner join inv_oblijenis b on a.kode_obligor=b.kode_obligor where b.kode_jenis='"+this.sg.cells(0,row)+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg.cells(2,row,"AFS");	
					this.sg.cells(3,row,line.akun_obligasi);
					this.sg.cells(4,row,line.akun_piukupon);
					this.sg.cells(5,row,this.dp_d1.getText());	
					this.sg.cells(6,row,this.dp_d1.getText());	
					this.sg.cells(7,row,"0");	
					this.sg.cells(8,row,"365");	
					this.sg.cells(9,row,"0");	
					this.sg.cells(10,row,"0");	
					this.sg.cells(11,row,"0");	
					this.sg.cells(12,row,"0");	
					this.sg.cells(13,row,"0");	
					this.sg.cells(14,row,"0");	
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");
					this.sg.cells(4,row,"");
					this.sg.cells(5,row,this.dp_d1.getText());	
					this.sg.cells(6,row,this.dp_d1.getText());	
					this.sg.cells(7,row,"0");	
					this.sg.cells(8,row,"365");	
					this.sg.cells(9,row,"0");	
					this.sg.cells(10,row,"0");	
					this.sg.cells(11,row,"0");	
					this.sg.cells(12,row,"0");	
					this.sg.cells(13,row,"0");	
					this.sg.cells(14,row,"0");	
				}
			}			
		}			
		if (col == 10 || col == 11 || col == 12) {
			if (this.sg.cells(10,row) != "" && this.sg.cells(11,row) != "" && this.sg.cells(12,row) != "") {				
				this.sg.cells(13,row,parseFloat(nilaiToFloat(this.sg.cells(10,row)) + nilaiToFloat(this.sg.cells(11,row)) - nilaiToFloat(this.sg.cells(12,row))));
			}		
			this.sg.validasi();
		}
		if (col == 9 || col == 11) {
			if (this.sg.cells(9,row) != "" && this.sg.cells(11,row) != "") {				
				this.sg.cells(14,row,parseFloat(nilaiToFloat(this.sg.cells(9,row)) - nilaiToFloat(this.sg.cells(11,row))));
			}
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{						
			var tot = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(12,i) != "" && this.sg.cells(13,i) != ""){
					pph += nilaiToFloat(this.sg.cells(12,i));
					tot += nilaiToFloat(this.sg.cells(13,i));
				}
			}			
			this.e_pph.setText(floatToNilai(pph));									
			this.e_nilai.setText(floatToNilai(tot));	
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});