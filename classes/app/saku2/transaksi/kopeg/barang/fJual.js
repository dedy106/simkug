window.app_saku2_transaksi_kopeg_barang_fJual = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_barang_fJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_barang_fJual";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Barang: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});						
		this.e_nilai = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.e_diskon = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Customer",multiSelection:false,tag:1});
		this.e_ppn = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:10,tag:0,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Stok","Harga","Diskon","Jumlah","Bonus","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[80,180,150,50,60,60,60,60,60,80]],
					columnReadOnly:[true,[1,2,3,4,5,9],[0,6,7,8]],
					colFormat:[[4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,303,900,25],buttonStyle:2,grid:this.sg});
		
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
			
			this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BRGPDPT','BRGHPP','HUTPPN','BRGPIU','BRGINV','BRGPOT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGPIU") this.akunPiutang = line.flag;			
					if (line.kode_spro == "BRGINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "BRGPDPT") this.akunPdpt = line.flag;			
					if (line.kode_spro == "BRGHPP") this.akunHpp = line.flag;			
					if (line.kode_spro == "BRGPOT") this.akunPot = line.flag;			
				}
			}			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from brg_m where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_barang_fJual.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_barang_fJual.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.nik_user=this.app._userLog;						
					var sql = "call sp_brg_tmp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);						
					
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"brg_jual_m","no_jual",this.app._lokasi+"-JUAL"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					var totDiskon = nilaiToFloat(this.e_diskon.getText()) + this.diskon;
					
					sql.add("insert into brg_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,kode_cust,no_kas,posted) values "+						    
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+",'"+this.cb_cust.getText()+"','-','F')");					
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPot+"','"+this.e_ket.getText()+"','D',"+totDiskon+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','POT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.akunPdpt+"','"+this.e_ket.getText()+"','C',"+this.jualbruto+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',3,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																									
								var data = this.dbLib.getDataProvider("select h_avg from brg_tmp where kode_brg='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
								if (typeof data == "object"){
									var line = data.rs.rows[0]; 
									if (line != undefined) var havg = parseFloat(line.h_avg);										
								}									
								sql.add("insert into brg_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,hpp,diskon) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_gudang.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(7,i))+","+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+havg+","+nilaiToFloat(this.sg.cells(6,i))+")");								
							}
						}						
					}
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"(select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',4,'"+this.akunHpp+"','"+this.e_ket.getText()+"','D',round(sum((jumlah+bonus)*hpp),0),'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','HPP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from brg_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");
					sql.add("insert into brg_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"(select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',5,'"+this.akunBarang+"','"+this.e_ket.getText()+"','C',round(sum((jumlah+bonus)*hpp),0),'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGJUAL','BRG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from brg_jual_d where no_jual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");
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
					this.nik_user=this.app._userLog;						
					var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
				}
				break;
			case "simpan" :	
				this.nik_user=this.app._userLog;						
				var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
			    
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						var data = this.dbLib.getDataProvider("select stok from brg_stok where kode_brg='"+this.sg.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0]; 
							if (line != undefined) this.sg.cells(4,i,floatToNilai(line.stok));
						}						
						if (nilaiToFloat(this.sg.cells(4,i)) < (nilaiToFloat(this.sg.cells(7,i))+nilaiToFloat(this.sg.cells(8,i)))) {
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"brg_jual_m","no_jual",this.app._lokasi+"-JUAL"+this.e_periode.getText().substr(2,4)+".","000"));
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
		this.nik_user=this.app._userLog;						
		var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);	
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0 && this.cb_gudang.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_brg, nama from brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from brg_m where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
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
			var strSQL = "select a.merk+' - '+a.tipe as ket,a.satuan,a.h_jual,b.stok "+
			             "from brg_m a inner join brg_stok b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_gudang.getText()+"' "+
						 "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.ket);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,floatToNilai(line.stok));	
					this.sg.cells(5,row,floatToNilai(line.h_jual));	
					this.sg.cells(6,row,"0");						
					this.sg.cells(7,row,"0");
					this.sg.cells(8,row,"0");
					this.sg.cells(9,row,"0");
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");	
					this.sg.cells(6,row,"");
					this.sg.cells(7,row,"");					
					this.sg.cells(8,row,"");
					this.sg.cells(9,row,"");
				}
			}			
		}		
		if (col == 6 || col == 7) {
			if (this.sg.cells(5,row) != "" && this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") {
				this.sg.cells(9,row,floatToNilai(Math.round((nilaiToFloat(this.sg.cells(5,row))-nilaiToFloat(this.sg.cells(6,row))) * nilaiToFloat(this.sg.cells(7,row)))));
			}
		}
		this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			this.jualbruto = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
					this.jualbruto += Math.round(nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(7,i)));					
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(6,i)) * nilaiToFloat(this.sg.cells(7,i)));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){
		if (sender == this.cb_gudang) {
			this.sg.clear(1);
		}
		if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon) {
			if (sender == this.e_diskon && this.e_diskon.getText()!="") 
				this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
			if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="") {
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));
			}
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