window.app_saku3_transaksi_ppbs_fPaOutlooknDRK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaOutlooknDRK.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_fPaOutlooknDRK";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Data Anggaran Non DRK", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,22,200,20],caption:"Tahun Anggaran",readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Tahun Outlook",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_pp = new saiCBBL(this,{bound:[20,18,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,320],caption:"Data Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:14,
				colTitle:["Kode Akun","Nama Akun","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,200,80]],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				columnReadOnly:[true,[1],[0,2,3,4,5,6,7,8,9,10,11,12,13]],
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				autoAppend:true,defaultRow:1,
				pasteEnable:true
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
		var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.cb_app.setText(line.flag,line.nama);
		} else this.cb_app.setText("","");

		this.pp = this.dbLib.getPeriodeFromSQL("select kode_pp as periode from agg_user where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' ");
		this.tahun = this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' ");
		
		//this.cb_pp.setText("");		
		this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.tahun+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		//this.cb_pp.setText(this.pp);		
		
		this.c_tahun.items.clear();
		var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.c_tahun.addItem(i,line.tahun);
			}
		}
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku3_transaksi_ppbs_fPaOutlooknDRK.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_fPaOutlooknDRK.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :		
					var strSQL = "select sts_open from agg_closeOL where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							if (line.sts_open == "0") {
								system.alert(this,"Perubahan Outlook sudah ditutup.",".Hubungi Administrator");
								return false;						
							}							
						}		
						else {
							system.alert(this,"Parameter Outlook tidak ditemukan.",".Hubungi Administrator");
							return false;													
						}			
					}

					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_outlook_m","no_agg",this.app._lokasi+"-OUT"+this.e_tahun.getText().substr(2,2)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							if (this.nbLama != "") {
								sql.add("delete from agg_outlook_m where no_agg='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("delete from agg_outlook_load where no_agg='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("delete from agg_outlook_d where no_agg='"+this.nbLama+"' and kode_lokasi='"+this.app._lokasi+"'");
							}

							sql.add("insert into agg_outlook_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_tahun.getText()+"','IDR',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','T','"+this.cb_pp.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','EDIT')");
														
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									sql.add("insert into agg_outlook_load(no_agg,kode_lokasi,tahun,kode_akun,kode_pp,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.cb_pp.getText()+"',"+parseNilai(this.sg1.cells(2,i))+","+parseNilai(this.sg1.cells(3,i))+","+parseNilai(this.sg1.cells(4,i))+","+parseNilai(this.sg1.cells(5,i))+","+parseNilai(this.sg1.cells(6,i))+","+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(13,i))+")");
								}
							}
							
							sql.add("insert into agg_outlook_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul,tahun_gar) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'01',jan,jan,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where jan <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'02',feb,feb,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where feb <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'03',mar,mar,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where mar <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'04',apr,apr,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where apr <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'05',mei,mei,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where mei <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'06',jun,jun,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where jun <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'07',jul,jul,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where jul <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'08',agu,agu,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where agu <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'09',sep,sep,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where sep <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'10',okt,okt,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where okt <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'11',nov,nov,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where nov <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,1,tahun+'12',des,des,'D','-','"+this.app._userLog+"',getdate(),'ORGI','"+this.c_tahun.getText()+"' from agg_outlook_load where des <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");							

							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tahun.setText(y);
		this.e_nb.setText("");
		var sql = new server_util_arrayList(); 
		sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
		this.dbLib.getMultiDataProviderA(sql);									
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_outlook_m","no_agg",this.app._lokasi+"-OUT"+this.e_tahun.getText().substr(2,2)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},			
	doChange: function(sender){
		try{														
			if ((sender == this.cb_pp || this.e_tahun.getText()) && this.cb_pp.getText() != "" && this.e_tahun.getText() != ""){
				
				this.nbLama = "";				
				var strSQL = "select no_agg from agg_outlook_m where no_del='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.nbLama = line.no_agg;
					}					
				}

				if (this.nbLama != "") {
					var strSQL = "select a.kode_akun,b.nama,a.jan,a.feb,a.mar,a.apr,a.mei,a.jun,a.jul,a.agu,a.sep,a.okt,a.nov,a.des "+
								 "from agg_outlook_load a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "where a.no_agg='"+this.nbLama+"' and a.kode_lokasi='"+this.app._lokasi+"'";											 		  

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						this.sg1.appendData([line.kode_akun,line.nama,
							floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),  
							floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des)]);						
					}
					this.sg1.validasi();
				}					
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	

	doChangeCell: function(sender, col, row){
		if (col >= 6 && col <= 17) this.sg1.validasi();
		sender.onChange.set(undefined,undefined);
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) { 
					sender.cells(1,row,akun); 					
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "" && this.sg1.cells(7,i) != "" && this.sg1.cells(8,i) != "" && this.sg1.cells(9,i) != "" &&
										   this.sg1.cells(10,i) != "" && this.sg1.cells(11,i) != "" && this.sg1.cells(12,i) != "" && this.sg1.cells(13,i) != "" && 
										   this.sg1.cells(2,i) != "" && this.sg1.cells(3,i) != "" && this.sg1.cells(4,i) != "" && this.sg1.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + 
						  nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(13,i)) + 
						  nilaiToFloat(this.sg1.cells(2,i)) + nilaiToFloat(this.sg1.cells(3,i)) + nilaiToFloat(this.sg1.cells(4,i)) + nilaiToFloat(this.sg1.cells(5,i));
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
				case "getMultiDataProvider":
					eval("result = "+result+";");
					if (typeof result != "string"){
						this.dataAkun = new portalui_arrayMap();											
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataAkun.set(line.kode_akun, line.nama);
							}
						}												
					}else throw result;
				break;
			}
		}		
	}
});
