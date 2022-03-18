window.app_kopeg_simpanan_transaksi_fAkruBatal = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAkruBatal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAkruBatal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Angsuran Simpanan: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Batal",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:1,change:[this,"doChange"]});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"No Kartu",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false});
		this.bTampil = new portalui_button(this,{bound:[280,18,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Batal Akru",tipeText:ttNilai,readOnly: true, tag:1,change:[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,290],caption:"Daftar Tagihan Simpanan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,265],colCount:9,tag:2,
				    colTitle:["Status","No Kartu","Jenis","No Bukti","Keterangan","Periode","Akun Piut.","Akun Simp.","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,120,80,120,170,60,60,60,100]],colFormat:[[8],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["BATAL","AKRU"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8],[0]],change:[this,"doChangeCell"],autoAppend:false,
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
window.app_kopeg_simpanan_transaksi_fAkruBatal.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAkruBatal.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpangs_m","no_angs",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("insert into kop_simpangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,no_spb) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_tot.getText())+",0,0,'AKRUBTL','1','-','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'-')");
					
					var idx = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "BATAL") {
								sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(7,i)+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.sg.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','AKRU_SIMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
								idx++;
								sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(6,i)+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','AKRU_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
								idx++;
								sql.add("insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_ar,nilai,kode_lokasi,dc) values "+
									    "('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(6,i)+"',"+parseNilai(this.sg.cells(8,i))+",'"+this.app._lokasi+"','C')");
							}
						}
					}						
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_tot.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pembatalan akru tidak boleh kurang/sama dgn 0.");
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
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpangs_m","no_angs",this.app._lokasi+"-BTL"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_simp.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_simp,a.jenis,b.nilai as saldo,b.akun_ar,b.akun_simp,b.periode,b.no_bill,c.keterangan as ket "+
                                                      "from  kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi "+
													  "                   inner join kop_simpbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi and c.no_del='-' "+									                  
													  "         left outer join "+  
									                  "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(y.nilai) as bayar "+
									                  "               from kop_simpangs_d y inner join kop_simpangs_m x on y.no_angs=x.no_angs and y.kode_lokasi=x.kode_lokasi "+
									                  "               where y.no_simp = '"+this.cb_simp.getText()+"' and x.no_del='-' "+
									                  "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+
													  "where  a.no_simp = '"+this.cb_simp.getText()+"' and b.nilai>0 and d.bayar is null and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp,b.periode");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["AKRU",line.no_simp,line.jenis,line.no_bill,line.ket,line.periode,line.akun_ar,line.akun_simp,floatToNilai(line.saldo)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Kartu simpanan tidak valid.","Kartu Simpanan harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_simp) {				
				this.standarLib.showListData(this,"Daftar Kartu Simpanan",sender,undefined, 
											  "select a.no_simp, b.nama as kode_simp  from kop_simp_m a inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_agg='"+this.cb_agg.getText()+"'",
											  "select count(no_simp) from kop_simp_m where kode_lokasi='"+this.app._lokasi+"' and kode_agg='"+this.cb_agg.getText()+"'",
											  ["no_simp","kode_simp"],"and",["No Kartu","Jenis"],false);				
				this.sg.clear(1);
			}
			if (sender == this.cb_agg) {				
				this.standarLib.showListData(this,"Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
				this.cb_simp.setText("");
				this.sg.clear(1);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
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
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "BATAL")&&(this.sg.cells(8,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(8,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
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