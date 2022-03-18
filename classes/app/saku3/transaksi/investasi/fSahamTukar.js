window.app_saku3_transaksi_investasi_fSahamTukar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fSahamTukar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fSahamTukar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pindah Kelola Saham: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_nsaham = new saiLabelEdit(this,{bound:[812,16,200,20],caption:"Nilai Saham", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,220,20],caption:"MI Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nbuku = new saiLabelEdit(this,{bound:[812,12,200,20],caption:"Nilai Buku", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		 
		
		this.p1 = new panel(this,{bound:[10,23,1000,280],caption:"Daftar Saham"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:10,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Lbr Pindah","MI Tujuan","Nama","Kd Broker","Nama Broker"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,60,100,60,80,100,100,80,200,60]],				
				columnReadOnly:[true,[1,2,3,4,7,9],[0,5,6,8]],
				colFormat:[[2,3,4,5,],[cfNilai,cfNilai,cfNilai,cfNilai]],								
				buttonStyle:[[0,6,8],[bsEllips,bsEllips,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true,
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"] 
				});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPage"]});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true,visible:false});
		
		
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
									
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola",["kode_kelola","nama"],false,["Kode","Nama"],"where","Daftar Pengelola",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
					
			var sql = new server_util_arrayList();
			sql.add("select kode_saham, nama from inv_saham");	
			sql.add("select kode_kelola, nama from inv_kelola");			
			sql.add("select kode_broker, nama from inv_broker");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fSahamTukar.extend(window.childForm);
window.app_saku3_transaksi_investasi_fSahamTukar.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			for (var i = 0; i < this.sg.rows.getLength();i++){
				this.doChangeCell(this.sg, 0, i);
				this.doChangeCell(this.sg, 6, i);
				this.doChangeCell(this.sg, 8, i);
			}			
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																			
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into inv_shmjual_m(no_shmjual,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kasjual,nik_buat,no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,akun_piutang,akun_piugl,nilai_piutang,nilai_piugl,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'X','-','"+this.cb_buat.getText()+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','"+this.cb_kelola.getText()+"','"+this.dp_d1.getDateString()+"',0,0,0,0,'-','-',"+nilaiToFloat(this.e_nsaham.getText())+","+nilaiToFloat(this.e_nbuku.getText())+",'JPINDAH')");
					
					sql.add("insert into inv_shmbeli_m(no_shmbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'X','-','0','"+this.cb_buat.getText()+"',  '"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','-','"+this.dp_d1.getDateString()+"',0,0,0,0,'BPINDAH')");
							
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(5,i)) != 0 ) {
								var strSQL = "select kode_saham from inv_saham_d where kode_saham='"+this.sg.cells(0,i)+"' and kode_kelola='"+this.sg.cells(6,i)+"'";
								var data = this.dbLib.getDataProvider(strSQL,true);
								if (typeof data == "object" && data.rs.rows[0] == undefined){
									sql.add("insert into inv_saham_d (kode_saham,kode_kelola,jumlah,h_oleh,h_buku) values "+
											"('"+this.sg.cells(0,i)+"','"+this.sg.cells(6,i)+"',0,0,0)");
								}
								
								sql.add("update inv_saham_d set jumlah=jumlah-"+nilaiToFloat(this.sg.cells(5,i))+" where kode_saham='"+this.sg.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"'");
								var njual = nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(5,i));								
								sql.add("insert into inv_shmjual_d (no_shmjual,kode_kelola,kode_saham,h_oleh,h_buku,h_jual,jumlah,n_jual,gainlos, komisi,vat,levi,pph,kode_broker) values "+
								        "('"+this.e_nb.getText()+"','"+this.cb_kelola.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+njual+",0,0,0,0,0,'"+this.sg.cells(8,i)+"')");																
								
								var nbeli = nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(5,i));								
								sql.add("insert into inv_shmbeli_d (no_shmbeli,kode_kelola,kode_saham,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph,kode_broker,h_buku2) values "+
								    "('"+this.e_nb.getText()+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nbeli+",0,0,0,0,'"+this.sg.cells(8,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+")");																
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
					this.doClick(this.i_gen);
				break;
			case "simpan" :									
				this.doValidStok();
				var line = undefined;
				for (var i in this.gridAR.objList){					
					line = this.gridAR.get(i);
					if ((parseFloat(line.get("stok")) > 0) && (parseFloat(line.get("stok")) != parseFloat(line.get("jumlah")))) {
						system.alert(this,"Transaksi tidak valid.","Total Lbr Pindah tidak sama dengan Lbr Unit ("+line.get("kode_saham")+").");
						return false;						
					}			
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				for (var i = 0; i < this.sg.rows.getLength();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(5,i)) > nilaiToFloat(this.sg.cells(2,i))) {
							system.alert(this,"Transaksi tidak valid.","Jml unit dipindah melebihi stok.");
							return false;												
						}
					}
				}				
				if (nilaiToFloat(this.e_nsaham.getText()) <= 0 || nilaiToFloat(this.e_nbuku.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai (Saham/Buku) tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
			this.sg.clear(1);			
		}				
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmjual_m","no_shmjual",this.app._lokasi+"-SPK"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_kelola.getText()!=""){
					this.standarLib.showListData(this, "Daftar Saham",sender,undefined, 
						"select a.kode_saham, a.nama from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"'",
						"select count(a.kode_saham)  from inv_saham a inner join inv_saham_d b on a.kode_saham=b.kode_saham and b.kode_kelola='"+this.cb_kelola.getText()+"'",
						["a.kode_saham","a.nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 6){
					this.standarLib.showListData(this, "Daftar Kelola",sender,undefined, 
												  "select kode_kelola, nama from inv_kelola",
												  "select count(kode_kelola) from inv_kelola",
												  ["kode_kelola","nama"],"where",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar Broker",sender,undefined, 
												  "select kode_broker, nama from inv_broker",
												  "select count(kode_broker) from inv_broker",
												  ["kode_broker","nama"],"where",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){					
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var saham = this.dataSaham.get(sender.cells(0,row));
				if (saham) sender.cells(1,row,saham);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Saham "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkSaham");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}
				sender.onChange.set(this,"doChangeCell");
			}
			
			this.nik_user=this.app._nikUser;						
			var sql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select a.jumlah,a.h_oleh,a.h_buku from inv_saham_tmp a inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
						 "where a.kode_saham='"+this.sg.cells(0,row)+"' and a.kode_kelola = '"+this.cb_kelola.getText()+"' and a.nik_user='"+this.nik_user+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.sg.cells(2,row,parseFloat(line.jumlah));
				this.sg.cells(3,row,parseFloat(line.h_oleh));				
				this.sg.cells(4,row,parseFloat(line.h_buku));					
				//this.sg.cells(5,row,parseFloat(line.jumlah));
			} 
		}
		
		if (col == 6 && this.sg.cells(6,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var kelola = this.dataKelola.get(sender.cells(6,row));
			if (kelola) sender.cells(7,row,kelola);
			else {                                    
				if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode Kelola "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(6,row,"");
				sender.cells(7,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}
		
		if (col == 8 && this.sg.cells(8,row)!=""){			
			sender.onChange.set(undefined,undefined);
			var broker = this.dataBroker.get(sender.cells(8,row));
			if (broker) sender.cells(9,row,broker);
			else {                                    
				if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode Broker "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBroker");                
				sender.cells(8,row,"");
				sender.cells(9,row,"");
				sender.onChange.set(this,"doChangeCell");
				return false;
			}
			sender.onChange.set(this,"doChangeCell");			
		}				
		if (col == 5) this.sg.validasi();
	},		
	doNilaiChange: function(){
		try{			
			
			var totSaham = totBuku = 0 ;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(3,i) != "" && this.sg.cells(4,i) != ""){					
					totSaham += nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(3,i));				
					totBuku += nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(4,i));									
				}
			}			
			this.e_nsaham.setText(floatToNilai(Math.round(totSaham)));			
			this.e_nbuku.setText(floatToNilai(Math.round(totBuku)));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataSaham = new portalui_arrayMap();
							this.dataKelola = new portalui_arrayMap();
							this.dataBroker = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataSaham.set(line.kode_saham, line.nama);
								}
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataKelola.set(line.kode_kelola, line.nama);
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataBroker.set(line.kode_broker, line.nama);
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
	},
	doValidStok: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i = 0; i < this.sg.rows.getLength();i++){		
			if (nilaiToFloat(this.sg.cells(5,i)) != 0){
				var kdSaham = this.sg.cells(0,i)
				var nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdSaham == dtJurnal.get(j).get("kode_saham")) ){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_saham",kdSaham);
					row.set("stok",nilaiToFloat(this.sg.cells(2,i)));
					row.set("jumlah",nilaiToFloat(this.sg.cells(5,i)));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);
				}
				else dtJurnal.get(ix).set("jumlah",row.get("jumlah") + nilaiToFloat(this.sg.cells(5,i)));
			}
		}
		this.gridAR = dtJurnal;	
	}
});