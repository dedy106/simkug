window.app_inv_transaksi_fRepair = function(owner)
{
	if (owner)
	{
		window.app_inv_transaksi_fRepair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_inv_transaksi_fRepair";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Repair Barang: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Repair",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"No Dokumen", maxLength:50});						
		this.cb_buat = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cabang = new saiCBBL(this,{bound:[20,20,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
				
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Detail Barang"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:9,tag:0,
		            colTitle:["Kode Brg","Nama Barang","Merk","Tipe","Serial","Modul","SN Modul","Voip","SN Voip"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,80,80,100,100,150,80]],
					columnReadOnly:[true,[8,7,6,5,4,3,2,1,0],[]],
					buttonStyle:[[0],[bsEllips]], 										
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
					checkItem:true,autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		
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
			
			this.cb_vendor.setSQL("select kode_vendor, nama from inv_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
			this.cb_buat.setSQL("select nik, nama from inv_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from inv_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_cabang.setSQL("select kode_cabang,nama from inv_cabang where kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_inv_transaksi_fRepair.extend(window.childForm);
window.app_inv_transaksi_fRepair.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_repair_m","no_repair",this.app._lokasi+"-REP"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into inv_repair_m (no_repair,kode_lokasi,no_dokumen,tanggal,keterangan,progress,periode,tgl_input,nik_user,nik_buat,nik_setuju,kode_vendor,kode_cabang) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','0','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_cabang.getText()+"')");
		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into inv_repair_d(no_repair,kode_lokasi,kode_barang,no_urut,no_selesai,nik_config) values  "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+i+",'-','-')");								
								sql.add("update inv_barang set kondisi='REPAIR' where kode_barang = '"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_repair_m","no_repair",this.app._lokasi+"-REP"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_cabang) {
			this.sg.clear(1);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
												  "select kode_barang, nama  from inv_barang where kode_lokasi = '"+this.app._lokasi+"' and kode_cabang='"+this.cb_cabang.getText()+"' and status<>'FORWARDER' and kondisi = 'RUSAK'",
												  "select count(kode_barang) from inv_barang where kode_lokasi = '"+this.app._lokasi+"' and kode_cabang='"+this.cb_cabang.getText()+"' and status<>'FORWARDER' and kondisi = 'RUSAK'",
												  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col==0) {
			var data = this.dbLib.getDataProvider("select a.kode_merk+'-'+b.nama as merk,a.tipe,a.serial,a.modul,a.sn_modul,a.voip,a.sn_voip from inv_barang a "+
						"		inner join inv_merk b on a.kode_merk=b.kode_merk and a.kode_lokasi=b.kode_lokasi "+
						"where a.kode_barang='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.sg.cells(2,row,line.merk);
				this.sg.cells(3,row,line.tipe);
				this.sg.cells(4,row,line.serial);
				this.sg.cells(5,row,line.modul);
				this.sg.cells(6,row,line.sn_modul);
				this.sg.cells(7,row,line.voip);
				this.sg.cells(8,row,line.sn_voip);
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