window.app_saku2_transaksi_kopeg_apotek_fTerimaE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_apotek_fTerimaE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_apotek_fTerimaE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Terima Barang: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});						
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Penerima",multiSelection:false,tag:1});		
		this.cb_tujuan = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Terima",readOnly:true});
		this.cb_kirim = new portalui_saiCBBL(this,{bound:[20,15,220,20],caption:"No Kirim",readOnly:true});
		this.cb_asal = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Pengirim",readOnly:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,750,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,745,280],colCount:5,tag:0,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Jumlah"],
					colWidth:[[0,1,2,3,4],[80,200,250,50,60]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,303,900,25],buttonStyle:3,grid:this.sg});
		
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
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_apotek_fTerimaE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_apotek_fTerimaE.implement({
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
					sql.add("update apo_brg_kirim_m set no_terima='-' where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_terima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_terima_d where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update apo_brg_kirim_m set no_terima='"+this.e_nb.getText()+"' where no_kirim='"+this.cb_kirim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into apo_brg_terima_m(no_terima,kode_lokasi,tanggal,no_dokumen,keterangan,kode_asal,kode_tujuan,periode,nik_user,tgl_input,nik_app,no_kirim) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_asal.getText()+"','"+this.cb_tujuan.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_app.getText()+"','"+this.cb_kirim.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(4,i) != "0") {																																				
									sql.add("insert into apo_brg_terima_d(no_terima,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah) values "+  
										   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_tujuan.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+")");
								}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);					
				}
				break;
			case "ubah" :			
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {											
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update apo_brg_kirim_m set no_terima='-' where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_terima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_terima_d where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},		
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";				
	},		
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText() != "") {									
			this.e_nb.setSQL("select no_terima, keterangan from apo_brg_terima_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_terima","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}	
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select e.no_kirim,e.keterangan as ket,a.no_dokumen,a.keterangan,a.tanggal,a.periode,a.nik_app,d.nama as nama_app,a.kode_tujuan,c.nama as nama_tujuan,a.kode_asal,b.nama as nama_asal "+
			             "from apo_brg_terima_m a inner join apo_brg_gudang b on a.kode_asal=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+						 
						 "				          inner join apo_brg_gudang c on a.kode_tujuan=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+						 
						 "				          inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+						 
						 "                        inner join apo_brg_kirim_m e on a.no_terima=e.no_terima and a.kode_lokasi=e.kode_lokasi "+
						 "where a.no_terima='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);	
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_app.setText(line.nik_app,line.nama_app);					
					this.cb_tujuan.setText(line.kode_tujuan,line.nama_tujuan);
					this.cb_kirim.setText(line.no_kirim,line.ket);
					this.cb_asal.setText(line.kode_asal,line.nama_asal);										
				} 
			}
			strSQL = "select a.kode_brg,a.satuan,a.jumlah,b.nama,b.merk+' - '+b.tipe as ket,a.jumlah "+
			         "from apo_brg_kirim_d a inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.no_kirim='"+this.cb_kirim.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_brg,line1.nama,line1.ket,line1.satuan,parseFloat(line1.jumlah)]);
				}
			} else this.sg.clear(1);																					
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});