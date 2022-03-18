window.app_saku2_transaksi_frigia_inv_transaksi_fKeluarLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_frigia_inv_transaksi_fKeluarLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_frigia_inv_transaksi_fKeluarLoad";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Barang Keluar: Load", 0);	
		//
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dok / BPB", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bUpload = new portalui_uploader(this,{bound:[580,16,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:8,tag:2,
		            colTitle:["Kode","Nama","Kelompok - Jenis - KBM","Satuan","Stok","Jumlah","Kode Gudang","Nama Gudang"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,180,270,50,80,80,80,100]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],columnReadOnly:[true,[0,1,2,3,4,6,7],[5]],change:[this,"doChangeCell"],
					buttonStyle:[[0,6],[bsEllips,bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,302,900,25],buttonStyle:3,grid:this.sg, pager:[this,"selectPage"]});
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg.setAllowBlank(true);
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_frigia_inv_transaksi_fKeluarLoad.extend(window.portalui_childForm);
window.app_saku2_transaksi_frigia_inv_transaksi_fKeluarLoad.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);	
			var line;
			var tot = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				tot += parseFloat(line.jumlah);
			}
			this.e_total.setText(floatToNilai(tot));						
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var total = 0;
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg.appendData([line.kodebrg,line.nama,line.jenis,line.satuan,floatToNilai(line.stok),floatToNilai(line.jumlah),line.gudang,"-"]);
		}
		this.sg.setNoUrut(start);
	},
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_keluar_m","no_keluar",this.app._lokasi+"-OUT"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fri_keluar_m(no_keluar,kode_lokasi,tanggal,no_dokumen,keterangan,nik_buat,kode_gudang,periode,nik_user,tgl_input,no_link,no_del) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','-','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-')");
					
					var line;
					for (var i=0; i < this.dataUpload.rows.length;i++){
						line = this.dataUpload.rows[i];						
						sql.add("insert into fri_keluar_d (no_keluar,kode_lokasi,periode,nu,kode_brg,jumlah,bonus,harga,stok,kode_gudang2) values "+  
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+line.kodebrg+"',"+line.jumlah+",0,0,0,'"+line.gudang+"')");
					}
					
					sql.add("insert into fri_barang_d(no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) "+
						    "select no_keluar,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,'KELUAR','C',periode,'"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0 "+
							"from fri_keluar_d where no_keluar='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_keluar_m","no_keluar",this.app._lokasi+"-OUT"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
	},
	doChange:function(sender){
		this.sg.clear(1);
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
											  "select a.kode_brg, a.nama, b.nama+' - '+c.nama+' - '+d.nama as keterangan, a.satuan,isnull(e.stok,0) as stok from fri_barang_m a "+
											  "       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
											  "       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
											  "       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
											  "       left outer join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
											  "                        from fri_barang_d where kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg ) e on a.kode_brg=e.kode_brg and a.kode_lokasi=e.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from fri_barang_m where kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.kode_brg","a.nama","a.satuan","stok"],"and",["Kode","Nama","Satuan","Stok"],false);				
			}
			if (col == 6){		
				this.standarLib.showListData(this, "Daftar Gudang",sender,undefined, 
											  "select kode_gudang, nama  from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_gudang) from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",
											  ["kode_gudang","nama"],"and",["Kode","Nama"],true);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.setCell(2,row,this.sg.dataFromList[2]);
			this.sg.setCell(3,row,this.sg.dataFromList[3]);
			this.sg.setCell(4,row,floatToNilai(this.sg.dataFromList[4]));
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