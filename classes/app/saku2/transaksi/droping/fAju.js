window.app_saku2_transaksi_droping_fAju = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_droping_fAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_droping_fAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permintaan Droping: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_local = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Permintaan Local", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_tak = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Permintaan TAK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_setuju = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[700,19,220,20],caption:"Total Permintaan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,320], childPage:["Item Permintaan","Data Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Kode Lokasi","Nama Lokasi","Kode Akun","Nama Akun","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,80,100,80,100,200,150,80,100,80]],					
					columnReadOnly:[true,[1,3,7,9],[0,2,4,5,6,8]],
					buttonStyle:[[0,2,6,8],[bsEllips,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[5],[cfNilai]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Lokasi","Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80,80]],
					readOnly:true,colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_setuju.setText(line.flag,line.nama);
			} else this.cb_setuju.setText("","");		
			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where nik = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pemegang",true);
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Menyetujui",true);						
			
			var data = this.dbLib.getDataProvider("select kode_bidang from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif ='1'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kode_bidang = line.kode_bidang;
			} else this.kode_bidang = "-";
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' or kode_lokasi='99'");
			sql.add("select kode_pp, nama from pp where (kode_lokasi='"+this.app._lokasi+"' or kode_lokasi='99') and kode_bidang='"+this.kode_bidang+"' and flag_aktif ='1'");
			this.dbLib.getMultiDataProviderA(sql);							
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_droping_fAju.extend(window.childForm);
window.app_saku2_transaksi_droping_fAju.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_aju_m","no_aju",this.app._lokasi+"-AJU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					sql.add("insert into yk_aju_m(no_aju,no_dokumen,tanggal,keterangan,nik_buat,nik_setuju,kode_lokasi,kode_pp,nilai,progress,periode,nik_user,tgl_input,no_kas) values "+
						    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"',"+parseNilai(this.e_nilai.getText())+",'0','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_aju_j(no_aju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc ,nilai,kode_pp,kode_drk,kode_lokasi,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','D',"+parseNilai(this.sg.cells(5,i))+",'"+this.sg.cells(6,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){							
								sql.add("insert into angg_cash(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','AJU','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.sg2.cells(7,i))+","+parseNilai(this.sg2.cells(8,i))+")");
							}
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
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				this.sg.validasi();
				this.doHitungGar();
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(8,i))>0 && nilaiToFloat(this.sg2.cells(7,i)) < nilaiToFloat(this.sg2.cells(8,i))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total pengajuan tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
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
		this.e_nb.setText("");		
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_aju_m","no_aju",this.app._lokasi+"-AJU"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doChangeCell: function(sender, col, row){
		if ((col == 5) && (sender.cells(5,row) != "")) sender.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var lokasi = this.dataLokasi.get(sender.cells(0,row));
				if (lokasi) sender.cells(1,row,lokasi);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Lokasi "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkLokasi");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 2) {
			if (sender.cells(2,row) != "") {
				var akun = this.dataAkun.get(sender.cells(2,row));
				if (akun) sender.cells(3,row,akun);
				else {                                    
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Akun "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}
				sender.cells(8,row,"");
				sender.cells(9,row,"");
			}
		}
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}
				sender.cells(8,row,"");
				sender.cells(9,row,"");
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(2,row)+"' and b.kode_pp = '"+sender.cells(6,row)+"' and a.kode_lokasi='"+sender.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(2,row)+"' and b.kode_pp = '"+sender.cells(6,row)+"' and b.kode_drk = '"+sender.cells(8,row)+"' and a.kode_lokasi='"+sender.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(9,row,line.nama);
					else {
						if (!isAda) sender.cells(9,row,"-");
						else {
							sender.cells(8,row,"");
							sender.cells(9,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},	
	doNilaiChange: function(){
		try{
			var tot1 = tot2 = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					if (this.sg.cells(0,i) == this.app._lokasi) tot1 += nilaiToFloat(this.sg.cells(5,i));						
					else tot2 += nilaiToFloat(this.sg.cells(5,i));						
				}
			}				
			this.e_local.setText(floatToNilai(tot1));
			this.e_tak.setText(floatToNilai(tot2));
			this.e_nilai.setText(floatToNilai(tot1+tot2));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 0 : 
					if (sender.cells(0,row) == ""){
						if (row == 0) sender.setCell(0,row,this.app._lokasi);
						else sender.setCell(0,row,sender.cells(0,(row-1)) );
					}
				break;			
			case 4 : 
					if (sender.cells(4,row) == ""){
						if (row == 0) sender.setCell(4,row,this.e_ket.getText());
						else sender.setCell(4,row,sender.cells(4,(row-1)) );
					}
				break;			
			case 6 : 
					if ((sender.cells(0,row) == sender.cells(0,row-1)) && (sender.cells(6,row) == "") && (row > 0)) {
						sender.setCell(6,row,sender.cells(6,(row-1)));
						sender.setCell(7,row,sender.cells(7,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
												  "select kode_lokasi,nama    from lokasi where kode_lokasi = '"+this.app._lokasi+"' or kode_lokasi ='99'",
												  "select count(kode_lokasi)  from lokasi where kode_lokasi = '"+this.app._lokasi+"' or kode_lokasi ='99'",
												  ["kode_lokasi","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+sender.cells(0,row)+"' and tipe='posting' and kode_bidang='"+this.kode_bidang+"' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+sender.cells(0,row)+"' and tipe='posting' and kode_bidang='"+this.kode_bidang+"' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(2,row)+"' and b.kode_pp = '"+sender.cells(6,row)+"' and a.kode_lokasi='"+sender.cells(0,row)+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(2,row)+"' and b.kode_pp = '"+sender.cells(6,row)+"' and a.kode_lokasi='"+sender.cells(0,row)+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(2,row)+"' and b.kode_pp = '"+sender.cells(6,row)+"' and a.kode_lokasi='"+sender.cells(0,row)+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(6,i) != "-" && this.sg.cells(8,i)!= "-"){				
				nilai = nilaiToFloat(this.sg.cells(5,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(2,i) == this.sg2.cells(1,j) && this.sg.cells(6,i) == this.sg2.cells(3,j) && this.sg.cells(8,i) == this.sg2.cells(5,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),this.sg.cells(9,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(8,idx));
					total = total + nilai;
					this.sg2.setCell(8,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(0,i) == this.app._lokasi)
				var data = this.dbLib.getDataProvider("select fn_cekagg4('"+this.sg2.cells(3,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(3,i)+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"') as gar ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(7,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(8,i));
				this.sg2.cells(9,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataLokasi = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataLokasi.set(line.kode_lokasi, line.nama);
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
	}
});