window.app_saku2_transaksi_aka_fTagihanE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fTagihanE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fTagihanE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan Mahasiswa : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_drk = new saiCBBL(this,{bound:[20,15,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});
		this.cb_nim = new saiCBBL(this,{bound:[20,18,200,20],caption:"Mahasiswa",readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[660,18,200,20],caption:"Nilai Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,840,303],caption:"Data Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:0,
		            colTitle:["Kode Produk","Nama Produk","Akun Piutang","Akun Pdpt","Akun Pdd","Nilai Tagihan"],
					colWidth:[[5,4,3,2,1,0],[100,80,80,80,350,80]],
					colFormat:[[5],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4],[5]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});	
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.pp = "";
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fTagihanE.extend(window.childForm);
window.app_saku2_transaksi_aka_fTagihanE.implement({
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
					sql.add("delete from aka_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_bill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
	
					sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.pp+"','"+this.cb_drk.getText()+"','TAGIH','F','"+this.app._userLog+"',getdate())");
					var akunCR = ""; var jenis = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){			
							if (this.sg.cells(0,i) == "BPP") {
								akunCR = this.sg.cells(4,i);
								jenis = "BPP";
							} 
							else {
								akunCR = this.sg.cells(3,i);
								jenis = "PDPT";
							} 
							sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(2,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(5,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','TAGIH','PIUT"+jenis+"','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");
							sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+akunCR+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(5,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','TAGIH','"+jenis+"','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");
							sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+'-'+this.cb_nim.getText()+"','"+this.cb_nim.getText()+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+",'"+this.e_periode.getText()+"')");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data produk untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tagihan tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from aka_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_bill_j where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			this.e_nb.setSQL("select no_bill, keterangan from aka_bill_m where posted ='F' and jenis = 'TAGIH' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Load","Deskripsi"],"and","Daftar Bukti Load Billing",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select distinct convert(varchar,tanggal,103) as tanggal,a.keterangan,a.kode_pp,a.kode_drk,c.nama as nama_drk,b.nim,d.nama as mhs,a.periode "+
					   "from aka_bill_m a "+
			           "	inner join aka_bill_d b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+
					   "	inner join aka_mahasiswa d on b.nim=d.nim and a.kode_lokasi=d.kode_lokasi "+
			           "	inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun = '"+this.e_periode.getText().substr(0,4)+"' "+
					   "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.pp = line.kode_pp;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_nim.setText(line.nim,line.mhs);
					this.cb_drk.setText(line.kode_drk,line.nama_drk);
				} 
			}
			var data = this.dbLib.getDataProvider("select a.kode_produk,b.nama,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai "+
			           "from aka_bill_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_produk,line.nama,line.akun_piutang,line.akun_pdpt,line.akun_pdd,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Produk",sender,undefined, 
												  "select kode_produk,nama,akun_piutang,akun_pdpt,akun_pdd from aka_produk where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_produk) from aka_produk where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_produk","nama","akun_piutang","akun_pdpt","akun_pdd"],"and",["Kode","Nama","Akun Piutang","Akun Pdpt","Akun Pdd"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				this.sg.cells(2,row,this.sg.dataFromList[2]);
				this.sg.cells(3,row,this.sg.dataFromList[3]);
				this.sg.cells(4,row,this.sg.dataFromList[4]);
			}
			else
			{
				this.sg.cells(2,row,"");
				this.sg.cells(3,row,"");
				this.sg.cells(4,row,"");
			}
		}
		if (col == 5) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var totP = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					totP += nilaiToFloat(this.sg.cells(5,i));
				}
			}
			this.e_nilai.setText(floatToNilai(totP));
		}catch(e){
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});