window.app_saku2_transaksi_kopeg_bengkel_fBrgIO = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fBrgIO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fBrgIO";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Barang Masuk-Keluar : Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});						
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.cb_pnj = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Petugas Gudang",multiSelection:false,tag:1});
		this.cb_terima = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penerima",multiSelection:false,tag:1});		
		this.cb_spk = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"No SPK",multiSelection:false,tag:1});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,310], childPage:["Item Barang","Barang Support"]});
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:7,tag:9,
		            colTitle:["Kode","Nama","No Brg - Tipe","Satuan","Stok","Status","Jumlah"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,80,50,250,250,80]],
					columnReadOnly:[true,[1,2,3,4,5],[0,6]],
					colFormat:[[4,6],[cfNilai,cfNilai]],buttonStyle:[[0,5],[bsEllips,bsAuto]], 
					picklist:[[5],[new portalui_arrayMap({items:["IN","OUT"]})]],checkItem: true,
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],
					defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-45],colCount:4,tag:9,
		            colTitle:["Item","Satuan","Status","Jumlah"],
					colWidth:[[3,2,1,0],[80,50,100,500]],					
					colFormat:[[3],[cfNilai]],
					buttonStyle:[[2],[bsAuto]], picklist:[[2],[new portalui_arrayMap({items:["IN","OUT"]})]],checkItem: true,					
					defaultRow:1,autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_gudang='"+this.kodeGudang+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);			
			this.cb_terima.setSQL("select kode_mekanik,nama from fri_mekanik where kode_gudang='"+this.kodeGudang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_mekanik","nama"],false,["Kode","Nama"],"and","Data Penerima",true);
			this.cb_spk.setSQL("select no_spk,no_polisi from fri_spk_m where progress ='1' and kode_lokasi = '"+this.app._lokasi+"'",["no_spk","no_polisi"],false,["No SPK","No Polisi"],"and","Data SPK",true);
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_brg, a.nama from fri_barang_m a "+
					"       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
					"       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
					"       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
					"where a.kode_lokasi='"+this.app._lokasi+"'");									 
			this.dbLib.getMultiDataProviderA(sql);
			this.cb_gudang.setText(this.kodeGudang);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fBrgIO.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_bengkel_fBrgIO.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_io_m","no_io",this.app._lokasi+"-IO"+this.e_periode.getText().substr(2,4)+".","00000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into fri_io_m(no_io,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nik_pnj,nik_terima,no_spk) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_pnj.getText()+"','"+this.cb_terima.getText()+"','"+this.cb_spk.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																	
								if (this.sg.cells(5,i).toUpperCase() == "IN") var jml = nilaiToFloat(this.sg.cells(6,i));
								else jml = -nilaiToFloat(this.sg.cells(6,i));
								sql.add("insert into fri_io_d(no_io,kode_lokasi,periode,kode_brg,kode_gudang,satuan,harga,jenis,jumlah,total,nu,no_spk) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_gudang.getText()+"','"+this.sg.cells(3,i)+"',0,'"+this.sg.cells(5,i)+"',"+jml+",0,"+i+",'"+this.cb_spk.getText()+"')");
							}
						}						
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){		
								if (this.sg2.cells(2,i).toUpperCase() == "IN") var jml = nilaiToFloat(this.sg2.cells(3,i));
								else jml = -nilaiToFloat(this.sg2.cells(3,i));
								sql.add("insert into fri_ionon_d(no_io,kode_lokasi,nu,item,satuan,jumlah,harga,jenis,no_spk) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+jml+",0,'"+this.sg2.cells(2,i)+"','"+this.cb_spk.getText()+"')");
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
					this.standarLib.clearByTag(this, new Array("0","9"),this.e_nb);		
					this.sg.clear(1); this.sg2.clear(1);								
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				}
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
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_io_m","no_io",this.app._lokasi+"-IO"+this.e_periode.getText().substr(2,4)+".","00000"));
		this.e_dok.setFocus();
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0 && this.cb_gudang.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select a.kode_brg, a.nama ,a.tipe "+
											  "from fri_barang_m a "+
											  "       inner join fri_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi "+
											  "       inner join fri_barang_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
											  "       inner join fri_barang_kbm d on a.kode_kbm=d.kode_kbm and a.kode_lokasi=d.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from fri_barang_m where kode_lokasi='"+this.app._lokasi+"' ",
											  ["a.kode_brg","a.nama","a.tipe"],"and",["Kode","Nama","Tipe"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="" && this.cb_gudang.getText()!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var brg = this.dataBrg.get(sender.cells(0,row));
				if (brg) sender.cells(1,row,brg);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}			
			var strSQL = "select a.no_brg+' - '+a.tipe as ket,a.satuan,0 as stok "+
			             "from fri_barang_m a "+
						 "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.ket);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,floatToNilai(line.stok));	
					this.sg.cells(5,row,"OUT");			
					this.sg.cells(6,row,"0");																
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");						
					this.sg.cells(6,row,"");						
				}
			}			
		}				
		this.sg.validasi();
	},	
	doChange:function(sender){
		if (sender == this.cb_gudang) {
			this.sg.clear(1);
			this.cb_pnj.setSQL("select a.nik, a.nama from karyawan a inner join fri_petugas b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where b.kode_gudang='"+this.cb_gudang.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Petugas",true);
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBrg = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBrg.set(line.kode_brg,line.nama);
								}
							}							
						}else throw result;
					break;	    					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});