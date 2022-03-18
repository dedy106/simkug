/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fMdmSample = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fMdmSample.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fMdmSample";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Sampling Data Modem Data dan Imux", 0);	
		try{
			uses("datePicker;saiCBBL;saiGrid;util_file;uploader;app_assetsap_transaksi_fSvrUpload;checkBox");			
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});			
			this.ed_jns = new saiCB(this,{bound:[20,4,200,20], caption:"Jenis Prosedur", change:[this,"doEditChange"]});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No Sample",readOnly:true});
			this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
			
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 4, 200, 20],
				caption: "Bus.Area",
				multiSelection: false,
				change:[this,"doChange"]			
			});			
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Pembuat",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.app._kodeLokfa+"'", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});
			this.ed_sample = new saiLabelEdit(this,{bound:[720,3,200,20],caption:"Jumlah Sample", tipeText:ttNilai});
			this.ed_ket = new saiLabelEdit(this,{bound:[20,5,900,20],caption:"Keterangan"});
			
			
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Sampling"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 4,
				colTitle: "No Kontrak, Slot NMS, Serial Number, Referensi Evidence",
				colWidth: [[3, 2, 1, 0], [ 200, 150, 150,150]],				
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,
				//readOnly:true,
				autoPaging : true, rowPerPage:50, pasteEnable:true, afterPaste:[this,"doAfterPaste"],
				buttonStyle:[[0,1,2,3],[bsEllips, bsEllips, bsEllips, bsEllips]],
				ellipsClick: [this,"doFindBtnClick"]
			});		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsTransNav, grid:this.sg, pager:[this,"doPager"]});
			
			this.p2 = new panel(this,{bound:[20,12,440,150],caption:"Disiapkan Oleh"});
			this.sg2 = new saiGrid(this.p2,{bound:[1,20,438,95], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn2 = new sgNavigator(this.p2,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg2, pager:[this,"doPager"]});
			this.p3 = new panel(this,{bound:[480,12,440,150],caption:"Direview Oleh"});
			this.sg3 = new saiGrid(this.p3,{bound:[1,20,438,95], colCount:2,colTitle:"NIK,Nama", buttonStyle:[[0],[bsEllips]],colWidth:[[1,0],[250,60]], rowCount:1, ellipsClick:[this,"doEllipsClick"]});
			this.sgn3 = new sgNavigator(this.p3,{bound:[1,this.p2.height - 25,438,25],buttonStyle:bsTrans, grid:this.sg3, pager:[this,"doPager"]});
			
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
						
			this.onClose.set(this,"doClose");				
			this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
			this.dataGrid = new arrayMap();
			
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.svrUpload = new app_assetsap_transaksi_fSvrUpload();
			this.svrUpload.addListener(this);
			this.fileUtil.getRootDirA();			
			this.rowPerPage = 20;
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fMdmSample.extend(window.childForm);
window.app_assetsap_transaksi_fMdmSample.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);					
						this.dataKonversi = undefined;	
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();						
						sql.add("insert into amu_datasample (no_sample,  kode_lokasi, tanggal, jumlah,keterangan,nik_user, periode, jns_proc, kode_lokfa)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.dp_tgl.getDateString()+"','"+parseNilai(this.ed_sample.getText())+"', "+
							" '"+this.ed_ket.getText()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_jns.getText()+"','"+this.ed_lokfa.getText()+"')");
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){//disimpan sesuai dgn yg ada aja
								sql.add("insert into amu_datasample_d (no_sample,kode_lokasi, periode, no_kontrak,nms, sn, no_evidence) "+
									" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.app._periode+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"')");
							}
						}
						
						for (var i=0; i < this.sg2.getRowCount(); i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',0,'"+this.sg2.cells(0,i)+"',"+i+")");
							}
						}
						for (var i=0; i < this.sg3.getRowCount(); i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('"+this.ed_kode.getText()+"',1,'"+this.sg3.cells(0,i)+"',"+i+")");
							}
						}
						this.dbLib.execArraySQL(sql);
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender, col, row){		
		if (sender == this.sg){
			switch (col){
				case 0 :
					this.standarLib.ListDataSGFilter(this, "Data Kontrak",sender, sender.row, sender.col,
											  "select no_kontrak, keterangan from amu_kontrak where kode_lokasi = '"+this.app._lokasi+"' ",											
											  "select count(*) from amu_kontrak  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["no_kontrak","keterangan"],"and",["No Kontrak","Keterangan"]);
				break;
				case 1 :
					this.standarLib.ListDataSGFilter(this, "Data NMS",sender, sender.row, sender.col,
											  "select distinct nms from amu_kontrak_d where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(0,row)+"'",											
											  "select count(*) from amu_kontrak_d  where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(0,row)+"'",
											  ["nms"],"and",["NMS"]);
				break;
				case 2:
					this.standarLib.ListDataSGFilter(this, "Data Serial Number",sender, sender.row, sender.col,
											  "select distinct sn from amu_kontrak_d where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(0,row)+"' and nms = '"+sender.cells(1,row) +"'",											
											  "select count(*) from amu_kontrak_d  where kode_lokasi = '"+this.app._lokasi+"' and no_kontrak = '"+sender.cells(0,row)+"' and nms = '"+sender.cells(1,row) +"'",
											  ["sn"],"and",["Serial Number"]);
				break;
				case 3:
					this.standarLib.ListDataSGFilter(this, "Data Evidence",sender, sender.row, sender.col,
											  "select distinct no_evd from ( "+
											  "select DISTINCT a.NO_EVD, b.value as no_kontrak, c.value as nms, d.value as sn "+
												"from AMU_EVD_D a "+
												"	inner join amu_evd x on x.no_evd = a.no_evd "+
												"	inner join AMU_EVD_d b on b.NO_EVD = a.no_evd and b.param = 'Nomor Kontrak' "+
												"	inner join AMU_EVD_d c on c.NO_EVD = a.no_evd and c.param = 'Slot NMS' "+
												"	inner join AMU_EVD_d d on d.NO_EVD = a.no_evd and d.param = 'Serial Number' "+
												" where x.periode = '"+this.app._periode+"' and x.kode_lokasi = '"+this.app._lokasi+"' ) a  where "+
											 " no_kontrak = '"+sender.cells(0,row)+"' and nms = '"+sender.cells(1,row) +"' and sn = '"+sender.cells(2,row) +"'",											
											  "select count(*) from ("+
											  " select DISTINCT a.NO_EVD, b.value as no_kontrak, c.value as nms, d.value as sn "+
												"from AMU_EVD_D a "+
												"	inner join amu_evd x on x.no_evd = a.no_evd  "+
												"	inner join AMU_EVD_d b on b.NO_EVD = a.no_evd and b.param = 'Nomor Kontrak' "+
												"	inner join AMU_EVD_d c on c.NO_EVD = a.no_evd and c.param = 'Slot NMS' "+
												"	inner join AMU_EVD_d d on d.NO_EVD = a.no_evd and d.param = 'Serial Number' "+
												" where x.periode = '"+this.app._periode+"' and x.kode_lokasi = '"+this.app._lokasi+"' ) a where "+
											 "  no_kontrak = '"+sender.cells(0,row)+"' and nms = '"+sender.cells(1,row) +"' and sn = '"+sender.cells(2,row) +"' ",
											  ["no_evd"],"and",["Evidence"]);
				break;
			}
		}
	},
	doChange: function(sender){		
		if (sender == this.ed_lokfa){
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
		}
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_datasample','no_sample',"SPL/"+this.dp_tgl.getYear()+"/",'0000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();
                                                      
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							if (line.nama.toLowerCase().indexOf("modem") != -1)
								this.ed_jns.addItem(line.kode_klp, line.nama);
						}						
						this.doEditChange(this.ed_jns);
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
			if(methodName == "getRootDir"){				
				this.rootDir = result;			
				this.separator = "/";
				this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);			
				this.onClose.set(this,"doClose");									
			}
        }
        try{
			if (sender == this.svrUpload){				
				switch (methodName){
					case "setFile":										
						result = JSON.parse(result);
						this.sgn.setTotalPage(Math.ceil(result.recCount / 20));
						this.sgn.rearrange();
						this.tampilGrid(result);
					break;
					case "getData":						
						result = JSON.parse(result);
						this.tampilGrid(result);
					break;				
					case "checkBusA":												
						if (result.getLength() > 0){
							system.alert(this, "Ada data upload yg beda dengan Bus. Area "+this.ed_lokfa.getText(),"data ba yg salah");
						}
					break;				
					case "uploadKonversi":
						if (result.toLowerCase().search("error") == -1)					
						{							
							system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")","");
						}else system.info(this,result,"");
					break;
				}
			}
		}catch(e){
			system.alert(this, e, "");
		}
	},	
	doGridChange: function(sender, col, row,param1,result, data){	    
		try{			
			this.ed_sample.setText(sender.getRowCount());
		}catch(e){
			this.sg.onChange.set(this,"doGridChange");				
		}
    },    
	doEllipsClick:function(sender, col ,row){		
		try{			
			if (sender == this.sg2 || sender == this.sg3){
				this.standarLib.showListDataForSG(this, "Daftar Karyawan",sender, sender.row, sender.col, 
													  "select nik, nama from amu_karyawan ",
													  "select count(*) from amu_karyawan ",
													  ["nik","nama"],"where",["NIK","Nama"],false);
			}		
		}catch(e){
			alert(e);
		}		
	},
	doEditChange: function(sender){
		try{
			if (sender.getText() == "") return;
			this.ed_lokfa.setSQL("select kode_lokfa, nama from (select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = a.kode_lokasi "+
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+
					 "	inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R" ? this.app._kodeLokfa : "%")+"' "+
					 "union "+
					 "select a.kode_lokfa, a.nama from amu_lokasi a "+					 
					 "	inner join amu_asset x on x.kode_lokfa = a.kode_lokfa "+
					 " inner join (select distinct kode_klpfa from amu_bagiklp_d where jenis_proc = 'ALTERNATIF') d on d.kode_klpfa = x.kode_klpfa "+
					 " inner join amu_klp_alt k on k.kode_klpfa = x.kode_klpfa and k.periode = '"+this.app._periode +"' and k.jenis_proc = '"+this.ed_jns.getText()+"' "+
					 " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U" || this.app._userStatus == "R"? this.app._kodeLokfa : "%")+"' and a.kode_induk = '00') ", 
						["kode_lokfa","nama"],false, ["Klp Aset","Nama"],"where","Data Kelompok Aset",true);			
		}catch(e){
			alert(e);
		}
	},		
	doAfterPaste: function (sender, rowCount, page){
		this.sgn.setTotalPage(sender.getTotalPage());
		this.sgn.rearrange();		
		this.ed_sample.setText(sender.getRowCount());
	}
	
});
