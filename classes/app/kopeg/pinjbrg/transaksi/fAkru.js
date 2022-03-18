window.app_kopeg_pinjbrg_transaksi_fAkru = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fAkru.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fAkru";
			owner.childFormConfig(this, "mainButtonClick","Form Akru Piutang Kontrak: Input", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBBL;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true, tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,11,100,18], selectDate:[this,"doSelectDate"]});
			this.eSPB = new portalui_saiLabelEdit(this,{bound:[20,12,290,20],caption:"No Akru",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,12,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,13,290,20],caption:"No Dokumen"});
			this.eAsur = new portalui_saiLabelEdit(this, {bound:[720,13,200,20],caption:"Nilai Asuransi",tipeText:ttNilai,text:"0",readOnly:true});        
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,14,500,20],caption:"Keterangan"});			
			this.eUM = new portalui_saiLabelEdit(this, {bound:[720,14,200,20],caption:"Nilai UM",tipeText:ttNilai,text:"0",readOnly:true});        
			this.cbbPemohon = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Png Jawab", btnClick:[this,"FindBtnClick"],tag:2});			
			this.eNilai = new portalui_saiLabelEdit(this, {bound:[720,17,200,20],caption:"Nilai Barang",tipeText:ttNilai,text:"0",readOnly:true});        
			this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,900,315],caption:"Daftar Kontrak Kredit Barang"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,295],colCount:10,
			    colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,150,100,160,140,80,80,80,0]],
			    colTitle:["Status","Tgl Angsur","No Bukti","No Kontrak","Nama Nasabah","Keterangan","Nilai UM","Nilai Barang","Nilai Asur","Tgl Awal Tagih"],
                colFormat:[[1,6,7,8],[cfDate,cfNilai,cfNilai,cfNilai]],
                buttonStyle:[[0,1],[bsAuto,bsDate]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
                colHide:[[9],true],columnReadOnly:[true,[0,2,3,4,5,6,7,8,9],[1]],defaultRow:1,change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PBRGAR','PBRGAJ','PBRGPD','PBRGTP','PBRGOI') and kode_lokasi = '"+this.app._lokasi+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGAR") this.akunAR = line.flag;
					if (line.kode_spro == "PBRGPD") this.akunPdpt = line.flag;
					if (line.kode_spro == "PBRGTP") this.akunTP = line.flag;
					if (line.kode_spro == "PBRGAJ") this.akunARjasa = line.flag;
					if (line.kode_spro == "PBRGOI") this.akunOI = line.flag;
				}
			}
			this.cbbPemohon.setSQL("select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",["nik","nama"],true);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fAkru]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fAkru.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fAkru.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{	
					this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrgakru_m','no_akru',this.app._lokasi+"-KONT"+this.ePeriode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var totAR = nilaiToFloat(this.eNilai.getText()) + nilaiToFloat(this.eAsur.getText()); 
					var totPdpt = nilaiToFloat(this.eNilai.getText()) + nilaiToFloat(this.eUM.getText()); 
					sql.add("insert into kop_pbrgakru_m (no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nik_app,kode_lokasi,kode_pp,nilai,posted,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','IDR',1,'"+this.cbbPemohon.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"',"+totAR+",'F','"+this.ePeriode.getText()+"','-','-','"+this.app._userLog+"',now())");
					var idx = 0;
					var d="insert into kop_pbrgakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunAR+"','"+this.eKet.getText()+"','D',"+totAR+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (this.eUM.getText() != "0") {
						d+=",";
						idx++;
						d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eUM.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','UM','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					}
					if (this.eAsur.getText() != "0") {
						d+=",";
						idx++;
						d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunOI+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eAsur.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ASUR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					}
					d+=",";
					idx++;
					d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunPdpt+"','"+this.eKet.getText()+"','C',"+totPdpt+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','PDPT','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					sql.add(d);					
					for (var i=0; i <= this.sg1.getRowCount(); i++){
						if (this.sg1.cells(0,i) == "APP") {
							sql.add("update kop_pbrg_m set tgl_tagih='"+this.sg1.getCellDateValue(1,i)+"',akun_piutang='"+this.akunAR+"',akun_pjasa='"+this.akunARjasa+"',progress='2' where no_pbrg='"+this.sg1.cells(2,i)+"' and no_kontrak = '"+this.sg1.cells(3,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("insert into kop_pbrgakru_d(no_akru,no_pbrg,no_kontrak,kode_lokasi,dc) values "+
							        "                          ('"+this.eSPB.getText()+"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"','"+this.app._lokasi+"','D')");
							/*
							sql.add("update kop_pbrg_sch set tgl_angs = "+ 
									"case when month('"+this.sg1.getCellDateValue(1,i)+"')-month('"+this.sg1.getCellDateValue(8,i)+"') > 0 then "+
									"date_add(tgl_angs, interval month('"+this.sg1.getCellDateValue(1,i)+"')-month('"+this.sg1.getCellDateValue(8,i)+"') month) "+
									"else date_sub(tgl_angs, interval month('"+this.sg1.getCellDateValue(8,i)+"')-month('"+this.sg1.getCellDateValue(1,i)+"') month) end  "+
									"where no_pbrg = '"+this.sg1.getCell(2,i)+"' and no_kontrak='"+this.sg1.getCell(3,i)+"' and kode_lokasi='"+this.app._lokasi+"' ");
							*/
							
							sql.add("update kop_pbrg_m a,kop_pbrg_sch b "+
									"set b.tgl_angs=date_add(a.tgl_tagih, interval b.cicilan_ke-1 month) "+
									"where a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi "+
									"and a.no_pbrg = '"+this.sg1.getCell(2,i)+"' and a.no_kontrak = '"+this.sg1.getCell(2,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' "); 

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eSPB);		
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.eNilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai approve tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ePeriode.getText())) {
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
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrgakru_m','no_akru',this.app._lokasi+"-KONT"+this.ePeriode.getText().substr(2,4)+".",'0000'));
			this.eDok.setFocus();
		}
	},
	doLoadData: function(sender){
	try{			
			if (this.ePeriode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_pbrg,date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih,a.no_kontrak,concat(e.kode_agg,'-',e.nama) as nama_agg,a.keterangan,a.nilai-a.nilai_asur as nilai,a.nilai_um,a.nilai_asur "+
				           "from kop_pbrg_m a "+
						   "inner join kop_agg e on a.kode_agg=e.kode_agg and a.kode_lokasi=e.kode_lokasi "+
						   "where a.periode<='"+this.ePeriode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.progress <> '2'"); //and a.progress='1'---> progress gak perlu dilihat,supaya tidak tergantung dgn vendor
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["APP",line.tgl_tagih,line.no_pbrg,line.no_kontrak,line.nama_agg,line.keterangan,floatToNilai(line.nilai_um),floatToNilai(line.nilai),floatToNilai(line.nilai_asur),line.tgl_tagih]);
					}
					this.sg1.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Periode harus diisi.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}, 
	FindBtnClick: function(sender){
		if (sender == this.cbbPemohon){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg1.cells(0,row) != "")){
			this.sg1.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot3 = tot1 = tot2 = 0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if ((this.sg1.cells(0,i) == "APP") && (this.sg1.cells(7,i) != "") && (this.sg1.cells(8,i) != "") && (this.sg1.cells(6,i) != "")) {
				tot1 += nilaiToFloat(this.sg1.cells(7,i));
				tot2 += nilaiToFloat(this.sg1.cells(6,i));
				tot3 += nilaiToFloat(this.sg1.cells(8,i));
			}
		}
		this.eUM.setText(floatToNilai(tot2));
		this.eNilai.setText(floatToNilai(tot1));
		this.eAsur.setText(floatToNilai(tot3));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eSPB.getText()+")");							
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
