window.app_saku_gl_transaksi_fReverse = function(owner){
	if (owner){
		window.app_saku_gl_transaksi_fReverse.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fReverse";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Jurnal Reverse: Input", 0);			
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Jurnal",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Reverse",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,130],caption:"Daftar Transaksi JU Reverse"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,105],colCount:8,tag:2,colTitle:["Status","No Bukti","Tanggal","No Dokumen","Keterangan","Periode","Jenis","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7],[70,110,70,120,260,60,60,100]],colFormat:[[7],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["REKLAS","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});
		this.p2 = new portalui_panel(this,{bound:[20,16,900,193],caption:"Daftar Jurnal"});
		this.sg2 = new portalui_saiTable(this.p2,{bound:[1,20,895,170],tag:"9"});		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try{			
			this.sg.onDblClick.set(this,"sgDblClick");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_buat.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fReverse.extend(window.portalui_childForm);
 window.app_saku_gl_transaksi_fReverse.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','-','JU','UMUM','"+
								 this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_tot.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',now(),'"+this.app._userLog+"','F','-','-','REV_REK')");
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.cells(0,i) == "REKLAS") {
							sql.add(" update ju_m set jenis='REV_REK',ref1='"+this.e_nb.getText()+"' where no_ju = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add(" insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"	   			    kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+	
									" select '"+this.e_nb.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
									"        kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+
									" from ju_j where no_ju = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							sql.add(" insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
									" select '"+this.e_nb.getText()+"',modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.e_periode.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
									" from angg_r where no_bukti = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
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
					this.sg.clear(1); this.sg2.clearAll();
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai reversal tidak boleh kurang atau sama dengan nol.");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".",'0000'));
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != ""){
				var data = this.dbLib.getDataProvider("select no_ju,date_format(tanggal,'%d/%m/%Y') as tanggal,no_dokumen,keterangan,periode,jenis,nilai "+
													  "from  ju_m "+
													  "where jenis = 'REVERSE' and no_del='-' and periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["INPROG",line.no_ju,line.tanggal,line.no_dokumen,line.keterangan,line.periode,line.jenis.toUpperCase(),floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Periode harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Daftar Karyawan ",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Approve",sender,undefined, 
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
	sgDblClick: function(sender, col, row){
		try{
			this.sg2.setColTitle(new Array("No","Kode Akun","Nama Akun","Keterangan","DC","Nilai","KodePP","Nama PP","Kode RKM","Nama RKM"));
			var data = this.dbLib.runSQL("select a.kode_akun,b.nama as nama_akun,a.keterangan,a.dc,a.nilai,"+
										"       a.kode_pp,ifnull(c.nama ,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
										"from   ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										"              left outer join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi  "+
										"              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
										"where a.no_ju = '"+this.sg.cells(1,this.sg.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.no_urut desc");
			this.sg2.clearAll();
			this.sg2.setData(data);
		}
		catch(e){
			systemAPI.alert(e);
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "REKLAS")&&(this.sg.cells(7,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(7,i));
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
