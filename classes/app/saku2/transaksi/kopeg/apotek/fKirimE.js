window.app_saku2_transaksi_kopeg_apotek_fKirimE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_apotek_fKirimE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_apotek_fKirimE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Kirim Barang: Edit", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});						
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Pengirim",multiSelection:false,tag:2});
		this.cb_asal = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang Asal",readOnly:true});
		this.cb_tujuan = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Tujuan",multiSelection:false,tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,750,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,745,280],colCount:6,tag:0,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Stok","Jumlah"],
					colWidth:[[0,1,2,3,4,5],[80,200,250,50,60,60]],
					columnReadOnly:[true,[1,2,3,4],[0,5]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,303,900,25],buttonStyle:2,grid:this.sg});
		
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
			this.cb_tujuan.setSQL("select kode_gudang, nama from apo_brg_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang Tujuan",true);
						
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_apotek_fKirimE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_apotek_fKirimE.implement({
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
					sql.add("delete from apo_brg_kirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_kirim_d where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into apo_brg_kirim_m(no_kirim,kode_lokasi,tanggal,no_dokumen,keterangan,kode_asal,kode_tujuan,periode,nik_user,tgl_input,nik_app,no_terima) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_asal.getText()+"','"+this.cb_tujuan.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_app.getText()+"','-')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(5,i) != "0") {																																				
									sql.add("insert into apo_brg_kirim_d(no_kirim,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,stok,jumlah) values "+  
										   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_asal.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+")");
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
					this.nik_user=this.app._userLog;						
					var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
				}
				break;			
			case "ubah" :	
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(4,i)) < nilaiToFloat(this.sg.cells(5,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok ["+k+"]");
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
					sql.add("delete from apo_brg_kirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_kirim_d where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.e_nb.setSQL("select no_kirim, keterangan from apo_brg_kirim_m where no_terima ='-' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select a.no_dokumen,a.keterangan,a.periode,a.tanggal,a.kode_asal,a.kode_tujuan,b.nama as nama_asal,c.nama as nama_tujuan,a.nik_app,d.nama as nama_app "+
			             "from apo_brg_kirim_m a inner join apo_brg_gudang b on a.kode_asal=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
						 "					 inner join apo_brg_gudang c on a.kode_tujuan=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+
						 "					 inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_kirim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);	
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_app.setText(line.nik_app,line.nama_app);					
					this.cb_asal.setText(line.kode_asal,line.nama_asal);					
					this.cb_tujuan.setText(line.kode_tujuan,line.nama_tujuan);										
				} 
			}
			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			strSQL = "select a.kode_brg,a.satuan,a.jumlah,b.nama,b.merk+' - '+b.tipe as ket,c.stok+a.jumlah as stok "+
			         "from apo_brg_kirim_d a inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
					 "                       inner join apo_brg_stok c on a.kode_brg=c.kode_brg  and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
					 "where a.no_kirim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
						
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_brg,line1.nama,line1.ket,line1.satuan,parseFloat(line1.stok),parseFloat(line1.jumlah)]);
				}
			} else this.sg.clear(1);															
		}		
	},	
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0 && this.cb_asal.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_brg, nama from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select kode_brg, nama from apo_brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="" && this.cb_asal.getText()!="") {
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
			var strSQL = "select a.merk+' - '+a.tipe as ket,a.satuan,b.stok+isnull(c.jumlah,0) as stok  "+
			             "from apo_brg_m a inner join apo_brg_stok b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_asal.getText()+"' "+
						 "                 left join apo_brg_kirim_d c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi and c.no_kirim='"+this.e_nb.getText()+"' "+
						 "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.ket);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,floatToNilai(line.stok));						
					this.sg.cells(5,row,"0");											
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");					
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
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