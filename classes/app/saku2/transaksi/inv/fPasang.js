window.app_saku2_transaksi_inv_fPasang = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_inv_fPasang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_inv_fPasang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Instalasi: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"No Dokumen", maxLength:50});	
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});	
		this.e_proyek = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Project", maxLength:50});			
		this.cb_buat = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Config", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cust = new saiCBBL(this,{bound:[20,20,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_cabang = new saiCBBL(this,{bound:[20,21,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_barang = new saiCBBL(this,{bound:[20,22,200,20],caption:"Barang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
				
		this.pc1 = new pageControl(this,{bound:[20,12,900,257], childPage:["Data Barang","Detail Instalasi"]});
		
		this.cb_klpbarang = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Klp Barang", readOnly:true});
		this.cb_merk = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Merk", readOnly:true});
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,400,20],caption:"Tipe",  readOnly:true});	
		this.e_serial = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,400,20],caption:"Serial",  readOnly:true});	
		this.e_modul = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,400,20],caption:"Modul",  readOnly:true});	
		this.e_snmodul = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,400,20],caption:"SN Modul",  readOnly:true});	
		this.e_voip = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,400,20],caption:"Voip",  readOnly:true});	
		this.e_snvoip = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,20,400,20],caption:"SN Voip",  readOnly:true});	
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:0,
		            colTitle:["Kode","Keterangan","Value"],
					colWidth:[[2,1,0],[460,300,80]],
					columnReadOnly:[true,[0,1],[2]],										
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_cust.setSQL("select kode_cust, nama from inv_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_buat.setSQL("select nik, nama from inv_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from inv_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select kode_datek,nama from inv_datek where kode_lokasi ='"+this.app._lokasi+"' ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_datek,line.nama,"-"]);
				}
			} else this.sg.clear(1);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_inv_fPasang.extend(window.childForm);
window.app_saku2_transaksi_inv_fPasang.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_pasang_m","no_pasang",this.app._lokasi+"-INS"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into inv_pasang_m (no_pasang,kode_lokasi,no_dokumen,tanggal,keterangan,periode,tgl_input,nik_user,nik_config,nik_setuju,kode_cust,kode_cabang,kode_barang,project) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_cabang.getText()+"','"+this.cb_barang.getText()+"','"+this.e_proyek.getText()+"')");		
					sql.add("update inv_barang set no_pasang='"+this.e_nb.getText()+"' where kode_barang = '"+this.cb_barang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into inv_pasang_d(no_pasang,kode_lokasi,kode_barang,no_urut,kode_datek,value1) values  "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_barang.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"')");
								
							}
						}
					}					
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :							
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");		
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_pasang_m","no_pasang",this.app._lokasi+"-INS"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},		
	doChange:function(sender){
		if (sender == this.cb_cust) {
			this.cb_cabang.setSQL("select kode_cabang,nama from inv_cabang where kode_cust = '"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
		}
		if (sender == this.cb_cabang) {
			this.cb_barang.setSQL("select kode_barang,nama from inv_barang where kode_cabang = '"+this.cb_cabang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_barang","nama"],false,["Kode","Nama"],"and","Data Barang",true);
		}
		if (sender == this.cb_barang) {
			var sql =  "select a.nama,a.klp_barang,a.kode_merk,a.tipe,a.serial,a.modul,a.sn_modul,a.voip,a.sn_voip,b.nama as nama_klp,c.nama as nama_merk "+
					   "from inv_barang a "+
					   "inner join inv_klpbarang b on a.klp_barang=b.klp_barang and a.kode_lokasi=b.kode_lokasi "+
					   "inner join inv_merk c on a.kode_merk=c.kode_merk and a.kode_lokasi=c.kode_lokasi "+					   
					   "where a.kode_barang ='"+this.cb_barang.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.cb_klpbarang.setText(line.klp_barang,line.nama_klp);
					this.cb_merk.setText(line.kode_merk,line.nama_merk);
					this.e_tipe.setText(line.tipe);
					this.e_serial.setText(line.serial);
					this.e_modul.setText(line.modul);
					this.e_snmodul.setText(line.sn_modul);
					this.e_voip.setText(line.voip);
					this.e_snvoip.setText(line.sn_voip);					
				}				
			}			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
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