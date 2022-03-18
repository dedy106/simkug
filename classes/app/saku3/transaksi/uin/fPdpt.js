window.app_saku3_transaksi_uin_fPdpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fPdpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fPdpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Usulan Pendapatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun Budget",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,420], childPage:["Daftar Usulan","Data Usulan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Bukti","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});						
		this.e_alokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,17,200,20],caption:"Target Alokasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.cb_giat = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,10,200,20],caption:"Sisa Target", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:1});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,15,200,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.p1 = new panel(this.pc1.childPage[1],{bound:[1,23,997,293],caption:"Daftar Usulan"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-47],colCount:7,tag:0,
		            colTitle:["Item Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah"],
					colWidth:[[6,5,4,3,2,1,0],[90,90,90,100,180,80,300]],					
					columnReadOnly:[true,[2,3,4,6],[0,1,5]],					
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[1],[bsEllips]],ellipsClick:[this,"doEllipsClick"],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);

			var data = this.dbLib.getDataProvider("select tahun from uin_tahun where flag_aktif='1' order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);				
			}
			
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var strSQL = "select distinct a.kdsatker,a.kdprogram,a.kddept,a.kdunit "+
						 "from uin_user a where a.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kddept = line.kddept;
					this.kdunit = line.kdunit;						
					this.kdsatker = line.kdsatker;
					this.kdprogram = line.kdprogram;															
				}
			}

			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);	

			var sql = new server_util_arrayList();			
			sql.add("select kode_norma,nama from uin_norma where jenis='PDPT' and kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.c_tahun.getText()+"' ");	
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fPdpt.extend(window.childForm);
window.app_saku3_transaksi_uin_fPdpt.implement({
	cekSaldoAlok: function() {
		var strSQL = 	"select a.pdpt,a.pdpt - isnull(b.totusul,0) as saldo "+
						"from uin_alokasi_m a "+ 
						"left join ( "+
						"	select kode_pp,kode_lokasi,sum(total) as totusul "+
						"	from uin_usul_m where form='PDPT' and no_usul <> '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and tahun='"+this.c_tahun.getText()+"' "+
						"	group by kode_pp,kode_lokasi "+
						" ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.tahun = '"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.cb_pp.getText()+"'";									

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){			
				this.e_alokasi.setText(floatToNilai(line.pdpt));																									
				this.e_saldo.setText(floatToNilai(line.saldo));															
			}
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	cekCBBL: function() {		
		this.statusCB = true;		
		var data = this.dbLib.getDataProvider("select a.kdakun from uin_pdpt a inner join uin_akun b on a.kdakun=b.kdakun "+
											  "where a.thang='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line == undefined){			
				this.statusCB = false;
			} 
		}		
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
			if (this.stsSimpan == 1) this.doClick();						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from uin_usul_d where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					var tahun=this.c_tahun.getText();

					sql.add("insert into uin_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_close,tgl_input,nik_user,total,form,status,kode_pp2) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','-','-',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_total.getText())+",'PDPT','ORGI','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {
								sql.add("insert into uin_usul_d(no_usul,kode_lokasi,nu,kode_norma,keterangan,satuan,tarif,vol,total,tahun,dc,kdsatker,kdprogram,kdgiat,kddept,kdunit,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,idbukti,no_park) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(1,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.c_tahun.getText()+"','D','"+this.kdsatker+"','"+this.kdprogram+"','"+this.cb_giat.getText()+"','"+this.kddept+"','"+this.kdunit+"','-','-','-','-','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.e_nb.getText()+"','-')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from uin_usul_d where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
			case "ubah" :	
			this.cekCBBL();
				if (!this.statusCB) {
					system.alert(this,"Transaksi tidak valid.","Data Referensi tidak konsisten (Cek kembali Kegiatan dan Akun).");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},	
	doSelectDate: function(sender, y,m,d){			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_usul_m","no_usul",this.app._lokasi+"-UPD"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_giat && this.cb_giat.getText()!="") {
				this.cb_akun.setSQL("select a.kdakun, b.nmakun from uin_pdpt a inner join uin_akun b on a.kdakun=b.kdakun "+
									"where a.thang='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' "
									,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			}
			if ((sender == this.c_tahun || sender == this.cb_pp) && this.c_tahun.getText() != "" && this.cb_pp.getText()!=""){
				this.doLoad();
				this.cekSaldoAlok();	
			}					
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Norma",sender, sender.row, sender.col, 
														"select kode_norma, nama  from uin_norma where jenis='PDPT' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",
														"select count(*) from uin_norma where jenis='PDPT' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",
														 new Array("kode_norma","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("doEllipsClick: " + e);
		}
	},				
	doChangeCell: function(sender, col, row){
		try {
			if ((col == 5) && (this.sg.cells(5,row) != "")) {
				var jum = Math.round(nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row)));
				this.sg.cells(6,row,jum);
				this.sg.validasi();
			}

			sender.onChange.set(undefined,undefined);
			if (col == 1) {
				if (sender.cells(1,row) != "") {				
					var norma = this.dataNorma.get(sender.cells(1,row));
					if (norma) {
						sender.cells(2,row,norma);

						var data = this.dbLib.getDataProvider("select * from uin_norma where kode_norma='"+sender.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								sender.cells(3,row,line.satuan);
								sender.cells(4,row,line.nilai);
							}
						}
					}
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Norma "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNorma");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");
					}				
				}
			}		
			sender.onChange.set(this,"doChangeCell");	
		}
		catch(e) {
			alert(e);
		}	
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange: "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi ("+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNorma = new portalui_arrayMap();																										
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNorma.set(line.kode_norma, line.nama);										
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
	doLoad:function(sender){	
		try{		
			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.total "+
						 "from uin_usul_m a "+
						 "where a.no_close='-' and a.form='PDPT' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.status='ORGI' order by a.no_usul desc";																 
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_usul,line.tgl,line.keterangan,floatToNilai(line.total),"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[1]);				
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider(
					"select top 1 * from uin_usul_m a inner join uin_usul_d b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi "+
					"where a.no_usul='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);					
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);
						this.cb_giat.setText(line.kdgiat);
						this.cb_akun.setText(line.kode_akun);											
					} 
				}			
				var strSQL = "select a.*,b.nama from uin_usul_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							 "where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total)]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	

				this.cekSaldoAlok();
				
			}
		} catch(e) {alert(e);}
	}
});