window.app_sc_transaksi_fGarLoad = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fGarLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_sc_transaksi_fGarLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Anggaran", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		 
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Tahun Anggaran",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,15,202,20],caption:"No Load", readOnly:true, visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,15,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",visible:false,click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"No Dokumen", maxLength:50});			
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this,{bound:[20,14,200,20],caption:"Jenis Input",items:["INPUT","LOAD"],tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[580,14,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bUpload = new portalui_uploader(this,{bound:[820,14,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,320],caption:"Data Anggaran"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:18,
				colTitle:["Kode Akun","Nama Akun","Kode CC","Nama CC","Kode DRK","Nama DRK","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],
				colWidth:[[17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,200,80,100,80,200,80]],
				colFormat:[[6,7,8,9,10,11,12,13,14,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				columnReadOnly:[true,[1,3,5],[0,2,4,6,7,8,9,10,11,12,13,14,15,16,17]],
				buttonStyle:[[0,2,4],[bsEllips,bsEllips,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				autoAppend:true,defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:0, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_buat.setSQL("select nik, nama from sc_karyawan",["nik","nama"],false,["NIK","Nama"],"where","Data NIK Pembuat",true);
		this.cb_app.setSQL("select nik, nama from sc_karyawan",["nik","nama"],false,["NIK","Nama"],"where","Data NIK Approval",true);
		
		setTipeButton(tbSimpan);				
	}
};
window.app_sc_transaksi_fGarLoad.extend(window.portalui_childForm);
window.app_sc_transaksi_fGarLoad.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);		
			
			var line;
			var tot = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				tot += parseFloat(line.jan)+parseFloat(line.feb)+parseFloat(line.mar)+parseFloat(line.apr)+parseFloat(line.mei)+parseFloat(line.jun)+parseFloat(line.jul)+parseFloat(line.agu)+parseFloat(line.sep)+parseFloat(line.okt)+parseFloat(line.nov)+parseFloat(line.des);
			}
			this.e_total.setText(floatToNilai(tot));

   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des)]);
		}
		this.sg1.setNoUrut(start);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				} else setTipeButton(tbSimpan);	
				break;
			case "simpan" :				
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							sql.add("delete from anggaran_m where tahun= '"+this.e_tahun.getText()+"'");
							sql.add("delete from anggaran_load where tahun= '"+this.e_tahun.getText()+"'");
							sql.add("delete from anggaran_d where periode like '"+this.e_tahun.getText()+"%'");
							
							sql.add("insert into anggaran_m(no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_tahun.getText()+"','IDR',"+parseNilai(this.e_total.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.c_jenis.getText()+"')");
							
							if (this.c_jenis.getText()=="INPUT") {
								for (var i=0;i < this.sg1.getRowCount();i++){
									if (this.sg1.rowValid(i)){
										sql.add("insert into anggaran_load(no_agg,kode_lokasi,tahun,kode_akun,kode_pp,kode_drk,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
												"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(4,i)+"',"+parseNilai(this.sg1.cells(6,i))+","+parseNilai(this.sg1.cells(7,i))+","+parseNilai(this.sg1.cells(8,i))+","+parseNilai(this.sg1.cells(9,i))+","+parseNilai(this.sg1.cells(10,i))+","+parseNilai(this.sg1.cells(11,i))+","+parseNilai(this.sg1.cells(12,i))+","+parseNilai(this.sg1.cells(13,i))+","+parseNilai(this.sg1.cells(14,i))+","+parseNilai(this.sg1.cells(15,i))+","+parseNilai(this.sg1.cells(16,i))+","+parseNilai(this.sg1.cells(17,i))+")");
									}
								}
							}
							else {
								var line;
								for (var i=0; i < this.dataUpload.rows.length;i++){
									line = this.dataUpload.rows[i];
									sql.add("insert into anggaran_load(no_agg,kode_lokasi,tahun,kode_akun,kode_pp,kode_drk,jan,feb,mar,apr,mei,jun,jul,agu,sep,okt,nov,des) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+line.kode_akun+"','"+line.kode_pp+"','"+line.kode_drk+"',"+line.jan+","+line.feb+","+line.mar+","+line.apr+","+line.mei+","+line.jun+","+line.jul+","+line.agu+","+line.sep+","+line.okt+","+line.nov+","+line.des+")");
								}							
							}
							sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+
							        "select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'01',jan,jan,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where jan <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'02',feb,feb,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where feb <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'03',mar,mar,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where mar <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'04',apr,apr,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where apr <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'05',mei,mei,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where mei <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'06',jun,jun,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where jun <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'07',jul,jul,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where jul <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'08',agu,agu,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where agu <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'09',sep,sep,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where sep <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'10',okt,okt,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where okt <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'11',nov,nov,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where nov <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',1,kode_pp,kode_akun,kode_drk,1,tahun+'12',des,des,'D','-','"+this.app._userLog+"',getdate(),'ORGI' from anggaran_load where des <> 0 and no_agg ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");							
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
		sql.add("select kode_akun, nama from masakun");
		sql.add("select kode_cc, nama from sc_cc");		
		this.dbLib.getMultiDataProviderA(sql);									
	},	
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-GAR"+this.e_tahun.getText().substr(2,2)+".","000"));
			this.e_dok.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doChangeCell: function(sender, col, row){
		if (this.c_jenis.getText()=="INPUT") {
			if (col >= 6 && col <= 17) this.sg1.validasi();
			sender.onChange.set(undefined,undefined);
			if (col == 0) {
				if (this.sg1.cells(0,row) != "") {
					var akun = this.dataAkun.get(sender.cells(0,row));
					if (akun) sender.cells(1,row,akun);
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}
				}
			}
			if (col == 2) {
				if (this.sg1.cells(2,row) != "") {
					var pp = this.dataPP.get(sender.cells(2,row));
					if (pp) sender.cells(3,row,pp);
					else {
						if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode CC "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
					}
				}
			}			
			sender.onChange.set(this,"doChangeCell");		
		}
	},
	doNilaiChange: function(){
		try{
			if (this.c_jenis.getText()=="INPUT") {
				var tot = 0;
				for (var i = 0; i < this.sg1.rows.getLength();i++){
					if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != "" && this.sg1.cells(7,i) != "" && this.sg1.cells(8,i) != "" && this.sg1.cells(9,i) != "" &&
					                           this.sg1.cells(10,i) != "" && this.sg1.cells(11,i) != "" && this.sg1.cells(12,i) != "" && this.sg1.cells(13,i) != "" && 
											   this.sg1.cells(14,i) != "" && this.sg1.cells(15,i) != "" && this.sg1.cells(16,i) != "" && this.sg1.cells(17,i) != ""){
						tot += nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i)) + nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + 
						      nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(13,i)) + 
							  nilaiToFloat(this.sg1.cells(14,i)) + nilaiToFloat(this.sg1.cells(15,i)) + nilaiToFloat(this.sg1.cells(16,i)) + nilaiToFloat(this.sg1.cells(17,i));
					}
				}
				this.e_total.setText(floatToNilai(tot));
			}
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (this.c_jenis.getText()=="INPUT") {
				if (sender == this.sg1) {
					if (col == 0){
						this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
													  "select kode_akun,nama    from masakun",
													  "select count(kode_akun)  from masakun",
													  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
					}
					if (col == 2){
						this.standarLib.showListData(this, "Daftar CC",sender,undefined, 
													  "select kode_cc, nama  from sc_cc ",
													  "select count(kode_cc) from sc_cc ",
													  ["kode_cc","nama"],"and",["Kode","Nama"],false);				
					}					
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
						this.dataPP = new portalui_arrayMap();
						this.dataDRK = new portalui_arrayMap();
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataAkun.set(line.kode_akun, line.nama);
							}
						}
						if (result.result[1]){	    			        
							var line;
							for (var i in result.result[1].rs.rows){
								line = result.result[1].rs.rows[i];
								this.dataPP.set(line.kode_pp, line.nama);
							}
						}						
					}else throw result;
				break;
			}
		}		
	}
});
