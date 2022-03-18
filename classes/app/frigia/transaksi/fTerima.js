window.app_frigia_transaksi_fTerima = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_fTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_transaksi_fTerima";
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Terima Barang: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});						
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_kirim = new portalui_saiCBBL(this,{bound:[20,16,220,20],caption:"No Kirim",multiSelection:false,tag:0,change:[this,"doChange"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,990,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,985,280],colCount:5,tag:2,
		            colTitle:["Kode","Nama","Kelompok - Jenis - KBM - Tipe","Satuan","Jumlah"],
					colWidth:[[0,1,2,3,4],[100,300,350,50,80]],
					colFormat:[[4],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,302,989,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_transaksi_fTerima.extend(window.portalui_childForm);
window.app_frigia_transaksi_fTerima.implement({	
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_terima_m","no_terima",this.app._lokasi+"-TRM"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fri_terima_m(no_terima,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del,no_kirim) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','-','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','"+this.cb_kirim.getText()+"')");					
					sql.add("update fri_kirim_m set no_terima ='"+this.e_nb.getText()+"' where no_kirim ='"+this.cb_kirim.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					sql.add("insert into fri_barang_d(no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) "+
						    "select '"+this.e_nb.getText()+"',kode_lokasi,nu,kode_brg,harga,jumlah,bonus,'TERIMA','D','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0 "+
							"from fri_kirim_d where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
		if (sender == this.cb_gudang && this.cb_gudang.getText()!= "" ) 
			this.cb_kirim.setSQL("select no_kirim, keterangan from fri_kirim_m where no_terima ='-' and kode_tujuan='"+this.cb_gudang.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["Kode","Nama"],"and","Data Kirim",true);
		if (sender == this.cb_kirim && this.cb_kirim.getText()!= "" ) {			
			var data = this.dbLib.getDataProvider(
						"select a.kode_brg,c.nama, d.nama+' - '+e.nama+' - '+f.nama+' - '+c.tipe as keterangan,c.satuan,a.jumlah "+
						"from fri_kirim_d a "+
						"       inner join fri_barang_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
						" 	    inner join fri_barang_klp d on c.kode_klp=d.kode_klp and c.kode_lokasi=d.kode_lokasi "+
						"       inner join fri_barang_jenis e on c.kode_jenis=e.kode_jenis and c.kode_lokasi=e.kode_lokasi "+
						"       inner join fri_barang_kbm f on c.kode_kbm=f.kode_kbm and c.kode_lokasi=f.kode_lokasi "+						
						"where a.no_kirim = '"+this.cb_kirim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama,line.keterangan,line.satuan,floatToNilai(line.jumlah)]);
				}
			} else this.sg.clear(1);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_terima_m","no_terima",this.app._lokasi+"-TRM"+this.e_periode.getText().substr(2,4)+".","0000"));
		    this.e_dok.setFocus();
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
											  "select a.kode_brg, a.nama , b.nama+' - '+c.nama+' - '+d.nama+' - '+a.tipe as keterangan, a.satuan, a.harga from fri_barang_m a "+
											  "       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
											  "       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
											  "       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from fri_barang_m where kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.kode_brg","a.nama","a.satuan","a.satuan","a.harga"],"and",["Kode","Nama","Keterangan","Satuan","Harga"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
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