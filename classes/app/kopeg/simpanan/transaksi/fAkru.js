window.app_kopeg_simpanan_transaksi_fAkru = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAkru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAkru";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan: Input", 0);	
		
		uses("portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_sp = new portalui_saiLabelEdit(this,{bound:[710,13,200,20],caption:"Simp. Pokok",tipeText:ttNilai,text:"0",readOnly: true});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_sw = new portalui_saiLabelEdit(this,{bound:[710,14,200,20],caption:"Simp. Wajib",tipeText:ttNilai,text:"0",readOnly: true});
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});								
		this.e_ss = new portalui_saiLabelEdit(this,{bound:[710,15,200,20],caption:"Simp. Sukarela",tipeText:ttNilai,text:"0",readOnly: true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});				
		this.bTampil = new portalui_button(this,{bound:[829,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
	
		this.p2 = new portalui_panel(this,{bound:[20,35,900,200],caption:"Daftar Jurnal Akru Simpanan"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,898,175],colCount:9,
			    colWidth:[[0,1,2,3,4,5,6,7,8],[80,120,80,100,80,110,80,110,100]],
				colTitle:["Kode Loker","Nama Loker","Jenis","Nama Simp.","Akun Piut.","Nama Akun","Akun Simp.","Nama Akun","Total Akru"],
                colFormat:[[8],[cfNilai]],dblClick:[this,"doDblClick"],
                readOnly:true, defaultRow:1,nilaiChange:[this,"doSgChange"]}); 
		this.p1 = new portalui_panel(this,{bound:[20,30,900,343],caption:"Daftar Kartu Simpanan untuk Akrual"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,320],tag:"9"});		
		
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
window.app_kopeg_simpanan_transaksi_fAkru.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAkru.implement({
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
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','PGAJI')");
					var scr1 = "insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true;
					var line = undefined;
					var idx = 0;
					for (var i=0; i<this.sg2.rows.getLength(); i++){
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg2.cells(4,i)+
							 	"','"+this.e_desc.getText()+"','D',"+parseNilai(this.sg2.cells(8,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','SIMPBILL','ARSIMP','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						idx++;
						scr1 += ",";
						scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg2.cells(6,i)+
							 	"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg2.cells(8,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','SIMPBILL','APSIMP','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						baris1 = false;
						idx++;
					}					
					sql.add(scr1);					
					sql.add("insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc) "+
							"select x.no_simp,'"+this.e_nb.getText()+"',x.kode_lokasi,'"+this.e_periode.getText()+"',x.nilai,a.akun_ar,a.akun_simp,'D' "+
							"from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						    "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						    " where a.kode_lokasi = '"+this.app._lokasi+"' and x.status_aktif='1' and "+
						    "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='AUTODEBET')) and "+
						    "      x.periode_gen<='"+this.e_periode.getText()+"' and x.tgl_tagih <= '"+this.dp_d1.getDateString()+"'");
					var pNext = getNextPeriode(this.e_periode.getText());
					sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pNext+"' where a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi and b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis<>'SP' ");
					sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='999999' where a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi and b.no_bill='"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis='SP' ");
					
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg2.clear(1); this.sg1.clearAll();
				}
				break;
			case "simpan" :	
			    this.tot = nilaiToFloat(this.e_sp.getText()) + nilaiToFloat(this.e_sw.getText()) + nilaiToFloat(this.e_ss.getText());
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
			if (this.e_periode.getText() != "") {
				this.sg1.clearAll();
				var data = this.dbLib.getDataProvider("select xx.kode_loker,xx.nama as nama_loker,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_ar,b.nama as nama_ar,a.akun_simp,c.nama as nama_asimp,sum(x.nilai) as total "+
						   " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   "      inner join kop_loker xx on xx.kode_loker = y.kode_loker and xx.kode_lokasi=y.kode_lokasi "+
						   " where x.kode_lokasi = '"+this.app._lokasi+"' and x.status_aktif='1' and "+
						   "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='AUTODEBET')) and "+
						   "      x.periode_gen<='"+this.e_periode.getText()+"' and x.tgl_tagih <= '"+this.dp_d1.getDateString()+
						   "' group by xx.kode_loker,a.akun_ar,a.akun_simp order by xx.kode_loker,x.jenis,x.no_simp");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_loker,line.nama_loker,line.jenis,line.nama_simp,line.akun_ar,line.nama_ar,line.akun_simp,line.nama_asimp,floatToNilai(parseFloat(line.total))]);
					}
					this.sg2.validasi();
				}
			} 
			else {
				system.alert(this,"Periode harus valid.","Validasi field dari tanggal.");
				this.sg1.clearAll();
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
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDblClick: function(sender, col, row){
		if (this.sg2.getCell(0,row) != "") {
			this.sg1.setColTitle(new Array("No","No Kartu","Tgl Awal Tagih","Kode","Nasabah","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai","Posted","Periode"));				
			var data = this.dbLib.runSQL(" select x.no_simp,x.tgl_tagih,y.kode_agg,y.nama as nama_agg,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_ar,a.akun_simp,x.nilai "+
					   " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
					   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
					   " where y.kode_loker='"+this.sg2.getCell(0,row)+"' and  x.jenis='"+this.sg2.getCell(2,row)+"' and a.akun_ar='"+this.sg2.getCell(4,row)+"' and a.akun_simp='"+this.sg2.getCell(6,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and x.status_aktif='1' and "+
					   "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='AUTODEBET')) and "+
					   "      x.periode_gen<='"+this.e_periode.getText()+"' and x.tgl_tagih <= '"+this.dp_d1.getDateString()+"' order by x.jenis,x.no_simp");

			this.sg1.clearAll();
			this.sg1.setData(data);
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = tot3 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(8,i) != "") {
				if (this.sg2.cells(2,i) == "SP") tot1 += nilaiToFloat(this.sg2.cells(8,i));
				if (this.sg2.cells(2,i) == "SW") tot2 += nilaiToFloat(this.sg2.cells(8,i));
				if (this.sg2.cells(2,i) == "SS") tot3 += nilaiToFloat(this.sg2.cells(8,i));
			}
		}
		this.e_sp.setText(floatToNilai(tot1));
		this.e_sw.setText(floatToNilai(tot2));
		this.e_ss.setText(floatToNilai(tot3));
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
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