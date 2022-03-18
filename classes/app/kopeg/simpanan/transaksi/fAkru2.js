window.app_kopeg_simpanan_transaksi_fAkru2 = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAkru2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAkru2";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan Tunai: Input", 0);	
		
		uses("portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});								
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});				
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:2});				
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"No Kartu",btnClick:[this,"doBtnClick"],tag:9});				
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,18,200,20],caption:"Nilai Akru",tipeText:ttNilai,text:"0",readOnly: true});
		this.bTampil = new portalui_button(this,{bound:[610,18,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Akru Kartu Simpanan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:9,tag:2,
		            colTitle:["No Kartu","Tgl Awal Tagih","Kode","Nasabah","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,80,150,50,150,70,70,100]],colFormat:[[8],[cfNilai]], 
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[8]],autoAppend:false,change:[this,"doChangeCell"],
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fAkru2.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAkru2.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','TUNAI')");
					var idx = 0;
					var nosimp = [];
					var nosp = [];
					for (var i=0;i < this.sg1.getRowCount();i++){							
						if (this.sg1.rowValid(i) && this.sg1.cells(8,i)!="0"){
							idx++;
							sql.add("insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg1.cells(6,i)+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.sg1.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMPBILL','ARSIMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
							idx++;
							sql.add("insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg1.cells(7,i)+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg1.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMPBILL','APSIMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
							sql.add("insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc) values "+
									"('"+this.sg1.cells(0,i)+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg1.cells(8,i))+",'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"','D')");
							if (this.sg1.cells(4,i) != "SP") nosimp.push("'"+this.sg1.cells(0,i)+"'");
							else nosp.push("'"+this.sg1.cells(0,i)+"'");
						}
					}
					var pNext = getNextPeriode(this.e_periode.getText());
					if (nosimp != "") sql.add("update kop_simp_m set periode_gen ='"+pNext+"' where no_simp in ("+nosimp+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (nosp != "") sql.add("update kop_simp_m set periode_gen ='999999' where no_simp in ("+nosp+") and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","9"),this.e_nb);		
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	
			    this.tot = nilaiToFloat(this.e_nilai.getText());
				if (this.tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pengakuan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_agg.getText() != "") {
				if (this.cb_simp.getText() == "") var vFilter = "";
				else var vFilter = " and x.no_simp = '"+this.cb_simp.getText()+"' ";
				var data = this.dbLib.getDataProvider(" select x.no_simp,x.tgl_tagih,y.kode_agg,y.nama as nama_agg,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_ar,a.akun_simp,x.nilai "+
				           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and  x.kode_agg='"+this.cb_agg.getText()+"' "+vFilter);

				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_simp,line.tgl_tagih,line.kode_agg,line.nama_agg,line.jenis,line.nama_simp,line.akun_ar,line.akun_simp,floatToNilai(parseFloat(line.nilai))]);
					}
					this.sg1.validasi();
				}
			} 
			else {
				system.alert(this,"No Kartu Simpanan tidak valid.","No Kartu Simpanan harus dipilih.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_simp) {				
				this.standarLib.showListData(this,"Daftar Kartu Simpanan",sender,undefined, 
											  "select a.no_simp, b.nama as kode_simp  from kop_simp_m a inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_agg='"+this.cb_agg.getText()+"'",
											  "select count(no_simp) from kop_simp_m where kode_lokasi='"+this.app._lokasi+"' and kode_agg='"+this.cb_agg.getText()+"'",
											  ["no_simp","kode_simp"],"and",["No Kartu","Jenis"],false);				
				this.sg1.clear(1);
			}
			if (sender == this.cb_agg) {				
				this.standarLib.showListData(this,"Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
				this.cb_simp.setText("","");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChangeCell: function(sender, col, row){
		if (this.sg1.cells(8,i) != "") this.sg1.validasi();
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(8,i) != "") {
				tot1 += nilaiToFloat(this.sg1.cells(8,i));
			}
		}
		this.e_nilai.setText(floatToNilai(tot1));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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
	}
});