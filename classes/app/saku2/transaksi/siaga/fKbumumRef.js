window.app_saku2_transaksi_siaga_fKbumumRef = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKbumumRef.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKbumumRef";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Referensi Jurnal KasBank Umum: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");	
		this.cb_kode = new saiCBBL(this,{bound:[20,10,220,20],caption:"No Referensi",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Deskripsi", maxLength:150});				
		this.e_debet = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Total Debet (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_kredit = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Total Kredit (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sls = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Selisih (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,990,360],caption:"Data Item Jurnal"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:11,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Mt Uang","Kurs","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Atensi"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,100,50,100,100,250,40,40,50,150,80]],					
					columnReadOnly:[true,[1,2,7,9],[0,3,4,5,6,8,10]],
					buttonStyle:[[0,4,8],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[3,6,7],[cfNilai,cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;				
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKbumumRef.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKbumumRef.implement({
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
					sql.add("insert into gr_kasref_m (no_ref,keterangan,kode_lokasi) values  "+
							"('"+this.cb_kode.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){							
								sql.add("insert into gr_kasref_j (no_ref,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_lokasi,kode_curr,kurs,nilai_curr,ref1) values "+
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(4,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(8,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(10,i)+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kasref_m where no_ref = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("delete from gr_kasref_j where no_ref = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					
					sql.add("insert into gr_kasref_m (no_ref,keterangan,kode_lokasi) values  "+
							"('"+this.cb_kode.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){							
								sql.add("insert into gr_kasref_j (no_ref,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_lokasi,kode_curr,kurs,nilai_curr,ref1) values "+
										"('"+this.cb_kode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(4,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.sg.cells(8,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(10,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_kasref_m where no_ref = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("delete from gr_kasref_j where no_ref = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :						
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;								
							}
						}
					}
				}
				if (!akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan");
					return false;						
				}				
				this.sg.validasi();							
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) < 0 || nilaiToFloat(this.e_kredit.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs,Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				this.simpan();
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
	doChange: function(sender){
		if (this.cb_kode.getText() != ""){
			var data = this.dbLib.getDataProvider("select keterangan from gr_kasref_m where no_ref='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_ket.setText(line.keterangan);	
					var data = this.dbLib.getDataProvider(
								"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_curr,a.kurs,a.kode_pp,c.nama as nama_pp,a.ref1 "+
								"from gr_kasref_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
								"where a.no_ref = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_curr,floatToNilai(line.kurs),line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.ref1]);
						}
					} else this.sg.clear(1);
					setTipeButton(tbUbahHapus);
				}
				else{
					setTipeButton(tbSimpan);
				}
			}
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 3 || col == 4 || col == 6) {			
			if (this.sg.cells(3,row) != "" && this.sg.cells(6,row) != "") {			
				this.sg.cells(7,row,Math.round(nilaiToFloat(this.sg.cells(3,row)) * nilaiToFloat(this.sg.cells(6,row))));
				this.sg.validasi();
			}			
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select kode_curr from masakun where kode_akun = '"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						this.sg.cells(2,row,line.kode_curr);
						if (line.kode_curr == "IDR") this.sg.cells(3,row,"1");
						else this.sg.cells(3,row,"0");
					} else {
						this.sg.cells(2,row,"IDR");
						this.sg.cells(3,row,"1");
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var pp = this.dataPP.get(sender.cells(8,row));
				if (pp) sender.cells(9,row,pp);
				else {
					if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode PP "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(8,row,"");
					sender.cells(9,row,"");
				}
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != "" && this.sg.cells(6,i) != ""){
					this.sg.cells(7,i,floatToNilai(nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(6,i))));
					if (this.sg.cells(4,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(7,i));
					if (this.sg.cells(4,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(7,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			var sls = totD - totC;
			this.e_sls.setText(floatToNilai(sls));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 4 : 
					if (this.sg.cells(4,row) == ""){
						this.sg.setCell(4,row,"D");						
					}
				break;
			case 5 : 
					if (this.sg.cells(5,row) == ""){
						if (row == 0) this.sg.setCell(5,row,this.e_ket.getText());
						else this.sg.setCell(5,row,this.sg.cells(5,(row-1)) );
					}
				break;						
			case 6 : 
					if (this.sg.cells(6,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(6,row,floatToNilai(sls));
					}
				break;
			case 8 : 
					if ((this.sg.cells(8,row) == "") && (row > 0)) {
						this.sg.setCell(8,row,this.sg.cells(8,(row-1)));
						this.sg.setCell(9,row,this.sg.cells(9,(row-1)));
					}
					else {
						this.sg.setCell(8,row,this.app._kodePP);
						this.sg.setCell(9,row,this.app._namaPP);
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Referensi KB",sender,undefined, 
											  "select no_ref, keterangan  from gr_kasref_m  where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_ref) from gr_kasref_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_ref","nama"],"and",["No Bukti","Nama"],false);				
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.cb_kode.getText()+")","");							
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