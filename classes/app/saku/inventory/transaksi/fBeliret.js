window.app_saku_inventory_transaksi_fBeliret = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fBeliret.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fBeliret";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Faktur Retur Pembelian Barang: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Retur",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang",btnClick:[this,"doBtnClick"],tag:2, change :[this,"doChange"]});
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Vendor",btnClick:[this,"doBtnClick"],tag:2});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:2});
		this.e_total = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total",tipeText:ttNilai,readOnly:true,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,310],caption:"Item Retur Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,260],colCount:8,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Stok","Harga","Jumlah","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,240,140,60,80,80,80,100]],colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[1,2,3,4,7],[0,5,6]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"],buttonStyle:[[0],[bsEllips]],
					defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,285,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('RETBELI','PIURET') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.kode_spro == "RETBELI") this.akunRet = line.flag;
					if (line.kode_spro == "PIURET") this.akunPiut = line.flag;
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_fBeliret.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fBeliret.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_beliretur_m","no_retur",this.app._lokasi+"-RPO"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into inv_beliretur_m(no_retur,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_piutang,kode_gudang, progress,no_kas) values" +
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_vend.getText()+"','"+this.cb_app.getText()+"',"+
							parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','F','"+this.app._kodePP+"','IDR','"+this.akunPiut+"','"+this.cb_gudang.getText()+"','0','-')");															
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+",0,'RETBELI','C','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0)";
							}
						}						
						sql.add(d);
					}	
					sql.add("insert into inv_beliretur_j(no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
						    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiut+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','RETBELI','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into inv_beliretur_j(no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunRet+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','RETBELI','RETUR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					
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
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.getCell(4,i)) < nilaiToFloat(this.sg.getCell(6,i))){
							system.alert(this,"Jumlah retur tidak valid.","Retur melebihi stok. Baris["+i+"]");
							return false;   
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) == 0){
					systemAPI.alert(this,"Transaksi tidak valid.","Nilai retur tidak boleh nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doChange:function(sender){
			this.sg.clear(1);
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_beliretur_m","no_retur",this.app._lokasi+"-RPO"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_gudang) {   
			    this.standarLib.showListData(this, "Daftar Gudang",sender,undefined, 
											  "select kode_gudang, nama  from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gudang) from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gudang","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_vend) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false);				
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
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select a.kode_brg, a.nama, a.tipe, a.sat,ifnull(b.jml,0) as stok  "+
											  "from inv_brg a left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as jml"+
											  "                                from inv_dt where kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.e_periode.getText()+"' group by kode_brg,kode_lokasi) b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_brg","nama","tipe","sat","stok"],"and",["Kode","Nama","Tipe","Satuan","Stok"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.setCell(2,row,this.sg.dataFromList[2]);
			this.sg.setCell(3,row,this.sg.dataFromList[3]);
			this.sg.setCell(4,row,this.sg.dataFromList[4]);
		}
		if ((col == 5) || (col == 6)){
			if ((this.sg.getCell(5,row) != "") && (this.sg.getCell(6,row) != "")) {
				var subttl = nilaiToFloat(this.sg.getCell(5,row)) * nilaiToFloat(this.sg.getCell(6,row));
				this.sg.setCell(7,row,floatToNilai(subttl));
				this.sg.validasi();
			}
		}
	},
	doSelectCell: function(sender, col, row){
		if ((col == 5) && (this.sg.getCell(5,row) == "")){
			this.sg.setCell(5,row,"0");
		}
		if ((col == 6) && (this.sg.getCell(6,row) == "")){
			this.sg.setCell(6,row,"0");
		}
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(7,i) != "")
				tot += nilaiToFloat(this.sg.cells(7,i));
		}	
		this.e_total.setText(floatToNilai(tot));
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