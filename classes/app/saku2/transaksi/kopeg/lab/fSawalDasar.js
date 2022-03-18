window.app_saku2_transaksi_kopeg_lab_fSawalDasar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fSawalDasar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fSawalDasar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Saldo Awal: Input-Edit", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;portalui_saiMemo");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,21,202,20],caption:"Periode",tag:2,visible:false});
		this.cb_tugas = new saiCBBL(this,{bound:[20,21,222,20],caption:"Tugas",multiSelection:false, maxLength:10, tag:2,change:[this,"doChange2"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_dosen = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Dosen",tag:2,readOnly:true});
		this.e_kajian = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Kajian",tag:2,readOnly:true});
		this.e_matkul = new portalui_saiLabelEdit(this,{bound:[20,16,400,20],caption:"Mata Kuliah",tag:2,readOnly:true});
		this.e_debet = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Kelas",tag:2,readOnly:true});		
		this.e_kredit = new saiLabelEdit(this,{bound:[700,15,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Mahasiswa","Deskripsi Tugas","Detail Tugas","Data Saldo Awal"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:2,
		            colTitle:["N I M","Nama"],
					colWidth:[[1,0],[300,80]],					
					readOnly:true,autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1});		

		this.e_range = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[5,11,400,20],caption:"Range Tanggal",tag:2,readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,10,this.pc1.width-10,this.pc1.height-40],caption:"",labelWidth:0, tag:2});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:2,
		            colTitle:["Tanggal","Deskripsi","Jenis"],
					colWidth:[[2,1,0],[80,550,100]],						
					readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});						
		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:9,
		            colTitle:["Kode Akun","Nama","DC","Nilai"],
					colWidth:[[3,2,1,0],[100,80,300,100]],					
					columnReadOnly:[true,[1],[0,2,3]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[3],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1,pasteEnable:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg, pager:[this,"selectPage"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.e_memo.setReadOnly(true);
			
			this.cb_tugas.setSQL("select no_tugas, nama from lab_tugas where kode_dosen='"+this.app._userLog+"' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fSawalDasar.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fSawalDasar.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from lab_ju_m where jenis='SALDO' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"'");
					sql.add("delete from lab_ju_j where jenis='SALDO' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"'");
					sql.add("delete from lab_gldt where jenis='SALDO' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"'");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								var j = i+1;
								sql.add("insert into lab_ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_tugas,tgl_input,nik_user) values "+
										"('"+this.cb_tugas.getText()+"."+j+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','-','-','JU','SALDO','IDR',1,"+parseNilai(this.e_debet.getText())+",'-','-','T','"+this.cb_tugas.getText()+"',getdate(),'"+this.sg1.cells(0,i)+"')");
								
								for (var a=0;a < this.sg.getRowCount();a++){
									if (this.sg.rowValid(a)){
										sql.add("insert into lab_ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,no_tugas,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
												"('"+this.cb_tugas.getText()+"."+a+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,a)+"','SALDO AWAL','"+this.sg.cells(2,a).toUpperCase()+"',"+parseNilai(this.sg.cells(3,a))+",'-','-','"+this.cb_tugas.getText()+"','"+this.app._lokasi+"','JU','SALDO','"+this.e_periode.getText()+"','IDR',1,'"+this.sg1.cells(0,i)+"',getdate())");
									}
								}
							
							}
						}
					}
					
					
					sql.add("insert into lab_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,no_tugas) "+
							"select no_ju,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai,tgl_input,nik_user,no_tugas "+
							"from lab_ju_j "+
							"where kode_lokasi='"+this.app._lokasi+"' and jenis='SALDO' and no_tugas='"+this.cb_tugas.getText()+"'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); //this.sg1.clear(1); this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				var data = this.dbLib.getDataProvider("select no_tugas from lab_tugas where '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line == undefined){
						system.alert(this,"Transaksi tidak valid.","Tanggal transaksi tidak dalam range tugas (Tanggal "+this.e_range.getText()+").");
						return false;						
					} 
				}			
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}				 
				else
				this.simpan();
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
	},
	doChange2: function(sender){
		if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.keterangan,b.nama as dosen,c.matkul,d.nama as kelas,d.kode_kelas,c.nama+'-'+c.keterangan as kajian, convert(varchar,a.tgl_awal,103)+' - '+convert(varchar,a.tgl_akhir,103) as tgl_range "+
					   "from lab_tugas a inner join lab_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul and a.kode_lokasi=c.kode_lokasi "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_dosen.setText(line.dosen);
					this.e_kajian.setText(line.kajian);
					this.e_matkul.setText(line.matkul);
					this.e_kelas.setText(line.kelas);	
					this.e_range.setText(line.tgl_range);					
					this.e_memo.setText(line.keterangan);
					this.kodeKelas = line.kode_kelas;
				} 
			}			
			var data = this.dbLib.getDataProvider("select tanggal,keterangan,jenis from lab_tugas_d where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.tanggal,line.keterangan,line.jenis]);
				}
			} else this.sg2.clear(1);			
			var data = this.dbLib.getDataProvider("select a.nim,a.nama from lab_mhs a inner join lab_kelas_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
			           "where b.kode_kelas='"+this.kodeKelas+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.nim,line.nama]);
				}
			} else this.sg1.clear(1);
		
			
			var sql = new server_util_arrayList();
			sql.add("select kode_akun,nama from lab_masakun where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' group by kode_akun,nama");
			this.dbLib.getMultiDataProviderA(sql);			
			
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama,a.dc,a.nilai "+
			           "from lab_ju_j a inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user "+
			           "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='SALDO' and a.nik_user='"+this.sg1.cells(0,1)+"' "+
					   "order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama,line.dc,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_tugas.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
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
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 3) && (this.sg.cells(3,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(3,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(3,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select distinct kode_akun,nama from lab_masakun where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(distinct kode_akun) from lab_masakun where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});

