window.app_kopeg_pinjbrg_transaksi_fSpbasur = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fSpbasur.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fSpbasur";
			owner.childFormConfig(this, "mainButtonClick","Form SPB Asuransi: Input", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true, tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,11,100,18], selectDate:[this,"doSelectDate"]});
			this.eSPB = new portalui_saiLabelEdit(this,{bound:[20,12,290,20],caption:"No SPB",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,12,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,13,290,20],caption:"No Dokumen"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,14,500,20],caption:"Keterangan"});
			this.lTgl = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Jth Tempo",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,15,100,18]});			
			this.eNilai = new portalui_saiLabelEdit(this, {bound:[720,15,200,20],caption:"Nilai Total",tipeText:ttNilai,text:"0",readOnly:true});        
			this.cbbPemohon = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Pemohon", btnClick:[this,"FindBtnClick"],tag:2});
			this.ePot = new portalui_saiLabelEdit(this, {bound:[720,16,200,20],caption:"Nilai Potongan",tipeText:ttNilai, text:"0", change:[this,"doChange"]});        
			this.cbbVendor = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Asuradur", btnClick:[this,"FindBtnClick"]});
			this.eNilaiSpb = new portalui_saiLabelEdit(this, {bound:[720,17,200,20],caption:"Nilai SPB",tipeText:ttNilai, text:"0",readOnly:true});        
			this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,900,315],caption:"Daftar Kontrak BerAsuransi"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,295],colCount:7,
			    colWidth:[[0,1,2,3,4,5,6],[60,150,150,100,300,100,0]],
			    colTitle:["Status","No Bukti","No Kontrak","Kd Nasabah","Nama Nasabah","Nilai","Akun Hutang"],
                colFormat:[[5],[cfNilai]],buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
                colHide:[[6],true],readOnly:true,defaultRow:1,change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			this.ePot.setText("0");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PBRGFE','PBRGSP') and kode_lokasi = '"+this.app._lokasi+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGSP") this.akunAP = line.flag;
					if (line.kode_spro == "PBRGFE") this.akunFee = line.flag;
				}
			}
			this.cbbPemohon.setSQL("select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",["nik","nama"],true);
			this.cbbVendor.setSQL("select kode_vendor, nama  from vendor where kode_lokasi ='"+this.app._lokasi+"'",["kode_vendor","nama"],true);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fSpbasur]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fSpbasur.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fSpbasur.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
            if (this.dTgl2.getThnBln() < this.ePeriode.getText()){
              system.alert(this,"Periode Jatuh tempo harus sama atau lebih besar dari periode input.","");  
              return;
            } 
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
					this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.ePeriode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
							"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"','"+this.dTgl2.getDateString()+
							"','"+this.akunAP+"','"+this.eKet.getText()+"','-','IDR',1,'"+this.cbbPemohon.getText()+"','-','"+this.cbbVendor.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+
							"','KP.SPB','PBRG_AS',"+parseNilai(this.eNilaiSpb.getText())+",0,"+parseNilai(this.ePot.getText())+",'F','0','"+this.ePeriode.getText()+"','-','-','"+this.app._userLog+"',now())");
					var idx = 0;
					var d="insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					this.createJurnal();
					var line = undefined;
					for (var i in this.gridJurnal.objList){
						if (idx > 0) d+= ",";
						line = this.gridJurnal.get(i);
						d+= "('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+line.get("kode_akun")+"','"+this.eKet.getText()+"','D',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','"+line.get("kode_drk")+"','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						idx++;
					}
					d+=",";
					idx++;
					d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunFee+"','"+this.eKet.getText()+"','C',"+parseNilai(this.ePot.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','FEE','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					d+=",";
					idx++;
					d+="('"+this.eSPB.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunAP+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eNilaiSpb.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','AP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					sql.add(d);					
					
					for (var i=0; i <= this.sg1.getRowCount(); i++){
						if (this.sg1.cells(0,i) == "APP") {
							sql.add("update kop_pbrg_m set no_spbasur='"+this.eSPB.getText()+"' where no_pbrg='"+this.sg1.cells(1,i)+"' and no_kontrak = '"+this.sg1.cells(2,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
				if (nilaiToFloat(this.eNilaiSpb.getText()) <= 0){
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
	doChange: function(sender){
		if (this.ePot.getText() != "") {
			var tot1 = nilaiToFloat(this.eNilai.getText()) - nilaiToFloat(this.ePot.getText());
			this.eNilaiSpb.setText(floatToNilai(tot1));
		}
	},
	doClick: function(sender){
		if (sender == this.bGen){
			this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.ePeriode.getText().substr(2,4)+".",'0000'));
			this.eDok.setFocus();
		}
	},
	doLoadData: function(sender){
	try{			
			if (this.ePeriode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_pbrg,a.no_kontrak,e.kode_agg,e.nama as nama_agg,a.nilai_asur,b.kode_akun  from kop_pbrg_m a "+
						   "inner join kop_pbrg_j b on a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi and b.jenis='HASUR' "+
						   "inner join kop_agg e on a.kode_agg=e.kode_agg and a.kode_lokasi=e.kode_lokasi "+
						   "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spbasur='-' and a.nilai_asur<> 0 and a.periode<= '"+this.ePeriode.getText()+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData(["INPROG",line.no_pbrg,line.no_kontrak,line.kode_agg,line.nama_agg,floatToNilai(line.nilai_asur),line.kode_akun]);
					}
					this.sg1.validasi();
				}
			}
			else {
				system.alert(this,"Periode tidak valid.","Data periode harus diisi.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}, 
	FindBtnClick: function(sender){
        if (sender == this.cbbVendor){
			this.standarLib.showListData(this, "Daftar Asuradur",sender,undefined, 
										  "select kode_vendor, nama  from vendor where kode_lokasi ='"+this.app._lokasi+"' ",
										  "select count(kode_vendor) from vendor where kode_lokasi ='"+this.app._lokasi+"' ",
										  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false);
            } 
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
		var tot1 =0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if ((this.sg1.cells(0,i) == "APP") && (this.sg1.cells(5,i) != "")) {
				tot1 += nilaiToFloat(this.sg1.cells(5,i));
			}
		}
		this.eNilai.setText(floatToNilai(tot1));
		tot1 = tot1 - nilaiToFloat(this.ePot.getText());
		this.eNilaiSpb.setText(floatToNilai(tot1));
	},
	createJurnal : function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			kdAkun = this.sg1.getCell(6,i);
			kdDRK = 'HASUR';
			nreal = nilaiToFloat(this.sg1.getCell(5,i));
			nemu = false;
			ix = 0;
			for (var j in dtJurnal.objList){		
			  if (kdAkun == dtJurnal.get(j).get("kode_akun")) {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
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
