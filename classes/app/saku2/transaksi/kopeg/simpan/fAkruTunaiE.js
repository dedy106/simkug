window.app_saku2_transaksi_kopeg_simpan_fAkruTunaiE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_simpan_fAkruTunaiE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_simpan_fAkruTunaiE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan Tunai: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});								
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",multiSelection:false,tag:2});				
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Anggota",tag:1,readOnly:true});						
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,17,200,20],caption:"Nilai Akru",tipeText:ttNilai,text:"0",readOnly: true});		
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,308],caption:"Daftar Akru Kartu Simpanan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:9,tag:2,
		            colTitle:["No Kartu","Tgl Awal Tagih","Kode","Anggota","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,80,150,50,150,70,70,100]],colFormat:[[8],[cfNilai]], 
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[8]],autoAppend:false,change:[this,"doChangeCell"],
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_simpan_fAkruTunaiE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_simpan_fAkruTunaiE.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();                	
					sql.add("delete from kop_simpbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from kop_simpbill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("update a set a.periode_gen = b.periode "+
					        "from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add("delete from kop_simp_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					
					sql.add("insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'TUNAI')");
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
			case "ubah" :	
			    this.tot = nilaiToFloat(this.e_nilai.getText());
				if (this.tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pengakuan tidak boleh kurang dari atau sama dengan nol.");
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_simpbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from kop_simpbill_j where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("update a set a.periode_gen = b.periode "+
					        "from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi where b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add("delete from kop_simp_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;						
		}
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText() != "") {
			this.e_nb.setSQL("select no_bill, keterangan from kop_simpbill_m where modul = 'TUNAI' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select no_dokumen,convert(varchar,tanggal,103) as tanggal,periode,keterangan,nik_app "+
			           "from kop_simpbill_m "+			           
					   "where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_app.setText(line.nik_app);
				} 
			}
			this.sg1.clear(1);			
			var strSQL = "select x.no_simp,convert(varchar,x.tgl_tagih,103) as tgl_tagih,y.kode_agg,y.nama as nama_agg,x.jenis,a.kode_simp+' - '+a.nama as nama_simp,a.akun_ar,a.akun_simp,x.nilai "+
						 " from kop_simp_m x inner join kop_simp_d zz on x.no_simp=zz.no_simp and x.kode_lokasi=zz.kode_lokasi "+
						 "      inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						 "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						 "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						 "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						 
						 " where zz.kode_lokasi = '"+this.app._lokasi+"' and  zz.no_bill='"+this.e_nb.getText()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_simp,line.tgl_tagih,line.kode_agg,line.nama_agg,line.jenis,line.nama_simp,line.akun_ar,line.akun_simp,floatToNilai(parseFloat(line.nilai))]);
				}
			} else this.sg1.clear(1);											
			this.cb_agg.setText(line.kode_agg,line.nama_agg);
			this.sg1.validasi();
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