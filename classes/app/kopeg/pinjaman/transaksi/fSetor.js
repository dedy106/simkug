window.app_kopeg_pinjaman_transaksi_fSetor = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjaman_transaksi_fSetor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjaman_transaksi_fSetor";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Setoran Angsuran Pinjaman: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Setoran",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penyetor",btnClick:[this,"doBtnClick"],tag:2});		
		this.bTampil = new portalui_button(this,{bound:[620,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Setoran",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,330],caption:"Daftar Angsuran Pinjaman"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,305],colCount:10,tag:2,colTitle:["Status","No Angsuran","Tanggal","Penerima","Keterangan","Periode","Piut. Temp.","Jenis","Nilai OE","Nilai Angsuran"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[70,90,70,80,180,60,60,60,80,100]],colFormat:[[8,9],[cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["SETOR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],change:[this,"doChangeCell"],autoAppend:false,
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
			/*
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'PINJST' and kode_lokasi = '"+this.app._lokasi+"' "); 
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PINJST") this.akunTAK = line.flag;
				}
			}
			*/
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fSetor.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fSetor.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjsetor_m","no_setor",this.app._lokasi+"-SP"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_pinjsetor_m(no_setor,no_dokumen,keterangan,tanggal,nilai,modul,periode,kode_lokasi,nik_app,kode_curr,kurs,kode_pp,progress,no_del,no_link,nik_user,tgl_input,akun_tak,posted) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_tot.getText())+",'PINJ','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','IDR',1,'"+this.app._kodePP+"','0','-','-','"+this.app._userLog+"',now(),'-','X')"); //akun tak  <-------- "+this.akunTAK+"
					var idx = 0;
					/*
					sql.add("insert into kop_pinjsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTAK+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_tot.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','TAK','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					*/
					this.createJurnal();
					var d="insert into kop_pinjsetor_j (no_setor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var z = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (z >0) d+=",";
							idx++;
							d+="('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+line.kode_akun+"','"+this.e_desc.getText()+"','"+line.dc+"',"+line.nilai+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','PINJ','ANGS_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							z++;
						}
					}
					sql.add(d);
					
					var s="insert into kop_pinjsetor_d (no_setor,no_angs,akun_ar,jenis,nilai_sls,nilai,kode_lokasi,dc) values ";
					var z = 0;
					var vAngs = false; var vInv = false;
					var nopinjangs = [];
					var nopinjinv = [];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "SETOR") {
								if (z > 0) s+= ",";
								s+="('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'"+this.app._lokasi+"','D')";
								z++;
								if (this.sg.cells(7,i) == "ANS") {vAngs = true; nopinjangs.push("'"+this.sg.getCell(1,i)+"'"); }
								else {vInv = true; nopinjinv.push("'"+this.sg.getCell(1,i)+"'");}
							}
						}
					}						
					sql.add(s);
					
					if (vAngs) sql.add("update kop_pinjangs_m set progress ='1' where no_angs in ("+nopinjangs+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (vInv) sql.add("update kop_pinjinv_m set progress ='1' where no_inv in ("+nopinjinv+") and kode_lokasi = '"+this.app._lokasi+"'");
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
				if (nilaiToFloat(this.e_tot.getText() <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai setoran tidak boleh kurang atau sama dengan nol.");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjsetor_m","no_setor",this.app._lokasi+"-SS"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_angs,date_format(a.tanggal,'%d/%m/%Y') as tanggal,b.nama,a.keterangan,a.nilai,a.akun_ar,a.periode, "+
												      "      (case when a.nilai_sls <0 then -a.nilai_sls else 0 end) as beban,'ANS' as jenis "+
													  "from  kop_pinjangs_m a inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "where a.nilai<> 0 and a.progress='0' and a.no_del='-' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
													  "union "+
													  "select x.no_inv as no_angs,date_format(x.tanggal,'%d/%m/%Y') as tanggal,y.nama,x.keterangan,x.nilai,x.akun_ar,x.periode, "+
												      "      0 as beban,'INV' as jenis "+
													  "from  kop_pinjinv_m x inner join karyawan y on x.nik_app=y.nik and x.kode_lokasi=y.kode_lokasi "+
													  "where x.progress='0' and x.no_del='-' and x.periode <= '"+this.e_periode.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["SETOR",line.no_angs,line.tanggal,line.nama,line.keterangan,line.periode,line.akun_ar,line.jenis.toUpperCase(),floatToNilai(line.beban),floatToNilai(line.nilai)]);
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
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
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
			if ((this.sg.cells(0,i) == "SETOR")&&(this.sg.cells(9,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(9,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
	},
	createJurnal: function(){		
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(0,i) == "SETOR"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(6,i)) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(9,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(6,i),nama:'-',dc:"C", keterangan: "-", nilai: nilaiToFloat(this.sg.cells(9,i)),kode_pp:this.app._kodePP, kode_drk:'-'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
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